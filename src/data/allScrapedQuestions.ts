// Combined questions from all scraped exams
import { questions as hesiQuestions } from './questions';
import { atiFundamentals2026 } from './ati-fundamentals-2026';
import { atiMedSurg2026 } from './ati-med-surg-2026';
import { atiPharmacology2026 } from './ati-pharmacology-2026';
import { sp26AdvancedMedSurg } from './sp26-advanced-med-surg';
import { advancedMedSurgHealthWellness } from './advanced-med-surg-health-wellness';

export interface ExamInfo {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  totalQuestions: number;
  scrapedDate: string;
  questions: any[];
}

// Debug: Log what we're loading
console.log('Loading exams...');
console.log('HESI questions:', hesiQuestions?.length || 0);
console.log('ATI Fundamentals questions:', atiFundamentals2026?.questions?.length || 0);
console.log('ATI Med-Surg questions:', atiMedSurg2026?.questions?.length || 0);
console.log('ATI Pharmacology questions:', atiPharmacology2026?.questions?.length || 0);
console.log('SP26 Advanced Med-Surg questions:', sp26AdvancedMedSurg?.questions?.length || 0);
console.log('Advanced Med-Surg Health Wellness questions:', advancedMedSurgHealthWellness?.questions?.length || 0);

export const allScrapedExams: ExamInfo[] = [
  {
    id: 'rn-hesi-exit-mcphs',
    title: 'RN HESI Exit Exam - MCPHS',
    category: 'RN Exit',
    subcategory: 'HESI',
    totalQuestions: 127,
    scrapedDate: '2024-01-15',
    questions: hesiQuestions || []
  },
  {
    id: 'rn-ati-fundamentals-2026',
    title: 'ATI RN Fundamentals 2026',
    category: 'RN',
    subcategory: 'ATI',
    totalQuestions: 69,
    scrapedDate: '2024-01-15',
    questions: atiFundamentals2026?.questions || []
  },
  {
    id: 'rn-ati-med-surg-2026',
    title: 'ATI RN Adult Medical Surgical 2026',
    category: 'RN',
    subcategory: 'ATI',
    totalQuestions: 97,
    scrapedDate: '2024-01-15',
    questions: atiMedSurg2026?.questions || []
  },
  {
    id: 'rn-ati-pharmacology-2026',
    title: 'ATI RN Pharmacology 2026',
    category: 'RN',
    subcategory: 'ATI',
    totalQuestions: 70,
    scrapedDate: '2024-01-15',
    questions: atiPharmacology2026?.questions || []
  },
  {
    id: 'rn-sp26-advanced-med-surg',
    title: 'SP26 504W Advanced Med-Surg Proctored Exam (Massachusetts College)',
    category: 'RN',
    subcategory: 'Regular',
    totalQuestions: 40,
    scrapedDate: '2024-01-15',
    questions: sp26AdvancedMedSurg?.questions || []
  },
  {
    id: 'rn-advanced-med-surg-health-wellness',
    title: 'Advanced Med-Surg/Health And Wellness Proctored Exam (MCPHS)',
    category: 'RN',
    subcategory: 'Regular',
    totalQuestions: 50,
    scrapedDate: '2024-01-15',
    questions: advancedMedSurgHealthWellness?.questions || []
  }
];

console.log('Total exams loaded:', allScrapedExams.length);
console.log('Exams:', allScrapedExams.map(e => `${e.title}: ${e.questions.length} questions`));

export const totalScrapedQuestions = allScrapedExams.reduce((sum, exam) => sum + exam.totalQuestions, 0);
