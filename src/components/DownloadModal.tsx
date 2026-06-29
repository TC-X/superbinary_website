import { FormEvent, useEffect, useState } from "react";
import { Mail, X } from "lucide-react";

type DownloadModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type SubmitState = "idle" | "submitting" | "sent" | "error";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function DownloadModal({ isOpen, onClose }: DownloadModalProps) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");

    if (!isValidEmail(email)) {
      setState("error");
      setMessage("Enter a valid email address.");
      return;
    }

    setState("submitting");

    try {
      const response = await fetch("/api/download-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        throw new Error(result?.error || "Could not send the download link.");
      }

      setState("sent");
      setMessage("Check your email for the download link.");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Could not send the download link.");
    }
  };

  return (
    <div className="modal-shell" role="presentation" onMouseDown={onClose}>
      <section
        aria-labelledby="download-modal-title"
        aria-modal="true"
        className="download-modal"
        role="dialog"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button aria-label="Close" className="modal-close" type="button" onClick={onClose}>
          <X size={16} strokeWidth={2.4} />
        </button>
        <div className="modal-icon" aria-hidden="true">
          <Mail size={24} strokeWidth={2.1} />
        </div>
        <p className="eyebrow">Download Superbinary</p>
        <h2 id="download-modal-title">Get the Mac app link.</h2>
        <p className="modal-copy">
          We will send the download link to your email. No credit card required for the 14-day trial.
        </p>
        <form className="modal-form" onSubmit={onSubmit}>
          <label className="sr-only" htmlFor="download-email">
            Email
          </label>
          <input
            autoComplete="email"
            autoFocus
            id="download-email"
            inputMode="email"
            onChange={(event) => {
              setEmail(event.target.value);
              if (state !== "submitting") setState("idle");
            }}
            placeholder="you@example.com"
            type="email"
            value={email}
          />
          <button className="download modal-submit" disabled={state === "submitting" || state === "sent"} type="submit">
            {state === "submitting" ? "Sending..." : state === "sent" ? "Sent" : "Send link"}
          </button>
        </form>
        {message ? <p className={`modal-message ${state === "error" ? "error" : ""}`}>{message}</p> : null}
      </section>
    </div>
  );
}
