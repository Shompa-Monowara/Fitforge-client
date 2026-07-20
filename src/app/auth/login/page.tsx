"use client";

import { authClient } from "@/lib/auth-client";
import {
  Description,
  FieldError,
  Fieldset,
  Form,
  Input,
  Label,
  Surface,
  TextField,
} from "@heroui/react";
import NextLink from "next/link";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FiLogIn } from "react-icons/fi";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const emailValue = formData.get("email") as string;
    const passwordValue = formData.get("password") as string;

    const { error } = await authClient.signIn.email({
      email: emailValue,
      password: passwordValue,
      callbackURL: "/",
    });

    if (error) {
      toast.error(error.message || "Login failed. Please try again.");
    } else {
      toast.success("Welcome back!");
    }
  };

  const handleGoogleSignIn = async () => {
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });

    if (error) {
      toast.error(error.message || "Google sign-in failed.");
    }
  };

  const fillDemoMember = () => {
    setEmail("member@fitforge.ai");
    setPassword("Member12345");
  };

  const fillDemoTrainer = () => {
    setEmail("trainer@fitforge.ai");
    setPassword("Trainer12345");
  };

  const inputClassName =
    "bg-white border border-[#E2E8F0] hover:border-[#86EFAC] focus:!border-[#22C55E] focus:outline-none transition-all h-12 px-4 rounded-xl text-[#0F172A] placeholder:text-[#94A3B8] text-[15px] w-full";

  return (
    <div className="w-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] py-12 bg-[#F8FAFC] relative">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-[#F59E0B]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md mx-auto rounded-3xl bg-white border border-[#E2E8F0] p-8 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] relative z-10">
        <Surface className="w-full bg-transparent">
          <Form onSubmit={onSubmit} className="space-y-6">
            <Fieldset className="w-full space-y-5">
              <div className="text-center w-full flex flex-col items-center justify-center mb-2">
                <Fieldset.Legend className="text-3xl font-black text-[#0F172A] block w-full text-center tracking-tight">
                  Welcome Back
                </Fieldset.Legend>
                <Description className="text-[#94A3B8] text-xs mt-1 block">
                  Login to continue your fitness journey
                </Description>
              </div>

              {/* Demo Login Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={fillDemoMember}
                  className="flex-1 border border-[#BBF7D0] bg-white text-[#16A34A] hover:bg-[#F0FDF4] text-xs font-bold h-10 rounded-xl transition-all cursor-pointer"
                >
                  Demo Member
                </button>
                <button
                  type="button"
                  onClick={fillDemoTrainer}
                  className="flex-1 border border-[#FDE68A] bg-white text-[#B45309] hover:bg-[#FFFBEB] text-xs font-bold h-10 rounded-xl transition-all cursor-pointer"
                >
                  Demo Trainer
                </button>
              </div>

              <div className="space-y-5">
                <TextField isRequired name="email" type="email" className="flex flex-col gap-1.5">
                  <Label className="text-[10px] font-black text-[#22C55E] tracking-widest uppercase">
                    Email Address
                  </Label>
                  <Input
                    placeholder="you@example.com"
                    className={inputClassName}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <FieldError className="text-[#DC2626] text-xs mt-1" />
                </TextField>

                <TextField isRequired name="password" type="password" className="flex flex-col gap-1.5">
                  <Label className="text-[10px] font-black text-[#22C55E] tracking-widest uppercase">
                    Password
                  </Label>
                  <Input
                    placeholder="••••••••"
                    className={inputClassName}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <FieldError className="text-[#DC2626] text-xs mt-1" />
                </TextField>
              </div>

              <button
                type="submit"
                className="w-full bg-[#22C55E] font-bold text-white h-12 rounded-xl shadow-md shadow-[#22C55E]/20 hover:bg-[#16A34A] transition-all flex items-center justify-center gap-2 text-sm mt-6 cursor-pointer"
              >
                <FiLogIn className="text-base" /> Log In
              </button>
            </Fieldset>
          </Form>

          <div className="mt-6 space-y-5">
            <div className="flex items-center">
              <div className="flex-grow border-t border-[#E2E8F0]"></div>
              <span className="px-3 text-[10px] text-[#94A3B8] font-bold uppercase tracking-widest whitespace-nowrap">
                or continue with
              </span>
              <div className="flex-grow border-t border-[#E2E8F0]"></div>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A] 
              font-bold h-12 rounded-xl transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
              <FcGoogle className="text-xl" />
              Sign In with Google
            </button>

            <div className="text-center text-xs text-[#94A3B8] font-medium">
              Don&apos;t have an account?{" "}
              <NextLink
                href="/register"
                className="text-[#22C55E] font-black ml-1 uppercase text-[11px] tracking-wider hover:text-[#16A34A]"
              >
                Register here
              </NextLink>
            </div>
          </div>
        </Surface>
      </div>
    </div>
  );
}