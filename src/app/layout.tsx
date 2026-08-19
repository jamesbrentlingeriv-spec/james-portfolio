import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import GlobalMusicPlayer from "@/components/GlobalMusicPlayer";
import ScrollToTop from "@/components/ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "James | Developer, Author, and Musician | iamjames.lol",
  description: "A premium glassmorphic personal portfolio for James. Blending systems C++ engineering, spec-fi literature, and synthwave compositions.",
  openGraph: {
    title: "James | iamjames.lol Portfolio",
    description: "Systems developer, speculative fiction author, and synthwave musician.",
    url: "https://iamjames.lol",
    siteName: "iamjames.lol",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "James | iamjames.lol Portfolio",
    description: "Systems developer, speculative fiction author, and synthwave musician.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col relative">
        <ThemeProvider>
          <ScrollToTop />
          <main className="flex-grow">
            {children}
          </main>
          {/* Persistent Floating Island Music Player */}
          <GlobalMusicPlayer />
        </ThemeProvider>
      </body>
    </html>
  );
}
