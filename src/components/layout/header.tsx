"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#releases", label: "Música", className: "hover:text-foreground transition-colors hover:line-through decoration-primary" },
  { href: "#projects", label: "Proyectos", className: "hover:text-foreground transition-colors hover:line-through decoration-blue-500" },
  { href: "#cosmic", label: "Cosmic Vicar", className: "hover:text-primary transition-colors hover:line-through decoration-foreground" },
  { href: "#bunker", label: "Bunker", className: "hover:text-accent transition-colors hover:line-through decoration-accent" },
  { href: "#diary", label: "Sound Diary", className: "hover:text-foreground transition-colors hover:line-through decoration-red-500" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        scrolled ? "bg-background/95 backdrop-blur-md border-b border-border py-4" : "bg-transparent py-8"
      )}
    >
      <div className="container mx-auto px-6 max-w-6xl flex justify-between items-center">
        <Link href="/" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="text-xl md:text-2xl font-black font-headline tracking-tighter text-foreground uppercase italic cursor-pointer z-50 select-none">
          JW<span className="text-primary">.</span>CVR
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          {navLinks.map((link) => (
            <button key={link.href} onClick={() => scrollToSection(link.href)} className={cn("transition-colors", link.className)}>
              {link.label}
            </button>
          ))}
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-background/95 backdrop-blur-md border-r border-border p-6">
              <div className="flex flex-col gap-8 mt-12 text-center">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                     <button onClick={() => scrollToSection(link.href)} className={cn("text-sm font-bold uppercase tracking-widest text-muted-foreground", link.className)}>
                        {link.label}
                      </button>
                  </SheetClose>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
