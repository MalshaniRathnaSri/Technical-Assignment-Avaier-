import { NextRequest, NextResponse } from "next/server";

const detail = {
    "1": {
        id: "1",
        name: "Sarah Dunn",
        email: "sarah.dunn@example.com",
        phone: "(355)123-4557",
        loan_amount: 300000,
        status: "In Review",
        employment: "At Tech Company",
        income: 120000,
        existing_loan: 240000,
        credit_score: 720,
        source_of_funds: "Declared",
        risk_signal: "Missing Source of Funds declaration",
        ai_flags: [
            "Income Inconsistent with Bank statements",
            "High Debt-to-Income Ratio detected",
        ],
    },
    "2": {
        id: "2",
        name: "Alan Matthews",
        email: "alan.matthews@example.com",
        phone: "(355)555-0199",
        loan_amount: 20000,
        status: "In Review",
        employment: "Self-employed",
        income: 65000,
        existing_loan: 5000,
        credit_score: 690,
        source_of_funds: "Declared",
        risk_signal: "",
        ai_flags: [],
    },
    "3": {
        id: "3",
        name: "Lisa Carter",
        email: "lisa.carter@example.com",
        phone: "(355)555-0110",
        loan_amount: 450000,
        status: "New",
        employment: "Teacher",
        income: 90000,
        existing_loan: 120000,
        credit_score: 740,
        source_of_funds: "Declared",
        risk_signal: "High LTV",
        ai_flags: ["High Debt-to-Income Ratio detected"],
    },
} as const;

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest, context: { params: { id: string } }) {
    const { id } = context.params;
    const item = detail[id as keyof typeof detail] ?? detail["1"];
    return NextResponse.json(item);
}
