import { CSSProperties, useRef, useState } from 'react'

import { AppMarquee } from '../components/AppMarquee'
import { DownloadModal } from '../components/DownloadModal'
import { InlineSuggestionDemo, MidSentenceDemo, SpellCorrectionDemo } from '../components/FeatureDemos'
import { ScrollSuggestionText, SuggestionText } from '../components/SuggestionText'
import { useScrollProgress } from '../lib/useScrollProgress'

const corePrefix = 'I think the cleanest way to explain this is'
const coreWords = ['to', 'show', 'it', 'where', 'people', 'already', 'write.']
const mindPrefix = 'Maya, I can send the notes'
const mindWords = ['after', 'our', 'Friday', 'demo,', 'like', 'usual.']

type DownloadButtonProps = {
  children: string
  onClick: () => void
  className?: string
}

function DownloadButton({ children, onClick, className = '' }: DownloadButtonProps) {
  return (
    <button className={`download ${className}`} type="button" onClick={onClick}>
      {children}
    </button>
  )
}

function Header({ onDownload }: { onDownload: () => void }) {
  return (
    <header className="topbar">
      <a className="brand" href="#top" aria-label="Superbinary home">
        Superbinary
      </a>
      <DownloadButton className="nav-download" onClick={onDownload}>
        Download
      </DownloadButton>
    </header>
  )
}

function Hero({ onDownload }: { onDownload: () => void }) {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-inner">
        <p className="eyebrow">Superbinary</p>
        <h1 id="hero-title">
          <SuggestionText accepted="Autocomplete your" ghost=" thoughts." />
        </h1>
        <p className="lead">
          A private Mac autocomplete layer for messages, notes, docs, email, and the places you write every day.
        </p>
        <DownloadButton onClick={onDownload}>Download for Mac</DownloadButton>
        <p className="trial">14-day free trial. No credit card required.</p>
      </div>
    </section>
  )
}

