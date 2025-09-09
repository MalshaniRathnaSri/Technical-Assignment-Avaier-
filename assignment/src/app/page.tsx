import BorrowerPipeline from "@/components/BorrowerPipeline";

export default function Home() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
      <section className="md:col-span-1">
        <BorrowerPipeline />
      </section>
      <section className="md:col-span-2">
        <div className="p-4 border rounded-lg h-full flex items-center justify-center">
          Select a borrower to view details (Step 3)
        </div>
      </section>
    </main>
  );
}