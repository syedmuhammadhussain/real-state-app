// // src/app/api/payment/notify/route.js
// import { NextResponse } from "next/server";
// import { parseRequestBody } from "@/lib/payment-utils";

// const STRAPI_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
// const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;
// const STRAPI_ADMIN_TOKEN = process.env.STRAPI_ADMIN_TOKEN;

// if (!STRAPI_URL || !STRAPI_TOKEN) {
//   console.warn("notify: STRAPI_URL or STRAPI_API_TOKEN not set");
// }

// async function strapiFetch(
//   path,
//   { method = "GET", token = STRAPI_TOKEN, body, headers = {} } = {}
// ) {
//   debugger
//   const res = await fetch(`${STRAPI_URL}${path}`, {
//     method,
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//       Accept: "application/json",
//       ...headers,
//     },
//     ...(body ? { body: JSON.stringify(body) } : {}),
//   });
//   const json = await res.json().catch(() => null);
//   return { status: res.status, body: json };
// }

// function validatePayload(payload, allowedKeys) {
//   const extraKeys = Object.keys(payload).filter(
//     (k) => !allowedKeys.includes(k)
//   );
//   if (extraKeys.length) {
//     throw new Error(`Extra fields not allowed: ${extraKeys.join(", ")}`);
//   }
// }

// export async function POST(req) {
//   debugger
//   let parsed;
//   try {
//     ({ parsed } = await parseRequestBody(req));
//   } catch (err) {
//     console.error("notify: parse error", err);
//     return NextResponse.json({ ok: true, note: "parse error logged" });
//   }

//   if (!parsed) {
//     console.warn(
//       "notify: empty payload acked",
//       new URL(req.url).searchParams.toString()
//     );
//     return NextResponse.json({ ok: true, note: "empty payload" });
//   }

//   const orderId =
//     parsed?.OrderId || parsed?.orderId || parsed?.DATA?.orderId || null;
//   const paymentId =
//     parsed?.PaymentId || parsed?.payment_id || parsed?.paymentId || null;

//   console.log("notify: received", {
//     orderId,
//     paymentId,
//     snippet: JSON.stringify(parsed).slice(0, 400),
//   });

//   try {
//     if (paymentId) {
//       const { status, body } = await strapiFetch(
//         `/agent-subscriptions?filters[payment_id][$eq]=${encodeURIComponent(
//           paymentId
//         )}`
//       );
//       if (status === 200 && body?.data?.length > 0) {
//         console.log("notify: purchase already exists", { paymentId });
//         return NextResponse.json({ ok: true, note: "already processed" });
//       }
//     }

//     if (orderId) {
//       const { status, body } = await strapiFetch(
//         `/payments?filters[orderId][$eq]=${orderId}&filters[users_permissions_user][id][$eq]=21`
//       );
//       if (status === 200 && body?.data?.length > 0) {
//         const attrs = body.data[0] || {};
//         if (["CONFIRMED", "COMPLETED"].includes(attrs.payment_status)) {
//           console.log("notify: order already confirmed", { orderId });
//           return NextResponse.json({
//             ok: true,
//             note: "order already confirmed",
//           });
//         }
//       }
//     }
//   } catch (err) {
//     console.warn(
//       "notify: Strapi check failed, will attempt update anyway",
//       err
//     );
//   }

//   try {
//     debugger
//     const idempotencyKey =
//       paymentId || `order:${orderId}` || `notify:${Date.now()}`;

//     const payload = {
//       agent: 21,
//       label: "Position 1",
//       position: 1,
//       paymentId: String(paymentId),
//       amount: parsed.Amount,
//       productId: 21,
//       positionId: 6,
//       email: "ahmed@joeymed.com",
//     };

//     validatePayload(payload, [
//       "agent",
//       "label",
//       "position",
//       "paymentId",
//       "amount",
//       "productId",
//       "positionId",
//       "email",
//     ]);

//     const { status: purchaseStatus, body: purchaseJson } = await strapiFetch(
//       `/agent-subscriptions/purchase`,
//       {
//         method: "POST",
//         token: STRAPI_ADMIN_TOKEN,
//         headers: { "Idempotency-Key": idempotencyKey },
//         body: { data: payload },
//       }
//     );

//     if ([200, 201].includes(purchaseStatus)) {
//       const subscriptionsId = purchaseJson?.data?.id || purchaseJson?.id;
//       if (!subscriptionsId) {
//         console.warn("notify: purchase succeeded but no ID returned");
//         return NextResponse.json({
//           ok: true,
//           note: "purchase succeeded, no ID",
//         });
//       }

//       const { status: approveStatus, body: approveJson } = await strapiFetch(
//         `/agent-subscriptions/${subscriptionsId}/approve`,
//         { token: STRAPI_ADMIN_TOKEN }
//       );

//       if ([200, 201].includes(approveStatus)) {
//         return NextResponse.json({
//           ok: true,
//           note: "purchase and approve success",
//         });
//       }
//       console.warn("notify: approve failed", { approveStatus, approveJson });
//       return NextResponse.json({
//         ok: true,
//         note: "purchase success, approve failed",
//       });
//     }

//     if (purchaseStatus === 409 || purchaseJson?.note === "already_processed") {
//       return NextResponse.json({ ok: true, note: "already processed" });
//     }

//     console.warn("notify: Strapi update returned non-2xx", {
//       purchaseStatus,
//       purchaseJson,
//     });
//     return NextResponse.json({
//       ok: true,
//       note: "update attempted, check server logs",
//     });
//   } catch (err) {
//     console.error("notify: failed to call Strapi update endpoint", err);
//     return NextResponse.json({ ok: true, note: "error calling strapi" });
//   }
// }
