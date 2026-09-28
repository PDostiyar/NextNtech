import { useId } from "react";

/** Browser ⇄ server request/response diagram. */
export function ClientServer({ label = "GET /jokes" }: { label?: string }) {
  // Unique marker ids so two diagrams on one page don't collide.
  const id = useId().replace(/:/g, "");
  const req = `req-${id}`;
  const res = `res-${id}`;
  return (
    <svg
      viewBox="0 0 460 170"
      className="mx-auto my-3.5 block w-full max-w-[460px]"
      role="img"
      aria-label={`The browser (front end) sends a request, ${label}, to the server (back end). The server sends back a response with data as JSON.`}
      direction="ltr"
    >
      <defs>
        <marker id={req} markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 z" fill="#16337F" />
        </marker>
        <marker id={res} markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 z" fill="#2E933C" />
        </marker>
      </defs>
      <rect x="15" y="45" width="130" height="90" rx="12" fill="#E4F7F5" stroke="#2EC4B6" strokeWidth="2" />
      <text x="80" y="82" textAnchor="middle" fontSize="30">
        💻
      </text>
      <text x="80" y="115" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0E2258">
        Browser
      </text>
      <text x="80" y="130" textAnchor="middle" fontSize="11" fill="#3A4666">
        (front end)
      </text>
      <rect x="315" y="45" width="130" height="90" rx="12" fill="#FFF4DC" stroke="#F5A524" strokeWidth="2" />
      <text x="380" y="82" textAnchor="middle" fontSize="30">
        🖥️
      </text>
      <text x="380" y="115" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0E2258">
        Server
      </text>
      <text x="380" y="130" textAnchor="middle" fontSize="11" fill="#3A4666">
        (back end)
      </text>
      <line x1="150" y1="70" x2="308" y2="70" stroke="#16337F" strokeWidth="2.5" markerEnd={`url(#${req})`} />
      <text x="230" y="60" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#16337F">
        request: {label}
      </text>
      <line
        x1="308"
        y1="110"
        x2="150"
        y2="110"
        stroke="#2E933C"
        strokeWidth="2.5"
        markerEnd={`url(#${res})`}
      />
      <text x="230" y="132" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#2E933C">
        response: data (JSON)
      </text>
    </svg>
  );
}
