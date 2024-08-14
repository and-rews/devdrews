import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import { Particles } from "@/components/Particles";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "DevDrews - Ethical Hacker & Penetration Tester",
    template: "%s | DevDrews",
  },
  description:
    "Portfolio of Andrews, an ethical hacker and penetration tester dedicated to improving cybersecurity through innovative solutions and continuous learning.",
  keywords: [
    "ethical hacker",
    "penetration tester",
    "cybersecurity",
    "software engineer",
    "DevDrews",
    "Andrews",
  ],
  authors: [{ name: "Andrews", url: "https://devdrews.com" }],
  creator: "Andrews",
  publisher: "DevDrews",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://devdrews.com",
    siteName: "DevDrews",
    title: "DevDrews - Ethical Hacker & Penetration Tester",
    description:
      "Portfolio of Andrews, an ethical hacker and penetration tester dedicated to improving cybersecurity through innovative solutions and continuous learning.",
    images: [
      {
        url: "https://devdrews.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DevDrews - Ethical Hacker & Penetration Tester",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DevDrews - Ethical Hacker & Penetration Tester",
    description:
      "Portfolio of Andrews, an ethical hacker and penetration tester dedicated to improving cybersecurity through innovative solutions and continuous learning.",
    images: ["https://devdrews.com/twitter-image.jpg"],
    creator: "@devdrews",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen">
            <Particles className="absolute inset-0 -z-10" quantity={100} />
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow container mx-auto px-4 py-8">
                {children}
              </main>
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
