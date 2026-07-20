"use client";

import { addItem } from "@/lib/action/plans";
import { AddItemPayload } from "@/types";
import {
  FieldError,
  Fieldset,
  Form,
  Input,
  Label,
  Surface,
  TextField,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { FiLoader } from "react-icons/fi";
import { GiWeightLiftingUp } from "react-icons/gi";

export default function AddItemPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shortDescription, setShortDescription] = useState("");

  const inputClassName =
    "bg-white border border-[#E2E8F0] hover:border-[#86EFAC] focus:!border-[#22C55E] focus:outline-none transition-all h-12 px-4 rounded-xl text-[#0F172A] placeholder:text-[#94A3B8] text-[15px] w-full";

  const textareaClassName =
    "bg-white border border-[#E2E8F0] hover:border-[#86EFAC] focus:!border-[#22C55E] focus:outline-none transition-all px-4 py-3 rounded-xl text-[#0F172A] placeholder:text-[#94A3B8] text-[15px] w-full resize-none";

  const labelClassName = "text-[10px] font-black text-[#22C55E] tracking-widest uppercase";

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const fullDescription = formData.get("fullDescription") as string;
    const goal = formData.get("goal") as string;
    const difficulty = formData.get("difficulty") as string;
    const durationWeeks = Number(formData.get("durationWeeks"));
    const image = formData.get("image") as string;

    if (title.trim().length < 5) {
      toast.error("Title must be at least 5 characters.");
      setIsSubmitting(false);
      return;
    }

    if (shortDescription.trim().length === 0) {
      toast.error("Short description is required.");
      setIsSubmitting(false);
      return;
    }

    if (fullDescription.trim().length < 50) {
      toast.error("Full description must be at least 50 characters.");
      setIsSubmitting(false);
      return;
    }

    const payload: AddItemPayload = {
      title,
      shortDescription,
      fullDescription,
      goal,
      difficulty,
      durationWeeks,
      images: image ? [image] : [],
    };

    const result = await addItem(payload);
    setIsSubmitting(false);

    if (!result.success) {
      toast.error(result.message || "Failed to publish plan.");
      return;
    }

    toast.success("Plan published successfully!");
    router.push("/items/manage");
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-12 min-h-[calc(100vh-80px)] bg-[#F8FAFC]">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#0F172A] to-[#22C55E] shadow-md shadow-[#22C55E]/25 mb-4">
          <GiWeightLiftingUp className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-3xl font-black text-[#0F172A] tracking-tight">
          Add a New Plan
        </h1>
        <p className="text-[#94A3B8] text-sm mt-2">
          Publish a workout or nutrition plan for the FitForge community to explore.
        </p>
      </div>

      <div className="bg-white border border-[#E2E8F0] rounded-3xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]">
        <Surface className="w-full bg-transparent">
          <Form onSubmit={onSubmit} className="space-y-6">
            <Fieldset className="w-full space-y-6">
              {/* Title */}
              <TextField isRequired name="title" type="text" className="flex flex-col gap-1.5">
                <Label className={labelClassName}>Title</Label>
                <Input placeholder="e.g. 8-Week Fat Loss Kickstart" className={inputClassName} />
                <FieldError className="text-[#DC2626] text-xs mt-1" />
              </TextField>

              {/* Short Description */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <Label className={labelClassName}>Short Description</Label>
                  <span className="text-[10px] text-[#94A3B8] font-semibold">
                    {shortDescription.length}/150
                  </span>
                </div>
                <textarea
                  name="shortDescription"
                  rows={2}
                  maxLength={150}
                  required
                  placeholder="A one-line summary shown on the plan card"
                  className={textareaClassName}
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                />
              </div>

              {/* Full Description */}
              <div className="flex flex-col gap-1.5">
                <Label className={labelClassName}>Full Description</Label>
                <textarea
                  name="fullDescription"
                  rows={6}
                  required
                  minLength={50}
                  placeholder="Describe the plan in detail — structure, expected results, who it's for..."
                  className={textareaClassName}
                />
              </div>

              {/* Goal + Difficulty */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <Label className={labelClassName}>Goal</Label>
                  <select name="goal" required defaultValue="Weight Loss" className={inputClassName}>
                    <option value="Weight Loss">Weight Loss</option>
                    <option value="Muscle Gain">Muscle Gain</option>
                    <option value="Endurance">Endurance</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label className={labelClassName}>Difficulty</Label>
                  <select name="difficulty" required defaultValue="Beginner" className={inputClassName}>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              {/* Duration + Image URL */}
             {/* Duration + Image URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <Label className={labelClassName}>Duration (weeks)</Label>
                  <input
                    type="number"
                    name="durationWeeks"
                    required
                    min={1}
                    max={52}
                    defaultValue={4}
                    className={inputClassName}
                  />
                </div>

                <TextField name="image" type="url" className="flex flex-col gap-1.5">
                  <Label className={labelClassName}>Image URL (Optional)</Label>
                  <Input placeholder="https://example.com/plan-cover.jpg" className={inputClassName} />
                  <FieldError className="text-[#DC2626] text-xs mt-1" />
                </TextField>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-[#22C55E] font-bold text-white h-12 rounded-xl shadow-md shadow-[#22C55E]/20 hover:bg-[#16A34A] transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <FiLoader className="animate-spin text-base" /> Publishing...
                    </>
                  ) : (
                    "Publish Plan"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="flex-1 sm:flex-none sm:px-8 border border-[#E2E8F0] bg-white text-[#475569] font-bold h-12 rounded-xl hover:bg-[#F8FAFC] transition-all text-sm cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </Fieldset>
          </Form>
        </Surface>
      </div>
    </div>
  );
}