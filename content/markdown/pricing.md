# getrequest pricing: pay for requests, not infrastructure

Start free, scale as your traffic grows. getrequest is priced by requests, with no seat fees and no infrastructure to run, and every plan logs every request. There are four plans (free, dev, pro, gro); the free plan includes 10,000 requests a month with a hard cap, and every paid plan includes transparent, pay-as-you-go overage capped at 120% of the plan's quota.

## Plans: Scale as your traffic grows.

### free: $0/mo

Every request logged, at zero cost. For side projects, early integrations, and prototypes.

- 10,000 requests / month
- 7-day log retention
- Live request inspector
- Instant endpoints (mock + forward)
- Smart forwarding
- Async delivery with auto-retry
- Endpoint & destination auth
- Usage dashboard

Hard capped at quota, no overage charges.

[Get started for free](https://app.getrequest.io/register)

### dev: $29/mo

For real workloads: 30-day log retention and 10× the request volume of Free.

- 100,000 requests / month
- 30-day log retention
- Everything in free
- Overage instead of a hard cap (up to 120%)
- Priority support

Then $2.90 per 10,000 extra requests.

[Get started for free](https://app.getrequest.io/register)

### pro: $99/mo (featured)

Adds request replay, bulk retry, and shareable debug links for production teams.

- 1,000,000 requests / month
- 30-day log retention
- Everything in Dev
- Request replay (Pro feature)
- Bulk retry (Pro feature)
- Shareable debug links (Pro feature)
- Team access (coming soon)

Then $1.90 per 10,000 extra requests.

[Get started for free](https://app.getrequest.io/register)

### gro: $399/mo

Everything in Pro, with 5× the request volume for teams running production traffic at scale.

- 5,000,000 requests / month
- 30-day log retention
- Everything in Pro
- Lowest per-request overage rate

Then $0.90 per 10,000 extra requests.

[Get started for free](https://app.getrequest.io/register)

## Compare plans: Everything side by side.

| Feature | free | dev | pro | gro |
| --- | --- | --- | --- | --- |
| Price | $0/mo | $29/mo | $99/mo | $399/mo |
| Monthly requests | 10,000 | 100,000 | 1,000,000 | 5,000,000 |
| Overage beyond quota | — (hard cap) | $2.90 / 10,000 | $1.90 / 10,000 | $0.90 / 10,000 |
| Log retention | 7 days | 30 days | 30 days | 30 days |
| Live inspector | ✓ | ✓ | ✓ | ✓ |
| Instant endpoints | ✓ | ✓ | ✓ | ✓ |
| Smart forwarding | ✓ | ✓ | ✓ | ✓ |
| Async delivery + auto-retry | ✓ | ✓ | ✓ | ✓ |
| Endpoint & destination auth | ✓ | ✓ | ✓ | ✓ |
| JSON mock responses | ✓ | ✓ | ✓ | ✓ |
| Usage dashboard | ✓ | ✓ | ✓ | ✓ |
| Request replay | — | — | ✓ | ✓ |
| Bulk retry | — | — | ✓ | ✓ |
| Shareable debug links | — | — | ✓ | ✓ |

## Common questions

### What counts as a request?

Any HTTP call that passes through a getrequest endpoint URL is counted as one request. Requests that return mock JSON and requests that are forwarded to an upstream are counted equally.

### Can I upgrade or downgrade anytime?

Yes. Plan changes take effect immediately. If you upgrade mid-cycle, you're charged the prorated difference. If you downgrade, the change takes effect at the start of your next billing cycle.

### What happens when I go over my plan's request quota?

On Free, requests past 10,000 are blocked with a 429 until the cycle resets or you upgrade. Blocked requests are still logged, so you can see what was affected. On Dev, Pro, and Gro, overage is billed automatically per 10,000 extra requests.

### Is overage capped, or can my bill spike unexpectedly?

Overage on Dev, Pro, and Gro is capped at 120% of your plan's quota. Once you hit that cap, we stop billing extra for the rest of the cycle — a traffic spike can't produce a surprise bill. Upgrade anytime for a higher included quota.

### Is there a free trial for Pro?

The free plan gives you full access to core features indefinitely, including async delivery and endpoint authentication. Pro features (request replay, bulk retry, shareable debug links) require a paid plan. Contact us if you need a trial.

### Do you offer annual billing?

Annual billing with a 20% discount is available on request. Contact support (support@getrequest.io) to set it up.

### If I delete an endpoint or project, do I lose its request history?

No — if an endpoint or project has ever captured a request, deleting it removes it from your active list but keeps its historical logs fully searchable for the rest of your plan's retention window. An endpoint or project that never captured a single request is removed completely, since there's no history to preserve.

### Will a burst of retries to one slow destination affect my other endpoints?

No. Outbound deliveries reuse a capped, shared connection pool per destination instead of opening a new connection for every attempt. A pile-up against one slow or unresponsive destination stays contained and can't starve the resources your other endpoints or the log pipeline depend on.

## Setup in minutes. Scale to millions.

No infrastructure to build, no code changes, no ops overhead. Start free and you're live in under 2 minutes.

[Get started](https://app.getrequest.io/register)

## Links

- Docs: https://docs.getrequest.io
- Sign up: https://app.getrequest.io/register
- Pricing: https://www.getrequest.io/pricing.md
- Features: https://www.getrequest.io/features.md
- llms.txt: https://www.getrequest.io/llms.txt
- Contact: support@getrequest.io
