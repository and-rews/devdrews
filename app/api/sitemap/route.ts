// app/api/sitemap/route.ts
import { NextResponse } from "next/server";
import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function GET() {
  // Fetch dynamic pages (e.g., blog posts)
  const blogPosts = await getDocs(collection(db, "blogs"));
  const blogUrls = blogPosts.docs.map((doc) => ({
    url: `/blog/${doc.id}`,
    changefreq: "weekly",
    priority: 0.7,
  }));

  const pages = [
    { url: "/", changefreq: "daily", priority: 1 },
    { url: "/about", changefreq: "weekly", priority: 0.8 },
    { url: "/projects", changefreq: "weekly", priority: 0.8 },
    { url: "/blog", changefreq: "daily", priority: 0.9 },
    ...blogUrls,
    { url: "/contact", changefreq: "weekly", priority: 0.8 },
  ];

  const stream = new SitemapStream({ hostname: "https://devdrews.com" });

  const xmlString = await streamToPromise(
    Readable.from(pages).pipe(stream)
  ).then((data) => data.toString());

  return new NextResponse(xmlString, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
