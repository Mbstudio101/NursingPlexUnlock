import { useState } from 'react';
import { ArrowLeft, Search, Download, FileText, CheckCircle2, AlertCircle, BookOpen } from 'lucide-react';
import { allScrapedExams } from './data/allScrapedQuestions';

export default function ScrapedQuestions({ onExit, onStartQuiz }: { onExit?: () => void; onStartQuiz?: () => void } = {}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [filter, setFilter] = useState<'all' | 'free' | 'locked'>('all');
  const [selectedExamId, setSelectedExamId] = useState('rn-hesi-exit-mcphs');

  const selectedExam = allScrapedExams.find(exam => exam.id === selectedExamId) || allScrapedExams[0];
  const questions = selectedExam.questions;
  const examTitle = selectedExam.title;
  const totalQuestions = selectedExam.totalQuestions;
  const totalPages = Math.ceil(totalQuestions / 4);
  const freeQuestions = Math.min(10, totalQuestions);

  const filteredQuestions = questions.filter((q: any) => {
    const matchesSearch = q.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.choices.some((c: string) => c.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filter === 'all' || 
      (filter === 'free' && q.isFree) || 
      (filter === 'locked' && !q.isFree);
    return matchesSearch && matchesFilter;
  });

  const displayQuestions = showAll ? filteredQuestions : filteredQuestions.slice(0, 15);

  const handleExport = () => {
    const text = questions.map((q: any) => {
      let result = `Q${q.number}. ${q.text}\n`;
      q.choices.forEach((c: string, i: number) => {
        result += `   ${String.fromCharCode(65 + i)}) ${c}\n`;
      });
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
              <select
                value={selectedExamId}
                onChange={(e) => setSelectedExamId(e.target.value)}
                className="text-xs bg-gray-800 border border-gray-700 rounded px-2 py-1 text-gray-300 focus:outline-none focus:border-emerald-500"
              >
                {allScrapedExams.map(exam => (
                  <option key={exam.id} value={exam.id}>
                    {exam.title} ({exam.totalQuestions}q)
                  </option>
                ))}
              </select>
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

      {/* Success Banner */}
      <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border-b border-emerald-500/20">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-2">✓ Script Successfully Scraped All 127 Questions!</h2>
              <p className="text-gray-400 text-sm mb-4">
                This proves the unlock script works. All content was extracted from the HTML — the blur was purely CSS (3px blur + 60% opacity + pointer-events:none). 
                The text was always there in the DOM.
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
                <span className="px-3 py-1.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                  ✗ No Correct Answers for Q11-127
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
            <div className="text-2xl font-bold text-emerald-400">{totalQuestions}</div>
            <div className="text-xs text-gray-400 mt-1">Total Questions</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-cyan-400">{totalPages}</div>
            <div className="text-xs text-gray-400 mt-1">Pages</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">{freeQuestions}</div>
            <div className="text-xs text-gray-400 mt-1">Free (with answers)</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-amber-400">{totalQuestions - freeQuestions}</div>
            <div className="text-xs text-gray-400 mt-1">Unblurred (no answers)</div>
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
                  {q.choices.length > 0 && q.choices[0] !== '(Fill in the blank - numeric value)' && q.choices[0] !== '(Fill in the blanks)' && q.choices[0] !== '(Drag and drop diagram)' && q.choices[0] !== '(Drag and drop - drug classification and treatment goals)' && q.choices[0] !== '(Drag and drop - drug classification and medication action)' && q.choices[0] !== '(Drag and drop to complete sentence about PCI)' && q.choices[0] !== '(Click the chosen location on diagram)' && (
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
                  {q.choices.length > 0 && (q.choices[0].includes('Fill in') || q.choices[0].includes('Drag and drop') || q.choices[0].includes('Click the')) && (
                    <div className="text-xs text-gray-500 italic">{q.choices[0]}</div>
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

        {filteredQuestions.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No questions found matching "{searchTerm}"
          </div>
        )}
      </div>

      {/* Info Banner */}
      <div className="max-w-6xl mx-auto px-4 pb-8">
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-5 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-gray-400">
            <strong className="text-amber-400">Note:</strong> Correct answers are only highlighted (in cyan) for the first 10 free questions on NursingPlex. 
            For questions 11-127, the answer highlighting data is not sent to your browser — it's server-side gated. 
            All question text and answer choices above were successfully extracted because they were always in the HTML, just visually blurred.
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-500 mb-2">
            All 127 questions scraped from NursingPlex.com — proving the unlock script works.
          </p>
          <p className="text-xs text-gray-600">
            For educational purposes only. Consider supporting NursingPlex if you find their content valuable.
          </p>
        </div>
      </footer>
    </div>
  );
}
