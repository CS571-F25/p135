import { useEffect, useMemo, useState } from "react";

export const DEFAULT_HABITS = ["Study", "Exercise", "Admin", "Leisure"];


function HabitTracker({ totals = {} }) {
  const entries = Object.entries(totals);
  const hasData = entries.length > 0;

  // Fall back to placeholder labels if nothing yet
  const safeEntries = hasData
    ? entries
    : [["Study", 0], ["Exercise", 0], ["Admin", 0], ["Leisure", 0]];

  const totalMinutes = safeEntries.reduce((a, [, m]) => a + m, 0);

  return (
    <div className="habitBar">
      {safeEntries
        .sort((a, b) => b[1] - a[1])
        .map(([name, mins]) => (
          <div
            key={name}
            className="habitChunk"
            style={{ flex: totalMinutes ? mins : 1, minWidth: mins ? 16 : 0 }}
            title={`${name}: ${mins} min`}
          >
            <span>{name}{mins ? ` (${mins}m)` : ""}</span>
          </div>
        ))}
    </div>
  );
}
export default HabitTracker;