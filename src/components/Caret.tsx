type CaretProps = {
  className?: string;
};

export function Caret({ className = "" }: CaretProps) {
  return <span aria-hidden="true" className={`caret ${className}`} />;
}
