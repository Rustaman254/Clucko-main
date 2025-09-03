"use client"

import { Coins, Ban as Barn, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function MobileNavigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 md:hidden z-50">
      <div className="flex items-center gap-1 p-2 rounded-full" style={{ backgroundColor: "#120F29" }}>
        <Link href="/">
          <button
            className={`p-3 rounded-full transition-colors ${
              pathname === "/" ? "text-white" : "text-gray-400 hover:text-white"
            }`}
            style={pathname === "/" ? { backgroundColor: "#24203D" } : {}}
          >
            <Coins className="w-5 h-5" />
          </button>
        </Link>
        <Link href="/my-farm">
          <button
            className={`p-3 rounded-full transition-colors ${
              pathname === "/my-farm" ? "text-white" : "text-gray-400 hover:text-white"
            }`}
            style={pathname === "/my-farm" ? { backgroundColor: "#24203D" } : {}}
          >
            <Barn className="w-5 h-5" />
          </button>
        </Link>
        <Link href="/marketplace">
          <button
            className={`p-3 rounded-full transition-colors ${
              pathname === "/marketplace" ? "text-white" : "text-gray-400 hover:text-white"
            }`}
            style={pathname === "/marketplace" ? { backgroundColor: "#24203D" } : {}}
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </Link>
      </div>
    </nav>
  )
}
