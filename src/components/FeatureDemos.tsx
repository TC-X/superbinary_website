import { Caret } from "./Caret";
import { SuggestionText } from "./SuggestionText";
import { cx } from "../lib/classes";

type DemoProps = {
  className?: string;
};

const demoLineClass = "m-0 text-lg font-[650] leading-[1.28]";
const demoFieldClass = "flex min-h-[42px] items-center rounded-[10px] border border-black/[0.08] bg-white px-3";

export function InlineSuggestionDemo({ className = "" }: DemoProps) {
  return (
    <div className={cx(demoFieldClass, className)}>
      <p className={demoLineClass}>
        <SuggestionText accepted="Send the updated" ghost=" proposal before lunch" />
      </p>
    </div>
  );
}

export function MidSentenceDemo({ className = "" }: DemoProps) {
  return (
    <div className={cx("relative min-h-[74px] pt-0.5", className)}>
      <p className={demoLineClass}>
        <span className="text-accepted">Let's meet</span>
        <Caret />
        <span className="text-accepted"> before the call.</span>
      </p>
      <div
        className="mt-3 grid w-[min(245px,100%)] grid-cols-[minmax(0,1fr)_auto] items-center gap-3.5 rounded-full border border-black/[0.16] bg-[#e8e8ed]/[0.97] py-[5px] pr-[7px] pl-3 text-[13px] leading-[1.1] font-[620] text-[#1d1d1f]"
        aria-hidden="true"
      >
        <span className="truncate">tomorrow morning</span>
        <span className="relative rounded-[5px] border border-black/[0.16] bg-black/[0.10] px-[7px] py-[3px] text-[11px] font-[760] text-black/[0.62] before:absolute before:-left-2 before:top-0.5 before:bottom-0.5 before:w-px before:bg-black/[0.18]">
          tab
        </span>
      </div>
    </div>
  );
}

export function SpellCorrectionDemo({ className = "" }: DemoProps) {
  return (
    <div className={cx(demoFieldClass, className)}>
      <p className={demoLineClass}>
        <span className="text-accepted">The </span>
        <span className="underline decoration-[#ff3b30] decoration-wavy decoration-[1.5px] underline-offset-4">
          enviroment
        </span>
        <span className="whitespace-nowrap">
          <Caret />
        </span>
        <span className="text-ghost italic"> environment</span>
      </p>
    </div>
  );
}
