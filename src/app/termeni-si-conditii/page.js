import LegalPage from '../components/LegalPage'

export const metadata = {
  title: 'Termeni și Condiții — Basarabia Concept Store',
  description: 'Termenii și condițiile de utilizare a magazinului online Basarabia.',
}

export default function TermeniSiConditii() {
  return (
    <LegalPage
      titleRo="Termeni și Condiții"
      titleEn="Terms & Conditions"
      lastUpdatedRo="Ultima actualizare: 26 aprilie 2026"
      lastUpdatedEn="Last updated: 26 April 2026"
      contentRo={<TermsRo />}
      contentEn={<TermsEn />}
    />
  )
}

function TermsRo() {
  return (
    <>
      <p>Bine ai venit la Basarabia. Înainte de a comanda, te rugăm să citești acești termeni. Sunt scriși simplu, pentru că trebuie să fie citiți — nu pentru a fi ascunși după pagini de jargon juridic.</p>

      <h2>1. Cine suntem</h2>
      <p>Acest magazin online este operat de <strong>Basarabia Ltd</strong>, companie înregistrată în Anglia și Țara Galilor sub numărul <strong>14886556</strong>, cu sediul social la Ground Floor, 11 Market Place, Spalding, Lincolnshire, PE11 1SP.</p>
      <p>Suntem înregistrați pentru TVA cu numărul <strong>&#123;&#123;VAT_NUMBER&#125;&#125;</strong>.</p>
      <p>Ne poți contacta la <a href="mailto:contact@basarabia.co.uk">contact@basarabia.co.uk</a>.</p>
      <p>În aceste condiții, „noi" înseamnă Basarabia Ltd. „Tu" înseamnă persoana care vizitează site-ul sau plasează o comandă.</p>

      <h2>2. Ce vindem</h2>
      <p>Vindem alimente și produse de uz casnic provenind din Europa de Est — produse românești, moldovenești, poloneze, lituaniene, bulgărești, ucrainene — alături de produse fabricate în propriul magazin (mezeluri, pâine, patiserie) și de articole britanice complementare.</p>
      <p>Toate prețurile sunt în lire sterline (£) și includ TVA acolo unde este cazul. Greutatea fiecărui produs este afișată pe pagina sa.</p>

      <h2>3. Comenzi și acceptare</h2>
      <p>Când plasezi o comandă pe site, faci o ofertă către noi de a cumpăra produsele respective. Comanda este acceptată în momentul în care primești emailul nostru de confirmare a expedierii. Înainte de acel moment, ne rezervăm dreptul de a refuza sau anula orice comandă, în special dacă:</p>
      <ul>
        <li>Un produs este indisponibil sau prețul afișat conține o eroare evidentă</li>
        <li>Adresa de livrare este în afara zonei noastre de livrare</li>
        <li>Suspectăm fraudă sau utilizare abuzivă</li>
      </ul>
      <p>Dacă o comandă este anulată după ce a fost plătită, suma plătită este returnată integral în termen de 5 zile lucrătoare.</p>

      <h2>4. Plata</h2>
      <p>Plata se face online cu cardul, prin Stripe. Acceptăm carduri Visa, Mastercard, American Express și principalele portofele digitale (Apple Pay, Google Pay).</p>
      <p><strong>Nu acceptăm plata în numerar la livrare.</strong></p>
      <p>Datele cardului tău nu sunt văzute, stocate sau procesate de noi — sunt gestionate direct de Stripe, care respectă cele mai înalte standarde de securitate (PCI DSS Level 1).</p>

      <h2>5. Livrare</h2>
      <p>Detaliile complete despre livrare sunt pe pagina <a href="/livrare">Livrare</a>. Pe scurt:</p>
      <ul>
        <li><strong>Spalding (PE11):</strong> £4.99, comandă minimă £40, livrare în 1–2 zile lucrătoare</li>
        <li><strong>Zona extinsă (rază de 20 mile):</strong> £8.99, comandă minimă £60, livrare în 1–2 zile lucrătoare</li>
        <li><strong>Livrare gratuită</strong> pentru comenzi peste £100 (în întreaga zonă de livrare)</li>
        <li><strong>În afara zonei de 20 mile:</strong> scrie-ne la contact@basarabia.co.uk și găsim o soluție</li>
      </ul>

      <h2>6. Dreptul de retragere</h2>
      <p>Conform legislației britanice (Consumer Contracts Regulations 2013), ai dreptul de a anula o comandă în termen de 14 zile de la primire — <strong>cu excepția produselor alimentare perisabile</strong>, pentru care acest drept nu se aplică, în conformitate cu Regulation 28(1)(d).</p>
      <p>Ce înseamnă concret:</p>
      <ul>
        <li><strong>Produse perisabile</strong> (carne proaspătă, pâine, patiserie, lactate, fructe, legume, produse refrigerate sau congelate): NU pot fi returnate odată ce au fost livrate, cu excepția cazului în care ajung la tine deteriorate sau cu probleme de calitate. În acel caz, vezi secțiunea 7.</li>
        <li><strong>Produse neperisabile</strong> (conserve, băuturi sigilate, dulciuri sigilate, cosmetice nedesigilate): pot fi returnate în termen de 14 zile de la livrare, în starea originală nedesigilată. Costurile de retur le suporți tu, cu excepția cazului în care produsul a fost defect sau greșit livrat.</li>
      </ul>
      <p>Pentru a iniția o retragere, scrie la <a href="mailto:contact@basarabia.co.uk">contact@basarabia.co.uk</a> cu numărul comenzii.</p>

      <h2>7. Probleme de calitate sau livrare</h2>
      <p>Dacă un produs ajunge la tine deteriorat, expirat, sau cu probleme de calitate — sau dacă livrarea conține erori — te rugăm să ne anunți în termen de <strong>24 de ore de la primire</strong>, prin email la <a href="mailto:contact@basarabia.co.uk">contact@basarabia.co.uk</a>, atașând:</p>
      <ul>
        <li>Numărul comenzii</li>
        <li>Fotografii ale produsului în cauză</li>
        <li>O scurtă descriere a problemei</li>
      </ul>
      <p>Înlocuim produsul sau returnăm banii — alegerea ta. Pentru produsele perisabile, intervalul de 24 de ore este necesar pentru a putea verifica autenticitatea reclamației înainte ca produsul să continue să se altereze.</p>

      <h2>8. Limitarea răspunderii</h2>
      <p>Răspunderea noastră este limitată la valoarea produselor pe care le-ai cumpărat. Nu suntem răspunzători pentru pierderi indirecte, profituri pierdute, sau daune consecvențiale.</p>
      <p>Această clauză nu limitează drepturile tale în cazul:</p>
      <ul>
        <li>Decesului sau vătămării corporale cauzate de neglijența noastră</li>
        <li>Fraudei sau reprezentării frauduloase</li>
        <li>Oricărei alte răspunderi care nu poate fi limitată conform legii britanice</li>
      </ul>

      <h2>9. Reclamații</h2>
      <p>Dacă ai o reclamație, te rugăm să ne scrii direct: <a href="mailto:contact@basarabia.co.uk">contact@basarabia.co.uk</a>. Răspundem în maximum 3 zile lucrătoare și ne străduim să rezolvăm problema în termen de 14 zile.</p>
      <p>Dacă nu ești mulțumit de rezolvare, ai dreptul de a apela la organizațiile britanice de protecție a consumatorilor: Citizens Advice (citizensadvice.org.uk) sau Trading Standards.</p>

      <h2>10. Drepturi de autor</h2>
      <p>Conținutul acestui site — texte, imagini, video, design — aparține Basarabia Ltd sau partenerilor noștri și este protejat prin drepturi de autor. Nu îl reproduce fără permisiune scrisă.</p>

      <h2>11. Lege aplicabilă</h2>
      <p>Acești termeni sunt guvernați de legea Angliei și Țării Galilor. Orice dispută se soluționează la instanțele engleze.</p>

      <h2>12. Modificări</h2>
      <p>Putem actualiza acești termeni pe măsură ce afacerea evoluează. Versiunea curentă este întotdeauna disponibilă la această adresă, cu data ultimei actualizări afișată sus.</p>
    </>
  )
}

