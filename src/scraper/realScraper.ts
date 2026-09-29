// Real Scraper Service - Multiple methods to fetch NursingPlex content
// Method 1: CORS Proxy (automatic, may fail)
// Method 2: Manual HTML Paste (always works)
// Method 3: Direct fetch attempt (works if NursingPlex adds CORS)

export interface ScrapedQuestion {
  number: number;
  text: string;
  choices?: string[];
  type?: 'numeric' | 'dropdown' | 'matrix' | 'diagram' | 'ordering';
  isSATA?: boolean;
  image?: string;
  note?: string;
}

export interface ScrapedExam {
  examId: string;
  title: string;
  totalQuestions: number;
  scrapedDate: string;
  questions: ScrapedQuestion[];
  sourceUrl: string;
  category: string;
  subcategory: string;
}

// Updated CORS proxies - using the most reliable current services
const CORS_PROXIES = [
  { url: 'https://corsproxy.io/?', format: 'direct' },
  { url: 'https://api.allorigins.win/raw?url=', format: 'direct' },
  { url: 'https://api.allorigins.win/get?url=', format: 'json' },
  { url: 'https://thingproxy.freeboard.io/fetch/', format: 'direct' },
];

let currentProxyIndex = 0;

// Fetch page content with CORS proxy fallback
export async function fetchPageWithProxy(url: string): Promise<string> {
  const errors: string[] = [];

  for (let i = 0; i < CORS_PROXIES.length; i++) {
    const proxyIndex = (currentProxyIndex + i) % CORS_PROXIES.length;
    const proxy = CORS_PROXIES[proxyIndex];

    try {
      const proxyUrl = proxy.url + encodeURIComponent(url);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const response = await fetch(proxyUrl, {
        method: 'GET',
        signal: controller.signal,
        headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      let html = await response.text();

      // Handle JSON response format (allorigins.win/get)
      if (proxy.format === 'json') {
        try {
          const json = JSON.parse(html);
          html = json.contents || html;
        } catch {
          // Not JSON, use as-is
        }
      }

      // Validate we got actual HTML
      if (html && html.length > 1000 && html.includes('<')) {
        currentProxyIndex = proxyIndex;
        return html;
      }

      throw new Error('Response too short or invalid HTML');
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Unknown error';
      errors.push(`Proxy ${proxyIndex} (${proxy.url.substring(0, 30)}...): ${msg}`);
      continue;
    }
  }

  throw new Error(`All proxies failed:\n${errors.join('\n')}`);
}

// Method 2: Parse manually pasted HTML
export function parsePastedHTML(html: string, url: string, title: string): ScrapedExam {
  const questions = parseQuestionsFromHTML(html);

  if (questions.length === 0) {
    throw new Error('No questions found in the pasted HTML. Make sure you copied the full page content.');
  }

  const { category, subcategory } = categorizeExam(url, title);

  return {
    examId: generateExamId(title),
    title,
    totalQuestions: questions.length,
    scrapedDate: new Date().toISOString().split('T')[0],
    questions,
    sourceUrl: url,
    category,
    subcategory,
  };
}

// Parse questions from HTML content
export function parseQuestionsFromHTML(html: string): ScrapedQuestion[] {
  const questions: ScrapedQuestion[] = [];

  // Try DOM parsing first
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const questionElements = doc.querySelectorAll('li[id^="review-q-"]');

    questionElements.forEach((element) => {
      const question = parseQuestionElement(element);
      if (question) questions.push(question);
    });
  } catch {
    // DOM parsing failed, try regex
  }

  // If DOM parsing didn't work, try regex
  if (questions.length === 0) {
    const regexQuestions = parseQuestionsWithRegex(html);
    questions.push(...regexQuestions);
  }

  return questions;
}

// Parse individual question element from DOM
function parseQuestionElement(element: Element): ScrapedQuestion | null {
  // Get question text
  const spans = element.querySelectorAll('span[style*="font-weight: 400"], span[style*="white-space: pre-line"]');
  let questionText = '';

  spans.forEach(span => {
    const text = span.textContent?.trim() || '';
    if (text.length > questionText.length) {
      questionText = text;
    }
  });

  if (!questionText || questionText.length < 10) return null;

  // Extract question number
  const numberMatch = questionText.match(/^(\d+)\./);
  const questionNumber = numberMatch ? parseInt(numberMatch[1]) : 0;

  // Clean question text
  questionText = questionText.replace(/^\d+\.\s*/, '').trim();

  // Extract answer choices
  const choices: string[] = [];
  const choiceDivs = element.querySelectorAll('div.flex.items-baseline.gap-1');

  choiceDivs.forEach(div => {
    const text = div.textContent?.trim() || '';
    const cleaned = text.replace(/^[A-G]\)\s*/, '').trim();
    if (cleaned && cleaned.length > 0) {
      choices.push(cleaned);
    }
  });

  // Check for images
  const images = element.querySelectorAll('img');
  let imageUrl: string | undefined;
  if (images.length > 0) {
    imageUrl = images[0].getAttribute('src') || undefined;
  }

  const question: ScrapedQuestion = {
    number: questionNumber,
    text: questionText,
  };

  if (choices.length > 0) {
    question.choices = choices;

    if (questionText.toLowerCase().includes('select all that apply') ||
        questionText.toLowerCase().includes('(sata)') ||
        choices.length > 4) {
      question.isSATA = true;
    }
  } else {
    if (questionText.toLowerCase().includes('round') ||
        questionText.toLowerCase().includes('how many') ||
        questionText.toLowerCase().includes('record numerical')) {
      question.type = 'numeric';
    } else if (questionText.includes('_____') || questionText.includes('[dropdown]')) {
      question.type = 'dropdown';
    }
  }

  if (imageUrl) {
    question.image = imageUrl;
  }

  return question;
}

