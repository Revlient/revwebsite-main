// Revlient mark — the official artwork.
// Vector converted from the supplied "black logo.pdf" to public/logo.svg
// (page backgrounds stripped, mark recoloured light, transparent ground).
// Served as an <img> so the clip-path ids stay scoped and the geometry is
// pixel-identical to the source. To update, replace public/logo.svg.
export default function Logo({ className = "", title = "Revlient" }) {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      className={className}
      src="/logo.svg"
      alt={title}
      width={24}
      height={24}
      draggable={false}
    />
  );
}
