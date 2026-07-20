"use client";

import React from "react";
import Link from "next/link";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GiWeightLiftingUp } from "react-icons/gi";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#0F172A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-[#0F172A] to-[#22C55E] shadow-md shadow-[#22C55E]/25 transition-transform duration-300 group-hover:scale-105">
                <GiWeightLiftingUp className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                Fit<span className="bg-gradient-to-r from-[#22C55E] to-[#F59E0B] bg-clip-text text-transparent">Forge</span>
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed">
              Personalized workout and nutrition plans, powered by an AI
              coach that adapts to your progress — not a static PDF.
            </p>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#22C55E] flex items-center justify-center transition-colors"
              >
                <FaFacebookF className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#22C55E] flex items-center justify-center transition-colors"
              >
                <FaXTwitter className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#22C55E] flex items-center justify-center transition-colors"
              >
                <FaInstagram className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#22C55E] flex items-center justify-center transition-colors"
              >
                <FaLinkedinIn className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-white/90">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/" className="text-white/60 hover:text-[#22C55E] text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/plans" className="text-white/60 hover:text-[#22C55E] text-sm transition-colors">
                  Explore Plans
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white/60 hover:text-[#22C55E] text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white/60 hover:text-[#22C55E] text-sm transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/60 hover:text-[#22C55E] text-sm transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Plan Goals */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-white/90">
              Plan Goals
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/plans?goal=weight_loss" className="text-white/60 hover:text-[#22C55E] text-sm transition-colors">
                  Weight Loss
                </Link>
              </li>
              <li>
                <Link href="/plans?goal=muscle_gain" className="text-white/60 hover:text-[#22C55E] text-sm transition-colors">
                  Muscle Gain
                </Link>
              </li>
              <li>
                <Link href="/plans?goal=endurance" className="text-white/60 hover:text-[#22C55E] text-sm transition-colors">
                  Endurance
                </Link>
              </li>
              <li>
                <Link href="/chat" className="text-white/60 hover:text-[#22C55E] text-sm transition-colors">
                  AI Chat Coach
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-white/90">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-white/60 text-sm">
                <HiOutlineMail className="w-5 h-5 text-[#22C55E] shrink-0 mt-0.5" />
                <span>support@fitforge.ai</span>
              </li>
              <li className="flex items-start gap-2.5 text-white/60 text-sm">
                <HiOutlinePhone className="w-5 h-5 text-[#22C55E] shrink-0 mt-0.5" />
                <span>+880 1XXX-XXXXXX</span>
              </li>
              <li className="flex items-start gap-2.5 text-white/60 text-sm">
                <HiOutlineLocationMarker className="w-5 h-5 text-[#22C55E] shrink-0 mt-0.5" />
                <span>Rajshahi, Bangladesh</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/50 text-xs">
            © {currentYear} FitForge. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="text-white/50 hover:text-white text-xs transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-white/50 hover:text-white text-xs transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;