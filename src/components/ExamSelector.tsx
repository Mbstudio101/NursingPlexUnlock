import React from 'react';
import { allScrapedExams } from '../data/allScrapedQuestions';

interface ExamSelectorProps {
  onSelectExam: (examId: string) => void;
  currentExamId?: string;
}

export const ExamSelector: React.FC<ExamSelectorProps> = ({ onSelectExam, currentExamId }) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Select an Exam</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {allScrapedExams.map((exam) => (
          <button
            key={exam.id}
            onClick={() => onSelectExam(exam.id)}
            className={`p-6 rounded-lg border-2 transition-all hover:scale-105 ${
              currentExamId === exam.id
                ? 'border-purple-500 bg-purple-500/10'
                : 'border-gray-700 bg-gray-800/50 hover:border-purple-400'
            }`}
          >
            <div className="text-left">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold px-2 py-1 rounded bg-blue-500/20 text-blue-400">
                  {exam.category}
                </span>
                <span className="text-xs text-gray-400">{exam.subcategory}</span>
              </div>
              <h3 className="text-lg font-bold mb-2">{exam.title}</h3>
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>{exam.totalQuestions} questions</span>
                <span>Scraped: {exam.scrapedDate}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
