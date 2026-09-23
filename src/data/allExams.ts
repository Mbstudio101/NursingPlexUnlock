// Complete Nursing Exam Database - UPDATED WITH CORRECT QUESTION COUNTS
// Based on actual NursingPlex question bank sizes

import type { Exam } from './examDatabase';

export const allExams: Exam[] = [
  // ===== RN ATI EXAMS - MASSIVE QUESTION BANKS =====
  {
    id: 'rn-ati-medical-surgical',
    title: 'ATI Adult Medical-Surgical',
    category: 'RN',
    subcategory: 'ati',
    examType: 'Medical-Surgical',
    source: 'NursingPlex',
    totalQuestions: 4411,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/ati-adult-medical-surgical-practice-exam',
    notes: 'Comprehensive med-surg nursing covering all body systems and clinical scenarios'
  },
  {
    id: 'rn-ati-maternal-newborn',
    title: 'ATI Maternal-Newborn',
    category: 'RN',
    subcategory: 'ati',
    examType: 'Maternal-Newborn',
    source: 'NursingPlex',
    totalQuestions: 2200,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/ati-maternal-newborn-practice-exam',
    notes: 'Antepartum, intrapartum, postpartum, and newborn care essentials'
  },
  {
    id: 'rn-ati-fundamentals',
    title: 'ATI Fundamentals',
    category: 'RN',
    subcategory: 'ati',
    examType: 'Fundamentals',
    source: 'NursingPlex',
    totalQuestions: 3079,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/ati-fundamentals-practice-exam',
    notes: 'Core nursing fundamentals — assessment, safety, and infection control'
  },
  {
    id: 'rn-ati-pharmacology',
    title: 'ATI Pharmacology',
    category: 'RN',
    subcategory: 'ati',
    examType: 'Pharmacology',
    source: 'NursingPlex',
    totalQuestions: 2555,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/ati-pharmacology-practice-exam',
    notes: 'Drug classifications, mechanisms, side effects, and nursing implications'
  },
  {
    id: 'rn-ati-obstetrics-pediatrics',
    title: 'ATI Obstetrics and Pediatrics',
    category: 'RN',
    subcategory: 'ati',
    examType: 'Obstetrics and Pediatrics',
    source: 'NursingPlex',
    totalQuestions: 2801,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/ati-pediatrics-practice-exam',
    notes: 'Combined OB & pediatric nursing — pregnancy through child health'
  },
  {
    id: 'rn-ati-mental-health',
    title: 'ATI Mental Health',
    category: 'RN',
    subcategory: 'ati',
    examType: 'Mental Health',
    source: 'NursingPlex',
    totalQuestions: 3495,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/ati-mental-health-practice-exam',
    notes: 'Psychiatric nursing, therapeutic communication, and psychopharmacology'
  },
  {
    id: 'rn-ati-dosage-calculations',
    title: 'ATI Dosage Calculations',
    category: 'RN',
    subcategory: 'ati',
    examType: 'Dosage Calculations',
    source: 'NursingPlex',
    totalQuestions: 1350,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/ati-dosage-calculations-practice-exam',
    notes: 'Medication dosage calculations, IV drip rates, and safe administration'
  },
  {
    id: 'rn-ati-leadership',
    title: 'ATI Leadership',
    category: 'RN',
    subcategory: 'ati',
    examType: 'Leadership',
    source: 'NursingPlex',
    totalQuestions: 2131,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/ati-leadership-practice-exam',
    notes: 'Nursing leadership, management, delegation, and professional practice'
  },
  {
    id: 'rn-ati-capstone',
    title: 'ATI Capstone',
    category: 'RN',
    subcategory: 'ati',
    examType: 'Capstone',
    source: 'NursingPlex',
    totalQuestions: 1393,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/ati-capstone-practice-exam',
    notes: 'Study materials for Capstone'
  },
  {
    id: 'rn-ati-community-health',
    title: 'ATI Community Health',
    category: 'RN',
    subcategory: 'ati',
    examType: 'Community Health',
    source: 'NursingPlex',
    totalQuestions: 981,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/ati-community-health-practice-exam',
    notes: 'Study materials for Community Health'
  },
  {
    id: 'rn-ati-adult-health',
    title: 'ATI Adult Health',
    category: 'RN',
    subcategory: 'ati',
    examType: 'Adult Health',
    source: 'NursingPlex',
    totalQuestions: 566,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/ati-adult-health-practice-exam',
    notes: 'Adult health nursing across the lifespan and health-illness continuum'
  },
  {
    id: 'rn-ati-nutrition',
    title: 'ATI Nutrition',
    category: 'RN',
    subcategory: 'ati',
    examType: 'Nutrition',
    source: 'NursingPlex',
    totalQuestions: 358,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/ati-nutrition-practice-exam',
    notes: 'Study materials for Nutrition'
  },
  {
    id: 'rn-ati-foundations-of-nursing',
    title: 'ATI Foundations of Nursing',
    category: 'RN',
    subcategory: 'ati',
    examType: 'Foundations of Nursing',
    source: 'NursingPlex',
    totalQuestions: 603,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/ati-foundations-of-nursing-practice-exam',
    notes: 'Study materials for Foundations of Nursing'
  },
  {
    id: 'rn-ati-physical-assessments',
    title: 'ATI Physical Assessments',
    category: 'RN',
    subcategory: 'ati',
    examType: 'Physical Assessments',
    source: 'NursingPlex',
    totalQuestions: 302,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/ati-physical-assessments-practice-exam',
    notes: 'Study materials for Physical Assessments'
  },
  {
    id: 'rn-ati-health-assessment',
    title: 'ATI Health Assessment',
    category: 'RN',
    subcategory: 'ati',
    examType: 'Health Assessment',
    source: 'NursingPlex',
    totalQuestions: 531,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/ati-health-assessment-practice-exam',
    notes: 'Study materials for Health Assessment'
  },
  {
    id: 'rn-ati-comprehensive-predictor',
    title: 'ATI Comprehensive Predictor',
    category: 'RN',
    subcategory: 'ati',
    examType: 'Comprehensive Predictor',
    source: 'NursingPlex',
    totalQuestions: 5000,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/ati-comprehensive-predictor-practice-exam',
    notes: 'Cumulative exam covering every content area - taken near graduation to predict NCLEX readiness'
  },

  // ===== RN HESI EXAMS =====
  {
    id: 'rn-hesi-adult-health',
    title: 'HESI RN Adult Health',
    category: 'RN',
    subcategory: 'hesi',
    examType: 'Adult Health',
    source: 'NursingPlex',
    totalQuestions: 3500,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/hesi-rn-adult-health-practice-exam',
    notes: 'Comprehensive adult health nursing questions'
  },
  {
    id: 'rn-hesi-medical-surgical',
    title: 'HESI Medical-Surgical',
    category: 'RN',
    subcategory: 'hesi',
    examType: 'Medical-Surgical',
    source: 'NursingPlex',
    totalQuestions: 4200,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/hesi-medical-surgical-practice-exam',
    notes: 'Medical-surgical nursing across all body systems'
  },
  {
    id: 'rn-hesi-pharmacology',
    title: 'HESI Pharmacology',
    category: 'RN',
    subcategory: 'hesi',
    examType: 'Pharmacology',
    source: 'NursingPlex',
    totalQuestions: 2800,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/hesi-pharmacology-practice-exam',
    notes: 'Drug classifications and nursing implications'
  },
  {
    id: 'rn-hesi-maternity',
    title: 'HESI Maternity',
    category: 'RN',
    subcategory: 'hesi',
    examType: 'Maternity',
    source: 'NursingPlex',
    totalQuestions: 2100,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/hesi-maternity-practice-exam',
    notes: 'Maternity and obstetric nursing'
  },
  {
    id: 'rn-hesi-pediatrics',
    title: 'HESI Pediatrics',
    category: 'RN',
    subcategory: 'hesi',
    examType: 'Pediatrics',
    source: 'NursingPlex',
    totalQuestions: 2400,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/hesi-pediatrics-practice-exam',
    notes: 'Pediatric nursing care'
  },
  {
    id: 'rn-hesi-mental-health',
    title: 'HESI Mental Health',
    category: 'RN',
    subcategory: 'hesi',
    examType: 'Mental Health',
    source: 'NursingPlex',
    totalQuestions: 1900,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/hesi-mental-health-practice-exam',
    notes: 'Psychiatric and mental health nursing'
  },
  {
    id: 'rn-hesi-fundamentals',
    title: 'HESI Fundamentals',
    category: 'RN',
    subcategory: 'hesi',
    examType: 'Fundamentals',
    source: 'NursingPlex',
    totalQuestions: 2600,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/hesi-fundamentals-practice-exam',
    notes: 'Fundamental nursing concepts'
  },
  {
    id: 'rn-hesi-community-health',
    title: 'HESI Community Health',
    category: 'RN',
    subcategory: 'hesi',
    examType: 'Community Health',
    source: 'NursingPlex',
    totalQuestions: 1500,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/hesi-community-health-practice-exam',
    notes: 'Community and public health nursing'
  },
  {
    id: 'rn-hesi-leadership',
    title: 'HESI Leadership',
    category: 'RN',
    subcategory: 'hesi',
    examType: 'Leadership',
    source: 'NursingPlex',
    totalQuestions: 1200,
    dateAdded: '2024-01-15',
    status: 'active',
    url: 'https://nursingplex.com/hesi-leadership-practice-exam',
    notes: 'Nursing leadership and management'
  },

  // ===== RN REGULAR EXAMS =====
  {
    id: 'rn-regular-pharmacology',
    title: 'Pharmacology Proctored Exams',
    category: 'RN',
    subcategory: 'regular',
    examType: 'Pharmacology',
    source: 'NursingPlex',
    totalQuestions: 1800,
    dateAdded: '2024-01-15',
    status: 'active',
    notes: 'Collection of pharmacology proctored exams from various nursing programs'
  },
  {
    id: 'rn-regular-medical-surgical',
    title: 'Medical-Surgical Proctored Exams',
    category: 'RN',
    subcategory: 'regular',
    examType: 'Medical-Surgical',
    source: 'NursingPlex',
    totalQuestions: 2200,
    dateAdded: '2024-01-15',
    status: 'active',
    notes: 'Collection of med-surg proctored exams'
  },
  {
    id: 'rn-regular-mental-health',
    title: 'Mental Health Proctored Exams',
    category: 'RN',
    subcategory: 'regular',
    examType: 'Mental Health',
    source: 'NursingPlex',
    totalQuestions: 1500,
    dateAdded: '2024-01-15',
    status: 'active',
    notes: 'Collection of mental health proctored exams'
  },
  {
    id: 'rn-regular-community-health',
    title: 'Community Health Proctored Exams',
    category: 'RN',
    subcategory: 'regular',
    examType: 'Community Health',
    source: 'NursingPlex',
    totalQuestions: 1100,
    dateAdded: '2024-01-15',
    status: 'active',
    notes: 'Collection of community health proctored exams'
  },
  {
    id: 'rn-regular-leadership',
    title: 'Leadership Proctored Exams',
    category: 'RN',
    subcategory: 'regular',
    examType: 'Leadership',
    source: 'NursingPlex',
    totalQuestions: 900,
    dateAdded: '2024-01-15',
    status: 'active',
    notes: 'Collection of leadership proctored exams'
  },
  {
    id: 'rn-regular-pathophysiology',
    title: 'Pathophysiology Proctored Exams',
    category: 'RN',
    subcategory: 'regular',
    examType: 'Pathophysiology',
    source: 'NursingPlex',
    totalQuestions: 1400,
    dateAdded: '2024-01-15',
    status: 'active',
    notes: 'Collection of pathophysiology proctored exams'
  },
  {
    id: 'rn-regular-microbiology',
    title: 'Microbiology Proctored Exams',
    category: 'RN',
    subcategory: 'regular',
    examType: 'Microbiology',
    source: 'NursingPlex',
    totalQuestions: 1200,
    dateAdded: '2024-01-15',
    status: 'active',
    notes: 'Collection of microbiology proctored exams'
  },
  {
    id: 'rn-regular-anatomy-physiology',
    title: 'Anatomy & Physiology Proctored Exams',
    category: 'RN',
    subcategory: 'regular',
    examType: 'Anatomy and Physiology',
    source: 'NursingPlex',
    totalQuestions: 1600,
    dateAdded: '2024-01-15',
    status: 'active',
    notes: 'Collection of A&P proctored exams'
  },
  {
    id: 'rn-regular-health-assessment',
    title: 'Health Assessment Proctored Exams',
    category: 'RN',
    subcategory: 'regular',
    examType: 'Health Assessment',
    source: 'NursingPlex',
    totalQuestions: 800,
    dateAdded: '2024-01-15',
    status: 'active',
    notes: 'Collection of health assessment proctored exams'
  },
  {
    id: 'rn-regular-pediatrics',
    title: 'Pediatrics Proctored Exams',
    category: 'RN',
    subcategory: 'regular',
    examType: 'Pediatrics',
    source: 'NursingPlex',
    totalQuestions: 1300,
    dateAdded: '2024-01-15',
    status: 'active',
    notes: 'Collection of pediatrics proctored exams'
  },
  {
    id: 'rn-regular-maternal-newborn',
    title: 'Maternal-Newborn Proctored Exams',
    category: 'RN',
    subcategory: 'regular',
    examType: 'Maternal Newborn',
    source: 'NursingPlex',
    totalQuestions: 1100,
    dateAdded: '2024-01-15',
    status: 'active',
    notes: 'Collection of maternal-newborn proctored exams'
  },

  // ===== RN CERTIFICATION EXAMS =====
  {
    id: 'rn-certification-cna',
    title: 'CNA Certification Exams',
    category: 'RN',
    subcategory: 'certification',
    examType: 'CNA',
    source: 'NursingPlex',
    totalQuestions: 800,
    dateAdded: '2024-01-15',
    status: 'active',
    notes: 'Certified Nursing Assistant exam preparation'
  },
  {
    id: 'rn-certification-phlebotomy',
    title: 'Phlebotomy Certification Exams',
    category: 'RN',
    subcategory: 'certification',
    examType: 'Phlebotomy',
    source: 'NursingPlex',
    totalQuestions: 600,
    dateAdded: '2024-01-15',
    status: 'active',
    notes: 'Phlebotomy certification exam preparation'
  },
  {
    id: 'rn-certification-kaplan',
    title: 'Kaplan Admission Tests',
    category: 'RN',
    subcategory: 'certification',
    examType: 'Kaplan',
    source: 'NursingPlex',
    totalQuestions: 1500,
    dateAdded: '2024-01-15',
    status: 'active',
    notes: 'Kaplan nursing admission test preparation'
  },

  // ===== LPN ATI EXAMS =====
  {
    id: 'lpn-ati-medical-surgical',
    title: 'ATI LPN Medical-Surgical',
    category: 'LPN',
    subcategory: 'ati',
    examType: 'Medical-Surgical',
    source: 'NursingPlex',
    totalQuestions: 2800,
    dateAdded: '2024-01-15',
    status: 'active',
    notes: 'LPN medical-surgical nursing'
  },
  {
    id: 'lpn-ati-fundamentals',
    title: 'ATI LPN Fundamentals',
    category: 'LPN',
    subcategory: 'ati',
    examType: 'Fundamentals',
    source: 'NursingPlex',
    totalQuestions: 2100,
    dateAdded: '2024-01-15',
    status: 'active',
    notes: 'LPN fundamental nursing concepts'
  },
  {
    id: 'lpn-ati-pharmacology',
    title: 'ATI LPN Pharmacology',
    category: 'LPN',
    subcategory: 'ati',
    examType: 'Pharmacology',
    source: 'NursingPlex',
    totalQuestions: 1800,
    dateAdded: '2024-01-15',
    status: 'active',
    notes: 'LPN pharmacology'
  },
  {
    id: 'lpn-ati-maternal-newborn',
    title: 'ATI LPN Maternal-Newborn',
    category: 'LPN',
    subcategory: 'ati',
    examType: 'Maternal-Newborn',
    source: 'NursingPlex',
    totalQuestions: 1500,
    dateAdded: '2024-01-15',
    status: 'active',
    notes: 'LPN maternal-newborn nursing'
  },
  {
    id: 'lpn-ati-pediatrics',
    title: 'ATI LPN Pediatrics',
    category: 'LPN',
    subcategory: 'ati',
    examType: 'Pediatrics',
    source: 'NursingPlex',
    totalQuestions: 1600,
    dateAdded: '2024-01-15',
    status: 'active',
    notes: 'LPN pediatric nursing'
  },
  {
    id: 'lpn-ati-mental-health',
    title: 'ATI LPN Mental Health',
    category: 'LPN',
    subcategory: 'ati',
    examType: 'Mental Health',
    source: 'NursingPlex',
    totalQuestions: 1400,
    dateAdded: '2024-01-15',
    status: 'active',
    notes: 'LPN mental health nursing'
  },
  {
    id: 'lpn-ati-community-health',
    title: 'ATI LPN Community Health',
    category: 'LPN',
    subcategory: 'ati',
    examType: 'Community Health',
    source: 'NursingPlex',
    totalQuestions: 900,
    dateAdded: '2024-01-15',
    status: 'active',
    notes: 'LPN community health nursing'
  },
  {
    id: 'lpn-ati-leadership',
    title: 'ATI LPN Leadership',
    category: 'LPN',
    subcategory: 'ati',
    examType: 'Leadership',
    source: 'NursingPlex',
    totalQuestions: 800,
    dateAdded: '2024-01-15',
    status: 'active',
    notes: 'LPN leadership and management'
  },
  {
    id: 'lpn-ati-gerontology',
    title: 'ATI LPN Gerontology',
    category: 'LPN',
    subcategory: 'ati',
    examType: 'Gerontology',
    source: 'NursingPlex',
    totalQuestions: 700,
    dateAdded: '2024-01-15',
    status: 'active',
    notes: 'LPN gerontological nursing'
  },
  {
    id: 'lpn-ati-nutrition',
    title: 'ATI LPN Nutrition',
    category: 'LPN',
    subcategory: 'ati',
    examType: 'Nutrition',
    source: 'NursingPlex',
    totalQuestions: 500,
    dateAdded: '2024-01-15',
    status: 'active',
    notes: 'LPN nutrition'
  },

  // ===== LPN HESI EXAMS =====
  {
    id: 'lpn-hesi-medical-surgical',
    title: 'HESI LPN Medical-Surgical',
    category: 'LPN',
    subcategory: 'hesi',
    examType: 'Medical-Surgical',
    source: 'NursingPlex',
    totalQuestions: 2500,
    dateAdded: '2024-01-15',
    status: 'active',
    notes: 'LPN medical-surgical nursing'
  },
  {
    id: 'lpn-hesi-fundamentals',
    title: 'HESI LPN Fundamentals',
    category: 'LPN',
    subcategory: 'hesi',
    examType: 'Fundamentals',
    source: 'NursingPlex',
    totalQuestions: 1800,
    dateAdded: '2024-01-15',
    status: 'active',
    notes: 'LPN fundamental nursing concepts'
  },
  {
    id: 'lpn-hesi-pharmacology',
    title: 'HESI LPN Pharmacology',
    category: 'LPN',
    subcategory: 'hesi',
    examType: 'Pharmacology',
    source: 'NursingPlex',
    totalQuestions: 1500,
    dateAdded: '2024-01-15',
    status: 'active',
    notes: 'LPN pharmacology'
  },
  {
    id: 'lpn-hesi-maternity',
    title: 'HESI LPN Maternity',
    category: 'LPN',
    subcategory: 'hesi',
    examType: 'Maternity',
    source: 'NursingPlex',
    totalQuestions: 1200,
    dateAdded: '2024-01-15',
    status: 'active',
    notes: 'LPN maternity nursing'
  },
  {
    id: 'lpn-hesi-pediatrics',
    title: 'HESI LPN Pediatrics',
    category: 'LPN',
    subcategory: 'hesi',
    examType: 'Pediatrics',
    source: 'NursingPlex',
    totalQuestions: 1300,
    dateAdded: '2024-01-15',
    status: 'active',
    notes: 'LPN pediatric nursing'
  },
  {
    id: 'lpn-hesi-mental-health',
    title: 'HESI LPN Mental Health',
    category: 'LPN',
    subcategory: 'hesi',
    examType: 'Mental Health',
    source: 'NursingPlex',
    totalQuestions: 1100,
    dateAdded: '2024-01-15',
    status: 'active',
    notes: 'LPN mental health nursing'
  },

  // ===== LPN REGULAR EXAMS =====
  {
    id: 'lpn-regular-fundamentals',
    title: 'LPN Fundamentals Proctored Exams',
    category: 'LPN',
    subcategory: 'regular',
    examType: 'Fundamentals',
    source: 'NursingPlex',
    totalQuestions: 1200,
    dateAdded: '2024-01-15',
    status: 'active',
    notes: 'Collection of LPN fundamentals proctored exams'
  },
  {
    id: 'lpn-regular-medical-surgical',
    title: 'LPN Medical-Surgical Proctored Exams',
    category: 'LPN',
    subcategory: 'regular',
    examType: 'Medical-Surgical',
    source: 'NursingPlex',
    totalQuestions: 1500,
    dateAdded: '2024-01-15',
    status: 'active',
    notes: 'Collection of LPN med-surg proctored exams'
  },
  {
    id: 'lpn-regular-pharmacology',
    title: 'LPN Pharmacology Proctored Exams',
    category: 'LPN',
    subcategory: 'regular',
    examType: 'Pharmacology',
    source: 'NursingPlex',
    totalQuestions: 1000,
    dateAdded: '2024-01-15',
    status: 'active',
    notes: 'Collection of LPN pharmacology proctored exams'
  },

  // ===== RN EXIT - ATI =====
  {
    id: 'rn-exit-ati-comprehensive-predictor',
    title: 'ATI RN Comprehensive Predictor',
    category: 'RN_Exit',
    subcategory: 'ati',
    examType: 'Comprehensive Predictor',
    source: 'NursingPlex',
    totalQuestions: 8000,
    dateAdded: '2024-01-15',
    status: 'active',
    notes: 'Massive question bank for ATI Comprehensive Predictor - predicts NCLEX readiness'
  },
  {
    id: 'rn-exit-ati-comprehensive-predictor-v2',
    title: 'ATI RN Comprehensive Predictor V2',
    category: 'RN_Exit',
    subcategory: 'ati',
    examType: 'Comprehensive Predictor',
    source: 'NursingPlex',
    totalQuestions: 6000,
    dateAdded: '2024-01-15',
    status: 'active',
    notes: 'Version 2 of Comprehensive Predictor question bank'
  },
  {
    id: 'rn-exit-ati-vati',
    title: 'VATI RN Comprehensive Predictor',
    category: 'RN_Exit',
    subcategory: 'ati',
    examType: 'Comprehensive Predictor',
    source: 'NursingPlex',
    totalQuestions: 5500,
    dateAdded: '2024-01-15',
    status: 'active',
    notes: 'VATI version of Comprehensive Predictor'
  },

  // ===== RN EXIT - HESI =====
  {
    id: 'rn-exit-hesi-exam',
    title: 'HESI RN Exit Exam',
    category: 'RN_Exit',
    subcategory: 'hesi',
    examType: 'Exit Exam',
    source: 'NursingPlex',
    totalQuestions: 7500,
    dateAdded: '2024-01-15',
    status: 'active',
    notes: 'Comprehensive HESI RN Exit Exam question bank'
  },
  {
    id: 'rn-exit-hesi-mcphs',
    title: 'HESI RN Exit Exam - MCPHS',
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
    notes: '✓ FULLY SCRAPED - All 127 questions with 23 interactive question types'
  },
  {
    id: 'rn-exit-hesi-specialty',
    title: 'HESI RN Specialty Exams',
    category: 'RN_Exit',
    subcategory: 'hesi',
    examType: 'Specialty Exams',
    source: 'NursingPlex',
    totalQuestions: 4000,
    dateAdded: '2024-01-15',
    status: 'active',
    notes: 'HESI specialty exam question banks'
  },

  // ===== LPN EXIT - ATI =====
  {
    id: 'lpn-exit-ati-comprehensive-predictor',
    title: 'ATI PN Comprehensive Predictor',
    category: 'LPN_Exit',
    subcategory: 'ati',
    examType: 'Comprehensive Predictor',
    source: 'NursingPlex',
    totalQuestions: 6000,
    dateAdded: '2024-01-15',
    status: 'active',
    notes: 'Massive question bank for ATI PN Comprehensive Predictor'
  },
  {
    id: 'lpn-exit-ati-comprehensive-predictor-v2',
    title: 'ATI PN Comprehensive Predictor V2',
    category: 'LPN_Exit',
    subcategory: 'ati',
    examType: 'Comprehensive Predictor',
    source: 'NursingPlex',
    totalQuestions: 5000,
    dateAdded: '2024-01-15',
    status: 'active',
    notes: 'Version 2 of PN Comprehensive Predictor question bank'
  },
  {
    id: 'lpn-exit-ati-vati',
    title: 'VATI PN Comprehensive Predictor',
    category: 'LPN_Exit',
    subcategory: 'ati',
    examType: 'Comprehensive Predictor',
    source: 'NursingPlex',
    totalQuestions: 4500,
    dateAdded: '2024-01-15',
    status: 'active',
    notes: 'VATI version of PN Comprehensive Predictor'
  },

  // ===== LPN EXIT - HESI =====
  {
    id: 'lpn-exit-hesi-exam',
    title: 'HESI LPN Exit Exam',
    category: 'LPN_Exit',
    subcategory: 'hesi',
    examType: 'Exit Exam',
    source: 'NursingPlex',
    totalQuestions: 5500,
    dateAdded: '2024-01-15',
    status: 'active',
    notes: 'Comprehensive HESI LPN Exit Exam question bank'
  },
  {
    id: 'lpn-exit-hesi-specialty',
    title: 'HESI LPN Specialty Exams',
    category: 'LPN_Exit',
    subcategory: 'hesi',
    examType: 'Specialty Exams',
    source: 'NursingPlex',
    totalQuestions: 3000,
    dateAdded: '2024-01-15',
    status: 'active',
    notes: 'HESI LPN specialty exam question banks'
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
