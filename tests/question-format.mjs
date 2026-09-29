import assert from "node:assert/strict";
import { build } from "esbuild";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
const dir = await mkdtemp(join(tmpdir(), "nursing-test-"));
try {
  const output = join(dir, "format.mjs");
  await build({
    entryPoints: ["src/lib/questionFormat.ts"],
    bundle: true,
    platform: "node",
    format: "esm",
    outfile: output,
  });
  const { configuration, multiple, selectionLimit, complete, answerLabel } =
    await import(pathToFileURL(output));
  const q = {
    number: 4,
    text: "Choose an answer",
    choices: ["First", "Second"],
  };
  assert.equal(
    configuration("rn-ati-fundamentals-2026", q),
    undefined,
    "HESI controls must not leak to other exams",
  );
  assert.equal(configuration("rn-hesi-exit-mcphs", q).type, "highlight-text");
  assert.equal(multiple({ ...q, isSATA: true }), true);
  assert.equal(
    multiple({ ...q, text: "Which 2 statements require further education?" }),
    true,
  );
  assert.equal(
    selectionLimit({ ...q, text: "Select the 3 interventions." }),
    3,
  );
  const matrix = { type: "matrix", rows: ["a", "b"], columns: ["Yes", "No"] };
  assert.equal(
    complete(q, matrix, { 0: 0 }),
    false,
    "Partial matrix cannot count as completed",
  );
  assert.equal(complete(q, matrix, { 0: 0, 1: 1 }), true);
  const dropdown = {
    type: "dropdown",
    blanks: [{ before: "", after: "", options: ["a"] }],
  };
  assert.equal(
    complete(q, dropdown, { 0: -1 }),
    false,
    "Dropdown placeholder is unanswered",
  );
  assert.equal(complete(q, { type: "numeric" }, "0"), true);
  assert.equal(complete(q, { type: "numeric" }, ""), false);
  assert.equal(complete(q, { type: "numeric" }, "invalid"), false);
  assert.equal(
    complete({ ...q, text: "Select 2 answers" }, undefined, [0]),
    false,
  );
  assert.equal(complete({ ...q, type: "ordering" }, undefined, [1]), false);
  assert.equal(complete({ ...q, type: "ordering" }, undefined, [1, 0]), true);
  assert.match(answerLabel(q, matrix, { 0: 0, 1: 1 }), /b: No/);
  console.log("15 question-format regression checks passed.");
} finally {
  await rm(dir, { recursive: true, force: true });
}
