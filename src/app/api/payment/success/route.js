// src/app/api/payment/success/route.js
import { NextResponse } from "next/server";
import { getPaymentId } from "@/lib/payment-utils";
import { cookies } from "next/headers";

const STRAPI_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const STRAPI_ADMIN_TOKEN = process.env.STRAPI_ADMIN_TOKEN;
const NEXT_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

async function strapiFetch(
  path,
  { method = "GET", token, body, headers = {} } = {}
) {
  const usedToken = token;
  if (!STRAPI_URL) throw new Error("STRAPI_URL is not configured");
  const url = `${STRAPI_URL}${path}`;
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${usedToken}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const json = await res.json().catch(() => null);
  return { status: res.status, body: json };
}

export async function GET(req) {
  debugger;
  try {
    // Safe debug info
    console.log("[payment/success] invoked", {
      STRAPI_URL_set: !!STRAPI_URL,
      STRAPI_ADMIN_TOKEN_set: !!STRAPI_ADMIN_TOKEN,
      NEXT_BASE_URL: !!NEXT_BASE_URL,
    });

    const cookieStore = await cookies();
    const authToken = cookieStore.get("authToken")?.value;

    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("orderId");
    const userId = searchParams.get("userId");
    const amount = searchParams.get("amount");
    const position = searchParams.get("position");
    const positionId = searchParams.get("positionId");
    const productId = searchParams.get("productId");
    const email = searchParams.get("email");
    const type = searchParams.get("type");

    if (!orderId) {
      return NextResponse.redirect(
        `${NEXT_BASE_URL}payment/processing?error=missing-order-id`
      );
    }

    // Resolve paymentId (your helper may throw; wrap)
    let paymentId;
    try {
      paymentId = await getPaymentId(orderId);
    } catch (err) {
      console.error(
        "[payment/success] getPaymentId error",
        err?.message || err
      );
      // return an informative response
      return NextResponse.json(
        { ok: false, error: "getPaymentId_failed" },
        { status: 500 }
      );
    }

    // Always ensure we return something
    if (!paymentId) {
      console.warn("[payment/success] no paymentId found for order", orderId);
      return NextResponse.json(
        { ok: false, note: "paymentId not found" },
        { status: 202 }
      );
    }

    const idempotencyKey =
      paymentId || `order:${orderId}` || `notify:${Date.now()}`;

    // Build payload
    const payloadBase = {
      agent: Number(userId),
      paymentId: String(paymentId),
      amount: parseFloat(amount),
      productId: Number(productId),
      positionId: Number(positionId),
    };

    if (type === "Position") {
      const payload = {
        ...payloadBase,
        label: `Position ${position} Subscription`,
        position: Number(position),
        email,
      };
      const { status, body } = await strapiFetch(
        `/agent-subscriptions/purchase`,
        {
          method: "POST",
          token: authToken,
          headers: { "Idempotency-Key": idempotencyKey },
          body: { data: payload },
        }
      );

      let subscriptionsId = body?.data?.id || body?.id;
      if ([200, 201].includes(status)) {
        // approve with admin token
        const { status: approveStatus } = await strapiFetch(
          `/agent-subscriptions/${subscriptionsId}/approve`,
          {
            method: "GET",
            token: STRAPI_ADMIN_TOKEN,
          }
        );

        if ([200, 201].includes(approveStatus)) {
          return NextResponse.redirect(
            `${NEXT_BASE_URL}payment/processing?orderId=${encodeURIComponent(
              orderId
            )}&paymentId=${encodeURIComponent(paymentId)}`,
            { status: 302 }
          );
        }

        return NextResponse.json({
          ok: true,
          note: "purchase created, approve failed",
        });
      }

      return NextResponse.json(
        { ok: false, note: "purchase failed", details: body },
        { status: Math.max(400, status) }
      );
    }

    if (type === "Advertisement") {
      const payload = { ...payloadBase }; // advertisement does not need position/label
      console.log("Payload *****: ", payload);
      const { status, body } = await strapiFetch(
        `/agent-subscriptions/advertise`,
        {
          method: "POST",
          token: authToken,
          headers: { "Idempotency-Key": idempotencyKey },
          body: { data: payload },
        }
      );
      console.log("Auth Token ****:::::", authToken);
      console.log("Status *****:::::: ", status);

      // let subscriptionsId = body?.data?.id || body?.id;
      if ([200, 201].includes(status)) {
        return NextResponse.redirect(
          `${NEXT_BASE_URL}payment/processing?orderId=${encodeURIComponent(
            orderId
          )}&paymentId=${encodeURIComponent(paymentId)}`,
          { status: 302 }
        );
      }

      return NextResponse.redirect(`${NEXT_BASE_URL}processing/failed`, {
        status: 302,
      });

      return NextResponse.json(
        { ok: false, note: "advertise purchase failed", details: body },
        { status: Math.max(400, status) }
      );
    }

    // If we reach here, type is unknown — still return a response
    return NextResponse.json(
      { ok: false, note: "unknown purchase type" },
      { status: 400 }
    );
  } catch (err) {
    console.error(
      "[payment/success] UNCAUGHT ERROR:",
      err?.stack || err?.message || err
    );
    return NextResponse.json(
      {
        ok: false,
        error: "internal_server_error",
        message: err?.message || "unknown",
      },
      { status: 500 }
    );
  }
}
