# NursingPlex Study Workspace

A responsive React and Vite nursing exam practice app. The home screen lists the seven exam sets that are actually present in the repository.

## Run

```sh
npm ci
npm run dev
```

## Verify

```sh
npm run typecheck
npm test
npm run build
```

Deploy the generated `dist` directory using a static host. The build command is `npm run build`.

## Practice features

- Exam-specific multiple-choice, select-all-that-apply, select-N, numeric, matrix, highlighting, dropdown, category assignment and ordering controls where the required question data exists.
- Answer selection starts empty. Ordering questions record the sequence in which options are selected.
- Per-exam progress, responses, flags, position and elapsed time are saved in this browser using versioned local storage.
- Pause/resume, question navigation and completion filters.
- Self-review shows responses for both standard and interactive questions. Restart requires confirmation.
- Accessible keyboard controls and responsive desktop/mobile layouts.

## Content limitations

There are **483 question records across seven exams**, not the 503 claimed by the old metadata. ATI Med-Surg contains 83 records (previously advertised as 97); ATI Pharmacology contains 64 (previously advertised as 70). Original question content and numbering have been preserved.

The supplied bank has no answer keys. The app therefore reports completion rather than inventing grades or rationales. Some questions lack answer options, clinical exhibits, or images; these are shown as incomplete and can be flagged. External images may be unavailable. Text-based location choices are explicitly labeled as text alternatives, not actual diagram hotspots.

Progress is local to the browser and origin, not synchronized to an account. Clearing browser data removes it. A visible warning is shown if local storage fails.

## Validation of this update

- TypeScript typecheck and production build.
- 15 automated regression checks for format isolation, select-N, matrix/dropdown completion, zero-valued numeric responses, ordering and review summaries.
- DOM interaction smoke test: all 483 question screens across seven exams render; single-choice selection, SATA, reload restoration, pause/resume, completion review and exam-specific controls pass.
- Full browser visual/mobile verification was unavailable in the execution environment; responsive styling has not been visually certified.
