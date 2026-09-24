import { useState } from "react";
import { BookOpen, ArrowUpRight } from "lucide-react";
import {
  allScrapedExams,
  totalScrapedQuestions,
} from "./data/allScrapedQuestions";
import QuizView from "./QuizView";
export default function App() {
  const [examId, setExamId] = useState<string | null>(() => {
    const id = new URLSearchParams(location.search).get("exam");
    return allScrapedExams.some((e) => e.id === id) ? id : null;
  });
  function open(id: string | null) {
    const url = new URL(location.href);
    if (id) url.searchParams.set("exam", id);
    else url.searchParams.delete("exam");
    history.replaceState(null, "", url);
    setExamId(id);
  }
  if (examId)
    return <QuizView key={examId} examId={examId} onExit={() => open(null)} />;
  return (
    <div className="study-shell">
      <header className="study-header">
        <a href="?" className="brand">
          <BookOpen size={24} />
          NursingPlex<span>STUDY WORKSPACE</span>
        </a>
        <span className="muted">Your next step toward practice.</span>
      </header>
      <main className="library-main">
        <div className="eyebrow">YOUR QUESTION BANK</div>
        <h1>Make every question count.</h1>
        <p className="lede">
          Choose an exam, work through the questions, and revisit your
          reasoning.
        </p>
        <div className="bank-stats">
          <div>
            <strong>{totalScrapedQuestions}</strong>
            <span>Questions</span>
          </div>
          <div>
            <strong>{allScrapedExams.length}</strong>
            <span>Exam sets</span>
          </div>
          <div>
            <strong>At your pace</strong>
            <span>Progress saved on this device</span>
          </div>
        </div>
        <h2 className="section-title">Choose your exam</h2>
        <div className="exam-grid">
          {allScrapedExams.map((e, i) => (
            <button className="exam-card" key={e.id} onClick={() => open(e.id)}>
              <div className="card-meta">
                <span>{e.subcategory}</span>
                <span>0{i + 1}</span>
              </div>
              <h3>{e.title}</h3>
              <div className="card-bottom">
                <span>{e.questions.length} questions</span>
                <span className="card-action">
                  Open exam <ArrowUpRight size={18} />
                </span>
              </div>
            </button>
          ))}
        </div>
        <p className="library-note">
          Practice workspace • Answer keys are not included in the current
          question bank. Responses are saved for self-review.
        </p>
      </main>
    </div>
  );
}
