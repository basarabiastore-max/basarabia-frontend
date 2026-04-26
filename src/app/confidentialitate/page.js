import LegalPage from '../components/LegalPage'

export const metadata = {
  title: 'Politica de Confidențialitate — Basarabia Concept Store',
  description: 'Cum colectăm, folosim și protejăm datele tale personale.',
}

export default function Confidentialitate() {
  return (
    <LegalPage
      titleRo="Politica de Confidențialitate"
      titleEn="Privacy Policy"
      lastUpdatedRo="Ultima actualizare: 26 aprilie 2026"
      lastUpdatedEn="Last updated: 26 April 2026"
      contentRo={<PrivacyRo />}
      contentEn={<PrivacyEn />}
    />
  )
}

function PrivacyRo() {
  return (
    <>
      <p>Datele tale sunt ale tale. Această pagină explică, fără jargon, ce informații colectăm despre tine, de ce, cum le folosim și ce drepturi ai.</p>

      <h2>1. Cine este responsabil</h2>
      <p>Operatorul de date este <strong>Basarabia Ltd</strong>, companie înregistrată în Anglia și Țara Galilor sub numărul 14886556, cu sediul la Ground Floor, 11 Market Place, Spalding, Lincolnshire, PE11 1SP.</p>
      <p>Pentru orice întrebare privind datele tale, scrie la <a href="mailto:contact@basarabia.co.uk">contact@basarabia.co.uk</a>.</p>
      <p>Suntem înregistrați la Information Commissioner&rsquo;s Office (ICO) — organismul britanic de protecție a datelor.</p>

      <h2>2. Ce date colectăm</h2>
      <p><strong>Când vizitezi site-ul</strong> (fără să cumperi):</p>
      <ul>
        <li>Date tehnice anonime: tipul browserului, sistemul de operare, paginile vizitate, durata vizitei</li>
        <li>Cookie-uri esențiale (vezi secțiunea 6)</li>
      </ul>
      <p><strong>Când plasezi o comandă:</strong></p>
      <ul>
        <li>Nume și prenume</li>
        <li>Adresă de email</li>
        <li>Număr de telefon</li>
        <li>Adresă de livrare și de facturare</li>
        <li>Istoricul comenzilor tale</li>
      </ul>
      <p><strong>Plata:</strong></p>
      <ul>
        <li>Datele cardului tău <strong>nu</strong> sunt colectate de noi. Sunt procesate direct de Stripe, partenerul nostru de plăți. Noi vedem doar ultimele 4 cifre ale cardului și tipul (Visa, Mastercard etc.) — pentru evidență.</li>
      </ul>
      <p><strong>Dacă te abonezi la newsletter:</strong></p>
      <ul>
        <li>Adresa de email și consimțământul explicit pentru a primi comunicări de la noi</li>
      </ul>

      <h2>3. De ce colectăm aceste date</h2>
      <ul>
        <li><strong>Pentru a-ți onora comanda:</strong> procesăm plata, ambalăm produsele, livrăm la adresa ta, te contactăm dacă e ceva neclar</li>
        <li><strong>Pentru a-ți răspunde la întrebări</strong> dacă scrii la noi</li>
        <li><strong>Pentru obligații legale:</strong> păstrăm înregistrările contabile și fiscale conform legislației britanice (HMRC cere păstrarea acestora 6 ani)</li>
        <li><strong>Pentru a îmbunătăți site-ul:</strong> date tehnice anonime ne ajută să vedem ce funcționează și ce nu</li>
        <li><strong>Pentru a-ți trimite newsletter</strong> — doar dacă te-ai abonat explicit. Te poți dezabona oricând.</li>
      </ul>

      <h2>4. Temei legal</h2>
      <p>Conform UK GDPR, prelucrăm datele tale pe baza:</p>
      <ul>
        <li><strong>Executării contractului</strong> (când îți onorăm comanda)</li>
        <li><strong>Obligației legale</strong> (păstrarea înregistrărilor pentru HMRC)</li>
        <li><strong>Consimțământului tău</strong> (pentru newsletter și cookie-uri non-esențiale)</li>
        <li><strong>Interesului nostru legitim</strong> (pentru îmbunătățirea site-ului — în mod proporțional cu drepturile tale)</li>
      </ul>

      <h2>5. Cu cine partajăm datele</h2>
      <p>Lista completă a partenerilor cu care lucrăm și ce date văd:</p>
      <ul>
        <li><strong>Stripe</strong> (procesare plăți) — vede datele cardului tău, numele și suma. Politica lor: stripe.com/gb/privacy</li>
        <li><strong>Vercel</strong> (hosting site) — vede traficul tehnic, fără date personale identificabile. Politica lor: vercel.com/legal/privacy-policy</li>
        <li><strong>Curier de livrare</strong> (numele și frecvența: TBD înainte de lansare) — vede numele tău, adresa, numărul de telefon, pentru a livra coletul</li>
        <li><strong>Beehiiv</strong> (newsletter, dacă te abonezi) — vede adresa de email. Politica lor: beehiiv.com/privacy</li>
        <li><strong>HMRC</strong> și alte autorități britanice, dacă suntem obligați legal să furnizăm date</li>
      </ul>
      <p><strong>Nu vindem datele tale.</strong> Niciodată. Nimănui.</p>

      <h2>6. Cookie-uri</h2>
      <p>Folosim cookie-uri esențiale pentru ca site-ul să funcționeze (de exemplu, pentru a-ți reține coșul de cumpărături). Acestea nu necesită consimțământ.</p>
      <p>Pentru cookie-uri analitice (care ne ajută să înțelegem cum este folosit site-ul), îți cerem consimțământul prima dată când vizitezi site-ul. Poți accepta, refuza, sau modifica preferințele oricând.</p>
      <p>Detalii complete: <a href="/cookie-uri">Politica privind Cookie-urile</a>.</p>

      <h2>7. Cât timp păstrăm datele</h2>
      <ul>
        <li><strong>Date despre comenzi:</strong> 6 ani de la livrare (cerință HMRC)</li>
        <li><strong>Date despre conturi de utilizator:</strong> atât timp cât contul e activ; ștergem datele la cerere, cu excepția celor pe care suntem obligați legal să le păstrăm</li>
        <li><strong>Newsletter:</strong> până te dezabonezi</li>
        <li><strong>Date tehnice anonime:</strong> 26 luni</li>
      </ul>

      <h2>8. Drepturile tale</h2>
      <p>Conform UK GDPR, ai dreptul:</p>
      <ul>
        <li>Să afli ce date avem despre tine (drept de acces)</li>
        <li>Să corectezi datele incorecte</li>
        <li>Să ștergi datele tale („dreptul de a fi uitat") — cu excepția celor pe care suntem obligați legal să le păstrăm</li>
        <li>Să restricționezi prelucrarea</li>
        <li>Să te opui prelucrării</li>
        <li>Să primești datele tale într-un format portabil</li>
        <li>Să retragi consimțământul oricând (de exemplu, pentru newsletter)</li>
        <li>Să depui plângere la Information Commissioner&rsquo;s Office (ICO): ico.org.uk</li>
      </ul>
      <p>Pentru a-ți exercita oricare dintre aceste drepturi, scrie la <a href="mailto:contact@basarabia.co.uk">contact@basarabia.co.uk</a>. Răspundem în maximum 30 de zile.</p>

      <h2>9. Securitatea datelor</h2>
      <p>Folosim conexiuni criptate (HTTPS) pe întregul site. Datele cardului sunt procesate exclusiv de Stripe, certificat PCI DSS Level 1 — cel mai înalt standard din industrie.</p>
      <p>Accesul intern la datele clienților este limitat la persoanele care au nevoie de ele pentru a-ți onora comanda.</p>
      <p>În cazul unei breșe de securitate care ar putea afecta drepturile tale, te informăm fără întârziere și raportăm la ICO conform legii.</p>

      <h2>10. Transferuri internaționale</h2>
      <p>Unii dintre furnizorii noștri (Stripe, Vercel, Beehiiv) procesează date și în afara Marii Britanii. Aceste transferuri se fac doar către țări care oferă protecție adecvată conform UK GDPR sau pe baza unor clauze contractuale standard aprobate.</p>

      <h2>11. Copii</h2>
      <p>Site-ul nostru nu este destinat copiilor sub 16 ani. Nu colectăm intenționat date despre copii. Dacă afli că un copil ne-a furnizat date, scrie-ne și le ștergem imediat.</p>

      <h2>12. Modificări</h2>
      <p>Putem actualiza această politică pe măsură ce practicile noastre evoluează. Versiunea curentă este întotdeauna afișată aici, cu data ultimei actualizări sus.</p>
    </>
  )
}

function PrivacyEn() {
  return (
    <>
      <p>Your data is yours. This page explains, without jargon, what information we collect about you, why, how we use it, and what rights you have.</p>

      <h2>1. Who is responsible</h2>
      <p>The data controller is <strong>Basarabia Ltd</strong>, a company registered in England and Wales under number 14886556, with offices at Ground Floor, 11 Market Place, Spalding, Lincolnshire, PE11 1SP.</p>
      <p>For any question about your data, write to <a href="mailto:contact@basarabia.co.uk">contact@basarabia.co.uk</a>.</p>
      <p>We are registered with the Information Commissioner&rsquo;s Office (ICO) — the UK data protection authority.</p>

      <h2>2. What data we collect</h2>
      <p><strong>When you visit the site</strong> (without buying anything):</p>
      <ul>
        <li>Anonymous technical data: browser type, operating system, pages visited, time on site</li>
        <li>Essential cookies (see section 6)</li>
      </ul>
      <p><strong>When you place an order:</strong></p>
      <ul>
        <li>First and last name</li>
        <li>Email address</li>
        <li>Phone number</li>
        <li>Delivery and billing address</li>
        <li>Your order history</li>
      </ul>
      <p><strong>Payment:</strong></p>
      <ul>
        <li>Your card details are <strong>not</strong> collected by us. They are processed directly by Stripe, our payment partner. We only see the last 4 digits of your card and the type (Visa, Mastercard, etc.) — for our records.</li>
      </ul>
      <p><strong>If you subscribe to the newsletter:</strong></p>
      <ul>
        <li>Your email address and explicit consent to receive communications from us</li>
      </ul>

      <h2>3. Why we collect this data</h2>
      <ul>
        <li><strong>To fulfil your order:</strong> process payment, pack products, deliver to your address, contact you if anything is unclear</li>
        <li><strong>To answer your questions</strong> when you write to us</li>
        <li><strong>For legal obligations:</strong> we keep accounting and tax records in line with UK law (HMRC requires 6 years)</li>
        <li><strong>To improve the site:</strong> anonymous technical data helps us see what works</li>
        <li><strong>To send you the newsletter</strong> — only if you&rsquo;ve subscribed. You can unsubscribe at any time.</li>
      </ul>

      <h2>4. Legal basis</h2>
      <p>Under UK GDPR, we process your data on the basis of:</p>
      <ul>
        <li><strong>Performance of contract</strong> (fulfilling your order)</li>
        <li><strong>Legal obligation</strong> (record-keeping for HMRC)</li>
        <li><strong>Your consent</strong> (newsletter, non-essential cookies)</li>
        <li><strong>Our legitimate interest</strong> (improving the site — proportionate to your rights)</li>
      </ul>

      <h2>5. Who we share data with</h2>
      <p>Full list of partners we work with and what data they see:</p>
      <ul>
        <li><strong>Stripe</strong> (payment processing) — sees your card details, name and amount. Policy: stripe.com/gb/privacy</li>
        <li><strong>Vercel</strong> (site hosting) — sees technical traffic, no personally identifiable data. Policy: vercel.com/legal/privacy-policy</li>
        <li><strong>Delivery courier</strong> (name and frequency: TBD before launch) — sees your name, address, phone number, to deliver the parcel</li>
        <li><strong>Beehiiv</strong> (newsletter, if you subscribe) — sees your email address. Policy: beehiiv.com/privacy</li>
        <li><strong>HMRC</strong> and other UK authorities, if legally required to provide data</li>
      </ul>
      <p><strong>We do not sell your data.</strong> Ever. To anyone.</p>

      <h2>6. Cookies</h2>
      <p>We use essential cookies so the site works properly (for example, to remember your shopping basket). These don&rsquo;t require consent.</p>
      <p>For analytics cookies (which help us understand how the site is used), we ask for your consent the first time you visit. You can accept, refuse, or change your preferences at any time.</p>
      <p>Full details: <a href="/cookie-uri">Cookie Policy</a>.</p>

      <h2>7. How long we keep data</h2>
      <ul>
        <li><strong>Order data:</strong> 6 years from delivery (HMRC requirement)</li>
        <li><strong>User account data:</strong> as long as the account is active; we delete on request, except for what we&rsquo;re legally required to keep</li>
        <li><strong>Newsletter:</strong> until you unsubscribe</li>
        <li><strong>Anonymous technical data:</strong> 26 months</li>
      </ul>

      <h2>8. Your rights</h2>
      <p>Under UK GDPR, you have the right to:</p>
      <ul>
        <li>Find out what data we hold about you (right of access)</li>
        <li>Correct inaccurate data</li>
        <li>Delete your data (&ldquo;right to be forgotten&rdquo;) — except for what we&rsquo;re legally required to keep</li>
        <li>Restrict processing</li>
        <li>Object to processing</li>
        <li>Receive your data in a portable format</li>
        <li>Withdraw consent at any time (e.g. for the newsletter)</li>
        <li>Lodge a complaint with the Information Commissioner&rsquo;s Office (ICO): ico.org.uk</li>
      </ul>
      <p>To exercise any of these rights, write to <a href="mailto:contact@basarabia.co.uk">contact@basarabia.co.uk</a>. We respond within 30 days at most.</p>

      <h2>9. Data security</h2>
      <p>We use encrypted connections (HTTPS) across the whole site. Card data is processed exclusively by Stripe, certified PCI DSS Level 1 — the industry&rsquo;s highest standard.</p>
      <p>Internal access to customer data is limited to people who need it to fulfil your order.</p>
      <p>In case of a security breach that could affect your rights, we inform you without delay and report to the ICO as required by law.</p>

      <h2>10. International transfers</h2>
      <p>Some of our providers (Stripe, Vercel, Beehiiv) process data outside the United Kingdom. These transfers are only made to countries that provide adequate protection under UK GDPR, or on the basis of approved standard contractual clauses.</p>

      <h2>11. Children</h2>
      <p>Our site is not intended for children under 16. We do not knowingly collect data about children. If you find that a child has given us data, write to us and we&rsquo;ll delete it immediately.</p>

      <h2>12. Changes</h2>
      <p>We may update this policy as our practices evolve. The current version is always shown here, with the date of the last update at the top.</p>
    </>
  )
}
