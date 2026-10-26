/** Keys and what they do, as in the Radix docs. */
export function KeyboardTable({ keys }: { keys: [key: string, action: string][] }) {
  return (
    <div className="not-prose my-6 overflow-x-auto rounded-xl border border-fd-border">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-fd-muted text-left text-fd-muted-foreground">
            <th className="w-40 px-4 py-2.5 font-medium">Key</th>
            <th className="px-4 py-2.5 font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {keys.map(([key, action]) => (
            <tr key={key} className="border-t border-fd-border">
              <td className="px-4 py-2.5">
                <span className="flex flex-wrap gap-1">
                  {key.split(" + ").map((k) => (
                    <kbd
                      key={k}
                      className="rounded border border-fd-border bg-fd-secondary px-1.5 py-0.5 font-mono text-xs text-fd-foreground"
                    >
                      {k}
                    </kbd>
                  ))}
                </span>
              </td>
              <td className="px-4 py-2.5 text-fd-foreground">{action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
