"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, Globe2Icon, InfoIcon } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "#scraper", label: "Scraper", icon: Globe2Icon },
    { href: "#service", label: "Service", icon: InfoIcon },
  ];

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className=""><img src="/Logo.png" alt="Logo" /></span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">Scrappis</h3>
              <p className="text-xs text-muted-foreground">Company Finder Platform</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{link.label}</span>
                </a>
              );
            })}
          </div>

      
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm">
              Admin Panel
            </Button>
          </div>

     
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

    
        {isMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className="flex items-center space-x-3 px-3 py-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{link.label}</span>
                  </a>
                );
              })}
              <div className="pt-2 border-t border-border mt-2">
                <Button variant="outline" size="sm" className="w-full">
                  Admin Panel
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;