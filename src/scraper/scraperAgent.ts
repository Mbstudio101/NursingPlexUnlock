// Scraper Agent - Automated exam scraper and organizer
// Uses NursingPlex's public document listing to discover and scrape exams

export interface ScraperTask {
  id: string;
  url: string;
  title: string;
  status: 'pending' | 'scraping' | 'completed' | 'failed' | 'queued';
  progress: number;
  totalQuestions: number;
  scrapedQuestions: number;
  error?: string;
  startedAt?: string;
  completedAt?: string;
}

export interface ScraperQueue {
  tasks: ScraperTask[];
  isRunning: boolean;
  currentTaskId: string | null;
  totalCompleted: number;
  totalFailed: number;
  lastRunAt?: string;
}

// Known exam URLs from NursingPlex documents page
export const KNOWN_EXAM_URLS = [
  // RN ATI Exams
  { url: 'https://nursingplex.com/review/ati-rn-fundamentals-2026-proctored-exam-1778745801', title: 'ATI RN Fundamentals 2026', category: 'RN', subcategory: 'ATI' },
  { url: 'https://nursingplex.com/review/ati-rn-adult-medical-surgical-2026-proctored-exam-1778495930', title: 'ATI RN Adult Medical Surgical 2026', category: 'RN', subcategory: 'ATI' },
  { url: 'https://nursingplex.com/review/ati-rn-pharmacology-2026-proctored-exam-1778567014', title: 'ATI RN Pharmacology 2026', category: 'RN', subcategory: 'ATI' },
  { url: 'https://nursingplex.com/review/ati-rn-mental-health-2026-coker-u-bsn-proctored-exam-1778588758', title: 'ATI RN Mental Health 2026', category: 'RN', subcategory: 'ATI' },
  { url: 'https://nursingplex.com/review/ati-rn-pediatric-nursing-2026-proctored-exam-1778567908', title: 'ATI RN Pediatric Nursing 2026', category: 'RN', subcategory: 'ATI' },
  { url: 'https://nursingplex.com/review/ati-rn-maternal-newborn-proctored-exam-2026-1762782241', title: 'ATI RN Maternal Newborn 2026', category: 'RN', subcategory: 'ATI' },
  { url: 'https://nursingplex.com/review/ati-rn-community-health-proctored-exam-1764760247', title: 'ATI RN Community Health', category: 'RN', subcategory: 'ATI' },
  { url: 'https://nursingplex.com/review/ati-rn-leadership-2026-proctored-exam-1778498384', title: 'ATI RN Leadership 2026', category: 'RN', subcategory: 'ATI' },
  { url: 'https://nursingplex.com/review/ati-rn-nutrition-2026-1749109029-1756194599', title: 'ATI RN Nutrition 2026', category: 'RN', subcategory: 'ATI' },
  
  // RN HESI Exams
  { url: 'https://nursingplex.com/review/hesi-rn-adult-health-17192134012', title: 'HESI RN Adult Health', category: 'RN', subcategory: 'HESI' },
  { url: 'https://nursingplex.com/review/hesi-rn-med-surg-proctored-examichs-1775798302', title: 'HESI RN Med Surg', category: 'RN', subcategory: 'HESI' },
  { url: 'https://nursingplex.com/review/hesi-rn-psychology-proctored-exam-mental-health-1773058688', title: 'HESI RN Mental Health', category: 'RN', subcategory: 'HESI' },
  { url: 'https://nursingplex.com/review/hesi-pharmacology-exam-1759987683', title: 'HESI Pharmacology', category: 'RN', subcategory: 'HESI' },
  { url: 'https://nursingplex.com/review/hesi-rn-pediatric-and-women-health-wgu-proctored-exam-1770789361', title: 'HESI RN Pediatric', category: 'RN', subcategory: 'HESI' },
  { url: 'https://nursingplex.com/review/hesi-obstetrics-maternity-proctored-exam-1768382371', title: 'HESI Obstetrics & Maternity', category: 'RN', subcategory: 'HESI' },
  { url: 'https://nursingplex.com/review/hesi-rn-fundamentals-exam-1749794933', title: 'HESI RN Fundamentals', category: 'RN', subcategory: 'HESI' },
  { url: 'https://nursingplex.com/review/hesi-rn-dosage-calculation-1749470811', title: 'HESI RN Dosage Calculation', category: 'RN', subcategory: 'HESI' },
  
  // RN Regular Exams
  { url: 'https://nursingplex.com/review/pharmacology-chicago-state-university-proctored-exam-1778563471', title: 'Pharmacology Chicago State', category: 'RN', subcategory: 'Regular' },
  { url: 'https://nursingplex.com/review/w126-n241-med-surg-proctored-exam-swedish-insistute-1778661375', title: 'W126 N241 Med Surg', category: 'RN', subcategory: 'Regular' },
  { url: 'https://nursingplex.com/review/nur-205-a-mental-health-final-proctored-exam-winter-swedish-institute-1778155831', title: 'NUR 205 Mental Health', category: 'RN', subcategory: 'Regular' },
  { url: 'https://nursingplex.com/review/nurs-3527-health-and-healing-community-final-test-proctored-exam-1778482445', title: 'NURS 3527 Community Health', category: 'RN', subcategory: 'Regular' },
  { url: 'https://nursingplex.com/review/nurs-336-nursing-leadership-and-management-proctored-exam-1778477817', title: 'NURS 336 Leadership', category: 'RN', subcategory: 'Regular' },
  { url: 'https://nursingplex.com/review/advanced-pathophysiology-proctored-exam-1778225271', title: 'Advanced Pathophysiology', category: 'RN', subcategory: 'Regular' },
  { url: 'https://nursingplex.com/review/microbiology-proctored-exam-1775805075', title: 'Microbiology', category: 'RN', subcategory: 'Regular' },
  { url: 'https://nursingplex.com/review/anatomy-and-physiology-ii-w-lab-module-8-proctored-exam-1775815134', title: 'Anatomy & Physiology II', category: 'RN', subcategory: 'Regular' },
  { url: 'https://nursingplex.com/review/health-assessment-and-promotion-proctored-exam-3-2026-1778651833', title: 'Health Assessment 2026', category: 'RN', subcategory: 'Regular' },
  { url: 'https://nursingplex.com/review/nurs-227-pediatric-nursing-1775565414', title: 'NURS 227 Pediatric', category: 'RN', subcategory: 'Regular' },
  { url: 'https://nursingplex.com/review/maternal-newborn-proctored-exam-2-1778741060', title: 'Maternal Newborn', category: 'RN', subcategory: 'Regular' },
  
  // RN Certification
  { url: 'https://nursingplex.com/review/cna-exam-1727182232-1749730268', title: 'CNA Exam', category: 'RN', subcategory: 'Certification' },
  { url: 'https://nursingplex.com/review/phlebotomy-certification-exam-130-1721651750-1749730268', title: 'Phlebotomy Certification', category: 'RN', subcategory: 'Certification' },
  
  // LPN ATI Exams
  { url: 'https://nursingplex.com/review/ati-lpn-fundamentals-proctored-exam-applied-skills-ii-1778137957', title: 'ATI LPN Fundamentals', category: 'LPN', subcategory: 'ATI' },
  { url: 'https://nursingplex.com/review/ati-lpn-med-surg-proctored-exam-successful-career-institute-1783430391', title: 'ATI LPN Med Surg', category: 'LPN', subcategory: 'ATI' },
  { url: 'https://nursingplex.com/review/ati-lpn-pharmacology-fa25-proctored-exam-1770626920', title: 'ATI LPN Pharmacology', category: 'LPN', subcategory: 'ATI' },
  { url: 'https://nursingplex.com/review/ati-pn-mental-health-2026-proctored-exam-1778231930', title: 'ATI PN Mental Health 2026', category: 'LPN', subcategory: 'ATI' },
  { url: 'https://nursingplex.com/review/ati-lpn-paediatrics-nursing-cohort-5-proctored-exam-1764749171', title: 'ATI LPN Pediatrics', category: 'LPN', subcategory: 'ATI' },
  { url: 'https://nursingplex.com/review/ati-pn-maternal-newborn-2026-proctored-exam-1778742733', title: 'ATI PN Maternal Newborn 2026', category: 'LPN', subcategory: 'ATI' },
  { url: 'https://nursingplex.com/review/ati-lpn-leadership-proctored-exam-1762258666', title: 'ATI LPN Leadership', category: 'LPN', subcategory: 'ATI' },
  { url: 'https://nursingplex.com/review/ati-lpn-anatomy-and-physiology-part-2-proctored-exam-1768380226', title: 'ATI LPN Anatomy & Physiology', category: 'LPN', subcategory: 'ATI' },
  { url: 'https://nursingplex.com/review/ati-lpn-dosage-calculation-proctored-exam-1772715829', title: 'ATI LPN Dosage Calculation', category: 'LPN', subcategory: 'ATI' },
  { url: 'https://nursingplex.com/review/ati-lpn-nutrition-exam-1751973723', title: 'ATI LPN Nutrition', category: 'LPN', subcategory: 'ATI' },
  
  // LPN HESI Exams
  { url: 'https://nursingplex.com/review/hesi-capstone-pn-1709632008', title: 'HESI Capstone PN', category: 'LPN', subcategory: 'HESI' },
  { url: 'https://nursingplex.com/review/lpn-hesi-fundamentals-examwgu-1762337353', title: 'LPN HESI Fundamentals', category: 'LPN', subcategory: 'HESI' },
  
  // LPN Regular
  { url: 'https://nursingplex.com/review/lpn-fundamentals-proctored-exam-1778678552', title: 'LPN Fundamentals', category: 'LPN', subcategory: 'Regular' },
  
  // RN Exit ATI
  { url: 'https://nursingplex.com/review/rn-comprehensive-predictor-2026-v2', title: 'RN Comprehensive Predictor 2026 V2', category: 'RN_Exit', subcategory: 'ATI' },
  { url: 'https://nursingplex.com/review/rn-comprehensive-predictor-2026-proctored-exam-1776317689', title: 'RN Comprehensive Predictor 2026', category: 'RN_Exit', subcategory: 'ATI' },
  { url: 'https://nursingplex.com/review/ati-rn-vati-comprehensive-predictor-proctored-exam', title: 'ATI RN VATI Comprehensive Predictor', category: 'RN_Exit', subcategory: 'ATI' },
  
  // RN Exit HESI
  { url: 'https://nursingplex.com/review/rn-hesi-exit-exam-mcphs-1775539819', title: 'RN HESI Exit Exam MCPHS', category: 'RN_Exit', subcategory: 'HESI' },
  { url: 'https://nursingplex.com/review/hesi-rn-exit-exam-mcphs-worcester-bsn-proctored-exam-1776748006', title: 'HESI RN Exit Exam Worcester', category: 'RN_Exit', subcategory: 'HESI' },
  { url: 'https://nursingplex.com/review/bsn-366-rn-hesi-exit-nightingale-proctored-exam-1775541657', title: 'BSN 366 RN HESI Exit Nightingale', category: 'RN_Exit', subcategory: 'HESI' },
  { url: 'https://nursingplex.com/review/ngu-hesi-rn-compass-exit-proctored-exam-1764771965', title: 'HESI RN Compass Exit', category: 'RN_Exit', subcategory: 'HESI' },
  
  // LPN Exit ATI
  { url: 'https://nursingplex.com/review/ati-pn-comprehensive-predictor-2026-proctored-exam-1778048987', title: 'ATI PN Comprehensive Predictor 2026', category: 'LPN_Exit', subcategory: 'ATI' },
  { url: 'https://nursingplex.com/review/ati-lpn-comprehensive-predictor-2026-proctored-exam-1770280452', title: 'ATI LPN Comprehensive Predictor 2026', category: 'LPN_Exit', subcategory: 'ATI' },
  { url: 'https://nursingplex.com/review/vati-pn-comprehensive-predictor-proctored-exam-1773044573', title: 'VATI PN Comprehensive Predictor', category: 'LPN_Exit', subcategory: 'ATI' },
  { url: 'https://nursingplex.com/review/pn-comprehensive-predictor-2026-proctored-exam-1768379193', title: 'PN Comprehensive Predictor 2026', category: 'LPN_Exit', subcategory: 'ATI' },
  
  // LPN Exit HESI
  { url: 'https://nursingplex.com/review/hesi-lpn-exit-proctored-exam-1762759603', title: 'HESI LPN Exit', category: 'LPN_Exit', subcategory: 'HESI' },
  { url: 'https://nursingplex.com/review/hesi-lpn-exit-exam-1722425419', title: 'HESI LPN Exit Exam IV', category: 'LPN_Exit', subcategory: 'HESI' },
  { url: 'https://nursingplex.com/review/hesi-lpn-exit-test-11-1705654224', title: 'HESI LPN Exit Test 11', category: 'LPN_Exit', subcategory: 'HESI' },
  { url: 'https://nursingplex.com/review/hesi-pn-exit-2026-ii-1697181251', title: 'HESI PN Exit 2026 II', category: 'LPN_Exit', subcategory: 'HESI' },
  
  // Additional exams
  { url: 'https://nursingplex.com/review/sp26-504w-advanced-med-surg-proctored-exam-massachusetts-college-1772777607', title: 'SP26 504W Advanced Med-Surg', category: 'RN', subcategory: 'Regular' },
  { url: 'https://nursingplex.com/review/advanced-med-surghealth-and-wellness-proctored-exammassachusetts-college-of-pharmacy-and-health-sciences-1775628000', title: 'Advanced Med-Surg Health & Wellness', category: 'RN', subcategory: 'Regular' },
  { url: 'https://nursingplex.com/review/advanced-med-surg-proctored-exam-mchps-1778479982', title: 'Advanced Med Surg MCHPS', category: 'RN', subcategory: 'Regular' },
  { url: 'https://nursingplex.com/review/ati-dosage-calculation-rn-fundamentals-proctored-assessment-32-1733390219', title: 'ATI Dosage Calculation Fundamentals', category: 'RN', subcategory: 'ATI' },
  { url: 'https://nursingplex.com/review/ati-dosage-calculation-rn-fundamentals-assessment-32-1733145745', title: 'ATI Dosage Calculation Fundamentals V2', category: 'RN', subcategory: 'ATI' },
  { url: 'https://nursingplex.com/review/ati-rn-dosage-calculation-rn-maternal-newborn-proctored-assessment-32-1762238371', title: 'ATI Dosage Calculation Maternal Newborn', category: 'RN', subcategory: 'ATI' },
  { url: 'https://nursingplex.com/review/nur404w-mcphs-obstetrics-maternity-proctored-exam-examplify-1762761872', title: 'NUR404W MCPHS Obstetrics Maternity', category: 'RN', subcategory: 'Regular' },
];

