import BorrowerPipeline from "@/components/BorrowerPipeline";
import BorrowerDetail from "@/components/BorrowerDetail";
import BrokerOverview from "@/components/BrokerOverview";

export default function Page() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <BorrowerPipeline />
      <BorrowerDetail />
      <BrokerOverview />
    </main>
  );
}