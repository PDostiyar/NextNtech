import React, { useState } from "react";

/* ============ NextNTech.org — Demo Prototype v2 ============
   New in v2:
   • 2–3 fully working modules in EVERY course
   • Start anywhere — Back-End first? No problem. No locked order.
   • Every lesson: text + VISUALS + PRACTICE playground + quiz
   • Playgrounds: live HTML/CSS/JS preview, Python & PHP mini-
     interpreter, SQL mini-database, API simulator, hash demo
============================================================= */

const T = {
  ink: "#0E2258",
  lapis: "#16337F",
  lapisSoft: "#2A4BAE",
  saffron: "#F5A524",
  turquoise: "#2EC4B6",
  paper: "#F4F6FB",
  card: "#FFFFFF",
  line: "#DDE3F0",
  body: "#3A4666",
  green: "#2E933C",
  red: "#D64545",
};

const Star8 = ({ size = 20, color = T.saffron, filled = true }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
    <polygon
      points="50,2 61,28 89,17 78,45 98,50 78,55 89,83 61,72 50,98 39,72 11,83 22,55 2,50 22,45 11,17 39,28"
      fill={filled ? color : "none"}
      stroke={color}
      strokeWidth={filled ? 0 : 6}
    />
  </svg>
);

/* ================= LANGUAGES: English · دری · پښتو (RTL) ================= */
const STR = {
  en: {
    nav_courses: "Courses", nav_progress: "My Progress", nav_about: "About", signin: "Sign in",
    hero_title: "What's next in technology — for you and your kids.",
    hero_sub: "Every kid deserves to become a technology geek. Learn front-end, back-end, full-stack and Python with simple lessons, visuals, hands-on practice and quick quizzes — free forever.",
    hero_anywhere: "Start anywhere. Curious about servers? Jump straight into Back-End — no required order.",
    cta_start: "Start learning — it's free", cta_invite: "Invite a friend",
    all_courses: "All courses", pick_start: "Pick your starting point",
    anywhere_note: "Start anywhere — front end, back end, Python… no required order.",
    start: "Start", review: "Review", coming: "Coming soon",
    check: "Check your knowledge", saved: "Correct answers are saved to your profile.",
    listen: "Listen to lesson", stop: "Stop audio", video: "Watch video", man: "Man's voice", woman: "Woman's voice",
    my_progress: "My progress", keep: "Keep learning →",
    note: "Lesson content is in English in this demo. The full version will include translated lessons — and browser translation (e.g. Google Translate) works too.",
  },
  fa: { // Dari / فارسی دری
    nav_courses: "کورس‌ها", nav_progress: "پیشرفت من", nav_about: "درباره ما", signin: "ورود",
    hero_title: "قدم بعدی در تکنالوژی — برای شما و فرزندان‌تان.",
    hero_sub: "هر کودک حق دارد یک نابغه تکنالوژی شود. فرانت‌اند، بک‌اند، فول‌استک و پایتون را با درس‌های ساده، تصاویر، تمرین عملی و آزمون‌های کوتاه بیاموزید — همیشه رایگان.",
    hero_anywhere: "از هر جا شروع کنید — هیچ ترتیب اجباری وجود ندارد.",
    cta_start: "شروع یادگیری — رایگان است", cta_invite: "دعوت از دوستان",
    all_courses: "همه کورس‌ها", pick_start: "نقطه شروع خود را انتخاب کنید",
    anywhere_note: "از هر جا شروع کنید — فرانت‌اند، بک‌اند، پایتون… بدون ترتیب اجباری.",
    start: "شروع", review: "مرور", coming: "به زودی",
    check: "دانش خود را بیازمایید", saved: "پاسخ‌های درست در پروفایل شما ذخیره می‌شود.",
    listen: "شنیدن درس", stop: "توقف صدا", video: "تماشای ویدیو", man: "صدای مرد", woman: "صدای زن",
    my_progress: "پیشرفت من", keep: "ادامه یادگیری",
    note: "محتوای درس‌ها در این دمو به انگلیسی است. در نسخه کامل، درس‌ها ترجمه می‌شوند — ترجمه مرورگر (گوگل) نیز کار می‌کند.",
  },
  ps: { // Pashto / پښتو
    nav_courses: "کورسونه", nav_progress: "زما پرمختګ", nav_about: "زموږ په اړه", signin: "ننوتل",
    hero_title: "په ټکنالوژۍ کې راتلونکی ګام — ستاسو او ستاسو د ماشومانو لپاره.",
    hero_sub: "هر ماشوم حق لري چې د ټکنالوژۍ ماهر شي. فرنټ اینډ، بیک اینډ، فول سټیک او پایتون د ساده لوستونو، انځورونو، عملي تمرین او لنډو ازموینو سره زده کړئ — تل وړیا.",
    hero_anywhere: "له هر ځایه پیل وکړئ — هیڅ اجباري ترتیب نشته.",
    cta_start: "زده کړه پیل کړئ — وړیا ده", cta_invite: "ملګري وبلئ",
    all_courses: "ټول کورسونه", pick_start: "خپل د پیل ټکی وټاکئ",
    anywhere_note: "له هر ځایه پیل وکړئ — فرنټ اینډ، بیک اینډ، پایتون… پرته له اجباري ترتیبه.",
    start: "پیل", review: "بیاکتنه", coming: "ژر راځي",
    check: "خپله پوهه وازمویئ", saved: "سم ځوابونه ستاسو په پروفایل کې خوندي کیږي.",
    listen: "لوست واورئ", stop: "غږ ودروئ", video: "ویډیو وګورئ", man: "نارینه غږ", woman: "ښځینه غږ",
    my_progress: "زما پرمختګ", keep: "زده کړې ته دوام ورکړئ",
    note: "په دې ډیمو کې د لوستونو منځپانګه په انګلیسي ده. په بشپړه نسخه کې لوستونه ژباړل کیږي — د براوزر ژباړه (ګوګل) هم کار کوي.",
  },
};
const LangCtx = React.createContext({ lang: "en", dir: "ltr", t: (k) => STR.en[k] || k });
const useT = () => React.useContext(LangCtx);

/* ============ AUDIO: play lesson text with man/woman voice ============ */
function ListenBar({ bodyRef, color }) {
  const { t } = useT();
  const [voice, setVoice] = useState("woman");
  const [playing, setPlaying] = useState(false);
  const speak = () => {
    const synth = window.speechSynthesis;
    if (!synth) { alert("Audio is not supported in this browser."); return; }
    if (playing) { synth.cancel(); setPlaying(false); return; }
    const text = bodyRef.current ? bodyRef.current.innerText.slice(0, 4000) : "";
    const u = new SpeechSynthesisUtterance(text);
    const voices = synth.getVoices();
    const female = /female|zira|samantha|victoria|karen|moira|tessa|jenny|aria|susan|serena/i;
    const male = /(^|\s)male|david|daniel|alex|guy|george|mark|james|fred/i;
    let v = voices.find((x) => x.lang.startsWith("en") && (voice === "woman" ? female : male).test(x.name));
    if (!v) v = voices.find((x) => x.lang.startsWith("en"));
    if (v) u.voice = v;
    u.pitch = voice === "woman" ? 1.15 : 0.8; // fallback if no gendered voice installed
    u.rate = 0.95;
    u.onend = () => setPlaying(false);
    synth.cancel(); synth.speak(u); setPlaying(true);
  };
  const chip = (id, label) => (
    <button key={id} onClick={() => { setVoice(id); if (playing) { window.speechSynthesis.cancel(); setPlaying(false); } }}
      style={{ fontFamily: "inherit", fontSize: 13, fontWeight: 700, padding: "6px 12px", borderRadius: 999, cursor: "pointer",
        border: `2px solid ${voice === id ? color : T.line}`, background: voice === id ? color : "#fff", color: voice === id ? "#fff" : T.body }}>
      {id === "woman" ? "👩 " : "👨 "}{label}
    </button>
  );
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
      <Btn kind="dark" style={{ padding: "9px 16px", background: playing ? T.red : T.lapis }} onClick={speak}>
        {playing ? "⏹ " + t("stop") : "🔊 " + t("listen")}
      </Btn>
      {chip("woman", t("woman"))}
      {chip("man", t("man"))}
    </div>
  );
}

/* ============ VIDEO + AUDIO bar shown at the top of every lesson ============ */
function VideoAudioBar({ bodyRef, title, color }) {
  const { t } = useT();
  const [open, setOpen] = useState(false);
  return (
    <Card style={{ marginBottom: 14, borderColor: color + "66", borderWidth: 2 }}>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
        <ListenBar bodyRef={bodyRef} color={color} />
        <Btn style={{ padding: "9px 16px", background: color, color: "#fff" }} onClick={() => setOpen(!open)}>
          ▶ {t("video")}
        </Btn>
      </div>
      {open && (
        <div style={{ marginTop: 14, background: T.ink, borderRadius: 14, aspectRatio: "16/9", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#fff", textAlign: "center", padding: 16 }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, marginBottom: 12, cursor: "pointer" }}>▶</div>
          <strong style={{ fontSize: 16 }}>{title}</strong>
          <span style={{ fontSize: 13, opacity: 0.75, marginTop: 6, maxWidth: 400 }}>
            Video placeholder — in the full version a short 3–5 min lesson video plays here (hosted free on YouTube, embedded per lesson).
          </span>
        </div>
      )}
    </Card>
  );
}

/* ---------------- generic UI ---------------- */
const Btn = ({ children, onClick, kind = "primary", style = {}, disabled }) => {
  const kinds = {
    primary: { background: T.saffron, color: T.ink },
    dark: { background: T.lapis, color: "#fff" },
    ghost: { background: "transparent", color: T.lapis, border: `2px solid ${T.lapis}` },
    green: { background: T.green, color: "#fff" },
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        fontFamily: "inherit", fontWeight: 700, fontSize: 15, border: "none",
        borderRadius: 12, padding: "12px 20px", cursor: disabled ? "default" : "pointer",
        opacity: disabled ? 0.5 : 1, ...kinds[kind], ...style,
      }}
    >
      {children}
    </button>
  );
};

