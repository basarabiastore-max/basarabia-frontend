import LegalPage from '../components/LegalPage'

export const metadata = {
  title: 'Livrare — Basarabia Concept Store',
  description: 'Zone de livrare, costuri, programe și ambalare.',
}

export default function Livrare() {
  return (
    <LegalPage
      titleRo="Livrare"
      titleEn="Delivery"
      lastUpdatedRo="Ultima actualizare: 26 aprilie 2026"
      lastUpdatedEn="Last updated: 26 April 2026"
      contentRo={<DeliveryRo />}
      contentEn={<DeliveryEn />}
    />
  )
}

function DeliveryRo() {
  return (
    <>
      <p><em>Despre cum ajunge gustul de acasă la ușa ta.</em></p>

      <h2>Zone de livrare</h2>
      <p><strong>Spalding (PE11)</strong><br />
      Livrare a doua zi sau în 1–2 zile lucrătoare. Cost: £4.99. Comandă minimă: £40.</p>

      <p><strong>Zona extinsă — rază de 20 de mile în jurul Spaldingului</strong><br />
      Acoperă Holbeach, Bourne, Boston, Peterborough și satele dintre ele.<br />
      Livrare în 1–2 zile lucrătoare. Cost: £8.99. Comandă minimă: £60.</p>

      <p><strong>Livrare gratuită</strong><br />
      Pentru toate comenzile peste £100, oriunde în zona de livrare.</p>

      <p><strong>În afara zonei de 20 de mile</strong><br />
      Scrie-ne la <a href="mailto:contact@basarabia.co.uk">contact@basarabia.co.uk</a>. Pentru comenzi mari sau livrări speciale, găsim o soluție.</p>

      <h2>Cum ambalăm</h2>
      <p>Produsele refrigerate sau congelate sunt ambalate în pungi termoizolante cu acumulatori de gheață, pentru a păstra lanțul de frig. Pâinea proaspătă și patiseria sunt împachetate separat, pentru a-și păstra textura. Produsele fragile sunt protejate cu material biodegradabil.</p>

      <h2>Programul de livrare</h2>
      <p>Comenzile plasate înainte de <strong>ora 14:00</strong> intră în programul de livrare al zilei următoare. Comenzile plasate după 14:00 sau în weekend sunt procesate luni dimineața.</p>
      <p>Livrăm de <strong>luni până sâmbătă</strong>. Duminica, magazinul se odihnește.</p>
      <p>În ziua livrării primești un mesaj cu intervalul orar estimat. Dacă nu ești acasă, șoferul nostru încearcă din nou — sau lasă coletul la o adresă desemnată de tine, dacă a fost convenit dinainte.</p>

      <h2>Probleme la livrare</h2>
      <p>Dacă ceva nu este în regulă cu coletul tău — produs lipsă, deteriorat, expirat — anunță-ne în <strong>24 de ore</strong> de la primire, la <a href="mailto:contact@basarabia.co.uk">contact@basarabia.co.uk</a>. Atașează numărul comenzii și o fotografie. Înlocuim sau returnăm banii — alegerea ta.</p>

      <h2>Întrebări frecvente</h2>
      <p><strong>Pot să schimb adresa de livrare după ce am comandat?</strong><br />
      Da, dacă coletul nu a fost încă predat curierului. Scrie-ne urgent.</p>

      <p><strong>Pot să primesc comanda la birou?</strong><br />
      Da, atâta timp cât adresa este în zona de livrare și cineva o poate primi.</p>

      <p><strong>Livrați produse congelate?</strong><br />
      Da, dar doar în zona Spalding (PE11), pentru a garanta lanțul de frig.</p>

      <p><strong>Ce fac dacă nu sunt acasă la livrare?</strong><br />
      Curierul încearcă din nou. Poți alege și o adresă alternativă (un vecin, un loc de muncă) — anunță-ne dinainte.</p>
    </>
  )
}

function DeliveryEn() {
  return (
    <>
      <p><em>How the taste of home reaches your door.</em></p>

      <h2>Delivery zones</h2>
      <p><strong>Spalding (PE11)</strong><br />
      Next-day or 1–2 working days. Cost: £4.99. Minimum order: £40.</p>

      <p><strong>Extended zone — 20-mile radius around Spalding</strong><br />
      Covers Holbeach, Bourne, Boston, Peterborough, and the villages between.<br />
      Delivery in 1–2 working days. Cost: £8.99. Minimum order: £60.</p>

      <p><strong>Free delivery</strong><br />
      On all orders over £100, anywhere in our delivery area.</p>

      <p><strong>Outside the 20-mile zone</strong><br />
      Write to <a href="mailto:contact@basarabia.co.uk">contact@basarabia.co.uk</a>. For larger orders or special deliveries, we&rsquo;ll find a way.</p>

      <h2>How we pack</h2>
      <p>Refrigerated or frozen items are packed in insulated bags with ice packs to preserve the cold chain. Fresh bread and pastry are wrapped separately to keep their texture. Fragile items are protected with biodegradable material.</p>

      <h2>Delivery schedule</h2>
      <p>Orders placed before <strong>2:00 pm</strong> are scheduled for next-day delivery. Orders placed after 2:00 pm or at the weekend are processed Monday morning.</p>
      <p>We deliver <strong>Monday to Saturday</strong>. Sunday, the shop rests.</p>
      <p>On the day of delivery, you receive a message with the estimated time slot. If you&rsquo;re not at home, our driver tries again — or leaves the parcel at an address you&rsquo;ve agreed with us in advance.</p>

      <h2>Problems with your delivery</h2>
      <p>If anything is wrong with your parcel — missing item, damaged, expired — let us know within <strong>24 hours</strong> of receipt, at <a href="mailto:contact@basarabia.co.uk">contact@basarabia.co.uk</a>. Attach the order number and a photo. We replace or refund — your choice.</p>

      <h2>FAQs</h2>
      <p><strong>Can I change the delivery address after ordering?</strong><br />
      Yes, as long as the parcel hasn&rsquo;t been handed to the courier. Write to us urgently.</p>

      <p><strong>Can I have the order delivered to my office?</strong><br />
      Yes, as long as the address is in our delivery area and someone can receive it.</p>

      <p><strong>Do you deliver frozen products?</strong><br />
      Yes, but only within Spalding (PE11), to guarantee the cold chain.</p>

      <p><strong>What if I&rsquo;m not home at delivery?</strong><br />
      The courier will try again. You can also choose an alternative address (a neighbour, a workplace) — let us know in advance.</p>
    </>
  )
}
