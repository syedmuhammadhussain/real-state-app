// src/app/api/payment/status/route.js
import { NextResponse } from "next/server";
import { checkProviderStatus } from "@/lib/payment-utils";
import { getPaymentId } from "@/lib/payment-utils";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("orderId");
    const paymentId = searchParams.get("paymentId");

    if (!orderId && !paymentId) {
      return NextResponse.json(
        { error: "missing orderId/paymentId" },
        { status: 400 }
      );
    }

    // If paymentId missing, try memory-store lookup
    if (!paymentId && orderId) paymentId = await getPaymentId(orderId);

    // We have paymentId — call provider for current state
    console.log("status: calling provider with paymentId", {
      orderId,
      paymentId,
    });
    
    const provider = await checkProviderStatus({ orderId, paymentId });

    // Optionally update last poll time so we still throttle heavy client retries
    // setLastPollTime(orderId, Date.now());

    return NextResponse.json({ ok: true, from: "provider", provider });
  } catch (err) {
    console.error("status route error", err);
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 500 }
    );
  }
}
