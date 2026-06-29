const firstRow = ["mail", "messages", "notes", "safari", "calendar", "reminders", "chrome", "slack", "docs", "notion", "vscode", "figma"];
const secondRow = ["chatgpt", "claude", "firefox", "discord", "whatsapp", "telegram", "zoom", "dropbox", "gdrive", "word", "excel", "powerpoint"];

function AppTile({ name }: { name: string }) {
  return (
    <div className="app-tile">
      <img alt="" className="app-logo" src={`/assets/app-logos/${name}.png`} />
    </div>
  );
}

export function AppMarquee() {
  return (
    <>
      <div className="app-marquee">
        {[...firstRow, ...firstRow].map((name, index) => (
          <AppTile key={`${name}-${index}`} name={name} />
        ))}
      </div>
      <div className="app-marquee reverse">
        {[...secondRow, ...secondRow].map((name, index) => (
          <AppTile key={`${name}-${index}`} name={name} />
        ))}
      </div>
    </>
  );
}
