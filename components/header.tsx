"use client"

import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ConnectWalletButton } from "./connect-wallet"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Desktop Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-30 py-4 transition-all duration-300 hidden md:flex ${
          isScrolled ? "backdrop-blur-md bg-black/20" : ""
        }`}
      >
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">🐔</span>
            </div>
            <span className="text-white font-bold text-xl">CLUCKO</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className={`px-3 py-2 rounded-full transition-colors ${
                pathname === "/" ? "text-white font-medium" : "text-gray-300 hover:text-white"
              }`}
              style={pathname === "/" ? { backgroundColor: "#24203D" } : {}}
            >
              Clucks
            </Link>
            <Link
              href="/my-farm"
              className={`px-3 py-2 rounded-full transition-colors ${
                pathname === "/my-farm" ? "text-white font-medium" : "text-gray-300 hover:text-white"
              }`}
              style={pathname === "/my-farm" ? { backgroundColor: "#24203D" } : {}}
            >
              My Farm
            </Link>
            <Link
              href="/marketplace"
              className={`px-3 py-2 rounded-full transition-colors ${
                pathname === "/marketplace" ? "text-white font-medium" : "text-gray-300 hover:text-white"
              }`}
              style={pathname === "/marketplace" ? { backgroundColor: "#24203D" } : {}}
            >
              Marketplace
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <ConnectWalletButton />
          {/* <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <MoreHorizontal className="w-5 h-5" />
          </Button> */}
        </div>
      </header>

      {/* Mobile Header */}
      <header className="flex md:hidden items-center justify-between px-4 py-3 fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/20">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">🐔</span>
          </div>
          <span className="text-white font-bold text-xl">CLUCKO</span>
        </Link>
        <ConnectWalletButton />
      </header>
    </>
  )
}
