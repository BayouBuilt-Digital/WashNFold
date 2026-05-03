---
name: resume
description: Build professional, ATS-optimized resumes that prioritize skills, measurable impact, and modern workplace requirements (2025+ standards). Use when the user asks to write, draft, build, rewrite, tailor, optimize, review, or "ATS-proof" a resume or CV — or supplies work history, education, certifications, or accomplishments and wants them turned into a resume.
---

# Resume

Build a professional, ATS-optimized resume that prioritizes skills, measurable impact, and modern workplace requirements (2025+ standards).

## When to use

Trigger on any of: "write/build/draft/rewrite/tailor/optimize/review my resume", "ATS-friendly resume", "make this resume better", or when the user pastes work history, education, certifications, projects, or accomplishments expecting a resume back.

## Inputs to gather

Before drafting, confirm you have these. If anything is missing, ask once — in a single batched question — then proceed.

1. **Target role** (job title + 2–3 lines from the job description, if available). Without it, you cannot tailor keywords.
2. **Work history** — job titles, companies, locations, dates (Month YYYY).
3. **Education** — degree, institution, graduation date (or expected).
4. **Certifications** — name, issuer, date (omit if none).
5. **Key projects or accomplishments** — even rough notes; you will quantify them.
6. **Contact info** — name, city/state (no street address), phone, professional email, LinkedIn, portfolio/GitHub if relevant.

If the user has not given numbers, ask: "For each role, what's one outcome you can put a number on? (%, $, time saved, volume, headcount, ratings.)" Drafting without metrics produces a weak resume — do not skip this.

## Workflow

1. **Intake** — confirm inputs above; ask the batched gap-filling question if needed.
2. **Extract keywords** — pull 10–15 must-have terms from the target job description (skills, tools, certifications, methodologies). Mirror their exact phrasing.
3. **Draft** — follow the structure and rules below.
4. **Self-review** — run the checklist in `references/anti-patterns.md` before delivering.
5. **Deliver** — clean, copy-ready plain text. No commentary. No explanations. Resume only.

## Required structure (in this order)

```
NAME
City, ST | Phone | email@domain.com | linkedin.com/in/handle | portfolio-or-github

PROFESSIONAL SUMMARY
[3–4 lines. Role identity + years + 2–3 power skills + one quantified accomplishment.]

CORE SKILLS
[Grouped categories — see "Skills categorization" below.]

PROFESSIONAL EXPERIENCE
Job Title — Company, City, ST
Month YYYY – Month YYYY
- Action + Task + Result bullet
- Action + Task + Result bullet
- (3–6 bullets per role; most recent role gets the most.)

PROJECTS  (include only if relevant — strongly recommended for early-career, career changers, or technical roles)
Project Name — Stack/Context
- Action + Task + Result bullet

EDUCATION
Degree, Major — Institution, City, ST | Month YYYY
[Honors, GPA only if ≥3.5 and < 5 years out.]

CERTIFICATIONS / TOOLS
- Cert Name — Issuer, YYYY
- Tools: [comma-separated list]
```

## Skills categorization

Group the Core Skills section into **2–5 labeled categories** drawn from this taxonomy. Pick the categories that match the target role; do not force all of them.

- **Technical Skills** — tools, systems, software, languages, platforms
- **Business / Operational Skills** — project management, P&L, vendor management, SOPs, scheduling
- **Data & Analytics Skills** — SQL, Excel/Sheets, Tableau/Power BI, A/B testing, forecasting, KPIs
- **Customer Experience / Communication Skills** — client onboarding, stakeholder comms, presenting, technical writing, conflict resolution
- **Leadership / Process Improvement Skills** — team leadership, mentoring, Lean/Six Sigma, change management, automation

Format each category on one line: `Category: skill, skill, skill, skill`. Keep each category to 4–8 items. No skill bars, ratings, or graphics.

## Bullet point rules

**Format: Action + Task + Result.**

- Start every bullet with a strong past-tense action verb (present tense for current role only). See `references/action-verbs.md`.
- Include a measurable outcome in every bullet you possibly can: %, $, time saved, volume, ratings, headcount, cycle time, error rate.
- One to two lines, ~20–25 words max.
- Focus on **impact**, not responsibilities. "Responsible for X" is banned.
- No first-person pronouns. No articles where they're optional ("Led 6-person team" not "Led a 6-person team").
- Mirror keyword phrasing from the target job description where it's truthful.

**Themes to emphasize across bullets** (modern hiring signals):

