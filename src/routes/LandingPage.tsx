import { CSSProperties, useRef, useState } from 'react'

import { AppMarquee } from '../components/AppMarquee'
import { DownloadModal } from '../components/DownloadModal'
import { InlineSuggestionDemo, MidSentenceDemo, SpellCorrectionDemo } from '../components/FeatureDemos'
import { ScrollSuggestionText, SuggestionText } from '../components/SuggestionText'
import { cx } from '../lib/classes'
import { useScrollProgress } from '../lib/useScrollProgress'

const corePrefix = 'I think the cleanest way to explain this is'
const coreWords = ['to', 'show', 'it', 'where', 'people', 'already', 'write.']
const mindPrefix = 'Maya, I can send the notes'
const mindWords = ['after', 'our', 'Friday', 'demo,', 'like', 'usual.']
const faqItems = [
  {
    question: 'Does Superbinary work offline?',
    answer: 'Yes. The launch version ships with the model included, so suggestions keep working without the internet.',
  },
  {
    question: 'Does my writing leave my Mac?',
    answer:
      'No. Superbinary completes your writing locally on your Mac. There is no cloud completion loop, and your private text is not used for training.',
  },
  {
    question: 'Can I test that?',
    answer: 'Yes. Block outgoing connections with LuLu, Little Snitch, or Radio Silence and keep writing.',
  },
  {
    question: 'Why does it need Mac permissions?',
    answer:
      'To show suggestions where you are typing, Superbinary needs permission to work with Mac text fields. Onboarding will explain each permission plainly, with controls to pause or quit the app.',
  },
  {
    question: 'Is my local data protected?',
    answer: 'Private app data is encrypted locally, with keys protected by macOS Keychain and your Mac user account.',
  },
  {
    question: 'How do I accept a suggestion?',
    answer: 'Tap Tab to accept the next word. Tap again if the thought is still right.',
  },
  {
    question: 'What if a suggestion is not right?',
    answer: 'Keep typing. The suggestion disappears, and Superbinary follows your new direction.',
  },
  {
    question: 'Is this for teams?',
    answer: 'Superbinary is starting as a personal Mac app. It is not an enterprise admin or compliance platform.',
  },
]

type DownloadButtonProps = {
  children: string
  onClick: () => void
  className?: string
}

const downloadButtonClass =
  'inline-flex items-center justify-center rounded-full border-0 bg-sb-blue font-[650] text-white no-underline shadow-none'
const eyebrowClass = 'm-0 mb-2 text-[clamp(0.9375rem,1.4vw,1.1875rem)] font-[550] text-muted'
const h1Class = 'm-0 text-[clamp(3.25rem,10.8vw,7.875rem)] leading-[0.92] font-[750] tracking-[0] text-ink'
const h2Class = 'm-0 text-[clamp(2.625rem,7vw,5.875rem)] leading-[0.98] font-[750] tracking-[0] text-ink'
const h3Class = 'm-0 text-[clamp(1.625rem,4vw,3.25rem)] leading-[1.04] font-[750] tracking-[0] text-ink'
const leadClass =
  'mx-auto mt-6.5 max-w-180 text-[clamp(1.1875rem,2vw,1.6875rem)] leading-[1.24] font-medium text-[#45454a]'
const trialClass = 'm-0 mt-3.5 text-[0.9375rem] font-[550] text-muted'
const fullScreenSectionClass = 'grid min-h-screen place-items-center px-6 pt-22.5 pb-16 text-center'
const stickyFrameClass =
  'sticky top-0 grid min-h-screen place-items-center overflow-hidden px-6 pt-18 pb-10.5 motion-reduce:relative'
const storySectionClass = 'relative min-h-[320vh] motion-reduce:min-h-auto'
const stageClass = 'w-[min(70rem,100%)]'
const storyLabelClass = 'm-0 mb-6.5 text-center text-[clamp(0.875rem,1.4vw,1.0625rem)] font-[680] text-muted'
const writingSurfaceClass =
  'relative grid min-h-[clamp(19.375rem,43vw,30rem)] items-center rounded-[1.875rem] border border-hairline bg-panel p-[clamp(1.875rem,6vw,4.5rem)] shadow-panel backdrop-blur-[1.25rem] max-[38.75rem]:rounded-3xl'
