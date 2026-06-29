import { cx } from "../lib/classes";

type CaretProps = {
  className?: string;
};

export function Caret({ className = "" }: CaretProps) {
  return (
    <span
      aria-hidden="true"
      data-caret
      className={cx(
        "inline-block h-[var(--caret-height)] w-[var(--caret-width)] -mr-[var(--caret-width)] align-[var(--caret-align)] rounded-none bg-caret-blue will-change-[opacity] animate-blink motion-reduce:animate-none",
        className,
      )}
    />
  );
}
