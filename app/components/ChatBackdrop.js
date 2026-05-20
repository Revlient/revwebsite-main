// Cascading-light backdrop for the chat section — pure CSS.
// A bright central pillar of light with many thin vertical
// strands flowing downward around it; a wide blue halo behind
// and a strong floor pool where the column lands. No motion libs.
const STRANDS = Array.from({ length: 18 }, (_, i) => i + 1);

export default function ChatBackdrop() {
  return (
    <div className="aiprompt__bg" aria-hidden="true">
      <div className="chatbd__halo" />
      <div className="chatbd__cascade">
        {STRANDS.map((n) => (
          <span key={n} className={`chatbd__strand chatbd__strand--${n}`} />
        ))}
        <span className="chatbd__pillar" />
        <span className="chatbd__pillarCore" />
      </div>
      <div className="chatbd__floor" />
      <div className="chatbd__vignette" />
    </div>
  );
}