const sectionHeadClass = 'mx-auto mb-8.5 w-[min(61.25rem,100%)] text-center'
const sectionHeadCopyClass =
  'mx-auto mt-5 max-w-170 text-[clamp(1.125rem,2vw,1.5rem)] leading-[1.3] font-[520] text-muted'
const panelCardClass = 'rounded-[1.875rem] border border-hairline bg-white/[0.78] shadow-panel max-[38.75rem]:rounded-3xl'

function DownloadButton({ children, onClick, className = '' }: DownloadButtonProps) {
  return (
    <button className={cx(downloadButtonClass, className)} type="button" onClick={onClick}>
      {children}
    </button>
  )
}

function WindowDots() {
  return (
    <div className="absolute top-5.5 left-6 flex gap-2" aria-hidden="true">
      <span className="h-3 w-3 rounded-full bg-[#d2d2d7]" />
      <span className="h-3 w-3 rounded-full bg-[#d2d2d7]" />
      <span className="h-3 w-3 rounded-full bg-[#d2d2d7]" />
    </div>
  )
}

function ProgressLine({ variable }: { variable: '--story-progress' | '--mind-progress' }) {
  return (
    <div
      className="absolute right-[clamp(1.375rem,4vw,2.75rem)] bottom-4.5 left-[clamp(1.375rem,4vw,2.75rem)] h-0.5 overflow-hidden rounded-full bg-black/[0.08] max-[38.75rem]:right-5.5 max-[38.75rem]:bottom-3.5 max-[38.75rem]:left-5.5"
      aria-hidden="true"
    >
      <div className="h-full rounded-[inherit] bg-black/[0.42]" style={{ width: `calc(var(${variable}) * 100%)` }} />
    </div>
  )
}

function Header({ onDownload }: { onDownload: () => void }) {
  return (
    <header className="fixed inset-x-0 top-0 z-20 flex h-13.5 items-center justify-between border-b border-black/[0.045] bg-paper/[0.72] px-[clamp(1.125rem,4vw,3.375rem)] backdrop-blur-[1.375rem] max-[38.75rem]:px-4">
      <a className="text-[0.9375rem] font-bold" href="#top" aria-label="Superbinary home">
        Superbinary
      </a>
      <DownloadButton className="min-h-7.5 px-3.5 text-[0.8125rem] max-[38.75rem]:hidden" onClick={onDownload}>
        Download
      </DownloadButton>
    </header>
  )
}

function Hero({ onDownload }: { onDownload: () => void }) {
  return (
    <section className={fullScreenSectionClass} id="top" aria-labelledby="hero-title">
      <div className="w-[min(60.625rem,100%)]">
        <p className={eyebrowClass}>On-device</p>
        <h1 className={h1Class} id="hero-title">
          <SuggestionText accepted="Autocomplete your" ghost=" thoughts." />
        </h1>
        <p className={leadClass}>
          A private Mac autocomplete layer for messages, notes, docs, email, and the places you write every day.
        </p>
        <DownloadButton className="mt-8.5 min-h-11.5 px-6 text-[1.0625rem]" onClick={onDownload}>
          Download for Mac
        </DownloadButton>
        <p className={trialClass}>14-day free trial. No credit card required.</p>
      </div>
    </section>
  )
}

