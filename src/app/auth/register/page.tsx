"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  Fieldset,
  Form,
  Input,
  Label,
  Surface,
  TextField,
  Link,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const router = useRouter();
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [termsError, setTermsError] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!agreedToTerms) {
      setTermsError(true);
      toast.error("Please agree to the Terms & Conditions to continue.");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const image = formData.get("image") as string;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
      image: image || undefined,
    });

    if (error) {
      toast.error(error.message || "Signup failed. Please try again.");
      return;
    }

    toast.success("Account created successfully!");
    await authClient.signOut();

    router.push("/login");
  };

  const handleGoogleSignUp = async () => {
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });

    if (error) {
      toast.error(error.message || "Google sign-up failed.");
    }
  };

  const inputClassName =
    "bg-white border border-[#E2E8F0] hover:border-[#86EFAC] focus:!border-[#22C55E] focus:outline-none transition-all h-12 px-4 rounded-xl text-[#0F172A] placeholder:text-[#94A3B8] text-[15px] w-full";

  return (
    <div className="w-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] py-12 bg-[#F8FAFC] relative">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-[#22C55E]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-xl mx-auto rounded-3xl bg-white border border-[#E2E8F0] p-8 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] relative z-10">
        <Surface className="w-full bg-transparent">
          <Form onSubmit={onSubmit} className="space-y-6">
            <Fieldset className="w-full space-y-5">
              <div className="text-center w-full mb-2">
                <Fieldset.Legend className="text-3xl font-black text-[#0F172A] block w-full text-center tracking-tight">
                  Create Account
                </Fieldset.Legend>
                <Description className="text-[#94A3B8] text-xs mt-1 block">
                  Join FitForge AI and start your personalized fitness journey
                </Description>
              </div>

              <div className="space-y-5">
                <TextField isRequired name="name" type="text" className="flex flex-col gap-1.5">
                  <Label className="text-[10px] font-black text-[#22C55E] tracking-widest uppercase">
                    Full Name
                  </Label>
                  <Input placeholder="John Doe" className={inputClassName} minLength={3} />
                  <FieldError className="text-[#DC2626] text-xs mt-1" />
                </TextField>

                <TextField name="image" type="url" className="flex flex-col gap-1.5">
                  <Label className="text-[10px] font-black text-[#22C55E] tracking-widest uppercase">
                    Profile Image URL (Optional)
                  </Label>
                  <Input placeholder="https://example.com/avatar.jpg" className={inputClassName} />
                  <FieldError className="text-[#DC2626] text-xs mt-1" />
                </TextField>

                <TextField isRequired name="email" type="email" className="flex flex-col gap-1.5">
                  <Label className="text-[10px] font-black text-[#22C55E] tracking-widest uppercase">
                    Email Address
                  </Label>
                  <Input placeholder="john@example.com" className={inputClassName} />
                  <FieldError className="text-[#DC2626] text-xs mt-1" />
                </TextField>

                <TextField isRequired name="password" type="password" className="flex flex-col gap-1.5">
                  <Label className="text-[10px] font-black text-[#22C55E] tracking-widest uppercase">
                    Password
                  </Label>
                  <Input placeholder="••••••••" className={inputClassName} minLength={6} />
                  <FieldError className="text-[#DC2626] text-xs mt-1" />
                </TextField>

                <TextField isRequired name="confirmPassword" type="password" className="flex flex-col gap-1.5">
                  <Label className="text-[10px] font-black text-[#22C55E] tracking-widest uppercase">
                    Confirm Password
                  </Label>
                  <Input placeholder="••••••••" className={inputClassName} minLength={6} />
                  <FieldError className="text-[#DC2626] text-xs mt-1" />
                </TextField>

                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => {
                      setAgreedToTerms(e.target.checked);
                      setTermsError(false);
                    }}
                    className="mt-0.5 h-4 w-4 rounded border-[#E2E8F0] text-[#22C55E] focus:ring-[#22C55E] cursor-pointer"
                  />
                  <span className={`text-xs ${termsError ? "text-[#DC2626]" : "text-[#475569]"}`}>
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-[#22C55E] font-bold hover:text-[#16A34A] underline underline-offset-2"
                    >
                      Terms &amp; Conditions
                    </Link>
                  </span>
                </label>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#22C55E] font-bold text-sm text-white py-3 rounded-xl shadow-md shadow-[#22C55E]/20 hover:bg-[#16A34A] transition-all mt-6 cursor-pointer"
              >
                Create Account
              </Button>
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

            <Button
              onClick={handleGoogleSignUp}
              className="w-full border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A] font-bold h-12 rounded-xl transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
              <FcGoogle className="text-xl" />
              Sign Up with Google
            </Button>

            <div className="text-center text-xs text-[#94A3B8] font-medium">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#22C55E] font-black ml-1 uppercase text-[11px] tracking-wider hover:text-[#16A34A]"
              >
                Log in here
              </Link>
            </div>
          </div>
        </Surface>
      </div>
    </div>
  );
}