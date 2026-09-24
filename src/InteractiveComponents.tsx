import { useState } from "react";

// ===== TYPES =====
export interface InteractiveQuestion {
  type:
    | "numeric"
    | "highlight-text"
    | "highlight-findings"
    | "matrix"
    | "dropdown"
    | "diagram-click"
    | "drag-categories";
  // For numeric
  unit?: string;
  hint?: string;
  // For highlight-text
  segments?: { text: string; highlightable: boolean }[];
  // For highlight-findings
  findings?: string[];
  // For matrix
  rows?: string[];
  columns?: string[];
  // For dropdown
  blanks?: { before: string; after: string; options: string[] }[];
  // For diagram-click
  locations?: { label: string; description: string }[];
  diagramDescription?: string;
  // For drag-categories
  categories?: { name: string; slots: number }[];
  items?: string[];
}

// ===== NUMERIC INPUT =====
export function NumericInput({
  question,
  value,
  onChange,
}: {
  question: InteractiveQuestion;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <input
          aria-label="Numeric answer"
          type="number"
          step="any"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter numeric value..."
          className="flex-1 px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white text-lg font-mono placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30"
        />
        {question.unit && (
          <span className="px-3 py-3 rounded-xl bg-gray-800 border border-gray-700 text-gray-400 text-sm font-medium">
            {question.unit}
          </span>
        )}
      </div>
      {question.hint && (
        <p className="text-xs text-gray-500 italic">{question.hint}</p>
      )}
    </div>
  );
}

// ===== HIGHLIGHT TEXT =====
export function HighlightText({
  question,
  value,
  onChange,
}: {
  question: InteractiveQuestion;
  value: number[]; // indices of highlighted segments
  onChange: (val: number[]) => void;
}) {
  const toggle = (idx: number) => {
    if (value.includes(idx)) {
      onChange(value.filter((i) => i !== idx));
    } else {
      onChange([...value, idx]);
    }
  };

  return (
    <div className="space-y-3">
      <p className="text-xs text-gray-500 mb-2">
        Click on the text to highlight relevant findings:
      </p>
      <div className="p-4 rounded-xl bg-gray-800/50 border border-gray-700 leading-relaxed">
        {question.segments?.map((seg, idx) => {
          if (!seg.highlightable) {
            return <span key={idx}>{seg.text}</span>;
          }
          const isHighlighted = value.includes(idx);
          return (
            <button
              type="button"
              aria-pressed={isHighlighted}
              key={idx}
              onClick={() => toggle(idx)}
              className={`cursor-pointer rounded px-1 py-0.5 transition-all ${
                isHighlighted
                  ? "bg-yellow-400/30 text-yellow-200 font-semibold underline decoration-amber-500 decoration-2 underline-offset-2"
                  : "hover:bg-gray-700/50"
              }`}
            >
              {seg.text}
            </button>
          );
        })}
      </div>
      <p className="text-xs text-gray-500">
        {value.length} item{value.length !== 1 ? "s" : ""} highlighted
      </p>
    </div>
  );
}