function TermsEn() {
  return (
    <>
      <p>Welcome to Basarabia. Before you order, please read these terms. They&rsquo;re written plainly, because terms should be read — not hidden behind walls of legal jargon.</p>

      <h2>1. Who we are</h2>
      <p>This online store is operated by <strong>Basarabia Ltd</strong>, a company registered in England and Wales under company number <strong>14886556</strong>, with its registered office at Ground Floor, 11 Market Place, Spalding, Lincolnshire, PE11 1SP.</p>
      <p>We are VAT registered under number <strong>&#123;&#123;VAT_NUMBER&#125;&#125;</strong>.</p>
      <p>You can reach us at <a href="mailto:contact@basarabia.co.uk">contact@basarabia.co.uk</a>.</p>
      <p>In these terms, &ldquo;we&rdquo; means Basarabia Ltd. &ldquo;You&rdquo; means the person visiting the site or placing an order.</p>

      <h2>2. What we sell</h2>
      <p>We sell food and household goods from across Eastern Europe — Romanian, Moldovan, Polish, Lithuanian, Bulgarian, Ukrainian — alongside products made fresh in our own shop (charcuterie, bread, pastries) and complementary British items.</p>
      <p>All prices are in pounds sterling (£) and include VAT where applicable. The weight of each product is shown on its product page.</p>

      <h2>3. Orders and acceptance</h2>
      <p>When you place an order on the site, you are making us an offer to buy those products. The order is accepted at the moment you receive our shipping confirmation email. Until then, we reserve the right to refuse or cancel any order, especially if:</p>
      <ul>
        <li>A product is unavailable or the price displayed contains an obvious error</li>
        <li>The delivery address is outside our delivery area</li>
        <li>We suspect fraud or abuse</li>
      </ul>
      <p>If an order is cancelled after payment, the amount paid is refunded in full within 5 working days.</p>

      <h2>4. Payment</h2>
      <p>Payment is taken online by card, through Stripe. We accept Visa, Mastercard, American Express, and major digital wallets (Apple Pay, Google Pay).</p>
      <p><strong>We do not accept cash on delivery.</strong></p>
      <p>Your card details are never seen, stored, or processed by us — they are handled directly by Stripe, which complies with the highest security standards (PCI DSS Level 1).</p>

      <h2>5. Delivery</h2>
      <p>Full details on the <a href="/livrare">Delivery</a> page. In short:</p>
      <ul>
        <li><strong>Spalding (PE11):</strong> £4.99, minimum order £40, delivered in 1–2 working days</li>
        <li><strong>Extended zone (within 20-mile radius):</strong> £8.99, minimum order £60, delivered in 1–2 working days</li>
        <li><strong>Free delivery</strong> on orders over £100 (anywhere in the delivery area)</li>
        <li><strong>Outside the 20-mile zone:</strong> email contact@basarabia.co.uk and we&rsquo;ll find a way</li>
      </ul>

      <h2>6. Right to cancel</h2>
      <p>Under UK law (Consumer Contracts Regulations 2013), you have the right to cancel an order within 14 days of receipt — <strong>except for perishable food items</strong>, where this right does not apply, in line with Regulation 28(1)(d).</p>
      <p>What this means in practice:</p>
      <ul>
        <li><strong>Perishable items</strong> (fresh meat, bread, pastry, dairy, fruit, vegetables, refrigerated or frozen products): cannot be returned once delivered, except where they arrive damaged or with quality issues. See section 7.</li>
        <li><strong>Non-perishable items</strong> (canned, sealed beverages, sealed sweets, unopened cosmetics): may be returned within 14 days of delivery in original unsealed condition. Return shipping is at your cost, except where the product was faulty or wrongly delivered.</li>
      </ul>
      <p>To start a return, write to <a href="mailto:contact@basarabia.co.uk">contact@basarabia.co.uk</a> with your order number.</p>

      <h2>7. Quality or delivery problems</h2>
      <p>If a product arrives damaged, expired, or with quality issues — or if your delivery contains errors — please let us know within <strong>24 hours of receipt</strong>, by email to <a href="mailto:contact@basarabia.co.uk">contact@basarabia.co.uk</a>, attaching:</p>
      <ul>
        <li>Your order number</li>
        <li>Photos of the affected product</li>
        <li>A brief description of the problem</li>
      </ul>
      <p>We replace the product or refund — your choice. For perishable items, the 24-hour window is necessary so we can verify the issue before the product deteriorates further.</p>

      <h2>8. Limitation of liability</h2>
      <p>Our liability is limited to the value of the products you purchased. We are not liable for indirect losses, lost profits, or consequential damages.</p>
      <p>This clause does not limit your rights in the case of:</p>
      <ul>
        <li>Death or personal injury caused by our negligence</li>
        <li>Fraud or fraudulent misrepresentation</li>
        <li>Any other liability which cannot be limited under UK law</li>
      </ul>

      <h2>9. Complaints</h2>
      <p>If you have a complaint, please write to us directly: <a href="mailto:contact@basarabia.co.uk">contact@basarabia.co.uk</a>. We respond within 3 working days and aim to resolve the issue within 14 days.</p>
      <p>If you&rsquo;re not satisfied with the resolution, you have the right to contact UK consumer protection bodies: Citizens Advice (citizensadvice.org.uk) or Trading Standards.</p>

      <h2>10. Copyright</h2>
      <p>The content of this site — text, images, video, design — belongs to Basarabia Ltd or our partners and is protected by copyright. Don&rsquo;t reproduce it without written permission.</p>

      <h2>11. Governing law</h2>
      <p>These terms are governed by the law of England and Wales. Any dispute will be settled in the English courts.</p>

      <h2>12. Changes</h2>
      <p>We may update these terms as the business evolves. The current version is always available at this address, with the date of the last update shown at the top.</p>
    </>
  )
}
