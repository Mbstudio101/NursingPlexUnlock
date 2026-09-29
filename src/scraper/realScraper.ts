// Real Scraper Service - Fetches and parses actual NursingPlex pages
// Uses CORS proxy to bypass cross-origin restrictions

export interface ScrapedQuestion {
  number: number;
  text: string;
  choices?: string[];
  type?: 'numeric' | 'dropdown' | 'matrix' | 'diagram';
  isSATA?: boolean;
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

// CORS proxy services - Updated with working alternatives
const CORS_PROXIES = [
  'https://api.allorigins.win/get?url=',
  'https://corsproxy.org/?',
  'https://thingproxy.freeboard.io/fetch/',
  'https://cors-anywhere.herokuapp.com/',
  'https://api.codetabs.com/v1/proxy?quest=',
];

let currentProxyIndex = 0;

// Fetch page content with CORS proxy fallback
export async function fetchPageWithProxy(url: string): Promise<string> {
  const errors: string[] = [];
  
  for (let i = 0; i < CORS_PROXIES.length; i++) {
    const proxyIndex = (currentProxyIndex + i) % CORS_PROXIES.length;
    const proxy = CORS_PROXIES[proxyIndex];
    
    try {
      const proxyUrl = proxy + encodeURIComponent(url);
      const response = await fetch(proxyUrl, {
        method: 'GET',
        headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      let html = await response.text();
      
      // Handle different proxy response formats
      // allorigins.win/get returns JSON with contents field
      if (proxy.includes('allorigins.win/get')) {
        try {
          const json = JSON.parse(html);
          html = json.contents || html;
        } catch (e) {
          // If not JSON, use as-is
        }
      }
      
      if (html && html.length > 1000) {
        currentProxyIndex = proxyIndex; // Remember working proxy
        return html;
      }
      
      throw new Error('Response too short or empty');
    } catch (error) {
      errors.push(`Proxy ${proxyIndex}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      continue;
    }
  }
  
  throw new Error(`All proxies failed:\n${errors.join('\n')}`);
}

// Parse exam content from HTML
export function parseExamFromHTML(html: string, url: string, title: string): ScrapedExam {
  const questions: ScrapedQuestion[] = [];
  
  // Create a temporary DOM parser
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  
  // Find all question containers
  const questionElements = doc.querySelectorAll('li[id^="review-q-"]');
  
  questionElements.forEach((element) => {
    try {
      const question = parseQuestionElement(element);
      if (question) {
        questions.push(question);
      }
    } catch (error) {
      console.error('Error parsing question:', error);
    }
  });
  
  // If no questions found with ID pattern, try alternative parsing
  if (questions.length === 0) {
    const altQuestions = parseQuestionsAlternative(html);
    questions.push(...altQuestions);
  }
  
  // Categorize exam
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

// Parse individual question element
function parseQuestionElement(element: Element): ScrapedQuestion | null {
  const id = element.getAttribute('id') || '';
  const match = id.match(/review-q-([a-f0-9-]+)/);
  
  if (!match) return null;
  
  // Extract question number from text
  const textContent = element.textContent || '';
  const numberMatch = textContent.match(/^(\d+)\./);
  const questionNumber = numberMatch ? parseInt(numberMatch[1]) : 0;
  
  // Extract question text
  const questionSpan = element.querySelector('span[style*="font-weight: 400"]');
  const questionText = questionSpan?.textContent?.trim() || '';
  
  if (!questionText || questionText.length < 10) return null;
  
  // Extract answer choices
  const choices: string[] = [];
  const choiceElements = element.querySelectorAll('div.flex.items-baseline.gap-1');
  
  choiceElements.forEach((choiceEl) => {
    const choiceText = choiceEl.textContent?.trim() || '';
    // Remove the letter prefix (A), B), etc.)
    const cleanedChoice = choiceText.replace(/^[A-G]\)\s*/, '').trim();
    if (cleanedChoice) {
      choices.push(cleanedChoice);
    }
  });
  
  const question: ScrapedQuestion = {
    number: questionNumber,
    text: questionText,
  };
  
  if (choices.length > 0) {
    question.choices = choices;
    
    // Check if SATA
    if (questionText.toLowerCase().includes('select all that apply') || 
        questionText.toLowerCase().includes('(sata)') ||
        choices.length > 4) {
      question.isSATA = true;
    }
  } else {
    // Check if numeric question
    if (questionText.toLowerCase().includes('round') || 
        questionText.toLowerCase().includes('how many') ||
        questionText.toLowerCase().includes('record numerical')) {
      question.type = 'numeric';
    } else if (questionText.includes('_____') || questionText.includes('___')) {
      question.type = 'dropdown';
    }
  }
  
  return question;
}

// Alternative parsing method for different HTML structures
function parseQuestionsAlternative(html: string): ScrapedQuestion[] {
  const questions: ScrapedQuestion[] = [];
  
  // Try to find questions by number pattern
  const questionRegex = /(\d+)\.\s+([\s\S]*?)(?=\d+\.\s+|## Unlock|Page \d+|$)/g;
  let match;
  
  while ((match = questionRegex.exec(html)) !== null) {
    const qNum = parseInt(match[1]);
    const qContent = match[2].trim();
    
    if (!qContent || qContent.length < 10) continue;
    
    // Extract choices
    const choices: string[] = [];
    const choiceRegex = /[A-G]\)\s*([^\n]+(?:\n(?![A-G]\)|View Rationale)[^\n]*)*)/g;
    let choiceMatch;
    
    while ((choiceMatch = choiceRegex.exec(qContent)) !== null) {
      choices.push(choiceMatch[1].trim());
    }
    
    // Extract question text
    let questionText = qContent;
    if (choices.length > 0) {
      const firstChoiceIndex = qContent.indexOf(choices[0].substring(0, 20));
      if (firstChoiceIndex > 0) {
        questionText = qContent.substring(0, firstChoiceIndex).trim();
      }
    }
    
    // Clean up
    questionText = questionText
      .replace(/View Rationale/g, '')
      .replace(/View Case Study/g, '')
      .replace(/\n+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    
    if (questionText.length < 10) continue;
    
    const question: ScrapedQuestion = {
      number: qNum,
      text: questionText,
    };
    
    if (choices.length > 0) {
      question.choices = choices;
      if (choices.length > 4 || questionText.toLowerCase().includes('select all that apply')) {
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
  
  // RN Exit
  if (urlLower.includes('comprehensive-predictor') || 
      urlLower.includes('exit-exam') || 
      urlLower.includes('hesi-rn-compass')) {
    if (urlLower.includes('ati') || urlLower.includes('vati')) {
      return { category: 'RN_Exit', subcategory: 'ATI' };
    }
    return { category: 'RN_Exit', subcategory: 'HESI' };
  }
  
  // LPN Exit
  if (urlLower.includes('lpn-exit') || 
      urlLower.includes('pn-exit') || 
      (urlLower.includes('comprehensive-predictor') && 
       (urlLower.includes('lpn') || urlLower.includes('pn-')))) {
    if (urlLower.includes('ati') || urlLower.includes('vati')) {
      return { category: 'LPN_Exit', subcategory: 'ATI' };
    }
    return { category: 'LPN_Exit', subcategory: 'HESI' };
  }
  
  // LPN
  if (urlLower.includes('lpn') || urlLower.includes('-pn-')) {
    if (urlLower.includes('ati')) return { category: 'LPN', subcategory: 'ATI' };
    if (urlLower.includes('hesi')) return { category: 'LPN', subcategory: 'HESI' };
    return { category: 'LPN', subcategory: 'Regular' };
  }
  
  // RN
  if (urlLower.includes('ati')) return { category: 'RN', subcategory: 'ATI' };
  if (urlLower.includes('hesi')) return { category: 'RN', subcategory: 'HESI' };
  if (urlLower.includes('cna') || urlLower.includes('phlebotomy') || urlLower.includes('certification')) {
    return { category: 'RN', subcategory: 'Certification' };
  }
  
  return { category: 'RN', subcategory: 'Regular' };
}

// Generate unique exam ID
function generateExamId(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 50) + '-' + Date.now().toString(36);
}

// Scrape single exam
export async function scrapeExam(
  url: string, 
  title: string,
  onProgress?: (progress: number, message: string) => void
): Promise<ScrapedExam> {
  onProgress?.(10, 'Fetching page content...');
  
  const html = await fetchPageWithProxy(url);
  
  onProgress?.(50, 'Parsing questions...');
  
  const exam = parseExamFromHTML(html, url, title);
  
  onProgress?.(90, 'Saving exam data...');
  
  // Save to localStorage
  saveScrapedExam(exam);
  
  onProgress?.(100, 'Complete!');
  
  return exam;
}

// Save scraped exam to localStorage
export function saveScrapedExam(exam: ScrapedExam): void {
  try {
    const existing = localStorage.getItem('nursingplex-scraped-exams');
    const exams: ScrapedExam[] = existing ? JSON.parse(existing) : [];
    
    // Check if exam already exists
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

// Scrape multiple exams in sequence
export async function scrapeMultipleExams(
  exams: Array<{ url: string; title: string }>,
  onProgress?: (completed: number, total: number, currentTitle: string) => void
): Promise<ScrapedExam[]> {
  const results: ScrapedExam[] = [];
  
  for (let i = 0; i < exams.length; i++) {
    const exam = exams[i];
    onProgress?.(i, exams.length, exam.title);
    
    try {
      const scraped = await scrapeExam(exam.url, exam.title);
      results.push(scraped);
      
      // Add delay between requests to avoid rate limiting
      if (i < exams.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    } catch (error) {
      console.error(`Failed to scrape ${exam.title}:`, error);
      // Continue with next exam
    }
  }
  
  onProgress?.(exams.length, exams.length, 'Complete');
  
  return results;
}
