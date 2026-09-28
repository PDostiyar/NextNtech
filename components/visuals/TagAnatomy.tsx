const TURQ = "#2EC4B6";
const SAFF = "#F5A524";
const INK = "#0E2258";

/** Anatomy of an HTML tag: opening tag, content, closing tag. */
export function TagAnatomy() {
  return (
    <svg
      viewBox="0 0 460 150"
      className="mx-auto my-3.5 block w-full max-w-[460px]"
      role="img"
      aria-label="An HTML tag: the opening tag <p>, the content Hello!, and the closing tag </p> with a slash."
      direction="ltr"
    >
      <rect x="10" y="45" width="105" height="44" rx="8" fill="#E4F7F5" stroke={TURQ} strokeWidth="2" />
      <text x="62" y="73" textAnchor="middle" fontSize="22" fontFamily="monospace" fill={INK}>
        {"<p>"}
      </text>
      <rect x="125" y="45" width="140" height="44" rx="8" fill="#FFF4DC" stroke={SAFF} strokeWidth="2" />
      <text x="195" y="73" textAnchor="middle" fontSize="20" fontFamily="monospace" fill={INK}>
        Hello!
      </text>
      <rect x="275" y="45" width="120" height="44" rx="8" fill="#E4F7F5" stroke={TURQ} strokeWidth="2" />
      <text x="335" y="73" textAnchor="middle" fontSize="22" fontFamily="monospace" fill={INK}>
        {"</p>"}
      </text>
      <text x="62" y="25" textAnchor="middle" fontSize="13" fontWeight="bold" fill={TURQ}>
        opening tag
      </text>
      <text x="195" y="120" textAnchor="middle" fontSize="13" fontWeight="bold" fill={SAFF}>
        content
      </text>
      <text x="335" y="25" textAnchor="middle" fontSize="13" fontWeight="bold" fill={TURQ}>
        closing tag (with /)
      </text>
      <line x1="62" y1="30" x2="62" y2="43" stroke={TURQ} strokeWidth="2" />
      <line x1="195" y1="92" x2="195" y2="107" stroke={SAFF} strokeWidth="2" />
      <line x1="335" y1="30" x2="335" y2="43" stroke={TURQ} strokeWidth="2" />
    </svg>
  );
}
