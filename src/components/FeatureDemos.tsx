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
        <SuggestionText accepted="Send the updated" ghost=" proposal before lunch" />
      </p>
    </div>
  )
}

export function MidSentenceDemo({ className = '' }: DemoProps) {
  return (
    <div className={cx('relative min-h-18.5 pt-0.5', className)}>
      <p className={`${demoLineClass} line-clamp-1`}>
        <span className="text-accepted">Let's meet</span>
        <Caret />
        <span className="text-accepted"> before the call.</span>
      </p>
      <div
        className="mt-1 ms-[13ch] grid w-fit grid-cols-[minmax(0,1fr)_auto] items-center gap-3.5 rounded-full border border-hairline bg-control py-[0.3125rem] pr-[0.4375rem] pl-3 text-[0.8125rem] leading-[1.1] font-[620] text-control-ink"
        aria-hidden="true"
      >
        <span className="truncate">tomorrow morning</span>
        <span className="relative rounded-[0.3125rem] border border-hairline bg-ink/10 px-[0.4375rem] py-[0.1875rem] text-[0.6875rem] font-[760] text-muted before:absolute before:-left-2 before:top-0.5 before:bottom-0.5 before:w-[0.0625rem] before:bg-hairline">
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
        <span className="text-accepted">The </span>
        <span className="underline decoration-[#ff3b30] decoration-wavy decoration-[0.09375rem] underline-offset-4 dark:decoration-[#ff453a]">
          enviroment
        </span>
        <span className="whitespace-nowrap">
          <Caret />
        </span>
        <span className="text-ghost italic"> environment</span>
      </p>
    </div>
  )
}

export function PrivateOnMacDemo({ className = '' }: DemoProps) {
  return (
    <div className={cx('grid min-h-18.5 place-items-center', className)}>
      <div className="grid grid-cols-[auto_1fr] items-center gap-3 text-left">
        <span
          className="relative block h-12 w-12 rounded-[0.875rem] border border-hairline bg-bg"
          aria-hidden="true"
        >
          <span className="absolute top-2.5 left-1/2 h-4.5 w-5 -translate-x-1/2 rounded-t-[0.625rem] border-[0.1875rem] border-ink border-b-0" />
          <span className="absolute right-2 bottom-2 left-2 h-6 rounded-[0.375rem] bg-ink" />
        </span>
        <span className="text-[1.0625rem] leading-[1.2] font-[650] text-accepted">
          Completion stays on your Mac.
        </span>
      </div>
    </div>
  )
}
