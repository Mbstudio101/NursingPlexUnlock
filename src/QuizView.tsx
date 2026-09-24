import { useEffect, useState, type ComponentType } from "react";
import type { InteractiveQuestion } from "./InteractiveComponents";
import {
  ArrowLeft,
  BookOpen,
  Flag,
  Pause,
  Play,
  List,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { allScrapedExams } from "./data/allScrapedQuestions";
import {
  configuration,
  complete,
  multiple,
  selectionLimit,
  answerLabel,
} from "./lib/questionFormat";
import {
  NumericInput,
  HighlightText,
  HighlightFindings,
  MatrixGrid,
  DropdownFill,
  DiagramClick,
  DragCategories,
} from "./InteractiveComponents";

type Session = {
  index: number;
  answers: Record<number, any>;
  flags: number[];
  elapsed: number;
};
const fresh = (): Session => ({ index: 0, answers: {}, flags: [], elapsed: 0 });
function load(key: string, count: number): Session {
  try {
    const s = JSON.parse(localStorage.getItem(key) || "null");
    if (
      s &&
      Number.isInteger(s.index) &&
      s.index >= 0 &&
      s.index < count &&
      s.answers &&
      typeof s.answers === "object" &&
      !Array.isArray(s.answers) &&
      Array.isArray(s.flags) &&
      s.flags.every(Number.isInteger) &&
      Number.isFinite(s.elapsed) &&
      s.elapsed >= 0
    )
      return s;
  } catch {}
  return fresh();
}
export default function QuizView({
  onExit,
  examId = "rn-hesi-exit-mcphs",
}: {
  onExit?: () => void;
  examId?: string;
}) {
  const exam = allScrapedExams.find((e) => e.id === examId)!;
  const questions = exam?.questions || [];
  const key = `nursing-study:v1:${examId}`;
  const [session, setSession] = useState(() => load(key, questions.length));
  const [paused, setPaused] = useState(false);
  const [review, setReview] = useState(false);
  const [palette, setPalette] = useState(false);
  const [filter, setFilter] = useState("all");
  const [storageError, setStorageError] = useState(false);
  const [imageError, setImageError] = useState(false);
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(session));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }, [key, session]);
  useEffect(() => {
    if (paused || review) return;
    let last = Date.now();
    const timer = setInterval(() => {
      const now = Date.now();
      const delta = Math.floor((now - last) / 1000);
      if (delta) {
        last += delta * 1000;
        setSession((s) => ({ ...s, elapsed: s.elapsed + delta }));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [paused, review]);
  useEffect(() => {
    setImageError(false);
  }, [session.index]);
  if (!exam || !questions.length)
    return (
      <main className="library-main">
        <h1>Exam unavailable</h1>
        <button onClick={onExit}>Back to exams</button>
      </main>
    );
  const q = questions[session.index];
  const config = configuration(examId, q);
  const value = session.answers[q.number];
  const components = {
    numeric: NumericInput,
    "highlight-text": HighlightText,
    "highlight-findings": HighlightFindings,
    matrix: MatrixGrid,
    dropdown: DropdownFill,
    "diagram-click": DiagramClick,
    "drag-categories": DragCategories,
  };
  const Control = config
    ? (components[config.type] as ComponentType<{
        question: InteractiveQuestion;
        value: any;
        onChange: (value: any) => void;
      }>)
    : null;
  const defaultValue =
    config?.type === "numeric"
      ? ""
      : config?.type === "diagram-click"
        ? null
        : config?.type.startsWith("highlight")
          ? []
          : {};
  const choices: string[] = q.choices || [];
  const available = choices.length > 0 && !choices[0].startsWith("(");
  const isMulti = multiple(q),
    limit = selectionLimit(q);
  const answered = (question: typeof q) =>
    complete(
      question,
      configuration(examId, question),
      session.answers[question.number],
    );
  const count = questions.filter(answered).length;
  const update = (v: any) =>
    setSession((s) => ({ ...s, answers: { ...s.answers, [q.number]: v } }));
  const jump = (index: number) => {
    setSession((s) => ({ ...s, index }));
    setReview(false);
    setPalette(false);
  };
  function choose(i: number) {
    const current: number[] = Array.isArray(value) ? value : [];
    if (q.type === "ordering")
      return update(
        current.includes(i) ? current.filter((x) => x !== i) : [...current, i],
      );
    if (!isMulti) return update([i]);
    if (current.includes(i)) update(current.filter((x) => x !== i));
    else if (!limit || current.length < limit) update([...current, i]);
  }
  const time = [
    Math.floor(session.elapsed / 3600),
    Math.floor(session.elapsed / 60) % 60,
    session.elapsed % 60,
  ]
    .map((x) => String(x).padStart(2, "0"))
    .join(":");
  const instruction = config
    ? {
        numeric: "Enter your numeric answer",
        matrix: "Select one answer in every row",
        dropdown: "Complete every blank",
        "highlight-text": "Highlight the relevant findings",
        "highlight-findings": "Select the relevant findings",
        "diagram-click": "Select a location",
        "drag-categories": "Assign items to the categories",
      }[config.type]
    : q.type === "ordering"
      ? "Select steps in order. Select a step again to remove it."
      : isMulti
        ? limit
          ? `Select ${limit} answers`
          : "Select all that apply"
        : "Select one answer";
  return (
    <div className="study-shell">
      <header className="study-header">
        <button className="back-button" onClick={onExit}>
          <ArrowLeft size={18} />
          <span>Exams</span>
        </button>
        <div className="exam-heading">
          <strong>{exam.title}</strong>
          <span>
            {storageError
              ? "Unable to save in this browser—keep this tab open."
              : "Progress saved on this device"}
          </span>
        </div>
        <div className="timer">
          <span>{time}</span>
          <button
            aria-label={paused ? "Resume timer" : "Pause timer"}
            onClick={() => setPaused(!paused)}
            disabled={review}
          >
            {paused ? <Play size={18} /> : <Pause size={18} />}
          </button>
        </div>
        <button className="primary" onClick={() => setReview(!review)}>
          {review ? "Continue" : "Review"}
        </button>
      </header>
      <div className="progress-track">
        <div style={{ width: `${(count / questions.length) * 100}%` }} />
      </div>
      {review ? (
        <main className="review-main">
          <div className="eyebrow">YOUR SESSION</div>
          <h1>Review your work.</h1>
          <p className="lede">
            {count} of {questions.length} questions completed ·{" "}
            {session.flags.length} flagged
          </p>
          <p className="notice">
            Answer keys are not included. This is a completion summary, not a
            graded score. Incomplete questions and missing exhibits need further
            review.
          </p>
          <div className="review-actions">
            <button className="secondary" onClick={() => setReview(false)}>
              Continue practice
            </button>
            <button
              className="secondary"
              onClick={() => {
                if (
                  window.confirm(
                    "Clear all responses, flags and time for this exam?",
                  )
                ) {
                  setSession(fresh());
                  setReview(false);
                  setPaused(false);
                }
              }}
            >
              Start over
            </button>
          </div>
          <div className="review-list">
            {questions.map((question, index) => (
              <article key={question.number}>
                <div className="review-item-heading">
                  <span>
                    QUESTION {index + 1}{" "}
                    {session.flags.includes(question.number) ? "• FLAGGED" : ""}
                  </span>
                  <button onClick={() => jump(index)}>
                    Revisit <ChevronRight size={16} />
                  </button>
                </div>
                <h3>{question.text}</h3>
                <p className="answer-summary">
                  {answerLabel(
                    question,
                    configuration(examId, question),
                    session.answers[question.number],
                  )}
                </p>
                <span className="status-label">
                  {answered(question) ? "Completed" : "Incomplete"}
                </span>
              </article>
            ))}
          </div>
        </main>
      ) : (
        <main className="exam-layout">
          <aside className={`navigator ${palette ? "is-open" : ""}`}>
            <div className="navigator-title">
              <BookOpen size={19} />
              <h2>Question navigator</h2>
            </div>
            <p>
              {count} completed · {questions.length - count} remaining
            </p>
            <label className="filter-label">
              Show questions
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All questions</option>
                <option value="unanswered">Incomplete</option>
                <option value="answered">Completed</option>
                <option value="flagged">Flagged</option>
              </select>
            </label>
            <div className="question-grid">
              {questions
                .map((question, index) => ({ question, index }))
                .filter(
                  ({ question }) =>
                    filter === "all" ||
                    (filter === "flagged" &&
                      session.flags.includes(question.number)) ||
                    (filter === "answered" && answered(question)) ||
                    (filter === "unanswered" && !answered(question)),
                )
                .map(({ question, index }) => (
                  <button
                    key={question.number}
                    aria-label={`Question ${index + 1}${session.flags.includes(question.number) ? ", flagged" : ""}`}
                    aria-current={session.index === index ? "step" : undefined}
                    className={`${session.index === index ? "current" : ""} ${answered(question) ? "answered" : ""} ${session.flags.includes(question.number) ? "flagged" : ""}`}
                    onClick={() => jump(index)}
                  >
                    {index + 1}
                  </button>
                ))}
            </div>
            <p className="navigator-legend">
              Teal: completed
              <br />
              Amber outline: flagged
            </p>
          </aside>
          <section className="question-area">
            <div className="question-toolbar">
              <span className="eyebrow">
                QUESTION {session.index + 1} / {questions.length}
              </span>
              <div>
                <button
                  className="mobile-nav"
                  onClick={() => setPalette(!palette)}
                  aria-expanded={palette}
                >
                  <List size={18} />
                  Navigator
                </button>
                <button
                  aria-pressed={session.flags.includes(q.number)}
                  onClick={() =>
                    setSession((s) => ({
                      ...s,
                      flags: s.flags.includes(q.number)
                        ? s.flags.filter((x) => x !== q.number)
                        : [...s.flags, q.number],
                    }))
                  }
                >
                  <Flag size={17} />
                  {session.flags.includes(q.number)
                    ? "Flagged"
                    : "Flag for review"}
                </button>
              </div>
            </div>
            {paused ? (
              <div className="question-card pause-card">
                <Pause size={34} />
                <h2>Take a moment.</h2>
                <p>Your answers are saved. Resume when you’re ready.</p>
                <button className="primary" onClick={() => setPaused(false)}>
                  Resume practice
                </button>
              </div>
            ) : (
              <div className="question-card">
                <div className="question-type">
                  {q.isCaseStudy ? "CASE STUDY · " : ""}
                  {instruction}
                </div>
                <h1 className="question-stem">{q.text}</h1>
                {q.note && <p className="notice">{q.note}</p>}
                {q.image &&
                  (imageError ? (
                    <p className="notice">
                      The question image could not be loaded. Flag this question
                      for review.
                    </p>
                  ) : (
                    <img
                      className="question-image"
                      src={q.image}
                      alt={`Exhibit for question ${session.index + 1}`}
                      onError={() => setImageError(true)}
                    />
                  ))}
                {Control && config ? (
                  <Control
                    key={q.number}
                    question={config}
                    value={value ?? (defaultValue as any)}
                    onChange={update}
                  />
                ) : available ? (
                  <div
                    className="choices"
                    role="group"
                    aria-label={instruction}
                  >
                    {choices.map((choice, i) => {
                      const selected =
                        Array.isArray(value) && value.includes(i);
                      return (
                        <button
                          key={i}
                          className={`choice ${selected ? "selected" : ""}`}
                          aria-pressed={selected}
                          onClick={() => choose(i)}
                        >
                          <span
                            className={`choice-letter ${isMulti ? "square" : ""}`}
                          >
                            {q.type === "ordering" && selected
                              ? value.indexOf(i) + 1
                              : String.fromCharCode(65 + i)}
                          </span>
                          <span>{choice.replace(/^[A-H][.)]\s+/, "")}</span>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <p className="notice">
                    This question is missing its answer options or exhibit. Flag
                    it for review; it cannot be completed reliably with the
                    current data.
                  </p>
                )}
                <div className="response-footer">
                  <span>
                    {answered(q)
                      ? "Response completed"
                      : value != null
                        ? "Response incomplete"
                        : "No response yet"}
                  </span>
                  <button
                    disabled={value == null}
                    onClick={() => {
                      setSession((s) => {
                        const answers = { ...s.answers };
                        delete answers[q.number];
                        return { ...s, answers };
                      });
                    }}
                  >
                    Clear response
                  </button>
                </div>
              </div>
            )}
            <nav
              className="question-navigation"
              aria-label="Question navigation"
            >
              <button
                className="secondary"
                disabled={session.index === 0}
                onClick={() => jump(session.index - 1)}
              >
                <ChevronLeft size={18} />
                Previous
              </button>
              <span>
                {session.index + 1} of {questions.length}
              </span>
              <button
                className="primary"
                onClick={() =>
                  session.index === questions.length - 1
                    ? setReview(true)
                    : jump(session.index + 1)
                }
              >
                {session.index === questions.length - 1
                  ? "Review session"
                  : "Next question"}
                <ChevronRight size={18} />
              </button>
            </nav>
            <p className="workspace-note">
              Choose your response before moving on, or flag a question to
              return to it.
            </p>
          </section>
        </main>
      )}
    </div>
  );
}
