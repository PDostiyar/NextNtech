/** HTML = skeleton, CSS = clothes, JS = muscles */
const ITEMS = [
  {
    emoji: "🦴",
    name: "HTML",
    role: "The skeleton",
    desc: "Structure: headings, text, images",
    color: "#2EC4B6",
  },
  { emoji: "👕", name: "CSS", role: "The clothes", desc: "Style: colors, fonts, layout", color: "#7C5CD6" },
  {
    emoji: "💪",
    name: "JavaScript",
    role: "The muscles",
    desc: "Action: clicks, movement, logic",
    color: "#F5A524",
  },
];

export function WebTrio() {
  return (
    <div className="my-4 grid [grid-template-columns:repeat(auto-fit,minmax(140px,1fr))] gap-2.5">
      {ITEMS.map((i) => (
        <div
          key={i.name}
          className="rounded-[14px] border-2 bg-white p-3.5 text-center"
          style={{ borderColor: i.color }}
        >
          <div className="text-[34px]" aria-hidden="true">
            {i.emoji}
          </div>
          <div className="font-extrabold text-ink">{i.name}</div>
          <div className="text-[13px] font-bold" style={{ color: i.color }}>
            {i.role}
          </div>
          <div className="mt-1 text-xs text-body">{i.desc}</div>
        </div>
      ))}
    </div>
  );
}
