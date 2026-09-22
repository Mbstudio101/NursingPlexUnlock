import type { InteractiveQuestion } from '../InteractiveComponents';

// Map of question number to interactive configuration
export const interactiveQuestions: Record<number, InteractiveQuestion> = {
  // Q4: Highlight text - mental health findings
  4: {
    type: 'highlight-text',
    segments: [
      { text: "During the initial assessment, ", highlightable: false },
      { text: "the nurse observes the client has poor hygiene", highlightable: true },
      { text: " and ", highlightable: false },
      { text: "has dried food on his mouth with food stains on his clothing", highlightable: true },
      { text: ". He reports living his near job. ", highlightable: false },
      { text: "He reports trouble sleeping", highlightable: true },
      { text: ". He reports smoking one-half pack of cigarettes a day. He denies pain. ", highlightable: false },
      { text: "He denies thoughts of self-harm or thoughts of suicide.", highlightable: true }
    ]
  },

  // Q5: Matrix - therapeutic vs nontherapeutic
  5: {
    type: 'matrix',
    rows: [
      "Point out misfortunes of other people",
      "Discuss client's appearance and daily activities",
      "Inform client of medication times",
      "Allow client to verbalize feelings"
    ],
    columns: ["Therapeutic communication", "Nontherapeutic communication"]
  },

  // Q6: Dropdown - sertraline side effects
  6: {
    type: 'dropdown',
    blanks: [
      {
        before: "The nurse instructs the client that sertraline can cause",
        after: "and that the client can manage this side effect with",
        options: ["hypernatremia", "elevated blood pressure", "dry mouth"]
      },
      {
        before: "",
        after: ".",
        options: ["sips of water", "frequent rest", "elevation of legs"]
      }
    ]
  },

  // Q14: Numeric - codeine dosage
  14: {
    type: 'numeric',
    unit: 'mg',
    hint: 'Acetaminophen and Codeine Phosphate Oral Solution: 120/12 mg per 5 mL. Dose: 25 mL. How many mg of codeine?'
  },

  // Q18: Numeric - cefazolin dosage
  18: {
    type: 'numeric',
    unit: 'mL',
    hint: 'Cefazolin 800 mg IM. Vial: 1 gram. Reconstitute: add 2.5 mL sterile water → total volume 3.0 mL. How many mL to administer?'
  },

  // Q25: Numeric - IV rate
  25: {
    type: 'numeric',
    unit: 'mL/hr',
    hint: '1 L normal saline at 1.5 mL/kg/hr. Client weighs 176 lbs. How many mL/hr? (1 kg = 2.2 lbs)'
  },

  // Q28: Highlight findings - assessment requiring follow-up
  28: {
    type: 'highlight-findings',
    findings: [
      "Client is alert and oriented to person, place, time, and situation.",
      "Client states, \"It's been hard to catch my breath.\"",
      "Crackles are heard in the bases of bilateral lungs.",
      "S1 and S2 heart sounds noted.",
      "Heart rate is 118 beats/minute with a regular rhythm.",
      "Bilateral peripheral pitting edema of 2+ is present in both legs.",
      "Client denies pain.",
      "Reports voiding prior to coming to hospital."
    ]
  },

  // Q29: Matrix - findings → condition
  29: {
    type: 'matrix',
    rows: [
      "Weight gain",
      "Cardiac laboratory results",
      "Shortness of breath",
      "Chest pain",
      "Heart rate",
      "Chest x-ray results"
    ],
    columns: ["Heart Failure", "Pulmonary Embolism", "Myocardial Infarction"]
  },

  // Q31: Matrix - appropriate vs not appropriate
  31: {
    type: 'matrix',
    rows: [
      "Request a prescription for opioid pain medication",
      "Encourage the client to drink 2 liters of fluids per day",
      "Discuss the client's readiness to quit smoking cigarettes",
      "Increase oxygen by nasal cannula",
      "Administer daily potassium supplement",
      "Ambulate the client in the hallway"
    ],
    columns: ["Appropriate", "Not Appropriate"]
  },

  // Q44: Highlight findings - indicating progress
  44: {
    type: 'highlight-findings',
    findings: [
      "Lungs are clear to auscultation, and no accessory muscle use is noted.",
      "Shows no signs of cyanosis.",
      "Is feeding for 15 minutes every three hours using a 28 cal/oz formula.",
      "His urine is clear, and the specific gravity is low.",
      "The client continues to have a loud holosystolic murmur noted.",
      "Pulses are 1+ through all extremities."
    ]
  },

  // Q52: Drag categories - complete the diagram
  52: {
    type: 'drag-categories',
    categories: [
      { name: "Condition", slots: 1 },
      { name: "Nursing Actions (2)", slots: 2 },
      { name: "Parameters to Monitor (2)", slots: 2 }
    ],
    items: [
      "Heart failure",
      "Pulmonary embolism",
      "Elevate head of bed",
      "Administer diuretics",
      "Monitor oxygen saturation",
      "Assess lung sounds",
      "Monitor intake and output",
      "Check daily weights"
    ]
  },

  // Q65: Highlight findings - requiring follow-up
  65: {
    type: 'highlight-findings',
    findings: [
      "Alert and oriented person, place, time, and situation.",
      "Agitated.",
      "Reported chest pain described as pressure and tightness that is unrelieved with rest.",
      "Radial and pedal pulses 2+.",
      "Rapid and shallow breaths.",
      "Clear breath sounds throughout bilateral lungs.",
      "Reported 7 on a 0 to 10 scale, tightness and pressure in chest."
    ]
  },

  // Q66: Matrix - symptoms → condition
  66: {
    type: 'matrix',
    rows: [
      "Epigastric distress",
      "Chest pain radiating down arm",
      "Feelings of fear",
      "Occurring without cause",
      "Pain relieved by nitroglycerin",
      "Pain only relieved by opioids"
    ],
    columns: ["Angina", "Myocardial Infarction", "Both"]
  },

  // Q67: Dropdown - fill in blanks
  67: {
    type: 'dropdown',
    blanks: [
      {
        before: "The nurse determines that the client has",
        after: "as evidenced by ST depression on electrocardiogram and normal",
        options: ["heart failure", "myocardial infarction", "pulmonary embolism"]
      },
      {
        before: "",
        after: "level.",
        options: ["troponin", "BNP", "D-dimer"]
      }
    ]
  },

  // Q68: Drag categories - medications
  68: {
    type: 'drag-categories',
    categories: [
      { name: "Calcium Channel Blocker", slots: 1 },
      { name: "Antiplatelet", slots: 1 },
      { name: "ACE Inhibitor", slots: 1 },
      { name: "Nitrate", slots: 1 }
    ],
    items: ["Amlodipine", "Aspirin", "Lisinopril", "Nitroglycerin"]
  },

  // Q78: Matrix - understanding
  78: {
    type: 'matrix',
    rows: [
      "\"I will stop the antibiotics when my child's temperature is below 100.6° F.\"",
      "\"I should weigh my child weekly and watch for weight gain.\"",
      "\"It is ok if my child develops a non-productive cough.\"",
      "\"I will check my child's skin for dryness and cracking.\""
    ],
    columns: ["Shows Understanding", "Needs Further Education"]
  },

  // Q80: Numeric - IV rate
  80: {
    type: 'numeric',
    unit: 'mL/hr',
    hint: '1 liter of lactated Ringer\'s to infuse in 8 hours. How many mL/hr?'
  },

  // Q90: Diagram click - chest drainage
  90: {
    type: 'diagram-click',
    diagramDescription: "Click the location on the chest drainage collection unit where 850 mL of serosanguineous drainage would be observed.",
    locations: [
      { label: "A", description: "Suction control chamber" },
      { label: "B", description: "Water seal chamber" },
      { label: "C", description: "Collection chamber" },
      { label: "D", description: "Patient connection port" }
    ]
  },

  // Q91: Dropdown - fill in blanks
  91: {
    type: 'dropdown',
    blanks: [
      {
        before: "The client is showing signs of",
        after: "related to",
        options: ["heart failure", "fluid volume overload", "pulmonary edema"]
      },
      {
        before: "",
        after: ".",
        options: ["decreased cardiac output", "impaired gas exchange", "activity intolerance"]
      }
    ]
  },

  // Q104: Drag categories - complete the diagram
  104: {
    type: 'drag-categories',
    categories: [
      { name: "Condition", slots: 1 },
      { name: "Nursing Actions (2)", slots: 2 },
      { name: "Parameters to Monitor (2)", slots: 2 }
    ],
    items: [
      "Wernicke's syndrome",
      "Alcohol withdrawal",
      "Administer thiamine IV",
      "Implement seizure precautions",
      "Monitor neurological status",
      "Assess orientation",
      "Monitor vital signs",
      "Evaluate gait and balance"
    ]
  },

  // Q105: Numeric - dosage
  105: {
    type: 'numeric',
    unit: 'mL',
    hint: 'Child weighs 25 kg. Methylprednisolone 0.5 mg/kg/day IM divided q12h. Available: 20 mg/mL. How many mL per dose?'
  },

  // Q117: Drag categories - complete the diagram
  117: {
    type: 'drag-categories',
    categories: [
      { name: "Condition", slots: 1 },
      { name: "Nursing Actions (2)", slots: 2 },
      { name: "Parameters to Monitor (2)", slots: 2 }
    ],
    items: [
      "Acute pain",
      "Impaired mobility",
      "Elevate affected limb",
      "Apply ice packs",
      "Assess pain level",
      "Monitor neurovascular status",
      "Check capillary refill",
      "Evaluate range of motion"
    ]
  },

  // Q127: Diagram click - chest collection unit
  127: {
    type: 'diagram-click',
    diagramDescription: "The nurse determines that 850 mL of serosanguineous drainage is in the chest drainage system. Click the location on the chest collection unit that indicates this finding.",
    locations: [
      { label: "A", description: "Suction control chamber (20 cm H2O)" },
      { label: "B", description: "Water seal chamber" },
      { label: "C", description: "Collection chamber (graduated)" },
      { label: "D", description: "Drainage from patient" }
    ]
  }
};
