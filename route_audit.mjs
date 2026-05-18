import fs from 'fs';

async function audit() {
  const routes = new Set();
  try {
    const allPages = fs.readFileSync('all_pages.txt', 'utf8');
    allPages.split('\n').map(l => l.trim()).filter(Boolean).forEach(line => {
      let p = line;
      if (p.includes('apps/website/src/app')) {
          p = p.split('apps/website/src/app')[1];
          if (p.endsWith('/page.tsx')) p = p.replace('/page.tsx', '');
          if (p.endsWith('/page.js')) p = p.replace('/page.js', '');
          if (p.includes('.') || p.includes(':') || p.includes('__tests__') || p.endsWith('/route.ts')) return;
          if (p === '') p = '/';
      } else return;
      if (p && !p.includes('[') && !p.includes(']')) routes.add(p);
    });
  } catch (e) { console.error('Error reading all_pages.txt:', e.message); }

  try {
    const faqData = fs.readFileSync('apps/website/src/lib/data/faq-data.ts', 'utf8');
    [...faqData.matchAll(/id:\s*["']([^"']+)["']/g)].forEach(m => routes.add(`/faq/${m[1]}`));
  } catch (e) {}

  try {
    const serviceData = fs.readFileSync('apps/website/src/lib/data/service-routes.ts', 'utf8');
    [...serviceData.matchAll(/slug:\s*["']([^"']+)["']/g)].forEach(m => routes.add(`/services/${m[1]}`));
  } catch (e) {}

  try {
    const projectData = fs.readFileSync('apps/website/src/lib/data/project-case-studies.ts', 'utf8');
    [...projectData.matchAll(/slug:\s*["']([^"']+)["']/g)].forEach(m => routes.add(`/projects/${m[1]}`));
  } catch (e) {}

  try {
    const locationsData = fs.readFileSync('apps/website/src/lib/data/locations.ts', 'utf8');
    const match = locationsData.match(/export const locations: Record<[^>]+> = ({[\s\S]+?});/);
    if (match) {
        [...match[1].matchAll(/^\s{2}['"]?([\w-]+)['"]?:/gm)].forEach(m => routes.add(`/locations/${m[1]}`));
    }
  } catch (e) {}

  try {
    const safetyClusters = fs.readFileSync('apps/website/src/lib/data/safety-manual-clusters.ts', 'utf8');
    [...safetyClusters.matchAll(/slug:\s*["']([^"']+)["']/g)].forEach(m => routes.add(`/resources/safety-manual/${m[1]}`));
  } catch (e) {}

  try {
    const safetySections = JSON.parse(fs.readFileSync('documents/content/safety-manual-public.json', 'utf8'));
    safetySections.sections.forEach(s => routes.add(`/resources/safety-manual/section/${s.slug}`));
  } catch (e) {}

  routes.add('/safety/print/test-id');

  const routeList = Array.from(routes).sort();
  const results = { total: routeList.length, failures: [], runtimeErrors: [] };

  for (const route of routeList) {
    try {
      const res = await fetch(`http://127.0.0.1:3000${route}`);
      const text = await res.text();
      if (res.status >= 400) results.failures.push(`${route} (${res.status})`);
      else {
        const errors = ["Application error", "Unhandled Runtime Error", "Internal Server Error", "ReferenceError:", "TypeError:"];
        for (const err of errors) {
          if (text.includes(err)) {
            results.runtimeErrors.push(`${route} (Contains: "${err}")`);
            break;
          }
        }
      }
    } catch (e) { results.failures.push(`${route} (Error: ${e.message})`); }
  }

  console.log('--- AUDIT SUMMARY ---');
  console.log(`Total checked: ${results.total}`);
  console.log(`Failures (${results.failures.length}):`, results.failures);
  console.log(`Runtime Signatures (${results.runtimeErrors.length}):`, results.runtimeErrors);
  console.log(`Top 20 Samples:`, routeList.slice(0, 20));
}
audit();
