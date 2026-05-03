# ATS parsing rules — platform specifics

How the major resume parsers actually behave. Use to choose file format and avoid formatting that gets resumes silently rejected.

## How parsing works (all platforms)

1. **Extraction** — converts PDF/DOCX to raw text.
2. **Segmentation** — identifies blocks (Contact, Experience, Education) by matching standard header keywords.
3. **Field parsing** — breaks each block into Job Title, Company, Dates, Description.

Non-standard headers (e.g., "My Journey", "Where I've Been") cause segmentation to fail and the parser dumps everything into one bucket.

## Platform notes

### Workday
- ~25% of Fortune 500 use it. Proprietary parser.
- **Prefer `.docx`** — section-extraction accuracy is measurably higher than PDF.
- Strict on standard headers.
- Often re-asks the candidate to retype every field after upload — your resume parses into form fields. Sloppy formatting = sloppy auto-fill = candidate gives up.

### Greenhouse
- ~8,500 customers, mid-market tech standard. Uses third-party parsers (RChilli/Sovren typically).
- Handles simple two-column layouts reasonably (~80% accuracy) but single-column is still safer.
- Recruiter sees a structured profile card, not your raw file.

### Lever
- Strongest PDF parser of the major platforms. PDF is acceptable here.
- Stores parsed profile separately from original file. Recruiter acts on parsed profile first.

### iCIMS
- Used by ~7,000 employers. Older parser; conservative formatting wins.
- Avoid headers/footers entirely — frequently dropped.

### Taleo (Oracle)
- Older but still widely deployed in enterprise/government.
- **`.docx` strongly preferred.** PDF parsing is unreliable.
- Hates anything fancy. Keep it boring.

### SmartRecruiters
- Modern parser. Handles `.docx` and `.pdf` similarly.
- Reverse-chronological format averages 97% extraction accuracy across the major six (vs. 60–70% for functional/skills-first formats).

## Universal rules

- **Single column always.** Two columns only if you know the target ATS handles them, and you have no choice.
- **No headers/footers** for contact info — they are invisible to most parsers.
- **No icons** for phone/email/LinkedIn. Use text labels: `Phone: 555-555-5555` or just put values on one line separated by `|`.
- **No images, photos, logos, charts, skill bars, progress dots, shading, text boxes, or watermarks.**
- **Standard fonts** only (Arial, Calibri, Helvetica, Garamond, Georgia, Times New Roman). Custom fonts may not render and may be replaced with garbage characters.
- **Dates** as `Month YYYY – Month YYYY`. Avoid `2021-23`, `Spring 2022`, season-only dates.
- **Bullet character** — use `-` or `•` consistently. Wingdings/emoji bullets often parse as garbage.
- **Hyperlinks** — fine, but always include the readable URL in plain text too.

## Quick test

Paste the resume into a plain text editor (Notepad / TextEdit). If sections appear out of order, contact info is missing, or bullets collapse into prose, the ATS will choke too. Fix the source file, don't massage the output.

## File format decision tree

| Target ATS | Best format |
|---|---|
| Unknown | `.docx` |
| Workday, Taleo, iCIMS | `.docx` |
| Greenhouse, Lever, SmartRecruiters | `.docx` or `.pdf` |
| Direct email to recruiter | `.pdf` (preserves visual layout) |

When in doubt: `.docx`.
