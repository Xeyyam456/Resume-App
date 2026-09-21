# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```
npm run dev       # start Vite dev server
npm run build     # production build to dist/
npm run preview   # preview the production build locally
```

There is no test suite and no lint script configured in this repo (no ESLint config, no test runner). Verify changes with `npm run build` (it will fail on JSX/import errors) and manual checking in the dev server.

## Architecture

Single-page CV/resume builder: React 18 + Vite, no TypeScript (JS + `jsconfig.json` for editor path-intellisense), no router, no external state management. Deployed as a static SPA (see `vercel.json`).

**Path alias**: `@/` maps to `src/` (defined in both `vite.config.js` and `jsconfig.json`). Always import via `@/...`, not relative `../../` paths.

**Single source of truth**: all resume data lives in one `resumeData` object (`personal`, `summary`, `experience`, `education`, `skills`, `projects`), owned by the `useResumeData` hook (`src/hooks/useResumeData.js`). `App.jsx` calls this hook and is purely presentational — it renders the header/tabs and passes `resumeData` + a `handlers` object down to `ResumeForm` and `ResumePreview`. Don't add state to `App.jsx`; extend the hook instead.

**Generic list CRUD**: `experience`, `education`, `skills`, and `projects` are all arrays of `{ id, ...fields }` managed by three generic functions in `useResumeData` — `addItem`, `updateItem`, `removeItem` — parameterized by the state key. Each section's empty-item shape lives in `src/utils/resumeData.js` (`ITEM_TEMPLATES`). To add a new repeatable section, add a template there and wire three one-line handlers in the hook — don't write bespoke add/update/remove logic per section.

**Folder layout**:
- `src/shared/components/` — generic presentational building blocks used by the form side (`Button`, `FormInput`, `FormTextarea`, `FormSelect`, `SectionCard`, `EntryCard`). These know nothing about resume data.
- `src/components/form/` — left-panel editing sections (`PersonalInfoSection`, `SummarySection`, `ExperienceSection`, `EducationSection`, `SkillsSection`, `ProjectsSection`), composed by `ResumeForm`. Each receives only the data/handlers it needs.
- `src/components/preview/` — generic preview *infrastructure*, not any one CV's look: `ResumePreview` (the print/download toolbar + the `#cv-document` page frame that renders whichever template is selected) and `TemplatePicker` (the thumbnail gallery for switching templates). Neither knows what a specific template looks like.
- `src/templates/` — one folder per selectable CV design, each fully self-contained (its own `<Name>Template.jsx` + `.module.css`, no shared layout CSS between templates so each can look completely different). `src/templates/index.js` is the registry (`TEMPLATES` array of `{ id, name, description, Component }`) that `ResumePreview`/`TemplatePicker` read from — add a new design by creating a folder here and adding one entry to that array. The `sidebar` template additionally splits into `CVSidebar.jsx`/`CVMain.jsx` sub-files (still local to `templates/sidebar/`, not shared with other templates).
- `src/hooks/` — `useResumeData` (state + handlers, see above).
- `src/utils/` — pure helpers and constants shared across components and templates: `validation.js` (field validation rules), `formatDate.js` (`YYYY-MM` → `"Mon YYYY"`), `initials.js` (avatar initials), `constants.js` (`SKILL_LEVELS` — the single source for the skill dropdown options and every template's 1-5 skill rank; keep these derived from one array rather than duplicating level names per template), `resumeData.js` (`INITIAL_RESUME_DATA`, `ITEM_TEMPLATES`).

**Component file convention**: each component is a folder with `ComponentName.jsx`, `ComponentName.module.css`, and an `index.jsx` barrel (`export { default } from './ComponentName'`) so consumers import the folder, e.g. `@/shared/components/Button`. Templates under `src/templates/` are the exception — flat files, no barrel, imported directly by `templates/index.js`.

**Templates**: which design renders is UI-only state (`templateId`, alongside `activeTab`) held directly in `App.jsx` and passed down to `ResumePreview` — it is not part of `resumeData`. Every template receives the exact same `resumeData` prop and is free to render it however it wants (different section groupings, different icon choices, different color tokens); there is no shared "template contract" beyond that single prop.

**Validation**: `FormInput` takes a `validate` prop — an array of rule names (e.g. `['required', 'email']`) — and runs `utils/validation.js`'s `validate(value, ruleNames)` on blur. Rules are declared per-field in the section components (e.g. `PersonalInfoSection.jsx`), not centrally.

**Printing/PDF**: `ResumePreview` triggers `window.print()`; the print-only layout (hiding the header/form panel, showing only `#cv-document`) is done via `@media print` rules in `App.css`.

**IDs**: new list items get `crypto.randomUUID()` (native, no uuid package).
