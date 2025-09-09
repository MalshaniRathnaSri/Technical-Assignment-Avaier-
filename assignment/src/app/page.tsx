import { Bell, HelpCircle, Search } from "lucide-react"
import { Card } from "@/components/ui/card"


export default function Page() {
  return (
    <main className="container mx-auto py-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">DemoApp</h1>
        <div className="flex items-center gap-3 text-muted-foreground">
          <Search className="h-5 w-5" />
          <HelpCircle className="h-5 w-5" />
          <Bell className="h-5 w-5" />
        </div>
      </header>


      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="p-4">Left – Borrower Pipeline (Step 2)</Card>
        <Card className="p-4">Middle – Borrower Details (Step 3)</Card>
        <Card className="p-4">Right – Broker Overview (Step 4)</Card>
      </section>
    </main>
  )
}