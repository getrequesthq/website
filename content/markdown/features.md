# getrequest features: the infrastructure you'd otherwise build

getrequest sits in front of your API and handles every request: it relays it, retains the full exchange, and lets you recover what failed. This page covers everything that does it: Static, Sync, and Async endpoints, automatic retries, a searchable live request log, replay, bulk retry, shareable debug links, usage metering, and built-in authentication, with nothing to build or host.

- [Start for free](https://app.getrequest.io/register)
- [See pricing](https://www.getrequest.io/pricing.md)

## Relay 01: Instant endpoints

Launch a production-ready API endpoint in under 2 minutes. No server to provision, no deployment pipeline, nothing to host. Define your method and action, and getrequest generates a unique URL and handles the rest.

Every endpoint picks one of three actions: **Static API** for a mock JSON response, **Sync API** to forward and wait for the real reply, or **Async API** to acknowledge instantly and deliver in the background. Switch between them without downtime. The infrastructure layer ships with your first request.

| Action | What it does |
| --- | --- |
| Static API | Fixed JSON response |
| Sync API | Forward & wait |
| Async API | Ack & deliver later |

- Live in under 2 minutes, zero config
- Static, Sync, or Async: pick per endpoint
- No servers to host, no ops overhead
- Edit or delete endpoints at any time

## Retain 01: Live request inspector

Every request's headers, body, status code, and latency, the moment it lands. No log pipeline to build and no instrumentation to add: logging is built into the layer your traffic already passes through.

Whether you're validating a webhook, auditing third-party traffic, or monitoring a live integration, you have a complete picture without writing a single line of logging code.

- Every request logged, including 401s and 429s
- Full headers, body, and response
- Real-time stream, no refresh
- Searchable log history up to 30 days

## Recover 01: Request replay (Pro)

Recover from failures with certainty. Re-fire any captured request with one click, with exact headers, body, and method preserved. Confirm a fix works before it ships. Reproduce production failures locally without reconstructing the context.

Reliability isn't just about preventing failures; it's about recovering fast when they happen. Replay closes the gap between "we got an error report" and "we confirmed the fix."

- Exact original payload, headers, and method
- Fresh response captured for comparison
- Confirm fixes before merging
- Reproduce production failures locally

## Recover 02: Shareable debug links (Pro)

Turn any captured request into a shareable URL that expires after 30 days. Paste it in a Slack message, a Jira ticket, or a PR comment. Anyone with the link sees the full request and response, with no account required. Cross-team incident response, without the overhead.

Incident resolution slows down when context lives in one engineer's terminal. Shareable links make every failure a shared artifact: visible, referenceable, and linkable across your entire org.

- Exact request snapshot, revocable anytime
- Full headers, body, and response visible
- No account required to view
- Works across environments and teams

## Relay 02: Smart forwarding

**Sync API** is a transparent proxy layer for any upstream: no SDK, no agent, no code changes required. getrequest routes traffic to your destination, forwards the request body byte-for-byte, and logs everything. The routing layer you'd otherwise have to build yourself.

Route to staging, production, or third-party APIs. Validate what your system sends against what the upstream receives. The proxy ships with the infrastructure; there's nothing extra to configure.

- Works with any upstream, any HTTP client
- Request body forwarded byte-for-byte
- Full request + response logged
- HTTP and HTTPS supported

## Retain 02: Usage metering

Build a reliability baseline from real traffic data. Track request volume per project, spot usage trends before they become capacity problems, and maintain a full audit trail. Get notified before you hit limits, not after traffic drops.

Reliability starts with measurement. getrequest makes traffic data visible by default: no separate metrics pipeline, no custom dashboards to maintain.

- Real-time usage dashboard, per project
- Pre-limit alerts before incidents happen
- Full audit trail with timestamps
- Capacity planning from real traffic trends

## Relay 03: Async delivery

Acknowledge the caller instantly, deliver to your backend in the background. Built for webhooks and any traffic where the caller shouldn't wait on, or be blocked by, your response.

When a delivery fails, getrequest keeps trying. It retries automatically on a backoff schedule, re-reading your destination and auth config on every attempt, so a fix or a rotated credential takes effect on the very next try.

- Caller gets a 202 immediately, every time
- Up to 6 automatic retry attempts, ~36 minutes
- Live delivery status: retrying, delivered, failed
- Available on every plan, including Free

[See the exact retry schedule and delivery states](https://docs.getrequest.io/guides/async-api)

## Relay 04: Built-in authentication

Require a credential on incoming requests before getrequest processes them, and attach a credential to the outbound call it makes to your backend: two completely independent settings.

Bearer, API Key, Basic Auth, or HMAC signature verification on the way in. The same four options signing or authenticating the call on the way out, reapplied automatically on every retry attempt.

- Verify inbound callers: Bearer, API Key, Basic, HMAC
- Authenticate to your own backend the same way
- Verify webhook provider signatures for you, before your handler runs
- Available on every plan, including Free

## Recover 03: Bulk retry (Pro)

An outage doesn't fail one request; it fails hundreds. Select exactly the rows you want and retry them together, or apply a filter and let getrequest sweep up every matching request as a tracked background job, paced so it never hammers your recovering backend.

Recurring failures are grouped for you automatically on the Retries page (endpoint, status, and error), so recovering from an incident starts with one click, not a manual filter you have to reconstruct every time.

- Manual selection: up to 100 requests, retried instantly
- Filter-based: unbounded size, runs as a cancellable background job
- Paced delivery: 10 requests/sec, won't re-overwhelm your backend
- Auto-grouped recurring failures on the Retries page

## Handle every request. Replay every failure.

Nothing to host, no code to add. Point your traffic at one URL and you're live in minutes.

[Start for free](https://app.getrequest.io/register)

## Links

- Docs: https://docs.getrequest.io
- Sign up: https://app.getrequest.io/register
- Pricing: https://www.getrequest.io/pricing.md
- llms.txt: https://www.getrequest.io/llms.txt
- Contact: support@getrequest.io
