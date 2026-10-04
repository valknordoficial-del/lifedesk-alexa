# Product feedback

## Tools used
Plain HTML, CSS and browser JavaScript provide the simulated Alexa+ interaction and workflow controller. Node.js built-in tests exercise the controller without third-party packages. Python can serve the static assets locally. No Alexa+ preview SDK, AWS runtime service, or MCP library is used; feedback on those untested tools is intentionally omitted.

## What worked well
A dependency-free static build is easy to run and inspect. Synthetic scenarios make testing repeatable. The official alternate simulation route permits demonstrating the interaction without gated Alexa preview tooling.

## What needs work
The simulation cannot validate real Alexa voice or device behaviour. A production version requires a parser, a real inference engine, authenticated tools and explicit consent gates.

## Onboarding
Local setup requires only a browser, or Python for a local server. Gated Alexa tooling was not used; no direct onboarding experience is claimed for it.

## Would we build again?
Yes for this interaction prototype. Real Alexa integration should be evaluated when access is available.

## Actual integration friction
Task: upload the source to an empty public GitHub repository. Expected: the connected integration permits writes. Actual: repository metadata reports push access but the contents API returns HTTP 403, Resource not accessible by integration. Severity: submission blocker. Workaround: use the repository owner's authenticated browser to upload the source. Suggestion: distinguish account-level push permissions from installation-level write access in the integration status. This is GitHub integration feedback, not an Alexa SDK defect.
