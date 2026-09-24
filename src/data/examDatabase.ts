// Exam Database Schema
// Hierarchical structure for organizing nursing exams

export interface Exam {
  id: string;
  title: string;
  category: 'RN' | 'LPN' | 'RN_Exit' | 'LPN_Exit';
  subcategory: string;
  examType: string;
  source: string; // e.g., "NursingPlex", "ATI", "HESI"
  totalQuestions: number;
  totalPages?: number;
  freeQuestions?: number;
  dateAdded: string;
  dateScraped?: string;
  url?: string;
  status: 'active' | 'archived' | 'incomplete';
  questions?: any[]; // Reference to questions array
  notes?: string;
}

export interface ExamCategory {
  id: string;
  name: string;
  subcategories: {
    id: string;
    name: string;
    examTypes: string[];
  }[];
}

// Database structure
export const examCategories: ExamCategory[] = [
  {
    id: 'rn',
    name: 'RN Exams',
    subcategories: [
      { id: 'ati', name: 'ATI', examTypes: ['Fundamentals', 'Med-Surg', 'Mental Health', 'Maternity', 'Pediatrics', 'Community'] },
      { id: 'hesi', name: 'HESI', examTypes: ['Exit Exam', 'Specialty Exams'] },
      { id: 'regular', name: 'Regular', examTypes: ['Practice Exams', 'Mock Exams'] },
      { id: 'certification', name: 'Certification', examTypes: ['NCLEX Prep', 'Licensure Exams'] }
    ]
  },
  {
    id: 'lpn',
    name: 'LPN Exams',
    subcategories: [
      { id: 'ati', name: 'ATI', examTypes: ['Fundamentals', 'Med-Surg', 'Mental Health', 'Maternity', 'Pediatrics'] },
      { id: 'hesi', name: 'HESI', examTypes: ['Exit Exam', 'Specialty Exams'] },
      { id: 'regular', name: 'Regular', examTypes: ['Practice Exams', 'Mock Exams'] }
    ]
  },
  {
    id: 'rn_exit',
    name: 'RN Exit',
    subcategories: [
      { id: 'ati', name: 'ATI Exams', examTypes: ['Exit Exam', 'Comprehensive Predictor'] },
      { id: 'hesi', name: 'HESI Exams', examTypes: ['Exit Exam', 'Proctored Exams'] }
    ]
  },
  {
    id: 'lpn_exit',
    name: 'LPN Exit',
    subcategories: [
      { id: 'ati', name: 'ATI Exams', examTypes: ['Exit Exam', 'Comprehensive Predictor'] },
      { id: 'hesi', name: 'HESI Exams', examTypes: ['Exit Exam', 'Proctored Exams'] }
    ]
  }
];

// Initial exam database with the MCPHS exam we already scraped
export const examDatabase: Exam[] = [
  {
    id: 'rn-hesi-exit-mcphs-001',
    title: 'RN HESI Proctored Exit Exam - MCPHS',
    category: 'RN_Exit',
    subcategory: 'hesi',
    examType: 'Proctored Exams',
    source: 'NursingPlex',
    totalQuestions: 127,
    totalPages: 32,
    freeQuestions: 10,
    dateAdded: '2024-01-15',
    dateScraped: '2024-01-15',
    url: 'https://nursingplex.com/review/rn-hesi-exit-exam-mcphs-1775539819',
    status: 'active',
    notes: 'First exam successfully scraped with all 127 questions and 23 interactive question types'
  }
];

// Helper functions
export function getExamsByCategory(category: string): Exam[] {
  return examDatabase.filter(exam => exam.category === category);
}

export function getExamsBySubcategory(category: string, subcategory: string): Exam[] {
  return examDatabase.filter(exam => 
    exam.category === category && exam.subcategory === subcategory
  );
}

export function addExam(exam: Omit<Exam, 'id' | 'dateAdded'>): Exam {
  const newExam: Exam = {
    ...exam,
    id: `${exam.category}-${exam.subcategory}-${Date.now()}`,
    dateAdded: new Date().toISOString().split('T')[0]
  };
  examDatabase.push(newExam);
  return newExam;
}

export function updateExam(id: string, updates: Partial<Exam>): Exam | null {
  const index = examDatabase.findIndex(exam => exam.id === id);
  if (index === -1) return null;
  
  examDatabase[index] = { ...examDatabase[index], ...updates };
  return examDatabase[index];
}

export function deleteExam(id: string): boolean {
  const index = examDatabase.findIndex(exam => exam.id === id);
  if (index === -1) return false;
  
  examDatabase.splice(index, 1);
  return true;
}

export function getExamStats() {
  return {
    totalExams: examDatabase.length,
    byCategory: {
      RN: examDatabase.filter(e => e.category === 'RN').length,
      LPN: examDatabase.filter(e => e.category === 'LPN').length,
      RN_Exit: examDatabase.filter(e => e.category === 'RN_Exit').length,
      LPN_Exit: examDatabase.filter(e => e.category === 'LPN_Exit').length
    },
    totalQuestions: examDatabase.reduce((sum, exam) => sum + exam.totalQuestions, 0),
    activeExams: examDatabase.filter(e => e.status === 'active').length
  };
}
