import { allQuestions, prepareQuestions } from '@/app/quiz/quiz-data';
export async function GET(req: Request) {
  const universe = new URL(req.url).searchParams.get('universe') || 'mix';
  if (!['mix', 'pokemon', 'wow', 'runeterra'].includes(universe)) return Response.json({error:'Univers inconnu.'}, {status:400});
  const candidates = allQuestions.filter(q => ['pokemon','wow','runeterra'].includes(q.universe) && (universe==='mix'||q.universe===universe)
    && !/(silhouette|zoom|splash|emoji|audio|ost|carte|portrait)/i.test(q.type)
    && !/(cette image|ce personnage|cette silhouette|ce fragment|ci-dessous|ce son|Sentence capitale)/i.test(q.prompt));
  const pool = [...new Map(candidates.map(q=>[`${q.universe}|${q.prompt}`,q])).values()];
  const seed = crypto.getRandomValues(new Uint32Array(1))[0];
  const banks = ['pokemon','wow','runeterra'].map((u,i) =>
    prepareQuestions(pool.filter(q=>q.universe===u),seed+i,14));
  const selected = universe === 'mix'
    ? Array.from({length:14},(_,n)=>banks.map(bank=>bank[n]).filter(Boolean)).flat()
    : prepareQuestions(pool,seed,40);
  const questions = selected.map(({prompt,options,correct,fact,universe})=>({prompt,options,correct,fact,universe}));
  return Response.json({questions}, {headers:{'Cache-Control':'no-store'}});
}
