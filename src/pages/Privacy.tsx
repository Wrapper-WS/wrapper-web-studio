export default function Privacy() {
  return (
    <main style={{ paddingTop: 100 }}>
      <section style={{ padding: '40px 16px 32px', maxWidth: 700, margin: '0 auto' }}>
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', fontFamily: 'Space Grotesk, sans-serif', marginBottom: 16 }}>
          LEGAL
        </p>
        <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(32px, 6vw, 52px)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 8 }}>
          Privacy <span className="gradient-text">Policy</span>
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
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--text)', fontSize: 20, fontWeight: 700, marginBottom: 4 }}>PRIVACY POLICY</h2>
          <p style={{ marginBottom: 24, fontSize: 13 }}>Last updated May 11, 2026</p>

          <p style={{ marginBottom: 16 }}>
            This Privacy Notice for <strong style={{ color: 'var(--text)' }}>Wrapper Web Studio</strong> ("we," "us," or "our") describes how and why we might access, collect, store, use, and/or share ("process") your personal information when you use our services ("Services"), including when you:
          </p>
          <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
            <li style={{ marginBottom: 8 }}>Visit our website at <a href="https://wrapperwebstudio.vercel.app" style={{ color: 'var(--teal)' }}>wrapperwebstudio.verccel.app</a> or any website of ours that links to this Privacy Notice</li>
            <li>Engage with us in other related ways, including any marketing or events</li>
          </ul>
          <p style={{ marginBottom: 24 }}>
            <strong style={{ color: 'var(--text)' }}>Questions or concerns?</strong> Reading this Privacy Notice will help you understand your privacy rights and choices. If you still have any questions, please contact us at{' '}
            <a href="mailto:sp3techinitiative@gmail.com" style={{ color: 'var(--teal)' }}>sp3techinitiative@gmail.com</a>.
          </p>

          {[
            {
              title: '1. WHAT INFORMATION DO WE COLLECT?',
              content: (
                <>
                  <p style={{ marginBottom: 12 }}>We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services, or when you contact us. This includes:</p>
                  <ul style={{ paddingLeft: 20, marginBottom: 12 }}>
                    <li style={{ marginBottom: 6 }}>Names</li>
                    <li style={{ marginBottom: 6 }}>Phone numbers</li>
                    <li style={{ marginBottom: 6 }}>Email addresses</li>
                    <li style={{ marginBottom: 6 }}>Billing addresses</li>
                    <li>Contact preferences</li>
                  </ul>
                  <p style={{ marginBottom: 12 }}><strong style={{ color: 'var(--text)' }}>Sensitive Information.</strong> We do not process sensitive information.</p>
                  <p><strong style={{ color: 'var(--text)' }}>Payment Data.</strong> We may collect data necessary to process your payment if you choose to make purchases. All payment data is handled and stored by Flutterwave. You may find their privacy notice at <a href="https://dispute.flutterwave.com/privacy" style={{ color: 'var(--teal)' }}>https://dispute.flutterwave.com/privacy</a>.</p>
                </>
              ),
            },
            {
              title: '2. HOW DO WE PROCESS YOUR INFORMATION?',
              content: (
                <p>We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. Specifically: to deliver services to you, to respond to your inquiries, to send administrative information, to fulfill and manage your orders, and to request feedback.</p>
              ),
            },
            {
              title: '3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?',
              content: (
                <p>We may share information in connection with a merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company. We do not sell your personal information to third parties.</p>
              ),
            },
            {
              title: '4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?',
              content: (
                <p>We may use cookies and similar tracking technologies (like web beacons and pixels) to gather information when you interact with our Services. Some online tracking technologies help us maintain the security of our Services, prevent crashes, fix bugs, save your preferences, and assist with basic site functions. Specific information about how we use such technologies is set out in our Cookie Policy.</p>
              ),
            },
            {
              title: '5. HOW LONG DO WE KEEP YOUR INFORMATION?',
              content: (
                <p>We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Notice. We retain customer information only as long as necessary to provide services, manage projects, maintain client records, and comply with legal obligations.</p>
              ),
            },
            {
              title: '6. HOW DO WE KEEP YOUR INFORMATION SAFE?',
              content: (
                <p>We have implemented appropriate and reasonable technical and organizational security measures designed to protect the security of any personal information we process. However, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.</p>
              ),
            },
            {
              title: '7. DO WE COLLECT INFORMATION FROM MINORS?',
              content: (
                <p>We do not knowingly collect, solicit data from, or market to children under 18 years of age. By using the Services, you represent that you are at least 18. If you become aware of any data we may have collected from children under age 18, please contact us at <a href="mailto:sp3techinitiative@gmail.com" style={{ color: 'var(--teal)' }}>sp3techinitiative@gmail.com</a>.</p>
              ),
            },
            {
              title: '8. WHAT ARE YOUR PRIVACY RIGHTS?',
              content: (
                <>
                  <p style={{ marginBottom: 12 }}>You may review, change, or terminate your account at any time. You have the right to withdraw your consent to our processing of your personal information at any time by contacting us.</p>
                  <p><strong style={{ color: 'var(--text)' }}>Cookies and similar technologies:</strong> Most web browsers are set to accept cookies by default. If you prefer, you can choose to set your browser to remove or reject cookies.</p>
                </>
              ),
            },
            {
              title: '9. CONTROLS FOR DO-NOT-TRACK FEATURES',
              content: (
                <p>Most web browsers and some mobile operating systems include a Do-Not-Track ("DNT") feature. At this stage, no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals.</p>
              ),
            },
            {
              title: '10. DO OTHER REGIONS HAVE SPECIFIC PRIVACY RIGHTS?',
              content: (
                <>
                  <p style={{ marginBottom: 12 }}><strong style={{ color: 'var(--text)' }}>Republic of South Africa:</strong> At any time, you have the right to request access to or correction of your personal information.</p>
                  <p>If you are unsatisfied with how we address any complaint, you can contact the Information Regulator (South Africa) at <a href="mailto:enquiries@inforegulator.org.za" style={{ color: 'var(--teal)' }}>enquiries@inforegulator.org.za</a>.</p>
                </>
              ),
            },
            {
              title: '11. DO WE MAKE UPDATES TO THIS NOTICE?',
              content: (
                <p>We may update this Privacy Notice from time to time. The updated version will be indicated by an updated "Revised" date at the top of this Privacy Notice.</p>
              ),
            },
            {
              title: '12. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?',
              content: (
                <>
                  <p style={{ marginBottom: 8 }}>If you have questions or comments about this notice, you may email us at <a href="mailto:sp3techinitiative@gmail.com" style={{ color: 'var(--teal)' }}>sp3techinitiative@gmail.com</a> or contact us by post at:</p>
                  <p style={{ color: 'var(--text)' }}>
                    Wrapper Web Studio<br />
                    1 Sura Agbiaka St<br />
                    Lagos, Lagos 102214<br />
                    Nigeria
                    </p>
                </>
              ),
            },
            {
              title: '13. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?',
              content: (
                <p>Based on the applicable laws of your country, you may have the right to request access to the personal information we collect from you, correct inaccuracies, or delete your personal information. To request this, please contact us at <a href="mailto:sp3techinitiative@gmail.com" style={{ color: 'var(--teal)' }}>sp3techinitiative@gmail.com</a>.</p>
              ),
            },
          ].map((section) => (
            <div key={section.title} style={{ marginBottom: 32, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
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
