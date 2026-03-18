import { Bell, Search, User } from "lucide-react";

export function Header() {
  return (
    <header className="h-16 border-b border-[#1e293b] bg-[#0b0f19]/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-10 w-full">
      <div className="flex items-center bg-[#1e293b] px-3 py-2 rounded-lg w-96 border border-[#334155] focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
        <Search className="w-4 h-4 text-[#64748b]" />
        <input 
          type="text" 
          placeholder="Ask AI anything (e.g. Sales this week?)" 
          className="bg-transparent border-none outline-none text-sm ml-2 w-full text-gray-200 placeholder-[#64748b]"
        />
      </div>

      <div className="flex items-center space-x-4">
        <button className="relative p-2 rounded-full hover:bg-[#1e293b] transition-colors text-[#64748b] hover:text-white">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full animate-pulse border border-[#0b0f19]"></span>
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white cursor-pointer hover:shadow-lg hover:shadow-blue-500/20 transition-all">
          <User className="w-4 h-4" />
        </div>
      </div>
    </header>
  );
}