const Card = ({ children, style = {}, onClick }) => (
  <div onClick={onClick} style={{ background: T.card, border: `1px solid ${T.line}`, borderRadius: 16, padding: 20, cursor: onClick ? "pointer" : "default", ...style }}>
    {children}
  </div>
);

const mono = { fontFamily: "ui-monospace, Menlo, Consolas, monospace" };
const CodeBox = ({ children }) => (
  <pre style={{ ...mono, background: T.ink, color: "#9fd6ff", borderRadius: 12, padding: 16, fontSize: 14, overflowX: "auto", whiteSpace: "pre-wrap", lineHeight: 1.6 }}>{children}</pre>
);

/* ================= VISUAL components ================= */

/* HTML = skeleton, CSS = clothes, JS = muscles */
const WebTrio = () => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px,1fr))", gap: 10, margin: "16px 0" }}>
    {[
      ["🦴", "HTML", "The skeleton", "Structure: headings, text, images", T.turquoise],
      ["👕", "CSS", "The clothes", "Style: colors, fonts, layout", "#7C5CD6"],
      ["💪", "JavaScript", "The muscles", "Action: clicks, movement, logic", T.saffron],
    ].map(([e, name, role, d, c]) => (
      <div key={name} style={{ border: `2px solid ${c}`, borderRadius: 14, padding: 14, textAlign: "center", background: "#fff" }}>
        <div style={{ fontSize: 34 }}>{e}</div>
        <div style={{ fontWeight: 800, color: T.ink }}>{name}</div>
        <div style={{ fontSize: 13, fontWeight: 700, color: c }}>{role}</div>
        <div style={{ fontSize: 12, color: T.body, marginTop: 4 }}>{d}</div>
      </div>
    ))}
  </div>
);

/* anatomy of a tag */
const TagAnatomy = () => (
  <svg viewBox="0 0 460 150" style={{ width: "100%", maxWidth: 460, display: "block", margin: "14px auto" }}>
    <rect x="10" y="45" width="105" height="44" rx="8" fill="#E4F7F5" stroke={T.turquoise} strokeWidth="2" />
    <text x="62" y="73" textAnchor="middle" fontSize="22" fontFamily="monospace" fill={T.ink}>{"<p>"}</text>
    <rect x="125" y="45" width="140" height="44" rx="8" fill="#FFF4DC" stroke={T.saffron} strokeWidth="2" />
    <text x="195" y="73" textAnchor="middle" fontSize="20" fontFamily="monospace" fill={T.ink}>Hello!</text>
    <rect x="275" y="45" width="120" height="44" rx="8" fill="#E4F7F5" stroke={T.turquoise} strokeWidth="2" />
    <text x="335" y="73" textAnchor="middle" fontSize="22" fontFamily="monospace" fill={T.ink}>{"</p>"}</text>
    <text x="62" y="25" textAnchor="middle" fontSize="13" fontWeight="bold" fill={T.turquoise}>opening tag</text>
    <text x="195" y="120" textAnchor="middle" fontSize="13" fontWeight="bold" fill={T.saffron}>content</text>
    <text x="335" y="25" textAnchor="middle" fontSize="13" fontWeight="bold" fill={T.turquoise}>closing tag (with /)</text>
    <line x1="62" y1="30" x2="62" y2="43" stroke={T.turquoise} strokeWidth="2" />
    <line x1="195" y1="92" x2="195" y2="107" stroke={T.saffron} strokeWidth="2" />
    <line x1="335" y1="30" x2="335" y2="43" stroke={T.turquoise} strokeWidth="2" />
  </svg>
);

/* CSS box model */
const BoxModel = () => (
  <svg viewBox="0 0 420 240" style={{ width: "100%", maxWidth: 420, display: "block", margin: "14px auto" }}>
    <rect x="10" y="10" width="400" height="220" rx="10" fill="#FFF4DC" stroke={T.saffron} strokeWidth="2" strokeDasharray="6 4" />
    <text x="30" y="34" fontSize="14" fontWeight="bold" fill="#B27B12">margin — space OUTSIDE</text>
    <rect x="55" y="52" width="310" height="140" rx="8" fill="#EDE7FB" stroke="#7C5CD6" strokeWidth="3" />
    <text x="70" y="74" fontSize="14" fontWeight="bold" fill="#7C5CD6">border — the frame</text>
    <rect x="95" y="88" width="230" height="80" rx="6" fill="#E4F7F5" stroke={T.turquoise} strokeWidth="2" strokeDasharray="6 4" />
    <text x="108" y="108" fontSize="13" fontWeight="bold" fill="#1B8A80">padding — space inside</text>
    <rect x="130" y="118" width="160" height="36" rx="4" fill={T.lapis} />
    <text x="210" y="141" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#fff">content 📦</text>
  </svg>
);

/* client-server */
const ClientServer = ({ label = "GET /jokes" }) => (
  <svg viewBox="0 0 460 170" style={{ width: "100%", maxWidth: 460, display: "block", margin: "14px auto" }}>
    <rect x="15" y="45" width="130" height="90" rx="12" fill="#E4F7F5" stroke={T.turquoise} strokeWidth="2" />
    <text x="80" y="82" textAnchor="middle" fontSize="30">💻</text>
    <text x="80" y="115" textAnchor="middle" fontSize="14" fontWeight="bold" fill={T.ink}>Browser</text>
    <text x="80" y="130" textAnchor="middle" fontSize="11" fill={T.body}>(front end)</text>
    <rect x="315" y="45" width="130" height="90" rx="12" fill="#FFF4DC" stroke={T.saffron} strokeWidth="2" />
    <text x="380" y="82" textAnchor="middle" fontSize="30">🖥️</text>
    <text x="380" y="115" textAnchor="middle" fontSize="14" fontWeight="bold" fill={T.ink}>Server</text>
    <text x="380" y="130" textAnchor="middle" fontSize="11" fill={T.body}>(back end)</text>
    <line x1="150" y1="70" x2="308" y2="70" stroke={T.lapis} strokeWidth="2.5" markerEnd="url(#arr)" />
    <text x="230" y="60" textAnchor="middle" fontSize="12" fontWeight="bold" fill={T.lapis}>request: {label}</text>
    <line x1="308" y1="110" x2="150" y2="110" stroke={T.green} strokeWidth="2.5" markerEnd="url(#arr2)" />
    <text x="230" y="132" textAnchor="middle" fontSize="12" fontWeight="bold" fill={T.green}>response: data (JSON)</text>
    <defs>
      <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill={T.lapis} /></marker>
      <marker id="arr2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill={T.green} /></marker>
    </defs>
  </svg>
);

