// Video-backed chat backdrop. Plays a looping lava/light cascade
// loop (drop the file at /public/lava.mp4 — any seamless 5-10s
// loop works). autoplay+muted+playsInline lets it start without
// user gesture across browsers. A thin vignette keeps the
// centred prompt text legible over whatever the video shows.
export default function ChatBackdrop() {
  return (
    <div className="aiprompt__bg" aria-hidden="true">
      <video
        className="chatbd__video"
        src="/lava.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <div className="chatbd__vignette" />
    </div>
  );
}
