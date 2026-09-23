import React from 'react';
import { allScrapedExams } from '../data/allScrapedQuestions';

interface ExamSelectorProps {
  onSelectExam: (examId: string) => void;
  currentExamId?: string;
}

export const ExamSelector: React.FC<ExamSelectorProps> = ({ onSelectExam, currentExamId }) => {
  console.log('ExamSelector rendering with exams:', allScrapedExams);
  
  if (!allScrapedExams || allScrapedExams.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-white">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Loading Exams...</h2>
        <p className="text-center text-gray-400">Please wait while we load the exam data.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center text-white">Select an Exam</h2>
      <p className="text-center text-gray-400 mb-8">Choose from {allScrapedExams.length} available exams</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {allScrapedExams.map((exam) => (
          <button
            key={exam.id}
            onClick={() => {
              console.log('Selected exam:', exam.id);
              onSelectExam(exam.id);
            }}
            className={`p-6 rounded-lg border-2 transition-all hover:scale-105 text-left ${
              currentExamId === exam.id
                ? 'border-purple-500 bg-purple-500/10'
                : 'border-gray-700 bg-gray-800/50 hover:border-purple-400'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold px-2 py-1 rounded bg-blue-500/20 text-blue-400">
                  {exam.category}
                </span>
                <span className="text-xs text-gray-400">{exam.subcategory}</span>
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">{exam.title}</h3>
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>{exam.totalQuestions} questions</span>
                <span>Scraped: {exam.scrapedDate}</span>
              </div>
              {exam.questions && (
                <div className="mt-2 text-xs text-green-400">
                  ✓ {exam.questions.length} questions loaded
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
