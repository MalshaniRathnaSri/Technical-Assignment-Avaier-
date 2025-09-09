'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

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
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState("");
    const [open, setOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/broker/1`)
            .then(res => res.json())
            .then(data => setBroker(data));

        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/onboarding/workflow`)
            .then(res => res.json())
            .then(data => setWorkflow(data.steps));
    }, []);

    if (!broker) return <Card><CardContent>Loading broker info...</CardContent></Card>;

    const toggleAssistant = async (enabled: boolean) => {
        try {
            await fetch(`/api/broker/1/assistant`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ enabled }),
            });
            setAssistantEnabled(enabled);

            setDialogMessage(`E Ardsassist ${enabled ? "enabled" : "disabled"}.`);
            setDialogOpen(true);
        } catch (err) {
            console.error("Failed to update assistant toggle", err);
        }
    };

    const handleClick = (message: string) => {
        setModalMessage(message);
        setOpen(true);
    };

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

                <div>
                    <div className="flex flex-wrap gap-2">
                        <Button asChild>
                            <a href="tel:+123456789">Call</a>
                        </Button>
                        <Button asChild variant="secondary">
                            <a href="mailto:broker@example.com">Email</a>
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => handleClick("Chat feature coming soon!")}
                        >
                            Chat
                        </Button>
                    </div>

                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Notice</DialogTitle>
                                <DialogDescription>{modalMessage}</DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <Button onClick={() => setOpen(false)}>Close</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
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
                    <span>AI Assistant</span>
                    <Switch checked={assistantEnabled} onCheckedChange={toggleAssistant} />
                </div>

                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Action Completed</DialogTitle>
                            <DialogDescription>{dialogMessage}</DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button onClick={() => setDialogOpen(false)}>Close</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    );
}