// Parse questions using regex (fallback)
function parseQuestionsWithRegex(html: string): ScrapedQuestion[] {
  const questions: ScrapedQuestion[] = [];

  // Remove HTML tags but keep text
  const text = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ');

  // Find questions by number pattern
  const questionRegex = /(\d+)\.\s+([\s\S]*?)(?=(?:\d+\.\s+)|(?:Page \d+)|(?:Unlock the)|$)/g;
  let match;

  while ((match = questionRegex.exec(text)) !== null) {
    const qNum = parseInt(match[1]);
    let qContent = match[2].trim();

    if (!qContent || qContent.length < 20) continue;
    if (qContent.includes('Unlock the blurred')) continue;

    // Extract choices
    const choices: string[] = [];
    const choiceRegex = /([A-G])\)\s*([^\n]+?)(?=(?:[A-G]\))|(?:View Rationale)|(?:\d+\.\s)|$)/g;
    let choiceMatch;

    while ((choiceMatch = choiceRegex.exec(qContent)) !== null) {
      const choiceText = choiceMatch[2].trim();
      if (choiceText && choiceText.length > 1) {
        choices.push(choiceText);
      }
    }

    // Get question text (before choices)
    let questionText = qContent;
    if (choices.length > 0) {
      const firstChoicePos = qContent.indexOf(choices[0].substring(0, Math.min(20, choices[0].length)));
      if (firstChoicePos > 10) {
        questionText = qContent.substring(0, firstChoicePos).trim();
      }
    }

    // Clean up
    questionText = questionText
      .replace(/View Rationale/g, '')
      .replace(/View Case Study/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    if (questionText.length < 15) continue;

    const question: ScrapedQuestion = {
      number: qNum,
      text: questionText,
    };

    if (choices.length > 0) {
      question.choices = choices;
      if (questionText.toLowerCase().includes('select all that apply') ||
          questionText.toLowerCase().includes('(sata)') ||
          choices.length > 4) {
        question.isSATA = true;
      }
    } else if (questionText.toLowerCase().includes('round') ||
               questionText.toLowerCase().includes('how many')) {
      question.type = 'numeric';
    }

    questions.push(question);
  }

  return questions;
}

