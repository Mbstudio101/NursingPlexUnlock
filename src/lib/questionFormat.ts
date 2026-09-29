import { interactiveQuestions } from "../data/interactiveData";
import type { InteractiveQuestion } from "../InteractiveComponents";

export interface Question {
  number: number;
  text: string;
  choices?: string[];
  type?: string;
  isSATA?: boolean;
  rows?: string[];
  columns?: string[];
  image?: string;
  note?: string;
  isCaseStudy?: boolean;
}
export function configuration(
  examId: string,
  q: Question,
): InteractiveQuestion | undefined {
  if (examId === "rn-hesi-exit-mcphs" && interactiveQuestions[q.number])
    return interactiveQuestions[q.number];
  if (q.type === "numeric") return { type: "numeric" };
  if (q.type === "matrix" && q.rows?.length && q.columns?.length)
    return { type: "matrix", rows: q.rows, columns: q.columns };
  return undefined;
}
export function selectionLimit(q: Question): number | undefined {
  const match = q.text.match(
    /(?:select|choose|highlight|which)\s+(?:the\s+)?(\d+|two|three|four|five)\b/i,
  );
  if (!match) return undefined;
  return (
    Number(match[1]) ||
    ({ two: 2, three: 3, four: 4, five: 5 } as Record<string, number>)[
      match[1].toLowerCase()
    ]
  );
}
export function multiple(q: Question) {
  return (
    !!q.isSATA ||
    /select all|\bsata\b|click to highlight/i.test(q.text) ||
    (selectionLimit(q) ?? 1) > 1
  );
}
export function complete(
  q: Question,
  config: InteractiveQuestion | undefined,
  value: any,
): boolean {
  if (config?.type === "numeric")
    return (
      typeof value === "string" &&
      value.trim() !== "" &&
      Number.isFinite(Number(value))
    );
  if (config?.type === "matrix")
    return (
      !!value &&
      !!config.rows?.length &&
      config.rows.every(
        (_, i) =>
          Number.isInteger(value[i]) &&
          value[i] >= 0 &&
          value[i] < (config.columns?.length ?? 0),
      )
    );
  if (config?.type === "dropdown")
    return (
      !!value &&
      !!config.blanks?.length &&
      config.blanks.every(
        (b, i) =>
          Number.isInteger(value[i]) &&
          value[i] >= 0 &&
          value[i] < b.options.length,
      )
    );
  if (config?.type === "drag-categories")
    return (
      !!value &&
      !!config.categories?.length &&
      config.categories.every((c) => value[c.name]?.length === c.slots)
    );
  if (config?.type === "diagram-click")
    return (
      Number.isInteger(value) &&
      value >= 0 &&
      value < (config.locations?.length ?? 0)
    );
  if (Array.isArray(value)) {
    if (q.type === "ordering") return value.length === q.choices?.length;
    const limit = selectionLimit(q);
    return limit ? value.length === limit : value.length > 0;
  }
  return false;
}
export function answerLabel(
  q: Question,
  config: InteractiveQuestion | undefined,
  value: any,
): string {
  if (value == null || value === "") return "Not answered";
  if (config?.type === "numeric") return `${value} ${config.unit || ""}`.trim();
  if (config?.type === "matrix")
    return config
      .rows!.map(
        (r, i) => `${r}: ${config.columns![value[i]] ?? "Not selected"}`,
      )
      .join("\n");
  if (config?.type === "dropdown")
    return config
      .blanks!.map(
        (b, i) =>
          `${b.before} ${b.options[value[i]] ?? "Not selected"} ${b.after}`,
      )
      .join(" ");
  if (config?.type === "drag-categories")
    return config
      .categories!.map(
        (c) =>
          `${c.name}: ${(value[c.name] || []).join(", ") || "Not selected"}`,
      )
      .join("\n");
  if (config?.type === "diagram-click")
    return config.locations?.[value]?.label ?? "Not answered";
  if (Array.isArray(value))
    return (
      value
        .map(
          (i) =>
            config?.segments?.[i]?.text ??
            config?.findings?.[i] ??
            `${String.fromCharCode(65 + i)}. ${q.choices?.[i] ?? ""}`,
        )
        .join("\n") || "Not answered"
    );
  return "Not answered";
}
