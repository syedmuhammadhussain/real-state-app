// src/lib/payment-utils.js
import crypto from "crypto";
const STRAPI_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const STRAPI_TOKEN = process.env.STRAPI_ADMIN_TOKEN;

/**
 * Safe raw body parsing — read text once and try JSON, urlencoded, fallback
 */
export async function parseRequestBody(req) {
  const raw = await req.text();
  const headers = Object.fromEntries(req.headers.entries());
  const ct = (headers["content-type"] || "").toLowerCase();

  if (!raw || raw.trim() === "") return { parsed: null, raw, headers };

  const trimmed = raw.trim();
  if (
    ct.includes("application/json") ||
    trimmed.startsWith("{") ||
    trimmed.startsWith("[")
  ) {
    try {
      return { parsed: JSON.parse(raw), raw, headers };
    } catch (err) {
      // fallthrough to try urlencoded
      console.warn("parseRequestBody: JSON.parse failed, falling back", err);
    }
  }

  if (ct.includes("application/x-www-form-urlencoded") || raw.includes("=")) {
    try {
      const params = new URLSearchParams(raw);
      return { parsed: Object.fromEntries(params.entries()), raw, headers };
    } catch (err) {
      console.warn("parseRequestBody: urlencoded parse failed", err);
    }
  }

  // fallback
  return { parsed: { __rawText: raw }, raw, headers };
}

/**
 * Compute token/hash per provider requirements (example).
 * Adapt to your provider's actual token/signature rules.
 */
export function computeTokenForPayload(payload, password) {
  const entries = Object.entries(payload)
    .filter(([k, v]) => v !== undefined && v !== null && typeof v !== "object")
    .map(([k, v]) => [k, String(v)]);
  entries.push(["Password", password]);
  entries.sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));
  const concat = entries.map(([_, v]) => v).join("");
  const hash = crypto.createHash("sha256").update(concat, "utf8").digest("hex");
  return { token: hash, concat };
}

export function computeToken(payload, password) {
  const entries = Object.entries(payload)
    .filter(([k, v]) => v !== undefined && v !== null && typeof v !== "object")
    .map(([k, v]) => [k, String(v)]);

  entries.push(["Password", password]);
  entries.sort((a, b) => a[0].localeCompare(b[0]));

  const concat = entries.map(([_, v]) => v).join("");
  const hash = crypto.createHash("sha256").update(concat, "utf8").digest("hex");

  return { token: hash, concat };
}

/**
 * Provider status check.
 * This makes a server-to-provider request to get the latest payment status.
 * You must adapt URL/payload/Token according to Tbank docs.
 */
export async function checkProviderStatus({ orderId, paymentId }) {
  try {
    const STATUS_URL =
      process.env.TBANK_STATUS_ENDPOINT || process.env.TBANK_GETSTATE_ENDPOINT;
    const TERMINAL_KEY = process.env.TBANK_TERMINAL_KEY;
    const PASSWORD = process.env.TBANK_PASSWORD;

    if (!STATUS_URL || !TERMINAL_KEY || !PASSWORD) {
      return { status: "UNKNOWN", raw: { error: "provider config missing" } };
    }

    const payload = {
      TerminalKey: TERMINAL_KEY,
      ...(paymentId ? { PaymentId: paymentId } : { OrderId: orderId }),
    };

    const { token } = computeToken(payload, PASSWORD);
    payload.Token = token;

    const res = await fetch(STATUS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const json = await res.json().catch(() => ({ rawText: "invalid json" }));
    const bank = json?.bankResponse || json || {};

    if (
      bank?.Success === true ||
      ["CONFIRMED", "PAID", "AUTHORIZED"].includes(bank?.Status)
    ) {
      return { status: "CONFIRMED", raw: bank };
    }
    if (
      bank?.Success === false ||
      ["DECLINED", "CANCELLED", "FAILED"].includes(bank?.Status)
    ) {
      return { status: "FAILED", raw: bank };
    }
    return { status: "PENDING", raw: bank };
  } catch (err) {
    console.error("checkProviderStatus error:", err);
    return { status: "UNKNOWN", raw: { error: String(err) } };
  }
}

/**
 * Signature verification stub — implement per Tbank docs.
 * For now returns true (accepts everything). Replace with HMAC/Token check.
 */
export async function verifySignature(payload, headers) {
  // Example pattern:
  // const signature = headers["x-tbank-signature"];
  // compute hmac(body, secret) and compare.
  return true;
}

export async function getPaymentId(orderId) {
  const respons = await fetch(
    `${STRAPI_URL}/payments?filters[orderId][$eq]=${orderId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  const json = await respons.json().catch(() => null);
  return json?.data?.[0]?.paymentId || null;
}
