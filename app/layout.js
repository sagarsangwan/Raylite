import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Raylight – Code in Style | Syntax Highlighted Code Snapshots",
  description:
    "Raylight helps developers create beautiful code snippets with syntax highlighting, custom themes, and export options. Perfect for social media, blogs, and documentation.",
  metadataBase: new URL("https://raylight.vercel.app"),
  alternates: {
    canonical: "https://raylight.vercel.app",
  },
  keywords: [
    "Raylight",
    "Code to Image",
    "Syntax Highlighting",
    "Code Snippet Generator",
    "Export Code as PNG",
    "Code Snippet Tool",
    "Code Screenshot",
    "Blog Code Image",
    "Share Code Snippets",
    "Beautiful Code Snippets",
  ],
  verification: {
    google: "YOUR-GOOGLE-SITE-VERIFICATION-CODE",
  },
  openGraph: {
    title: "Raylight – Code in Style",
    description:
      "Generate stylish code snippets for your blogs, Twitter, LinkedIn, or portfolio using Raylight. Choose language, font, theme, and export in seconds.",
    url: "https://raylight.vercel.app",
    type: "website",
    siteName: "Raylight",
    images: [
      {
        url: "https://raylight.vercel.app/og-image.png", // make sure this image exists
        width: 1200,
        height: 630,
        alt: "Raylight – Export Code Snippets as Images",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@iamsagarsangwan", // replace with your Twitter
    title: "Raylight – Beautiful Code Snapshots for Developers",
    description:
      "Create and share beautiful code snippets with Raylight. Choose syntax themes, fonts, and export in seconds.",
    image: "https://raylight.vercel.app/og-image.png",
  },
  structuredData: {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Raylight",
    url: "https://raylight.vercel.app",
    applicationCategory: "DeveloperTool",
    operatingSystem: "All",
    description:
      "Raylight is a developer tool for generating beautiful syntax-highlighted code snippets as images. Ideal for blogs, portfolios, and social sharing.",
    image: "https://raylight.vercel.app/og-image.png",
    creator: {
      "@type": "Person",
      name: "Sagar Sangwan",
      url: "https://sagarsangwan.vercel.app",
    },
    inLanguage: "en",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Providers>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
          <Toaster position="top-right" richColors />{" "}
        </body>
      </Providers>
    </html>
  );
}
