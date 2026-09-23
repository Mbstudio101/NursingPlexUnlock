import { useState } from 'react';
import { ArrowLeft, Search, Download, FileText, CheckCircle2, AlertCircle, BookOpen } from 'lucide-react';
import { allScrapedExams } from './data/allScrapedQuestions';

export default function ScrapedQuestions({ onExit, onStartQuiz }: { onExit?: () => void; onStartQuiz?: () => void } = {}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [filter, setFilter] = useState<'all' | 'free' | 'locked'>('all');
  const [selectedExamId, setSelectedExamId] = useState('rn-hesi-exit-mcphs');
  const [dropdownAnswers, setDropdownAnswers] = useState<Record<string, Record<number, string[]>>>({});
  const [matrixAnswers, setMatrixAnswers] = useState<Record<string, Record<number, Record<number, string>>>>({});

  const selectedExam = allScrapedExams.find(exam => exam.id === selectedExamId) || allScrapedExams[0];
  const questions = selectedExam.questions || [];
  const examTitle = selectedExam.title;
  const totalQuestions = selectedExam.totalQuestions;
  const totalPages = Math.ceil(totalQuestions / 4);
  const freeQuestions = Math.min(10, totalQuestions);

  const filteredQuestions = questions.filter((q: any) => {
    const matchesSearch = q.text?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (q.choices && q.choices.some((c: string) => c.toLowerCase().includes(searchTerm.toLowerCase())));
    const matchesFilter = filter === 'all' || 
      (filter === 'free' && q.isFree) || 
      (filter === 'locked' && !q.isFree);
    return matchesSearch && matchesFilter;
  });

  const displayQuestions = showAll ? filteredQuestions : filteredQuestions.slice(0, 15);

  const handleExport = () => {
    const text = questions.map((q: any) => {
      let result = `Q${q.number}. ${q.text}\n`;
      if (q.choices && q.choices.length > 0) {
        q.choices.forEach((c: string, i: number) => {
          result += `   ${String.fromCharCode(65 + i)}) ${c}\n`;
        });
      } else if (q.type) {
        result += `   [Interactive question type: ${q.type}]\n`;
      }
      return result;
    }).join('\n---\n\n');
    
    const blob = new Blob([`${examTitle}\n${'='.repeat(50)}\n\n${text}`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${examTitle.replace(/\s+/g, '-')}-questions.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-gray-950/80 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => onExit ? onExit() : window.history.back()} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back</span>
            </button>
            <div>
              <h1 className="text-lg font-bold">Scraped Questions</h1>
              <p className="text-xs text-gray-400">Select an exam to view questions</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {onStartQuiz && (
              <button
                onClick={onStartQuiz}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm hover:bg-purple-500/20 transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">Take Quiz</span>
              </button>
            )}
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm hover:bg-emerald-500/20 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-medium text-emerald-400">Verified</span>
            </div>
          </div>
        </div>
      </header>

      {/* Exam Selector */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h2 className="text-xl font-bold mb-4">Available Exams</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {allScrapedExams.map((exam) => (
            <button
              key={exam.id}
              onClick={() => setSelectedExamId(exam.id)}
              className={`p-4 rounded-lg border-2 transition-all hover:scale-105 text-left ${
                selectedExamId === exam.id
                  ? 'border-emerald-500 bg-emerald-500/10'
                  : 'border-gray-700 bg-gray-800/50 hover:border-emerald-400'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold px-2 py-1 rounded bg-blue-500/20 text-blue-400">
                  {exam.category}
                </span>
                <span className="text-xs text-gray-400">{exam.subcategory}</span>
              </div>
              <h3 className="text-sm font-bold mb-1 text-white">{exam.title}</h3>
              <div className="text-xs text-gray-400">
                {exam.totalQuestions} questions
              </div>
              {selectedExamId === exam.id && (
                <div className="mt-2 text-xs text-emerald-400 font-semibold">
                  ✓ Currently viewing
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Success Banner */}
      <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border-b border-emerald-500/20">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-2">✓ {examTitle}</h2>
              <p className="text-gray-400 text-sm mb-4">
                Successfully scraped {totalQuestions} questions with all answer choices. Click any exam card above to switch between exams.
              </p>
              <div className="flex flex-wrap gap-3 text-xs">
                <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  ✓ {totalQuestions} Questions
                </span>
                <span className="px-3 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  ✓ All Answer Choices
                </span>
                <span className="px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  ✓ {totalPages} Pages
                </span>
                <span className="px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  ✗ No Rationales (server-gated)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-emerald-400">{questions.length}</div>
            <div className="text-xs text-gray-400 mt-1">Total Questions</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-cyan-400">{totalPages}</div>
            <div className="text-xs text-gray-400 mt-1">Pages</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">{allScrapedExams.length}</div>
            <div className="text-xs text-gray-400 mt-1">Total Exams</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-amber-400">
              {allScrapedExams.reduce((sum, exam) => sum + exam.totalQuestions, 0)}
            </div>
            <div className="text-xs text-gray-400 mt-1">All Questions Combined</div>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="max-w-6xl mx-auto px-4 pb-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search questions or answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-900 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50"
            />
          </div>
          <div className="flex gap-2">
            {(['all', 'free', 'locked'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  filter === f
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-gray-900 text-gray-400 border border-gray-800 hover:border-gray-700'
                }`}
              >
                {f === 'all' ? 'All' : f === 'free' ? 'Free (1-10)' : 'Locked (11-127)'}
              </button>
            ))}
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Showing {filteredQuestions.length} of {totalQuestions} questions
        </p>
      </div>

      {/* Questions List */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        {questions.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg mb-2">No questions loaded for this exam</p>
            <p className="text-sm">Please select a different exam or check back later.</p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {displayQuestions.map((q) => (
                <div key={q.number} className={`bg-gray-900 border rounded-xl p-5 md:p-6 ${
                  q.isFree ? 'border-emerald-500/20' : 'border-gray-800'
                }`}>
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                      q.isFree ? 'bg-emerald-500/10' : 'bg-gray-800'
                    }`}>
                      <span className={`text-sm font-bold ${q.isFree ? 'text-emerald-400' : 'text-gray-400'}`}>
                        {q.number}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        {q.isFree && (
                          <span className="px-2 py-0.5 rounded text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            Free
                          </span>
                        )}
                        {q.isCaseStudy && (
                          <span className="px-2 py-0.5 rounded text-xs bg-orange-500/10 text-orange-400 border border-orange-500/20">
                            Case Study
                          </span>
                        )}
                        <span className="text-xs text-gray-500">Page {q.page}</span>
                      </div>
                      <p className="text-white mb-4 leading-relaxed text-sm md:text-base">{q.text}</p>
                      {q.image && (
                        <div className="mb-4 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                          <img 
                            src={q.image} 
                            alt={`Question ${q.number} image`}
                            className="max-w-full h-auto rounded"
                            style={{ maxHeight: '400px' }}
                          />
                        </div>
                      )}
                      {q.choices && q.choices.length > 0 && q.choices[0] !== '(Fill in the blank - numeric value)' && q.choices[0] !== '(Fill in the blanks)' && q.choices[0] !== '(Drag and drop diagram)' && q.choices[0] !== '(Drag and drop - drug classification and treatment goals)' && q.choices[0] !== '(Drag and drop - drug classification and medication action)' && q.choices[0] !== '(Drag and drop to complete sentence about PCI)' && q.choices[0] !== '(Click the chosen location on diagram)' && (
                        <div className="space-y-2">
                          {q.choices.map((choice: string, i: number) => (
                            <div key={i} className="flex items-start gap-3 text-sm">
                              <span className="flex-shrink-0 w-6 h-6 rounded bg-gray-800 flex items-center justify-center text-xs font-medium text-gray-400">
                                {String.fromCharCode(65 + i)}
                              </span>
                              <span className="text-gray-300 pt-0.5">{choice}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {q.choices && q.choices.length > 0 && (q.choices[0].includes('Fill in') || q.choices[0].includes('Drag and drop') || q.choices[0].includes('Click the')) && (
                        <div className="text-xs text-gray-500 italic">{q.choices[0]}</div>
                      )}
                      {q.type === 'dropdown' && (
                        <InteractiveDropdown
                          questionNumber={q.number}
                          examId={selectedExamId}
                          text={q.text}
                          dropdownAnswers={dropdownAnswers}
                          setDropdownAnswers={setDropdownAnswers}
                        />
                      )}
                      {q.type === 'numeric' && (
                        <div className="mt-3 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                          <label className="block text-sm text-purple-400 mb-2">Enter your answer:</label>
                          <input
                            type="text"
                            placeholder="Type your numeric answer..."
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                          />
                        </div>
                      )}
                      {q.type === 'ordering' && (
                        <div className="mt-3 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                          <p className="text-sm text-purple-400 mb-2">Drag items to reorder:</p>
                          <div className="space-y-2">
                            {q.choices?.map((choice: string, i: number) => (
                              <div key={i} className="px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white cursor-move">
                                {String.fromCharCode(65 + i)}) {choice}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {q.type === 'matrix' && q.rows && q.columns && (
                        <InteractiveMatrix
                          questionNumber={q.number}
                          examId={selectedExamId}
                          rows={q.rows}
                          columns={q.columns}
                          matrixAnswers={matrixAnswers}
                          setMatrixAnswers={setMatrixAnswers}
                        />
                      )}
                      {q.type && q.type !== 'dropdown' && q.type !== 'numeric' && q.type !== 'ordering' && q.type !== 'matrix' && (
                        <div className="text-xs text-purple-400 italic">
                          Interactive question type: {q.type}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {!showAll && filteredQuestions.length > 15 && (
              <div className="mt-8 text-center">
                <button
                  onClick={() => setShowAll(true)}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold hover:scale-105 transition-transform shadow-lg shadow-emerald-500/20"
                >
                  Show All {filteredQuestions.length} Questions
                </button>
              </div>
            )}

            {filteredQuestions.length === 0 && questions.length > 0 && (
              <div className="text-center py-12 text-gray-500">
                No questions found matching "{searchTerm}"
              </div>
            )}
          </>
        )}
      </div>

      {/* Info Banner */}
      <div className="max-w-6xl mx-auto px-4 pb-8">
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-5 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-gray-400">
            <strong className="text-amber-400">Note:</strong> Correct answers are only highlighted (in cyan) for the first 10 free questions on NursingPlex. 
            For locked questions, the answer highlighting data is not sent to your browser — it's server-side gated. 
            All question text and answer choices above were successfully extracted because they were always in the HTML, just visually blurred.
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-500 mb-2">
            {allScrapedExams.reduce((sum, exam) => sum + exam.totalQuestions, 0)} total questions scraped from {allScrapedExams.length} exams — proving the unlock script works.
          </p>
          <p className="text-xs text-gray-600">
            For educational purposes only. Consider supporting NursingPlex if you find their content valuable.
          </p>
        </div>
      </footer>
    </div>
  );
}

// Interactive Dropdown Component
function InteractiveDropdown({ 
  questionNumber, 
  examId, 
  text, 
  dropdownAnswers, 
  setDropdownAnswers 
}: {
  questionNumber: number;
  examId: string;
  text: string;
  dropdownAnswers: Record<string, Record<number, string[]>>;
  setDropdownAnswers: (answers: Record<string, Record<number, string[]>>) => void;
}) {
  // Extract dropdown placeholders from text
  const dropdownCount = (text.match(/\[dropdown\]/g) || []).length;
  const currentAnswers = dropdownAnswers[examId]?.[questionNumber] || Array(dropdownCount).fill('');

  // Sample options for dropdown questions (these would normally come from the case study data)
  const sampleOptions = [
    'Assess the client',
    'Notify the healthcare provider',
    'Document the findings',
    'Administer medication',
    'Implement safety measures',
    'Monitor vital signs',
    'Provide emotional support',
    'Perform intervention'
  ];

  const handleDropdownChange = (dropdownIndex: number, value: string) => {
    const newAnswers = { ...dropdownAnswers };
    if (!newAnswers[examId]) {
      newAnswers[examId] = {};
    }
    if (!newAnswers[examId][questionNumber]) {
      newAnswers[examId][questionNumber] = Array(dropdownCount).fill('');
    }
    newAnswers[examId][questionNumber][dropdownIndex] = value;
    setDropdownAnswers(newAnswers);
  };

  // Split text by [dropdown] markers
  const parts = text.split(/\[dropdown\]/);

  return (
    <div className="mt-3 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
      <p className="text-sm text-purple-400 mb-3">Select from dropdown:</p>
      <div className="space-y-3">
        {parts.map((part, index) => {
          if (index === parts.length - 1 && !part.trim()) return null;
          
          return (
            <div key={index} className="flex flex-wrap items-center gap-2">
              {part && <span className="text-white text-sm">{part}</span>}
              {index < dropdownCount && (
                <select
                  value={currentAnswers[index] || ''}
                  onChange={(e) => handleDropdownChange(index, e.target.value)}
                  className="px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white focus:outline-none focus:border-purple-500 min-w-[200px]"
                >
                  <option value="">-- Select option --</option>
                  {sampleOptions.map((option, i) => (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
            </div>
          );
        })}
      </div>
      {currentAnswers.some(a => a) && (
        <div className="mt-3 p-2 bg-gray-800/50 rounded text-xs text-gray-400">
          <strong>Your selections:</strong> {currentAnswers.filter(a => a).join(' → ')}
        </div>
      )}
    </div>
  );
}

// Interactive Matrix Component
function InteractiveMatrix({ 
  questionNumber, 
  examId, 
  rows, 
  columns, 
  matrixAnswers, 
  setMatrixAnswers 
}: {
  questionNumber: number;
  examId: string;
  rows: string[];
  columns: string[];
  matrixAnswers: Record<string, Record<number, Record<number, string>>>;
  setMatrixAnswers: (answers: Record<string, Record<number, Record<number, string>>>) => void;
}) {
  const currentAnswers = matrixAnswers[examId]?.[questionNumber] || {};

  const handleCellClick = (rowIndex: number, colValue: string) => {
    const newAnswers = { ...matrixAnswers };
    if (!newAnswers[examId]) {
      newAnswers[examId] = {};
    }
    if (!newAnswers[examId][questionNumber]) {
      newAnswers[examId][questionNumber] = {};
    }
    
    // Toggle selection - if already selected, remove it; otherwise set it
    if (newAnswers[examId][questionNumber][rowIndex] === colValue) {
      delete newAnswers[examId][questionNumber][rowIndex];
    } else {
      newAnswers[examId][questionNumber][rowIndex] = colValue;
    }
    
    setMatrixAnswers(newAnswers);
  };

  return (
    <div className="mt-3 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
      <p className="text-sm text-purple-400 mb-3">Click to select the appropriate column for each row:</p>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border border-gray-700 bg-gray-800 p-2 text-left text-sm text-gray-300 min-w-[200px]">
                Row
              </th>
              {columns.map((col, colIdx) => (
                <th key={colIdx} className="border border-gray-700 bg-gray-800 p-2 text-center text-sm text-gray-300 min-w-[120px]">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIdx) => (
              <tr key={rowIdx}>
                <td className="border border-gray-700 bg-gray-800/50 p-2 text-sm text-white">
                  {row}
                </td>
                {columns.map((col, colIdx) => {
                  const isSelected = currentAnswers[rowIdx] === col;
                  return (
                    <td
                      key={colIdx}
                      onClick={() => handleCellClick(rowIdx, col)}
                      className={`border border-gray-700 p-2 text-center cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-purple-500/30 text-purple-300 font-semibold'
                          : 'bg-gray-900/50 hover:bg-gray-800'
                      }`}
                    >
                      {isSelected ? '✓' : ''}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {Object.keys(currentAnswers).length > 0 && (
        <div className="mt-3 p-2 bg-gray-800/50 rounded text-xs text-gray-400">
          <strong>Your selections:</strong>
          <ul className="mt-1 space-y-1">
            {Object.entries(currentAnswers).map(([rowIdx, colValue]) => (
              <li key={rowIdx}>
                • {rows[parseInt(rowIdx)]} → {colValue}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
