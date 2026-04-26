import { Geist, Geist_Mono, Cinzel_Decorative } from "next/font/google";
import "./globals.css";
import PageTransition from "./PageTransition";
import SoundToggle from "./components/SoundToggle";
import TantiOlgutaWidget from "./components/TantiOlgutaWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cinzelDecorative = Cinzel_Decorative({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata = {
  title: "Basarabia Concept Store — Eastern European Grocery, Spalding UK",
  description: "Your taste of Eastern Europe, right here in Spalding. Authentic Romanian, Moldovan and Eastern European groceries delivered with heart.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cinzelDecorative.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <PageTransition>{children}</PageTransition>
        <SoundToggle />
        <TantiOlgutaWidget />
      </body>
    </html>
  );
}
