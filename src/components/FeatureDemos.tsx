import { Caret } from './Caret'
import { SuggestionText } from './SuggestionText'
import { cx } from '../lib/classes'

type DemoProps = {
  className?: string
}

const demoLineClass = 'm-0 text-2xl font-[650] leading-[1.28]'

export function InlineSuggestionDemo({ className = '' }: DemoProps) {
  return (
    <div className={className}>
      <p className={demoLineClass}>
        <SuggestionText accepted="The next words app" ghost="ear right where you type." />
      </p>
    </div>
  )
}

export function MidSentenceDemo({ className = '' }: DemoProps) {
  return (
    <div className={cx('relative min-h-18.5 pt-0.5', className)}>
      <p className={`${demoLineClass} line-clamp-1`}>
        <span className="text-accepted">Let's meet to</span>
        <Caret />
        <span className="text-accepted"> before the call.</span>
      </p>
      <div
        className="mt-1 ms-[13ch] grid w-fit grid-cols-[minmax(0,1fr)_auto] items-center gap-3.5 rounded-full border border-black/25 bg-control py-[0.3125rem] pr-[0.4375rem] pl-3 text-[0.8125rem] leading-[1.1] font-[620] text-control-ink"
        aria-hidden="true"
      >
        <div>
          <span className="text-ghost">to</span>
          <span className="truncate">morrow morning</span>
        </div>
        <span className="relative rounded-[0.3125rem] border border-black/10 bg-ink/10 px-[0.25rem] py-[0.1rem] text-[0.6875rem] font-[500] before:absolute before:-left-2 before:top-0 before:bottom-0 before:w-[0.0625rem] before:bg-black/40">
          tab
        </span>
      </div>
    </div>
  )
}

export function SpellCorrectionDemo({ className = '' }: DemoProps) {
  return (
    <div className={className}>
      <p className={demoLineClass}>
        <span className="text-accepted">The suggestion’s speed is </span>
        <span className="underline decoration-[#ff3b30] decoration-wavy decoration-[0.09375rem] underline-offset-4 dark:decoration-[#ff453a]">
          unparralleled
        </span>
        <span className="whitespace-nowrap">
          <Caret />
        </span>
        <span className="text-ghost italic"> unparalleled.</span>
      </p>
    </div>
  )
}

export function PrivateOnMacDemo({ className = '' }: DemoProps) {
  return (
    <div className={cx('w-full', className)}>
      <p className={demoLineClass}>
        <SuggestionText accepted="What happens on your Mac, stay o" ghost="n your Mac." />
      </p>
    </div>
  )
}
