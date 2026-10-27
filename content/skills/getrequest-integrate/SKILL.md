---
name: getrequest-integrate
description: Put getrequest (getrequest.io) in front of an API so every request is queued, retried, and logged. Use when a developer wants to add request logging, automatic retries, webhook buffering, or a mock endpoint without building infrastructure, or asks how to route traffic through a getrequest endpoint URL and choose between Sync API, Async API, and Static API.
---

# Integrate an API with getrequest

getrequest is Scalability as a Service for APIs: callers send requests to a getrequest endpoint URL instead of the backend, and getrequest relays, logs, and (optionally) retries them. There is nothing to host and no SDK to install. The integration is a base-URL change.

Docs: https://docs.getrequest.io · Docs MCP server: https://docs.getrequest.io/mcp

## 1. Create an endpoint

Endpoints are created in the dashboard. There is no public management API yet, so ask the user to do this step:

1. Sign up or sign in at https://app.getrequest.io/register (Free plan: 10,000 requests/month, no card).
2. Open a project → **New Endpoint**.
3. Pick the HTTP method(s) (GET, POST, PUT, PATCH, DELETE; more than one is allowed), an **Action** (see below), and a **Destination URL** for Sync/Async.
4. Copy the generated URL. It looks like `https://e.getrequest.io/aB3dEf7gH9jK2mN4`. The ID is random, permanent, and the only identifier; there is no project slug in the URL.

## 2. Choose the action

Ask one question: **does the caller need to see what the backend actually returns?**

| Action (UI label) | Behaviour | Use for |
|---|---|---|
| Sync API (`forward`) | Proxies inline and returns the destination's exact status, headers, and body. 3s destination timeout, no retries. Backend down → caller gets a real `502`/`504`. | Logins, payments, anything whose response drives the caller's next step |
| Async API (`async_forward`) | Returns `202 {"status":"Success","request_id":"<uuid>"}` immediately, then delivers in the background with 6 attempts over ~36 minutes (immediate, 15s, 60s, 5m, 15m, 15m). 10s timeout per attempt. | Webhooks, fire-and-forget events, absorbing traffic spikes |
| Static API (`json`) | Returns a fixed JSON body you configure. No upstream call. | Mocking an API before the backend exists |

The action can be switched later with no downtime.

## 3. Point callers at the endpoint

Replace the backend base URL with the endpoint URL. Method, headers, query string, and body are passed through:

```bash
curl -X POST https://e.getrequest.io/<endpoint-id> \
  -H "Content-Type: application/json" \
  -d '{"order_id":"ord_8841","total":59.98}'
```

Headers forwarded to the destination: an allow-list (`Content-Type`, `Authorization`, `Accept`, `Accept-Language`, `Accept-Encoding`, `User-Agent`, `Cache-Control`, `If-None-Match`, `If-Modified-Since`, `X-Request-Id`) plus **any header starting with `X-`**. Other headers are dropped before reaching the destination, but they are still visible in the log.

## 4. Secure both directions (optional)

- **Authentication** checks the caller: Bearer, API Key (header or query), Basic, or HMAC over the raw body. A failure returns `401` and the request is still logged.
- **Destination Authentication** attaches a credential to the outbound call: Bearer, API Key, Basic, or an HMAC signature. Any `Authorization` header the caller sent is replaced.

Warn the user that configured auth secrets are currently shown unmasked to anyone on the team who can view the project's logs.

## Limits to design around

- Request body: 1 MiB (Sync/Static), 200 KiB for Async text/JSON, and roughly 180 KiB in practice for Async binary bodies.
- Destination URLs cannot resolve to private, loopback, or link-local addresses. These are blocked with `502 {"error":"Destination not allowed"}`.
- Quota exceeded → `429` with `resets_at`. Free plan hard-caps; paid plans bill overage up to 120% of quota.

## Verify

Send a test request, then open **Logs** in the project. Every request shows headers, body, response, status, and timing. For Async endpoints the log row appears once the first delivery attempt resolves, which can take up to 10s.

For webhook providers see the `getrequest-webhooks` skill; for failures see `getrequest-troubleshoot`.