function CoreInteractionStory() {
  const ref = useRef<HTMLElement | null>(null)
  const progress = useScrollProgress(ref)
  const sectionStyle = { '--story-progress': progress.toFixed(4) } as CSSProperties

  return (
    <section
      className={storySectionClass}
      id="ghost-story"
      ref={ref}
      style={sectionStyle}
      aria-labelledby="ghost-title"
    >
      <div className={stickyFrameClass}>
        <div className={stageClass}>
          <p className={storyLabelClass}>The core interaction.</p>
          <div className={writingSurfaceClass}>
            <WindowDots />
            <p className="m-0 w-full text-[clamp(2.125rem,6vw,4.75rem)] leading-[1.08] font-bold tracking-[0] text-balance">
              <ScrollSuggestionText acceptedPrefix={corePrefix} words={coreWords} progress={progress} />
            </p>
            <ProgressLine variable="--story-progress" />
          </div>
          <div className="mt-6 grid grid-cols-[1fr_auto] items-end gap-5 text-[#4a4a4f] max-[56.25rem]:grid-cols-1">
            <h2 className={h2Class} id="ghost-title">
              Accept the next word. Stay in control.
            </h2>
            <p className="m-0 max-w-[25.625rem] text-right text-[clamp(1rem,1.7vw,1.25rem)] leading-[1.35] font-[530] text-muted max-[56.25rem]:text-left">
              Take the words that feel right. Keep typing when they do not.
            </p>
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
    <section className="px-[clamp(1.25rem,5vw,4.375rem)] pt-22.5 pb-30" aria-labelledby="highlights-title">
      <div className={sectionHeadClass}>
        <p className={eyebrowClass}>Get the highlights.</p>
        <h2 className={h2Class} id="highlights-title">
          A faster way to finish what you meant.
        </h2>
        <p className={sectionHeadCopyClass}>
          Superbinary turns the typing moment into a simple flow: see the suggestion, accept the next word, keep
          writing.
        </p>
      </div>
      <div className="mx-auto grid w-[min(73.75rem,100%)] grid-cols-3 gap-3.5 max-[56.25rem]:grid-cols-1 max-[38.75rem]:gap-2.5">
        {cards.map((card) => (
          <article
            className="flex min-h-59 flex-col justify-between rounded-[1.375rem] border border-hairline bg-white/[0.78] p-6 shadow-[0_1.25rem_4.375rem_rgba(0,0,0,0.045)] max-[38.75rem]:min-h-44.5"
            key={card.title}
          >
            <div
              className="grid min-h-29 content-center gap-3 overflow-hidden rounded-[1.125rem] border border-black/[0.07] bg-white/[0.76] p-4.5 text-[#1d1d1f]"
              aria-hidden="true"
            >
              {card.demo}
            </div>
            <div>
              <h3 className={h3Class}>{card.title}</h3>
              <p className="m-0 mt-4 text-[1.0625rem] leading-[1.34] font-[520] text-muted">{card.body}</p>
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
  const chipClass =
    'absolute max-w-[14.375rem] translate-y-[calc((1-var(--mind-progress))*1.125rem)] rounded-[1.125rem] border border-black/[0.06] bg-white/[0.68] px-3.75 py-3.25 text-sm leading-[1.28] font-[620] text-black/[0.58] opacity-[clamp(0.12,var(--mind-progress),0.72)] shadow-[0_1.125rem_3.75rem_rgba(0,0,0,0.05)] transition-[opacity,transform] duration-[240ms] max-[56.25rem]:relative max-[56.25rem]:inset-auto max-[56.25rem]:max-w-none motion-reduce:translate-y-0 motion-reduce:opacity-100'

  return (
    <section className={storySectionClass} id="mindsignal" ref={ref} style={sectionStyle} aria-labelledby="mind-title">
      <div className={stickyFrameClass}>
        <div className={stageClass}>
          <p className={storyLabelClass}>MindSignal</p>
          <div className="relative grid min-h-[clamp(29.375rem,56vw,40.625rem)] place-items-center max-[56.25rem]:grid-cols-1 max-[56.25rem]:items-stretch max-[56.25rem]:gap-2.5">
            <div className={cx(chipClass, 'top-[8%] left-[4%]')}>person: Maya</div>
            <div className={cx(chipClass, 'top-[18%] right-[4%] delay-[40ms]')}>your rhythm: Friday demo notes</div>
            <div className={cx(chipClass, 'bottom-[10%] left-[14%] delay-[80ms]')}>current app: Messages</div>
            <div className={cx(writingSurfaceClass, 'z-[2] w-[min(51.25rem,100%)] max-[56.25rem]:order-first')}>
              <WindowDots />
              <p className="m-0 text-[clamp(1.9375rem,5vw,4rem)] leading-[1.1] font-[720]">
                <ScrollSuggestionText acceptedPrefix={mindPrefix} words={mindWords} progress={progress} />
              </p>
              <ProgressLine variable="--mind-progress" />
            </div>
          </div>
          <div className="mt-6 grid grid-cols-[1fr_auto] items-end gap-5 text-[#4a4a4f] max-[56.25rem]:grid-cols-1">
            <h2 className={h2Class} id="mind-title">
              MindSignal helps the suggestion fit.
            </h2>
            <p className="m-0 max-w-[25.625rem] text-right text-[clamp(1rem,1.7vw,1.25rem)] leading-[1.35] font-[530] text-muted max-[56.25rem]:text-left">
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
    <section className="overflow-hidden py-30" aria-labelledby="apps-title">
      <div className={sectionHeadClass}>
        <p className={eyebrowClass}>Across your Mac.</p>
        <h2 className={h2Class} id="apps-title">
          Write where you already work.
        </h2>
        <p className={sectionHeadCopyClass}>
          Messages, notes, docs, email, browser fields, and project tools. One autocomplete behavior across your Mac.
        </p>
      </div>
      <AppMarquee />
      <p className="mx-auto mt-9 max-w-155 px-6 text-center text-[0.9375rem] leading-[1.4] font-[520] text-muted">
        App names are illustrative of normal writing surfaces, not partnerships or official integrations.
      </p>
    </section>
  )
}

function PrivacySection() {
  const ref = useRef<HTMLElement | null>(null)
  const progress = useScrollProgress(ref)
  const activeCount = Math.min(3, Math.max(0, Math.floor(progress * 3.4)))
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
    <section className={storySectionClass} id="privacy" ref={ref} aria-labelledby="privacy-title">
      <div className={stickyFrameClass}>
        <div className="grid w-[min(66.25rem,100%)] grid-cols-[0.82fr_1.18fr] items-stretch gap-4.5 max-[56.25rem]:grid-cols-1">
          <div className={cx(panelCardClass, 'grid min-h-107.5 content-center p-8.5')}>
            <div className="mb-6.5 h-[clamp(3.375rem,7vw,5.125rem)] w-[clamp(3.375rem,7vw,5.125rem)] text-ink" aria-hidden="true">
              <svg className="block h-full w-full" viewBox="0 0 72 72" role="img">
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
            <p className={eyebrowClass}>Privacy</p>
            <h2
              className="m-0 text-[clamp(2.125rem,5vw,4rem)] leading-[0.98] font-[750] tracking-[0] text-ink"
              id="privacy-title"
            >
              Private by default.
            </h2>
            <p className="mt-5 max-w-[24.375rem] text-lg leading-[1.35] font-[530] text-muted">
              Completion happens on your Mac. The model ships with the app. Your private text is not used for training.
            </p>
            <div className="mt-8.5 flex gap-2.5" aria-hidden="true">
              {['Offline', 'Firewall', 'Keychain'].map((item, index) => (
                <div
                  className={cx(
                    'min-w-18 rounded-2xl px-3.5 py-3 text-center text-[0.8125rem] font-[760] transition-[opacity,translate] duration-[260ms] motion-reduce:translate-y-0 motion-reduce:opacity-100',
                    index < activeCount
                      ? 'translate-y-0 bg-[#0066cc]/10 text-[#0055b8] opacity-100'
                      : 'translate-y-2.5 bg-bg text-[#2b2b30] opacity-40',
                  )}
                  key={item}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className={cx(panelCardClass, 'grid gap-3 p-4.5')}>
            {proofs.map((proof, index) => (
              <article
                className={cx(
                  'grid grid-cols-[auto_1fr] items-start gap-4 rounded-[1.375rem] bg-bg/[0.72] p-5 transition-[opacity,translate] duration-[260ms] motion-reduce:translate-y-0 motion-reduce:opacity-100',
                  index < activeCount ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-[0.48]',
                )}
                key={proof.title}
              >
                <div
                  className={cx(
                    'grid h-9.5 w-9.5 place-items-center rounded-[0.8125rem] text-[1.0625rem] font-extrabold',
                    index < activeCount ? 'bg-[#0066cc]/10 text-[#0055b8]' : 'bg-white text-[#17171a]',
                  )}
                >
                  {index + 1}
                </div>
                <div>
                  <h3 className="m-0 text-2xl leading-[1.04] font-[750] tracking-[0] text-ink">{proof.title}</h3>
                  <p className="m-0 mt-1.75 text-base leading-[1.36] font-[520] text-muted">{proof.body}</p>
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
    <section
      className="mx-auto grid w-[min(73.75rem,100%)] grid-cols-[minmax(0,1.08fr)_minmax(19.375rem,0.92fr)] gap-4.5 px-[clamp(1.25rem,5vw,4.375rem)] py-30 max-[56.25rem]:grid-cols-1"
      id="pricing"
      aria-label="Native Mac simplicity and pricing"
    >
      <article
        className={cx(
          panelCardClass,
          'grid min-h-110 content-end bg-[linear-gradient(180deg,rgba(255,255,255,0.7),rgba(255,255,255,0.9)),radial-gradient(circle_at_50%_20%,rgba(0,0,0,0.06),rgba(0,0,0,0)_25rem)] p-[clamp(1.75rem,4vw,2.875rem)]',
        )}
      >
        <div
          className="mb-14 w-[min(26.25rem,100%)] rounded-[1.375rem] border border-hairline bg-white/[0.82] p-3.75 shadow-[0_1.5rem_4.375rem_rgba(0,0,0,0.08)]"
          aria-hidden="true"
        >
          <div className="flex justify-between gap-4 px-2 py-2.5 text-[0.9375rem] font-[620] text-[#242428]">
            <strong>Superbinary</strong>
            <span className="h-5.5 w-9.5 rounded-full bg-caret-blue shadow-[inset_0_0_0_0.0625rem_rgba(0,0,0,0.05)]">
              <span className="ml-auto block h-4.5 w-4.5 rounded-full bg-white shadow-[0_0.0625rem_0.125rem_rgba(0,0,0,0.18)] [margin:0.125rem_0.125rem_0.125rem_auto]" />
            </span>
          </div>
          <div className="flex justify-between gap-4 px-2 py-2.5 text-[0.9375rem] font-[620] text-[#242428]">
            <span>MindSignal</span>
            <span className="h-5.5 w-9.5 rounded-full bg-caret-blue shadow-[inset_0_0_0_0.0625rem_rgba(0,0,0,0.05)]">
              <span className="ml-auto block h-4.5 w-4.5 rounded-full bg-white shadow-[0_0.0625rem_0.125rem_rgba(0,0,0,0.18)] [margin:0.125rem_0.125rem_0.125rem_auto]" />
            </span>
          </div>
        </div>
        <h2 className={h2Class}>Simple enough to leave on.</h2>
        <p className="text-lg leading-[1.36] font-[530] text-muted">
          Quiet menu bar presence, clear controls, and suggestions that disappear the moment you do not need them.
        </p>
      </article>
      <article
        className={cx(
          panelCardClass,
          'min-h-110 border-[#0066cc]/[0.18] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(255,255,255,0.78)),radial-gradient(circle_at_50%_0%,rgba(0,102,204,0.11),rgba(0,102,204,0)_18rem)] p-[clamp(1.75rem,4vw,2.875rem)]',
        )}
      >
        <p className={eyebrowClass}>Early adopter offer</p>
        <h2 className={h2Class}>Try it free for 14 days.</h2>
        <p className="text-lg leading-[1.36] font-[530] text-muted">No credit card required.</p>
        <div className="mt-7 mb-1 text-[clamp(3.125rem,7vw,5.25rem)] leading-[0.96] font-[780] text-ink">$49.99</div>
        <div className="text-[1.0625rem] font-[560] text-muted">Early adopter price. Regular $89.99.</div>
        <DownloadButton className="mt-8.5 min-h-11.5 px-6 text-[1.0625rem]" onClick={onDownload}>
          Download for Mac
        </DownloadButton>
      </article>
    </section>
  )
}

function FAQSection() {
  const [openItems, setOpenItems] = useState<Set<number>>(() => new Set())
  const allOpen = openItems.size === faqItems.length

  function toggleAll() {
    if (allOpen) {
      setOpenItems(new Set())
    } else {
      setOpenItems(new Set(faqItems.map((_, index) => index)))
    }
  }

  function toggleItem(index: number) {
    setOpenItems((current) => {
      const next = new Set(current)

      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }

      return next
    })
  }

  return (
    <section
      className="px-[clamp(1.25rem,5vw,4.375rem)] py-31.5 [scroll-margin-top:4.5rem] max-[38.75rem]:pt-12 max-[38.75rem]:pb-23"
      id="faq"
      aria-labelledby="faq-title"
    >
      <div className="mx-auto w-[min(59.125rem,100%)]">
        <div className="text-center">
          <h2
            className="m-0 text-[clamp(2.5rem,4.2vw,3rem)] leading-[1.0625] font-semibold tracking-[0] text-ink max-[38.75rem]:text-5xl"
            id="faq-title"
          >
            Questions? Answer.
          </h2>
        </div>
        <div className="relative mt-11 grid items-end text-center max-[38.75rem]:mt-8.5">
          <button
            className="absolute right-0 bottom-1.5 border-0 bg-transparent text-sm leading-[1.35] font-normal text-sb-blue max-[38.75rem]:static max-[38.75rem]:mt-4 max-[38.75rem]:justify-self-end"
            type="button"
            onClick={toggleAll}
            aria-expanded={allOpen}
          >
            {allOpen ? 'Collapse all' : 'Expand all'}
          </button>
        </div>
        <div className="mt-7">
          {faqItems.map((item, index) => (
            <details className="border-b border-black/[0.18]" key={item.question} open={openItems.has(index)}>
              <summary
                className="grid min-h-19 cursor-pointer list-none grid-cols-[minmax(0,1fr)_auto] items-center gap-8 py-5.5 text-2xl leading-[1.1667] font-semibold text-ink marker:hidden [&::-webkit-details-marker]:hidden max-[38.75rem]:min-h-18.5 max-[38.75rem]:gap-5.5 max-[38.75rem]:py-5 max-[38.75rem]:text-[1.375rem]"
                onClick={(event) => {
                  event.preventDefault()
                  toggleItem(index)
                }}
              >
                <span>{item.question}</span>
                <span
                  className={cx(
                    'h-[0.6875rem] w-[0.6875rem] rotate-45 border-r-[0.1875rem] border-b-[0.1875rem] border-muted transition-transform duration-[180ms]',
                    openItems.has(index) && '-rotate-[135deg]',
                  )}
                  aria-hidden="true"
                />
              </summary>
              <p className="m-0 -mt-0.75 mb-7 max-w-190 text-[1.0625rem] leading-[1.47] font-normal text-[#424245]">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function FinalCta({ onDownload }: { onDownload: () => void }) {
  return (
    <section className={fullScreenSectionClass} aria-labelledby="final-title">
      <div className="w-[min(60.625rem,100%)]">
        <p className={eyebrowClass}>Superbinary</p>
        <h2 className={h2Class} id="final-title">
          Autocomplete your thoughts.
        </h2>
        <p className={leadClass}>Download it, write a few sentences, and feel the difference before the trial ends.</p>
        <DownloadButton className="mt-8.5 min-h-11.5 px-6 text-[1.0625rem]" onClick={onDownload}>
          Download for Mac
        </DownloadButton>
        <p className={trialClass}>14-day free trial. No credit card required.</p>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer
      className="border-t border-hairline bg-bg px-[clamp(1.25rem,5vw,4.375rem)] pt-8.5 pb-10.5 text-xs leading-[1.42] text-muted"
      aria-label="Site information"
    >
      <div className="mx-auto w-[min(61.25rem,100%)]">
        <p className="m-0">Superbinary is an independent Mac app for private, system-wide writing autocomplete.</p>
        <p className="m-0 mt-3 border-t border-black/[0.08] pt-3">
          Apple, Mac, macOS, Safari, Keychain, and related marks are trademarks of Apple Inc. Other names may be
          trademarks of their respective owners. Superbinary is not affiliated with or endorsed by Apple Inc.
        </p>
        <nav className="mt-4.5 flex flex-wrap gap-3.5" aria-label="Footer links">
          <a className="text-[#424245] no-underline" href="#privacy">
            Privacy
          </a>
          <a className="text-[#424245] no-underline" href="#pricing">
            Pricing
          </a>
          <a className="text-[#424245] no-underline" href="mailto:hello@superbinary.ai">
            Contact
          </a>
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
        <FAQSection />
        <FinalCta onDownload={openDownload} />
      </main>
      <Footer />
      <DownloadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
