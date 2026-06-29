import { FormEvent, useEffect, useState } from "react";
import { Mail, X } from "lucide-react";

type DownloadModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type SubmitState = "idle" | "submitting" | "sent" | "error";

const eyebrowClass = "m-0 mb-[1.125rem] text-[clamp(0.9375rem,1.4vw,1.1875rem)] font-[650] text-muted";
const submitClass =
  "inline-flex min-h-11.5 w-full items-center justify-center rounded-full border-0 bg-sb-blue px-6 text-[1.0625rem] font-[650] text-white no-underline shadow-none disabled:cursor-default";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function DownloadModal({ isOpen, onClose }: DownloadModalProps) {
  const [email, setEmail] = useState("");
  const [isMounted, setIsMounted] = useState(isOpen);
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      return;
    }

    const timeout = window.setTimeout(() => setIsMounted(false), 240);

    return () => window.clearTimeout(timeout);
  }, [isOpen]);

  useEffect(() => {
    if (!isMounted) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMounted, onClose]);

  if (!isMounted) return null;

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
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-[#f5f5f7]/[0.72] p-5 backdrop-blur-[1.5rem] data-[state=closed]:animate-modal-overlay-out data-[state=open]:animate-modal-overlay-in motion-reduce:animate-none"
      data-state={isOpen ? "open" : "closed"}
      role="presentation"
      onMouseDown={onClose}
    >
      <section
        aria-labelledby="download-modal-title"
        aria-modal="true"
        className="relative w-[min(28.75rem,100%)] rounded-[1.375rem] border border-black/[0.10] bg-white/[0.94] p-8.5 text-center data-[state=closed]:animate-modal-panel-out data-[state=open]:animate-modal-panel-in motion-reduce:animate-none"
        data-state={isOpen ? "open" : "closed"}
        role="dialog"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          aria-label="Close"
          className="absolute top-3.5 right-3.5 grid h-7.5 w-7.5 place-items-center rounded-full border-0 bg-bg text-[#424245]"
          type="button"
          onClick={onClose}
        >
          <X size={16} strokeWidth={2.4} />
        </button>
        <div className="mx-auto mb-[1.125rem] grid h-14.5 w-14.5 place-items-center rounded-[1.125rem] bg-bg text-sb-blue" aria-hidden="true">
          <Mail size={24} strokeWidth={2.1} />
        </div>
        <p className={eyebrowClass}>Download Superbinary</p>
        <h2 id="download-modal-title" className="m-0 text-[2rem] leading-[1.05] font-[750] tracking-[0] text-ink">
          Get the Mac app link.
        </h2>
        <p className="mt-3.5 text-base leading-[1.42] text-[#45454a]">
          We will send the download link to your email. No credit card required for the 14-day trial.
        </p>
        <form className="mt-6 grid gap-3" onSubmit={onSubmit}>
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
            className="h-12 w-full rounded-xl border border-black/[0.13] bg-white px-3.5 text-[#1d1d1f] outline-0 focus:border-sb-blue focus:shadow-[0_0_0_0.25rem_rgba(0,113,227,0.12)]"
            type="email"
            value={email}
          />
          <button className={submitClass} disabled={state === "submitting" || state === "sent"} type="submit">
            {state === "submitting" ? "Sending..." : state === "sent" ? "Sent" : "Send link"}
          </button>
        </form>
        {message ? (
          <p className={`mt-3.5 text-sm font-semibold ${state === "error" ? "text-[#b42318]" : "text-[#1b6b33]"}`}>
            {message}
          </p>
        ) : null}
      </section>
    </div>
  );
}