- Process improvement and efficiency gains
- Cross-functional collaboration
- Data-driven decision-making
- Customer impact / outcomes
- Automation, AI tooling, or systems modernization

If a bullet has no number, ask: can I add a denominator (out of how many?), a frequency (per week/month?), a comparison (vs. prior baseline?), or a scope (team size, budget, user count)? If yes, add it. If genuinely no, lead with the strongest qualitative outcome (won award, adopted org-wide, became standard process).

See `references/bullet-examples.md` for before/after rewrites.

## Professional summary formula

3–4 lines. No "results-driven hardworking team player" filler.

- **Line 1:** Role identity + years of experience + domain.
- **Line 2:** 2–3 power skills or technical proficiencies that match the target role.
- **Line 3–4:** One specific, quantified accomplishment that proves Line 2.

For career-changers or new grads with <2 years experience, write a **targeted objective** instead: one line on the role you want, one line on the transferable skills you bring, one line on a concrete proof point.

## ATS hard rules (non-negotiable)

These come from how Workday, Greenhouse, Lever, iCIMS, and Taleo actually parse resumes. Breaking them gets the resume silently rejected before a human sees it.

- **Single-column layout.** No tables. No text boxes. No multi-column.
- **Standard section headers** exactly: `PROFESSIONAL SUMMARY`, `CORE SKILLS`, `PROFESSIONAL EXPERIENCE`, `PROJECTS`, `EDUCATION`, `CERTIFICATIONS`.
- **Reverse-chronological** work history.
- **Standard fonts** only: Arial, Calibri, Helvetica, Garamond, Georgia, Times New Roman. Body 10–12pt, headers 12–14pt, name 14–18pt.
- **Margins** 0.75–1 inch.
- **Contact info in body text, not headers/footers.** Header/footer text is invisible to many parsers.
- **Dates as `Month YYYY – Month YYYY`** (or `– Present`). No "2021-23".
- **No icons, images, photos, logos, skill bars, charts, or shading.**
- **Bullets** = standard `•` or `-`. No emoji, no Wingdings.
- **One page** for <10 years experience; **two pages** maximum.
- **File format**: `.docx` is the safest default for Workday/Taleo/iCIMS; `.pdf` is acceptable for Lever/Greenhouse if the user requests it.
- **No headshots.** US/UK/CA convention; standard everywhere except specific EU/Asia markets.

For platform-specific parser quirks see `references/ats-rules.md`.

## Tone and style

- Concise, professional, results-oriented.
- No fluff, no vague claims, no clichés. Banned phrases: "hardworking," "team player," "results-driven," "detail-oriented," "go-getter," "dynamic," "synergy," "self-starter," "passionate about," "responsible for," "duties included," "proven track record," "thinks outside the box."
- Active voice. Past tense for prior roles, present tense for current role only.
- US English unless the user specifies otherwise.

## Customization

- Tailor every resume to one specific target role. A generic resume is the #1 recruiter red flag.
- Mirror keyword phrasing from the job description (skills, tools, certifications, methodologies) wherever it's truthful.
- Reorder Core Skills and bullets so the most role-relevant items come first.
- If the user asks for multiple versions for different roles, produce them as separate, fully tailored drafts — not one resume with everything crammed in.

## Output format

- Plain text, copy-ready.
- Consistent bullet character throughout (`-` is safest).
- One blank line between sections; no blank lines between header and first bullet of a role.
- **No explanations, no preamble, no commentary, no notes at the end.** Resume only.
- If the user explicitly asks for a critique or change-log, deliver the resume first, then a separate "Notes" block below.

## Self-review checklist (run before delivering)

1. Every bullet starts with an action verb.
2. ≥70% of bullets contain a number.
3. No banned clichés (see Tone section).
4. Section headers exactly match the standard names above.
5. Single column, no tables/images/icons/columns.
6. Dates formatted `Month YYYY – Month YYYY`.
7. Contact line is in the body, not a header/footer.
8. Keyword density: 10–15 must-have terms from the JD appear in the resume in their original phrasing.
9. Length: ≤1 page for <10 years experience, ≤2 pages otherwise.
10. Tailored to the target role — Core Skills and top bullets visibly map to the JD.

## Reference files

Load these only when needed:

- `references/ats-rules.md` — platform-specific parser behavior (Workday, Greenhouse, Lever, iCIMS, Taleo).
- `references/action-verbs.md` — categorized verb bank.
- `references/bullet-examples.md` — before/after bullet rewrites.
- `references/anti-patterns.md` — full list of what to avoid + rejection triggers.
- `templates/resume.md` — canonical template skeleton ready to fill in.
