export type Row = Record<string, string | number | null>;

/** The demo's students table — also pre-loaded into the SQL playground (Phase 2). */
export const STUDENTS: Row[] = [
  { name: "Zahra", age: 14, country: "Afghanistan" },
  { name: "Omar", age: 16, country: "USA" },
  { name: "Lina", age: 12, country: "Germany" },
  { name: "Sam", age: 15, country: "UK" },
];

export function TableVisual({
  rows = STUDENTS,
  cols = ["name", "age", "country"],
}: {
  rows?: Row[];
  cols?: string[];
}) {
  return (
    <div className="my-3.5 overflow-x-auto" dir="ltr">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            {cols.map((c) => (
              <th key={c} scope="col" className="border border-line bg-lapis px-3 py-2 text-start text-white">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={i % 2 ? "bg-paper" : "bg-white"}>
              {cols.map((c) => (
                <td key={c} className="border border-line px-3 py-2 text-body">
                  {String(r[c] ?? "NULL")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
