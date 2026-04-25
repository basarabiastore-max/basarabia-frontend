"use client";

/**
 * ═══════════════════════════════════════════════════════════════════
 * PANTRY DOOR REVEAL — cămara se deschide
 * ═══════════════════════════════════════════════════════════════════
 *
 * A cinematic transition that plays when the user clicks "Cumpără
 * Acum" on the homepage. The pantry image splits down the middle —
 * left half slides left, right half slides right — revealing the
 * shop page behind it.
 *
 * Timing:
 *   0.0s  →  Overlay fades in (fade: 0.4s)
 *   0.4s  →  Held still for a breath (0.3s — lets the eye see the pantry)
 *   0.7s  →  Doors split apart (1.0s, ease-out-expo)
 *   1.7s  →  onComplete() fires → router.push('/shop')
 *
 * Integration in 3 steps:
 *
 *   1. Save this file at:
 *        src/app/components/PantryReveal.jsx
 *
 *   2. Save the pantry image at:
 *        public/pantry-natural.jpg
 *
 *   3. In your homepage, wire up the "Cumpără Acum" button:
 *
 *        "use client";
 *        import { useState } from "react";
 *        import { useRouter } from "next/navigation";
 *        import PantryReveal from "./components/PantryReveal";
 *
 *        export default function Home() {
 *          const [revealing, setRevealing] = useState(false);
 *          const router = useRouter();
 *
 *          return (
 *            <>
 *              {/* … existing homepage … */
/*}
 *              <button onClick={() => setRevealing(true)}>
 *                Cumpără Acum
 *              </button>
 *
 *              {revealing && (
 *                <PantryReveal onComplete={() => router.push('/shop')} />
 *              )}
 *            </>
 *          );
 *        }
 *
 * Brand discipline:
 *   - Timing is slow (~1.7s total). Reverent, not snappy.
 *   - Easing is [0.22, 1, 0.36, 1] (ease-out-expo) — cinematic.
 *   - Gold hairline seam in the middle suggests the "crack" opening.
 *   - Backdrop is pure black (matches site).
 * ═══════════════════════════════════════════════════════════════════
 */

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const GOLD = "#D4A017";
const GOLD_DIM = "#8a6a10";
const BLACK = "#000000";

// Total overlay duration before we navigate.
// Fade-in (0.4) + hold (1.4) + split (2.4) = 4.2s
const TOTAL_MS = 4200;

export default function PantryReveal({ onComplete }) {
  // Pick image variant by viewport. Desktop image is portrait-composed
  // for landscape cropping; on mobile portrait it shows windows at top
  // and a dark void below. Mobile variant is composed for portrait.
  const [pantrySrc, setPantrySrc] = useState("/pantry-desktop.jpg");
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setPantrySrc(mq.matches ? "/pantry-mobile.jpg" : "/pantry-desktop.jpg");
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Fire navigation once the animation completes.
  useEffect(() => {
    const id = setTimeout(() => onComplete?.(), TOTAL_MS);
    return () => clearTimeout(id);
  }, [onComplete]);

  // Lock scroll while the overlay is up
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-hidden pointer-events-auto"
      style={{ backgroundColor: BLACK }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* LEFT DOOR — shows the LEFT half of the pantry.
          Starts centered, slides fully off the left edge. */}
      <motion.div
        className="absolute top-0 bottom-0 left-0 w-1/2 overflow-hidden"
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        transition={{
          delay: 1.8,
          duration: 2.4,
          ease: [0.43, 0.13, 0.23, 0.96],
        }}
      >
        {/* Inner wrapper zooms the full image to cover this half-panel.
            Width 200% + positioned so the left half shows. */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${pantrySrc}')`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            width: "200%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      </motion.div>

      {/* RIGHT DOOR — shows the RIGHT half of the pantry.
          Starts centered, slides fully off the right edge. */}
      <motion.div
        className="absolute top-0 bottom-0 right-0 w-1/2 overflow-hidden"
        initial={{ x: 0 }}
        animate={{ x: "100%" }}
        transition={{
          delay: 1.8,
          duration: 2.4,
          ease: [0.43, 0.13, 0.23, 0.96],
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${pantrySrc}')`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            width: "200%",
            height: "100%",
            position: "absolute",
            top: 0,
            right: 0,
          }}
        />
      </motion.div>
    </motion.div>
  );
}
