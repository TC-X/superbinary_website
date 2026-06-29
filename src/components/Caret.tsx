import { cx } from "../lib/classes";

type CaretProps = {
  className?: string;
};

export function Caret({ className = "" }: CaretProps) {
  return (
    <span aria-hidden="true" data-caret className={cx("relative m-0 inline-block h-0 w-0 align-baseline leading-none", className)}>
      <span className="absolute bottom-[calc(var(--caret-descent)*-1)] left-[calc(var(--caret-width)*-0.5)] h-[var(--caret-height)] w-[var(--caret-width)] rounded-none bg-caret-blue will-change-[opacity] animate-blink motion-reduce:animate-none" />
    </span>
  );
}
