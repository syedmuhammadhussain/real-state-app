"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function PaymentProcessingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const orderId =
    searchParams.get("orderId") ||
    searchParams.get("OrderID") ||
    searchParams.get("OrderId");

  let initialPaymentId =
    searchParams.get("paymentId") ||
    searchParams.get("PaymentId") ||
    searchParams.get("PaymentID") ||
    null;

  const [loading, setLoading] = useState(true);
  const [statusText, setStatusText] = useState(
    "Waiting for payment confirmation..."
  );
  const attemptsRef = useRef(0);
  const redirectedRef = useRef(false);
  const isFetchingRef = useRef(false);
  const cancelledRef = useRef(false);
  const controllerRef = useRef(null);

  const backoffRef = useRef(2000); // ms
  const BACKOFF_MAX = 60000;
  const BACKOFF_MULT = 2;

  const resetBackoff = () => {
    backoffRef.current = 2000;
  };

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      setStatusText("Missing orderId — cannot poll status.");
      return;
    }

    let paymentId = initialPaymentId;

    cancelledRef.current = false;
    redirectedRef.current = false;
    attemptsRef.current = 0;
    resetBackoff();

    const buildUrl = (pid) => {
      const params = new URLSearchParams();
      if (orderId) params.set("orderId", orderId);
      if (pid) params.set("paymentId", pid);
      return `/api/payment/status?${params.toString()}`;
    };

    const scheduleNext = (ms) => {
      if (cancelledRef.current || redirectedRef.current) return;
      setTimeout(() => {
        poll(paymentId);
      }, ms);
    };

    const poll = async (pid) => {
      if (cancelledRef.current || redirectedRef.current) return;

      // If we don't yet have paymentId client-side, we still call status without it
      // server will respond with 202 and tell us to back off
      if (isFetchingRef.current) return;
      isFetchingRef.current = true;

      if (controllerRef.current) {
        try {
          controllerRef.current.abort();
        } catch (e) {}
      }
      const controller = new AbortController();
      controllerRef.current = controller;

      try {
        // debugger;
        const url = buildUrl(pid);
        const res = await fetch(url, {
          cache: "no-store",
          signal: controller.signal,
        });

        // handle throttle / missing-paymentId
        if (res.status === 202) {
          // server says missing paymentId (or not ready) -- backoff
          const json = await res.json().catch(() => ({ message: "pending" }));
          setStatusText(
            json.message || "Waiting for provider to send paymentId..."
          );
          // exponential backoff
          const next = Math.min(backoffRef.current * BACKOFF_MULT, BACKOFF_MAX);
          backoffRef.current = next;
          console.log(
            "processing: server told missing paymentId -> backing off",
            { orderId, nextMs: next }
          );
          scheduleNext(next);
          return;
        }

        if (res.status === 429) {
          const retryAfter =
            Number(res.headers.get("Retry-After")) ||
            Math.ceil(backoffRef.current / 1000);
          const waitMs = Math.max(1000, retryAfter * 1000);
          setStatusText("Too many requests — slowing down polling.");
          backoffRef.current = Math.min(
            backoffRef.current * BACKOFF_MULT,
            BACKOFF_MAX
          );
          scheduleNext(waitMs);
          return;
        }

        if (!res.ok) {
          // server error — increment attempts and try again with modest backoff
          attemptsRef.current += 1;
          setStatusText("Temporary error checking payment. Retrying...");
          const next = Math.min(backoffRef.current * BACKOFF_MULT, BACKOFF_MAX);
          backoffRef.current = next;
          scheduleNext(next);
          return;
        }

        const json = await res.json();
        // provider result may be at json.provider.raw or json.provider
        const provider = json?.provider || json;
        const bank = provider?.raw || provider;

        const finalSuccess =
          bank?.Success === true ||
          ["CONFIRMED", "PAID", "AUTHORIZED"].includes(bank?.Status);
        const finalFail =
          bank?.Success === false ||
          ["DECLINED", "CANCELLED", "FAILED"].includes(bank?.Status);

        if (finalSuccess && !redirectedRef.current) {
          redirectedRef.current = true;
          const params = new URLSearchParams();
          if (bank?.PaymentId) params.set("PaymentId", bank.PaymentId);
          params.set("OrderId", bank?.OrderId || orderId);
          if (bank?.Amount)
            params.set("Amount", bank.Amount?.toString?.() || "");
          router.replace(`/payment/success?${params.toString()}`);
          return;
        }

        if (finalFail && !redirectedRef.current) {
          redirectedRef.current = true;
          const params = new URLSearchParams();
          if (bank?.PaymentId) params.set("PaymentId", bank.PaymentId);
          params.set("OrderId", bank?.OrderId || orderId);
          if (bank?.Message) params.set("Message", bank.Message);
          router.replace(`/payment/fail?${params.toString()}`);
          return;
        }

        // still pending -> reset backoff to low value for normal polling cadence
        backoffRef.current = 2000;
        attemptsRef.current += 1;
        setStatusText(
          `Payment is pending — checked ${attemptsRef.current} times`
        );
        scheduleNext(backoffRef.current);
      } catch (err) {
        if (err.name === "AbortError") {
          console.debug("processing: fetch aborted");
        } else {
          console.error("processing: polling error", err);
          attemptsRef.current += 1;
          const next = Math.min(backoffRef.current * BACKOFF_MULT, BACKOFF_MAX);
          backoffRef.current = next;
          setStatusText("Network error while checking payment. Retrying...");
          scheduleNext(next);
        }
      } finally {
        isFetchingRef.current = false;
      }
    };

    // start first poll quickly (0ms) so we check immediately
    setTimeout(() => poll(paymentId), 0);

    return () => {
      cancelledRef.current = true;
      redirectedRef.current = true;
      if (controllerRef.current) {
        try {
          controllerRef.current.abort();
        } catch (e) {}
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="max-w-xl w-full bg-white rounded-lg shadow-lg p-6 text-center border border-gray-200">
        <h1 className="text-2xl font-semibold mb-4">Payment processing</h1>
        <p className="text-sm text-gray-600 mb-6">{statusText}</p>

        {loading ? (
          <div className="flex items-center justify-center gap-3">
            <svg
              className="w-6 h-6 animate-spin text-gray-500"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                strokeOpacity="0.25"
              />
              <path
                d="M22 12a10 10 0 00-10-10"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-sm text-gray-700">
              Checking payment status…
            </span>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-gray-700">
              If the payment completes later, refresh this page or check your
              Orders page.
            </p>
            <div className="flex justify-center gap-3">
              <button
                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                onClick={() => {
                  resetBackoff();
                  window.location.reload();
                }}
              >
                Retry now
              </button>
              <a
                className="px-4 py-2 border rounded hover:bg-gray-100"
                href="/"
              >
                Back to home
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
