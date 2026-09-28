/** The CSS box model: margin → border → padding → content. */
export function BoxModel() {
  return (
    <svg
      viewBox="0 0 420 240"
      className="mx-auto my-3.5 block w-full max-w-[420px]"
      role="img"
      aria-label="The CSS box model: margin is the space outside, border is the frame, padding is the space inside, and the content sits in the middle."
      direction="ltr"
    >
      <rect
        x="10"
        y="10"
        width="400"
        height="220"
        rx="10"
        fill="#FFF4DC"
        stroke="#F5A524"
        strokeWidth="2"
        strokeDasharray="6 4"
      />
      <text x="30" y="34" fontSize="14" fontWeight="bold" fill="#B27B12">
        margin — space OUTSIDE
      </text>
      <rect x="55" y="52" width="310" height="140" rx="8" fill="#EDE7FB" stroke="#7C5CD6" strokeWidth="3" />
      <text x="70" y="74" fontSize="14" fontWeight="bold" fill="#7C5CD6">
        border — the frame
      </text>
      <rect
        x="95"
        y="88"
        width="230"
        height="80"
        rx="6"
        fill="#E4F7F5"
        stroke="#2EC4B6"
        strokeWidth="2"
        strokeDasharray="6 4"
      />
      <text x="108" y="108" fontSize="13" fontWeight="bold" fill="#1B8A80">
        padding — space inside
      </text>
      <rect x="130" y="118" width="160" height="36" rx="4" fill="#16337F" />
      <text x="210" y="141" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#fff">
        content 📦
      </text>
    </svg>
  );
}
