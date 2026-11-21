// Conferência antes da publicação e painel de status por matéria.
// Somente leitura: lê source-content/study-knowledge.json e imprime o resultado.
// Uso: node scripts/check-cobertura.mjs [caminho-do-json]
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';

// targetId só é exigido onde o build usa o vínculo com o sumário (Direito Administrativo).
const REQUIRED = ['id','subject','title','status','version','blocks'];
const NEEDS_TARGET = new Set(['Direito Administrativo']);
const MAX_BLOCKS = 100;

function flattenBlocks(blocks = []) {
  return blocks.flatMap(b => [b, ...flattenBlocks(b.blocks || [])]);
}

function blockText(b) {
  return [b.text, ...(b.rows || []).flat()].filter(Boolean).join(' ');
}

export function checkCobertura(data) {
  const records = data.records || [];
  const issues = [];
  const seenIds = new Map();
  const subjects = new Map();

  for (const r of records) {
    const required = NEEDS_TARGET.has(r.subject) ? [...REQUIRED, 'targetId', 'targetTitle'] : REQUIRED;
    const missing = required.filter(k => r[k] === undefined || r[k] === '');
    if (missing.length) issues.push({id: r.id, level: 'erro', msg: `campos ausentes: ${missing.join(', ')}`});

    if (seenIds.has(r.id)) issues.push({id: r.id, level: 'erro', msg: 'id duplicado'});
    seenIds.set(r.id, true);

    const all = flattenBlocks(r.blocks || []);
    if (all.length > MAX_BLOCKS) issues.push({id: r.id, level: 'erro', msg: `${all.length} blocos (limite ${MAX_BLOCKS})`});
    if (!all.length) issues.push({id: r.id, level: 'erro', msg: 'sem blocos'});

    const pendentes = all.filter(b => /⚠/.test(blockText(b))).length;
    if (pendentes) issues.push({id: r.id, level: 'aviso', msg: `${pendentes} bloco(s) com ⚠ pendente de conferência`});

    if (r.status === 'approved' && !(r.flashcards || []).length) {
      issues.push({id: r.id, level: 'aviso', msg: 'aprovado sem flashcards'});
    }

    const s = subjects.get(r.subject) || {subject: r.subject, approved: 0, draft: 0, other: 0, blocks: 0, pendentes: 0};
    if (r.status === 'approved') s.approved++;
    else if (r.status === 'draft') s.draft++;
    else s.other++;
    s.blocks += all.length;
    s.pendentes += pendentes;
    subjects.set(r.subject, s);
  }

  const panel = [...subjects.values()].sort((a, b) => a.subject.localeCompare(b.subject));
  const erros = issues.filter(i => i.level === 'erro').length;
  return {
    total: records.length,
    erros,
    avisos: issues.length - erros,
    panel,
    issues,
    pronto_para_publicar: erros === 0,
  };
}

async function main() {
  const path = process.argv[2] || fileURLToPath(new URL('../source-content/study-knowledge.json', import.meta.url));
  const data = JSON.parse(await readFile(path, 'utf8'));
  const result = checkCobertura(data);
  console.log(`Registros: ${result.total} · erros: ${result.erros} · avisos: ${result.avisos}`);
  console.log('\nMatéria | aprovados | rascunhos | outros | blocos | ⚠ pendentes');
  for (const s of result.panel) {
    console.log(`${s.subject} | ${s.approved} | ${s.draft} | ${s.other} | ${s.blocks} | ${s.pendentes}`);
  }
  const errs = result.issues.filter(i => i.level === 'erro');
  if (errs.length) {
    console.log('\nErros:');
    for (const i of errs) console.log(`- ${i.id}: ${i.msg}`);
  }
  const avisos = result.issues.filter(i => i.level === 'aviso');
  const porTipo = new Map();
  for (const a of avisos) {
    const tipo = a.msg.replace(/^\d+ bloco\(s\)/, 'N bloco(s)');
    porTipo.set(tipo, (porTipo.get(tipo) || 0) + 1);
  }
  if (porTipo.size) {
    console.log('\nAvisos (contagem por tipo):');
    for (const [tipo, n] of porTipo) console.log(`- ${tipo}: ${n}`);
  }
  console.log(`\nPronto para publicar: ${result.pronto_para_publicar ? 'sim' : 'não'}`);
  process.exitCode = result.erros ? 1 : 0;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) main();
