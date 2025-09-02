"use client";

import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "../../../hooks/use-toast";
import { useAuth } from "../../../../context/AuthContext";
import { useApartment } from "../../../../context/ApartmentContext";
import { LoadingState } from "../handle-event-loading/HandleEvents";

export default function ReklamaPaymentDialog({ isOpen, setIsOpen, data }) {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("reklama");
  const [paymentUnlocked, setPaymentUnlocked] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [loadingItemId, setLoadingItemId] = useState(null);
  const [positions, setPositions] = useState(null);
  const { user } = useAuth();

  const { loadingPosition, position, apartmentId } = useApartment();

  const paymentWindowRef = useRef(null);
  const pollIntervalRef = useRef(null);

  useEffect(() => {
    function handleMessage(e) {
      const payload = e.data || {};
      if (payload?.type !== "TBANK_PAYMENT_RESULT") return;

      const { status, orderId, message } = payload;

      if (!currentOrderId || (orderId && orderId !== currentOrderId)) return;

      try {
        if (paymentWindowRef.current && !paymentWindowRef.current.closed) {
          paymentWindowRef.current.close();
        }
      } catch {}

      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
        pollIntervalRef.current = null;
      }

      setLoadingItemId(null);
      setCurrentOrderId(null);

      if (status === "success") {
        toast({
          title: "✅ Payment Successful",
          description: "Your ad slot has been booked.",
        });
        setPaymentUnlocked(true);
        setActiveTab("payment");
      } else {
        toast({
          title: "❌ Payment Failed",
          description: message || "Please try again or contact support.",
          variant: "destructive",
        });
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [currentOrderId, toast]);

  useEffect(() => {
    if (position && position.length) {
      let filteredPositions = position.filter(
        (p) => p.title !== "Advertisement"
      );
      setPositions(filteredPositions);
    }
  }, [position]);

  const startPaymentWindowMonitor = (orderId) => {
    if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
    pollIntervalRef.current = setInterval(() => {
      try {
        const w = paymentWindowRef.current;
        if (!w || w.closed) {
          clearInterval(pollIntervalRef.current);
          pollIntervalRef.current = null;
          setLoadingItemId(null);
          setCurrentOrderId(null);
          toast({
            title: "⚠️ Payment Window Closed",
            description: "Please check your payment history or try again.",
            variant: "destructive",
          });
        }
      } catch {}
    }, 1000);
  };

  const createPaymentLink = async (item) => {
    const orderId = Date.now();
    setCurrentOrderId(orderId);
    setLoadingItemId(item.id);
    setLoading(true);

    try {
      const res = await fetch("/api/payment/init", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${user?.jwt}`,
        },
        body: JSON.stringify({
          amount: item.price,
          orderId,
          description: `Ad slot ${item.title}`,
          positionId: item.id,
          userId: user.id,
          position: item.order,
          productId: apartmentId,
          email: user?.email,
          type: "Position",
        }),
      });

      const data = await res.json();
      const bankResp = data?.bankResponse || data;
      const paymentUrl =
        bankResp?.PaymentURL ||
        bankResp?.PaymentUrl ||
        bankResp?.paymentUrl ||
        bankResp?.paymentURL ||
        (bankResp?.data &&
          (bankResp.data.PaymentURL || bankResp.data.paymentUrl));

      if (!paymentUrl) {
        setLoadingItemId(null);
        setLoading(false);
        toast({
          title: "❌ Payment URL Missing",
          description: "Server did not return a valid payment link.",
          variant: "destructive",
        });
        console.error("Missing PaymentURL:", bankResp);
        return;
      }

      try {
        // Open in the same window
        paymentWindowRef.current = window.open(paymentUrl, "_self");
      } catch {
        window.open(
          paymentUrl,
          // "_blank",
          "noopener,noreferrer"
        );
      }

      startPaymentWindowMonitor(orderId);
    } catch (err) {
      console.error("Payment link creation failed:", err);
      setLoadingItemId(null);
      setCurrentOrderId(null);
      setLoading(false);
      toast({
        title: "❌ Payment Initialization Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-h-[80vh] rounded-xl bg-white max-w-4xl overflow-auto">
        <DialogHeader className="text-xl text-primary-dark">
          <DialogTitle className="text-3xl">Рекламировать</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="reklama">Рекламировать</TabsTrigger>
            <TabsTrigger value="payment" disabled={!paymentUnlocked}>
              Оплата
            </TabsTrigger>
          </TabsList>

          {loadingPosition ? (
            <LoadingState />
          ) : (
            <TabsContent value="reklama">
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full border border-gray-300 rounded-xl text-sm">
                  <thead className="bg-gray-100 text-gray-700">
                    <tr>
                      <th className="px-4 py-2 border">Место</th>
                      <th className="px-4 py-2 border">Имя</th>
                      <th className="px-4 py-2 border">Условия</th>
                      <th className="px-4 py-2 border">Действие</th>
                    </tr>
                  </thead>
                  <tbody>
                    {positions?.map((item) => (
                      <tr key={item.id} className="border-t">
                        <td className="px-4 py-2 border text-center">
                          {item.order}
                        </td>
                        <td className="px-4 py-2 text-center border">
                          {item.title}
                        </td>
                        <td className="px-4 py-2 text-center border">
                          {item.price} /{" "}
                          {item.is_booked === null
                            ? "$"
                            : `busy until ${item.is_booked}`}
                        </td>
                        <td className="px-4 py-2 text-center border">
                          {item.is_booked === false ? (
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => createPaymentLink(item)}
                              disabled={loading}
                            >
                              {loadingItemId === item.id ? (
                                <span className="inline-flex items-center gap-2">
                                  <svg
                                    className="w-4 h-4 animate-spin"
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
                                  Processing...
                                </span>
                              ) : (
                                "Buy"
                              )}
                            </Button>
                          ) : null}
                          {item.is_booked ? (
                            <Button variant="secondary" size="sm">
                              Look
                            </Button>
                          ) : null}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          )}

          <TabsContent value="payment">
            <div className="mt-4">
              <h2 className="text-lg font-bold mb-2">Payment Details</h2>
              <p className="text-sm text-gray-600">
                Сейчас вы находитесь в разделе оплаты.
              </p>
              <Button className="mt-4" onClick={() => setIsOpen(false)}>
                Завершить оплату и закрыть
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
