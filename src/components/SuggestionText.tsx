import { Fragment } from "react";

import { Caret } from "./Caret";
import { cx } from "../lib/classes";

type SuggestionTextProps = {
  accepted: string;
  ghost?: string;
  className?: string;
  ghostClassName?: string;
};

function splitTail(text: string) {
  const lastSpace = text.lastIndexOf(" ");

  if (lastSpace === -1) {
    return { head: "", tail: text };
  }

  return {
    head: text.slice(0, lastSpace + 1),
    tail: text.slice(lastSpace + 1),
  };
}

export function SuggestionText({
  accepted,
  ghost = "",
  className = "",
  ghostClassName = "text-ghost",
}: SuggestionTextProps) {
  const { head, tail } = splitTail(accepted);

  return (
    <span className={cx("tracking-[0]", className)}>
      {head ? <span className="text-accepted">{head}</span> : null}
      <span className="whitespace-nowrap text-accepted">
        {tail}
        <Caret />
      </span>
      {ghost ? <span className={ghostClassName}>{ghost}</span> : null}
    </span>
  );
}

type ScrollSuggestionTextProps = {
  acceptedPrefix: string;
  words: string[];
  progress: number;
  className?: string;
};

export function ScrollSuggestionText({ acceptedPrefix, words, progress, className = "" }: ScrollSuggestionTextProps) {
  const acceptedCount = Math.min(words.length, Math.max(0, Math.floor(progress * (words.length + 0.999))));
  const acceptedWords = words.slice(0, acceptedCount);
  const ghost = words.slice(acceptedCount).join(" ");
  const accepted = acceptedWords.length ? `${acceptedPrefix} ${acceptedWords.join(" ")}` : acceptedPrefix;

  return <SuggestionText accepted={accepted} ghost={ghost ? ` ${ghost}` : ""} className={className} />;
}

export function StableScrollSuggestionText({ acceptedPrefix, words, progress, className = "" }: ScrollSuggestionTextProps) {
  const acceptedCount = Math.min(words.length, Math.max(0, Math.floor(progress * (words.length + 0.999))));
  const caret = (
    <span
      aria-hidden="true"
      data-caret
      className="pointer-events-none absolute bottom-[calc(var(--caret-descent)*-1)] left-full h-[var(--caret-height)] w-[var(--caret-width)] rounded-none bg-caret-blue will-change-[opacity] animate-blink motion-reduce:animate-none"
    />
  );

  return (
    <span className={cx("tracking-[0]", className)}>
      <span className={cx("text-accepted", acceptedCount === 0 && "relative")}>
        {acceptedPrefix}
        {acceptedCount === 0 ? caret : null}
      </span>
      {words.map((word, index) => {
        const isAccepted = index < acceptedCount;
        const hasCaret = index + 1 === acceptedCount;

        return (
          <Fragment key={`${word}-${index}`}>
            {" "}
            <span className={cx("inline-block", isAccepted ? "text-accepted" : "text-ghost", hasCaret && "relative")}>
              {word}
              {hasCaret ? caret : null}
            </span>
          </Fragment>
        );
      })}
    </span>
  );
}
