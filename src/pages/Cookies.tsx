export default function Cookies() {
  return (
    <main style={{ paddingTop: 100 }}>
      <section style={{ padding: '40px 16px 32px', maxWidth: 700, margin: '0 auto' }}>
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', fontFamily: 'Space Grotesk, sans-serif', marginBottom: 16 }}>
          LEGAL
        </p>
        <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(32px, 6vw, 52px)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 8 }}>
          Cookie <span className="gradient-text">Policy</span>
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
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', color: 'var(--text)', fontSize: 20, fontWeight: 700, marginBottom: 4 }}>COOKIE POLICY</h2>
          <p style={{ marginBottom: 24, fontSize: 13 }}>Last updated June 19, 2026</p>

          <p style={{ marginBottom: 16 }}>
            This Cookie Policy explains how <strong style={{ color: 'var(--text)' }}>Wrapper Web Studio</strong> ("Company," "we," "us," and "our") uses cookies and similar technologies to recognize you when you visit our website ("Website"). It explains what these technologies are and why we use them, as well as your rights to control our use of them.
          </p>
          <p style={{ marginBottom: 24 }}>
            In some cases we may use cookies to collect personal information, or that becomes personal information if we combine it with other information.
          </p>

          {[
            {
              title: 'What are cookies?',
              content: (
                <p>Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information. Cookies set by the website owner are called "first-party cookies." Cookies set by parties other than the website owner are called "third-party cookies."</p>
              ),
            },
            {
              title: 'Why do we use cookies?',
              content: (
                <p>We use first- and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate — we refer to these as "essential" or "strictly necessary" cookies. Other cookies enable us to track and target the interests of our users to enhance the experience on our Website. Third parties serve cookies through our Website for analytics and other purposes.</p>
              ),
            },
            {
              title: 'How can I control cookies?',
              content: (
                <>
                  <p style={{ marginBottom: 12 }}>You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Preference Center shown when you first visit our site.</p>
                  <p>Essential cookies cannot be rejected as they are strictly necessary to provide you with services. If you choose to reject other cookies, you may still use our Website though your access to some functionality may be restricted.</p>
                </>
              ),
            },
            {
              title: 'Essential website cookies',
              content: (
                <>
                  <p style={{ marginBottom: 12 }}>These cookies are strictly necessary to provide you with services available through our Website and to use some of its features, such as access to secure areas.</p>
                  <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 10, padding: '14px 16px', fontSize: 13 }}>
                    <p style={{ marginBottom: 6 }}><strong style={{ color: 'var(--text)' }}>Name:</strong> __cf_bm</p>
                    <p style={{ marginBottom: 6 }}><strong style={{ color: 'var(--text)' }}>Purpose:</strong> Cloudflare places this cookie on end-user devices that access customer sites protected by Bot Management.</p>
                    <p style={{ marginBottom: 6 }}><strong style={{ color: 'var(--text)' }}>Service:</strong> CloudFlare</p>
                    <p><strong style={{ color: 'var(--text)' }}>Expires in:</strong> 30 minutes</p>
                  </div>
                </>
              ),
            },
            {
              title: 'Analytics and customization cookies',
              content: (
                <p>These cookies collect information that is used either in aggregate form to help us understand how our Website is being used or how effective our marketing campaigns are, or to help us customize our Website for you.</p>
              ),
            },
            {
              title: 'How can I control cookies on my browser?',
              content: (
                <>
                  <p style={{ marginBottom: 12 }}>As the means by which you can refuse cookies through your web browser controls vary from browser to browser, you should visit your browser's help menu for more information. You can manage cookies in the following browsers:</p>
                  <ul style={{ paddingLeft: 20 }}>
                    {['Chrome', 'Internet Explorer', 'Firefox', 'Safari', 'Edge', 'Opera'].map((b) => (
                      <li key={b} style={{ marginBottom: 4 }}>{b}</li>
                    ))}
                  </ul>
                </>
              ),
            },
            {
              title: 'What about other tracking technologies, like web beacons?',
              content: (
                <p>Cookies are not the only way to recognize or track visitors to a website. We may use other, similar technologies from time to time, like web beacons (sometimes called "tracking pixels" or "clear gifs"). These are tiny graphics files that contain a unique identifier that enables us to recognize when someone has visited our Website or opened an email including them.</p>
              ),
            },
            {
              title: 'Do you serve targeted advertising?',
              content: (
                <p>Third parties may serve cookies on your computer or mobile device to serve advertising through our Website. These companies may use information about your visits to this and other websites in order to provide relevant advertisements about goods and services that you may be interested in.</p>
              ),
            },
            {
              title: 'How often will you update this Cookie Policy?',
              content: (
                <p>We may update this Cookie Policy from time to time in order to reflect changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore revisit this Cookie Policy regularly to stay informed. The date at the top of this Cookie Policy indicates when it was last updated.</p>
              ),
            },
            {
              title: 'Where can I get further information?',
              content: (
                <>
                  <p style={{ marginBottom: 8 }}>If you have any questions about our use of cookies or other technologies, please email us at <a href="mailto:sp3techinitiative@gmail.com" style={{ color: 'var(--teal)' }}>sp3techinitiative@gmail.com</a> or by post to:</p>
                  <p style={{ color: 'var(--text)' }}>
                      a<br />
                    Phone: (+234) 09060572687
                  </p>
                </>
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
