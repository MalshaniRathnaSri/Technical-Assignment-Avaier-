"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useBorrowerStore } from "@/lib/store";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface BorrowerDetailData {
  id: string;
  name: string;
  email: string;
  phone: string;
  loan_amount: number;
  status: string;
  employment: string;
  income: number;
  existing_loan: number;
  credit_score: number;
  source_of_funds: string;
  risk_signal: string;
  ai_flags: string[];
}

export default function BorrowerDetail() {
  const activeBorrowerId = useBorrowerStore((state) => state.activeBorrowerId);
  const [borrower, setBorrower] = useState<BorrowerDetailData | null>(null);

  const [open, setOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
      if (activeBorrowerId) {
          fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/borrowers/${activeBorrowerId}`)
              .then((res) => res.json())
              .then((data) => setBorrower(data));
      }
  }, [activeBorrowerId]);

  if (!borrower)
    return (
      <Card>
        <CardContent>Select a borrower to see details.</CardContent>
      </Card>
    );

  const handleAction = async (endpoint: string, message: string) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/borrowers/${borrower.id}/${endpoint}`,
        { method: "POST" }
    );

    if (res.ok) {
        setModalMessage(message);
        setOpen(true);
    }
  };

  return (
    <Card>
      <CardContent className="space-y-4 p-2 sm:p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 className="text-lg sm:text-xl font-bold">{borrower.name}</h2>
            <p className="text-sm text-gray-500">{borrower.email}</p>
            <p className="text-sm text-gray-500">{borrower.phone}</p>
            <p className="font-semibold text-sm sm:text-base">
              Loan: ${borrower.loan_amount}
            </p>
          </div>
          <span className="self-start sm:self-auto px-2 py-1 rounded bg-blue-900 text-white text-xs sm:text-sm font-bold">
            {borrower.status}
          </span>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="ai-flags">
            <AccordionTrigger>AI Explainability</AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-1 mt-2">
                {borrower.ai_flags.map((flag, i) => (
                  <li key={i} className="flex items-center text-red-600">
                    <AlertTriangle className="w-4 h-4 mr-2" /> {flag}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="flex flex-col sm:flex-row gap-2 mt-3">
          <Button
            className="px-2 py-1 text-sm w-full sm:w-auto"
            variant="secondary"
            onClick={() =>
              handleAction("request-documents", "Documents requested.")
            }
          >
            Request Documents
          </Button>

          <Button
            className="px-2 py-1 text-sm w-full sm:w-auto"
            variant="secondary"
            onClick={() => handleAction("send-valuer", "Valuer notified.")}
          >
            Send to Valuer
          </Button>

          <Button
            className="px-2 py-1 text-sm w-full sm:w-auto"
            variant="default"
            onClick={() => handleAction("approve", "Loan approved.")}
          >
            Approve
          </Button>
        </div>

        <div className="p-3 bg-gray-800 rounded-md">
          <h3 className="font-semibold mb-2">Loan Summary</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <p>Employment: {borrower.employment}</p>
            <p>Existing Loan: ${borrower.existing_loan}</p>
            <p>Credit Score: {borrower.credit_score}</p>
            <p>Source of Funds: {borrower.source_of_funds}</p>
          </div>

          <div className="mt-3 p-2 bg-yellow-100 text-yellow-800 rounded flex items-center">
            <AlertTriangle className="w-4 h-4 mr-2" />
            {borrower.risk_signal}
          </div>

          <Button
            className="mt-3 w-full sm:w-auto"
            onClick={() =>
              handleAction("escalate", "Escalated to Credit Committee.")
            }
          >
            Escalate to Credit Committee
          </Button>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-xs sm:max-w-md bg-gray-300">
            <DialogHeader>
              <DialogTitle>Action Successful</DialogTitle>
              <DialogDescription>{modalMessage}</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
