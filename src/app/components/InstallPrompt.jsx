"use client";

import { useEffect, useState } from "react";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [show, setShow] = useState(false);
  const [showIosHelp, setShowIosHelp] = useState(false);
  const [isIos, setIsIos] = useState(false);

  useEffect(() => {
    // Nu arăta dacă e deja instalată ca aplicație
    if (window.matchMedia("(display-mode: standalone)").matches) return;
    if (window.navigator.standalone === true) return;
    // Nu arăta dacă a fost închis în sesiunea asta
    if (sessionStorage.getItem("pwa-prompt-dismissed") === "1") return;

    const ua = window.navigator.userAgent;
    const ios = /iPhone|iPad|iPod/i.test(ua);
    setIsIos(ios);

    if (ios) {
      // iOS nu are beforeinstallprompt — arătăm butonul cu instrucțiuni
      setShow(true);
      return;
    }

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShow(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const dismiss = () => {
    sessionStorage.setItem("pwa-prompt-dismissed", "1");
    setShow(false);
    setShowIosHelp(false);
  };

  const install = async () => {
    if (isIos) {
      setShowIosHelp(true);
      return;
    }
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") setShow(false);
    setDeferredPrompt(null);
  };

  if (!show) return null;

  const gold = "#D4A017";

  return (
    <>
      <div
        style={{
          position: "fixed",
          bottom: "1.4rem",
          right: "1.4rem",
          zIndex: 110,
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
        }}
      >
        <button
          onClick={install}
          aria-label="Instalează aplicația Basarabia"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.7rem 1.1rem",
            borderRadius: "999px",
            border: `1px solid rgba(212,160,23,0.45)`,
            background: "linear-gradient(145deg, #1e1208 0%, #140d06 100%)",
            color: gold,
            fontSize: "0.9rem",
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 4px 24px rgba(0,0,0,0.55)",
          }}
        >
          <span aria-hidden="true">📲</span>
          <span>Instalează aplicația</span>
        </button>
        <button
          onClick={dismiss}
          aria-label="Închide"
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            border: "1px solid rgba(212,160,23,0.3)",
            background: "linear-gradient(145deg, #1e1208 0%, #140d06 100%)",
            color: gold,
            fontSize: "0.75rem",
            lineHeight: 1,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ✕
        </button>
      </div>

      {showIosHelp && (
        <div
          onClick={() => setShowIosHelp(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 120,
            background: "rgba(0,0,0,0.65)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "340px",
              borderRadius: "16px",
              border: `1px solid rgba(212,160,23,0.45)`,
              background: "linear-gradient(145deg, #1e1208 0%, #140d06 100%)",
              color: "#f5ecd7",
              padding: "1.4rem",
              textAlign: "center",
              boxShadow: "0 8px 40px rgba(0,0,0,0.7)",
            }}
          >
            <p style={{ margin: "0 0 0.6rem", fontWeight: 700, color: gold }}>
              Instalează Basarabia pe iPhone
            </p>
            <p style={{ margin: "0 0 0.4rem", fontSize: "0.9rem", lineHeight: 1.5 }}>
              Apasă <strong>Share</strong> (pătratul cu săgeată ⬆️) apoi{" "}
              <strong>„Add to Home Screen"</strong>.
            </p>
            <p style={{ margin: "0 0 1rem", fontSize: "0.8rem", opacity: 0.75 }}>
              Tap Share, then "Add to Home Screen".
            </p>
            <button
              onClick={() => setShowIosHelp(false)}
              style={{
                padding: "0.5rem 1.4rem",
                borderRadius: "999px",
                border: `1px solid rgba(212,160,23,0.45)`,
                background: "transparent",
                color: gold,
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Am înțeles
            </button>
          </div>
        </div>
      )}
    </>
  );
}
