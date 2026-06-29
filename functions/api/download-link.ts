interface Env {
  RESEND_API_KEY?: string;
  DOWNLOAD_FROM_EMAIL?: string;
  DOWNLOAD_LINK_URL?: string;
  DOWNLOAD_REPLY_TO?: string;
}

type DownloadRequest = {
  email?: unknown;
};

type JsonBody = Record<string, unknown>;

const RESEND_EMAILS_URL = "https://api.resend.com/emails";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(body: JsonBody, init?: ResponseInit) {
  return Response.json(body, {
    ...init,
    headers: {
      "Cache-Control": "no-store",
      ...init?.headers,
    },
  });
}

function parseEmail(body: DownloadRequest) {
  return typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
}

function buildEmailHtml(downloadUrl: string) {
  return `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;line-height:1.5;color:#1d1d1f">
      <h1 style="font-size:28px;line-height:1.1;margin:0 0 16px">Your Superbinary download link</h1>
      <p style="margin:0 0 18px">Thanks for trying Superbinary. Download the Mac app here:</p>
      <p style="margin:0 0 22px">
        <a href="${downloadUrl}" style="display:inline-block;border-radius:999px;background:#0071e3;color:#fff;padding:12px 18px;text-decoration:none;font-weight:650">Download for Mac</a>
      </p>
      <p style="margin:0;color:#6e6e73;font-size:14px">14-day free trial. No credit card required.</p>
    </div>
  `;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let body: DownloadRequest;

  try {
    body = (await request.json()) as DownloadRequest;
  } catch {
    return json({ error: "Send a valid JSON body." }, { status: 400 });
  }

  const email = parseEmail(body);

  if (!emailPattern.test(email)) {
    return json({ error: "Enter a valid email address." }, { status: 400 });
  }

  if (!env.RESEND_API_KEY || !env.DOWNLOAD_FROM_EMAIL || !env.DOWNLOAD_LINK_URL) {
    return json({ error: "Email delivery is not configured yet." }, { status: 500 });
  }

  const resendResponse = await fetch(RESEND_EMAILS_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
      "User-Agent": "superbinary-website/1.0",
    },
    body: JSON.stringify({
      from: env.DOWNLOAD_FROM_EMAIL,
      to: [email],
      reply_to: env.DOWNLOAD_REPLY_TO,
      subject: "Your Superbinary download link",
      html: buildEmailHtml(env.DOWNLOAD_LINK_URL),
      text: `Download Superbinary for Mac: ${env.DOWNLOAD_LINK_URL}\n\n14-day free trial. No credit card required.`,
    }),
  });

  if (!resendResponse.ok) {
    const errorText = await resendResponse.text();
    console.error("Resend email send failed", {
      status: resendResponse.status,
      body: errorText.slice(0, 500),
    });

    return json({ error: "Could not send the download link." }, { status: 502 });
  }

  return json({ ok: true });
};

export const onRequestGet: PagesFunction = () => {
  return json({ error: "Method not allowed." }, { status: 405 });
};
