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
  joinFirstWordToPrefix?: boolean;
};

export function ScrollSuggestionText({
  acceptedPrefix,
  words,
  progress,
  className = "",
  joinFirstWordToPrefix = false,
}: ScrollSuggestionTextProps) {
  const acceptedCount = Math.min(words.length, Math.max(0, Math.floor(progress * (words.length + 0.999))));
  const shouldJoinFirstWord = joinFirstWordToPrefix && words.length > 0;
  const { head: joinedHead, tail: joinedTail } = shouldJoinFirstWord
    ? splitTail(acceptedPrefix)
    : { head: acceptedPrefix, tail: "" };
  const wordsToRender = shouldJoinFirstWord ? words.slice(1) : words;

  return (
    <span className={cx("tracking-[0]", className)}>
      <span className="text-accepted">
        {joinedHead}
        {!shouldJoinFirstWord && acceptedCount === 0 ? <Caret /> : null}
      </span>
      {shouldJoinFirstWord ? (
        <span className="whitespace-nowrap">
          <span className="text-accepted">
            {joinedTail}
            {acceptedCount === 0 ? <Caret /> : null}
          </span>
          <span className={cx("inline-block", acceptedCount > 0 ? "text-accepted" : "text-ghost")}>
            {words[0]}
            {acceptedCount === 1 ? <Caret /> : null}
          </span>
        </span>
      ) : null}
      {wordsToRender.map((word, index) => {
        const wordIndex = shouldJoinFirstWord ? index + 1 : index;
        const isAccepted = wordIndex < acceptedCount;
        const hasCaret = wordIndex + 1 === acceptedCount;

        return (
          <Fragment key={`${word}-${wordIndex}`}>
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
