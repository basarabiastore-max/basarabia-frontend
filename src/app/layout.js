import { Geist, Geist_Mono, Cinzel_Decorative } from "next/font/google";
import "./globals.css";
import PageTransition from "./PageTransition";
import SoundToggle from "./components/SoundToggle";
import TantiOlgutaWidget from "./components/TantiOlgutaWidget";
import { CartProvider } from "./components/cart/CartContext";
import CartDrawer from "./components/cart/CartDrawer";
import SearchOverlay from "./components/SearchOverlay";

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
  manifest: "/manifest.json",
  icons: {
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  appleWebApp: {
    capable: true,
  },
  other: {
    // `appleWebApp.capable` emits only the standardised `mobile-web-app-capable`
    // in Next 16; older iOS still reads the legacy Apple-prefixed name.
    "apple-mobile-web-app-capable": "yes",
  },
};

// themeColor belongs to the viewport export — deprecated in `metadata` since Next 14.
export const viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cinzelDecorative.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <PageTransition>{children}</PageTransition>
          <SoundToggle />
          <TantiOlgutaWidget />
          <CartDrawer />
          <SearchOverlay />
        </CartProvider>
      </body>
    </html>
  );
}