/* database table visual */
const students = [
  { name: "Zahra", age: 14, country: "Afghanistan" },
  { name: "Omar", age: 16, country: "USA" },
  { name: "Lina", age: 12, country: "Germany" },
  { name: "Sam", age: 15, country: "UK" },
];
const TableVisual = ({ rows = students, cols = ["name", "age", "country"] }) => (
  <div style={{ overflowX: "auto", margin: "14px 0" }}>
    <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 14 }}>
      <thead>
        <tr>{cols.map((c) => <th key={c} style={{ background: T.lapis, color: "#fff", padding: "8px 12px", textAlign: "left", border: `1px solid ${T.line}` }}>{c}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} style={{ background: i % 2 ? T.paper : "#fff" }}>
            {cols.map((c) => <td key={c} style={{ padding: "8px 12px", border: `1px solid ${T.line}`, color: T.body }}>{String(r[c])}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/* ================= PRACTICE playgrounds ================= */

const PlayShell = ({ title, hint, color = T.turquoise, children }) => (
  <Card style={{ margin: "24px 0", borderColor: color, borderWidth: 2 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ fontSize: 22 }}>🧪</span>
      <h3 style={{ color: T.ink, margin: 0 }}>Practice: {title}</h3>
    </div>
    <p style={{ color: T.body, fontSize: 14, margin: "6px 0 12px" }}>{hint}</p>
    {children}
  </Card>
);

const taStyle = { ...mono, width: "100%", minHeight: 150, fontSize: 14, padding: 12, borderRadius: 10, border: `2px solid ${T.line}`, background: "#FBFCFF", color: T.ink, boxSizing: "border-box", resize: "vertical", lineHeight: 1.6 };
const outStyle = { ...mono, background: T.ink, color: "#B8F5C8", borderRadius: 10, padding: 12, fontSize: 14, minHeight: 60, whiteSpace: "pre-wrap", lineHeight: 1.6 };

/* Live HTML/CSS/JS preview */
function HtmlPlayground({ starter, phone }) {
  const [code, setCode] = useState(starter);
  const doc = `<!doctype html><html><head><style>body{font-family:system-ui,sans-serif;padding:14px;margin:0}</style></head><body>${code}</body></html>`;
  const frame = (
    <iframe title="preview" sandbox="allow-scripts" srcDoc={doc}
      style={{ width: "100%", height: phone ? 330 : 240, border: `2px solid ${T.line}`, borderRadius: phone ? 22 : 10, background: "#fff", boxSizing: "border-box" }} />
  );
  return (
    <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
      <div>
        <div style={{ fontSize: 12, fontWeight: 800, color: T.body, letterSpacing: 1, marginBottom: 4 }}>YOUR CODE — edit me!</div>
        <textarea value={code} onChange={(e) => setCode(e.target.value)} style={{ ...taStyle, minHeight: phone ? 330 : 240 }} spellCheck={false} />
      </div>
      <div>
        <div style={{ fontSize: 12, fontWeight: 800, color: T.body, letterSpacing: 1, marginBottom: 4 }}>LIVE PREVIEW {phone && "📱"}</div>
        {phone ? <div style={{ maxWidth: 240, margin: "0 auto", padding: 10, background: T.ink, borderRadius: 30 }}>{frame}</div> : frame}
      </div>
    </div>
  );
}

/* Mini interpreter for Python (print) and PHP (echo) */
function evalExpr(expr, vars) {
  expr = expr.trim();
  const s = expr.match(/^"([^"]*)"$|^'([^']*)'$/);
  if (s) return s[1] ?? s[2];
  let sub = expr.replace(/[A-Za-z_]\w*/g, (m) => (m in vars ? (typeof vars[m] === "string" ? JSON.stringify(vars[m]) : vars[m]) : m));
  try {
    if (/^[\d\s+\-*/%().,'"A-Za-z_]+$/.test(sub)) {
      // eslint-disable-next-line no-new-func
      const v = Function('"use strict";return (' + sub + ")")();
      if (v !== undefined) return String(v);
    }
  } catch (e) { /* fallthrough */ }
  return "⚠️ can't compute: " + expr;
}
function runMini(code, keyword) {
  const vars = {}; const out = [];
  for (let raw of code.split("\n")) {
    let line = raw.trim().replace(/;$/, "");
    if (!line || line.startsWith("#") || line.startsWith("//")) continue;
    const prParen = line.match(new RegExp("^" + keyword + "\\s*\\((.*)\\)$"));
    const prBare = keyword === "echo" ? line.match(/^echo\s+(.+)$/) : null;
    const asn = line.match(/^\$?([A-Za-z_]\w*)\s*=\s*(.+)$/);
    if (prParen || prBare) out.push(evalExpr((prParen || prBare)[1], vars));
    else if (asn && !line.includes("==")) vars[asn[1]] = /^["']/.test(asn[2].trim()) ? asn[2].trim().slice(1, -1) : evalExpr(asn[2], vars);
    else out.push('⚠️ This mini-playground only knows ' + keyword + ' and simple variables. Line skipped: "' + line + '"');
  }
  return out.join("\n") || '(no output yet — try ' + keyword + '("Hello!"))';
}
function MiniLang({ starter, keyword, label }) {
  const [code, setCode] = useState(starter);
  const [out, setOut] = useState("");
  return (
    <div>
      <div style={{ fontSize: 12, fontWeight: 800, color: T.body, letterSpacing: 1, marginBottom: 4 }}>YOUR {label} CODE</div>
      <textarea value={code} onChange={(e) => setCode(e.target.value)} style={taStyle} spellCheck={false} />
      <div style={{ margin: "10px 0" }}>
        <Btn kind="green" style={{ padding: "10px 18px" }} onClick={() => setOut(runMini(code, keyword))}>▶ Run</Btn>
      </div>
      <div style={{ fontSize: 12, fontWeight: 800, color: T.body, letterSpacing: 1, marginBottom: 4 }}>OUTPUT</div>
      <div style={outStyle}>{out || "…press Run"}</div>
    </div>
  );
}

/* Mini SQL engine over the students table */
function runSql(q) {
  const m = q.trim().replace(/;$/, "").match(/^select\s+(.+?)\s+from\s+students(?:\s+where\s+(\w+)\s*(=|>|<)\s*'?([\w]+)'?)?$/i);
  if (!m) return { err: "I only understand: SELECT columns FROM students [WHERE column = / > / < value]" };
  const cols = m[1].trim() === "*" ? ["name", "age", "country"] : m[1].split(",").map((c) => c.trim().toLowerCase());
  for (const c of cols) if (!["name", "age", "country"].includes(c)) return { err: `Unknown column "${c}". Columns: name, age, country` };
  let rows = students;
  if (m[2]) {
    const col = m[2].toLowerCase(), op = m[3], val = m[4];
    if (!["name", "age", "country"].includes(col)) return { err: `Unknown column "${col}"` };
    rows = rows.filter((r) => {
      const a = r[col], b = col === "age" ? Number(val) : val;
      return op === "=" ? String(a).toLowerCase() === String(b).toLowerCase() : op === ">" ? a > b : a < b;
    });
  }
  return { cols, rows };
}
function SqlPlayground() {
  const [q, setQ] = useState("SELECT name, age FROM students WHERE age > 13");
  const [res, setRes] = useState(null);
  return (
    <div>
      <div style={{ fontSize: 12, fontWeight: 800, color: T.body, letterSpacing: 1, marginBottom: 4 }}>YOUR SQL QUERY</div>
      <textarea value={q} onChange={(e) => setQ(e.target.value)} style={{ ...taStyle, minHeight: 70 }} spellCheck={false} />
      <div style={{ margin: "10px 0" }}>
        <Btn kind="green" style={{ padding: "10px 18px" }} onClick={() => setRes(runSql(q))}>▶ Run query</Btn>
      </div>
      {res && (res.err ? <div style={{ ...outStyle, color: "#FFB4B4" }}>{res.err}</div> : res.rows.length ? <TableVisual rows={res.rows} cols={res.cols} /> : <div style={outStyle}>(0 rows matched)</div>)}
    </div>
  );
}

/* API simulator: edit the server's JSON, then "send a request" */
function ApiPlayground() {
  const [code, setCode] = useState('{\n  "joke": "Why do programmers love dark mode?",\n  "answer": "Because light attracts bugs! 🐛"\n}');
  const [resp, setResp] = useState(null);
  return (
    <div>
      <div style={{ fontSize: 12, fontWeight: 800, color: T.body, letterSpacing: 1, marginBottom: 4 }}>YOUR SERVER'S RESPONSE for GET /api/joke — edit the JSON</div>
      <textarea value={code} onChange={(e) => setCode(e.target.value)} style={taStyle} spellCheck={false} />
      <div style={{ margin: "10px 0" }}>
        <Btn kind="green" style={{ padding: "10px 18px" }} onClick={() => { try { setResp({ ok: true, body: JSON.stringify(JSON.parse(code), null, 2) }); } catch (e) { setResp({ ok: false, body: "SyntaxError: that's not valid JSON — check your quotes, commas and braces." }); } }}>
          ▶ Send GET /api/joke
        </Btn>
      </div>
      {resp && (
        <div>
          <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 1, marginBottom: 4, color: resp.ok ? T.green : T.red }}>
            {resp.ok ? "✅ 200 OK — the browser received:" : "❌ 500 Server Error"}
          </div>
          <div style={{ ...outStyle, color: resp.ok ? "#B8F5C8" : "#FFB4B4" }}>{resp.body}</div>
        </div>
      )}
    </div>
  );
}

/* Password hashing demo */
function HashPlayground() {
  const [pw, setPw] = useState("");
  let h = 7; for (const ch of pw) h = ((h * 31 + ch.charCodeAt(0)) >>> 0);
  const hash = pw ? ("$kt$" + (h >>> 0).toString(16).padStart(8, "0") + (h * 2654435761 >>> 0).toString(16).padStart(8, "0")).slice(0, 26) : "";
  return (
    <div>
      <div style={{ fontSize: 12, fontWeight: 800, color: T.body, letterSpacing: 1, marginBottom: 4 }}>TYPE A PASSWORD — watch it turn into a hash</div>
      <input value={pw} onChange={(e) => setPw(e.target.value)} placeholder="e.g. sunshine123" style={{ ...taStyle, minHeight: 0, height: 46 }} />
      <div style={{ ...outStyle, marginTop: 10 }}>
        {pw ? `stored in database:  ${hash}\n\nNotice: change even ONE letter and the whole hash changes.\nAnd there is no way to turn the hash back into "${pw}".` : "…start typing"}
      </div>
    </div>
  );
}

/* ================= COURSE CONTENT ================= */

const P = ({ children }) => <p style={{ margin: "0 0 14px" }}>{children}</p>;
const B = ({ children }) => <strong style={{ color: T.ink }}>{children}</strong>;

const courses = [
  {
    id: "frontend", name: "Front-End Development", emoji: "🎨", color: T.turquoise,
    blurb: "Build what people see. HTML, CSS, JavaScript, React.",
    modules: [
      {
        title: "HTML Foundations", ready: true,
        lesson: {
          title: "HTML: The Skeleton of Every Website",
          Body: () => (<>
            <P>Every website you have ever visited — YouTube, your school's page, this one — is built on <B>HTML</B> (HyperText Markup Language). Think of a website as a human body:</P>
            <WebTrio />
            <P>HTML was invented in <B>1991 by Tim Berners-Lee</B>, a scientist who wanted researchers to share documents easily. The first version had only ~18 tags; today's HTML5 has over 100 — but you only need a handful to start. Old tags like <code>{"<font>"}</code> and <code>{"<center>"}</code> retired long ago; modern tags like <code>{"<video>"}</code> and <code>{"<section>"}</code> replaced them.</P>
            <P>Tags come in pairs — here is the anatomy of one:</P>
            <TagAnatomy />
            <CodeBox>{'<h1>Hello, world!</h1>\n<p>My first web page 🎉</p>\n<ul>\n  <li>I am learning HTML</li>\n</ul>'}</CodeBox>
          </>),
          playground: { type: "html", title: "Write your first HTML", hint: "Change the text, add another <li>, or try an <h2>. The preview updates as you type.", starter: '<h1>Hello, world!</h1>\n<p>My name is <b>Zahra</b> and I am learning HTML!</p>\n<ul>\n  <li>My first tag ✅</li>\n  <li>Add another list item here…</li>\n</ul>' },
          quiz: [
            { q: "What does HTML stand for?", options: ["HyperText Markup Language", "HighTech Modern Language", "Home Tool Markup Language"], answer: 0, why: "HTML = HyperText Markup Language. It gives a web page its structure." },
            { q: "Which tag makes the BIGGEST heading?", options: ["<h6>", "<h1>", "<heading>"], answer: 1, why: "<h1> is the largest heading; they go from <h1> (biggest) to <h6> (smallest)." },
            { q: "Who invented HTML and the Web?", options: ["Bill Gates", "Tim Berners-Lee", "Steve Jobs"], answer: 1, why: "Tim Berners-Lee created HTML and the Web in 1991 at CERN." },
          ],
        },
      },
      {
        title: "CSS & Layout", ready: true,
        lesson: {
          title: "CSS: Dressing Your Page",
          Body: () => (<>
            <P><B>CSS</B> (Cascading Style Sheets) is the clothes of the web. HTML says <i>what</i> is on the page; CSS says <i>how it looks</i> — colors, fonts, sizes, and where things sit.</P>
            <P>The most important idea in CSS is the <B>box model</B>: every element is a box wrapped in three layers of space.</P>
            <BoxModel />
            <CodeBox>{'p {\n  color: #16337F;      /* text color */\n  padding: 12px;       /* space inside */\n  border: 3px solid gold;\n  margin: 20px;        /* space outside */\n}'}</CodeBox>
            <P>A CSS rule has a <B>selector</B> (which elements?) and <B>properties</B> (what changes?). Try it below.</P>
          </>),
          playground: { type: "html", title: "Style a box with CSS", hint: "Change the color, background, border or padding — watch the box transform live.", starter: '<style>\n  .mybox {\n    color: white;\n    background: #16337F;\n    padding: 20px;\n    border: 4px solid #F5A524;\n    border-radius: 16px;\n    font-size: 20px;\n  }\n</style>\n\n<div class="mybox">I am a styled box! 🎨</div>' },
          quiz: [
            { q: "What does CSS stand for?", options: ["Creative Style System", "Cascading Style Sheets", "Computer Styled Sections"], answer: 1, why: "Cascading Style Sheets — rules 'cascade' down through the page." },
            { q: "Which property changes text color?", options: ["color", "text-paint", "font-color"], answer: 0, why: "It's simply `color`. (background changes the box behind the text.)" },
            { q: "In the box model, what sits between the border and the content?", options: ["margin", "padding", "spacing"], answer: 1, why: "Padding is inside the border; margin is outside it." },
          ],
        },
      },
      {
        title: "JavaScript Basics", ready: true,
        lesson: {
          title: "JavaScript: Making Pages Move",
          Body: () => (<>
            <P>If HTML is the skeleton and CSS is the clothes, <B>JavaScript is the muscles</B>. It reacts to clicks, changes the page, does math, and makes websites feel alive.</P>
            <P>Three building blocks you will use every single day:</P>
            <CodeBox>{'let name = "Zahra";          // a variable — a named box\n\nif (name === "Zahra") {      // a decision\n  console.log("Welcome back!");\n}\n\nbutton.onclick = sayHi;      // an event — run code on click'}</CodeBox>
            <P>JavaScript can grab any HTML element and change it — that's called working with the <B>DOM</B> (Document Object Model). Try the button below: the code finds the element with <code>id="msg"</code> and rewrites it.</P>
          </>),
          playground: { type: "html", title: "Make a button do something", hint: "Click the button in the preview. Then change the message text in the code, or make it change the color too!", starter: '<h2 id="msg">Click the button 👇</h2>\n<button onclick="change()">Press me!</button>\n\n<script>\n  let count = 0;\n  function change() {\n    count = count + 1;\n    document.getElementById("msg").innerHTML =\n      "You clicked " + count + " times! 🎉";\n  }\n</script>' },
          quiz: [
            { q: "Which keyword creates a variable whose value can change?", options: ["let", "const", "static"], answer: 0, why: "`let` allows change; `const` locks the value." },
            { q: "What does document.getElementById(\"msg\") do?", options: ["Creates a new page", "Finds the element with id=\"msg\"", "Downloads a file"], answer: 1, why: "It searches the page for the element with that id so your code can change it." },
            { q: "Code that runs when a button is clicked is called…", options: ["a stylesheet", "an event handler", "a database"], answer: 1, why: "Events (click, type, scroll) trigger handler functions." },
          ],
        },
      },
      { title: "React", ready: false },
    ],
  },
  {
    id: "backend", name: "Back-End Development", emoji: "⚙️", color: T.lapisSoft,
    blurb: "Build what powers apps. Node.js, Express, SQL, PHP & Laravel, CMS.",
    modules: [
      {
        title: "Node.js & Express", ready: true,
        lesson: {
          title: "Your First Server",
          Body: () => (<>
            <P>The <B>back end</B> is the part of an app you never see: a program running on a <B>server</B> that stores data and answers requests. <B>Node.js</B> lets you write servers in JavaScript, and <B>Express</B> makes it easy.</P>
            <ClientServer label="GET /api/joke" />
            <P>The browser sends a <B>request</B>; the server sends back a <B>response</B> — usually as <B>JSON</B>, a simple text format both sides understand. In Express, each address the server answers is called a <B>route</B>:</P>
            <CodeBox>{'const express = require("express");\nconst app = express();\n\napp.get("/api/joke", (req, res) => {\n  res.json({ joke: "Why do programmers love dark mode?",\n             answer: "Light attracts bugs! 🐛" });\n});\n\napp.listen(3000);   // server is now alive on port 3000'}</CodeBox>
          </>),
          playground: { type: "api", title: "Be the server", hint: "You are the back end! Edit the JSON your server sends, then press the button to act as the browser making a request. Break the JSON on purpose to see a server error." },
          quiz: [
            { q: "Where does Node.js run JavaScript?", options: ["Only inside Chrome", "On the server", "Inside HTML files"], answer: 1, why: "Node.js runs JS outside the browser — perfect for servers." },
            { q: "What format do APIs usually use to send data?", options: ["JSON", "MP3", "DOCX"], answer: 0, why: "JSON (JavaScript Object Notation) is the common language of APIs." },
            { q: "In Express, app.get(\"/joke\", …) defines…", options: ["a database", "a route", "a stylesheet"], answer: 1, why: "A route: an address the server knows how to answer." },
          ],
        },
      },
      {
        title: "Databases & SQL", ready: true,
        lesson: {
          title: "Talking to Databases",
          Body: () => (<>
            <P>Apps need memory. A <B>database</B> stores data in <B>tables</B> made of rows and columns — like a super-powered spreadsheet. <B>SQL</B> (Structured Query Language) is how you talk to it.</P>
            <P>Here is a real table called <code>students</code>:</P>
            <TableVisual />
            <P>Four commands do almost everything: <B>SELECT</B> reads, <B>INSERT</B> adds, <B>UPDATE</B> changes, <B>DELETE</B> removes. And <B>WHERE</B> filters which rows you touch:</P>
            <CodeBox>{"SELECT name, age FROM students WHERE age > 13;"}</CodeBox>
          </>),
          playground: { type: "sql", title: "Query a real table", hint: "The students table above is live below. Try: SELECT * FROM students — or filter with WHERE country = 'USA' or WHERE age < 15." },
          quiz: [
            { q: "Which command READS data from a table?", options: ["OPEN", "READ", "SELECT"], answer: 2, why: "SELECT fetches rows; it's the command you'll use most." },
            { q: "One row in a table represents…", options: ["one record (e.g. one student)", "one column", "one database"], answer: 0, why: "Each row = one record; each column = one property of it." },
            { q: "What is WHERE for?", options: ["Renaming tables", "Filtering which rows you get", "Deleting the database"], answer: 1, why: "WHERE narrows results: WHERE age > 13 returns only matching rows." },
          ],
        },
      },
      {
        title: "PHP, Laravel & CodeIgniter", ready: true,
        lesson: {
          title: "PHP: The Language Behind Most of the Web",
          Body: () => (<>
            <P><B>PHP</B> runs on the server — it powers WordPress, Wikipedia, and roughly <B>40% of all websites</B>. Like Node.js, it builds the back end; it just uses different words. Its print command is <code>echo</code>, and variables start with <code>$</code>:</P>
            <CodeBox>{'$name = "Zahra";\necho "Salaam, " . $name;   // prints: Salaam, Zahra'}</CodeBox>
            <P>Modern PHP developers rarely start from zero — they use <B>frameworks</B>: <B>Laravel</B> (the most popular, elegant and full-featured) and <B>CodeIgniter</B> (small and fast). And <B>CMS</B> platforms like <B>WordPress, Joomla and Drupal</B> are giant PHP apps you can customize with the HTML/CSS skills from the front-end path.</P>
          </>),
          playground: { type: "mini", keyword: "echo", label: "PHP", title: "echo in PHP", hint: 'Try changing the text, or make variables: $city = "Kabul"; then echo $city;', starter: '$name = "Zahra"\necho "Salaam!"\necho $name\necho 7 * 6' },
          quiz: [
            { q: "Where does PHP code run?", options: ["In the browser", "On the server", "Only on phones"], answer: 1, why: "PHP is server-side — the browser only receives the finished HTML." },
            { q: "Which is a popular modern PHP framework?", options: ["Laravel", "React", "Django"], answer: 0, why: "Laravel (and CodeIgniter) are PHP; React is front-end JS, Django is Python." },
            { q: "Which CMS is built with PHP and powers ~40% of the web?", options: ["Excel", "WordPress", "Photoshop"], answer: 1, why: "WordPress — along with Joomla and Drupal, all PHP-based CMSs." },
          ],
        },
      },
      { title: "CMS Deep Dive: WordPress, Joomla, Drupal", ready: false },
    ],
  },
  {
    id: "fullstack", name: "Full-Stack Development", emoji: "🚀", color: T.saffron,
    blurb: "Combine both sides and ship a complete web application.",
    modules: [
      {
        title: "Connecting Front & Back", ready: true,
        lesson: {
          title: "fetch(): How the Two Sides Talk",
          Body: () => (<>
            <P>You've met both halves. A <B>full-stack developer</B> connects them: the front end asks, the back end answers. In the browser, the asking is done with <B>fetch()</B>:</P>
            <CodeBox>{'const res = await fetch("/api/joke");\nconst data = await res.json();\ndocument.getElementById("out").innerHTML = data.joke;'}</CodeBox>
            <ClientServer label="fetch('/api/joke')" />
            <P>Every response carries a <B>status code</B>: <B>200</B> = success, <B>404</B> = not found, <B>500</B> = server error. Good full-stack developers always handle the sad cases, not just the happy one.</P>
          </>),
          playground: { type: "api", title: "Round-trip a request", hint: "Play both roles: edit what your server returns, then fetch it as the browser. Delete a comma to trigger a 500 error and see why error handling matters." },
          quiz: [
            { q: "What does the front end use to request data from the back end?", options: ["a USB cable", "fetch (an HTTP request)", "CSS"], answer: 1, why: "fetch() sends an HTTP request and receives the response, usually JSON." },
            { q: "Status code 200 means…", options: ["success", "not found", "server crashed"], answer: 0, why: "200 OK = the request worked." },
            { q: "Status code 404 means…", options: ["success", "not found", "too many requests"], answer: 1, why: "404 = the server has no route/page at that address." },
          ],
        },
      },
      {
        title: "Auth & Accounts", ready: true,
        lesson: {
          title: "Logins Done Right: Hashing Passwords",
          Body: () => (<>
            <P>Real apps have accounts — and the #1 rule of accounts is: <B>never store passwords as plain text</B>. If a database leaks, plain passwords are a disaster.</P>
            <P>Instead, servers store a <B>hash</B>: the password goes through a one-way math machine and comes out as scrambled text. You can always compute the same hash from the same password — but you can <B>never</B> go backwards from the hash to the password.</P>
            <CodeBox>{'password:  "sunshine123"\n     ↓  (one-way hash function, e.g. bcrypt)\nstored:    "$2b$10$N9qo8uLOickgx2ZMRZoMye…"'}</CodeBox>
            <P>When you log in, the server hashes what you typed and compares hashes. <B>Social login</B> (Google, Facebook, LinkedIn, Microsoft) goes a step further: your password never touches the app at all — the provider vouches for you.</P>
          </>),
          playground: { type: "hash", title: "Hash a password", hint: "Type any password and watch the hash. Change one letter — the entire hash changes. That's the magic that keeps accounts safe." },
          quiz: [
            { q: "How should passwords be stored?", options: ["As plain text", "Hashed", "In a shared spreadsheet"], answer: 1, why: "Always hashed (with a strong algorithm like bcrypt) — never plain text." },
            { q: "Hashing is special because it is…", options: ["one-way: it can't be reversed", "reversible with a key", "just making text shorter"], answer: 0, why: "One-way: you can verify a password against a hash but never recover it." },
            { q: "Social login lets users…", options: ["share their password with the site", "sign in with an account they already have", "skip all security"], answer: 1, why: "Google/Facebook/LinkedIn/Microsoft confirm the identity — the app never sees the password." },
          ],
        },
      },
      { title: "Deploying Your App", ready: false },
      { title: "Capstone Project", ready: false },
    ],
  },
  {
    id: "python", name: "Python: Basic to Advanced", emoji: "🐍", color: "#7C5CD6",
    blurb: "The friendliest first language — from print() to real projects.",
    modules: [
      {
        title: "Python Basics", ready: true,
        lesson: {
          title: "print(), Variables, and Your First Program",
          Body: () => (<>
            <P><B>Python</B> is famous for reading almost like English — that's why it's the most recommended first language, and why it powers AI, data science, and automation everywhere.</P>
            <CodeBox>{'print("Salaam, world!")\n\nname = "Zahra"          # a variable — a labeled box\nage = 14\nprint(name)\nprint(age + 1)          # Python can do math'}</CodeBox>
            <P>A <B>variable</B> is a labeled box that stores a value. <code>print()</code> shows things on the screen, and <code>input()</code> asks the user to type. With just these three, you can already build a chatbot, a quiz, or a calculator.</P>
          </>),
          playground: { type: "mini", keyword: "print", label: "PYTHON", title: "Your first Python", hint: "Change the text, make new variables, try math like print(7 * 6). Press Run to see the output.", starter: 'print("Salaam, world!")\nname = "Zahra"\nprint(name)\nage = 14\nprint(age + 1)' },
          quiz: [
            { q: "Which line prints text in Python?", options: ['echo "Hi"', 'print("Hi")', 'console.log("Hi")'], answer: 1, why: "print() is Python's — echo is PHP, console.log is JavaScript." },
            { q: "What is a variable?", options: ["A named box that stores a value", "A type of loop", "A website"], answer: 0, why: "name = \"Zahra\" puts the value in a box labeled `name`." },
            { q: "What does input() do?", options: ["Prints faster", "Asks the user to type something", "Deletes variables"], answer: 1, why: "input() pauses and waits for the user's answer — great for interactive programs." },
          ],
        },
      },
      {
        title: "Data & Logic", ready: true,
        lesson: {
          title: "Lists: Many Values, One Box",
          Body: () => (<>
            <P>Real programs juggle many values at once. A <B>list</B> is one box holding many items in order:</P>
            <CodeBox>{'fruits = ["apple", "mango", "pomegranate"]\n\nprint(fruits[0])      # apple  ← counting starts at 0!\nprint(len(fruits))    # 3\n\nfor f in fruits:      # a loop visits every item\n    print(f)'}</CodeBox>
            <P>Two things trip up every beginner: counting starts at <B>0</B> (so <code>fruits[0]</code> is the first item), and a <B>loop</B> repeats code for each item so you never copy-paste. Later you'll meet <B>dictionaries</B> — lists' cousin that stores <B>key–value pairs</B> like <code>{'{"name": "Zahra", "age": 14}'}</code>.</P>
          </>),
          playground: { type: "mini", keyword: "print", label: "PYTHON", title: "Play with values", hint: "This mini-playground handles print, variables and math. Try building a total: score = 10, then print(score * 3 + 5).", starter: 'first = "apple"\nprint(first)\nscore = 10\nprint(score * 3)\nprint("items: " + first)' },
          quiz: [
            { q: "Which line creates a list?", options: ['fruits = ["apple", "mango"]', "fruits = (apple mango)", "list fruits: apple"], answer: 0, why: "Square brackets with commas make a list." },
            { q: "fruits[0] gives you…", options: ["the last item", "the first item", "always an error"], answer: 1, why: "Indexes start at 0, so [0] is the first item." },
            { q: "A dictionary stores…", options: ["only numbers", "key–value pairs", "files"], answer: 1, why: 'Like {"name": "Zahra"} — you look values up by their key.' },
          ],
        },
      },
      { title: "Advanced Python", ready: false },
      { title: "Build with Python", ready: false },
    ],
  },
  {
    id: "mobile", name: "Mobile Apps (Android & iOS)", emoji: "📱", color: "#E4572E",
    blurb: "Turn your skills into apps for phones with React Native & Swift.",
    modules: [
      {
        title: "Mobile Basics", ready: true,
        lesson: {
          title: "Websites vs. Apps: What Changes on a Phone?",
          Body: () => (<>
            <P>Phones changed everything: small screens, touch instead of mouse, and apps installed from stores (<B>Google Play</B> for Android, the <B>App Store</B> for iOS). You have two roads:</P>
            <P><B>Native:</B> write Android apps in Kotlin and iPhone apps in Swift — two codebases, maximum power. <B>Cross-platform:</B> write once in <B>React Native</B> or Flutter and ship to both — perfect when you already know React.</P>
            <P>Either way, mobile design rules apply: big touch targets, one thing per screen, thumb-friendly buttons at the bottom. Try designing for a phone below.</P>
          </>),
          playground: { type: "html", phone: true, title: "Design a phone screen", hint: "The preview is a phone! Make the button bigger, change colors, add a second card — think thumbs, not mouse pointers.", starter: '<div style="text-align:center">\n  <h2>🌟 My First App</h2>\n  <div style="background:#F4F6FB; border-radius:14px;\n       padding:14px; margin:10px 0">\n    Today\'s goal: 1 lesson ✅\n  </div>\n  <button style="width:100%; padding:16px;\n       font-size:18px; border:none; border-radius:14px;\n       background:#16337F; color:white">\n    Start Learning\n  </button>\n</div>' },
          quiz: [
            { q: "A cross-platform framework lets you…", options: ["write once for Android AND iOS", "only build websites", "skip app stores"], answer: 0, why: "One codebase, two platforms — that's the appeal of React Native and Flutter." },
            { q: "Which language is used for native iOS apps?", options: ["PHP", "Swift", "SQL"], answer: 1, why: "Swift for iOS; Kotlin for native Android." },
            { q: "Android apps are published on…", options: ["Google Play", "the App Store", "npm"], answer: 0, why: "Google Play for Android; the App Store is Apple's." },
          ],
        },
      },
      {
        title: "React Native", ready: true,
        lesson: {
          title: "React Native: Your React Skills, Now on Phones",
          Body: () => (<>
            <P><B>React Native</B> takes what you learned in the front-end path and points it at phones. Same components, same state, same thinking — different building blocks:</P>
            <CodeBox>{'// View, Text and Pressable come from the React Native library\n\nfunction App() {\n  return (\n    <View>\n      <Text>Salaam! 👋</Text>\n      <Pressable onPress={sayHi}>\n        <Text>Tap me</Text>\n      </Pressable>\n    </View>\n  );\n}'}</CodeBox>
            <P>Instead of <code>{"<div>"}</code> you use <code>{"<View>"}</code>, instead of <code>{"<p>"}</code> it's <code>{"<Text>"}</code>, and clicks become taps. Instagram, Discord and many big apps ship with React Native — one team, both stores.</P>
          </>),
          playground: { type: "html", phone: true, title: "Prototype an app screen", hint: "Sketch your dream app's home screen in the phone preview — a title, a card, a big tappable button.", starter: '<div style="text-align:center">\n  <h2>🐍 PyQuiz</h2>\n  <p style="color:#3A4666">Level 3 · 🔥 4-day streak</p>\n  <button style="width:100%; padding:16px; font-size:18px;\n     border:none; border-radius:14px;\n     background:#2E933C; color:white">\n    ▶ Continue Quiz\n  </button>\n</div>' },
          quiz: [
            { q: "React Native apps are written in…", options: ["JavaScript", "Swift only", "Python"], answer: 0, why: "JavaScript/React — the skills transfer directly from web development." },
            { q: "In React Native, instead of <div> you use…", options: ["<Box>", "<View>", "<Page>"], answer: 1, why: "<View> is the container; <Text> replaces <p>." },
            { q: "The biggest benefit of React Native for YOU is…", options: ["apps run without phones", "no code needed", "you reuse your React skills"], answer: 2, why: "Learn React once on the web, then ship to both app stores." },
          ],
        },
      },
      { title: "Swift & iOS", ready: false },
      { title: "Publish Your App", ready: false },
    ],
  },
  {
    id: "career", name: "Careers & Side Hustles", emoji: "💼", color: "#2E933C",
    blurb: "Fiverr, Upwork, Freelancer, remote jobs — earn with your skills.",
    modules: [
      {
        title: "Your Portfolio", ready: true,
        lesson: {
          title: "Your Portfolio: Proof Beats Promises",
          Body: () => (<>
            <P>When you're young with no job history, a <B>portfolio</B> is your superpower: real projects that prove your skills. Clients and employers trust what they can <B>see and click</B>.</P>
            <P>The starter kit: a <B>GitHub</B> account where your code lives, and a simple <B>portfolio page</B> — which you can already build with your HTML and CSS skills! Three good projects beat thirty copied ones: pick things you actually built and can explain line by line.</P>
          </>),
          playground: { type: "html", title: "Build your portfolio card", hint: "This is a real portfolio component. Put in your own name, skills and dream project — you just built your first portfolio piece.", starter: '<div style="border:3px solid #F5A524; border-radius:16px;\n     padding:18px; max-width:340px; font-family:sans-serif">\n  <h2 style="margin:0">Zahra A.</h2>\n  <p style="color:#3A4666">Junior Web Developer · Kabul</p>\n  <p>🛠 HTML · CSS · JavaScript · Python</p>\n  <p>⭐ Project: a quiz app for my classmates</p>\n  <button style="background:#16337F; color:white;\n     border:none; padding:10px 16px; border-radius:10px">\n    See my work\n  </button>\n</div>' },
          quiz: [
            { q: "A portfolio is…", options: ["a paid certificate", "a collection of projects that shows your skills", "a type of resume paper"], answer: 1, why: "It's living proof: projects people can open, click, and judge for themselves." },
            { q: "Where do developers usually share their code?", options: ["Instagram", "GitHub", "WordPad"], answer: 1, why: "GitHub is the standard home for code — and it's free." },
            { q: "The best first portfolio project is…", options: ["a copied template", "screenshots of others' work", "something you built and can explain"], answer: 2, why: "Interviewers and clients always ask 'how did you build this?' — you must own the answer." },
          ],
        },
      },
      {
        title: "Freelance Platforms", ready: true,
        lesson: {
          title: "Fiverr, Upwork & Freelancer: Your First Online Income",
          Body: () => (<>
            <P>Once you can build, you can earn — from anywhere. Three big marketplaces connect you with clients: <B>Fiverr</B> (you post <B>gigs</B> — fixed services with clear prices, like "I will build a 1-page website for $30"), <B>Upwork</B> (clients post jobs, you send proposals), and <B>Freelancer</B> (similar, with contests too). Remote job boards and LinkedIn add full-time options later.</P>
            <P>Golden rules for beginners: start with small, crystal-clear offers; over-deliver on your first five reviews; and <B>always keep payment inside the platform</B> — anyone who says "let's pay outside" is a red flag. Your NextNTech certificates and portfolio card slot straight into these profiles.</P>
          </>),
          playground: null,
          quiz: [
            { q: "Which of these are freelance marketplaces?", options: ["Fiverr, Upwork, Freelancer", "Netflix and Spotify", "Gmail and Outlook"], answer: 0, why: "All three connect freelancers with paying clients worldwide." },
            { q: "On Fiverr, a 'gig' is…", options: ["a full-time job", "a service you offer at a clear price", "a type of computer"], answer: 1, why: "Example: 'I will fix your website's CSS for $15' — small, specific, priced." },
            { q: "To stay safe as a beginner, you should…", options: ["share your password with clients", "keep payments inside the platform", "work with no agreement"], answer: 1, why: "Platform payments are protected; off-platform deals lose that safety net." },
          ],
        },
      },
      { title: "Remote Jobs", ready: false },
      { title: "Working with Clients", ready: false },
    ],
  },
];

const shareTexts = {
  X: "🌟 I'm learning to code for FREE on NextNTech.org — front-end, back-end, Python & more. Every kid deserves to become a technology geek. Join me → nextntech.org/register #NextNTech #LearnToCode",
  LinkedIn: "NextNTech.org is a non-profit platform teaching kids and young people real coding skills — full-stack development, Python, and freelance career paths — completely free, forever. No paywalls between a curious mind and technology. Start learning: nextntech.org/register",
  Facebook: "Every kid deserves to become a technology geek 💙 NextNTech.org teaches coding — HTML, CSS, JavaScript, Python, full-stack — 100% free, with quizzes, progress tracking and certificates. Share it with a young learner: nextntech.org/register",
  Instagram: "Free coding school in your pocket 📱 NextNTech.org — learn front-end, back-end & Python with simple lessons, visuals and quizzes. Free forever. Link: nextntech.org/register #NextNTech #CodingForKids",
};

/* ================= Screens ================= */

function Nav({ go, page, user, lang, setLang }) {
  const { t } = useT();
  const link = (id, label) => (
    <button onClick={() => go(id)} style={{ background: "none", border: "none", fontFamily: "inherit", fontSize: 15, fontWeight: page === id ? 800 : 600, color: page === id ? T.saffron : "#fff", cursor: "pointer", padding: "6px 10px" }}>{label}</button>
  );
  const langBtn = (id, label) => (
    <button key={id} onClick={() => setLang(id)} style={{ background: lang === id ? T.saffron : "rgba(255,255,255,.12)", color: lang === id ? T.ink : "#fff", border: "none", borderRadius: 8, padding: "5px 9px", fontFamily: "inherit", fontSize: 13, fontWeight: 800, cursor: "pointer" }}>{label}</button>
  );
  return (
    <nav style={{ background: T.ink, display: "flex", alignItems: "center", gap: 4, padding: "14px 18px", flexWrap: "wrap", position: "sticky", top: 0, zIndex: 10 }}>
      <div onClick={() => go("home")} style={{ display: "flex", alignItems: "center", gap: 8, marginRight: "auto", cursor: "pointer" }}>
        <Star8 size={26} />
        <span style={{ color: "#fff", fontWeight: 800, fontSize: 19 }}>NextN<span style={{ color: T.saffron }}>Tech</span><span style={{ color: T.turquoise }}>.org</span></span>
      </div>
      {link("courses", t("nav_courses"))}
      {link("dashboard", t("nav_progress"))}
      {link("about", t("nav_about"))}
      <span style={{ display: "flex", gap: 5, margin: "0 6px" }}>
        {langBtn("en", "EN")}
        {langBtn("fa", "دری")}
        {langBtn("ps", "پښتو")}
      </span>
      {user ? (
        <span style={{ color: "#fff", fontSize: 14, background: T.lapisSoft, borderRadius: 999, padding: "6px 14px", fontWeight: 700 }}>👋 {user}</span>
      ) : (
        <Btn kind="primary" style={{ padding: "8px 16px" }} onClick={() => go("login")}>{t("signin")}</Btn>
      )}
    </nav>
  );
}

/* Course card with brand-color hover + selected state */
function PathCard({ c, onClick, selected, children }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: selected ? c.color + "22" : hov ? c.color + "14" : "#fff",
        border: `2px solid ${selected || hov ? c.color : T.line}`,
        borderTop: `5px solid ${c.color}`,
        borderRadius: 16, padding: 20, cursor: "pointer",
        transform: hov ? "translateY(-3px)" : "none",
        boxShadow: hov ? `0 8px 20px ${c.color}33` : "none",
        transition: "all .15s ease", position: "relative",
      }}
    >
      {selected && (
        <span style={{ position: "absolute", top: 10, insetInlineEnd: 12, background: c.color, color: "#fff", borderRadius: 999, fontSize: 12, fontWeight: 800, padding: "3px 10px" }}>✓</span>
      )}
      {children}
    </div>
  );
}

