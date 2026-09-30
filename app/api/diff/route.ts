import { getRawDb } from '@/db';
import { advance, answer, decide, initial, profile, question, reveal, clue, publicQuestion, type DiffState } from '@/lib/diff-game';

type Row={id:string;owner:string;state:string;version:number;finished:number;created_at:number};
function identity(req:Request){const raw=req.headers.get('cookie')?.split(';').map(x=>x.trim()).find(x=>x.startsWith('ld_daily='))?.slice(9);return raw&&/^[a-f0-9-]{36}$/.test(raw)?raw:crypto.randomUUID()}
function reply(req:Request,owner:string,data:unknown,status=200){return Response.json(data,{status,headers:{'Cache-Control':'no-store','Set-Cookie':`ld_daily=${owner}; HttpOnly; SameSite=Lax; Path=/; Max-Age=31536000${new URL(req.url).protocol==='https:'?'; Secure':''}`}})}
async function history(owner:string){const db=getRawDb();const rows=await db.prepare('SELECT state FROM diff_runs WHERE owner = ? AND finished = 1 ORDER BY created_at DESC').bind(owner).all<{state:string}>();const states=rows.results.map(r=>JSON.parse(r.state) as DiffState);return profile(states.map(s=>s.marks),states.map(s=>({depth:s.index-Number(s.ending==='defeat'),score:s.score})))}
function snapshot(row:Row|null,p:Awaited<ReturnType<typeof history>>){if(!row)return{run:null,profile:p};const s=JSON.parse(row.state) as DiffState;const item=s.phase==='question'?question(s.current):null;return{profile:p,run:{id:row.id,version:row.version,index:s.index,lives:s.lives,score:s.score,secured:s.secured,multiplier:s.multiplier,phase:s.phase,ending:s.ending||null,choices:s.choices,rulesVersion:s.rulesVersion||1,hints:s.hints??2,review:s.phase==='finished'?s.marks:undefined,question:item?publicQuestion(s):null,feedback:s.feedback,depth:s.index-Number(s.ending==='defeat')}}}
export async function GET(req:Request){const owner=identity(req);try{const db=getRawDb(),p=await history(owner);const row=await db.prepare('SELECT * FROM diff_runs WHERE owner = ? AND finished = 0 ORDER BY created_at DESC LIMIT 1').bind(owner).first<Row>();return reply(req,owner,snapshot(row,p))}catch(e){console.error('diff read failed',e);return reply(req,owner,{error:'Le dossier est indisponible. Réessaie.'},503)}}
export async function POST(req:Request){const owner=identity(req);try{
  const origin=req.headers.get('origin');if(origin&&origin!==new URL(req.url).origin)return reply(req,owner,{error:'Origine refusée.'},403);
  const body=await req.json() as {action?:string;id?:string;version?:number;text?:string;choice?:number;decision?:string;order?:number[]};const db=getRawDb();
  if(body.action==='start'){
    const existing=await db.prepare('SELECT * FROM diff_runs WHERE owner = ? AND finished = 0 ORDER BY created_at DESC LIMIT 1').bind(owner).first<Row>();const p=await history(owner);if(existing)return reply(req,owner,snapshot(existing,p));
    const id=crypto.randomUUID(),seed=crypto.getRandomValues(new Uint32Array(1))[0];await db.prepare('INSERT INTO diff_runs (id, owner, state, version, finished, created_at) VALUES (?, ?, ?, 0, 0, ?)').bind(id,owner,JSON.stringify(initial(p,seed)),Date.now()).run();
    return reply(req,owner,snapshot((await db.prepare('SELECT * FROM diff_runs WHERE id = ?').bind(id).first<Row>())!,p));
  }
  const row=await db.prepare('SELECT * FROM diff_runs WHERE id = ? AND owner = ?').bind(body.id||'',owner).first<Row>();if(!row)return reply(req,owner,{error:'Run introuvable sur ce navigateur.'},404);
  const p=await history(owner);if(row.version!==body.version)return reply(req,owner,snapshot(row,p));
  const s=JSON.parse(row.state) as DiffState;let next:DiffState|null=null;
  if(body.action==='clue')next=clue(s);
  if(body.action==='reveal')next=reveal(s);
  if(body.action==='skip'&&s.phase==='question')next=answer(s,{skip:true});
  if(body.action==='answer'&&(Array.isArray(body.order)||(s.choices&&typeof body.choice==='number')||(!s.choices&&typeof body.text==='string'&&body.text.trim().length>0&&body.text.length<=100)))next=answer(s,{text:body.text,choice:body.choice,order:body.order});
  if(body.action==='next')next=advance(s,p);
  if(body.action==='decide'&&(body.decision==='bank'||body.decision==='push'))next=decide(s,p,body.decision);
  if(!next)return reply(req,owner,{error:'Action indisponible.'},400);
  const result=await db.prepare('UPDATE diff_runs SET state = ?, version = version + 1, finished = ? WHERE id = ? AND owner = ? AND version = ?').bind(JSON.stringify(next),Number(next.phase==='finished'),row.id,owner,row.version).run();
  if(!result.meta.changes){const fresh=await db.prepare('SELECT * FROM diff_runs WHERE id = ?').bind(row.id).first<Row>();return reply(req,owner,snapshot(fresh,p))}
  const fresh=await db.prepare('SELECT * FROM diff_runs WHERE id = ?').bind(row.id).first<Row>();return reply(req,owner,snapshot(fresh,next.phase==='finished'?await history(owner):p));
}catch(e){console.error('diff write failed',e);return reply(req,owner,{error:'La sauvegarde a échoué. Ta partie reste disponible ; réessaie.'},503)}}
