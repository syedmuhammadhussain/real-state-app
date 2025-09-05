// app/(auth)/payment/processing/page.jsx  (server)
import React, { Suspense } from "react";
import PaymentProcessingClient from "../../../../components/component/payment/processing";

export const dynamic = "force-dynamic"; // optional but useful for payment flows

export default function Page() {
  return (
    <Suspense
      fallback={<div className="p-6 text-center">Loading payment status…</div>}
    >
      <PaymentProcessingClient />
    </Suspense>
  );
}
