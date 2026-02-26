import Head from 'next/head';

export default function Success() {
  return (
    <>
      <Head>
        <title>Welcome! | AI Client Attraction Suite</title>
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
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 60px 20px;
          text-align: center;
        }
        .success-icon {
          font-size: 80px;
          margin-bottom: 24px;
        }
        h1 {
          font-size: 48px;
          font-weight: 900;
          margin-bottom: 16px;
        }
        h1 span {
          color: #22c55e;
        }
        p {
          font-size: 18px;
          color: #a1a1aa;
          margin-bottom: 24px;
        }
        .highlight {
          color: #ffffff;
          font-weight: 600;
        }
        .next-steps {
          background: #18181b;
          border: 1px solid #27272a;
          border-radius: 16px;
          padding: 32px;
          margin: 40px 0;
          text-align: left;
        }
        .next-steps h2 {
          font-size: 20px;
          margin-bottom: 20px;
          color: #22c55e;
        }
        .step {
          display: flex;
          gap: 16px;
          margin-bottom: 16px;
          align-items: flex-start;
        }
        .step-num {
          background: #22c55e;
          color: #000;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 14px;
          flex-shrink: 0;
        }
        .step-text {
          color: #d4d4d8;
          font-size: 16px;
        }
        .cta-button {
          display: inline-block;
          background: #22c55e;
          color: #000;
          font-size: 18px;
          font-weight: 700;
          padding: 16px 32px;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 40px rgba(34, 197, 94, 0.3);
        }
      `}</style>

      <div className="container">
        <div className="success-icon">🎉</div>
        <h1>You're <span>In!</span></h1>
        <p>
          Welcome to the <span className="highlight">AI Client Attraction Suite</span>. 
          Your access is being set up right now.
        </p>

        <div className="next-steps">
          <h2>What Happens Next:</h2>
          <div className="step">
            <div className="step-num">1</div>
            <div className="step-text">Check your email for login credentials (arriving in the next few minutes)</div>
          </div>
          <div className="step">
            <div className="step-num">2</div>
            <div className="step-text">Log into the member area and start with Module 1</div>
          </div>
          <div className="step">
            <div className="step-num">3</div>
            <div className="step-text">Join the private community and introduce yourself</div>
          </div>
          <div className="step">
            <div className="step-num">4</div>
            <div className="step-text">Follow the 90-day roadmap and watch the clients roll in</div>
          </div>
        </div>

        <p>
          Questions? Reply to your welcome email and we'll help you out.
        </p>

        <a href="/" className="cta-button">
          Back to Home
        </a>
      </div>
    </>
  );
}
