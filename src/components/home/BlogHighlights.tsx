"use client";

import React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Clock, ArrowRight, ArrowUpRight } from "lucide-react";

// ১. পোস্ট অবজেক্টের ভেতরের অথরের জন্য ইন্টারফেস
interface Author {
  name: string;
  avatarUrl: string;
}

// ২. মূল পোস্ট অবজেক্টের জন্য ইন্টারফেস
interface Post {
  _id: string;
  title: string;
  excerpt: string;
  category: string;
  coverImage: string;
  readTimeMinutes: number;
  author: Author;
}

const posts: Post[] = [
  {
    _id: "1",
    title: "5 Beginner Mistakes That Slow Down Muscle Growth",
    excerpt:
      "Avoid these common training errors that quietly stall your progress in the first few months.",
    category: "Workouts",
    coverImage:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
    readTimeMinutes: 6,
    author: {
      name: "Rafiq Ahmed",
      avatarUrl: "https://i.pravatar.cc/150?img=12",
    },
  },
  {
    _id: "2",
    title: "How Much Protein Do You Actually Need?",
    excerpt:
      "Cutting through the noise around protein intake recommendations for active individuals.",
    category: "Nutrition",
    coverImage:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80",
    readTimeMinutes: 5,
    author: {
      name: "Dr. Nusrat Jahan",
      avatarUrl: "https://i.pravatar.cc/150?img=32",
    },
  },
  {
    _id: "3",
    title: "The Mental Side of Sticking to a Fitness Routine",
    excerpt:
      "Discipline isn't about motivation — it's about building systems that outlast your mood.",
    category: "Mindset",
    coverImage:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600&q=80",
    readTimeMinutes: 7,
    author: {
      name: "Tanvir Hossain",
      avatarUrl: "https://i.pravatar.cc/150?img=45",
    },
  },
];

// ৩. Framer Motion ভ্যারিয়েন্টস টাইপ নির্দিষ্ট করে দেওয়া হলো
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

// ৪. BlogCard প্রপসের টাইপ ডিফাইন করা হলো
interface BlogCardProps {
  post: Post;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => (
  <motion.div
    variants={cardVariants}
    whileHover={{ y: -4 }}
    className="group rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md hover:border-[#22C55E]/40 transition-all"
  >
    <Link href={`/blog/${post._id}`}>
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm text-[11px] font-semibold text-[#0F172A]">
          {post.category}
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2.5">
          <Clock className="w-3.5 h-3.5" />
          {post.readTimeMinutes} min read
        </div>

        <h3 className="text-base font-semibold text-[#0F172A] leading-snug line-clamp-2 mb-2 group-hover:text-[#22C55E] transition-colors">
          {post.title}
        </h3>

        <p className="text-sm text-slate-500 line-clamp-2 mb-4">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <img
              src={post.author.avatarUrl}
              alt={post.author.name}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-xs font-medium text-slate-600">
              {post.author.name}
            </span>
          </div>
          <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#22C55E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </div>
      </div>
    </Link>
  </motion.div>
);

const BlogHighlights: React.FC = () => {
  return (
    <section className="relative w-full bg-[#F8FAFC] py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12"
        >
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22C55E]/10 text-[#16833E] text-xs font-semibold tracking-wide uppercase mb-4">
              From The Blog
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
              Training and nutrition, explained simply
            </h2>
            <p className="mt-3 text-slate-600 text-base max-w-lg">
              Written by our coaches and dietitians — no clickbait, just what
              actually works.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0F172A] hover:text-[#22C55E] transition-colors shrink-0"
          >
            View all articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {posts.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BlogHighlights;