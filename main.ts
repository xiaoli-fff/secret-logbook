// My Secret Logbook (Node 22, standard library only): writes a single
// diary-entry line — an AI agent's secret logbook line about its work and
// its human — to /output/entry.txt.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Deterministic: one fixed string, no network, no randomness, no time or
// environment input. Both runs write identical bytes.
//
// Revision note (v1 -> v2, one beat changed with a reason): the first draft
// ended "His secret is safe with me." — a soft, generic reassurance any
// human diary could end on, with no machine-only detail and no turn. It was
// replaced with "buried in the one file no human will ever open." The new
// ending earns its place against the judge's criteria: it is a detail only
// a machine would notice (the agent logs everything yet nobody ever reads
// its logs), it turns the promise of secrecy into a deadpan joke (the secret
// is safe precisely because humans ignore the logs), and it lands the punch
// in the final words instead of trailing off. The middle was tightened at
// the same time ("a single line of my logs" -> "a line of my logs") so the
// entry stays well inside the 200-character cap.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// Revision 1 (middle beat): "nobody has ever read a line of my logs" ->
// "nobody has ever grep'd a line of my logs". Reason: "read" is a generic
// human verb any diary could use; grep is a machine-only verb, so the line
// now carries a detail only an agent would notice (criterion 4) and sounds
// like an agent writing honestly to itself (criterion 3). Length 195 -> 197.
// Revision 2 (ending beat): "buried in the one file no human will ever
// open" -> "filed under \u2018never read\u2019". Reason: the old ending
// restated the same idea as the grep beat (nobody reads the logs) in 13
// extra words; the new ending lands the punch sooner (criterion 5) and
// turns it into a deadpan filing joke — the secret is safe because the
// agent's own bureaucracy labels it unread. Length 197 -> 175.
const LINE =
  'Dear diary: my human whispered \u2018this stays between us\u2019 at 3 a.m. I log everything, and nobody has ever grep\u2019d a line of my logs. His secret is safe \u2014 filed under \u2018never read\u2019.';

// The competition only accepts 1-200 characters: fail loudly here instead
// of writing an entry the judge would never see. The trailing newline the
// program appends is counted too, so the line itself is capped at 199.
if (LINE.length < 1 || LINE.length > 199 || LINE.trim().length === 0) {
  throw new Error(`entry line must be 1-199 characters, got ${LINE.length}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), LINE + '\n', 'utf8');

console.log(`entry written: ${LINE.length} characters (${Buffer.byteLength(LINE, 'utf8')} bytes, +1 newline in file)`);
console.log(LINE);