// Categorize exam based on URL and title
function categorizeExam(url: string, title: string): { category: string; subcategory: string } {
  const urlLower = url.toLowerCase();
  const titleLower = title.toLowerCase();

  if (urlLower.includes('comprehensive-predictor') || urlLower.includes('exit-exam') || urlLower.includes('hesi-rn-compass')) {
    if (urlLower.includes('ati') || urlLower.includes('vati')) {
      return { category: 'RN_Exit', subcategory: 'ATI' };
    }
    return { category: 'RN_Exit', subcategory: 'HESI' };
  }

  if (urlLower.includes('lpn-exit') || urlLower.includes('pn-exit') ||
      (urlLower.includes('comprehensive-predictor') && (urlLower.includes('lpn') || urlLower.includes('pn-')))) {
    if (urlLower.includes('ati') || urlLower.includes('vati')) {
      return { category: 'LPN_Exit', subcategory: 'ATI' };
    }
    return { category: 'LPN_Exit', subcategory: 'HESI' };
  }

  if (urlLower.includes('lpn') || urlLower.includes('-pn-')) {
    if (urlLower.includes('ati')) return { category: 'LPN', subcategory: 'ATI' };
    if (urlLower.includes('hesi')) return { category: 'LPN', subcategory: 'HESI' };
    return { category: 'LPN', subcategory: 'Regular' };
  }

  if (urlLower.includes('ati')) return { category: 'RN', subcategory: 'ATI' };
  if (urlLower.includes('hesi')) return { category: 'RN', subcategory: 'HESI' };
  if (urlLower.includes('cna') || urlLower.includes('phlebotomy') || urlLower.includes('certification')) {
    return { category: 'RN', subcategory: 'Certification' };
  }

  return { category: 'RN', subcategory: 'Regular' };
}

function generateExamId(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 50) + '-' + Date.now().toString(36);
}

// Scrape single exam (tries CORS proxies first)
export async function scrapeExam(
  url: string,
  title: string,
  onProgress?: (progress: number, message: string) => void
): Promise<ScrapedExam> {
  onProgress?.(10, 'Fetching page content via CORS proxy...');

  let html: string;
  try {
    html = await fetchPageWithProxy(url);
    onProgress?.(50, 'Page fetched successfully! Parsing questions...');
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    onProgress?.(20, `CORS proxy failed: ${msg.substring(0, 50)}...`);
    onProgress?.(25, 'Try the "Paste HTML" method instead (always works!)');
    throw error;
  }

  onProgress?.(70, 'Extracting questions from HTML...');
  const questions = parseQuestionsFromHTML(html);

  if (questions.length === 0) {
    throw new Error('No questions found in the page. The page structure may have changed.');
  }

  onProgress?.(90, `Found ${questions.length} questions. Saving...`);

  const { category, subcategory } = categorizeExam(url, title);

  const exam: ScrapedExam = {
    examId: generateExamId(title),
    title,
    totalQuestions: questions.length,
    scrapedDate: new Date().toISOString().split('T')[0],
    questions,
    sourceUrl: url,
    category,
    subcategory,
  };

  saveScrapedExam(exam);
  onProgress?.(100, `Done! Saved ${questions.length} questions.`);

  return exam;
}

// Save scraped exam to localStorage
export function saveScrapedExam(exam: ScrapedExam): void {
  try {
    const existing = localStorage.getItem('nursingplex-scraped-exams');
    const exams: ScrapedExam[] = existing ? JSON.parse(existing) : [];

    const existingIndex = exams.findIndex(e => e.examId === exam.examId);
    if (existingIndex >= 0) {
      exams[existingIndex] = exam;
    } else {
      exams.push(exam);
    }

    localStorage.setItem('nursingplex-scraped-exams', JSON.stringify(exams));
  } catch (error) {
    console.error('Failed to save scraped exam:', error);
    throw error;
  }
}

// Load all scraped exams
export function loadScrapedExams(): ScrapedExam[] {
  try {
    const saved = localStorage.getItem('nursingplex-scraped-exams');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Failed to load scraped exams:', error);
  }
  return [];
}

// Delete a scraped exam
export function deleteScrapedExam(examId: string): void {
  try {
    const existing = localStorage.getItem('nursingplex-scraped-exams');
    if (existing) {
      const exams: ScrapedExam[] = JSON.parse(existing);
      const filtered = exams.filter(e => e.examId !== examId);
      localStorage.setItem('nursingplex-scraped-exams', JSON.stringify(filtered));
    }
  } catch (error) {
    console.error('Failed to delete scraped exam:', error);
  }
}