function CoreInteractionStory() {
  const ref = useRef<HTMLElement | null>(null)
  const progress = useScrollProgress(ref)
  const sectionStyle = { '--story-progress': progress.toFixed(4) } as CSSProperties

  return (
    <section className="scroll-story" id="ghost-story" ref={ref} style={sectionStyle} aria-labelledby="ghost-title">
      <div className="sticky-frame">
        <div className="stage">
          <p className="story-label">The core interaction.</p>
          <div className="writing-surface">
            <div className="window-dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <p className="sentence">
              <ScrollSuggestionText acceptedPrefix={corePrefix} words={coreWords} progress={progress} />
            </p>
            <div className="progress-line" aria-hidden="true" />
          </div>
          <div className="caption">
            <h2 id="ghost-title">Accept the next word. Stay in control.</h2>
            <p>Take the words that feel right. Keep typing when they do not.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Highlights() {
  const cards = [
    {
      title: 'Inline Suggestion.',
      body: 'The next words appear right where you are writing, so your eyes stay on the sentence.',
      demo: <InlineSuggestionDemo />,
    },
    {
      title: 'Mid-sentence.',
      body: 'Superbinary can pick up a thought while it is still forming, not only after you pause.',
      demo: <MidSentenceDemo />,
    },
    {
      title: 'Spell Correction.',
      body: 'When a word is off, Superbinary can offer the clean version before you leave the sentence.',
      demo: <SpellCorrectionDemo />,
    },
  ]

  return (
    <section className="highlights" aria-labelledby="highlights-title">
      <div className="section-head">
        <p className="eyebrow">Get the highlights.</p>
        <h2 id="highlights-title">A faster way to finish what you meant.</h2>
        <p>
          Superbinary turns the typing moment into a simple flow: see the suggestion, accept the next word, keep
          writing.
        </p>
      </div>
      <div className="highlight-grid">
        {cards.map((card) => (
          <article className="highlight-card" key={card.title}>
            <div className="feature-demo" aria-hidden="true">
              {card.demo}
            </div>
            <div>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function MindSignalStory() {
  const ref = useRef<HTMLElement | null>(null)
  const progress = useScrollProgress(ref)
  const sectionStyle = { '--mind-progress': progress.toFixed(4) } as CSSProperties

  return (
    <section className="mind-story" id="mindsignal" ref={ref} style={sectionStyle} aria-labelledby="mind-title">
      <div className="sticky-frame">
        <div className="stage">
          <p className="story-label">MindSignal</p>
          <div className="mind-wrap">
            <div className="context-chip chip-one">person: Maya</div>
            <div className="context-chip chip-two">your rhythm: Friday demo notes</div>
            <div className="context-chip chip-three">current app: Messages</div>
            <div className="writing-surface mind-surface">
              <div className="window-dots" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <p className="mind-line">
                <ScrollSuggestionText acceptedPrefix={mindPrefix} words={mindWords} progress={progress} />
              </p>
              <div className="progress-line" aria-hidden="true" />
            </div>
          </div>
          <div className="caption">
            <h2 id="mind-title">MindSignal helps the suggestion fit.</h2>
            <p>
              Context around the cursor helps Superbinary offer words that match the moment, without sending completion
              to the cloud.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function AppsSection() {
  return (
    <section className="apps" aria-labelledby="apps-title">
      <div className="section-head">
        <p className="eyebrow">Across your Mac.</p>
        <h2 id="apps-title">Write where you already work.</h2>
        <p>
          Messages, notes, docs, email, browser fields, and project tools. One autocomplete behavior across your Mac.
        </p>
      </div>
      <AppMarquee />
      <p className="app-note">
        App names are illustrative of normal writing surfaces, not partnerships or official integrations.
      </p>
    </section>
  )
}

function PrivacySection() {
  const ref = useRef<HTMLElement | null>(null)
  const progress = useScrollProgress(ref)
  const activeCount = Math.min(3, Math.floor(progress * 4))
  const proofs = [
    {
      title: 'Works offline.',
      body: 'The model ships with the app, so completion keeps working without the internet.',
    },
    {
      title: 'Firewall-testable.',
      body: 'Block outgoing connections with LuLu, Little Snitch, or Radio Silence and keep writing.',
    },
    {
      title: 'Keychain protected.',
      body: 'Private app data is encrypted locally with keys protected by macOS Keychain.',
    },
  ]

  return (
    <section className="privacy-story" id="privacy" ref={ref} aria-labelledby="privacy-title">
      <div className="sticky-frame">
        <div className="privacy-board">
          <div className="privacy-demo">
            <div className="privacy-lock" aria-hidden="true">
              <svg viewBox="0 0 72 72" role="img">
                <path
                  d="M22 32v-7.5C22 16.2 28.3 10 36 10s14 6.2 14 14.5V32h-7v-7.5c0-4.4-3.1-7.5-7-7.5s-7 3.1-7 7.5V32h-7Z"
                  fill="currentColor"
                />
                <path
                  d="M18 30h36c4.4 0 8 3.6 8 8v17c0 4.4-3.6 8-8 8H18c-4.4 0-8-3.6-8-8V38c0-4.4 3.6-8 8-8Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <p className="eyebrow">Privacy</p>
            <h2 id="privacy-title">Private by default.</h2>
            <p>
              Completion happens on your Mac. The model ships with the app. Your private text is not used for training.
            </p>
            <div className="privacy-icons" aria-hidden="true">
              {['Offline', 'Firewall', 'Keychain'].map((item, index) => (
                <div className={`privacy-icon ${index < activeCount ? 'active' : ''}`} key={item}>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="proofs">
            {proofs.map((proof, index) => (
              <article className={`proof ${index < activeCount ? 'active' : ''}`} key={proof.title}>
                <div className="proof-mark">{index + 1}</div>
                <div>
                  <h3>{proof.title}</h3>
                  <p>{proof.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function NativePricing({ onDownload }: { onDownload: () => void }) {
  return (
    <section className="native-pricing" id="pricing" aria-label="Native Mac simplicity and pricing">
      <article className="native">
        <div className="menubar" aria-hidden="true">
          <div className="menu-row">
            <strong>Superbinary</strong>
            <span className="toggle" />
          </div>
          <div className="menu-row">
            <span>MindSignal</span>
            <span className="toggle" />
          </div>
        </div>
        <h2>Simple enough to leave on.</h2>
        <p>Quiet menu bar presence, clear controls, and suggestions that disappear the moment you do not need them.</p>
      </article>
      <article className="pricing">
        <p className="eyebrow">Early adopter offer</p>
        <h2>Try it free for 14 days.</h2>
        <p>No credit card required.</p>
        <div className="price">$49.99</div>
        <div className="regular">Early adopter price. Regular $89.99.</div>
        <DownloadButton onClick={onDownload}>Download for Mac</DownloadButton>
      </article>
    </section>
  )
}

function FinalCta({ onDownload }: { onDownload: () => void }) {
  return (
    <section className="final" aria-labelledby="final-title">
      <div className="final-inner">
        <p className="eyebrow">Superbinary</p>
        <h2 id="final-title">Autocomplete your thoughts.</h2>
        <p className="lead">Download it, write a few sentences, and feel the difference before the trial ends.</p>
        <DownloadButton onClick={onDownload}>Download for Mac</DownloadButton>
        <p className="trial">14-day free trial. No credit card required.</p>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer" aria-label="Site information">
      <div className="footer-inner">
        <p className="footer-note">
          Superbinary is an independent Mac app for private, system-wide writing autocomplete.
        </p>
        <p className="footer-legal">
          Apple, Mac, macOS, Safari, Keychain, and related marks are trademarks of Apple Inc. Other names may be
          trademarks of their respective owners. Superbinary is not affiliated with or endorsed by Apple Inc.
        </p>
        <nav className="footer-links" aria-label="Footer links">
          <a href="#privacy">Privacy</a>
          <a href="#pricing">Pricing</a>
          <a href="mailto:hello@superbinary.ai">Contact</a>
        </nav>
      </div>
    </footer>
  )
}

export function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const openDownload = () => setIsModalOpen(true)

  return (
    <>
      <Header onDownload={openDownload} />
      <main>
        <Hero onDownload={openDownload} />
        <CoreInteractionStory />
        <Highlights />
        <MindSignalStory />
        <AppsSection />
        <PrivacySection />
        <NativePricing onDownload={openDownload} />
        <FinalCta onDownload={openDownload} />
      </main>
      <Footer />
      <DownloadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
