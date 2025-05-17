import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Raylite – Code in Style | Syntax Highlighted Code Snapshots",
  description:
    "Raylite helps developers create beautiful code snippets with syntax highlighting, custom themes, and export options. Perfect for social media, blogs, and documentation.",
  metadataBase: new URL("https://raylite.vercel.app"),
  alternates: {
    canonical: "https://raylite.vercel.app",
  },
  keywords: [
    "Raylite",
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
    title: "Raylite – Code in Style",
    description:
      "Generate stylish code snippets for your blogs, Twitter, LinkedIn, or portfolio using Raylite. Choose language, font, theme, and export in seconds.",
    url: "https://raylite.vercel.app",
    type: "website",
    siteName: "Raylite",
    images: [
      {
        url: "https://raylite.vercel.app/og-image.png", // make sure this image exists
        width: 1200,
        height: 630,
        alt: "Raylite – Export Code Snippets as Images",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@iamsagarsangwan", // replace with your Twitter
    title: "Raylite – Beautiful Code Snapshots for Developers",
    description:
      "Create and share beautiful code snippets with Raylite. Choose syntax themes, fonts, and export in seconds.",
    image: "https://raylite.vercel.app/og-image.png",
  },
  structuredData: {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Raylite",
    url: "https://raylite.vercel.app",
    applicationCategory: "DeveloperTool",
    operatingSystem: "All",
    description:
      "Raylite is a developer tool for generating beautiful syntax-highlighted code snippets as images. Ideal for blogs, portfolios, and social sharing.",
    image: "https://raylite.vercel.app/og-image.png",
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
          className={`${geistSans.variable} ${geistMono.variable} antialiased text-xs md:text-sm `}
        >
          {children}
          <Toaster position="top-right" richColors />{" "}
        </body>
        {process.env.NODE_ENV === "production" && (
          <Script id="clarity_script_script" strategy="afterInteractive">
            {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "rks1x59zk1");
          `}
          </Script>
        )}
      </Providers>
    </html>
  );
}
