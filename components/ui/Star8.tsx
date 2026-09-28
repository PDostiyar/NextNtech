/** The NextNTech eight-pointed star mark. */
export const STAR8_POINTS =
  "50,2 61,28 89,17 78,45 98,50 78,55 89,83 61,72 50,98 39,72 11,83 22,55 2,50 22,45 11,17 39,28";

type Props = {
  size?: number;
  color?: string;
  filled?: boolean;
  className?: string;
  title?: string;
};

export function Star8({ size = 20, color = "var(--color-saffron)", filled = true, className, title }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <polygon
        points={STAR8_POINTS}
        fill={filled ? color : "none"}
        stroke={color}
        strokeWidth={filled ? 0 : 6}
      />
    </svg>
  );
}
