"use client";

import { SiReact } from "react-icons/si";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Navbar() {
  return (
    <header className="border-b border-border/40 backdrop-blur-sm bg-black/30 fixed top-0 w-full z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <SiReact className="h-7 w-7 text-blue-500 animate-[spin_5s_linear_infinite]" />
            <div className="absolute inset-0 blur-sm">
              <SiReact className="h-7 w-7 text-blue-400/50 animate-[spin_5s_linear_infinite]" />
            </div>
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            React_Cloudify
          </span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="#features" className="text-sm text-foreground/80 transition-colors hover:text-foreground">
            Features
          </Link>
          <Link href="#how-it-works" className="text-sm text-foreground/80 transition-colors hover:text-foreground">
            How It Works
          </Link>
          <Link href="#pricing" className="text-sm text-foreground/80 transition-colors hover:text-foreground">
            Pricing
          </Link>
          <Link href="#docs" className="text-sm text-foreground/80 transition-colors hover:text-foreground">
            Docs
          </Link>
        </nav>

        <div>
          <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}