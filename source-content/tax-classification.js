export const TAX_CATEGORIES=[
 ['ipva','IPVA'],['itcmd','ITCMD'],['itbi','ITBI'],['issqn','ISSQN — LC 116/2003'],['lei236','REFORMA — LEI 236'],['comparativo','COMPARATIVO TRIBUTÁRIO'],['lc227','LC 227/2026: TEXTO LEGAL'],['rmit','RMIT — REFORMA TRIBUTÁRIA'],['novidades','NOVIDADES EXCLUSIVAS DA REFORMA TRIBUTÁRIA'],['normativo','DIREITO TRIBUTÁRIO NORMATIVO']
].map(([id,title])=>({id,title}));
export const taxNormalize=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const known={
 '1KtY3TxIgzzeA9rvOcdSo_e9Ihc_HtVIQ':'comparativo','1eYzifEBrfjOLXud5M1bPjr87NmdPkY2K':'comparativo',
 '1xVJ_RhniJjKIGszflLKHTWvgOQTi_coZXoBpXyq5IR8':'lei236',
 'ctn-responsabilidade-124-131-134-135':'normativo','ctn-competencia-residual-extraordinaria-154':'normativo','ctn-legislacao-normas-complementares-96-100':'normativo','comparativo-emprestimo-compulsorio-ieg':'normativo','ctn-artigos-109-110-direito-privado':'normativo',
 '1Grt-Ba-uF1lCPzUuMDo5cXNB9a3kE2hG':'normativo','1IXcH5u6R_sf0t0YuMsztkvpj2svxae_0':'normativo','10qTocHojY7EqwYLj0dQZ17LhIaFtpkce':'normativo','1qiVA3zEg7Vn13SvdE8pntJdF7WvsIKTT':'normativo'
};
export function classificationFor(record,overrides={}){
 const override=Object.hasOwn(overrides,record.id)?overrides[record.id]:null;
 if(override&&TAX_CATEGORIES.some(c=>c.id===override.categoryId))return {...override,review:false,manual:true};
 const text=taxNormalize(record.title),mapped=known[record.id];let categoryId=mapped||null;
 if(!categoryId){for(const [pattern,id] of [[/\bipva\b/,'ipva'],[/\bitcmd\b/,'itcmd'],[/\bitbi\b/,'itbi'],[/\bissqn\b/,'issqn'],[/\b236\b/,'lei236'],[/comparativo tributario|apostila comparativa/,'comparativo'],[/\b227\b|processo administrativo do ibs/,'lc227'],[/\brmit\b|regra.matriz/,'rmit'],[/imposto seletivo|comite gestor/,'novidades']])if(pattern.test(text)){categoryId=id;break;}
  if(!categoryId&&!/^(ibs e cbs|ec 132.*|direitos e garantias.*|reforma|lte|legislacao estadual do ceara)$/.test(text))categoryId='normativo';
 }
 const mixed=categoryId==='comparativo';return {categoryId,tags:mixed?['CTN','novidades da Reforma']:[],review:!categoryId||mixed||categoryId==='lei236',manual:false};
}

// Reviewed section titles in the existing comparative booklet, not duplicated content.
const booklet='1KtY3TxIgzzeA9rvOcdSo_e9Ihc_HtVIQ';
export const TAX_SECTION_REFERENCES=[
 ['ipva','3.3. IPVA: duas emendas, duas mudanças'],
 ['itcmd','3.5. ITCMD: competência, progressividade e normas gerais'],
 ['itbi','3.6. ITBI: alterações efetivas no CTN e jurisprudência em curso'],
 ['issqn','3.7. ISS: alteração posterior da LC 232/2026'],
 ['lei236','6.3. LC 236: consulta, penalidades e lançamento'],
 ['novidades','5. Novidades sem equivalente direto: identificação rápida'],
 ['normativo','6. CTN e garantias: alterações que não são exclusivas de IBS']
].map(([categoryId,title])=>({categoryId,title,fileId:booklet}));
