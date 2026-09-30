import { getRawDb } from '@/db';
import { answerQuestion, dailyQuestions, dayKey, initialState, validDay, type State } from '@/lib/daily-game';
type Row={id:string;owner:string;day:string;ranked_key:string|null;state:string;version:number;score:number;finished:number};
function identity(req:Request){const value=req.headers.get('cookie')?.split(';').map(x=>x.trim()).find(x=>x.startsWith('ld_daily='))?.slice(9);return value&&/^[a-f0-9-]{36}$/.test(value)?value:crypto.randomUUID()}
function response(req:Request,owner:string,data:unknown,status=200){return Response.json(data,{status,headers:{'Cache-Control':'no-store','Set-Cookie':`ld_daily=${owner}; HttpOnly; SameSite=Lax; Path=/; Max-Age=31536000${new URL(req.url).protocol==='https:'?'; Secure':''}`}})}
async function snapshot(row:Row){const s=JSON.parse(row.state) as State;const questions=dailyQuestions(row.day);const revealed=s.answers.length>s.index;const done=s.answers.length===9;const q=questions[s.index];const waitingBet=s.index===8&&s.bet===null;
 const db=getRawDb();let ranking=null;
 if(done&&row.ranked_key){const result=await db.prepare('SELECT COUNT(*) AS total, COALESCE(SUM(CASE WHEN score > ? THEN 1 ELSE 0 END),0) AS ahead FROM daily_runs WHERE day = ? AND finished = 1 AND ranked_key IS NOT NULL').bind(s.score,row.day).first<{total:number;ahead:number}>();ranking=result?{rank:result.ahead+1,total:result.total}:null}
 return{id:row.id,day:row.day,ranked:!!row.ranked_key,version:row.version,index:s.index,score:s.score,streak:s.streak,bestStreak:s.bestStreak,bet:s.bet,waitingBet,done,ranking,correctCount:s.answers.filter(a=>a.correct).length,
 question:!done&&!waitingBet?{prompt:q.prompt,options:q.options,signal:q.signal,universe:q.universe}:null,
 feedback:revealed&&!done?{...s.answers[s.index],answer:q.correct,fact:q.fact}:null,
 review:done?s.answers.map((a,i)=>({...a,prompt:questions[i].prompt,answer:questions[i].options[questions[i].correct],selected:questions[i].options[a.choice],fact:questions[i].fact})):null};}
export async function GET(req:Request){const owner=identity(req);try{const db=getRawDb(),url=new URL(req.url),id=url.searchParams.get('id');
 if(id){const row=await db.prepare('SELECT * FROM daily_runs WHERE id = ? AND owner = ?').bind(id,owner).first<Row>();return response(req,owner,row?await snapshot(row):{error:'Partie introuvable sur ce navigateur.'},row?200:404)}
 const today=dayKey();const rows=await db.prepare('SELECT id, day, score, finished FROM daily_runs WHERE owner = ? AND ranked_key IS NOT NULL ORDER BY day DESC LIMIT 40').bind(owner).all();
 const challengeId=url.searchParams.get('challenge');let challenge=null;
 if(challengeId){challenge=await db.prepare('SELECT id, day, score FROM daily_runs WHERE id = ? AND finished = 1').bind(challengeId).first();if(!challenge||!validDay(challenge.day))return response(req,owner,{error:'Ce défi est introuvable ou a plus de 30 jours.'},404)}
 return response(req,owner,{today,history:rows.results,challenge});
 }catch(e){console.error('daily read failed',e);return response(req,owner,{error:'Le run est momentanément indisponible. Réessaie dans un instant.'},503)}}
export async function POST(req:Request){const owner=identity(req);try{
 const origin=req.headers.get('origin');if(origin&&origin!==new URL(req.url).origin)return response(req,owner,{error:'Origine refusée.'},403);
 const body=await req.json() as {action:string;day?:string;practice?:boolean;id?:string;version?:number;choice?:number;bet?:number};const db=getRawDb();
 if(body.action==='start'){
 const day=body.day||dayKey();if(!validDay(day))return response(req,owner,{error:'Ce run n’est plus disponible.'},400);
 const key=day===dayKey()&&!body.practice?`${owner}:${day}`:null;
 if(key){const existing=await db.prepare('SELECT * FROM daily_runs WHERE ranked_key = ?').bind(key).first<Row>();if(existing)return response(req,owner,await snapshot(existing));}
 const id=crypto.randomUUID();await db.prepare('INSERT INTO daily_runs (id, owner, day, ranked_key, state, version, score, finished, created_at) VALUES (?, ?, ?, ?, ?, 0, 0, 0, ?) ON CONFLICT(ranked_key) DO NOTHING').bind(id,owner,day,key,JSON.stringify(initialState()),Date.now()).run();
 const row=await db.prepare('SELECT * FROM daily_runs WHERE id = ? OR ranked_key = ?').bind(id,key).first<Row>();if(!row)throw new Error('Run insert failed');return response(req,owner,await snapshot(row));
 }
 const row=await db.prepare('SELECT * FROM daily_runs WHERE id = ? AND owner = ?').bind(body.id||'',owner).first<Row>();if(!row)return response(req,owner,{error:'Partie introuvable. Recharge la page.'},404);
 if(row.version!==body.version)return response(req,owner,await snapshot(row));
 let state=JSON.parse(row.state) as State;const answered=state.answers.length>state.index;
 if(body.action==='answer'){const next=answerQuestion(state,dailyQuestions(row.day)[state.index],body.choice!);if(!next)return response(req,owner,{error:'Réponse déjà validée ou invalide.'},400);state=next;}
 else if(body.action==='next'&&answered&&state.index<8){state={...state,index:state.index+1,openedAt:Date.now()};}
 else if(body.action==='bet'&&state.index===8&&state.bet===null&&[0,Math.min(500,state.score)].includes(body.bet!)){state={...state,bet:body.bet!,openedAt:Date.now()};}
 else return response(req,owner,{error:'Action indisponible.'},400);
 await db.prepare('UPDATE daily_runs SET state = ?, version = version + 1, score = ?, finished = ? WHERE id = ? AND owner = ? AND version = ?').bind(JSON.stringify(state),state.score,state.answers.length===9?1:0,row.id,owner,row.version).run();
 const fresh=await db.prepare('SELECT * FROM daily_runs WHERE id = ? AND owner = ?').bind(row.id,owner).first<Row>();return response(req,owner,await snapshot(fresh!));
 }catch(e){console.error('daily write failed',e);return response(req,owner,{error:'La sauvegarde n’a pas abouti. Réessaie : ta partie est conservée.'},503)}}
