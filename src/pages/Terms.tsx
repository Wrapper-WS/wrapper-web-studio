export default function Terms() {
  const sections = [
    {
      title: 'AGREEMENT TO OUR LEGAL TERMS',
      content: (
        <>
          <p style={{ marginBottom: 12 }}>We are <strong style={{ color: 'var(--text)' }}>Wrapper Web Studio</strong> ("Company," "we," "us," "our"). We operate the website <a href="https://wrapperwebstudio.vercel.app" style={{ color: 'var(--teal)' }}>wrapperwebstudio.vercel.app</a>, as well as any other related products and services that refer or link to these legal terms (collectively, the "Services").</p>
          <p style={{ marginBottom: 12 }}>You can contact us by email at <a href="mailto:sp3techinitiative@gmail.com" style={{ color: 'var(--teal)' }}>sp3techinitiative@gmail.com</a> or by mail to 1 Sura Agbiaka Street, Isolo, Lagos 102214, Nigeria.</p>
          <p>These Legal Terms constitute a legally binding agreement made between you and Wrapper Web Studio, concerning your access to and use of the Services. By accessing the Services, you have read, understood, and agreed to be bound by all of these Legal Terms. IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.</p>
        </>
      ),
    },
    {
      title: '1. OUR SERVICES',
      content: (
        <p>The information provided when using the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation. Those who choose to access the Services from other locations do so on their own initiative and are solely responsible for compliance with local laws.</p>
      ),
    },
    {
      title: '2. INTELLECTUAL PROPERTY RIGHTS',
      content: (
        <>
          <p style={{ marginBottom: 12 }}>We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services, as well as the trademarks, service marks, and logos contained therein.</p>
          <p>Subject to your compliance with these Legal Terms, we grant you a non-exclusive, non-transferable, revocable license to access the Services solely for your personal, non-commercial use or internal business purpose.</p>
        </>
      ),
    },
    {
      title: '3. USER REPRESENTATIONS',
      content: (
        <p>By using the Services, you represent and warrant that: (1) you have the legal capacity and you agree to comply with these Legal Terms; (2) you are not a minor in the jurisdiction in which you reside; (3) you will not access the Services through automated or non-human means; (4) you will not use the Services for any illegal or unauthorized purpose; and (5) your use of the Services will not violate any applicable law or regulation.</p>
      ),
    },
    {
      title: '4. PROHIBITED ACTIVITIES',
      content: (
        <>
          <p style={{ marginBottom: 12 }}>You may not access or use the Services for any purpose other than that for which we make the Services available. As a user of the Services, you agree not to:</p>
          <ul style={{ paddingLeft: 20 }}>
            {[
              'Systematically retrieve data or other content from the Services to create a database without written permission from us.',
              'Trick, defraud, or mislead us and other users.',
              'Circumvent or disable security-related features of the Services.',
              'Use the Services in a manner inconsistent with any applicable laws or regulations.',
              'Upload or transmit viruses, Trojan horses, or other harmful material.',
              'Engage in any automated use of the system.',
              'Attempt to impersonate another user or person.',
              'Use the Services as part of any effort to compete with us.',
            ].map((item, i) => (
              <li key={i} style={{ marginBottom: 8 }}>{item}</li>
            ))}
          </ul>
        </>
      ),
    },
    {
      title: '5. USER GENERATED CONTRIBUTIONS',
      content: (
        <p>The Services does not offer users to submit or post content. We may provide you with the opportunity to create, submit, or post content to us or on the Services from time to time.</p>
      ),
    },
    {
      title: '6. CONTRIBUTION LICENSE',
      content: (
        <p>By submitting suggestions or other feedback regarding the Services, you agree that we can use and share such feedback for any purpose without compensation to you. We do not assert any ownership over your Contributions. You retain full ownership of all of your Contributions and any intellectual property rights associated with them.</p>
      ),
    },
    {
      title: '7. SERVICES MANAGEMENT',
      content: (
        <p>We reserve the right to: (1) monitor the Services for violations of these Legal Terms; (2) take appropriate legal action against anyone who violates the law or these Legal Terms; (3) in our sole discretion, refuse, restrict access to, or disable any of your Contributions; and (4) otherwise manage the Services in a manner designed to protect our rights and property.</p>
      ),
    },
    {
      title: '8. TERM AND TERMINATION',
      content: (
        <p>These Legal Terms shall remain in full force and effect while you use the Services. WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SERVICES TO ANY PERSON FOR ANY REASON, INCLUDING FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE LEGAL TERMS.</p>
      ),
    },
    {
      title: '9. MODIFICATIONS AND INTERRUPTIONS',
      content: (
        <p>We reserve the right to change, modify, or remove the contents of the Services at any time or for any reason at our sole discretion without notice. We cannot guarantee the Services will be available at all times and we reserve the right to change, revise, update, suspend, or discontinue the Services at any time without notice to you.</p>
      ),
    },
    {
      title: '10. GOVERNING LAW',
      content: (
        <p>These Legal Terms shall be governed by and defined following the laws of Nigeria. You irrevocably consent that the courts of Nigeria shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these Legal Terms.</p>
      ),
    },
    {
      title: '11. DISPUTE RESOLUTION',
      content: (
        <>
          <p style={{ marginBottom: 12 }}><strong style={{ color: 'var(--text)' }}>Informal Negotiations:</strong> The Parties agree to first attempt to negotiate any dispute informally for at least 30 days before initiating arbitration. Such informal negotiations commence upon written notice from one Party to the other.</p>
          <p><strong style={{ color: 'var(--text)' }}>Binding Arbitration:</strong> If the parties are unable to resolve the dispute through informal negotiation, it shall be finally resolved by arbitration in accordance with the United Nations Commission on International Trade Law Arbitration Rules. The seat of arbitration shall be Lagos, Nigeria. The language of proceedings shall be English. The governing law shall be the substantive law of Nigeria.</p>
        </>
      ),
    },
    {
      title: '12. CORRECTIONS',
      content: (
        <p>There may be information on the Services that contains typographical errors, inaccuracies, or omissions. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information on the Services at any time, without prior notice.</p>
      ),
    },
    {
      title: '13. DISCLAIMER',
      content: (
        <p>THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SERVICES AND YOUR USE THEREOF, INCLUDING THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>
      ),
    },
    {
      title: '14. LIMITATIONS OF LIABILITY',
      content: (
        <p>IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SERVICES.</p>
      ),
    },
    {
      title: '15. INDEMNIFICATION',
      content: (
        <p>You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand made by any third party due to or arising out of your use of the Services, breach of these Legal Terms, or violation of the rights of a third party.</p>
      ),
    },
    {
      title: '16. USER DATA',
      content: (
        <p>We will maintain certain data that you transmit to the Services for the purpose of managing the performance of the Services. Although we perform regular routine backups of data, you are solely responsible for all data that you transmit or that relates to any activity you have undertaken using the Services.</p>
      ),
    },
    {
      title: '17. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES',
      content: (
        <p>Visiting the Services, sending us emails, and completing online forms constitute electronic communications. You consent to receive electronic communications, and you agree that all agreements, notices, disclosures, and other communications we provide to you electronically satisfy any legal requirement that such communication be in writing.</p>
      ),
    },
    {
      title: '18. MISCELLANEOUS',
      content: (
        <p>These Legal Terms and any policies or operating rules posted by us on the Services constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right or provision of these Legal Terms shall not operate as a waiver of such right or provision. These Legal Terms operate to the fullest extent permissible by law.</p>
      ),
    },
    {
      title: '19. CONTACT US',
      content: (
        <>
          <p style={{ marginBottom: 8 }}>In order to resolve a complaint regarding the Services or to receive further information regarding use of the Services, please contact us at:</p>
          <p style={{ color: 'var(--text)' }}>
            <strong>Wrapper Web Studio</strong><br />
            1 Sura Agbiaka Street<br />
            Isolo, Lagos 102214<br />
            Nigeria<br />
            <a href="mailto:sp3techinitiative@gmail.com" style={{ color: 'var(--teal)' }}>sp3techinitiative@gmail.com</a>
          </p>
        </>
      ),
    },
  ]

  return (
    <main style={{ paddingTop: 100 }}>
      <section style={{ padding: '40px 16px 32px', maxWidth: 700, margin: '0 auto' }}>
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', fontFamily: 'Space Grotesk, sans-serif', marginBottom: 16 }}>
          LEGAL
        </p>
        <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(32px, 6vw, 52px)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 8 }}>
          Terms of <span className="gradient-text">Use</span>
        </h1>
      </section>

      <section style={{ padding: '0 16px 100px', maxWidth: 700, margin: '0 auto' }}>
        <div
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 20,
            padding: 'clamp(24px, 4vw, 40px)',
            lineHeight: 1.8,
            fontSize: 14,
            color: 'var(--muted)',
          }}
        >
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--text)', fontSize: 20, fontWeight: 700, marginBottom: 4 }}>TERMS OF USE</h2>
          <p style={{ marginBottom: 24, fontSize: 13 }}>Last updated June 19, 2026</p>

          {sections.map((section) => (
            <div key={section.title} style={{ marginBottom: 28, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
              <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--text)', fontSize: 15, fontWeight: 700, marginBottom: 12 }}>
                {section.title}
              </h3>
              {section.content}
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
