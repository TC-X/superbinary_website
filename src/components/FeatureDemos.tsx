import { SuggestionText } from "./SuggestionText";

type DemoProps = {
  className?: string;
};

export function InlineSuggestionDemo({ className = "" }: DemoProps) {
  return (
    <div className={`demo-field ${className}`}>
      <p className="demo-line">
        <SuggestionText accepted="Send the updated" ghost=" proposal before lunch" />
      </p>
    </div>
  );
}

export function MidSentenceDemo({ className = "" }: DemoProps) {
  return (
    <div className={`demo-bubble-wrap ${className}`}>
      <p className="demo-line">
        <span className="accepted">Let's meet</span>
        <span className="caret" aria-hidden="true" />
        <span className="accepted"> before the call.</span>
      </p>
      <div className="demo-bubble" aria-hidden="true">
        <span className="demo-bubble-text">tomorrow morning</span>
        <span className="demo-tab">tab</span>
      </div>
    </div>
  );
}

export function SpellCorrectionDemo({ className = "" }: DemoProps) {
  return (
    <div className={`demo-field ${className}`}>
      <p className="demo-line">
        <span className="accepted">The </span>
        <span className="misspelled">enviroment</span>
        <span className="accepted-tail">
          <span className="caret" aria-hidden="true" />
        </span>
        <span className="correction-ghost"> environment</span>
      </p>
    </div>
  );
}
