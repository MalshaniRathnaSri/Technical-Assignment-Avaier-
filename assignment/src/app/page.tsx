import BorrowerPipeline from "@/components/BorrowerPipeline";
import BorrowerDetail from "@/components/BorrowerDetail";


export default function Page() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <BorrowerPipeline />
      <BorrowerDetail />
      <div>Right panel placeholder</div>
    </main>
  );
}