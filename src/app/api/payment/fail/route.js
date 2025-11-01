// src/app/api/payment/fail/route.js
import { NextResponse } from "next/server";
import { getPaymentId } from "@/lib/payment-utils";

const STRAPI_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const STRAPI_ADMIN_TOKEN = process.env.STRAPI_ADMIN_TOKEN;
const NEXT_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

/**
 * Generic wrapper for Strapi requests. Expects `path` to start with `/api/...`
 */
// safe strapiFetch (drop into your fail route file, replacing old function)
async function strapiFetch(
  path,
  { method = "GET", token = STRAPI_ADMIN_TOKEN, body, headers = {} } = {}
) {
  // debugger
  try {
    // Normalize base (remove trailing slash)
    const base = String(STRAPI_URL || "").replace(/\/$/, "");

    // Normalize incoming path (ensure it starts with a slash)
    let normalizedPath = String(path || "").startsWith("/") ? path : `/${path}`;

    // If base already ends with "/api" and path also starts with "/api", remove duplicate prefix from path
    if (base.endsWith("/api") && normalizedPath.startsWith("/api")) {
      normalizedPath = normalizedPath.replace(/^\/api/, "");
    }

    // If path does NOT start with /api and base does NOT include /api, but you want API prefix, you can
    // optionally add it here. For now we keep as-is so function respects your env.
    const url = `${base}${normalizedPath}`;

    console.log("strapiFetch ->", { method, url, tokenPreview: token ? `${String(token).slice(0,10)}...` : null });

    const opts = {
      method,
      headers: {
        ...headers,
        // only set Authorization if token present
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    if (body && ["POST", "PUT", "PATCH"].includes(method.toUpperCase())) {
      opts.body = JSON.stringify(body);
    }

    const res = await fetch(url, opts);
    const text = await res.text().catch(() => null);

    let json = null;
    try {
      json = text ? JSON.parse(text) : null;
    } catch (e) {
      json = { raw: text };
    }

    return { status: res.status, body: json };
  } catch (err) {
    console.error("strapiFetch ERROR:", err && err.message ? err.message : err, err);
    throw err;
  }
}


export async function GET(req) {
  // debugger
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("orderId");
    const reason =
      searchParams.get("reason") || searchParams.get("message") || "failed";

    if (!orderId) {
      return NextResponse.redirect(
        `${NEXT_BASE_URL}payment/failed?error=missing-order-id`,
        { status: 302 }
      );
    }

    // Resolve paymentId via your helper (gateway id)
    const paymentId = await getPaymentId(orderId);

    if (!paymentId) {
      console.warn("No paymentId resolved for orderId:", orderId);
    } else {
      try {
        // Find Strapi document id by filtering the payments collection on paymentId
        // Adjust collection name if your collection is named differently (e.g. /api/payment-records)
        const { status: listStatus, body: listBody } = await strapiFetch(
          `/payments?filters[paymentId][$eq]=${paymentId}`,
          {
            method: "GET",
            token: STRAPI_ADMIN_TOKEN,
          }
        );

        if (
          [200, 201].includes(listStatus) &&
          listBody?.data &&
          listBody.data.length > 0
        ) {
          const docId = listBody.data[0].documentId;
          if (docId) {
            // Update the document by document id (required in Strapi v5)
            const payload = {
              data: {
                payment_status: "FAILED",
              },
            };

            const { status: updateStatus, body: updateBody } =
              await strapiFetch(`/payments/${docId}`, {
                method: "PUT",
                token: STRAPI_ADMIN_TOKEN,
                body: payload,
              });

            if (![200, 201].includes(updateStatus)) {
              console.warn("Failed to update payment document to FAILED", {
                docId,
                updateStatus,
                updateBody,
              });
            } else {
              console.log("Payment document marked FAILED:", {
                docId,
                paymentId,
              });
            }
          } else {
            console.warn(
              "No document id found in Strapi response for paymentId:",
              paymentId
            );
          }
        } else {
          console.warn(
            "No Strapi payment document found for paymentId:",
            paymentId,
            { listStatus, listBody }
          );
        }
      } catch (err) {
        console.warn(
          "Error while querying/updating Strapi payment document (non-fatal):",
          err
        );
      }
    }

    // Redirect user to your front-end fail page
    const redirectUrl = new URL(`${NEXT_BASE_URL}payment/fail`);
    redirectUrl.searchParams.set("orderId", orderId);
    if (paymentId) redirectUrl.searchParams.set("paymentId", paymentId);
    if (reason) redirectUrl.searchParams.set("reason", reason);

    return NextResponse.redirect(redirectUrl.toString(), { status: 302 });
  } catch (err) {
    console.error("Error in payment fail route:", err);
    return NextResponse.redirect(
      `${NEXT_BASE_URL}payment/failed?error=internal`,
      { status: 302 }
    );
  }
}
