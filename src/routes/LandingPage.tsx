import { CSSProperties, ReactNode, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { DownloadModal } from '../components/DownloadModal'
import { InlineSuggestionDemo, MidSentenceDemo, PrivateOnMacDemo, SpellCorrectionDemo } from '../components/FeatureDemos'
import { ScrollSuggestionText, SuggestionText } from '../components/SuggestionText'
import { cx } from '../lib/classes'
import { useScrollProgress } from '../lib/useScrollProgress'

const corePrefix = 'Can you pick up m'
const coreWords = ['ilk', 'on', 'your', 'way', 'home?']
const mindPrefix = 'For the meeting with S'
const mindWords = ['arah', 'on', 'Tuesday', 'at', '10am']
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
const leadClass = 'mx-auto mt-6.5 max-w-180 text-[clamp(1.1875rem,2vw,1.6875rem)] leading-[1.24] font-medium text-copy'
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
const localNavClass =
  'hidden items-center gap-7 text-[0.8125rem] font-[520] text-muted md:flex [&_a]:no-underline [&_a:hover]:text-ink'

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
      <span className="h-3 w-3 rounded-full bg-quiet/45" />
      <span className="h-3 w-3 rounded-full bg-quiet/45" />
      <span className="h-3 w-3 rounded-full bg-quiet/45" />
    </div>
  )
}

function Header({ onDownload }: { onDownload: () => void }) {
  return (
    <header className="fixed inset-x-0 top-0 z-20 border-b border-hairline bg-paper/[0.76] px-[clamp(1.125rem,4vw,3.375rem)] backdrop-blur-[1.375rem] max-[38.75rem]:px-4">
      <div className="mx-auto flex h-13.5 w-[min(73.75rem,100%)] items-center justify-between">
        <a className="text-[0.9375rem] font-bold" href="#top" aria-label="Superbinary home">
          Superbinary
        </a>
        <nav className={localNavClass} aria-label="Superbinary sections">
          <a href="#top">Overview</a>
          <a href="#highlights">Features</a>
          <a href="#privacy">Privacy</a>
          <a href="#pricing">Pricing</a>
        </nav>
        <DownloadButton className="min-h-7.5 px-3.5 text-[0.8125rem] max-[38.75rem]:hidden" onClick={onDownload}>
          Download
        </DownloadButton>
      </div>
    </header>
  )
}

function Hero({ onDownload }: { onDownload: () => void }) {
  return (
    <section className={fullScreenSectionClass} id="top" aria-labelledby="hero-title">
      <div className="w-[min(66rem,100%)]">
        <p className={eyebrowClass}>Superbinary</p>
        <h1 className={cx(h1Class, 'max-[38.75rem]:text-[3.25rem]')} id="hero-title">
          <SuggestionText accepted="Autocomplete your" ghost=" thoughts." />
        </h1>
        <p className={leadClass}>Private autocomplete for the places you write on your Mac.</p>
        <DownloadButton className="mt-8.5 min-h-11.5 px-6 text-[1.0625rem]" onClick={onDownload}>
          Download for Mac
        </DownloadButton>
        <p className={trialClass}>14 days free. No credit card required.</p>
      </div>
    </section>
  )
}

