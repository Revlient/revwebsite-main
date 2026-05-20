// Vertical blue tornado backdrop for the chat section — pure CSS.
// A funnel-shaped beam on the right (wider neck at the top,
// flaring outward to the base) with a slowly rotating conic swirl
// inside it, a bright vertical core down the middle, and a
// brighter band that continuously flows downward (top -> bottom).
// A wide blue halo breathes behind it; the floor flare spreads
// into the bottom half; a left-biased scrim keeps the centred
// prompt text legible.
export default function ChatBackdrop() {
  return (
    <div className="aiprompt__bg" aria-hidden="true">
      <div className="chatbd__halo" />
      <div className="chatbd__tornado">
        <div className="chatbd__swirl" />
        <div className="chatbd__core" />
        <div className="chatbd__flowdown" />
      </div>
      <div className="chatbd__floor" />
      <div className="chatbd__vignette" />
    </div>
  );
}

