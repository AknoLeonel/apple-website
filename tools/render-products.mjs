// Gera as fotos dos produtos (public/assets/products/<id>.webp) a partir do modelo 3D.
// Uso: npm run render:products
// Requer Playwright + Chromium e ImageMagick (`convert`) instalados na máquina.
import { createServer } from 'vite';
import { execFileSync } from 'node:child_process';
import { mkdirSync, rmSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { products } from '../src/data/catalog.js';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');

const outDir = 'public/assets/products';
const tmp = join(tmpdir(), 'ps-render');
mkdirSync(outDir, { recursive: true });
mkdirSync(tmp, { recursive: true });

const server = await createServer({ server: { port: 5199, strictPort: true }, logLevel: 'error' });
await server.listen();

const browser = await chromium.launch({
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
});
const page = await browser.newPage({ viewport: { width: 520, height: 760 } });

for (const p of products) {
  const qs = new URLSearchParams({
    design: p.design,
    color: p.body.replace('#', ''),
    ry: String(p.design === 'plateau' ? 0.5 : 0.42),
    rx: '-0.08',
    rz: '0.03',
    z: '2.75',
    dpr: '2',
  });
  await page.goto(`http://localhost:5199/tools/render.html?${qs}`);
  await page.waitForFunction(() => window.__ready, null, { timeout: 60000 });
  const png = join(tmp, `${p.id}.png`);
  await page.screenshot({ path: png, omitBackground: true });
  execFileSync('convert', [png, '-trim', '+repage', '-resize', 'x720', '-quality', '82', '-define', 'webp:alpha-quality=90', join(outDir, `${p.id}.webp`)]);
  console.log('✓', p.id);
}

await browser.close();
await server.close();
rmSync(tmp, { recursive: true, force: true });