// Already scraped exam IDs
export const ALREADY_SCRAPED = [
  'rn-hesi-exit-mcphs',
  'rn-ati-fundamentals-2026',
  'rn-ati-med-surg-2026',
  'rn-ati-pharmacology-2026',
  'rn-sp26-advanced-med-surg',
  'rn-advanced-med-surg-health-wellness',
  'rn-advanced-med-surg-mchps',
  'rn-ati-dosage-calculation-20240115',
  'rn-ati-dosage-calculation-20240115-v2',
  'rn-ati-dosage-calculation-maternal-newborn-20240115',
  'rn-nur404w-obstetrics-maternity-20240115',
];

// Parse exam content from HTML
export function parseExamFromHTML(html: string, url: string, title: string): any {
  const questions: any[] = [];
  
  // Extract question blocks using regex
  const questionRegex = /(\d+)\.\s+([\s\S]*?)(?=\d+\.\s+|## Unlock|Page \d+|$)/g;
  let match;
  
  while ((match = questionRegex.exec(html)) !== null) {
    const qNum = parseInt(match[1]);
    const qContent = match[2].trim();
    
    if (!qContent || qContent.length < 10) continue;
    
    // Extract answer choices
    const choices: string[] = [];
    const choiceRegex = /[A-G]\)\s*([^\n]+(?:\n(?![A-G]\)|View Rationale)[^\n]*)*)/g;
    let choiceMatch;
    
    while ((choiceMatch = choiceRegex.exec(qContent)) !== null) {
      choices.push(choiceMatch[1].trim());
    }
    
    // Extract question text (before choices)
    let questionText = qContent;
    if (choices.length > 0) {
      const firstChoiceIndex = qContent.indexOf(choices[0].substring(0, 20));
      if (firstChoiceIndex > 0) {
        questionText = qContent.substring(0, firstChoiceIndex).trim();
      }
    }
    
    // Clean up question text
    questionText = questionText
      .replace(/View Rationale/g, '')
      .replace(/View Case Study/g, '')
      .replace(/\n+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    
    if (questionText.length < 10) continue;
    
    const question: any = {
      number: qNum,
      text: questionText,
    };
    
    if (choices.length > 0) {
      question.choices = choices;
      if (choices.length > 4 || questionText.toLowerCase().includes('select all that apply')) {
        question.isSATA = true;
      }
    } else if (questionText.toLowerCase().includes('round') || questionText.toLowerCase().includes('how many') || questionText.toLowerCase().includes('record numerical')) {
      question.type = 'numeric';
    }
    
    questions.push(question);
  }
  
  return {
    examId: generateExamId(title),
    title,
    totalQuestions: questions.length,
    scrapedDate: new Date().toISOString().split('T')[0],
    questions,
    sourceUrl: url,
  };
}

