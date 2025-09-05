import { NextResponse } from "next/server";
import { computeTokenForPayload } from "@/lib/payment-utils";
import { cookies } from "next/headers";
import crypto from "crypto";

const base = process.env.NEXT_PUBLIC_BASE_URL;
const STRAPI_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST(req) {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken")?.value;

  const correlationId =
    crypto.randomUUID?.() || crypto.randomBytes(12).toString("hex");
  try {
    const body = await req.json();
    const orderId = body.orderId;
    const amount = body.amount;
    const positionId = body.positionId;
    const userId = body.userId;
    const position = body.position;
    const productId = body.productId;
    const email = body.email;
    const type = body.type;
    if (!orderId || !amount || !positionId) {
      return NextResponse.json(
        { error: "Missing amount, orderId or positionId" },
        { status: 400 }
      );
    }

    if (type === "Position") {
      // check position is not occupied by some other agent
      const positionResponse = await fetch(
        `${STRAPI_URL}/positions?filters[id][$eq]=${positionId}`,
        {
          method: "GET",
          headers: {},
        }
      );
      const positionJson = await positionResponse.json().catch(() => null);
      if (positionJson?.data?.length > 0 && positionJson.data[0]?.is_booked) {
        return NextResponse.json(
          {
            error: "Position already occupied by some other agency please wait",
          },
          { status: 400 }
        );
      }
    }

    const SuccessURL = `${base}api/payment/success?orderId=${encodeURIComponent(
      orderId
    )}&userId=${encodeURIComponent(userId)}&position=${encodeURIComponent(
      position
    )}&positionId=${encodeURIComponent(positionId)}&amount=${encodeURIComponent(
      amount
    )}&productId=${encodeURIComponent(productId)}&email=${encodeURIComponent(
      email
    )}&type=${encodeURIComponent(type)}`;
    const FailURL = `${base}api/payment/fail?orderId=${encodeURIComponent(
      orderId
    )}&userId=${encodeURIComponent(userId)}&position=${encodeURIComponent(
      position
    )}&positionId=${encodeURIComponent(positionId)}&amount=${encodeURIComponent(
      amount
    )}&productId=${encodeURIComponent(productId)}&email=${encodeURIComponent(
      email
    )}&type=${encodeURIComponent(type)}`;

    const TERMINAL_KEY = process.env.NEXT_PUBLIC_TBANK_TERMINAL_KEY;
    const PASSWORD = process.env.NEXT_PUBLIC_TBANK_PASSWORD;
    const INIT_URL = process.env.NEXT_PUBLIC_TBANK_INIT_ENDPOINT;

    if (!TERMINAL_KEY || !PASSWORD) {
      return NextResponse.json(
        { error: "Server not configured" },
        { status: 500 }
      );
    }

    const initPayload = {
      TerminalKey: TERMINAL_KEY,
      Amount: amount * 100,
      OrderId: orderId,
      SuccessURL,
      FailURL,
      // NotificationURL,
      DATA: { ...(body.data || {}), orderId, correlationId },
    };

    const { token } = computeTokenForPayload(initPayload, PASSWORD);
    initPayload.Token = token;

    console.log("init: creating pending order (no-db demo)", {
      orderId,
      amount,
      correlationId,
      initPayload,
    });

    const res = await fetch(INIT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(initPayload),
    });

    const json = await res
      .json()
      .catch(() => ({ raw: "invalid json from provider" }));

    const bank = json?.bankResponse || json || {};
    const paymentId =
      bank?.PaymentId ||
      bank?.paymentId ||
      bank?.PaymentID ||
      bank?.Payment_Id ||
      (bank?.Data && (bank.Data?.PaymentId || bank.Data?.paymentId));

    if (paymentId) {
      try {
        // IMPORTANT: create pending payment record in Strapi
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/payments`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({
              data: {
                orderId: String(orderId),
                paymentId: String(paymentId),
                payment_status: bank?.Status || "NEW",
                amount: bank?.Amount / 100 || 0,
                users_permissions_user: userId,
                position: positionId,
              },
            }),
          }
        );

        const json = await response
          .json()
          .catch(() => ({ raw: "invalid json from strapi" }));

        console.log(json);

        // setPaymentIdForOrder(orderId, paymentId);
        console.log("init: saved paymentId into memory-store", {
          orderId,
          paymentId,
        });
      } catch (err) {
        console.warn("init: failed to write memory-store", err);
      }
    } else {
      console.log(
        "init: provider didn't return PaymentId in init response (bank response):",
        bank
      );
    }

    console.log("init: provider response (forwarding to client):", json);
    return NextResponse.json(
      { bankResponse: json },
      { status: res.status || 200 }
    );
  } catch (err) {
    console.error("init error:", err);
    return NextResponse.json(
      { error: "Internal server error", detail: String(err) },
      { status: 500 }
    );
  }
}