function Home({ go, openShare }) {
  const { t } = useT();
  return (
    <div>
      <header style={{ background: `linear-gradient(160deg, ${T.ink} 0%, ${T.lapis} 70%)`, color: "#fff", padding: "52px 22px 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -20, left: -20, opacity: 0.08 }}><Star8 size={220} color="#fff" /></div>
        <div style={{ position: "absolute", bottom: -40, right: -30, opacity: 0.08 }}><Star8 size={260} color="#fff" /></div>
        <div style={{ maxWidth: 680, margin: "0 auto", position: "relative" }}>
          <div style={{ display: "inline-block", background: "rgba(255,255,255,.12)", borderRadius: 999, padding: "6px 16px", fontSize: 13, fontWeight: 700, letterSpacing: 1, marginBottom: 18 }}>A NON-PROFIT · FREE FOREVER · NO ADS</div>
          <h1 style={{ fontSize: "clamp(28px, 6vw, 46px)", lineHeight: 1.18, margin: "0 0 16px", fontWeight: 800 }}>
            {t("hero_title").split("—")[0]}<span style={{ color: T.saffron }}>—{t("hero_title").split("—")[1]}</span>
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.7, opacity: 0.9, margin: "0 0 12px" }}>{t("hero_sub")}</p>
          <p style={{ fontSize: 15, opacity: 0.85, margin: "0 0 26px" }}>🧭 {t("hero_anywhere")}</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Btn onClick={() => go("courses")}>{t("cta_start")}</Btn>
            <Btn kind="ghost" style={{ color: "#fff", borderColor: "#fff" }} onClick={openShare}>{t("cta_invite")}</Btn>
          </div>
        </div>
      </header>

      <section style={{ maxWidth: 980, margin: "0 auto", padding: "38px 18px" }}>
        <h2 style={{ color: T.ink, fontSize: 26, margin: "0 0 6px" }}>{t("pick_start")}</h2>
        <p style={{ color: T.body, marginTop: 0 }}>{t("anywhere_note")}</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: 16 }}>
          {courses.map((c) => (
            <PathCard key={c.id} c={c} onClick={() => go("course", c.id)}>
              <div style={{ fontSize: 30 }}>{c.emoji}</div>
              <h3 style={{ color: T.ink, margin: "8px 0 6px", fontSize: 18 }}>{c.name}</h3>
              <p style={{ color: T.body, fontSize: 14, lineHeight: 1.5, margin: "0 0 10px" }}>{c.blurb}</p>
              <span style={{ fontSize: 13, fontWeight: 700, color: c.color }}>{c.modules.filter((m) => m.ready).length} modules ready in demo →</span>
            </PathCard>
          ))}
        </div>
      </section>

      <section style={{ background: "#fff", borderTop: `1px solid ${T.line}`, padding: "38px 18px" }}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <h2 style={{ color: T.ink, fontSize: 26 }}>How every lesson works</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 16 }}>
            {[
              ["📖", "Read", "Short text with visuals that stick in your mind."],
              ["🧪", "Practice", "Watch a short video, listen to the lesson in a man's or woman's voice, then try it in a live playground."],
              ["✅", "Answer", "3–5 questions per module — correct answers saved to your profile."],
              ["🏅", "Achieve", "Streaks, daily goals, and a named certificate per course."],
            ].map(([e, t, d]) => (
              <div key={t} style={{ display: "flex", gap: 12 }}>
                <div style={{ fontSize: 26 }}>{e}</div>
                <div><strong style={{ color: T.ink }}>{t}</strong><p style={{ color: T.body, fontSize: 14, margin: "4px 0 0", lineHeight: 1.5 }}>{d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer style={{ background: T.ink, color: "#aab6dd", textAlign: "center", padding: "26px 16px", fontSize: 13 }}>
        <Star8 size={18} /><br />NextNTech.org — a non-profit. Free forever, for every curious mind.
      </footer>
    </div>
  );
}

function Courses({ go, completed, selectedId }) {
  const { t } = useT();
  return (
    <div style={{ maxWidth: 980, margin: "0 auto", padding: "34px 18px" }}>
      <h1 style={{ color: T.ink, fontSize: 30, margin: "0 0 4px" }}>{t("all_courses")}</h1>
      <p style={{ color: T.body, marginTop: 0 }}>🧭 {t("anywhere_note")}</p>
      <div style={{ display: "grid", gap: 14 }}>
        {courses.map((c) => {
          const done = c.modules.filter((m, i) => completed[c.id + "-" + i] !== undefined).length;
          return (
            <PathCard key={c.id} c={c} selected={selectedId === c.id} onClick={() => go("course", c.id)}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                <div style={{ fontSize: 32 }}>{c.emoji}</div>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <h3 style={{ color: T.ink, margin: 0 }}>{c.name}</h3>
                  <p style={{ color: T.body, fontSize: 14, margin: "4px 0 0" }}>{c.modules.map((m) => m.title).join(" · ")}</p>
                </div>
                <div style={{ textAlign: "center" }}>
                  {done > 0 && <div style={{ fontSize: 13, fontWeight: 800, color: T.green, marginBottom: 6 }}>{done} ✓</div>}
                  <Btn style={{ padding: "10px 16px", background: c.color, color: "#fff" }}>{t("start")}</Btn>
                </div>
              </div>
            </PathCard>
          );
        })}
      </div>
    </div>
  );
}

function CourseScreen({ courseId, go, completed }) {
  const { t } = useT();
  const c = courses.find((x) => x.id === courseId) || courses[0];
  return (
    <div style={{ maxWidth: 820, margin: "0 auto", padding: "34px 18px" }}>
      <button onClick={() => go("courses")} style={{ background: "none", border: "none", color: T.lapis, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", padding: 0, marginBottom: 12 }}>← {t("all_courses")}</button>
      <div style={{ borderInlineStart: `6px solid ${c.color}`, paddingInlineStart: 14 }}>
        <h1 style={{ color: T.ink, fontSize: 30, margin: "0 0 6px" }}>{c.emoji} {c.name}</h1>
        <p style={{ color: T.body, marginTop: 0 }}>{c.blurb} {t("anywhere_note")}</p>
      </div>
      <div style={{ display: "grid", gap: 12, marginTop: 20 }}>
        {c.modules.map((m, i) => {
          const score = completed[c.id + "-" + i];
          const done = score !== undefined;
          return (
            <Card key={m.title} style={{ borderInlineStart: `5px solid ${done ? c.color : T.line}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <Star8 size={26} color={done ? c.color : T.line} filled={done} />
                <div style={{ flex: 1 }}>
                  <strong style={{ color: T.ink }}>Module {i + 1}: {m.title}</strong>
                  <div style={{ fontSize: 13, color: T.body }}>
                    {done ? `Completed — ${score}/${m.lesson.quiz.length} ✓` : m.ready ? "Lesson + video + audio + practice + quiz" : t("coming")}
                  </div>
                </div>
                {m.ready ? (
                  <Btn onClick={() => go("lesson", c.id, i)} style={{ padding: "10px 16px", background: c.color, color: "#fff" }}>{done ? t("review") : t("start")}</Btn>
                ) : (
                  <span style={{ fontSize: 13, color: "#98a3c4", fontWeight: 700 }}>{t("coming")}</span>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function LessonScreen({ courseId, moduleIdx, go, onComplete }) {
  const { t, lang } = useT();
  const c = courses.find((x) => x.id === courseId);
  const m = c.modules[moduleIdx];
  const L = m.lesson;
  const bodyRef = React.useRef(null);
  const [answers, setAnswers] = useState({});
  const answered = Object.keys(answers).length;
  const correct = L.quiz.filter((q, i) => answers[i] === q.answer).length;
  const allDone = answered === L.quiz.length;
  const pg = L.playground;

  return (
    <div style={{ maxWidth: 780, margin: "0 auto", padding: "34px 18px" }}>
      <button onClick={() => go("course", courseId)} style={{ background: "none", border: "none", color: T.lapis, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", padding: 0, marginBottom: 12 }}>← {c.name}</button>
      <div style={{ fontSize: 13, fontWeight: 800, color: c.color, letterSpacing: 1 }}>MODULE {moduleIdx + 1} · {m.title.toUpperCase()}</div>
      <h1 style={{ color: T.ink, fontSize: 28, margin: "6px 0 14px" }}>{L.title}</h1>

      {lang !== "en" && (
        <div style={{ background: "#FFF8E8", border: `1px solid ${T.saffron}`, borderRadius: 10, padding: "10px 14px", fontSize: 13, color: T.body, marginBottom: 12 }}>
          ℹ️ {t("note")}
        </div>
      )}

      {/* Video + Audio bar */}
      <VideoAudioBar bodyRef={bodyRef} title={L.title} color={c.color} />

      <div ref={bodyRef}>
        <Card style={{ lineHeight: 1.7, color: T.body, fontSize: 16, borderTop: `5px solid ${c.color}` }}>
          <L.Body />
        </Card>
      </div>

      {pg && (
        <PlayShell title={pg.title} hint={pg.hint} color={c.color}>
          {pg.type === "html" && <HtmlPlayground starter={pg.starter} phone={pg.phone} />}
          {pg.type === "mini" && <MiniLang starter={pg.starter} keyword={pg.keyword} label={pg.label} />}
          {pg.type === "sql" && <SqlPlayground />}
          {pg.type === "api" && <ApiPlayground />}
          {pg.type === "hash" && <HashPlayground />}
        </PlayShell>
      )}

      <h2 style={{ color: T.ink, fontSize: 22, margin: "26px 0 4px" }}>
        {t("check")} <span style={{ fontSize: 15, color: T.body, fontWeight: 600 }}>({correct}/{L.quiz.length})</span>
      </h2>
      <p style={{ color: T.body, marginTop: 0, fontSize: 14 }}>{t("saved")}</p>
      {L.quiz.map((q, i) => (
        <Card key={i} style={{ marginBottom: 12 }}>
          <strong style={{ color: T.ink }}>{i + 1}. {q.q}</strong>
          <div style={{ display: "grid", gap: 8, marginTop: 10 }}>
            {q.options.map((opt, oi) => {
              const picked = answers[i] === oi;
              const isRight = oi === q.answer;
              let bg = "#fff", border = T.line;
              if (answers[i] !== undefined) {
                if (isRight) { bg = "#E7F7EC"; border = T.green; }
                else if (picked) { bg = "#FDECEC"; border = T.red; }
              }
              return (
                <button key={oi} disabled={answers[i] !== undefined} onClick={() => setAnswers({ ...answers, [i]: oi })}
                  style={{ textAlign: "left", fontFamily: "inherit", fontSize: 15, padding: "10px 14px", borderRadius: 10, border: `2px solid ${border}`, background: bg, color: T.ink, cursor: answers[i] === undefined ? "pointer" : "default" }}>
                  {opt}{answers[i] !== undefined && isRight && " ✓"}
                </button>
              );
            })}
          </div>
          {answers[i] !== undefined && <p style={{ fontSize: 14, color: T.body, margin: "10px 0 0", lineHeight: 1.5 }}>💡 {q.why}</p>}
        </Card>
      ))}

      {allDone && (
        <Card style={{ background: "#FFF8E8", borderColor: T.saffron, textAlign: "center" }}>
          <Star8 size={36} />
          <h3 style={{ color: T.ink, margin: "8px 0" }}>Module complete! You got {correct}/{L.quiz.length}.</h3>
          <p style={{ color: T.body, fontSize: 14, marginTop: 0 }}>Saved to your profile — it counts toward today's goal.</p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <Btn onClick={() => { onComplete(courseId, moduleIdx, correct); go("dashboard"); }}>See my progress →</Btn>
            {c.modules[moduleIdx + 1] && c.modules[moduleIdx + 1].ready && (
              <Btn kind="dark" onClick={() => { onComplete(courseId, moduleIdx, correct); go("lesson", courseId, moduleIdx + 1); }}>Next module →</Btn>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}

function Dashboard({ completed, go }) {
  const { t } = useT();
  const entries = Object.entries(completed);
  const modulesDone = entries.length;
  const correctTotal = entries.reduce((s, [, v]) => s + v, 0);
  const stat = (label, value, sub) => (
    <Card style={{ textAlign: "center" }}>
      <div style={{ fontSize: 30, fontWeight: 800, color: T.lapis }}>{value}</div>
      <div style={{ fontWeight: 700, color: T.ink }}>{label}</div>
      <div style={{ fontSize: 13, color: T.body }}>{sub}</div>
    </Card>
  );
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "34px 18px" }}>
      <h1 style={{ color: T.ink, fontSize: 30, margin: "0 0 4px" }}>{t("my_progress")}</h1>
      <p style={{ color: T.body, marginTop: 0 }}>Daily goal: <strong>1 module</strong> — {modulesDone > 0 ? "reached today! 🎉" : "not reached yet."}</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 14 }}>
        {stat("Day streak", modulesDone > 0 ? "🔥 4" : "🔥 3", "Learn daily to keep it")}
        {stat("Modules done", 6 + modulesDone, "Across all courses")}
        {stat("Questions correct", 21 + correctTotal, "Saved to your profile")}
        {stat("Certificates", 0, "Finish a course to earn one")}
      </div>

      <h2 style={{ color: T.ink, fontSize: 22, marginTop: 30 }}>Learning history</h2>
      <Card>
        {[
          ...entries.map(([k, v]) => {
            const [cid, mi] = k.split("-");
            const c = courses.find((x) => x.id === cid);
            return ["Today", c.emoji + " " + c.modules[+mi].lesson.title, `${v}/${c.modules[+mi].lesson.quiz.length} correct`];
          }),
          ["Yesterday", "🐍 Python Basics: Variables", "4/4 correct"],
          ["Monday", "🐍 print() and Input", "3/5 correct"],
          ["Sunday", "💼 What is Freelancing?", "5/5 correct"],
        ].map(([d, t, s], i) => (
          <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${T.line}` }}>
            <Star8 size={18} />
            <div style={{ flex: 1 }}>
              <strong style={{ color: T.ink, fontSize: 15 }}>{t}</strong>
              <div style={{ fontSize: 13, color: T.body }}>{d}</div>
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: T.green }}>{s}</span>
          </div>
        ))}
      </Card>

      <h2 style={{ color: T.ink, fontSize: 22, marginTop: 30 }}>Certificate preview</h2>
      <Card style={{ textAlign: "center", background: `linear-gradient(150deg, #fff, ${T.paper})`, border: `2px solid ${T.saffron}` }}>
        <Star8 size={40} />
        <div style={{ fontSize: 12, letterSpacing: 2, color: T.body, marginTop: 8 }}>KABULTECH.ORG · CERTIFICATE OF COMPLETION</div>
        <h3 style={{ color: T.ink, fontSize: 24, margin: "8px 0" }}>Front-End Development</h3>
        <p style={{ color: T.body, margin: 0 }}>Awarded to <strong>[Your Name]</strong> when all lessons are complete.</p>
        <p style={{ fontSize: 13, color: "#98a3c4", marginBottom: 0 }}>Your name and details come from your account automatically.</p>
      </Card>
      <div style={{ marginTop: 20, textAlign: "center" }}>
        <Btn kind="dark" onClick={() => go("courses")}>{t("keep")}</Btn>
      </div>
    </div>
  );
}

function Login({ onLogin }) {
  const social = (label, bg) => (
    <button key={label} onClick={() => onLogin("Zahra")} style={{ fontFamily: "inherit", fontWeight: 700, fontSize: 15, padding: "12px 16px", borderRadius: 12, border: "none", background: bg, color: "#fff", cursor: "pointer", width: "100%" }}>
      Continue with {label}
    </button>
  );
  return (
    <div style={{ maxWidth: 420, margin: "0 auto", padding: "44px 18px" }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <Star8 size={40} />
        <h1 style={{ color: T.ink, fontSize: 26, margin: "10px 0 4px" }}>Welcome to NextNTech</h1>
        <p style={{ color: T.body, marginTop: 0, fontSize: 15 }}>Create a free account to save your progress, streaks and certificates.</p>
      </div>
      <div style={{ display: "grid", gap: 10 }}>
        {social("Google / Gmail", "#4285F4")}
        {social("Facebook", "#1877F2")}
        {social("LinkedIn", "#0A66C2")}
        {social("Outlook / Hotmail", "#0F6CBD")}
      </div>
      <div style={{ textAlign: "center", color: "#98a3c4", fontSize: 13, margin: "14px 0" }}>— or —</div>
      <div style={{ display: "grid", gap: 10 }}>
        <input placeholder="Email address" style={{ fontFamily: "inherit", fontSize: 15, padding: "12px 14px", borderRadius: 12, border: `2px solid ${T.line}` }} />
        <input placeholder="Password" type="password" style={{ fontFamily: "inherit", fontSize: 15, padding: "12px 14px", borderRadius: 12, border: `2px solid ${T.line}` }} />
        <Btn onClick={() => onLogin("Zahra")}>Create free account</Btn>
      </div>
      <p style={{ fontSize: 12, color: "#98a3c4", textAlign: "center" }}>Demo only — any button signs you in as "Zahra".</p>
    </div>
  );
}

function About({ openShare }) {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 18px", color: T.body, lineHeight: 1.7, fontSize: 16 }}>
      <h1 style={{ color: T.ink, fontSize: 30 }}>About NextNTech.org</h1>
      <P><B>Our goal is simple: kids deserve to become technology geeks.</B> No payment, no paid subscription, and no paywall should ever stop a young person from learning to build the future.</P>
      <P>NextNTech.org is a non-profit learning platform. Every course — from your first HTML tag to full-stack development, Python, mobile apps and your first freelance job — is free, forever.</P>
      <P>We teach with <B>simple text, memorable visuals, hands-on practice, and short quizzes</B>. Your progress, streaks, correct answers and certificates are saved to your free account.</P>
      <Card style={{ textAlign: "center", background: "#FFF8E8", borderColor: T.saffron }}>
        <h3 style={{ color: T.ink, marginTop: 0 }}>Know a curious kid?</h3>
        <Btn onClick={openShare}>Share NextNTech.org</Btn>
      </Card>
    </div>
  );
}

function ShareModal({ close }) {
  const [copied, setCopied] = useState(null);
  const nets = [["X", "#000000"], ["LinkedIn", "#0A66C2"], ["Facebook", "#1877F2"], ["Instagram", "#C13584"]];
  return (
    <div onClick={close} style={{ position: "fixed", inset: 0, background: "rgba(14,34,88,.55)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, padding: 16 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: 18, padding: 24, maxWidth: 480, width: "100%", maxHeight: "85vh", overflowY: "auto" }}>
        <h3 style={{ color: T.ink, margin: "0 0 4px" }}>Invite others to NextNTech.org</h3>
        <p style={{ color: T.body, fontSize: 14, marginTop: 0 }}>Each network gets its own customized message with a link to the registration page.</p>
        <div style={{ display: "grid", gap: 8 }}>
          {nets.map(([n, c]) => (
            <div key={n}>
              <button onClick={() => setCopied(copied === n ? null : n)} style={{ width: "100%", fontFamily: "inherit", fontWeight: 700, fontSize: 15, padding: "11px 14px", borderRadius: 10, border: "none", background: c, color: "#fff", cursor: "pointer" }}>
                Share on {n}
              </button>
              {copied === n && <div style={{ background: T.paper, border: `1px solid ${T.line}`, borderRadius: 10, padding: 12, fontSize: 13, color: T.body, marginTop: 6, lineHeight: 1.5 }}>{shareTexts[n]}</div>}
            </div>
          ))}
        </div>
        <div style={{ textAlign: "right", marginTop: 14 }}>
          <Btn kind="ghost" style={{ padding: "8px 16px" }} onClick={close}>Close</Btn>
        </div>
      </div>
    </div>
  );
}

/* ================= App shell ================= */
export default function App() {
  const [page, setPage] = useState("home");
  const [courseId, setCourseId] = useState(null);
  const [moduleIdx, setModuleIdx] = useState(0);
  const [user, setUser] = useState(null);
  const [share, setShare] = useState(false);
  const [lang, setLang] = useState("en");
  const [completed, setCompleted] = useState({}); // {"backend-1": 3, ...}

  const go = (p, cid, mi) => {
    if (cid) setCourseId(cid);
    if (mi !== undefined) setModuleIdx(mi);
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setPage(p);
    window.scrollTo(0, 0);
  };

  const dir = lang === "en" ? "ltr" : "rtl";
  const ctx = { lang, dir, t: (k) => (STR[lang] && STR[lang][k]) || STR.en[k] || k };

  return (
    <LangCtx.Provider value={ctx}>
      <div dir={dir} style={{ fontFamily: lang === "en" ? "'Nunito Sans', 'Segoe UI', system-ui, sans-serif" : "'Segoe UI', Tahoma, 'Noto Naskh Arabic', system-ui, sans-serif", background: T.paper, minHeight: "100vh" }}>
        <Nav go={go} page={page} user={user} lang={lang} setLang={setLang} />
        {page === "home" && <Home go={go} openShare={() => setShare(true)} />}
        {page === "courses" && <Courses go={go} completed={completed} selectedId={courseId} />}
        {page === "course" && <CourseScreen courseId={courseId || "frontend"} go={go} completed={completed} />}
        {page === "lesson" && (
          <LessonScreen key={courseId + moduleIdx + lang} courseId={courseId || "frontend"} moduleIdx={moduleIdx} go={go}
            onComplete={(cid, mi, score) => setCompleted((prev) => ({ ...prev, [cid + "-" + mi]: score }))} />
        )}
        {page === "dashboard" && <Dashboard completed={completed} go={go} />}
        {page === "login" && <Login onLogin={(u) => { setUser(u); go("dashboard"); }} />}
        {page === "about" && <About openShare={() => setShare(true)} />}
        {share && <ShareModal close={() => setShare(false)} />}
      </div>
    </LangCtx.Provider>
  );
}
