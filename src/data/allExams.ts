// Complete Nursing Exam Database
// Pre-populated with all exams from NursingPlex

import type { Exam } from './examDatabase';

export const allExams: Exam[] = [
  // ===== RN EXAMS - ATI =====
  {
    id: 'rn-ati-fundamentals-2026',
    title: 'ATI RN Fundamentals 2026 Proctored Exam',
    category: 'RN',
    subcategory: 'ati',
    examType: 'Fundamentals',
    source: 'NursingPlex',
    totalQuestions: 69,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/ati-rn-fundamentals-2026-proctored-exam-1778745801'
  },
  {
    id: 'rn-ati-med-surg-2026',
    title: 'ATI RN Adult Medical Surgical 2026 Proctored Exam',
    category: 'RN',
    subcategory: 'ati',
    examType: 'Medical-Surgical',
    source: 'NursingPlex',
    totalQuestions: 97,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/ati-rn-adult-medical-surgical-2026-proctored-exam-1778495930'
  },
  {
    id: 'rn-ati-mental-health-2026',
    title: 'ATI RN Mental Health 2026 Proctored Exam',
    category: 'RN',
    subcategory: 'ati',
    examType: 'Mental Health',
    source: 'NursingPlex',
    totalQuestions: 52,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/ati-rn-mental-health-2026-coker-u-bsn-proctored-exam-1778588758'
  },
  {
    id: 'rn-ati-pharmacology-2026',
    title: 'ATI RN Pharmacology 2026 Proctored Exam',
    category: 'RN',
    subcategory: 'ati',
    examType: 'Pharmacology',
    source: 'NursingPlex',
    totalQuestions: 70,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/ati-rn-pharmacology-2026-proctored-exam-1778567014'
  },
  {
    id: 'rn-ati-pediatrics-2026',
    title: 'ATI RN Pediatric Nursing 2026 Proctored Exam',
    category: 'RN',
    subcategory: 'ati',
    examType: 'Pediatrics',
    source: 'NursingPlex',
    totalQuestions: 62,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/ati-rn-pediatric-nursing-2026-proctored-exam-1778567908'
  },
  {
    id: 'rn-ati-maternal-newborn-2026',
    title: 'ATI RN Maternal Newborn Proctored Exam 2026',
    category: 'RN',
    subcategory: 'ati',
    examType: 'Maternal-Newborn',
    source: 'NursingPlex',
    totalQuestions: 58,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/ati-rn-maternal-newborn-proctored-exam-2026-1762782241'
  },
  {
    id: 'rn-ati-community-health-2026',
    title: 'ATI RN Community Health 2026 Proctored Exam',
    category: 'RN',
    subcategory: 'ati',
    examType: 'Community Health',
    source: 'NursingPlex',
    totalQuestions: 58,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/ati-rn-community-health-proctored-exam-1764760247'
  },
  {
    id: 'rn-ati-leadership-2026',
    title: 'ATI RN Leadership 2026 Proctored Exam',
    category: 'RN',
    subcategory: 'ati',
    examType: 'Leadership',
    source: 'NursingPlex',
    totalQuestions: 70,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/ati-rn-leadership-2026-proctored-exam-1778498384'
  },
  {
    id: 'rn-ati-nutrition-2026',
    title: 'ATI RN Nutrition 2026 Proctored Exam',
    category: 'RN',
    subcategory: 'ati',
    examType: 'Nutrition',
    source: 'NursingPlex',
    totalQuestions: 66,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/ati-rn-nutrition-2026-1749109029-1756194599'
  },

  // ===== RN EXAMS - HESI =====
  {
    id: 'rn-hesi-adult-health',
    title: 'HESI RN Adult Health Proctored Exam',
    category: 'RN',
    subcategory: 'hesi',
    examType: 'Adult Health',
    source: 'NursingPlex',
    totalQuestions: 57,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/hesi-rn-adult-health-17192134012'
  },
  {
    id: 'rn-hesi-med-surg',
    title: 'HESI RN Med Surg Proctored Exam',
    category: 'RN',
    subcategory: 'hesi',
    examType: 'Medical-Surgical',
    source: 'NursingPlex',
    totalQuestions: 107,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/hesi-rn-med-surg-proctored-examichs-1775798302'
  },
  {
    id: 'rn-hesi-mental-health',
    title: 'HESI RN Psychology Proctored Exam (Mental Health)',
    category: 'RN',
    subcategory: 'hesi',
    examType: 'Mental Health',
    source: 'NursingPlex',
    totalQuestions: 59,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/hesi-rn-psychology-proctored-exam-mental-health-1773058688'
  },
  {
    id: 'rn-hesi-pharmacology',
    title: 'HESI Pharmacology Proctored Exam',
    category: 'RN',
    subcategory: 'hesi',
    examType: 'Pharmacology',
    source: 'NursingPlex',
    totalQuestions: 80,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/hesi-pharmacology-exam-1759987683'
  },
  {
    id: 'rn-hesi-pediatric',
    title: 'HESI RN Pediatric And Women Health Proctored Exam',
    category: 'RN',
    subcategory: 'hesi',
    examType: 'Pediatric',
    source: 'NursingPlex',
    totalQuestions: 150,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/hesi-rn-pediatric-and-women-health-wgu-proctored-exam-1770789361'
  },
  {
    id: 'rn-hesi-maternity',
    title: 'HESI Obstetrics & Maternity Proctored Exam',
    category: 'RN',
    subcategory: 'hesi',
    examType: 'Maternity',
    source: 'NursingPlex',
    totalQuestions: 42,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/hesi-obstetrics-maternity-proctored-exam-1768382371'
  },
  {
    id: 'rn-hesi-fundamentals',
    title: 'HESI RN Fundamentals Proctored Exam',
    category: 'RN',
    subcategory: 'hesi',
    examType: 'Fundamentals',
    source: 'NursingPlex',
    totalQuestions: 78,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/hesi-rn-fundamentals-exam-1749794933'
  },
  {
    id: 'rn-hesi-dosage-calculation',
    title: 'HESI RN Dosage Calculation Proctored Exam',
    category: 'RN',
    subcategory: 'hesi',
    examType: 'Dosage Calculations',
    source: 'NursingPlex',
    totalQuestions: 40,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/hesi-rn-dosage-calculation-1749470811'
  },
  {
    id: 'rn-hesi-health-assessment',
    title: 'HESI RN Health Assessment Proctored Exam',
    category: 'RN',
    subcategory: 'hesi',
    examType: 'Health Assessment',
    source: 'NursingPlex',
    totalQuestions: 50,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/hesi-rn-246-health-assessment-nightgale-college-1758635774'
  },

  // ===== RN EXAMS - REGULAR =====
  {
    id: 'rn-regular-pharmacology',
    title: 'Pharmacology Chicago State University Proctored Exam',
    category: 'RN',
    subcategory: 'regular',
    examType: 'Pharmacology',
    source: 'NursingPlex',
    totalQuestions: 118,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/pharmacology-chicago-state-university-proctored-exam-1778563471'
  },
  {
    id: 'rn-regular-med-surg',
    title: 'W126 N241 Med Surg Proctored Exam',
    category: 'RN',
    subcategory: 'regular',
    examType: 'Medical-Surgical',
    source: 'NursingPlex',
    totalQuestions: 49,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/w126-n241-med-surg-proctored-exam-swedish-insistute-1778661375'
  },
  {
    id: 'rn-regular-mental-health',
    title: 'NUR 205 A- Mental Health Final Proctored Exam',
    category: 'RN',
    subcategory: 'regular',
    examType: 'Mental Health',
    source: 'NursingPlex',
    totalQuestions: 100,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/nur-205-a-mental-health-final-proctored-exam-winter-swedish-institute-1778155831'
  },
  {
    id: 'rn-regular-community-health',
    title: 'NURS 3527-Health And Healing Community-Final Test Proctored Exam',
    category: 'RN',
    subcategory: 'regular',
    examType: 'Community Health',
    source: 'NursingPlex',
    totalQuestions: 89,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/nurs-3527-health-and-healing-community-final-test-proctored-exam-1778482445'
  },
  {
    id: 'rn-regular-leadership',
    title: 'NURS 336- Nursing Leadership And Management Proctored Exam',
    category: 'RN',
    subcategory: 'regular',
    examType: 'Leadership',
    source: 'NursingPlex',
    totalQuestions: 100,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/nurs-336-nursing-leadership-and-management-proctored-exam-1778477817'
  },
  {
    id: 'rn-regular-pathophysiology',
    title: 'Advanced Pathophysiology Proctored Exam',
    category: 'RN',
    subcategory: 'regular',
    examType: 'Pathophysiology',
    source: 'NursingPlex',
    totalQuestions: 49,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/advanced-pathophysiology-proctored-exam-1778225271'
  },
  {
    id: 'rn-regular-microbiology',
    title: 'Microbiology Proctored Exam',
    category: 'RN',
    subcategory: 'regular',
    examType: 'Microbiology',
    source: 'NursingPlex',
    totalQuestions: 104,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/microbiology-proctored-exam-1775805075'
  },
  {
    id: 'rn-regular-anatomy-physiology',
    title: 'Anatomy And Physiology II W, Lab- Module 8 Proctored Exam',
    category: 'RN',
    subcategory: 'regular',
    examType: 'Anatomy and Physiology',
    source: 'NursingPlex',
    totalQuestions: 59,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/anatomy-and-physiology-ii-w-lab-module-8-proctored-exam-1775815134'
  },
  {
    id: 'rn-regular-health-assessment',
    title: 'Health Assessment And Promotion Proctored Exam 3 2026',
    category: 'RN',
    subcategory: 'regular',
    examType: 'Health Assessment',
    source: 'NursingPlex',
    totalQuestions: 60,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/health-assessment-and-promotion-proctored-exam-3-2026-1778651833'
  },
  {
    id: 'rn-regular-pediatrics',
    title: 'NURS 227 Pediatric Nursing Proctored Exam',
    category: 'RN',
    subcategory: 'regular',
    examType: 'Pediatrics',
    source: 'NursingPlex',
    totalQuestions: 60,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/nurs-227-pediatric-nursing-1775565414'
  },
  {
    id: 'rn-regular-maternal-newborn',
    title: 'Maternal Newborn Proctored Exam 2',
    category: 'RN',
    subcategory: 'regular',
    examType: 'Maternal Newborn',
    source: 'NursingPlex',
    totalQuestions: 66,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/maternal-newborn-proctored-exam-2-1778741060'
  },

  // ===== RN EXAMS - CERTIFICATION =====
  {
    id: 'rn-certification-cna',
    title: 'Cna Proctored Exam',
    category: 'RN',
    subcategory: 'certification',
    examType: 'CNA',
    source: 'NursingPlex',
    totalQuestions: 171,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/cna-exam-1727182232-1749730268'
  },
  {
    id: 'rn-certification-phlebotomy',
    title: 'Phlebotomy Certification Proctored Exam 130',
    category: 'RN',
    subcategory: 'certification',
    examType: 'Phlebotomy',
    source: 'NursingPlex',
    totalQuestions: 116,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/phlebotomy-certification-exam-130-1721651750-1749730268'
  },
  {
    id: 'rn-certification-kaplan-science',
    title: 'Kaplan Admission Test Science',
    category: 'RN',
    subcategory: 'certification',
    examType: 'Kaplan',
    source: 'NursingPlex',
    totalQuestions: 26,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/kaplan-admission-test-science-1732540227'
  },

  // ===== LPN EXAMS - ATI =====
  {
    id: 'lpn-ati-fundamentals',
    title: 'ATI LPN Fundamentals Proctored Exam',
    category: 'LPN',
    subcategory: 'ati',
    examType: 'Fundamentals',
    source: 'NursingPlex',
    totalQuestions: 51,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/ati-lpn-fundamentals-proctored-exam-applied-skills-ii-1778137957'
  },
  {
    id: 'lpn-ati-med-surg',
    title: 'ATI LPN Med Surg Proctored Exam',
    category: 'LPN',
    subcategory: 'ati',
    examType: 'Medical-Surgical',
    source: 'NursingPlex',
    totalQuestions: 7,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/ati-lpn-med-surg-proctored-exam-successful-career-institute-1783430391'
  },
  {
    id: 'lpn-ati-pharmacology',
    title: 'ATI LPN Pharmacology Fa25 Proctored Exam',
    category: 'LPN',
    subcategory: 'ati',
    examType: 'Pharmacology',
    source: 'NursingPlex',
    totalQuestions: 98,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/ati-lpn-pharmacology-fa25-proctored-exam-1770626920'
  },
  {
    id: 'lpn-ati-mental-health',
    title: 'ATI PN Mental Health 2026 Proctored Exam',
    category: 'LPN',
    subcategory: 'ati',
    examType: 'Mental Health',
    source: 'NursingPlex',
    totalQuestions: 40,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/ati-pn-mental-health-2026-proctored-exam-1778231930'
  },
  {
    id: 'lpn-ati-pediatrics',
    title: 'ATI LPN Paediatrics Nursing Cohort 5 Proctored Exam',
    category: 'LPN',
    subcategory: 'ati',
    examType: 'Pediatrics',
    source: 'NursingPlex',
    totalQuestions: 42,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/ati-lpn-paediatrics-nursing-cohort-5-proctored-exam-1764749171'
  },
  {
    id: 'lpn-ati-maternity',
    title: 'ATI PN Maternal Newborn 2026 Proctored Exam',
    category: 'LPN',
    subcategory: 'ati',
    examType: 'Maternity',
    source: 'NursingPlex',
    totalQuestions: 60,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/ati-pn-maternal-newborn-2026-proctored-exam-1778742733'
  },
  {
    id: 'lpn-ati-leadership',
    title: 'ATI LPN Leadership Proctored Exam',
    category: 'LPN',
    subcategory: 'ati',
    examType: 'Leadership',
    source: 'NursingPlex',
    totalQuestions: 32,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/ati-lpn-leadership-proctored-exam-1762258666'
  },
  {
    id: 'lpn-ati-anatomy-physiology',
    title: 'ATI LPN Anatomy And Physiology Part 2 Proctored Exam',
    category: 'LPN',
    subcategory: 'ati',
    examType: 'Anatomy and Physiology',
    source: 'NursingPlex',
    totalQuestions: 50,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/ati-lpn-anatomy-and-physiology-part-2-proctored-exam-1768380226'
  },
  {
    id: 'lpn-ati-dosage-calculation',
    title: 'ATI LPN Dosage Calculation Proctored Exam',
    category: 'LPN',
    subcategory: 'ati',
    examType: 'Dosage Calculations',
    source: 'NursingPlex',
    totalQuestions: 50,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/ati-lpn-dosage-calculation-proctored-exam-1772715829'
  },
  {
    id: 'lpn-ati-nutrition',
    title: 'ATI LPN Nutrition Proctored Exam',
    category: 'LPN',
    subcategory: 'ati',
    examType: 'Nutrition',
    source: 'NursingPlex',
    totalQuestions: 37,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/ati-lpn-nutrition-exam-1751973723'
  },

  // ===== LPN EXAMS - HESI =====
  {
    id: 'lpn-hesi-capstone',
    title: 'HESI Capstone PN Proctored Exam',
    category: 'LPN',
    subcategory: 'hesi',
    examType: 'Capstone',
    source: 'NursingPlex',
    totalQuestions: 40,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/hesi-capstone-pn-1709632008'
  },
  {
    id: 'lpn-hesi-fundamentals',
    title: 'LPN HESI Fundamentals Proctored Exam',
    category: 'LPN',
    subcategory: 'hesi',
    examType: 'Fundamentals',
    source: 'NursingPlex',
    totalQuestions: 60,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/lpn-hesi-fundamentals-examwgu-1762337353'
  },

  // ===== LPN EXAMS - REGULAR =====
  {
    id: 'lpn-regular-fundamentals',
    title: 'LPN Fundamentals Proctored Exam',
    category: 'LPN',
    subcategory: 'regular',
    examType: 'Fundamentals',
    source: 'NursingPlex',
    totalQuestions: 38,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/lpn-fundamentals-proctored-exam-1778678552'
  },

  // ===== RN EXIT - ATI =====
  {
    id: 'rn-exit-ati-comprehensive-2026',
    title: 'RN Comprehensive Predictor 2026 Proctored Exam',
    category: 'RN_Exit',
    subcategory: 'ati',
    examType: 'Comprehensive Predictor',
    source: 'NursingPlex',
    totalQuestions: 180,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/rn-comprehensive-predictor-2026-v2'
  },
  {
    id: 'rn-exit-ati-comprehensive-v2',
    title: 'RN Comprehensive Predictor 2026 Proctored Exam V2',
    category: 'RN_Exit',
    subcategory: 'ati',
    examType: 'Comprehensive Predictor',
    source: 'NursingPlex',
    totalQuestions: 176,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/rn-comprehensive-predictor-2026-proctored-exam-1776317689'
  },
  {
    id: 'rn-exit-ati-vati',
    title: 'ATI RN Vati Comprehensive Predictor Proctored Exam',
    category: 'RN_Exit',
    subcategory: 'ati',
    examType: 'Comprehensive Predictor',
    source: 'NursingPlex',
    totalQuestions: 177,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/ati-rn-vati-comprehensive-predictor-proctored-exam'
  },

  // ===== RN EXIT - HESI =====
  {
    id: 'rn-exit-hesi-mcphs',
    title: 'RN HESI Proctored Exit Exam- MCPHS',
    category: 'RN_Exit',
    subcategory: 'hesi',
    examType: 'Exit Exam',
    source: 'NursingPlex',
    totalQuestions: 127,
    totalPages: 32,
    freeQuestions: 10,
    dateAdded: '2024-01-15',
    dateScraped: '2024-01-15',
    url: 'https://nursingplex.com/review/rn-hesi-exit-exam-mcphs-1775539819',
    status: 'active',
    notes: 'Fully scraped with all 127 questions and 23 interactive question types'
  },
  {
    id: 'rn-exit-hesi-mcphs-worcester',
    title: 'HESI RN Exit Exam-Mcphs-Worcester-Bsn Proctored Exam',
    category: 'RN_Exit',
    subcategory: 'hesi',
    examType: 'Exit Exam',
    source: 'NursingPlex',
    totalQuestions: 130,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/hesi-rn-exit-exam-mcphs-worcester-bsn-proctored-exam-1776748006'
  },
  {
    id: 'rn-exit-hesi-nightingale',
    title: 'BSN 366 RN HESI Exit (Nightingale) Proctored Exam',
    category: 'RN_Exit',
    subcategory: 'hesi',
    examType: 'Exit Exam',
    source: 'NursingPlex',
    totalQuestions: 125,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/bsn-366-rn-hesi-exit-nightingale-proctored-exam-1775541657'
  },
  {
    id: 'rn-exit-hesi-compass',
    title: 'Ngu HESI RN Compass Exit Proctored Exam',
    category: 'RN_Exit',
    subcategory: 'hesi',
    examType: 'Exit Exam',
    source: 'NursingPlex',
    totalQuestions: 59,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/ngu-hesi-rn-compass-exit-proctored-exam-1764771965'
  },

  // ===== LPN EXIT - ATI =====
  {
    id: 'lpn-exit-ati-comprehensive-2026',
    title: 'ATI PN Comprehensive Predictor 2026 Proctored Exam',
    category: 'LPN_Exit',
    subcategory: 'ati',
    examType: 'Comprehensive Predictor',
    source: 'NursingPlex',
    totalQuestions: 178,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/ati-pn-comprehensive-predictor-2026-proctored-exam-1778048987'
  },
  {
    id: 'lpn-exit-ati-comprehensive-v2',
    title: 'ATI LPN Comprehensive Predictor 2026 Proctored Exam',
    category: 'LPN_Exit',
    subcategory: 'ati',
    examType: 'Comprehensive Predictor',
    source: 'NursingPlex',
    totalQuestions: 160,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/ati-lpn-comprehensive-predictor-2026-proctored-exam-1770280452'
  },
  {
    id: 'lpn-exit-ati-vati',
    title: 'Vati PN Comprehensive Predictor Proctored Exam',
    category: 'LPN_Exit',
    subcategory: 'ati',
    examType: 'Comprehensive Predictor',
    source: 'NursingPlex',
    totalQuestions: 180,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/vati-pn-comprehensive-predictor-proctored-exam-1773044573'
  },
  {
    id: 'lpn-exit-pn-comprehensive-2026',
    title: 'PN Comprehensive Predictor 2026 Proctored Exam',
    category: 'LPN_Exit',
    subcategory: 'ati',
    examType: 'Comprehensive Predictor',
    source: 'NursingPlex',
    totalQuestions: 174,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/pn-comprehensive-predictor-2026-proctored-exam-1768379193'
  },

  // ===== LPN EXIT - HESI =====
  {
    id: 'lpn-exit-hesi-exit',
    title: 'HESI LPN Exit Proctored Exam',
    category: 'LPN_Exit',
    subcategory: 'hesi',
    examType: 'Exit Exam',
    source: 'NursingPlex',
    totalQuestions: 291,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/hesi-lpn-exit-proctored-exam-1762759603'
  },
  {
    id: 'lpn-exit-hesi-exit-2',
    title: 'HESI LPN Exit Exam IV Proctored Exam',
    category: 'LPN_Exit',
    subcategory: 'hesi',
    examType: 'Exit Exam',
    source: 'NursingPlex',
    totalQuestions: 126,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/hesi-lpn-exit-exam-1722425419'
  },
  {
    id: 'lpn-exit-hesi-test-11',
    title: 'HESI LPN Exit Test 11 Proctored Exam',
    category: 'LPN_Exit',
    subcategory: 'hesi',
    examType: 'Exit Exam',
    source: 'NursingPlex',
    totalQuestions: 71,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/hesi-lpn-exit-test-11-1705654224'
  },
  {
    id: 'lpn-exit-hesi-2026-ii',
    title: 'HESI PN Exit 2026 II Proctored Exam',
    category: 'LPN_Exit',
    subcategory: 'hesi',
    examType: 'Exit Exam',
    source: 'NursingPlex',
    totalQuestions: 150,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/review/hesi-pn-exit-2026-ii-1697181251'
  }
];

// Get exams by category
export function getExamsByCategory(category: string): Exam[] {
  return allExams.filter(exam => exam.category === category);
}

// Get exams by subcategory
export function getExamsBySubcategory(category: string, subcategory: string): Exam[] {
  return allExams.filter(exam => 
    exam.category === category && exam.subcategory === subcategory
  );
}

// Get exam statistics
export function getExamStats() {
  return {
    totalExams: allExams.length,
    byCategory: {
      RN: allExams.filter(e => e.category === 'RN').length,
      LPN: allExams.filter(e => e.category === 'LPN').length,
      RN_Exit: allExams.filter(e => e.category === 'RN_Exit').length,
      LPN_Exit: allExams.filter(e => e.category === 'LPN_Exit').length
    },
    bySubcategory: {
      ATI: allExams.filter(e => e.subcategory === 'ati').length,
      HESI: allExams.filter(e => e.subcategory === 'hesi').length,
      Regular: allExams.filter(e => e.subcategory === 'regular').length,
      Certification: allExams.filter(e => e.subcategory === 'certification').length
    },
    totalQuestions: allExams.reduce((sum, exam) => sum + exam.totalQuestions, 0),
    scrapedExams: allExams.filter(e => e.dateScraped).length
  };
}