function CoreInteractionStory() {
  const ref = useRef<HTMLElement | null>(null)
  const progress = useScrollProgress(ref)

  return (
    <section className={storySectionClass} id="ghost-story" ref={ref} aria-labelledby="ghost-title">
      <div className={stickyFrameClass}>
        <div className={stageClass}>
          <p className={storyLabelClass}>Take a closer look.</p>
          <div className={writingSurfaceClass}>
            <WindowDots />
            <p className="m-0 w-full text-[clamp(2.125rem,6vw,4.75rem)] leading-[1.08] font-bold tracking-[0] text-balance">
              <ScrollSuggestionText
                acceptedPrefix={corePrefix}
                words={coreWords}
                progress={progress}
                joinFirstWordToPrefix
              />
            </p>
          </div>
          <div className="mt-6 grid grid-cols-[1fr_auto] items-end gap-5 text-copy max-[56.25rem]:grid-cols-1">
            <h2 className={h2Class} id="ghost-title">
              Tap. Keep going.
            </h2>
            <p className="m-0 max-w-[25.625rem] text-right text-[clamp(1rem,1.7vw,1.25rem)] leading-[1.35] font-[530] text-muted max-[56.25rem]:text-left">
              Accept the next word when it feels right. Ignore it when it does not.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Highlights() {
  const sliderRef = useRef<HTMLDivElement | null>(null)
  const cards = [
    {
      title: 'Inline Suggestion.',
      body: 'The next words appear where your eyes already are.',
      demo: <InlineSuggestionDemo />,
    },
    {
      title: 'Mid-sentence.',
      body: 'It joins the thought without asking you to stop and prompt.',
      demo: <MidSentenceDemo />,
    },
    {
      title: 'Spell Correction.',
      body: 'A cleaner word can appear before the sentence loses momentum.',
      demo: <SpellCorrectionDemo />,
    },
    {
      title: 'Private on Mac.',
      body: 'Completion happens locally, without a cloud round trip.',
      demo: <PrivateOnMacDemo />,
    },
  ]
  const moveSlider = (direction: -1 | 1) => {
    const slider = sliderRef.current
    const firstCard = slider?.querySelector<HTMLElement>('[data-highlight-card]')

    if (!slider) return

    slider.scrollBy({
      left: direction * ((firstCard?.offsetWidth ?? slider.clientWidth * 0.78) + 16),
      behavior: 'smooth',
    })
  }

  return (
    <section
      className="overflow-hidden px-[clamp(1.25rem,5vw,4.375rem)] pt-22.5 pb-30 [scroll-margin-top:4.5rem]"
      id="highlights"
      aria-labelledby="highlights-title"
    >
      <div className="mx-auto mb-10 grid w-[min(73.75rem,100%)] grid-cols-[1fr_auto] items-end gap-6 max-[56.25rem]:grid-cols-1">
        <div>
          <p className={eyebrowClass}>Get the highlights.</p>
          <h2
            className="m-0 max-w-210 text-left text-[clamp(2.625rem,7vw,5.875rem)] leading-[0.98] font-[750] tracking-[0] text-ink max-[56.25rem]:text-center"
            id="highlights-title"
          >
            The whole idea in a few keystrokes.
          </h2>
        </div>
        <div className="grid justify-items-end gap-5 max-[56.25rem]:justify-items-center">
          <p className="m-0 max-w-100 text-right text-[clamp(1.0625rem,1.6vw,1.3125rem)] leading-[1.3] font-[520] text-muted max-[56.25rem]:mx-auto max-[56.25rem]:text-center">
            See the next words. Accept what feels right. Keep writing when the thought changes.
          </p>
          <div className="flex gap-2" aria-label="Highlight carousel controls">
            <button
              aria-label="Previous highlight"
              className="grid h-9.5 w-9.5 place-items-center rounded-full border-0 bg-control text-control-ink transition-colors hover:bg-quiet/20"
              type="button"
              onClick={() => moveSlider(-1)}
            >
              <ChevronLeft size={20} strokeWidth={2.4} />
            </button>
            <button
              aria-label="Next highlight"
              className="grid h-9.5 w-9.5 place-items-center rounded-full border-0 bg-control text-control-ink transition-colors hover:bg-quiet/20"
              type="button"
              onClick={() => moveSlider(1)}
            >
              <ChevronRight size={20} strokeWidth={2.4} />
            </button>
          </div>
        </div>
      </div>
      <div className="mx-auto w-[min(73.75rem,100%)]">
        <div
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          ref={sliderRef}
        >
          {cards.map((card) => (
            <article
              className="flex h-[32rem] w-[min(25.75rem,78vw)] shrink-0 snap-start flex-col justify-between rounded-[1.875rem] border border-hairline bg-panel p-7 shadow-panel max-[38.75rem]:h-[29rem] max-[38.75rem]:p-6"
              data-highlight-card
              key={card.title}
            >
              <div
                className="grid min-h-50 place-items-center overflow-hidden rounded-[1.375rem] bg-bg/[0.72] px-5 py-8 text-ink"
                aria-hidden="true"
              >
                {card.demo}
              </div>
              <div>
                <h3 className="m-0 text-[clamp(2.125rem,4vw,3.375rem)] leading-[0.98] font-[750] tracking-[0] text-ink">
                  {card.title}
                </h3>
                <p className="m-0 mt-4 text-[1.125rem] leading-[1.3] font-[520] text-muted">{card.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function SpatialAwarenessStory() {
  const ref = useRef<HTMLElement | null>(null)
  const progress = useScrollProgress(ref)
  const sectionStyle = { '--mind-progress': progress.toFixed(4) } as CSSProperties
  const chipClass =
    'absolute max-w-[14.375rem] translate-y-[calc((1-var(--mind-progress))*1.125rem)] rounded-full border border-hairline bg-panel/60 px-3.75 py-2.5 text-sm leading-[1.28] font-[620] text-muted opacity-[clamp(0.08,calc(var(--mind-progress)*0.26),0.26)] backdrop-blur-[1rem] transition-[opacity,transform] duration-[240ms] max-[56.25rem]:hidden motion-reduce:translate-y-0 motion-reduce:opacity-20'

  return (
    <section className={storySectionClass} id="spatial-awareness" ref={ref} style={sectionStyle} aria-labelledby="mind-title">
      <div className={stickyFrameClass}>
        <div className={stageClass}>
          <p className={storyLabelClass}>Spatial Awareness</p>
          <div className="relative grid min-h-[clamp(29.375rem,56vw,40.625rem)] place-items-center max-[56.25rem]:grid-cols-1 max-[56.25rem]:items-stretch max-[56.25rem]:gap-2.5">
            <div className={cx(chipClass, 'top-[8%] left-[4%]')}>recipient</div>
            <div className={cx(chipClass, 'top-[18%] right-[4%] delay-[40ms]')}>calendar</div>
            <div className={cx(chipClass, 'bottom-[10%] left-[14%] delay-[80ms]')}>thread</div>
            <div className={cx(writingSurfaceClass, 'z-[2] w-[min(51.25rem,100%)] max-[56.25rem]:order-first')}>
              <WindowDots />
              <p className="m-0 text-[clamp(1.9375rem,5vw,4rem)] leading-[1.1] font-[720]">
                <ScrollSuggestionText
                  acceptedPrefix={mindPrefix}
                  words={mindWords}
                  progress={progress}
                  joinFirstWordToPrefix
                />
              </p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-[1fr_auto] items-end gap-5 text-copy max-[56.25rem]:grid-cols-1">
            <h2 className={h2Class} id="mind-title">
              More like what you meant.
            </h2>
            <p className="m-0 max-w-[25.625rem] text-right text-[clamp(1rem,1.7vw,1.25rem)] leading-[1.35] font-[530] text-muted max-[56.25rem]:text-left">
              Spatial Awareness helps the suggestion stay near the thought you were already writing. Completion still
              happens on your Mac.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

type DesktopWindowProps = {
  app: string
  icon: string
  className: string
  children: ReactNode
}

function DesktopWindow({ app, icon, className, children }: DesktopWindowProps) {
  return (
    <article
      className={cx(
        'absolute rounded-[1.375rem] border border-hairline bg-elevated shadow-panel backdrop-blur-[1.25rem] max-[56.25rem]:relative max-[56.25rem]:inset-auto max-[56.25rem]:w-full',
        className,
      )}
    >
      <div className="flex h-11 items-center gap-2.5 border-b border-hairline px-4 text-[0.8125rem] font-[650] text-muted">
        <img
          alt=""
          className="h-4.5 w-4.5 object-contain opacity-[0.56] grayscale saturate-0 contrast-95 dark:invert"
          src={`/assets/app-logos/${icon}.png`}
        />
        <span>{app}</span>
      </div>
      <div className="p-4.5">{children}</div>
    </article>
  )
}

function AppsSection() {
  return (
    <section className="overflow-hidden py-30" aria-labelledby="apps-title">
      <div className={sectionHeadClass}>
        <p className={eyebrowClass}>Across your Mac.</p>
        <h2 className={h2Class} id="apps-title">
          Wherever the thought starts, Superbinary is there.
        </h2>
        <p className={sectionHeadCopyClass}>
          Messages, notes, docs, email, browser fields, and project tools all get the same quiet writing reflex.
        </p>
      </div>
      <div className="relative mx-auto mt-14 min-h-[clamp(35rem,58vw,43rem)] w-[min(73.75rem,100%)] overflow-hidden rounded-[2.25rem] border border-hairline bg-elevated shadow-panel max-[56.25rem]:grid max-[56.25rem]:min-h-0 max-[56.25rem]:gap-3 max-[56.25rem]:overflow-visible max-[56.25rem]:rounded-none max-[56.25rem]:border-0 max-[56.25rem]:bg-transparent max-[56.25rem]:shadow-none">
        <div className="absolute inset-x-0 top-0 z-[1] flex h-9 items-center justify-between border-b border-hairline bg-panel px-4 text-[0.75rem] font-[650] text-muted max-[56.25rem]:hidden">
          <span>Superbinary</span>
          <span className="rounded-full bg-sb-blue/10 px-2.5 py-1 text-sb-blue">On</span>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(0,113,227,0.12),transparent_16rem),radial-gradient(circle_at_78%_68%,rgba(0,0,0,0.06),transparent_18rem)] dark:bg-[radial-gradient(circle_at_24%_18%,rgba(41,151,255,0.18),transparent_16rem),radial-gradient(circle_at_78%_68%,rgba(255,255,255,0.06),transparent_18rem)] max-[56.25rem]:hidden" />
        <DesktopWindow app="Messages" icon="messages" className="top-[13%] left-[5%] z-[3] w-[29rem]">
          <p className="m-0 text-[1.125rem] leading-[1.35] font-[620] text-ink">
            <SuggestionText accepted="Running ten late. Can you save me" ghost=" a seat near the front?" />
          </p>
        </DesktopWindow>
        <DesktopWindow app="Notes" icon="notes" className="top-[24%] right-[6%] z-[4] w-[33rem]">
          <p className="m-0 text-[1.5rem] leading-[1.22] font-[720] text-ink">
            <SuggestionText accepted="Launch checklist:" ghost=" demo, pricing, download email, final copy." />
          </p>
        </DesktopWindow>
        <DesktopWindow app="Mail" icon="mail" className="bottom-[16%] left-[14%] z-[5] w-[35rem]">
          <p className="m-0 text-[1.375rem] leading-[1.24] font-[700] text-ink">
            <SuggestionText accepted="Thanks Sarah. I’ll send the concise version" ghost=" before our Tuesday review." />
          </p>
        </DesktopWindow>
        <DesktopWindow app="Docs" icon="docs" className="right-[9%] bottom-[8%] z-[2] w-[25rem] opacity-[0.86]">
          <p className="m-0 text-[1.0625rem] leading-[1.38] font-[620] text-ink">
            <SuggestionText accepted="The main idea is simple:" ghost=" less typing, more thinking." />
          </p>
        </DesktopWindow>
        <div className="absolute bottom-4 left-1/2 z-[6] flex -translate-x-1/2 gap-2 rounded-[1.25rem] border border-hairline bg-panel/80 px-3 py-2 backdrop-blur-[1.25rem] max-[56.25rem]:hidden" aria-hidden="true">
          {['messages', 'notes', 'mail', 'docs'].map((icon) => (
            <img
              alt=""
              className="h-7 w-7 object-contain opacity-[0.5] grayscale saturate-0 contrast-95 dark:invert"
              key={icon}
              src={`/assets/app-logos/${icon}.png`}
            />
          ))}
        </div>
      </div>
      <p className="mx-auto mt-9 max-w-155 px-6 text-center text-[0.9375rem] leading-[1.4] font-[520] text-muted">
        App names are illustrative of normal writing surfaces, not partnerships or official integrations.
      </p>
    </section>
  )
}

function PrivacySection() {
  const ref = useRef<HTMLElement | null>(null)
  const progress = useScrollProgress(ref)
  const itemProgress = (index: number) => Math.min(1, Math.max(0, (progress - index * 0.16) / 0.28))
  const proofs = [
    {
      title: 'Model included.',
      body: 'The launch version ships with the model, so suggestions keep working without the internet.',
    },
    {
      title: 'No cloud completion loop.',
      body: 'Your writing is completed locally and is not used to train a server-side model.',
    },
    {
      title: 'Locked with macOS security.',
      body: 'Private app data is encrypted locally with keys protected by Keychain and your Mac account.',
    },
  ]

  return (
    <section
      className="mt-24 overflow-hidden px-[clamp(1.25rem,5vw,4.375rem)] pt-36 pb-30 [scroll-margin-top:4.5rem]"
      id="privacy"
      ref={ref}
      aria-labelledby="privacy-title"
    >
      <div className="mx-auto w-[min(73.75rem,100%)]">
        <div className="mx-auto max-w-220 text-center">
          <div
            className="mx-auto mb-7 h-[clamp(4rem,8vw,6rem)] w-[clamp(4rem,8vw,6rem)] text-ink"
            aria-hidden="true"
          >
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
          <h2 className={h2Class} id="privacy-title">
            Your writing stays on your Mac.
          </h2>
          <p className={sectionHeadCopyClass}>
            Superbinary is designed so the writing moment does not need to leave the machine in front of you.
          </p>
        </div>
        <div className="mx-auto mt-12 grid w-[min(61.25rem,100%)] grid-cols-3 gap-3.5 max-[56.25rem]:grid-cols-1">
          {proofs.map((proof, index) => {
            const amount = itemProgress(index)

            return (
              <article
                className="rounded-[1.375rem] border border-hairline bg-panel p-6 text-left shadow-panel will-change-[opacity,transform] motion-reduce:translate-y-0 motion-reduce:opacity-100"
                style={{
                  opacity: 0.62 + amount * 0.38,
                  transform: `translateY(${(1 - amount) * 0.75}rem)`,
                }}
                key={proof.title}
              >
                <h3 className="m-0 text-[1.5rem] leading-[1.08] font-[750] tracking-[0] text-ink">{proof.title}</h3>
                <p className="m-0 mt-3 text-base leading-[1.38] font-[520] text-muted">{proof.body}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function NativePricing({ onDownload }: { onDownload: () => void }) {
  const macDetails = [
    ['Menu bar quiet.', 'Open, pause, or quit from the place Mac utilities already live.'],
    ['Keyboard first.', 'Tap Tab for the next word. Keep typing when the thought changes.'],
    ['No workspace.', 'Superbinary appears in the apps you already use, not another window to manage.'],
  ]

  return (
    <section
      className="px-[clamp(1.25rem,5vw,4.375rem)] py-30 [scroll-margin-top:4.5rem]"
      id="pricing"
      aria-label="Native Mac simplicity and pricing"
    >
      <div className={sectionHeadClass}>
        <p className={eyebrowClass}>Built for Mac.</p>
        <h2 className={h2Class}>Quiet by default.</h2>
        <p className={sectionHeadCopyClass}>
          Superbinary lives in the menu bar, follows the keyboard, and stays out of the way until the next words are useful.
        </p>
      </div>
      <div className="mx-auto mt-11 w-[min(61.25rem,100%)] border-y border-hairline">
        <div className="grid grid-cols-3 divide-x divide-hairline max-[56.25rem]:grid-cols-1 max-[56.25rem]:divide-x-0 max-[56.25rem]:divide-y">
          {macDetails.map(([title, body]) => (
            <article className="px-7 py-8 text-left max-[56.25rem]:px-0 max-[56.25rem]:py-6" key={title}>
              <h3 className="m-0 text-[1.25rem] leading-[1.12] font-[750] tracking-[0] text-ink">{title}</h3>
              <p className="m-0 mt-2.5 text-[1.0625rem] leading-[1.38] font-[520] text-muted">{body}</p>
            </article>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-12 grid w-[min(61.25rem,100%)] grid-cols-[1fr_auto] items-center gap-5 border-b border-hairline pb-8 max-[56.25rem]:grid-cols-1 max-[56.25rem]:justify-items-center max-[56.25rem]:text-center">
        <div>
          <p className="m-0 text-[1.0625rem] font-[700] text-ink">Superbinary</p>
          <p className="m-0 mt-1.5 text-[clamp(1.25rem,2.4vw,1.75rem)] leading-[1.18] font-[650] text-ink">
            14 days free. Then $49.99.
          </p>
          <p className="m-0 mt-2 text-[0.9375rem] font-[520] text-muted">
            Early bird price. Regular $129.99. No credit card required.
          </p>
        </div>
        <DownloadButton className="min-h-11.5 px-6 text-[1.0625rem] max-[56.25rem]:justify-self-center" onClick={onDownload}>
          Download for Mac
        </DownloadButton>
      </div>
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
            <details className="border-b border-hairline" key={item.question} open={openItems.has(index)}>
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
              <p className="m-0 -mt-0.75 mb-7 max-w-190 text-[1.0625rem] leading-[1.47] font-normal text-copy">
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
        <p className="m-0 mt-3 border-t border-hairline pt-3">
          Apple, Mac, macOS, Safari, Keychain, and related marks are trademarks of Apple Inc. Other names may be
          trademarks of their respective owners. Superbinary is not affiliated with or endorsed by Apple Inc.
        </p>
        <nav className="mt-4.5 flex flex-wrap gap-3.5" aria-label="Footer links">
          <a className="text-copy no-underline" href="#privacy">
            Privacy
          </a>
          <a className="text-copy no-underline" href="#pricing">
            Pricing
          </a>
          <a className="text-copy no-underline" href="mailto:hello@superbinary.ai">
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
        <Highlights />
        <CoreInteractionStory />
        <AppsSection />
        <SpatialAwarenessStory />
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
