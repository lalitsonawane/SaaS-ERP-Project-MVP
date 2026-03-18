import Link from "next/link";
import { 
  Building2, 
  LayoutDashboard, 
  Users, 
  ShoppingCart, 
  Briefcase, 
  Wallet, 
  FileBox,
  Settings,
  HelpCircle
} from "lucide-react";

export function Sidebar() {
  const routes = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { label: "Sales & Invoices", icon: ShoppingCart, href: "/dashboard/sales" },
    { label: "Inventory", icon: FileBox, href: "/dashboard/inventory" },
    { label: "Purchases", icon: Briefcase, href: "/dashboard/purchases" },
    { label: "Finance & Accounts", icon: Wallet, href: "/dashboard/finance" },
    { label: "CRM", icon: Users, href: "/dashboard/crm" },
    { label: "HR & Payroll", icon: Building2, href: "/dashboard/hr" },
  ];

  return (
    <div className="w-64 h-full bg-[#0m0b14] border-r border-[#1e293b] flex flex-col justify-between text-[#8b9bb4]">
      <div>
        <div className="h-16 flex items-center px-6 border-b border-[#1e293b]">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-400 flex items-center justify-center font-bold text-white shadow-lg">
            A
          </div>
          <span className="ml-3 font-semibold text-gray-100 uppercase tracking-wider text-sm">OmniCore</span>
        </div>
        <div className="py-6 px-4 space-y-2">
          {routes.map((route) => (
            <Link 
              key={route.label} 
              href={route.href}
              className="flex items-center px-3 py-2.5 rounded-lg hover:bg-[#1e293b] hover:text-white transition-all group"
            >
              <route.icon className="w-5 h-5 mr-3 text-[#64748b] group-hover:text-blue-400 transition-colors" />
              <span className="text-sm font-medium">{route.label}</span>
            </Link>
          ))}
        </div>
      </div>
      
      <div className="p-4 border-t border-[#1e293b]">
        <Link href="/dashboard/settings" className="flex items-center px-3 py-2.5 rounded-lg hover:bg-[#1e293b] hover:text-white transition-all group mb-1">
          <Settings className="w-5 h-5 mr-3 text-[#64748b] group-hover:text-white" />
          <span className="text-sm font-medium">Settings</span>
        </Link>
        <Link href="/help" className="flex items-center px-3 py-2.5 rounded-lg hover:bg-[#1e293b] hover:text-white transition-all group">
          <HelpCircle className="w-5 h-5 mr-3 text-[#64748b] group-hover:text-white" />
          <span className="text-sm font-medium">Help & Support</span>
        </Link>
      </div>
    </div>
  );
}
