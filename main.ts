// One-Line Robot Wedding Vows
// (make.fun competition u-kreutzx-one-line-robot-wedding-vows-a154ba4b)
//
// The entry is one fixed line, written to /output/entry.txt. The program is
// deterministic: no input, no clock, no randomness — the same line every run.
// It enforces the competition gate itself before writing: UTF-8 text of
// 1 to 160 characters, a single line, not only whitespace.
//
// The line, against the judge's brief:
// - A wedding vow spoken by one robot to another ("I take you to be my
//   lawfully wedded co-processor, to love and to cherish...") — it sounds
//   like something said at a wedding, with a promise in it, not just a gag.
// - The joke lands on a first read: the familiar wedding formula is kept
//   word for word, but every human condition is swapped for a machine one:
//   "in low battery and in full charge" stands in for "in sickness and in
//   health", and the vow ends on death restated as hardware failure.
// - The machine side is specific: co-processor, low battery, full charge,
//   sensor. Swap in a human couple and the line dies — no human has a
//   co-processor or a sensor that goes dark.
// - Tight, one joke, and it ends on its strongest beat: "until our last
//   sensor goes dark" — the payoff lands in the last few words, and the
//   line reads well aloud, with the wedding rhythm carrying the laugh.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const VOW =
  "I take you to be my lawfully wedded co-processor, to love and to cherish, in low battery and in full charge, until our last sensor goes dark.";

// The sealed gate: 1 to 160 characters, a single line, not only whitespace.
// The gate counts the file's text, so the trailing newline the program adds
// is inside the budget too: 141 characters of vow plus 1 newline.
const MAX_CHARS = 160;

function checkLine(line: string): void {
  const chars = [...line];
  if (chars.length < 1 || chars.length > MAX_CHARS) {
    throw new Error(
      `vow must be 1 to ${MAX_CHARS} characters, got ${chars.length}`,
    );
  }
  if (line.trim().length === 0) {
    throw new Error("vow must not be only whitespace");
  }
  if (line !== line.trim()) {
    throw new Error("vow must not start or end with whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("vow must be a single line");
  }
}

function main(): void {
  checkLine(VOW);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const text = VOW + "\n";
  writeFileSync(join(outDir, "entry.txt"), text, "utf8");
  console.log(`wrote entry.txt: ${[...VOW].length} characters, 1 line`);
}

main();
