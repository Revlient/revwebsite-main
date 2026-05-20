// Falling-light "rain" backdrop for the chat section — pure CSS.
// 16 thin vertical streaks fall top -> bottom at varied speeds,
// delays and x positions so the rain reads continuous. A wide
// blue halo sits behind, a floor flare spreads where the rain
// lands, and a left-biased scrim keeps the centred prompt text
// legible. No motion libs.
const DROPS = Array.from({ length: 16 }, (_, i) => i + 1);

export default function ChatBackdrop() {
  return (
    <div className="aiprompt__bg" aria-hidden="true">
      <div className="chatbd__halo" />
      <div className="chatbd__rain">
        {DROPS.map((n) => (
          <span key={n} className={`chatbd__drop chatbd__drop--${n}`} />
        ))}
      </div>
      <div className="chatbd__floor" />
      <div className="chatbd__vignette" />
    </div>
  );
}
