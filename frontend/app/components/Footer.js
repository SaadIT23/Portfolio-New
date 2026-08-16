"use client";

import Link from "next/link";
import portfolio from "@/data/portfolio.json";
import { socialIconMap } from "./iconMaps";

export default function Footer() {
  const navLinks = [
    { href: "/services", label: "Services" },
    { href: "/resume", label: "Resume" },
    { href: "/showcase", label: "Work" },
    { href: "/blogs", label: "Blogs" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <footer className="bg-primary/10 border-t border-accent/20 py-10 relative">
      <div className="container mx-auto px-6 lg:px-12 text-center">
        <h2 className="text-2xl font-bold text-accent mb-2">{portfolio.site.ownerName}</h2>
        <p className="text-white/70 text-sm mb-6">Crafting modern software solutions with passion and precision.</p>

        <div className="flex justify-center gap-8 mb-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-white/70 hover:text-accent transition hover:underline">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex justify-center gap-6 mb-6">
          {portfolio.socials.map((social) => {
            const Icon = socialIconMap[social.icon];
            if (!Icon) return null;

            return (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                className="text-white/70 hover:text-accent transition-colors"
                aria-label={social.platform}
              >
                <Icon className="text-2xl" />
              </a>
            );
          })}
        </div>

        <p className="text-white/50 text-xs">(c) {new Date().getFullYear()} {portfolio.site.ownerName}. All rights reserved.</p>
      </div>
    </footer>
  );
}
