import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#05080f] text-gray-200 overflow-hidden font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full relative overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-8 relative z-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
          {children}
        </main>
      </div>
    </div>
  );
}
