// components/Footer.jsx
"use client";

import { FaGithub, FaLinkedin, FaTwitter, FaArrowUp } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {


    return (
        <footer className="bg-primary/10 border-t border-accent/20 py-10 relative">
            <div className="container mx-auto px-6 lg:px-12 text-center">
                {/* Branding */}
                <h2 className="text-2xl font-bold text-accent mb-2">Saad Imran</h2>
                <p className="text-white/70 text-sm mb-6">
                    Crafting modern software solutions with passion and precision.
                </p>

                {/* Footer Navigation */}
                <div className="flex justify-center gap-8 mb-6 text-sm font-medium h">

                    <Link href="/services" className="text-white/70 hover:text-accent transition hover:underline">
                        Services
                    </Link>
                    <Link href="/resume" className="text-white/70 hover:text-accent transition hover:underline">
                        Resume
                    </Link>
                    <Link href="/showcase" className="text-white/70 hover:text-accent transition hover:underline">
                        Work
                    </Link>
                    <Link href="/contact" className="text-white/70 hover:text-accent transition hover:underline">
                        Contact
                    </Link>
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-6 mb-6">
                    <a
                        href="https://github.com/SaadIT23"
                        target="_blank"
                        className="text-white/70 hover:text-accent transition-colors"
                    >
                        <FaGithub className="text-2xl" />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/saad-imran-it-"
                        target="_blank"
                        className="text-white/70 hover:text-accent transition-colors"
                    >
                        <FaLinkedin className="text-2xl" />
                    </a>

                </div>

                {/* Copyright */}
                <p className="text-white/50 text-xs">
                    © {new Date().getFullYear()} Saad Imran. All rights reserved.
                </p>
            </div>


        </footer>
    );
}
