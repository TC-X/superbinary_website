const firstRow = ["mail", "messages", "notes", "safari", "calendar", "reminders", "chrome", "slack", "docs", "notion", "vscode", "figma"];
const secondRow = ["chatgpt", "claude", "firefox", "discord", "whatsapp", "telegram", "zoom", "dropbox", "gdrive", "word", "excel", "powerpoint"];

function AppTile({ name }: { name: string }) {
  return (
    <div className="grid h-20 w-28 place-items-center border-0 bg-transparent shadow-none max-[620px]:h-[92px] max-[620px]:w-[132px]">
      <img
        alt=""
        className="h-[46px] w-[46px] object-contain opacity-[0.52] mix-blend-multiply grayscale saturate-0 contrast-95"
        src={`/assets/app-logos/${name}.png`}
      />
    </div>
  );
}

export function AppMarquee() {
  return (
    <>
      <div className="my-6 flex w-max animate-marquee gap-3.5 motion-reduce:animate-none">
        {[...firstRow, ...firstRow].map((name, index) => (
          <AppTile key={`${name}-${index}`} name={name} />
        ))}
      </div>
      <div className="my-6 flex w-max animate-marquee gap-3.5 translate-x-[-180px] [animation-direction:reverse] motion-reduce:animate-none">
        {[...secondRow, ...secondRow].map((name, index) => (
          <AppTile key={`${name}-${index}`} name={name} />
        ))}
      </div>
    </>
  );
}
