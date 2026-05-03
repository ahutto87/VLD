#!/usr/bin/env node
/**
 * Generates print-quality QR codes for the newsletter signup landing page.
 * Each QR points to /subscribe with a utm_source so signups can be attributed
 * to the specific event/campaign.
 *
 * Usage:
 *   node scripts/generate-qr.mjs                    # generates default set
 *   node scripts/generate-qr.mjs <slug> <utm_source> [label]
 */

import QRCode from 'qrcode';
import { writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const outDir = join(projectRoot, 'public', 'qr');

const BASE_URL = 'https://www.violadoula.com/subscribe';
const BRAND_DARK = '#D17D44';   // terracotta
const BRAND_LIGHT = '#FAF3E3';  // cream

// ~2000px @ 300 DPI ≈ 6.6in print width — good for flyers, postcards, table cards
const PRINT_OPTIONS = {
  errorCorrectionLevel: 'H',
  margin: 2,
  width: 2000,
  color: {
    dark: BRAND_DARK,
    light: BRAND_LIGHT,
  },
};

const DEFAULT_CAMPAIGNS = [
  { slug: 'fair', utm: 'birthworker_fair', label: 'Birthworker Fair' },
  { slug: 'event', utm: 'event', label: 'Event / Gathering' },
  { slug: 'card', utm: 'business_card', label: 'Business Card' },
];

function buildUrl(utmSource) {
  const url = new URL(BASE_URL);
  url.searchParams.set('utm_source', utmSource);
  url.searchParams.set('utm_medium', 'qr');
  return url.toString();
}

async function generate({ slug, utm, label }) {
  const url = buildUrl(utm);
  const filename = `vio-newsletter-${slug}.png`;
  const outPath = join(outDir, filename);
  await QRCode.toFile(outPath, url, PRINT_OPTIONS);
  console.log(`✓ ${label.padEnd(22)} → public/qr/${filename}`);
  console.log(`  ${url}`);
}

async function main() {
  await mkdir(outDir, { recursive: true });

  const [, , slug, utm, label] = process.argv;
  if (slug && utm) {
    await generate({ slug, utm, label: label || slug });
    return;
  }

  console.log(`Generating QR codes (${PRINT_OPTIONS.width}px, brand colors)…\n`);
  for (const campaign of DEFAULT_CAMPAIGNS) {
    await generate(campaign);
  }
  console.log(`\nAll QR codes saved to public/qr/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
