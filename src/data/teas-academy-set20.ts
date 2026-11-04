// TEAS Academy Practice Set 20 - ONLY 15 real questions available
// Source: https://teasacademy.com/quiz?version=20&count=all&mode=review
// NOTE: Questions 16-170 are scrambled/obfuscated gibberish - not real content

export const teasAcademySet20 = {
  examId: 'teas-academy-set20-20240115',
  title: 'TEAS Academy Practice Set 20 (2024-01-15)',
  totalQuestions: 15, // Only 15 are real; rest are scrambled
  scrapedDate: '2024-01-15',
  sourceUrl: 'https://teasacademy.com/quiz?version=20&count=all&mode=review',
  notes: 'Questions 16-170 on the source page are scrambled/obfuscated word salad - not real questions. Only first 15 are usable.',
  questions: [
    {
      number: 1,
      text: "Which of the following is a detail that can help the reader infer why the U.S. vice president wrote a letter of support for the DPN movement?",
      choices: [
        "Closed-door discussion created more discontent among the Gallaudet University students.",
        "The Gallaudet University students gave speeches supporting their demands.",
        "The U.S. vice president was a Gallaudet University graduate who was not deaf.",
        "The U.S. president signs the diplomas of Gallaudet University graduates."
      ],
      explanation: "The question asks for a detail that helps the reader infer why the vice president — a member of the executive branch — felt moved to weigh in on Gallaudet's leadership. The passage establishes early on that the presidency has a long-standing, symbolic relationship with the university: 'U.S. President Ulysses S. Grant signed the Gallaudet diplomas. Future presidents continued the tradition, so all Gallaudet graduates receive diplomas signed by the U.S. President.' This detail shows that the executive branch has an established, decades-long tradition of formal support for and involvement with Gallaudet, which makes it logical that another high-ranking member of the executive branch (the VP) would feel a stake in the university's leadership crisis and offer support."
    },
    {
      number: 2,
      text: "Which of the following is a conclusion that can be drawn from the passage?",
      choices: [
        "The board of trustees did not bend to the pressure the movement applied.",
        "The students who participated in the protest would later face consequences.",
        "The DPN movement started when the only hearing candidate was appointed as president.",
        "The DPN movement was a first-of-its-kind representation protest movement."
      ],
      explanation: "A 'conclusion drawn from the passage' should be a statement that logically follows from the sequence of events described. The passage says the board 'selected the sole hearing candidate' and immediately afterward 'the reaction on campus was outrage' and protests began — this cause-and-effect relationship supports C as the triggering event of the movement."
    },
    {
      number: 3,
      text: "Which of the following statements represents a biased viewpoint presented in the text?",
      choices: [
        "One trustee said deaf people cannot function in a hearing world.",
        "The newly appointed hearing president resigned.",
        "Outrage spread on campus after the board's decision.",
        "The media spread the news of the DPN movement globally."
      ],
      explanation: "A biased viewpoint is a subjective opinion, not a verifiable, objective fact. Options B, C, and D are all factual, observable events reported neutrally by the passage. Option A reports a trustee's personal, prejudiced opinion — 'Deaf people are not able to function in a hearing world' — which is a sweeping, unsupported generalization about an entire group of people."
    },
    {
      number: 4,
      text: "A contractor plans to pave a rectangular walkway measuring 5 feet wide by 25 feet long, along with a square patio measuring 10 feet wide by 10 feet long, both using brick. What is the total area that will need to be covered in brick?",
      choices: [
        "100 ft²",
        "125 ft²",
        "225 ft²",
        "300 ft²"
      ],
      explanation: "Walkway (rectangle): Area = length × width = 25 ft × 5 ft = 125 ft². Patio (square): Area = side × side = 10 ft × 10 ft = 100 ft². Total area: 125 ft² + 100 ft² = 225 ft²."
    },
    {
      number: 5,
      text: "A farmer plants 4 apple trees for every 3 pecan trees in the orchard. She plants 2 peach trees for every 5 pecan trees. If the farmer plants 24 peach trees, how many apple trees are in the orchard?",
      choices: [
        "60 apple trees",
        "80 apple trees",
        "96 apple trees",
        "48 apple trees"
      ],
      explanation: "The ratio of peach trees to pecan trees is 2:5. Since the farmer planted 24 peach trees: 2/5 = 24/x, so x = 60 pecan trees. Now use the apple-to-pecan ratio of 4:3: 4/3 = y/60, so y = 80 apple trees."
    },
    {
      number: 6,
      text: "Which of the following is the best decimal approximation for the positive square root of 7?",
      choices: [
        "2.9",
        "3.5",
        "2.6",
        "2.1"
      ],
      explanation: "√7 ≈ 2.6458. Since 2.6² = 6.76 and 2.7² = 7.29, the true value of √7 lies between 2.6 and 2.7, much closer to 2.6. Checking the other options: 2.9² = 8.41 (too high), 3.5² = 12.25 (way too high), 2.1² = 4.41 (too low)."
    },
    {
      number: 7,
      text: "Which of the following values is the median of the data set below? 12, 5, 18, 10, 15, 11, 10, 7",
      choices: [
        "11",
        "10",
        "10.5",
        "12.5"
      ],
      explanation: "First, arrange in ascending order: 5, 7, 10, 10, 11, 12, 15, 18. There are 8 values (even number), so the median is the average of the two middle values — the 4th and 5th values: 10 and 11. Median = (10 + 11) / 2 = 10.5."
    },
    {
      number: 8,
      text: "Which of the following is the correct simplification of the expression below? 12 ÷ 3 x 4 - 1 + 2³",
      choices: [
        "23",
        "6",
        "8",
        "21"
      ],
      explanation: "Follow order of operations (PEMDAS). First evaluate the exponent: 2³ = 8. Expression becomes 12 ÷ 3 x 4 - 1 + 8. Next, multiplication and division left to right: 12 ÷ 3 = 4, then 4 x 4 = 16. Now: 16 - 1 + 8. Finally, addition and subtraction left to right: 16 - 1 = 15, then 15 + 8 = 23."
    },
    {
      number: 9,
      text: "If the air temperature outside on a warm day is 37 degrees Celsius (°C), which of the following is the air temperature in Kelvin (K)?",
      choices: [
        "310.15 K",
        "273.15 K",
        "643.15 K",
        "100 K"
      ],
      explanation: "The formula to convert Celsius to Kelvin is K = °C + 273.15. Substituting: K = 37 + 273.15 = 310.15 K."
    },
    {
      number: 10,
      text: "Which of the following is the mechanism by which water is reabsorbed in the renal nephrons?",
      choices: [
        "Active transport",
        "Osmosis",
        "Filtration",
        "Ion exchange"
      ],
      explanation: "Water reabsorption in the nephron occurs via osmosis, the passive movement of water across a selectively permeable membrane from an area of lower solute concentration to an area of higher solute concentration. As solutes (like sodium and glucose) are actively reabsorbed, water follows passively via osmosis."
    },
    {
      number: 11,
      text: "Which of the following diseases can occur as a result of a calcium deficiency?",
      choices: [
        "Pellagra",
        "Anemia",
        "Rickets",
        "Beriberi"
      ],
      explanation: "Rickets is a condition in children characterized by softening and weakening of bones, most commonly caused by a deficiency of vitamin D, calcium, or phosphate. Pellagra is caused by niacin (B3) deficiency. Anemia is linked to iron, B12, or folate deficiency. Beriberi results from thiamine (B1) deficiency."
    },
    {
      number: 12,
      text: "Which part of a paragraph best describes the sentence below? 'In summation, there should be an equal rights amendment because women are most likely to experience workplace discrimination and lower wages.'",
      choices: [
        "Concluding statement",
        "Opening statement",
        "Supporting detail",
        "Source citation"
      ],
      explanation: "The transitional phrase 'In summation' is a classic concluding-statement signal — it tells the reader the writer is wrapping up and restating the overall claim."
    },
    {
      number: 13,
      text: "Which of the following is punctuated correctly?",
      choices: [
        "My roommate gave me things I needed most; companionship and quiet; however, sometimes I wished she talked a bit more than she did.",
        "My roommate gave me things I needed most; companionship and quiet, however, sometimes I wished she talked a bit more than she did.",
        "My roommate gave me things I needed most: companionship and quiet; however, sometimes I wished she talked a bit more than she did.",
        "My roommate gave me things I needed most, companionship and quiet: however, sometimes I wished she talked a bit more than she did."
      ],
      explanation: "A colon is the correct mark to introduce a list or explanation ('things I needed most: companionship and quiet'). A semicolon is then correctly used before the conjunctive adverb 'however,' which joins two independent clauses."
    },
    {
      number: 14,
      text: "Which of the following is a complex sentence?",
      choices: [
        "Both the bus and Jung-hoon were running late.",
        "Jung-hoon and Cho decreased their carbon footprint.",
        "Jung-hoon waited for the bus and when the bus didn't appear, he wasn't sure it would, so he walked to the next bus stop.",
        "When Jung-hoon found a seat on the bus, he hoped he would have a quiet ride."
      ],
      explanation: "A complex sentence contains exactly one independent clause and at least one dependent clause. Option D has the dependent clause 'When Jung-hoon found a seat on the bus' attached to the independent clause 'he hoped he would have a quiet ride' — that's a textbook complex sentence."
    },
    {
      number: 15,
      text: "Which of the following steps includes thoughtful engagement with resources and outlining ideas?",
      choices: [
        "Formatting",
        "Publishing",
        "Revising",
        "Prewriting"
      ],
      explanation: "Prewriting is the planning stage of the writing process — it covers brainstorming, researching sources, and outlining before any actual drafting begins."
    }
  ]
};
