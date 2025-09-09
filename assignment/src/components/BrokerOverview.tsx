'use client';


import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";


interface BrokerInfo {
    name: string;
    deals: number;
    approval_rate: string;
    pending: number;
}

export default function BrokerOverview() {
    const [broker, setBroker] = useState<BrokerInfo | null>(null);
    const [workflow, setWorkflow] = useState<string[]>([]);
    const [assistantEnabled, setAssistantEnabled] = useState(false);


    useEffect(() => {
        fetch('/api/broker/1')
            .then(res => res.json())
            .then(data => setBroker(data));


        fetch('/api/onboarding/workflow')
            .then(res => res.json())
            .then(data => setWorkflow(data.steps));
    }, []);

    if (!broker) return <Card><CardContent>Loading broker info...</CardContent></Card>;


    return (
        <Card>
            <CardContent className="space-y-4">
                <div>
                    <h2 className="font-bold text-lg">Broker: {broker.name}</h2>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                        <div className="text-xl font-bold">{broker.deals}</div>
                        <div className="text-sm text-gray-500">Deals</div>
                    </div>
                    <div>
                        <div className="text-xl font-bold">{broker.approval_rate}</div>
                        <div className="text-sm text-gray-500">Approval</div>
                    </div>
                    <div>
                        <div className="text-xl font-bold">${broker.pending}</div>
                        <div className="text-sm text-gray-500">Pending</div>
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button onClick={() => console.log("Call broker")}>Call</Button>
                    <Button onClick={() => console.log("Email broker")} variant="secondary">Email</Button>
                    <Button onClick={() => console.log("Chat broker")} variant="secondary">Chat</Button>
                </div>


                <div>
                    <h3 className="font-semibold">Onboarding Workflow</h3>
                    <ol className="list-decimal list-inside space-y-1">
                        {workflow.map((step, i) => (
                            <li key={i}>{step}</li>
                        ))}
                    </ol>
                </div>

                <div className="flex items-center justify-between">
                    <span>E Ardsassist</span>
                    <Switch checked={assistantEnabled} onCheckedChange={setAssistantEnabled} />
                </div>
            </CardContent>
        </Card>
    );
}