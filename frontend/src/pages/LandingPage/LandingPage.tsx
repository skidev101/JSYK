import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Copy,
  LockKeyhole,
  MessageCircle,
  Send,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <main className="landing-page">
      <nav className="landing-nav" aria-label="Primary navigation">
        <a className="landing-brand" href="/" aria-label="JSYK home">
          <span className="landing-brand-mark">J</span>
          <span>jsyk</span>
        </a>

        <div className="landing-nav-links">
          <a href="#how-it-works">How it works</a>
          <a href="#privacy">Privacy</a>
        </div>

        <div className="landing-nav-actions">
          <button className="landing-login" onClick={() => navigate("/login")}>
            Log in
          </button>
          <button className="landing-nav-cta" onClick={() => navigate("/register")}>
            Create your link <ArrowUpRight size={16} strokeWidth={2.2} />
          </button>
        </div>
      </nav>

      <section className="landing-hero">
        <div className="landing-hero-copy">
          <div className="landing-kicker">
            <span className="landing-kicker-dot" />
            The honest inbox
          </div>
          <h1>
            Give people a place to say what they <em>really</em> think.
          </h1>
          <p className="landing-hero-description">
            A simple, anonymous link for the questions, opinions, and messages
            people are too shy to send anywhere else.
          </p>
          <div className="landing-hero-actions">
            <button className="landing-primary-button" onClick={() => navigate("/register")}>
              Make your link <ArrowUpRight size={18} />
            </button>
            <a className="landing-text-link" href="#how-it-works">
              See how it works <ChevronDown size={16} />
            </a>
          </div>
          <p className="landing-microcopy">
            <ShieldCheck size={14} /> No credit card. No public profile required.
          </p>
        </div>

        <div className="landing-hero-visual" aria-label="Example of a JSYK anonymous inbox">
          <div className="landing-note landing-note-top">
            <span>someone sent you a note</span>
            <MessageCircle size={17} />
          </div>
          <div className="landing-inbox-card">
            <div className="landing-inbox-header">
              <div className="landing-avatar">m</div>
              <div>
                <p className="landing-inbox-name">monaski</p>
                <p className="landing-inbox-url">jsyk.me/m/monaski</p>
              </div>
              <button className="landing-icon-button" title="Copy link" aria-label="Copy link">
                <Copy size={16} />
              </button>
            </div>
            <div className="landing-inbox-rule" />
            <p className="landing-inbox-prompt">What have you wanted to ask me?</p>
            <div className="landing-message-box">
              <span>Type something honest...</span>
              <span className="landing-character-count">0/500</span>
            </div>
            <button className="landing-send-button">
              Send anonymously <Send size={15} />
            </button>
            <div className="landing-inbox-footer">
              <LockKeyhole size={13} /> Your identity stays private
            </div>
          </div>
          <div className="landing-note landing-note-bottom">
            <Check size={16} />
            <span>honest looks good on you</span>
          </div>
        </div>
      </section>

      <section className="landing-proof-row" aria-label="Product benefits">
        <div>
          <span className="landing-proof-number">01</span>
          <p><strong>One link.</strong> Share it anywhere.</p>
        </div>
        <div>
          <span className="landing-proof-number">02</span>
          <p><strong>Zero names.</strong> Keep it honest.</p>
        </div>
        <div>
          <span className="landing-proof-number">03</span>
          <p><strong>Your inbox.</strong> You choose what stays.</p>
        </div>
      </section>

      <section className="landing-section landing-steps-section" id="how-it-works">
        <div className="landing-section-heading">
          <p className="landing-eyebrow">How it works</p>
          <h2>Less performing.<br /><span>More saying.</span></h2>
          <p>JSYK gives people just enough distance to be genuine, and gives you a better way to listen.</p>
        </div>
        <div className="landing-steps">
          <article className="landing-step">
            <span className="landing-step-number">1</span>
            <UserRound size={22} />
            <h3>Make your link</h3>
            <p>Set up a personal inbox in under a minute. Add your link to your bio, story, or group chat.</p>
          </article>
          <article className="landing-step landing-step-featured">
            <span className="landing-step-number">2</span>
            <MessageCircle size={22} />
            <h3>Hear from people</h3>
            <p>Friends and followers can send questions, feedback, or a little truth without attaching a name.</p>
          </article>
          <article className="landing-step">
            <span className="landing-step-number">3</span>
            <Sparkles size={22} />
            <h3>Keep the good stuff</h3>
            <p>Read every message in your private dashboard and decide what deserves a reply or a share.</p>
          </article>
        </div>
      </section>

      <section className="landing-section landing-privacy-section" id="privacy">
        <div className="landing-privacy-panel">
          <div className="landing-privacy-stamp"><LockKeyhole size={19} /> private by default</div>
          <div className="landing-privacy-content">
            <p className="landing-eyebrow">Built for honesty</p>
            <h2>The point is the message.<br /><span>Not who sent it.</span></h2>
            <p>Anonymous should feel simple, not suspicious. We keep the experience focused on the conversation and give you control over your space.</p>
            <div className="landing-check-list">
              <span><Check size={15} /> No public follower counts</span>
              <span><Check size={15} /> No names attached to messages</span>
              <span><Check size={15} /> No noisy social feed to maintain</span>
            </div>
          </div>
          <div className="landing-privacy-quote">
            <span className="landing-quote-mark">“</span>
            <p>Sometimes the kindest thing someone can say starts with a blank name.</p>
            <span className="landing-quote-line" />
            <small>JSYK, just so you know</small>
          </div>
        </div>
      </section>

      <section className="landing-final-cta">
        <p className="landing-eyebrow">Your turn</p>
        <h2>Open the door<br /><em>to honest.</em></h2>
        <button className="landing-primary-button" onClick={() => navigate("/register")}>
          Create your free link <ArrowUpRight size={18} />
        </button>
      </section>

      <footer className="landing-footer">
        <a className="landing-brand" href="/" aria-label="JSYK home">
          <span className="landing-brand-mark">J</span>
          <span>jsyk</span>
        </a>
        <p>Just so you know.</p>
        <div><span>© {new Date().getFullYear()} JSYK</span><a href="https://x.com/monaski_">Built by monaski</a></div>
      </footer>
    </main>
  );
};

export default LandingPage;
