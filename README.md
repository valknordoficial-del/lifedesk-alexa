# LifeDesk — simulated Alexa+ agentic document-to-action assistant

**Live demo:** https://valknordoficial-del.github.io/lifedesk-alexa/

LifeDesk is a prototype for the **Amazon Build, Ship, Shape Developer Hackathon 2026 — Alexa+ track**. It demonstrates a simulated Alexa+ experience that turns a confusing document into a transparent sequence of actions rather than stopping at a summary.

## What it does

A user selects a synthetic sample document and LifeDesk coordinates a multi-step workflow:

1. Read document context
2. Extract facts and deadlines
3. Explain the document in plain language
4. Create an ordered action plan
5. Draft an editable response
6. Propose reminders
7. Show an audit trail linking source facts → inference → action

## Why it is agentic

LifeDesk keeps context across dependent steps and uses one stage to determine the next. It is intentionally more than single-turn Q&A. The user remains in control: drafts and reminders are proposed rather than silently executed.

## Alexa+ simulation

This submission is clearly labelled as a **simulated Alexa+ experience**. The core voice-oriented request is:

> “Alexa, what do I need to do about this letter?”

The prototype demonstrates orchestration and interaction design. A production implementation could connect the same action graph to document parsing, calendars, email and other authenticated tools.

## Privacy and safety

- All built-in samples are fictional and contain no personal data.
- No real document is required for judging.
- Extracted facts and generated inferences are visibly separated.
- LifeDesk does **not** provide legal, financial, medical or professional advice.
- External actions would require explicit user approval in production.

## Run locally

No build step is required. Open `index.html` in a browser, or serve the folder with any static web server.

## Repository map

- `index.html` — complete judge-facing interface
- `app.js` — multi-step agentic simulation logic
- `styles.css` — responsive UI
- `docs/submission.md` — Devpost submission draft
- `docs/friction-log.md` — product/developer feedback
- `docs/video-script.md` — demo video script under 3 minutes
- `LICENSE` — MIT license

## 3-minute judge flow

Open the live demo and choose **Run guided judge demo**. Watch the sequence advance through extraction, explanation, planning, drafting, reminders and auditability. Then switch sample documents to see the same workflow adapt to a different context.

## Status

Technical prototype; the English demo video is publicly hosted on YouTube. Submission is not complete until the Devpost entry is submitted. GitHub Pages serves this repository revision. Source files, English submission materials and workflow tests are published.

## Reproducible testing

Use Node.js 18 or later and run `node --test tests/workflow.test.cjs`. No npm packages are required.
For a local web preview run `python3 -m http.server 8080`, then open http://localhost:8080.

## Honest scope

This is a deterministic interaction simulation, not an LLM document parser, live Alexa integration, or MCP server. Facts, plans and response templates are predefined per sample. The seven-stage controller retains context and advances the workflow; it does not infer new plans from arbitrary uploads. Draft edits persist across stages and sample switches within the current tab, and reset on reload. Reminders are suggestions only. The clock is fixed at 4 October 2026 for reproducibility. No emails, calendar events, or reminders are actually sent or scheduled.

## Submission route

Alexa+ **simulated experience**, under the alternate path in the official rules:
https://amazonappdev2026.devpost.com/rules
No gated Alexa SDK or MCP conformance is claimed.

Repository: https://github.com/valknordoficial-del/lifedesk-alexa

## Verified release

All 11 source and documentation files were verified against GitHub blob hashes after upload. The three workflow tests passed; all three contexts and tab-session draft persistence were also checked on the published site. An English demo video was assembled from live browser captures (128 seconds, on-screen captions, no audio). Public video: https://www.youtube.com/watch?v=m-URkrDUMeg&feature=youtu.be. Published on October 4, 2026; YouTube completed its initial checks without finding problems.