function generateExamId(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 50) + '-' + Date.now().toString(36);
}

// Categorize exam based on title and URL
export function categorizeExam(url: string, title: string): { category: string; subcategory: string } {
  const urlLower = url.toLowerCase();
  const titleLower = title.toLowerCase();
  
  // RN Exit
  if (urlLower.includes('comprehensive-predictor') || urlLower.includes('exit-exam') || urlLower.includes('hesi-rn-compass')) {
    if (urlLower.includes('ati') || urlLower.includes('vati')) {
      return { category: 'RN_Exit', subcategory: 'ATI' };
    }
    return { category: 'RN_Exit', subcategory: 'HESI' };
  }
  
  // LPN Exit
  if (urlLower.includes('lpn-exit') || urlLower.includes('pn-exit') || (urlLower.includes('comprehensive-predictor') && (urlLower.includes('lpn') || urlLower.includes('pn-')))) {
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

// Save scraper state to localStorage
export function saveScraperState(state: ScraperQueue): void {
  try {
    localStorage.setItem('nursingplex-scraper-state', JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save scraper state:', e);
  }
}

// Load scraper state from localStorage
export function loadScraperState(): ScraperQueue | null {
  try {
    const saved = localStorage.getItem('nursingplex-scraper-state');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load scraper state:', e);
  }
  return null;
}

// Save scraped exam data to localStorage
export function saveScrapedExam(examData: any): void {
  try {
    const existing = localStorage.getItem('nursingplex-scraped-exams');
    const exams = existing ? JSON.parse(existing) : [];
    
    // Check if exam already exists
    const existingIndex = exams.findIndex((e: any) => e.examId === examData.examId);
    if (existingIndex >= 0) {
      exams[existingIndex] = examData;
    } else {
      exams.push(examData);
    }
    
    localStorage.setItem('nursingplex-scraped-exams', JSON.stringify(exams));
  } catch (e) {
    console.error('Failed to save scraped exam:', e);
  }
}

// Load all scraped exams from localStorage
export function loadScrapedExams(): any[] {
  try {
    const saved = localStorage.getItem('nursingplex-scraped-exams');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load scraped exams:', e);
  }
  return [];
}

// Get pending exams (not yet scraped)
export function getPendingExams(): typeof KNOWN_EXAM_URLS {
  const scrapedExams = loadScrapedExams();
  const scrapedUrls = new Set(scrapedExams.map((e: any) => e.sourceUrl));
  
  return KNOWN_EXAM_URLS.filter(exam => !scrapedUrls.has(exam.url));
}

// Create initial scraper queue
export function createScraperQueue(): ScraperQueue {
  const pending = getPendingExams();
  
  return {
    tasks: pending.map((exam, index) => ({
      id: `task-${index}-${Date.now()}`,
      url: exam.url,
      title: exam.title,
      status: 'pending' as const,
      progress: 0,
      totalQuestions: 0,
      scrapedQuestions: 0,
    })),
    isRunning: false,
    currentTaskId: null,
    totalCompleted: 0,
    totalFailed: 0,
  };
}
