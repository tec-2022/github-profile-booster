import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const docsDir = path.join(root, 'docs');
const required = [
  'index.html',
  'career-map.html',
  'optimizer.html',
  'compare-goals.html',
  'audit.html',
  'generator.html',
  'showcase.html'
];

const errors = [];

for (const file of required) {
  const full = path.join(docsDir, file);
  if (!fs.existsSync(full)) {
    errors.push(`Missing required page: docs/${file}`);
    continue;
  }

  const html = fs.readFileSync(full, 'utf8');
  if (!/^<!doctype html>/i.test(html.trim())) errors.push(`Missing doctype: docs/${file}`);
  if (!/<meta\s+name=["']viewport["']/i.test(html)) errors.push(`Missing viewport meta: docs/${file}`);
  if (!/<title>[^<]+<\/title>/i.test(html)) errors.push(`Missing title: docs/${file}`);

  const scripts = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)].map(m => m[1]);
  for (const [index, script] of scripts.entries()) {
    try {
      new Function(script);
    } catch (error) {
      errors.push(`JavaScript syntax error in docs/${file} script #${index + 1}: ${error.message}`);
    }
  }

  const hrefs = [...html.matchAll(/href=["']([^"']+)["']/gi)].map(m => m[1]);
  for (const href of hrefs) {
    if (!href.startsWith('./') || href.includes('?') || href.includes('#')) continue;
    const target = path.resolve(path.dirname(full), href);
    const candidates = [target, path.join(target, 'index.html')];
    if (!candidates.some(fs.existsSync)) errors.push(`Broken relative link in docs/${file}: ${href}`);
  }
}

const readme = fs.readFileSync(path.join(root, 'README.md'), 'utf8');
for (const expected of ['career-map.html', 'optimizer.html', 'compare-goals.html', 'audit.html', 'generator.html', 'showcase.html']) {
  if (!readme.includes(expected)) errors.push(`README does not reference ${expected}`);
}

const compare = fs.readFileSync(path.join(docsDir, 'compare-goals.html'), 'utf8');
for (const expected of ['Copy share URL', 'Download comparison card', 'goalA', 'goalB']) {
  if (!compare.includes(expected)) errors.push(`Comparison page missing expected feature: ${expected}`);
}

for (const file of ['career-map.html', 'optimizer.html', 'compare-goals.html']) {
  const html = fs.readFileSync(path.join(docsDir, file), 'utf8');
  if (!html.includes('URLSearchParams') && !html.includes('searchParams')) errors.push(`${file} should support URL-based results.`);
}

if (errors.length) {
  console.error('\nStatic validation failed:\n');
  errors.forEach(error => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Static validation passed for ${required.length} pages, including shareable comparison features.`);
