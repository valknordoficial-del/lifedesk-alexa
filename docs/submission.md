# Devpost submission draft

## Project name
LifeDesk

## Tagline
A simulated Alexa+ agent that turns confusing documents into transparent, human-approved action plans.

## Inspiration
Important documents often fail at the last mile. A person can read a letter and still not know what to do, what the deadline is, what should happen first, or how to respond. Most document assistants stop at a summary. LifeDesk continues from understanding to accountable action.

## What it does
LifeDesk turns a document into a multi-step workflow: extracted facts and deadlines, a plain-language explanation, an ordered plan, an editable response draft (retained for the current tab session), suggested reminders, and an audit trail connecting source evidence to each action. The hackathon demo is a clearly labelled simulated Alexa+ experience and uses synthetic examples so no judge needs to share private data.

## How we built it
The prototype uses a deterministic seven-stage workflow controller. It does not call an LLM, parse arbitrary documents, or connect to real Alexa. Each stage preserves the document context and feeds the next stage. The public implementation provides deterministic sample documents to keep the judge experience reliable while making the agentic sequence explicit. The UX separates source facts, generated inferences and proposed actions so the user can understand why LifeDesk made each suggestion.

## Challenges
The biggest design challenge was balancing agent autonomy with trust. High-stakes documents should not trigger hidden external actions. LifeDesk therefore proposes drafts and reminders and keeps the user in control. Another challenge was showing an Alexa+-style agentic experience without gated Alexa+ preview tooling; the project follows the official simulated-experience path.

## Accomplishments
- End-to-end multi-step agentic workflow
- Three synthetic document contexts
- Automated judge demo
- Source → inference → action audit trail
- Mobile-responsive public demo
- No account, private upload or API key required for evaluation
- Safety and professional-advice boundaries surfaced in the UI

## What we learned
Agent value appears after summarisation. The important moment is when the assistant keeps context, sequences dependent actions and explains why each one exists. Trust improves when the system visibly separates facts from inferences and proposes before executing.

## What's next
A production version would add OCR/document parsing, authenticated email/calendar integrations, consent gates, encrypted retention controls, configurable action policies and explicit human approval before any external side effect.

## Live demo
https://lifedesk-alexa.floot.app

## Repository
https://github.com/valknordoficial-del/lifedesk-alexa

## Primary track
Alexa+ — simulated experience (alternate path). No AWS mini-challenge is claimed.

## Testing instructions
Run the static app as described in README.md. Select each of the three synthetic samples and press Next step six times. Inspect facts, explanation, plan, response, suggested reminders and the audit trail. Edit the response at Draft, then advance or switch samples and return: edits remain for the tab session. Reset returns to Read. The guided demo advances all seven stages automatically.

## Submission status
Written materials prepared. A functioning demonstration must be recorded and uploaded publicly to YouTube or Vimeo, and its exact URL added to Devpost. No video URL or submitted-entry confirmation is available yet.
