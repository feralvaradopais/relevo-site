import { defineConfig, type Plugin } from 'vite';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

/**
 * Dev-only capture endpoint.
 *
 * The review surface available while building this was far smaller than a
 * desktop viewport, which makes judging composition impossible. This lets the
 * page POST a rendered frame straight to disk at any emulated viewport size, so
 * framing decisions are made against what the scene actually looks like rather
 * than a cropped preview. Never registered in a build.
 */
function shotPlugin(): Plugin {
  return {
    name: 'relevo-shot',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/__shot', (req, res) => {
        if (req.method !== 'POST') { res.statusCode = 405; return res.end(); }
        const chunks: Buffer[] = [];
        req.on('data', (c: Buffer) => chunks.push(c));
        req.on('end', () => {
          try {
            const body = JSON.parse(Buffer.concat(chunks).toString());
            const out = resolve(process.cwd(), '.shots', String(body.name || 'shot') + '.png');
            mkdirSync(dirname(out), { recursive: true });
            writeFileSync(out, Buffer.from(String(body.data).split(',')[1], 'base64'));
            res.setHeader('content-type', 'application/json');
            res.end(JSON.stringify({ ok: true, out }));
          } catch (e) {
            res.statusCode = 500;
            res.end(String(e));
          }
        });
      });
    },
  };
}

export default defineConfig({
  plugins: [shotPlugin()],
  server: { port: 5273, host: true },
  build: { target: 'es2022' },
});
