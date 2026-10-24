import { cp, mkdir, readdir, rm, writeFile, access } from 'node:fs/promises';
import path from 'node:path';
let source = path.resolve('source-content');
try { await access(path.join(source, 'index.html')); }
catch { source = path.resolve('../dist'); }
await access(path.join(source, 'index.html'));
await rm('private-content', { recursive: true, force: true });
await cp(source, 'private-content', { recursive: true });
const files = [];
async function walk(dir, relative = '') {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const name = path.posix.join(relative, entry.name);
    if (entry.isDirectory()) await walk(path.join(dir, entry.name), name);
    else if (entry.isFile() && !entry.name.startsWith('.')) files.push(name);
  }
}
await walk('private-content');
await writeFile('private-content/_allowlist.json', JSON.stringify(files));
await rm('public', { recursive: true, force: true });
await mkdir('public');
await writeFile('public/.keep', '');
console.log(`Preparados ${files.length} arquivos privados. Nenhum conteúdo no diretório público.`);
