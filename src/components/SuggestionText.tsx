import { Caret } from "./Caret";

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
  ghostClassName = "ghost",
}: SuggestionTextProps) {
  const { head, tail } = splitTail(accepted);

  return (
    <span className={`completion-sentence ${className}`}>
      {head ? <span className="accepted">{head}</span> : null}
      <span className="accepted accepted-tail">
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
