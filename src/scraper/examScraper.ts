// Nursing Exam Scraper
// Scrapes exams from NursingPlex and organizes by category

export interface ScrapedExam {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  examType: string;
  source: string;
  totalQuestions: number;
  url: string;
  reviewUrl: string;
  scraped: boolean;
  questions?: any[];
}

// Parse exam listings from NursingPlex
export function parseExamListings(html: string): ScrapedExam[] {
  const exams: ScrapedExam[] = [];
  
  // Extract exam blocks
  const examBlocks = html.match(/## ([^\n]+)\n\n(\d+) questions[\s\S]*?\[Review\]\(([^)]+)\)/g);
  
  if (!examBlocks) return exams;
  
  examBlocks.forEach(block => {
    const titleMatch = block.match(/## ([^\n]+)/);
    const questionsMatch = block.match(/(\d+) questions/);
    const urlMatch = block.match(/\[Review\]\(([^)]+)\)/);
    
    if (titleMatch && questionsMatch && urlMatch) {
      const fullTitle = titleMatch[1].trim();
      const totalQuestions = parseInt(questionsMatch[1]);
      const reviewUrl = urlMatch[1];
      
      // Parse category from title prefix
      const { category, subcategory, examType } = categorizeExam(fullTitle);
      
      exams.push({
        id: generateExamId(fullTitle),
        title: fullTitle,
        category,
        subcategory,
        examType,
        source: 'NursingPlex',
        totalQuestions,
        url: reviewUrl.replace('/review/', '/exam/') + '?mode=exam',
        reviewUrl,
        scraped: false
      });
    }
  });
  
  return exams;
}

// Categorize exam based on title
function categorizeExam(title: string): { category: string; subcategory: string; examType: string } {
  const titleLower = title.toLowerCase();
  
  // RN Exit exams
  if (titleLower.includes('rn exit') || titleLower.includes('rn comprehensive predictor')) {
    if (titleLower.includes('ati')) {
      return { category: 'RN_Exit', subcategory: 'ati', examType: 'Comprehensive Predictor' };
    } else if (titleLower.includes('hesi')) {
      return { category: 'RN_Exit', subcategory: 'hesi', examType: 'Exit Exam' };
    }
  }
  
  // LPN Exit exams
  if (titleLower.includes('lpn exit') || titleLower.includes('pn comprehensive predictor')) {
    if (titleLower.includes('ati')) {
      return { category: 'LPN_Exit', subcategory: 'ati', examType: 'Comprehensive Predictor' };
    } else if (titleLower.includes('hesi')) {
      return { category: 'LPN_Exit', subcategory: 'hesi', examType: 'Exit Exam' };
    }
  }
  
  // RN ATI exams
  if (titleLower.startsWith('ati') && !titleLower.includes('lpn')) {
    const subject = extractSubject(title);
    return { category: 'RN', subcategory: 'ati', examType: subject };
  }
  
  // LPN ATI exams
  if (titleLower.includes('ati lpn') || titleLower.includes('ati pn')) {
    const subject = extractSubject(title);
    return { category: 'LPN', subcategory: 'ati', examType: subject };
  }
  
  // RN HESI exams
  if (titleLower.includes('hesi rn') || (titleLower.includes('hesi') && !titleLower.includes('lpn') && !titleLower.includes('pn'))) {
    const subject = extractSubject(title);
    return { category: 'RN', subcategory: 'hesi', examType: subject };
  }
  
  // LPN HESI exams
  if (titleLower.includes('hesi lpn') || titleLower.includes('hesi pn')) {
    const subject = extractSubject(title);
    return { category: 'LPN', subcategory: 'hesi', examType: subject };
  }
  
  // RN Regular exams
  if (titleLower.includes('rn regular') || titleLower.startsWith('rn ')) {
    const subject = extractSubject(title);
    return { category: 'RN', subcategory: 'regular', examType: subject };
  }
  
  // LPN Regular exams
  if (titleLower.includes('lpn regular') || titleLower.startsWith('lpn ')) {
    const subject = extractSubject(title);
    return { category: 'LPN', subcategory: 'regular', examType: subject };
  }
  
  // Certification exams
  if (titleLower.includes('certification') || titleLower.includes('cna') || titleLower.includes('phlebotomy')) {
    return { category: 'RN', subcategory: 'certification', examType: extractSubject(title) };
  }
  
  // Default categorization
  return { category: 'RN', subcategory: 'regular', examType: extractSubject(title) };
}

// Extract subject from exam title
function extractSubject(title: string): string {
  const subjects = [
    'Fundamentals', 'Fundamental', 'Foundation',
    'Med-Surg', 'Medical Surgical', 'Medical-Surgical', 'Adult Health',
    'Mental Health', 'Psychiatric', 'Psychology',
    'Maternity', 'Maternal', 'Obstetrics', 'OB',
    'Pediatrics', 'Pediatric', 'Paediatrics',
    'Pharmacology', 'Pharmocology',
    'Community Health', 'Community',
    'Leadership', 'Management',
    'Health Assessment', 'Assessment',
    'Dosage Calculation', 'Dosage',
    'Anatomy', 'Physiology',
    'Pathophysiology', 'Pathophisiology',
    'Microbiology',
    'Nutrition',
    'Capstone',
    'Physical Assessment'
  ];
  
  const titleLower = title.toLowerCase();
  
  for (const subject of subjects) {
    if (titleLower.includes(subject.toLowerCase())) {
      return subject;
    }
  }
  
  return 'General';
}

// Generate unique exam ID
function generateExamId(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 50);
}

