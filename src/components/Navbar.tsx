"use client";

import { Avatar, Button, Dropdown } from "@heroui/react";
import Link from "next/link";
import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { MdDashboard, MdAddCircleOutline } from "react-icons/md";
import { GiWeightLiftingUp } from "react-icons/gi";
import { HiMenu, HiX } from "react-icons/hi";
import { BiLogOut as LogOutIcon } from "react-icons/bi";
import { PiSparkleFill } from "react-icons/pi";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const pathname = usePathname();

  if (pathname.includes("dashboard")) {
    return null;
  }

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#E2E8F0] bg-white/80 backdrop-blur-md">
      <header className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-4">
          <button
            className="text-[#334155] md:hidden focus:outline-none cursor-pointer p-1 rounded-lg hover:bg-[#F1F5F9] transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
          </button>

          <Link href="/">
            <div className="flex items-center gap-2.5 cursor-pointer group">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#0F172A] to-[#22C55E] shadow-md shadow-[#22C55E]/25 transition-transform duration-300 group-hover:scale-105">
                <GiWeightLiftingUp className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tight text-[#0F172A]">
                Fit<span className="bg-gradient-to-r from-[#22C55E] to-[#F59E0B] bg-clip-text text-transparent">Forge</span>
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden items-center gap-8 md:flex">
          <li>
            <Link href="/" className={`text-sm font-semibold transition-colors ${pathname === "/" ? "text-[#22C55E]" : "text-[#475569] hover:text-[#22C55E]"}`}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/plans" className={`text-sm font-semibold transition-colors ${pathname === "/plans" ? "text-[#22C55E]" : "text-[#475569] hover:text-[#22C55E]"}`}>
              Explore Plans
            </Link>
          </li>
          <li>
            <Link href="/about" className={`text-sm font-semibold transition-colors ${pathname === "/about" ? "text-[#22C55E]" : "text-[#475569] hover:text-[#22C55E]"}`}>
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className={`text-sm font-semibold transition-colors ${pathname === "/contact" ? "text-[#22C55E]" : "text-[#475569] hover:text-[#22C55E]"}`}>
              Contact
            </Link>
          </li>
          {user && (
            <>

              <li>
                <Link href="/items/add" className={`text-sm font-semibold transition-colors ${pathname === "/items/add" ? "text-[#22C55E]" : "text-[#475569] hover:text-[#22C55E]"}`}>
                  Add Plan
                </Link>
              </li>
              <li>
                <Link href="/items/manage" className={`text-sm font-semibold transition-colors ${pathname === "/items/manage" ? "text-[#22C55E]" : "text-[#475569] hover:text-[#22C55E]"}`}>
                  Manage Plans
                </Link>
              </li>
              <li>
                <Link href="/content" className={`flex items-center gap-1 text-sm font-semibold transition-colors ${pathname === "/content" ? "text-[#22C55E]" : "text-[#475569] hover:text-[#22C55E]"}`}>
                  <PiSparkleFill className="text-[#F59E0B]" /> AI Content
                </Link>
              </li>
              <li>
                <Link href="/chat" className={`flex items-center gap-1 text-sm font-semibold transition-colors ${pathname === "/chat" ? "text-[#22C55E]" : "text-[#475569] hover:text-[#22C55E]"}`}>
                  <PiSparkleFill className="text-[#F59E0B]" /> Coach Chat
                </Link>
              </li>
            </>
          )}
        </ul>

        <div className="hidden items-center gap-4 md:flex">
          {!user ? (
            <>
              <Link href="/auth/login" className="flex items-center gap-1 rounded-xl border border-[#E2E8F0] bg-white px-4 py-2 text-sm font-bold text-[#475569] transition-all hover:bg-[#F8FAFC] hover:text-[#22C55E] hover:border-[#BBF7D0]">
                <LogOutIcon className="rotate-180 text-base" /> Login
              </Link>
              <Link href="/auth/register">
                <Button className="rounded-xl bg-[#22C55E] px-5 py-2 text-sm font-bold text-white shadow-md shadow-[#22C55E]/20 transition-all hover:bg-[#16A34A] cursor-pointer">
                  <CgProfile className="text-base" /> Register
                </Button>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end">
                <span className="text-xs font-black text-[#94A3B8] uppercase tracking-wider leading-none">
                  {user?.role === "admin" ? "Admin" : "Member"}
                </span>
              </div>

              <Dropdown>
                <Dropdown.Trigger className="rounded-full cursor-pointer">
                  <Avatar size="md" aria-label="Menu" className="border border-[#BBF7D0] ring-2 ring-[#F0FDF4] hover:ring-[#BBF7D0] transition-all">
                    <Avatar.Image referrerPolicy="no-referrer" alt={user?.name || "User"} src={user?.image || undefined} />
                    <Avatar.Fallback className="bg-[#F0FDF4] text-[#16A34A] font-bold">{user?.name?.charAt(0) || "U"}</Avatar.Fallback>
                  </Avatar>
                </Dropdown.Trigger>

                <Dropdown.Popover>
                  <div className="px-4 pt-4 pb-2 bg-white border border-[#E2E8F0] text-[#0F172A] rounded-t-xl w-48">
                    <p className="text-xs font-bold truncate">{user?.name}</p>
                    <p className="text-[10px] text-[#94A3B8] truncate mt-0.5">{user?.email}</p>
                  </div>
                  <Dropdown.Menu className="bg-white border-x border-b border-[#E2E8F0] text-[#475569] rounded-b-xl w-48 p-1">

                    <Dropdown.Item id="add-plan" textValue="Add Plan" className="hover:bg-[#F0FDF4] hover:text-[#16A34A] rounded-lg transition-colors">
                      <Link className="flex items-center gap-2 text-xs font-semibold py-1" href="/items/add">
                        <MdAddCircleOutline className="text-[#22C55E] text-sm" /> Add Plan
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item id="manage" textValue="Manage Plans" className="hover:bg-[#F0FDF4] hover:text-[#16A34A] rounded-lg transition-colors">
                      <Link className="flex items-center gap-2 text-xs font-semibold py-1" href="/items/manage">
                        <GiWeightLiftingUp className="text-[#22C55E] text-sm" /> Manage Plans
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item id="logout" textValue="Logout" className="text-[#DC2626] hover:bg-[#FEF2F2] rounded-lg transition-colors" onClick={handleSignOut}>
                      <div className="flex items-center gap-2 text-xs font-semibold py-1"><LogOutIcon className="text-sm" /> Logout</div>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-[#E2E8F0] bg-white md:hidden p-4 space-y-4 animate-fadeIn">
          <ul className="space-y-3">
            <li>
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className={`block text-sm font-semibold p-2 rounded-lg ${pathname === "/" ? "bg-[#F0FDF4] text-[#22C55E]" : "text-[#475569]"}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/plans"
                onClick={() => setIsMenuOpen(false)}
                className={`block text-sm font-semibold p-2 rounded-lg ${pathname === "/plans" ? "bg-[#F0FDF4] text-[#22C55E]" : "text-[#475569]"}`}
              >
                Explore Plans
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                onClick={() => setIsMenuOpen(false)}
                className={`block text-sm font-semibold p-2 rounded-lg ${pathname === "/about" ? "bg-[#F0FDF4] text-[#22C55E]" : "text-[#475569]"}`}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className={`block text-sm font-semibold p-2 rounded-lg ${pathname === "/contact" ? "bg-[#F0FDF4] text-[#22C55E]" : "text-[#475569]"}`}
              >
                Contact
              </Link>
            </li>
            {user && (
              <>

                <li>
                  <Link
                    href="/items/add"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block text-sm font-semibold p-2 rounded-lg ${pathname === "/items/add" ? "bg-[#F0FDF4] text-[#22C55E]" : "text-[#475569]"}`}
                  >
                    Add Plan
                  </Link>
                </li>
                <li>
                  <Link
                    href="/content"
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-1 text-sm font-semibold p-2 rounded-lg ${pathname === "/content" ? "bg-[#F0FDF4] text-[#22C55E]" : "text-[#475569]"}`}
                  >
                    <PiSparkleFill className="text-[#F59E0B]" /> AI Content
                  </Link>
                </li>
                <li>
                  <Link
                    href="/chat"
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-1 text-sm font-semibold p-2 rounded-lg ${pathname === "/chat" ? "bg-[#F0FDF4] text-[#22C55E]" : "text-[#475569]"}`}
                  >
                    <PiSparkleFill className="text-[#F59E0B]" /> Coach Chat
                  </Link>
                </li>
                <li>
                  <Link
                    href="/items/manage"
                    onClick={() => setIsMenuOpen(false)}
                    className={`block text-sm font-semibold p-2 rounded-lg ${pathname === "/items/manage" ? "bg-[#F0FDF4] text-[#22C55E]" : "text-[#475569]"}`}
                  >
                    Manage Plans
                  </Link>
                </li>
              </>
            )}
          </ul>

          <div className="pt-2 border-t border-[#E2E8F0] flex flex-col gap-2">
            {!user ? (
              <>
                <Link href="/auth/login" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center gap-1 rounded-xl border border-[#E2E8F0] bg-white py-2.5 text-sm font-bold text-[#475569]">
                  Login
                </Link>
                <Link href="/auth/register" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full rounded-xl bg-[#22C55E] py-2.5 text-sm font-bold text-white">
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <div className="flex items-center justify-between p-2 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                <div className="flex items-center gap-2.5">
                  <Avatar size="sm">
                    <Avatar.Image referrerPolicy="no-referrer" alt={user?.name || "User"} src={user?.image || undefined} />
                    <Avatar.Fallback className="bg-[#F0FDF4] text-[#16A34A] font-bold">{user?.name?.charAt(0)}</Avatar.Fallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#0F172A] truncate max-w-[100px]">{user?.name}</span>
                    <span className="text-[9px] text-[#22C55E] uppercase font-black tracking-wider">{user?.role || "member"}</span>
                  </div>
                </div>
                <button
                  onClick={() => { handleSignOut(); setIsMenuOpen(false); }}
                  className="p-2 bg-[#FEF2F2] text-[#DC2626] rounded-lg border border-[#FECACA] cursor-pointer"
                >
                  <LogOutIcon />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;