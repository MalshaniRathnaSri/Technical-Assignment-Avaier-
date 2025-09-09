import BorrowerPipeline from "@/components/BorrowerPipeline";
import BorrowerDetail from "@/components/BorrowerDetail";
import BrokerOverview from "@/components/BrokerOverview";

export default function Page() {
  return (
    <body className="dark">
  <div className="bg-circles">
    <div className="circle1"></div>
    <div className="circle2"></div>
    <div className="circle3"></div>
  </div>

  <main className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
    <BorrowerPipeline />
    <BorrowerDetail />
    <BrokerOverview />
  </main>
</body>

  );
}