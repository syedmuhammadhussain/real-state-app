// src/app/api/payment/success/route.js
import { NextResponse } from "next/server";
import { getPaymentId } from "@/lib/payment-utils";
import { cookies } from "next/headers";

const STRAPI_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;
const NEXT_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const STRAPI_ADMIN_TOKEN = process.env.STRAPI_ADMIN_TOKEN;

async function strapiFetch(
  path,
  { method = "GET", token = STRAPI_TOKEN, body, headers = {} } = {}
) {
  const res = await fetch(`${STRAPI_URL}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
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
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken")?.value;

  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("orderId");
  const userId = searchParams.get("userId");
  const amount = searchParams.get("amount");
  const position = searchParams.get("position");
  const paymentId = await getPaymentId(orderId);
  const positionId = searchParams.get("positionId");
  const productId = searchParams.get("productId");
  const email = searchParams.get("email");
  const type = searchParams.get("type");

  const idempotencyKey =
    paymentId || `order:${orderId}` || `notify:${Date.now()}`;

  if (!orderId) {
    return NextResponse.redirect(
      `${NEXT_BASE_URL}payment/processing?error=missing-order-id`
    );
  }

  if (paymentId) {
    let payload = {
      agent: Number(userId),
      label: `Position ${position} Subscription`,
      position: Number(position),
      paymentId: String(paymentId),
      amount: parseFloat(amount),
      productId: Number(productId),
      positionId: Number(positionId),
    };

    if (type === "Position") {
      // debugger;
      payload.email = email;

      const { status, body } = await strapiFetch(
        `/agent-subscriptions/purchase`,
        {
          method: "POST",
          token: authToken,
          headers: { "Idempotency-Key": idempotencyKey },
          body: { data: payload },
        }
      );

      const subscriptionsId = body?.data?.id || body?.id;

      if ([200, 201].includes(status)) {
        console.log("Subscriptions Created *******, ", subscriptionsId);

        const { status: approveStatus, body: approveJson } = await strapiFetch(
          `/agent-subscriptions/${subscriptionsId}/approve`,
          {
            method: "GET",
            token: STRAPI_ADMIN_TOKEN,
          }
        );

        if ([200, 201].includes(approveStatus)) {
          console.log("Subscriptions Approved *******, ", subscriptionsId);

          // await paymentUpdate("CONFIRMED", paymentId);

          return NextResponse.redirect(
            `${NEXT_BASE_URL}payment/processing?orderId=${encodeURIComponent(
              orderId
            )}&paymentId=${encodeURIComponent(paymentId)}`,
            { status: 302 }
          );
        }

        console.warn("notify: approve failed", { approveStatus, approveJson });
        return NextResponse.json({
          ok: true,
          note: "purchase success, approve failed",
        });
      }

      console.warn("notify: purchase failed", { approveStatus, approveJson });
      return NextResponse.json({
        ok: true,
        note: "purchase failed",
      });
    }

    if (type === "Advertisement") {
      // debugger;
      delete payload.position;
      delete payload.label;

      const { status, body } = await strapiFetch(
        `/agent-subscriptions/advertise`,
        {
          method: "POST",
          token: authToken,
          headers: { "Idempotency-Key": idempotencyKey },
          body: { data: payload },
        }
      );

      const subscriptionsId = body?.data?.id || body?.id;

      if ([200, 201].includes(status)) {
        console.log(
          "Advertisement Subscriptions Created *******, ",
          subscriptionsId
        );

        // await paymentUpdate("CONFIRMED", paymentId);

        return NextResponse.redirect(
          `${NEXT_BASE_URL}payment/processing?orderId=${encodeURIComponent(
            orderId
          )}&paymentId=${encodeURIComponent(paymentId)}`,
          { status: 302 }
        );
      }

      console.warn("notify: advertisement purchase failed", {
        approveStatus,
        approveJson,
      });

      return NextResponse.json({
        ok: true,
        note: "advertisement purchase failed",
      });
    }

    return NextResponse.json({
      ok: true,
      note: "advertisement / purchase failed",
    });
  }
}
