import Head from 'next/head';

export default function Home() {
  const handleCheckout = async (plan) => {
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Error creating checkout. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('Error creating checkout. Please try again.');
    }
  };

  return (
    <>
      <Head>
        <title>AI Client Attraction Suite | Coaches: Let AI Bring You Clients</title>
        <meta name="description" content="The complete AI-powered system that attracts, nurtures, and converts coaching clients on autopilot. Stop drowning in marketing. Start coaching." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: #0a0a0a;
          color: #ffffff;
          line-height: 1.7;
        }
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 40px 20px;
        }
        .hero {
          text-align: center;
          padding: 60px 0;
        }
        .pre-headline {
          color: #22c55e;
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 20px;
        }
        .headline {
          font-size: clamp(32px, 6vw, 56px);
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 24px;
        }
        .headline span {
          color: #22c55e;
        }
        .subheadline {
          font-size: 20px;
          color: #a1a1aa;
          max-width: 600px;
          margin: 0 auto 40px;
        }
        .video-container {
          background: #18181b;
          border-radius: 16px;
          padding: 20px;
          margin: 40px 0;
          border: 1px solid #27272a;
        }
        .video-wrapper {
          position: relative;
          padding-bottom: 56.25%;
          height: 0;
          border-radius: 8px;
          overflow: hidden;
        }
        .video-wrapper video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .section {
          padding: 60px 0;
          border-bottom: 1px solid #27272a;
        }
        .section-title {
          font-size: 32px;
          font-weight: 800;
          margin-bottom: 24px;
          text-align: center;
        }
        .section-title span {
          color: #22c55e;
        }
        p {
          font-size: 18px;
          color: #d4d4d8;
          margin-bottom: 20px;
        }
        .highlight {
          color: #ffffff;
          font-weight: 600;
        }
        .green {
          color: #22c55e;
        }
        .problem-list {
          list-style: none;
          margin: 30px 0;
        }
        .problem-list li {
          padding: 16px 0 16px 40px;
          position: relative;
          font-size: 18px;
          color: #d4d4d8;
          border-bottom: 1px solid #27272a;
        }
        .problem-list li::before {
          content: "✗";
          position: absolute;
          left: 0;
          color: #ef4444;
          font-weight: bold;
          font-size: 20px;
        }
        .solution-list {
          list-style: none;
          margin: 30px 0;
        }
        .solution-list li {
          padding: 16px 0 16px 40px;
          position: relative;
          font-size: 18px;
          color: #d4d4d8;
          border-bottom: 1px solid #27272a;
        }
        .solution-list li::before {
          content: "✓";
          position: absolute;
          left: 0;
          color: #22c55e;
          font-weight: bold;
          font-size: 20px;
        }
        .module-card {
          background: #18181b;
          border: 1px solid #27272a;
          border-radius: 16px;
          padding: 32px;
          margin: 20px 0;
        }
        .module-number {
          color: #22c55e;
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 12px;
        }
        .module-title {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 16px;
        }
        .module-desc {
          color: #a1a1aa;
          font-size: 16px;
        }
        .bonus-card {
          background: linear-gradient(135deg, #18181b 0%, #1f2937 100%);
          border: 2px solid #22c55e;
          border-radius: 16px;
          padding: 24px;
          margin: 16px 0;
        }
        .bonus-tag {
          background: #22c55e;
          color: #000;
          font-size: 12px;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 20px;
          display: inline-block;
          margin-bottom: 12px;
        }
        .bonus-title {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 8px;
        }
        .bonus-value {
          color: #22c55e;
          font-size: 14px;
          font-weight: 600;
        }
        .price-section {
          text-align: center;
          padding: 80px 0;
        }
        .price-box {
          background: #18181b;
          border: 2px solid #22c55e;
          border-radius: 24px;
          padding: 48px;
          max-width: 500px;
          margin: 0 auto;
        }
        .price-label {
          color: #a1a1aa;
          font-size: 16px;
          margin-bottom: 8px;
        }
        .price {
          font-size: 72px;
          font-weight: 900;
          color: #22c55e;
        }
        .price-note {
          color: #71717a;
          font-size: 14px;
          margin-top: 8px;
        }
        .payment-plan {
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid #27272a;
          color: #a1a1aa;
          font-size: 16px;
        }
        .cta-button {
          display: block;
          width: 100%;
          background: #22c55e;
          color: #000;
          font-size: 20px;
          font-weight: 700;
          padding: 20px 40px;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          margin-top: 32px;
          text-decoration: none;
          text-align: center;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 40px rgba(34, 197, 94, 0.3);
        }
        .cta-secondary {
          display: block;
          width: 100%;
          background: transparent;
          color: #22c55e;
          font-size: 16px;
          font-weight: 600;
          padding: 16px 40px;
          border: 2px solid #22c55e;
          border-radius: 12px;
          cursor: pointer;
          margin-top: 16px;
          text-decoration: none;
          text-align: center;
          transition: all 0.2s;
        }
        .cta-secondary:hover {
          background: #22c55e;
          color: #000;
        }
        .guarantee {
          background: #18181b;
          border: 1px solid #27272a;
          border-radius: 16px;
          padding: 32px;
          text-align: center;
          margin: 40px 0;
        }
        .guarantee-badge {
          font-size: 48px;
          margin-bottom: 16px;
        }
        .guarantee-title {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 12px;
        }
        .guarantee-text {
          color: #a1a1aa;
          font-size: 16px;
        }
        .objection {
          background: #18181b;
          border-radius: 12px;
          padding: 24px;
          margin: 16px 0;
        }
        .objection-q {
          font-weight: 700;
          margin-bottom: 12px;
          color: #f59e0b;
        }
        .objection-a {
          color: #a1a1aa;
          font-size: 16px;
        }
        .identity-box {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin: 40px 0;
        }
        @media (max-width: 600px) {
          .identity-box {
            grid-template-columns: 1fr;
          }
        }
        .identity-card {
          background: #18181b;
          border-radius: 16px;
          padding: 32px;
          text-align: center;
        }
        .identity-card.before {
          border: 2px solid #ef4444;
        }
        .identity-card.after {
          border: 2px solid #22c55e;
        }
        .identity-label {
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 16px;
        }
        .identity-card.before .identity-label {
          color: #ef4444;
        }
        .identity-card.after .identity-label {
          color: #22c55e;
        }
        .identity-list {
          list-style: none;
          text-align: left;
        }
        .identity-list li {
          padding: 8px 0;
          color: #a1a1aa;
          font-size: 15px;
        }
        .footer {
          text-align: center;
          padding: 40px 0;
          color: #52525b;
          font-size: 14px;
        }
        .final-cta {
          background: linear-gradient(180deg, #18181b 0%, #0a0a0a 100%);
          padding: 80px 0;
          text-align: center;
        }
      `}</style>

      <div className="container">
        {/* HERO */}
        <div className="hero">
          <div className="pre-headline">For Coaches Ready to Scale</div>
          <h1 className="headline">
            Let <span>AI</span> Attract Clients<br />While You Coach
          </h1>
          <p className="subheadline">
            The complete AI-powered system that attracts, nurtures, and converts coaching clients — without spending hours on marketing every day.
          </p>
        </div>

        {/* VIDEO */}
        <div className="video-container">
          <div className="video-wrapper">
            <video 
              controls 
              poster="/video-poster.jpg"
              preload="metadata"
            >
              <source src="https://files.catbox.moe/24koc0.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* PROBLEM */}
        <div className="section">
          <h2 className="section-title">The <span>Marketing Trap</span> Killing Your Coaching Business</h2>
          
          <p>You didn't become a coach to spend 4 hours a day on marketing.</p>
          
          <p>But here you are. Staring at a blank screen, trying to come up with yet another LinkedIn post. Another email. Another piece of content that might — <span className="highlight">maybe</span> — bring in a lead.</p>
          
          <p>Meanwhile, your actual coaching? The thing you're <span className="highlight">brilliant</span> at? It's getting squeezed into whatever time you have left.</p>

          <ul className="problem-list">
            <li>Spending hours creating content that gets 12 likes and zero clients</li>
            <li>Writing emails to a list that never opens them</li>
            <li>Chasing leads in DMs who ghost you after "sounds interesting"</li>
            <li>Watching other coaches grow while you're stuck at the same revenue</li>
            <li>Feeling like a full-time marketer who coaches on the side</li>
          </ul>

          <p>This isn't sustainable. And deep down, you know it.</p>
          
          <p><span className="highlight">There has to be a better way.</span></p>
        </div>

        {/* SOLUTION */}
        <div className="section">
          <h2 className="section-title">What If <span>AI</span> Did Your Marketing For You?</h2>
          
          <p>Imagine waking up to:</p>

          <ul className="solution-list">
            <li>New leads in your inbox — people who already trust you</li>
            <li>A week's worth of content ready to post in minutes</li>
            <li>Emails that nurture and book discovery calls while you sleep</li>
            <li>DM conversations that convert without being pushy</li>
            <li>More time coaching. Less time marketing.</li>
          </ul>

          <p>This isn't fantasy. This is what AI makes possible <span className="highlight">right now</span>.</p>
          
          <p>The coaches who figure this out first? They're going to dominate. The ones who don't? They'll keep drowning in content calendars and burnout.</p>

          <p><span className="green">Which one are you going to be?</span></p>
        </div>

        {/* PRODUCT */}
        <div className="section">
          <h2 className="section-title">Introducing: <span>AI Client Attraction Suite</span></h2>
          
          <p style={{textAlign: 'center', maxWidth: '600px', margin: '0 auto 40px'}}>
            The complete system that puts AI to work attracting, nurturing, and converting coaching clients for you.
          </p>

          <div className="module-card">
            <div className="module-number">Module 1</div>
            <div className="module-title">AI Content Engine</div>
            <p className="module-desc">Generate weeks of high-converting content in minutes. LinkedIn posts, Instagram captions, emails, video scripts — all done. Never stare at a blank screen again.</p>
          </div>

          <div className="module-card">
            <div className="module-number">Module 2</div>
            <div className="module-title">Lead Magnet Generator</div>
            <p className="module-desc">Create irresistible free offers that build your list fast. Guides, checklists, assessments, mini-courses — AI handles the heavy lifting while you customize for your niche.</p>
          </div>

          <div className="module-card">
            <div className="module-number">Module 3</div>
            <div className="module-title">Automated Nurture System</div>
            <p className="module-desc">A done-for-you 7-email sequence that warms up cold leads and books discovery calls on autopilot. Just plug in your details and deploy.</p>
          </div>

          <div className="module-card">
            <div className="module-number">Module 4</div>
            <div className="module-title">AI Sales Conversations</div>
            <p className="module-desc">DM scripts that convert without being sleazy. Discovery call frameworks that close. Objection handling that makes "I need to think about it" disappear.</p>
          </div>

          <div className="module-card">
            <div className="module-number">Module 5</div>
            <div className="module-title">Client Attraction Dashboard</div>
            <p className="module-desc">Track your leads, conversions, and revenue. Plan your content with our AI calendar. Follow a 90-day roadmap to consistent $10K+ months.</p>
          </div>
        </div>

        {/* BONUSES */}
        <div className="section">
          <h2 className="section-title">Plus These <span>Bonuses</span></h2>

          <div className="bonus-card">
            <div className="bonus-tag">BONUS #1</div>
            <div className="bonus-title">50 Proven Coach Content Hooks</div>
            <p className="module-desc">Swipe file of hooks that stop the scroll. Proven to generate engagement and leads for coaches in every niche.</p>
            <div className="bonus-value">Value: $197</div>
          </div>

          <div className="bonus-card">
            <div className="bonus-tag">BONUS #2</div>
            <div className="bonus-title">Discovery Call Script + AI Prep</div>
            <p className="module-desc">The exact script top coaches use to close high-ticket clients. Plus AI prompts to prepare for every call in 5 minutes.</p>
            <div className="bonus-value">Value: $297</div>
          </div>

          <div className="bonus-card">
            <div className="bonus-tag">BONUS #3</div>
            <div className="bonus-title">30-Day Private Community Access</div>
            <p className="module-desc">Get support, feedback, and accountability from other coaches implementing the system. Plus live Q&A access.</p>
            <div className="bonus-value">Value: $197</div>
          </div>
        </div>

        {/* IDENTITY TRANSFORMATION */}
        <div className="section">
          <h2 className="section-title">This Isn't Just About <span>Getting Clients</span></h2>
          
          <p style={{textAlign: 'center', maxWidth: '600px', margin: '0 auto 20px'}}>
            It's about who you become when marketing is handled.
          </p>

          <div className="identity-box">
            <div className="identity-card before">
              <div className="identity-label">Before</div>
              <ul className="identity-list">
                <li>Stressed about where the next client will come from</li>
                <li>Posting content that gets ignored</li>
                <li>Working 60 hours but half of it is marketing</li>
                <li>Feeling like a fraud charging premium prices</li>
                <li>Wondering if you should just get a "real job"</li>
              </ul>
            </div>
            <div className="identity-card after">
              <div className="identity-label">After</div>
              <ul className="identity-list">
                <li>Confident because leads come in consistently</li>
                <li>Known as the go-to coach in your niche</li>
                <li>Working 30 hours, mostly with clients you love</li>
                <li>Charging premium because your calendar is full</li>
                <li>Building a real business, not a stressful side hustle</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FUTURE VISUALIZATION */}
        <div className="section">
          <h2 className="section-title">Picture This: <span>90 Days From Now</span></h2>
          
          <p>It's Monday morning. You check your email over coffee.</p>
          
          <p>Three new leads came in over the weekend — people who downloaded your AI-generated lead magnet and are now asking about working with you.</p>
          
          <p>Your content for the week? <span className="highlight">Already created</span> and scheduled. Took you 20 minutes on Friday.</p>
          
          <p>You have two discovery calls today. Both prospects have been nurtured by your automated email sequence. They're not cold leads — they're <span className="highlight">warm buyers</span> ready to invest.</p>
          
          <p>By lunch, you've signed a new client at $3,000. Your second this week.</p>
          
          <p>The afternoon? You're coaching. Doing what you love. Making the impact you got into this for.</p>
          
          <p><span className="green">This is what's possible when AI handles your marketing.</span></p>
        </div>

        {/* DIFFERENTIATION */}
        <div className="section">
          <h2 className="section-title">Why This Is <span>Different</span></h2>
          
          <p>You've probably seen other "AI for coaches" programs. Here's why this one actually works:</p>

          <ul className="solution-list">
            <li><span className="highlight">Not just prompts.</span> You get complete systems, templates, and frameworks — ready to deploy.</li>
            <li><span className="highlight">Built for coaches.</span> Every template is optimized for coaching niches, not generic business.</li>
            <li><span className="highlight">Implementation-focused.</span> Follow the 90-day roadmap, see results. No guessing.</li>
            <li><span className="highlight">Actually works in 2026.</span> Updated strategies that work with current AI tools and algorithms.</li>
            <li><span className="highlight">Results-guaranteed.</span> Get a lead in 30 days or get your money back.</li>
          </ul>
        </div>

        {/* OBJECTIONS */}
        <div className="section">
          <h2 className="section-title">Questions You Might Have</h2>

          <div className="objection">
            <div className="objection-q">"I'm not tech-savvy. Can I really do this?"</div>
            <div className="objection-a">Yes. If you can copy and paste, you can use this system. We provide exact prompts, templates, and step-by-step videos. Many of our most successful users started with zero AI experience.</div>
          </div>

          <div className="objection">
            <div className="objection-q">"Won't AI-generated content sound robotic?"</div>
            <div className="objection-a">Not with our system. We teach you how to train AI on YOUR voice, YOUR stories, YOUR style. Your audience won't know the difference — they'll just notice you're posting more consistently.</div>
          </div>

          <div className="objection">
            <div className="objection-q">"I've tried other marketing programs. Nothing works."</div>
            <div className="objection-a">Because they made YOU do all the work. This system automates 80% of the effort. You focus on the 20% that requires your human touch — like actually coaching.</div>
          </div>

          <div className="objection">
            <div className="objection-q">"Is $997 worth it?"</div>
            <div className="objection-a">If you sign ONE additional client from this system — at $2K, $3K, $5K or more — it pays for itself immediately. Most coaches see ROI within the first month.</div>
          </div>

          <div className="objection">
            <div className="objection-q">"What if it doesn't work for me?"</div>
            <div className="objection-a">Then you get your money back. Our 30-Day First Lead Guarantee means you have nothing to lose. Implement the system, get a lead, or get a refund. Simple.</div>
          </div>
        </div>

        {/* PRICE */}
        <div className="price-section">
          <h2 className="section-title">Get Started Today</h2>
          
          <div className="price-box">
            <div className="price-label">Your Investment</div>
            <div className="price">$997</div>
            <div className="price-note">One-time payment • Lifetime access</div>
            
            <button onClick={() => handleCheckout('full')} className="cta-button">
              Get Instant Access →
            </button>

            <div className="payment-plan">
              Or split into 3 payments of $366
            </div>
            
            <button onClick={() => handleCheckout('payment-plan')} className="cta-secondary">
              Choose Payment Plan
            </button>
          </div>

          <div className="guarantee">
            <div className="guarantee-badge">🛡️</div>
            <div className="guarantee-title">30-Day First Lead Guarantee</div>
            <p className="guarantee-text">
              Implement the system and get your first AI-generated lead within 30 days — or get a full refund. No hoops. No hassle. You're completely protected.
            </p>
          </div>
        </div>

        {/* FINAL CTA */}
        <div className="final-cta">
          <h2 className="section-title">Your Coaching Business<br />Deserves <span>Better</span></h2>
          
          <p style={{textAlign: 'center', maxWidth: '600px', margin: '0 auto 40px'}}>
            Stop drowning in marketing. Start attracting clients with AI.<br />
            The coaches who move now will dominate their niche.<br />
            <span className="green">Be one of them.</span>
          </p>

          <div style={{maxWidth: '400px', margin: '0 auto'}}>
            <button onClick={() => handleCheckout('full')} className="cta-button">
              Get Instant Access — $997
            </button>
            <button onClick={() => handleCheckout('payment-plan')} className="cta-secondary">
              Or 3 Payments of $366
            </button>
          </div>
        </div>

        {/* FOOTER */}
        <div className="footer">
          <p>© 2026 AI Client Attraction Suite. All rights reserved.</p>
          <p style={{marginTop: '8px'}}>Questions? Contact support@example.com</p>
        </div>
      </div>
    </>
  );
}
