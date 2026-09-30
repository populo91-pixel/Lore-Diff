// Fixed upstream and validated image hosts: never a general URL proxy.
export async function GET(request: Request) {
 const title=new URL(request.url).searchParams.get('title')?.trim();
 if(!title||title.length>160||/[\x00-\x1f]/.test(title))return new Response('Invalid title',{status:400});
 const signal=AbortSignal.timeout(4500);
 try {
  const query=new URLSearchParams({action:'query',format:'json',formatversion:'2',prop:'pageimages',piprop:'thumbnail',pithumbsize:'1000',redirects:'1',titles:title});
  const meta=await fetch('https://warcraft.wiki.gg/api.php?'+query,{signal,redirect:'error',headers:{Accept:'application/json'}});
  if(!meta.ok)throw Error('metadata');
  const data=await meta.json() as {query?:{pages?:Array<{thumbnail?:{source?:string}}>}};
  const source=data.query?.pages?.[0]?.thumbnail?.source;if(!source)throw Error('missing');
  const image=new URL(source);
  if(image.protocol!=='https:'||!(image.hostname==='wiki.gg'||image.hostname.endsWith('.wiki.gg'))||image.username||image.password)throw Error('host');
  const res=await fetch(image,{signal,redirect:'error'}),type=res.headers.get('Content-Type')||'';
  if(!res.ok||!/^image\/(png|jpeg|webp|gif)(;|$)/i.test(type)||Number(res.headers.get('Content-Length'))>5_000_000)throw Error('image');
  const bytes=await res.arrayBuffer();if(bytes.byteLength>5_000_000)throw Error('size');
  return new Response(bytes,{headers:{'Content-Type':type,'Cache-Control':'public, max-age=86400','X-Content-Type-Options':'nosniff'}});
 }catch{return new Response('Portrait temporarily unavailable',{status:503,headers:{'Cache-Control':'no-store'}});}
}
