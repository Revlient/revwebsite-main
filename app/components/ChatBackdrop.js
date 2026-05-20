// Vertical blue tornado backdrop for the chat section — pure CSS.
// A funnel-shaped beam on the right (wider at the top, narrowing
// toward the base) with a slowly rotating conic swirl inside it
// and a bright vertical core down the middle. A wide blue halo
// breathes behind it; the floor flare spreads into the bottom
// half; a left-biased scrim keeps the centred prompt text legible.
export default function ChatBackdrop() {
  return (
    <div className="aiprompt__bg" aria-hidden="true">
      <div className="chatbd__halo" />
      <div className="chatbd__tornado">
        <div className="chatbd__swirl" />
        <div className="chatbd__core" />
      </div>
      <div className="chatbd__floor" />
      <div className="chatbd__vignette" />
    </div>
  );
}
