import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const ENTRY = "Earth → 'Subscription Planet' — free trial expired, oxygen and water now behind paywall";

function ensureDir(dir: string): void {
  mkdirSync(dir, { recursive: true });
}

function writeEntryFile(outputDir: string): string {
  const outputPath = join(outputDir, 'entry.txt');
  writeFileSync(outputPath, ENTRY, 'utf8');
  return outputPath;
}

function verifyAndReport(outputPath: string): void {
  const written = readFileSync(outputPath, 'utf8');
  if (written !== ENTRY) {
    throw new Error('Entry verification failed: content mismatch');
  }
  console.error(`Character count: ${ENTRY.length}`);
}

function run(outputDir: string): void {
  ensureDir(outputDir);
  const outputPath = writeEntryFile(outputDir);
  verifyAndReport(outputPath);
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';
run(outputDir);