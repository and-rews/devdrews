import { NextApiRequest, NextApiResponse } from "next";
import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
  ];

  const stream = new SitemapStream({ hostname: "https://devdrews.com" });

  res.writeHead(200, {
    "Content-Type": "application/xml",
  });

  const xmlString = await streamToPromise(
    Readable.from(pages).pipe(stream)
  ).then((data) => data.toString());

  res.end(xmlString);
}
