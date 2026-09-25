import { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, Flag, CheckCircle2, Clock, List, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { allScrapedExams } from './data/allScrapedQuestions';
import { interactiveQuestions } from './data/interactiveData';
import { 
  NumericInput, 
  HighlightText, 
  HighlightFindings, 
  MatrixGrid, 
  DropdownFill, 
  DiagramClick, 
  DragCategories 
} from './InteractiveComponents';

type AnswerMap = Record<number, number[]>; // question number -> selected choice indices

interface QuizViewProps {
  onExit?: () => void;
  examId?: string;
}

export default function QuizView({ onExit, examId = 'rn-hesi-exit-mcphs' }: QuizViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [interactiveAnswers, setInteractiveAnswers] = useState<Record<number, any>>({});
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  const [showPalette, setShowPalette] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [startTime] = useState(Date.now());
  const [elapsed, setElapsed] = useState(0);

  // Get the selected exam
  const selectedExam = allScrapedExams.find(exam => exam.id === examId) || allScrapedExams[0];
  const questions = selectedExam.questions;
  const examTitle = selectedExam.title;

  // Update timer every second
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const flaggedCount = flagged.size;

  const isAnswered = (qNum: number) => {
    if (answers[qNum] && answers[qNum].length > 0) return true;
    if (interactiveAnswers[qNum] !== undefined) {
      const val = interactiveAnswers[qNum];
      if (typeof val === 'string' && val.trim() !== '') return true;
      if (Array.isArray(val) && val.length > 0) return true;
      if (typeof val === 'object' && val !== null && Object.keys(val).length > 0) return true;
      if (typeof val === 'number') return true;
    }
    return false;
  };

  const answeredCount = questions.filter(q => isAnswered(q.number)).length;

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectAnswer = (choiceIndex: number) => {
    const qNum = currentQuestion.number;
    const isSATA = currentQuestion.text.toLowerCase().includes('select all that apply') || 
                   currentQuestion.text.toLowerCase().includes('(sata)');
    
    if (isSATA) {
      // Toggle for multi-select
      const current = answers[qNum] || [];
      if (current.includes(choiceIndex)) {
        setAnswers({ ...answers, [qNum]: current.filter(i => i !== choiceIndex) });
      } else {
        setAnswers({ ...answers, [qNum]: [...current, choiceIndex] });
      }
    } else {
      // Single select
      setAnswers({ ...answers, [qNum]: [choiceIndex] });
    }
  };

  const toggleFlag = () => {
    const newFlagged = new Set(flagged);
    if (newFlagged.has(currentQuestion.number)) {
      newFlagged.delete(currentQuestion.number);
    } else {
      newFlagged.add(currentQuestion.number);
    }
    setFlagged(newFlagged);
  };

  const goNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const resetQuiz = () => {
    setAnswers({});
    setInteractiveAnswers({});
    setFlagged(new Set());
    setCurrentIndex(0);
    setShowReview(false);
  };

  const isFlagged = (qNum: number) => flagged.has(qNum);
  const isSATA = currentQuestion.text.toLowerCase().includes('select all that apply') || 
                 currentQuestion.text.toLowerCase().includes('(sata)');

  // Filterable palette
  const [paletteFilter, setPaletteFilter] = useState<'all' | 'answered' | 'unanswered' | 'flagged'>('all');
  
  const filteredPalette = useMemo(() => {
    return questions.filter(q => {
      if (paletteFilter === 'answered') return isAnswered(q.number);
      if (paletteFilter === 'unanswered') return !isAnswered(q.number);
      if (paletteFilter === 'flagged') return isFlagged(q.number);
      return true;
    });
  }, [paletteFilter, answers, flagged]);

  if (showReview) {
    return (
      <ReviewView 
        answers={answers} 
        flagged={flagged} 
        onBack={() => setShowReview(false)} 
        onReset={resetQuiz}
        onJumpTo={(idx) => { setShowReview(false); setCurrentIndex(idx); }}
        questions={questions}
        isAnswered={isAnswered}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-gray-950/90 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onExit ? onExit() : window.history.back()}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Exit Quiz</span>
            </button>
            <div className="hidden sm:block h-6 w-px bg-gray-800" />
            <div className="hidden sm:block">
              <h1 className="text-sm font-bold">{examTitle}</h1>
              <p className="text-xs text-gray-500">Practice Quiz Mode</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Timer */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-800/50">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-mono text-gray-300">{formatTime(elapsed)}</span>
            </div>
            
            {/* Progress */}
            <div className="hidden md:flex items-center gap-2">
              <span className="text-sm text-gray-400">
                <span className="text-emerald-400 font-semibold">{answeredCount}</span>/{totalQuestions} answered
              </span>
              {flaggedCount > 0 && (
                <span className="text-sm text-amber-400 flex items-center gap-1">
                  <Flag className="w-3 h-3" />{flaggedCount}
                </span>
              )}
            </div>
            
            {/* Palette toggle */}
            <button
              onClick={() => setShowPalette(!showPalette)}
              className={`p-2 rounded-lg transition-colors ${showPalette ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
            >
              <List className="w-5 h-5" />
            </button>
            
            {/* Submit */}
            <button
              onClick={() => setShowReview(true)}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-sm font-semibold hover:scale-105 transition-transform"
            >
              Review
            </button>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="h-1 bg-gray-800">
          <div 
            className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-300"
            style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
          />
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
        {/* Question Palette Sidebar */}
        {showPalette && (
          <div className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24 bg-gray-900 border border-gray-800 rounded-xl p-4 max-h-[calc(100vh-8rem)] overflow-y-auto">
              <h3 className="font-semibold mb-3 text-sm">Question Navigator</h3>
              
              {/* Filter buttons */}
              <div className="flex flex-wrap gap-1 mb-3">
                {(['all', 'answered', 'unanswered', 'flagged'] as const).map(f => (
                  <button
                    key={f}
                    onClick={() => setPaletteFilter(f)}
                    className={`px-2 py-1 rounded text-xs transition-colors ${
                      paletteFilter === f 
                        ? 'bg-emerald-500/20 text-emerald-400' 
                        : 'bg-gray-800 text-gray-400 hover:text-white'
                    }`}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
              
              {/* Question grid */}
              <div className="grid grid-cols-8 gap-1">
                {filteredPalette.map(q => {
                  const answered = isAnswered(q.number);
                  const isFlag = isFlagged(q.number);
                  const isCurrent = q.number === currentQuestion.number;
                  
                  return (
                    <button
                      key={q.number}
                      onClick={() => setCurrentIndex(questions.findIndex(x => x.number === q.number))}
                      className={`w-8 h-8 rounded text-xs font-medium transition-all ${
                        isCurrent 
                          ? 'bg-emerald-500 text-white ring-2 ring-emerald-400 ring-offset-1 ring-offset-gray-900' 
                          : answered 
                            ? isFlag 
                              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                              : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : isFlag
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                              : 'bg-gray-800 text-gray-500 border border-gray-700 hover:border-gray-600'
                      }`}
                    >
                      {q.number}
                    </button>
                  );
                })}
              </div>
              
              {/* Legend */}
              <div className="mt-4 space-y-2 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-emerald-500/20 border border-emerald-500/30" />
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-amber-500/20 border border-amber-500/30" />
                  <span>Flagged</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-gray-800 border border-gray-700" />
                  <span>Unanswered</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Question Area */}
        <div className="flex-1 min-w-0">
          {/* Question Card */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
            {/* Question Header */}
            <div className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 font-bold">
                  {currentQuestion.number}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">Question {currentIndex + 1} of {totalQuestions}</span>
                    <span className="text-xs text-gray-600">•</span>
                    <span className="text-xs text-gray-500">Page {currentQuestion.page}</span>
                  </div>
                  {currentQuestion.isCaseStudy && (
                    <span className="text-xs text-orange-400">Case Study</span>
                  )}
                </div>
              </div>
              <button
                onClick={toggleFlag}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  isFlagged(currentQuestion.number)
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-gray-800 text-gray-400 hover:text-white border border-gray-700'
                }`}
              >
                <Flag className="w-4 h-4" />
                <span className="hidden sm:inline">{isFlagged(currentQuestion.number) ? 'Flagged' : 'Flag'}</span>
              </button>
            </div>

            {/* Question Body */}
            <div className="p-6">
              {currentQuestion.isFree && (
                <div className="mb-4 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>This is a free question — correct answer is highlighted in cyan on NursingPlex</span>
                </div>
              )}
              
              {isSATA && (
                <div className="mb-4 px-3 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs flex items-center gap-2">
                  <span>Select multiple answers (SATA)</span>
                </div>
              )}
              
              <p className="text-white text-base md:text-lg leading-relaxed mb-6">
                {currentQuestion.text}
              </p>

              {/* Interactive question types */}
              {interactiveQuestions[currentQuestion.number] ? (
                <div className="space-y-4">
                  <div className="px-3 py-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs flex items-center gap-2">
                    <span>🎯 Interactive Question — {
                      interactiveQuestions[currentQuestion.number].type === 'numeric' ? 'Enter a numeric value' :
                      interactiveQuestions[currentQuestion.number].type === 'highlight-text' ? 'Click text to highlight' :
                      interactiveQuestions[currentQuestion.number].type === 'highlight-findings' ? 'Click findings to highlight' :
                      interactiveQuestions[currentQuestion.number].type === 'matrix' ? 'Match items to categories' :
                      interactiveQuestions[currentQuestion.number].type === 'dropdown' ? 'Select from dropdowns' :
                      interactiveQuestions[currentQuestion.number].type === 'diagram-click' ? 'Click a location on the diagram' :
                      'Drag items into categories'
                    }</span>
                  </div>
                  
                  {interactiveQuestions[currentQuestion.number].type === 'numeric' && (
                    <NumericInput
                      question={interactiveQuestions[currentQuestion.number]}
                      value={interactiveAnswers[currentQuestion.number] || ''}
                      onChange={(val) => setInteractiveAnswers({ ...interactiveAnswers, [currentQuestion.number]: val })}
                    />
                  )}
                  
                  {interactiveQuestions[currentQuestion.number].type === 'highlight-text' && (
                    <HighlightText
                      question={interactiveQuestions[currentQuestion.number]}
                      value={interactiveAnswers[currentQuestion.number] || []}
                      onChange={(val) => setInteractiveAnswers({ ...interactiveAnswers, [currentQuestion.number]: val })}
                    />
                  )}
                  
                  {interactiveQuestions[currentQuestion.number].type === 'highlight-findings' && (
                    <HighlightFindings
                      question={interactiveQuestions[currentQuestion.number]}
                      value={interactiveAnswers[currentQuestion.number] || []}
                      onChange={(val) => setInteractiveAnswers({ ...interactiveAnswers, [currentQuestion.number]: val })}
                    />
                  )}
                  
                  {interactiveQuestions[currentQuestion.number].type === 'matrix' && (
                    <MatrixGrid
                      question={interactiveQuestions[currentQuestion.number]}
                      value={interactiveAnswers[currentQuestion.number] || {}}
                      onChange={(val) => setInteractiveAnswers({ ...interactiveAnswers, [currentQuestion.number]: val })}
                    />
                  )}
                  
                  {interactiveQuestions[currentQuestion.number].type === 'dropdown' && (
                    <DropdownFill
                      question={interactiveQuestions[currentQuestion.number]}
                      value={interactiveAnswers[currentQuestion.number] || {}}
                      onChange={(val) => setInteractiveAnswers({ ...interactiveAnswers, [currentQuestion.number]: val })}
                    />
                  )}
                  
                  {interactiveQuestions[currentQuestion.number].type === 'diagram-click' && (
                    <DiagramClick
                      question={interactiveQuestions[currentQuestion.number]}
                      value={interactiveAnswers[currentQuestion.number] ?? null}
                      onChange={(val) => setInteractiveAnswers({ ...interactiveAnswers, [currentQuestion.number]: val })}
                    />
                  )}
                  
                  {interactiveQuestions[currentQuestion.number].type === 'drag-categories' && (
                    <DragCategories
                      question={interactiveQuestions[currentQuestion.number]}
                      value={interactiveAnswers[currentQuestion.number] || {}}
                      onChange={(val) => setInteractiveAnswers({ ...interactiveAnswers, [currentQuestion.number]: val })}
                    />
                  )}
                </div>
              ) : currentQuestion.choices.length > 0 && !currentQuestion.choices[0].startsWith('(') ? (
                /* Standard multiple choice */
                <div className="space-y-3">
                  {currentQuestion.choices.map((choice: string, i: number) => {
                    const isSelected = (answers[currentQuestion.number] || []).includes(i);
                    
                    return (
                      <button
                        key={i}
                        onClick={() => handleSelectAnswer(i)}
                        className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 ${
                          isSelected
                            ? 'bg-emerald-500/10 border-emerald-500/40 ring-1 ring-emerald-500/30'
                            : 'bg-gray-800/50 border-gray-700 hover:border-gray-600 hover:bg-gray-800'
                        }`}
                      >
                        <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                          isSelected 
                            ? 'bg-emerald-500 text-white' 
                            : 'bg-gray-700 text-gray-400'
                        }`}>
                          {String.fromCharCode(65 + i)}
                        </div>
                        <span className={`pt-0.5 ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                          {choice}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                /* Placeholder for questions without interactive data yet */
                <div className="p-4 rounded-xl bg-gray-800/50 border border-gray-700 text-sm text-gray-400">
                  <p className="mb-1">⚠️ This interactive question type hasn't been fully built yet.</p>
                  <p className="text-xs text-gray-500">On NursingPlex, you would interact with a diagram, enter a numeric value, or drag items into categories.</p>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="px-6 py-4 border-t border-gray-800 flex items-center justify-between">
              <button
                onClick={goPrev}
                disabled={currentIndex === 0}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentIndex === 0
                    ? 'text-gray-600 cursor-not-allowed'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
              
              <span className="text-sm text-gray-500">
                {currentIndex + 1} / {totalQuestions}
              </span>
              
              <button
                onClick={goNext}
                disabled={currentIndex === totalQuestions - 1}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentIndex === totalQuestions - 1
                    ? 'text-gray-600 cursor-not-allowed'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick jump bar (mobile) */}
          <div className="lg:hidden mt-4 bg-gray-900 border border-gray-800 rounded-xl p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">Jump to question:</span>
              <span className="text-xs text-gray-500">
                {answeredCount} answered • {flaggedCount} flagged
              </span>
            </div>
            <div className="flex gap-1 overflow-x-auto pb-1">
              {questions.map(q => {
                const answered = isAnswered(q.number);
                const isFlag = isFlagged(q.number);
                const isCurrent = q.number === currentQuestion.number;
                
                return (
                  <button
                    key={q.number}
                    onClick={() => setCurrentIndex(questions.findIndex(x => x.number === q.number))}
                    className={`flex-shrink-0 w-7 h-7 rounded text-[10px] font-medium transition-all ${
                      isCurrent 
                        ? 'bg-emerald-500 text-white' 
                        : answered 
                          ? isFlag 
                            ? 'bg-amber-500/30 text-amber-400' 
                            : 'bg-emerald-500/20 text-emerald-400'
                          : isFlag
                            ? 'bg-amber-500/10 text-amber-400'
                            : 'bg-gray-800 text-gray-500'
                    }`}
                  >
                    {q.number}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Review View Component
function ReviewView({ answers, flagged, onBack, onReset, onJumpTo, questions, isAnswered }: {
  answers: AnswerMap;
  flagged: Set<number>;
  onBack: () => void;
  onReset: () => void;
  onJumpTo: (index: number) => void;
  questions: any[];
  isAnswered: (qNum: number) => boolean;
}) {
  const answeredCount = Object.keys(answers).length;
  const flaggedCount = flagged.size;
  const unanswered = questions.length - answeredCount;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-gray-950/90 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Quiz</span>
          </button>
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Quiz
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Quiz Summary</h2>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-white">{questions.length}</div>
            <div className="text-xs text-gray-400 mt-1">Total Questions</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-emerald-400">{answeredCount}</div>
            <div className="text-xs text-gray-400 mt-1">Answered</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-amber-400">{flaggedCount}</div>
            <div className="text-xs text-gray-400 mt-1">Flagged</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-red-400">{unanswered}</div>
            <div className="text-xs text-gray-400 mt-1">Unanswered</div>
          </div>
        </div>

        {/* Note about answers */}
        <div className="mb-6 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-sm text-gray-400">
          <strong className="text-amber-400">Note:</strong> NursingPlex only provides correct answer highlighting for the first 10 free questions. 
          For questions 11-127, the correct answers are not sent to your browser (server-side gated), so we cannot auto-grade them.
          Use this as a self-study tool to review your reasoning.
        </div>

        {/* Question list */}
        <div className="space-y-2">
          {questions.map((q: any, idx: number) => {
            const answered = isAnswered(q.number);
            const isFlag = flagged.has(q.number);
            const selectedChoices = answers[q.number] || [];

            return (
              <div key={q.number} className={`bg-gray-900 border rounded-xl p-4 ${
                answered ? 'border-emerald-500/20' : isFlag ? 'border-amber-500/20' : 'border-gray-800'
              }`}>
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => onJumpTo(idx)}
                    className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold transition-colors ${
                      answered ? 'bg-emerald-500/10 text-emerald-400' : 'bg-gray-800 text-gray-500'
                    } hover:scale-110`}
                  >
                    {q.number}
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-300 line-clamp-2 mb-2">{q.text}</p>
                    {answered && (
                      <div className="flex flex-wrap gap-1">
                        {selectedChoices.map(ci => (
                          <span key={ci} className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-xs">
                            {String.fromCharCode(65 + ci)}) {q.choices[ci]?.substring(0, 40)}{q.choices[ci]?.length > 40 ? '...' : ''}
                          </span>
                        ))}
                      </div>
                    )}
                    {!answered && (
                      <span className="text-xs text-gray-500 italic">Not answered</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {isFlag && <Flag className="w-4 h-4 text-amber-400" />}
                    <button
                      onClick={() => onJumpTo(idx)}
                      className="text-xs text-emerald-400 hover:underline"
                    >
                      Review →
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function isAnswered(qNum: number, answers: AnswerMap): boolean {
  return answers[qNum] && answers[qNum].length > 0;
}
