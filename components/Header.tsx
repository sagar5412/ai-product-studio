import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold text-xl">
              N
            </div>
            <span className="font-semibold text-xl tracking-tight text-gray-900">
              NexeraHive
            </span>
          </div>

          <nav className="flex items-center gap-6">
            <span className="text-sm font-medium text-gray-500 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
              AI Product Studio
            </span>
          </nav>
        </div>
      </div>
    </header>
  );
}
