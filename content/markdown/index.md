# getrequest: Scalability as a Service for your API

Setup in minutes. Scale to millions. Put getrequest in front of your API and skip building the infrastructure: queuing, automatic retries, and a full request log, ready for millions of requests. Each endpoint gets a plain HTTP URL with one of three actions (Static API, Sync API, or Async API), and every request that passes through it is logged so you can inspect it and replay what failed.

- [Start for free](https://app.getrequest.io/register) (Free plan · 10,000 requests/month · no card)
- [Documentation](https://docs.getrequest.io)

## Product facts

| Fact | Detail |
| --- | --- |
| < 2 min | From signup to your first logged request |
| 6 attempts | [Per async delivery, over about 36 minutes](https://docs.getrequest.io/guides/async-api) |
| 4 auth types | [Bearer, API key, Basic, HMAC, both directions](https://docs.getrequest.io/guides/authentication) |
| 7–30 days | [Searchable log retention, by plan](https://www.getrequest.io/pricing.md) |

## How it works: Handle every request. Replay every failure.

Relay, Retain, Recover is what happens to every request that reaches a getrequest endpoint. Here is a single checkout call living through a bad deploy.

### 01 Relay: Point callers at one URL. Everything else passes through.

Each endpoint gets a URL like `e.getrequest.io/aB3dEf7gH9jK2mN4`. Sync API forwards the request to your destination and hands back its exact status, headers, and body. Async API answers 202 immediately and delivers in the background. Static API returns a JSON body you define.

- Body forwarded unchanged
- Your real response returned on Sync
- Switch actions without redeploying

The caller got your API's exact 201. The exchange is logged either way.

### 02 Retain: When your API fails, the request is still on record.

A bad deploy starts throwing. A Sync caller gets a real 502 or 504, not a fake 200, and the full request is logged with its headers, body, response, and timing. An Async delivery keeps retrying on a fixed schedule: 15s, 60s, 5m, 15m, 15m.

- Headers, body, status, timing
- Searchable for 7 to 30 days
- Failures are logged, not swallowed

The caller received the 502. The request is kept with everything needed to send it again.

### 03 Recover: Fix the deploy. Replay what it missed.

Replay re-sends the exact original request to the endpoint's destination. The result is stored next to the original, which stays untouched. After a wide outage, bulk retry takes a hand-picked selection of up to 100, or sweeps a whole filtered set at a steady 10 requests per second.

- Original payload, original headers
- Original record preserved
- Replay and bulk retry on Pro and Gro

Replayed after the fix. The replay result sits next to the original 502, which is never overwritten.

## The product: What you open when something breaks.

These are the screens you use during an incident: endpoint auth, the log, the full exchange, replay, auto-retry, and bulk retry.

1. **Built-in Auth.** Pick an action, set a destination, require a credential from callers, and attach a different one to the outbound call. No redeploy. A request that fails authentication gets a 401, never reaches your destination, and is still logged.
2. **Inspect.** Every request, the moment it lands. Method, status, endpoint, duration. Filter by any of them, or search headers and bodies.
3. **Request-Response.** The full exchange, side by side. Request headers and body as your caller sent them; response as your destination returned it. Share links expire after 30 days and can be revoked.
4. **Replay.** Re-send the exact original to the endpoint's destination. The new response is stored next to the original, which is never modified. Pro and Gro. The original record stays exactly as captured. Replays are manual, limited to 20 per minute, and work on Sync and Async endpoints.
5. **Auto-retry.** Async API answers 202 and delivers in the background: up to 6 attempts over about 36 minutes, 10 seconds each. Every attempt is recorded. A 202 means the request was accepted for delivery, not that it was delivered. If all 6 attempts fail, `delivery_status` becomes `failed` and the request waits for a manual replay.
6. **Bulk Retry.** The Retries page groups the last 7 days of failures by endpoint, status, and error. Retry a whole group, or hand-pick up to 100. Pro and Gro. Filter-based jobs run at 10 requests per second, so the recovery doesn't knock your API over again.

## Quickstart: One URL. One request. Under two minutes.

Create an endpoint in the dashboard, copy its URL, and send it anything. There is no SDK to install and nothing to deploy. Your callers change one base URL.

1. Create an endpoint and choose an action
2. Send a request to its unique URL
3. Open Logs and inspect the full exchange

Example request:

```bash
curl -X POST https://e.getrequest.io/aB3dEf7gH9jK2mN4 \
  -H "Content-Type: application/json" \
  -d '{
    "order_id": "ord_8841",
    "items": [{ "sku": "SKU-123", "qty": 2 }],
    "total": 59.98
  }'
```

### Sync API

Forwards to your destination and returns its exact response. No automatic retries. ([Guide](https://docs.getrequest.io/quickstart))

```
HTTP/2 200
{
  "json": {
    "order_id": "ord_8841",
    "items": [{ "sku": "SKU-123", "qty": 2 }],
    "total": 59.98
  },
  "url": "https://postman-echo.com/post"
}
```

Destination: postman-echo.com/post, which echoes your payload back unchanged.

### Async API

Responds 202 right away and delivers in the background: up to 6 attempts over 36 minutes. ([Guide](https://docs.getrequest.io/guides/async-api))

```
HTTP/2 202
{ "status": "Success", "request_id": "3f9c1e2a-…" }
```

202 means accepted for delivery. Track the outcome in Logs: retrying, delivered, or failed.

### Static API

Returns a mock JSON body you define. ([Guide](https://docs.getrequest.io/guides/api-mocking))

```
HTTP/2 200
{
  "id": "usr_01HXYZ",
  "email": "alice@example.com",
  "plan": "pro",
  "created_at": "2024-01-15T09:00:00Z"
}
```

Switch the action to Sync API later. The URL your callers use stays the same.

## Built for how you ship now: You ship faster with AI tools. Your safety net should keep up.

More of your code is generated, reviewed fast, and deployed the same day. getrequest is a plain HTTP URL, so it works with whatever you or your tools write. No SDK, no framework, no agent integration to set up.

- **Static API: Ship the frontend before the backend.** Your generated UI needs an API today. Return the exact JSON shape it expects, then switch the action to Sync API when the real handler lands. The URL never changes.
- **Inspector: See what the generated client actually sent.** When an assistant writes the integration, the log shows the headers and body that really arrived, not the ones you assumed. Search them to find the malformed field.
- **Authentication: Keep a record of what your agents call.** Put an endpoint in front of the API an agent's tool calls. Every call is logged with its response. Calls with a missing or wrong credential get a 401 and are logged too.
- **Replay: Deploy fast. Recover what the bad deploy dropped.** When a handler breaks in production, failed requests stay on record. Async deliveries keep retrying while you fix it. Then replay the rest, one at a time or in bulk.

## Alternatives: Where getrequest fits.

Each of these tools does part of the job well. getrequest covers sync and async request flows in one place, with nothing to host.

| Capability | Hookdeck | Svix | Ngrok | Build it yourself | getrequest |
| --- | --- | --- | --- | --- | --- |
| Sync request handling | No | No | Yes | Yes (custom) | Yes (no config) |
| Async delivery with retries | Yes | Yes (outbound) | No | Yes (weeks to build) | Yes (built in) |
| Live request inspector | Yes (webhooks only) | Yes (sender-side logs) | Yes (local tunnel) | No | Yes (all traffic) |
| Request replay | Yes | Yes (per message + bulk) | Yes | Yes (custom) | Yes (single + bulk) |
| Mock endpoints | Yes (custom response) | No | No | Yes (custom) | Yes |
| Production-safe (no tunnel) | Yes | Yes | No | Yes | Yes |
| Shareable debug links | No | No | No | No | Yes (30-day links) |

Svix focuses on outbound webhook delivery (sending events to your customers), not inbound request capture, so several rows reflect a different focus rather than a gap. Based on public documentation as of October 2026.

## Pricing: Priced by requests. Every plan logs every one.

| Plan | Price | Requests | Retention | Over quota | Summary |
| --- | --- | --- | --- | --- | --- |
| Free | $0/mo | 10,000 / mo | 7 days | Hard cap (429) | Inspector, all three actions, endpoint auth. |
| Dev | $29/mo | 100,000 / mo | 30 days | $2.90 / 10k | Everything in Free, plus priority support. |
| Pro | $99/mo | 1,000,000 / mo | 30 days | $1.90 / 10k | Adds replay, bulk retry, and share links. |
| Gro | $399/mo | 5,000,000 / mo | 30 days | $0.90 / 10k | Everything in Pro at high volume. |

[Compare all plans](https://www.getrequest.io/pricing.md)

## The next outage is already on someone's calendar.

Have the requests on record when it happens.

- [Start for free](https://app.getrequest.io/register) (Free plan · 10,000 requests/month · no card)
- [Documentation](https://docs.getrequest.io)

## Links

- Docs: https://docs.getrequest.io
- Sign up: https://app.getrequest.io/register
- Pricing: https://www.getrequest.io/pricing.md
- Features: https://www.getrequest.io/features.md
- Use cases: https://www.getrequest.io/use-cases.md
- llms.txt: https://www.getrequest.io/llms.txt
- Contact: support@getrequest.io
