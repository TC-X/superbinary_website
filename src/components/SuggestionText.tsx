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

  return (
    <span className={cx("tracking-[0]", className)}>
      <span className="text-accepted">
        {acceptedPrefix}
        {acceptedCount === 0 ? <Caret /> : null}
      </span>
      {words.map((word, index) => {
        const isAccepted = index < acceptedCount;
        const hasCaret = index + 1 === acceptedCount;

        return (
          <Fragment key={`${word}-${index}`}>
            {" "}
            <span className={cx("inline-block", isAccepted ? "text-accepted" : "text-ghost")}>
              {word}
              {hasCaret ? <Caret /> : null}
            </span>
          </Fragment>
        );
      })}
    </span>
  );
}
