// Revlient brand mark — four angled blades forming a stylised wheat /
// leaf shape. Rendered with currentColor so callers can recolour it
// via CSS (white on the dark footer plate, white on the blue lucky
// cube, etc.).
export default function BrandMark({ className }) {
  return (
    <svg
      viewBox="0 0 96 110"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      fill="currentColor"
    >
      {/* upper-left blade */}
      <path d="M18 30 L46 19 L46 50 L36 56 L18 45 Z" />
      {/* upper-right blade */}
      <path d="M78 30 L50 19 L50 50 L60 56 L78 45 Z" />
      {/* lower-left blade */}
      <path d="M18 58 L36 58 L46 64 L46 94 L24 94 L18 80 Z" />
      {/* lower-right blade */}
      <path d="M78 58 L60 58 L50 64 L50 94 L72 94 L78 80 Z" />
    </svg>
  );
}
