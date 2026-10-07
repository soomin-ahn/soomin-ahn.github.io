(function(){
const app=document.getElementById('app');
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const has=n=>{try{return eval('typeof '+n)!=='undefined'}catch(e){return false}};
const broken=[];
if(!has('WORKS'))broken.push('content/works.js');
if(!has('EMAIL'))broken.push('content/about.js');
if(!has('SOLO'))broken.push('content/cv.js');

const showEx=has('SHOW_EXHIBITIONS')?SHOW_EXHIBITIONS:false;
const until=has('EARLIER_UNTIL')?EARLIER_UNTIL:2020;
const defMed=has('DEFAULT_MEDIUM')?DEFAULT_MEDIUM:{ko:'캔버스에 유화',en:'Oil on canvas'};
const list=(has('WORKS')?WORKS:[]).filter(Boolean).map(w=>({...w,
  id:String(w.img||w.en||w.ko).replace(/\.[a-z0-9]+$/i,'').toLowerCase().replace(/[^a-z0-9가-힣]+/g,'-').replace(/^-|-$/g,''),
  src:'images/'+w.img, year:Number(w.year)}));
const byId=Object.fromEntries(list.map(w=>[w.id,w]));
const recent=list.filter(w=>w.year>until), earlier=list.filter(w=>w.year<=until);
const ordered=[...[...new Set(recent.map(w=>w.year))].sort((a,b)=>b-a).flatMap(y=>recent.filter(w=>w.year===y)),
  ...earlier.slice().sort((a,b)=>b.year-a.year)];
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
let keyHandler=null;

function notice(){return broken.length?`<p class="notice">${broken.map(esc).join(', ')} 파일을 읽지 못했어요. 최근에 고친 부분에서 큰따옴표, 쉼표, 괄호가 빠지지 않았는지 확인해 주세요.</p>`:''}

function home(){
  const items=list.filter(w=>w.main);const pool=items.length?items:list.slice(0,5);
  if(!pool.length){app.innerHTML=notice();return}
  app.innerHTML=notice()+`<section class="hero" aria-roledescription="carousel" aria-label="대표작">
    ${pool.map((w,i)=>`<div class="slide${i?'':' on'}"><img src="${esc(w.src)}" alt="${esc(w.ko)}, ${w.year}"${i?' loading="lazy"':''}></div>`).join('')}
    <button class="hit prev" aria-label="이전 작품"></button><button class="hit next" aria-label="다음 작품"></button></section>
  <div class="hero-foot"><a id="hcap" href="#"></a>
   <div class="count"><button class="p" aria-label="이전 작품">‹</button><span><b id="hn">1</b> / ${pool.length}</span><button class="n" aria-label="다음 작품">›</button></div></div>`;
  let i=0;const slides=[...app.querySelectorAll('.slide')];
  const show=k=>{i=(k+pool.length)%pool.length;slides.forEach((s,j)=>s.classList.toggle('on',j===i));
    const w=pool[i],c=document.getElementById('hcap');c.href='#/work/'+w.id;
    c.innerHTML=`<span class="cap-ko">${esc(w.ko)}</span> <span class="cap-en">${esc(w.en)}, ${w.year}</span>`;
    document.getElementById('hn').textContent=i+1};
  show(0);
  app.querySelectorAll('.prev,.p').forEach(b=>b.onclick=()=>show(i-1));
  app.querySelectorAll('.next,.n').forEach(b=>b.onclick=()=>show(i+1));
  let x0=null;const h=app.querySelector('.hero');
  h.addEventListener('touchstart',e=>x0=e.touches[0].clientX,{passive:true});
  h.addEventListener('touchend',e=>{if(x0===null)return;const d=e.changedTouches[0].clientX-x0;if(Math.abs(d)>40)show(i+(d<0?1:-1));x0=null});
  keyHandler=e=>{if(e.key==='ArrowRight')show(i+1);if(e.key==='ArrowLeft')show(i-1)};
}

const thumb=(w,yr)=>`<a class="thumb" href="#/work/${w.id}"><div class="box"><img loading="lazy" src="${esc(w.src)}" alt="${esc(w.ko)}"></div>
  <div class="t"><span class="cap-ko">${esc(w.ko)}</span><br><span class="cap-en">${esc(w.en)}</span>${yr?`<br><span class="yr">${w.year}</span>`:''}</div></a>`;

function work(){
  const years=[...new Set(recent.map(w=>w.year))].sort((a,b)=>b-a);
  app.innerHTML=notice()+`<div class="years">${years.map(y=>`<a href="#y${y}">${y}</a>`).join('')}${earlier.length?'<a href="#earlier">Earlier works</a>':''}</div>
  ${years.map(y=>`<section class="year" id="y${y}"><h2>${y}</h2><div class="grid">${recent.filter(w=>w.year===y).map(w=>thumb(w)).join('')}</div></section>`).join('')}
  ${earlier.length?`<section class="year" id="earlier"><h2>Earlier works</h2><div class="grid">${earlier.slice().sort((a,b)=>b.year-a.year).map(w=>thumb(w,true)).join('')}</div></section>`:''}`;
  app.querySelectorAll('.years a').forEach(a=>a.onclick=e=>{e.preventDefault();document.querySelector(a.getAttribute('href')).scrollIntoView({behavior:reduce?'auto':'smooth'})});
}

function detail(id){
  const w=byId[id];if(!w)return work();
  const k=ordered.indexOf(w),n=ordered.length,prev=ordered[(k-1+n)%n],next=ordered[(k+1)%n];
  const mk=w.medium||defMed.ko, me=w.mediumEn||(w.medium?'':defMed.en);
  app.innerHTML=`<article class="detail"><div class="pic"><img src="${esc(w.src)}" alt="${esc(w.ko)}, ${w.year}"></div>
   <div class="info"><p><span class="cap-ko">${esc(w.ko)}</span><br><span class="cap-en">${esc(w.en)}</span></p>
   <p class="meta">${esc(mk)}${me?'<br>'+esc(me):''}<br>${esc(w.size)}<br>${w.year}</p>
   <div class="pager"><a href="#/work/${prev.id}">이전</a><a href="#/work/${next.id}">다음</a><a href="#/work">목록</a></div></div></article>`;
  keyHandler=e=>{if(e.key==='ArrowRight')location.hash='#/work/'+next.id;if(e.key==='ArrowLeft')location.hash='#/work/'+prev.id};
}

function exhibitions(){
  const solo=has('SOLO')?SOLO:[];
  app.innerHTML=notice()+`<div class="text"><h2>개인전</h2>${solo.map(([y,t,p])=>`<div class="show"><div class="meta">${esc(y)}</div><div><span class="cap-ko">${esc(t)}</span><br><span class="meta">${esc(p)}</span></div></div>`).join('')}</div>`;
}
function about(){
  const rows=a=>(a||[]).map(([y,t,p])=>`<div class="cv-row"><div class="y">${esc(y)}</div><div>${p?`<i>${esc(t)}</i>, ${esc(p)}`:esc(t)}</div></div>`).join('');
  const pf=has('PROFILE')?PROFILE:{name:'',born:''};
  const email=has('EMAIL')?EMAIL:'', ig=has('INSTAGRAM')?INSTAGRAM:'';
  const igUrl=ig?(ig.startsWith('http')?ig:'https://instagram.com/'+ig.replace('@','')):'';
  const contact=[email?`<a href="mailto:${esc(email)}">${esc(email)}</a>`:'',ig?`<a href="${esc(igUrl)}" target="_blank" rel="noopener">Instagram</a>`:''].filter(Boolean).join('<br>');
  app.innerHTML=notice()+`<div class="text"><div class="cv-head"><div class="n">${esc(pf.name)}</div><div class="m">${esc(pf.born)}</div></div>
  ${contact?`<h2>Contact</h2><p class="contact">${contact}</p>`:''}
  <h2>개인전</h2>${rows(has('SOLO')?SOLO:[])}<h2>그룹전</h2>${rows(has('GROUP')?GROUP:[])}<h2>학력</h2>${rows(has('EDUCATION')?EDUCATION:[])}</div>`;
}

if(!showEx){const a=document.querySelector('nav a[data-r="exhibitions"]');if(a)a.remove()}
function route(){
  document.body.classList.remove('open');document.querySelector('.menu-btn').setAttribute('aria-expanded','false');
  const parts=location.hash.replace(/^#\/?/,'').split('/'),r=parts[0]||'';keyHandler=null;
  document.querySelectorAll('nav a').forEach(a=>a.dataset.r===(['about','cv'].includes(r)?'info':r)?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current'));
  if(r==='work'&&parts[1])detail(decodeURIComponent(parts[1]));else if(r==='work')work();
  else if(r==='exhibitions'&&showEx)exhibitions();else if(r==='info'||r==='about'||r==='cv')about();else home();
  window.scrollTo(0,0);
}
document.querySelector('.menu-btn').onclick=e=>{const o=document.body.classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',o)};
addEventListener('keydown',e=>{if(keyHandler)keyHandler(e)});
addEventListener('hashchange',route);route();
})();
