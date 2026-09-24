// Combined questions from all scraped exams
import { questions as hesiQuestions } from './questions';
import { atiFundamentals2026 } from './ati-fundamentals-2026';
import { atiMedSurg2026 } from './ati-med-surg-2026';
import { atiPharmacology2026 } from './ati-pharmacology-2026';
import { sp26AdvancedMedSurg } from './sp26-advanced-med-surg';
import { advancedMedSurgHealthWellness } from './advanced-med-surg-health-wellness';
import { advancedMedSurgMCHPS } from './advanced-med-surg-mchps';

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
  },
  {
    id: 'rn-advanced-med-surg-mchps',
    title: 'Advanced Med Surg Proctored Exam (MCHPS)',
    category: 'RN',
    subcategory: 'Regular',
    totalQuestions: 50,
    scrapedDate: '2024-01-15',
    questions: advancedMedSurgMCHPS?.questions || []
  }
];


export const totalScrapedQuestions = allScrapedExams.reduce((sum, exam) => sum + exam.questions.length, 0);
