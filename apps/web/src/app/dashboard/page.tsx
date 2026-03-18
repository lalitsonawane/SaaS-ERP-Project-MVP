import { 
  TrendingUp, 
  AlertCircle, 
  FileText, 
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Welcome back, Admin</h1>
          <p className="text-[#8b9bb4] mt-2">Here is what's happening in your business today.</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-lg shadow-blue-600/20 flex items-center">
          <FileText className="w-4 h-4 mr-2" />
          Create Invoice
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Revenue", value: "₹2,45,900", change: "+12.5%", positive: true },
          { label: "Active Invoices", value: "34", change: "+4.2%", positive: true },
          { label: "Pending Receivables", value: "₹84,200", change: "-2.1%", positive: false },
          { label: "AI Automations", value: "12 Executed", change: "Saved 4h", positive: true, icon: Activity },
        ].map((metric, i) => (
          <div key={i} className="bg-[#111827]/60 backdrop-blur-md border border-[#1e293b] p-5 rounded-2xl hover:border-blue-500/30 transition-colors">
            <h3 className="text-[#8b9bb4] text-sm font-medium mb-1">{metric.label}</h3>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold text-white">{metric.value}</span>
              <div className={`flex items-center text-xs font-semibold px-2 py-1 rounded-full ${metric.positive ? 'text-emerald-400 bg-emerald-400/10' : 'text-rose-400 bg-rose-400/10'}`}>
                {metric.positive && metric.icon !== Activity ? <ArrowUpRight className="w-3 h-3 mr-1" /> : !metric.positive ? <ArrowDownRight className="w-3 h-3 mr-1" /> : null}
                {metric.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Left Col */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#111827]/60 backdrop-blur-md border border-[#1e293b] p-6 rounded-2xl">
             <div className="flex justify-between items-center mb-4">
               <h2 className="text-lg font-semibold text-white">Recent Invoices</h2>
               <button className="text-sm text-blue-400 hover:underline">View All</button>
             </div>
             <table className="w-full text-left">
               <thead>
                 <tr className="text-[#8b9bb4] text-sm border-b border-[#1e293b]">
                   <th className="pb-3 font-medium">Invoice #</th>
                   <th className="pb-3 font-medium">Client</th>
                   <th className="pb-3 font-medium">Amount</th>
                   <th className="pb-3 font-medium">Status</th>
                 </tr>
               </thead>
               <tbody className="text-sm">
                 {[
                   { id: "INV-2026-001", client: "Acme Corp MSME", amount: "₹45,000", status: "Paid" },
                   { id: "INV-2026-002", client: "Stark Industries", amount: "₹1,20,000", status: "Pending" },
                   { id: "INV-2026-003", client: "Wayne Enterprises", amount: "₹18,500", status: "Draft" },
                 ].map((inv, idx) => (
                   <tr key={idx} className="border-b border-[#1e293b]/50 hover:bg-[#1e293b]/30">
                     <td className="py-4 text-white font-medium">{inv.id}</td>
                     <td className="py-4 text-[#8b9bb4]">{inv.client}</td>
                     <td className="py-4 text-white">{inv.amount}</td>
                     <td className="py-4">
                       <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                         inv.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400' : 
                         inv.status === 'Pending' ? 'bg-amber-500/10 text-amber-400' : 
                         'bg-[#1e293b] text-[#8b9bb4]'
                       }`}>
                         {inv.status}
                       </span>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
          </div>
        </div>

        {/* Right Col */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 border border-blue-500/20 p-6 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Activity className="w-32 h-32 text-blue-400" />
            </div>
            <div className="flex items-center mb-3 text-blue-400">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse mr-2"></span>
              <span className="text-xs font-bold tracking-wider uppercase">AI Insights</span>
            </div>
            <h3 className="text-white font-medium text-lg leading-tight mb-2">Inventory Alert</h3>
            <p className="text-blue-100/70 text-sm mb-4 line-clamp-3">
              Based on the 90-day sales velocity, product <strong>Widget Pro</strong> is projected to run out of stock in 4 days. Would you like me to generate a Purchase Order to preferred vendor?
            </p>
            <button className="w-full bg-blue-500/20 hover:bg-blue-500/40 text-blue-300 font-medium text-sm py-2 rounded-lg transition-colors border border-blue-500/30">
              Approve Restock
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