// Scrape questions from exam review page
export async function scrapeExamQuestions(reviewUrl: string): Promise<any[]> {
  try {
    const response = await fetch(reviewUrl);
    const html = await response.text();
    
    const questions: any[] = [];
    
    // Extract question blocks
    // Look for question patterns in the HTML
    const questionPattern = /<li[^>]*class="mb-5"[^>]*>([\s\S]*?)<\/li>/g;
    let match;
    let questionNumber = 1;
    
    while ((match = questionPattern.exec(html)) !== null) {
      const questionHtml = match[1];
      
      // Extract question text
      const textMatch = questionHtml.match(/<span[^>]*>([\s\S]*?)<\/span>/);
      if (!textMatch) continue;
      
      const questionText = textMatch[1]
        .replace(/<[^>]+>/g, '')
        .replace(/\s+/g, ' ')
        .trim();
      
      // Extract answer choices
      const choices: string[] = [];
      const choicePattern = /<span[^>]*>([A-Z])\)<\/span><span[^>]*>([\s\S]*?)<\/span>/g;
      let choiceMatch;
      
      while ((choiceMatch = choicePattern.exec(questionHtml)) !== null) {
        const choiceText = choiceMatch[2]
          .replace(/<[^>]+>/g, '')
          .replace(/\s+/g, ' ')
          .trim();
        choices.push(choiceText);
      }
      
      if (questionText && choices.length > 0) {
        questions.push({
          number: questionNumber,
          text: questionText,
          choices,
          page: Math.ceil(questionNumber / 4) // Approximate page number
        });
        questionNumber++;
      }
    }
    
    return questions;
  } catch (error) {
    console.error('Error scraping exam:', error);
    return [];
  }
}

// Batch scrape multiple exams
export async function batchScrapeExams(exams: ScrapedExam[]): Promise<ScrapedExam[]> {
  const results: ScrapedExam[] = [];
  
  for (const exam of exams) {
    console.log(`Scraping: ${exam.title}`);
    
    try {
      const questions = await scrapeExamQuestions(exam.reviewUrl);
      
      results.push({
        ...exam,
        questions,
        scraped: questions.length > 0
      });
      
      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`Failed to scrape ${exam.title}:`, error);
      results.push({ ...exam, scraped: false });
    }
  }
  
  return results;
}
