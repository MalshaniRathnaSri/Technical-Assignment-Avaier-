'use client';


import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useBorrowerStore } from "@/lib/store";

interface BorrowerDetailData {
    id: string;
    name: string;
    email: string;
    phone: string;
    loan_amount: number;
    status: string;
    employment: string;
    existing_loan: number;
    credit_score: number;
    source_of_funds: string;
    risk_signal: string;
    ai_flags: string[];
}

export default function BorrowerDetail() {
    const { activeBorrowerId } = useBorrowerStore();
    const [detail, setDetail] = useState<BorrowerDetailData | null>(null);


    useEffect(() => {
        if (activeBorrowerId) {
            fetch(`/api/borrowers/${activeBorrowerId}`)
                .then(res => res.json())
                .then(data => setDetail(data));
        }
    }, [activeBorrowerId]);


    if (!detail) {
        return (
            <Card><CardContent>Select a borrower to see details.</CardContent></Card>
        );
    }

    return (
        <Card>
            <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="font-bold text-lg">{detail.name}</h2>
                        <p>{detail.email} · {detail.phone}</p>
                        <p className="text-sm text-gray-500">Loan: ${detail.loan_amount}</p>
                    </div>
                    <Badge>{detail.status}</Badge>
                </div>

                <Accordion type="single" collapsible>
                    <AccordionItem value="ai">
                        <AccordionTrigger>AI Explainability</AccordionTrigger>
                        <AccordionContent>
                            <ul className="space-y-2">
                                {detail.ai_flags.map((flag, i) => (
                                    <li key={i} className="flex items-center gap-2 text-red-600">
                                        <AlertTriangle className="h-4 w-4" /> {flag}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-3 flex gap-2">
                                <Button onClick={() => console.log("Request Docs")}>Request Documents</Button>
                                <Button variant="secondary" onClick={() => console.log("Send to Valuer")}>Send to Valuer</Button>
                                <Button variant="secondary" onClick={() => console.log("Approve")}>Approve</Button>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <div className="grid grid-cols-2 gap-2 text-sm">
                    <div><strong>Employment:</strong> {detail.employment}</div>
                    <div><strong>Existing Loan:</strong> {detail.existing_loan}</div>
                    <div><strong>Credit Score:</strong> {detail.credit_score}</div>
                    <div><strong>Source of Funds:</strong> {detail.source_of_funds}</div>
                </div>


                <div className="bg-yellow-100 text-yellow-800 p-3 rounded flex justify-between items-center">
                    <span>{detail.risk_signal}</span>
                    <Button className="bg-red-600 hover:bg-red-700">Escalate to Credit Committee</Button>
                </div>
            </CardContent>
        </Card>
    );
}