// ===== HIGHLIGHT FINDINGS =====
export function HighlightFindings({
  question,
  value,
  onChange,
}: {
  question: InteractiveQuestion;
  value: number[];
  onChange: (val: number[]) => void;
}) {
  const toggle = (idx: number) => {
    if (value.includes(idx)) {
      onChange(value.filter((i) => i !== idx));
    } else {
      onChange([...value, idx]);
    }
  };

  return (
    <div className="space-y-3">
      <p className="text-xs text-cyan-400 mb-2">
        Click findings that warrant follow-up / should be highlighted:
      </p>
      <div className="space-y-2">
        {question.findings?.map((finding, idx) => {
          const isHighlighted = value.includes(idx);
          return (
            <button
              key={idx}
              onClick={() => toggle(idx)}
              className={`w-full text-left p-3 rounded-xl border transition-all ${
                isHighlighted
                  ? "bg-yellow-400/10 border-yellow-500/40 ring-1 ring-yellow-500/20"
                  : "bg-gray-800/50 border-gray-700 hover:border-gray-600"
              }`}
            >
              <span
                className={`text-sm ${isHighlighted ? "text-yellow-200 font-semibold" : "text-gray-300"}`}
              >
                {finding}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ===== MATRIX GRID =====
export function MatrixGrid({
  question,
  value,
  onChange,
}: {
  question: InteractiveQuestion;
  value: Record<number, number>; // row index -> column index
  onChange: (val: Record<number, number>) => void;
}) {
  const select = (rowIdx: number, colIdx: number) => {
    onChange({ ...value, [rowIdx]: colIdx });
  };

  return (
    <div className="space-y-3">
      <p className="text-xs text-cyan-400 mb-2">
        For each row, select the matching category. Each row must have one
        selection.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="border border-gray-700 p-2 text-left bg-gray-800 text-gray-400 font-medium text-xs"></th>
              {question.columns?.map((col, ci) => (
                <th
                  key={ci}
                  className="border border-gray-700 p-2 text-center bg-gray-800 text-gray-300 font-medium text-xs min-w-[80px]"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {question.rows?.map((row, ri) => (
              <tr key={ri}>
                <td className="border border-gray-700 p-2 text-gray-300 font-medium text-xs">
                  {row}
                </td>
                {question.columns?.map((_, ci) => {
                  const isSelected = value[ri] === ci;
                  return (
                    <td
                      key={ci}

                      className={`border border-gray-700 p-2 text-center cursor-pointer transition-all ${
                        isSelected
                          ? "bg-emerald-500/20 text-emerald-400 font-bold"
                          : "hover:bg-gray-800"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`matrix-row-${ri}`}
                        aria-label={`${row}: ${question.columns![ci]}`}
                        checked={isSelected}
                        onChange={() => select(ri, ci)}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ===== DROPDOWN FILL =====
export function DropdownFill({
  question,
  value,
  onChange,
}: {
  question: InteractiveQuestion;
  value: Record<number, number>; // blank index -> option index
  onChange: (val: Record<number, number>) => void;
}) {
  return (
    <div className="space-y-4">
      {question.blanks?.map((blank, bi) => (
        <div key={bi} className="space-y-2">
          <p className="text-sm text-gray-300">
            {blank.before}
            <span className="inline-block mx-1">
              <select
                aria-label={`Blank ${bi + 1}`}
                value={value[bi] ?? -1}
                onChange={(e) =>
                  onChange({ ...value, [bi]: parseInt(e.target.value) })
                }
                className="px-3 py-1.5 rounded-lg bg-gray-800 border border-gray-700 text-emerald-400 font-medium text-sm focus:outline-none focus:border-emerald-500/50"
              >
                <option value={-1}>— Select —</option>
                {blank.options.map((opt, oi) => (
                  <option key={oi} value={oi}>
                    {opt}
                  </option>
                ))}
              </select>
            </span>
            {blank.after}
          </p>
        </div>
      ))}
    </div>
  );
}

// ===== DIAGRAM CLICK =====
export function DiagramClick({
  question,
  value,
  onChange,
}: {
  question: InteractiveQuestion;
  value: number | null; // selected location index
  onChange: (val: number | null) => void;
}) {
  return (
    <div className="space-y-3">
      <p className="text-xs text-cyan-400 mb-2">
        Select the location described below (text alternative):
      </p>
      {question.diagramDescription && (
        <p className="text-sm text-gray-400 mb-3 italic">
          {question.diagramDescription}
        </p>
      )}
      <div className="grid grid-cols-2 gap-3">
        {question.locations?.map((loc, idx) => {
          const isSelected = value === idx;
          return (
            <button
              key={idx}
              onClick={() => onChange(isSelected ? null : idx)}
              className={`p-4 rounded-xl border text-left transition-all ${
                isSelected
                  ? "bg-emerald-500/15 border-emerald-500/40 ring-1 ring-emerald-500/30"
                  : "bg-gray-800/50 border-gray-700 hover:border-gray-600"
              }`}
            >
              <div
                className={`text-lg font-bold mb-1 ${isSelected ? "text-emerald-400" : "text-gray-400"}`}
              >
                {loc.label}
              </div>
              <div
                className={`text-xs ${isSelected ? "text-gray-300" : "text-gray-500"}`}
              >
                {loc.description}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ===== DRAG-DROP CATEGORIES =====
export function DragCategories({
  question,
  value,
  onChange,
}: {
  question: InteractiveQuestion;
  value: Record<string, string[]>; // category name -> assigned items
  onChange: (val: Record<string, string[]>) => void;
}) {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  // Get all assigned items
  const assignedItems = new Set(Object.values(value).flat());
  const unassigned =
    question.items?.filter((item) => !assignedItems.has(item)) || [];

  const assignToCategory = (category: string) => {
    if (
      !selectedItem ||
      !question.items?.includes(selectedItem) ||
      assignedItems.has(selectedItem)
    )
      return;
    const capacity =
      question.categories?.find((c) => c.name === category)?.slots ?? 0;
    if ((value[category] || []).length >= capacity) return;
    const current = value[category] || [];
    onChange({ ...value, [category]: [...current, selectedItem] });
    setSelectedItem(null);
  };

  const removeFromCategory = (category: string, item: string) => {
    const current = value[category] || [];
    onChange({ ...value, [category]: current.filter((i) => i !== item) });
  };

  return (
    <div className="space-y-4">
      <p className="text-xs text-cyan-400">
        Click an item below, then click a category to assign it:
      </p>

      {/* Unassigned items pool */}
      <div className="p-3 rounded-xl bg-gray-800/30 border border-gray-700">
        <p className="text-xs text-gray-500 mb-2">Available Items:</p>
        <div className="flex flex-wrap gap-2">
          {unassigned.map((item, idx) => (
            <button
              key={idx}
              onClick={() =>
                setSelectedItem(selectedItem === item ? null : item)
              }
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedItem === item
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : "bg-gray-800 text-gray-300 border border-gray-700 hover:border-gray-600"
              }`}
            >
              {item}
            </button>
          ))}
          {unassigned.length === 0 && (
            <span className="text-xs text-gray-600 italic">
              All items assigned
            </span>
          )}
        </div>
      </div>

      {/* Category buckets */}
      <div className="grid gap-3">
        {question.categories?.map((cat) => (
          <div
            key={cat.name}

            className={`p-3 rounded-xl border transition-all cursor-pointer ${
              selectedItem
                ? "border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10"
                : "border-gray-700 bg-gray-800/30"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <button
                aria-label={`Assign selected item to ${cat.name}`}
                disabled={
                  !selectedItem || (value[cat.name] || []).length >= cat.slots
                }
                onClick={() => assignToCategory(cat.name)}
                className="text-sm font-semibold text-gray-300"
              >
                {cat.name} — Assign
              </button>
              <span className="text-xs text-gray-500">
                {(value[cat.name] || []).length} / {cat.slots}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(value[cat.name] || []).map((item, idx) => (
                <span
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromCategory(cat.name, item);
                  }}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 text-xs border border-emerald-500/20"
                >
                  {item}
                  <button
                    aria-label={`Remove ${item}`}
                    className="text-emerald-400/60 hover:text-red-400"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
