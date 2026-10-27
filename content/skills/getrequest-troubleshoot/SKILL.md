---
name: getrequest-troubleshoot
description: Diagnose responses and failed deliveries from a getrequest endpoint (e.getrequest.io) and recover lost requests with replay or bulk retry. Use when a caller sees 401, 404, 405, 413, 429, 502, or 504 from getrequest, when Async API deliveries show retrying or failed, or when a developer needs to re-send requests after an outage or bad deploy.
---

# Troubleshoot getrequest endpoints

Every getrequest error body is JSON shaped like `{ "error": "<message>" }`. The one exception is `429`, which adds a `resets_at` field. Every request, including rejected ones, is logged in the project's **Logs** view at https://app.getrequest.io.

## Status codes returned to the caller

| Status | Meaning | Fix |
|---|---|---|
| `202` | Async API accepted the request for background delivery | Expected; check the delivery status in Logs |
| `401` `Unauthorized` | Endpoint **Authentication** rejected the credential or HMAC signature | Check the header name, secret, and algorithm/encoding/prefix. The request is logged and tagged `source_auth_failed`. |
| `404` `Endpoint not found` | No endpoint has this ID | Copy the URL again from the endpoint page |
| `405` `Method not allowed` | The endpoint exists but this method is not enabled | See the `Allow` response header; enable the method on the endpoint |
| `413` | Body too large: 1 MiB for Sync/Static, 200 KiB for Async | Shrink the payload or switch Async → Sync |
| `429` | Plan quota exceeded | Wait until `resets_at` or upgrade the plan |
| `502` `Missing destination URL` / `Invalid destination URL` | Endpoint configuration problem | Set a valid public destination |
| `502` `Destination not allowed` | Destination resolves to a private, loopback, or link-local address, possibly via DNS or a redirect | Use a publicly routable destination |
| `502` `Upstream request failed` | Sync API: destination unreachable, refused, or DNS failure | Check the backend is up and reachable |
| `502` `Cache unavailable` / `Invalid cache payload` / `Handler error` | getrequest infrastructure error, not your configuration | Retry; contact support@getrequest.io if it persists |
| `504` `Upstream timeout` | Sync API: destination took longer than 3s | Speed up the handler, or use Async API (10s per attempt plus retries) |

Sync API never retries. A `502` or `504` from the backend reaches the caller immediately. That is intentional, because Sync is a transparent proxy.

## Async API deliveries

`delivery_status` moves through `retrying`, then `delivered` or `failed`. A delivery is retried up to 6 attempts over about 36 minutes on timeouts, connection errors, or non-2xx responses. Open the log entry to see every attempt.

Terminal cases that are **not** retried:
- The destination resolves to a private address (`response_status: 502`).
- The endpoint or its project was deleted mid-retry (`error: "Endpoint deleted"`, shown as 410).

If a log entry is missing for an Async request, it is either still on its first attempt (wait up to 10s) or was a binary body over about 180 KiB that failed to enqueue after the `202`.

## Recover requests

Replay requires the Pro or Gro plan.

- **Replay one request**: open Logs, filter by status (e.g. `5xx`) and time range, open the entry, and click **Replay**. getrequest re-sends it with the same method, headers, query, and body to the endpoint's *current* destination and shows the new response.
- **Bulk retry**: select or filter a set of failed requests in Logs and retry them together.
- **Share evidence**: create a public debug link to a single log (valid 30 days, no account needed) to send to a provider or teammate.

Fix the root cause before replaying, or the replay will fail the same way.

Reference: https://docs.getrequest.io/guides/reference · https://docs.getrequest.io/guides/recover-failures · https://docs.getrequest.io/guides/bulk-retry
