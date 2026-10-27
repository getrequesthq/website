---
name: getrequest-webhooks
description: Receive third-party webhooks (Stripe, GitHub, Shopify, etc.) through getrequest so they are acknowledged instantly, verified, logged, and retried until the backend accepts them. Use when a developer is losing webhooks during deploys or outages, needs to inspect webhook payloads, or must verify webhook signatures such as Stripe-Signature or X-Hub-Signature-256 through getrequest.
---

# Capture and deliver webhooks with getrequest

Webhook providers want a fast `2xx` and retry on their own schedule if they do not get one. A getrequest **Async API** endpoint answers the provider immediately and takes responsibility for delivering to your backend.

## Setup

1. In https://app.getrequest.io create an endpoint with method `POST`, action **Async API**, and your webhook handler as the **Destination URL**.
2. Register the endpoint URL (`https://e.getrequest.io/<endpoint-id>`) as the webhook URL in the provider's dashboard.
3. Configure signature verification (below).

The provider receives `202 {"status":"Success","request_id":"<uuid>"}` straight away. getrequest then delivers to your backend with up to 6 attempts over about 36 minutes (immediate, 15s, 60s, 5m, 15m, 15m). Any `2xx` marks the delivery as `delivered`. After the last attempt it is marked `failed` and can be replayed manually on paid plans (Pro, Gro).

Each attempt re-reads the endpoint's current destination and credentials, so fixing the handler or rotating a secret mid-retry takes effect on the next attempt.

## Signature verification: choose where it happens

getrequest forwards only allow-listed headers and headers starting with `X-`:

| Provider header | Reaches your backend? | Where to verify |
|---|---|---|
| `X-Hub-Signature-256` (GitHub) | Yes | Your handler, or getrequest |
| `X-Shopify-Hmac-Sha256` | Yes | Your handler, or getrequest |
| `Stripe-Signature` | **No**, it is stripped | **getrequest only** |

To verify in getrequest, set the endpoint's **Authentication** to `HMAC` and fill in:

- **Header Key**: the provider's signature header
- **Signing Secret**: the provider's webhook secret
- **Advanced**: algorithm (`SHA-256`/`SHA-1`), encoding (`Base64`/`Hex`), and prefix (e.g. `sha256=`)

The HMAC is computed over the raw request body with a constant-time compare. Invalid or missing signatures get `401` and never reach the backend, but they are still logged so probing is auditable.

Without Authentication, anyone holding the endpoint URL can push arbitrary payloads to the backend. Always configure one of the two verification paths.

## Proving the request came from getrequest

Set **Destination Authentication** (Bearer, API Key, Basic, or an HMAC signature on the outbound body) so the backend can reject traffic that did not pass through getrequest.

## Limits

- Async bodies: 200 KiB for text/JSON. Binary payloads travel base64-encoded, so keep them under about 180 KiB. Larger binary bodies can fail to enqueue **after** the `202`, and that failure is silent.
- Destination timeout: 10s per attempt.
- A destination that resolves to a private or internal address is blocked and not retried.

## Inspecting deliveries

Open **Logs** and click a request to see the original headers and body exactly as the provider sent them, plus every delivery attempt (status, duration, error). `delivery_status` is one of `retrying`, `delivered`, or `failed`.

Docs: https://docs.getrequest.io/guides/capture-webhooks · https://docs.getrequest.io/guides/async-api
