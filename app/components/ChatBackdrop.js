// Vertical blue light beam backdrop for the chat section — pure CSS.
// A thin bright blue-white pillar on the right side flows top-down,
// landing in a floor flare that spreads into the bottom half. Adds
// a soft halo, a downward-flowing highlight inside the beam, and a
// left-biased scrim so the centred prompt text stays legible.
// Replaces the WebGL radiating-line shader.
export default function ChatBackdrop() {
  return (
    <div className="aiprompt__bg" aria-hidden="true">
      <div className="chatbd__halo" />
      <div className="chatbd__beam" />
      <div className="chatbd__flow" />
      <div className="chatbd__floor" />
      <div className="chatbd__vignette" />
    </div>
  );
}
