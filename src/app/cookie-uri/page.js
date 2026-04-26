import LegalPage from '../components/LegalPage'

export const metadata = {
  title: 'Politica privind Cookie-urile — Basarabia Concept Store',
  description: 'Ce sunt cookie-urile, pe care le folosim, și cum poți să-ți gestionezi preferințele.',
}

export default function CookieUri() {
  return (
    <LegalPage
      titleRo="Politica privind Cookie-urile"
      titleEn="Cookie Policy"
      lastUpdatedRo="Ultima actualizare: 26 aprilie 2026"
      lastUpdatedEn="Last updated: 26 April 2026"
      contentRo={<CookieRo />}
      contentEn={<CookieEn />}
    />
  )
}

function CookieRo() {
  return (
    <>
      <p>Această pagină explică ce sunt cookie-urile, pe care dintre ele le folosim, și cum poți să-ți gestionezi preferințele.</p>

      <h2>Ce sunt cookie-urile</h2>
      <p>Cookie-urile sunt fișiere text mici pe care site-urile le pun pe dispozitivul tău (telefon, tabletă, calculator) când vizitezi un site. Ne ajută să-ți reținem preferințele și să facem site-ul să funcționeze corect.</p>

      <h2>Cookie-urile pe care le folosim</h2>
      <p><strong>Esențiale</strong> (nu necesită consimțământ — fără ele, site-ul nu funcționează):</p>
      <ul>
        <li>Cookie-uri de sesiune pentru coșul de cumpărături</li>
        <li>Cookie-uri de securitate</li>
      </ul>
      <p><strong>Analitice</strong> (necesită consimțământul tău):</p>
      <ul>
        <li>Date anonime despre cum este folosit site-ul, pentru a-l îmbunătăți</li>
        <li>Furnizor: Vercel Analytics</li>
      </ul>
      <p><strong>Marketing</strong> — nu folosim niciun cookie de marketing sau de retargeting în acest moment. Dacă acest lucru se schimbă, te informăm și îți cerem consimțământul.</p>

      <h2>Cum gestionezi preferințele</h2>
      <p>Prima dată când vizitezi site-ul, îți cerem consimțământul pentru cookie-urile non-esențiale. Poți modifica preferințele oricând prin butonul „Cookie-uri" din subsolul site-ului.</p>
      <p>De asemenea, poți bloca sau șterge cookie-urile direct din setările browserului tău. Detalii pentru fiecare browser principal:</p>
      <ul>
        <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Chrome</a></li>
        <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a></li>
        <li><a href="https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox" target="_blank" rel="noopener noreferrer">Firefox</a></li>
        <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">Edge</a></li>
      </ul>
      <p>Notă: dacă blochezi cookie-urile esențiale, site-ul nu va funcționa corect (nu vei putea adăuga produse în coș).</p>

      <h2>Modificări</h2>
      <p>Vom actualiza această politică dacă schimbăm cookie-urile pe care le folosim. Versiunea curentă este afișată aici, cu data ultimei actualizări sus.</p>
    </>
  )
}

function CookieEn() {
  return (
    <>
      <p>This page explains what cookies are, which ones we use, and how to manage your preferences.</p>

      <h2>What cookies are</h2>
      <p>Cookies are small text files that websites place on your device (phone, tablet, computer) when you visit. They help us remember your preferences and make the site work properly.</p>

      <h2>Cookies we use</h2>
      <p><strong>Essential</strong> (no consent needed — the site won&rsquo;t work without them):</p>
      <ul>
        <li>Session cookies for your shopping basket</li>
        <li>Security cookies</li>
      </ul>
      <p><strong>Analytics</strong> (require your consent):</p>
      <ul>
        <li>Anonymous data about how the site is used, to help us improve it</li>
        <li>Provider: Vercel Analytics</li>
      </ul>
      <p><strong>Marketing</strong> — we don&rsquo;t use any marketing or retargeting cookies at this time. If that changes, we&rsquo;ll let you know and ask for your consent.</p>

      <h2>How to manage preferences</h2>
      <p>The first time you visit the site, we ask for consent for non-essential cookies. You can change your preferences at any time via the &ldquo;Cookies&rdquo; button in the site footer.</p>
      <p>You can also block or delete cookies directly from your browser settings. Instructions for each major browser:</p>
      <ul>
        <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Chrome</a></li>
        <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a></li>
        <li><a href="https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox" target="_blank" rel="noopener noreferrer">Firefox</a></li>
        <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">Edge</a></li>
      </ul>
      <p>Note: if you block essential cookies, the site won&rsquo;t work correctly (you won&rsquo;t be able to add products to your basket).</p>

      <h2>Changes</h2>
      <p>We&rsquo;ll update this policy if we change which cookies we use. The current version is shown here, with the date of the last update at the top.</p>
    </>
  )
}
