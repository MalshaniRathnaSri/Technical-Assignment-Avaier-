"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { useBorrowerStore } from "@/lib/store";

interface Borrower {
    id: string;
    name: string;
    loan_type: string;
    amount: number;
    status: string;
}

interface PipelineResponse {
    new: Borrower[];
    in_review: Borrower[];
    approved: Borrower[];
}

export default function BorrowerPipeline() {
    const [data, setData] = useState<PipelineResponse | null>(null);
    const { setActiveBorrower, activeBorrowerId } = useBorrowerStore();

    useEffect(() => {
        fetch("/api/borrowers/pipeline")
            .then((res) => res.json())
            .then((json) => setData(json));
    }, []);

    const renderGroup = (title: string, borrowers: Borrower[]) => (
        <div>
            <h3 className="font-semibold text-lg mb-2">{title}</h3>
            <div className="space-y-2">
                {borrowers.map((b) => (
                    <Card
                        key={b.id}
                        onClick={() => setActiveBorrower(b.id)}
                        className={`p-3 cursor-pointer border ${activeBorrowerId === b.id ? "border-blue-500" : "border-gray-200"
                            }`}
                    >
                        <div className="font-medium">{b.name}</div>
                        <div className="text-sm text-gray-500">{b.loan_type}</div>
                        <div className="text-sm">${b.amount.toLocaleString()}</div>
                    </Card>
                ))}
            </div>
        </div>
    );

    if (!data) return <div>Loading pipeline...</div>;

    return (
        <div className="space-y-6">
            {renderGroup("New", data.new)}
            {renderGroup("In Review", data.in_review)}
            {renderGroup("Approved", data.approved)}
        </div>
    );
}