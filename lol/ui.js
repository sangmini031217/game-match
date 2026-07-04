'use strict';
let players=[],matchResults=[],curIdx=0,matchMode='normal';
let matchSize=5,simpleMode=false,undoStack=[];

function save(){localStorage.setItem('lol_players',JSON.stringify(players));}
function load(){try{players=JSON.parse(localStorage.getItem('lol_players')||'[]');}catch{players=[];}matchSize=parseInt(localStorage.getItem('lol_matchSize')||'5');simpleMode=localStorage.getItem('lol_simpleMode')==='true';}
function getMax(){return matchSize*2;}

function applyI18n(){
  const l=getLang();document.documentElement.lang=l==='zh'?'zh-CN':l;
  document.querySelectorAll('.lang-btn').forEach(b=>b.classList.toggle('active',b.dataset.lang===l));
  const s=(id,val)=>{const el=$(id);if(el)el.textContent=val;};
  s('appTitle',t('appTitleLol'));
  s('btnAddText',t('btnAdd'));s('btnReset',t('btnReset'));s('btnMatchText',t('btnMatch'));
  s('placeholderTitle',t('placeholderTitle'));s('placeholderSub',t('placeholderSub'));
  s('sectionLabelPlayers',t('sectionPlayers'));
  s('btnBack',t('btnBack'));s('btnCopyText',t('btnCopy'));s('btnRerollText',t('btnReroll'));
  s('btnUndo','↩ '+t('btnUndo'));
  s('autoNameLabel',t('autoNameLabel'));
  s('matchSizeLabel',t('matchSize'));s('simpleModeLabel',t('simpleMode'));
  s('btnNext',t('btnNext'));
  s('conflictCancelBtn',t('btnCancel'));s('conflictForceBtn',t('btnForceMatch'));
  s('balanceLabel',t('balanceLabel'));
  const inp=$('inputName');if(inp)inp.placeholder=t('inputPlaceholder');
  for(let i=1;i<=4;i++){const e=$('stepLabel'+i);if(e)e.textContent=t('stepLabels')[i-1];}
  const ml=$('masterLpLabel');if(ml)ml.textContent=t('masterLpLabel');
  s('favSectionLabel',t('favTitle'));
  renderGuide();
}

function updateUI(){
  const max=getMax(),n=players.length;
  $('countNum').textContent=n;$('countTotal').textContent=max;
  $('countProgress').style.width=(n/max*100)+'%';
  $('btnAdd').style.display=n>=max?'none':'';
  $('btnReset').style.display=n>0?'':'none';
  $('btnMatchWrap').style.display=n===max?'':'none';
  $('btnUndo').style.display=undoStack.length>0?'':'none';
  $('sectionLabelPlayers').style.display=n>0?'':'none';
  $('playerListCard').style.display=n>0?'':'none';
  $('matchSizeSelect').value=String(matchSize);
  $('simpleModeToggle').checked=simpleMode;
  renderGrid();
}

function renderGrid(){
  const g=$('playerGrid'),l=getLang();if(!players.length){g.innerHTML='';return;}
  const sorted=[...players].map((p,i)=>({...p,_idx:i})).sort((a,b)=>calcScore(b)-calcScore(a));
  g.innerHTML=sorted.map(p=>{
    const i=p._idx;
    const sc=calcScore(p).toFixed(1),ts=tierDisp(p,l),sh=tierShort(p,l),ls=laneDisp(p.laneKey,l),c=TIER_COLORS[p.tierKey]||'#6B7684';
    const must=(p.mustWith||[]).map(id=>players.find(x=>x.id===id)?.name).filter(Boolean);
    const avoid=(p.avoidWith||[]).map(id=>players.find(x=>x.id===id)?.name).filter(Boolean);
    const tags=[...must.map(n=>`<span class="tag tag-must">+ ${esc(n)}</span>`),...avoid.map(n=>`<span class="tag tag-avoid">- ${esc(n)}</span>`)].join('');
    return`<div class="player-item" data-idx="${i}"><div class="tier-badge" style="color:${c};background:${c}18">${sh}</div><div class="player-info"><div class="player-name">${esc(p.name)}</div><div class="player-meta">${ts}${simpleMode?'':' · '+ls}</div><span class="score-pill">${t('scoreLabel')} ${sc}</span>${tags?`<div class="player-tags">${tags}</div>`:''}</div><button class="btn btn-danger" data-rm="${i}">${t('btnDelete')}</button></div>`;
  }).join('');
  g.querySelectorAll('[data-rm]').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();rmPlayer(+b.dataset.rm);}));
  g.querySelectorAll('.player-item').forEach(el=>el.addEventListener('click',()=>openEditModal(+el.dataset.idx)));
}

function rmPlayer(i){
  undoStack.push(JSON.parse(JSON.stringify(players)));
  const r=players[i];players.splice(i,1);
  players.forEach(p=>{p.mustWith=(p.mustWith||[]).filter(id=>id!==r.id);p.avoidWith=(p.avoidWith||[]).filter(id=>id!==r.id);});
  save();updateUI();showToast(`${r.name} ${t('toastDeleted')}`);
}

function resetAll(){
  if(!confirm(t('confirmReset')))return;
  undoStack.push(JSON.parse(JSON.stringify(players)));
  players=[];matchResults=[];curIdx=0;save();
  $('resultScreen').classList.remove('active');$('placeholderCard').style.display='';updateUI();
}

function undo(){
  if(!undoStack.length)return;
  players=undoStack.pop();save();updateUI();showToast(t('btnUndo'));
}

// Favorites UI
let favOpen=false;
function toggleFavPanel(){
  favOpen=!favOpen;
  $('favList').style.display=favOpen?'':'none';
  if(favOpen)renderFavList();
}
function renderFavList(){
  const favs=getFavorites('lol'),l=getLang(),list=$('favList');
  if(!favs.length){list.innerHTML=`<div class="fav-empty">${t('favEmpty')}</div>`;return;}
  const sorted=[...favs].map((f,i)=>({...f,_idx:i})).sort((a,b)=>calcScore(b)-calcScore(a));
  list.innerHTML=sorted.map(f=>{
    const i=f._idx;
    const sc=calcScore(f).toFixed(1),ts=tierDisp(f,l),sh=tierShort(f,l),c=TIER_COLORS[f.tierKey]||'#6B7684';
    const ls=simpleMode?'':`· ${laneDisp(f.laneKey,l)}`;
    return`<div class="fav-item"><div class="tier-badge" style="color:${c};background:${c}18;width:32px;height:32px;font-size:10px">${sh}</div><div class="fav-info"><div class="fav-name">${esc(f.name)}</div><div class="fav-meta">${ts} ${ls} · ${sc}pt</div></div><div class="fav-actions"><button class="btn btn-primary" style="padding:6px 10px;font-size:11px" data-fav-load="${i}">${t('favLoad')}</button><button class="btn btn-danger" style="padding:6px 8px;font-size:11px" data-fav-rm="${i}">${t('favDelete')}</button></div></div>`;
  }).join('');
  list.querySelectorAll('[data-fav-load]').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();loadFavorite(+b.dataset.favLoad);}));
  list.querySelectorAll('[data-fav-rm]').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();removeFavorite(+b.dataset.favRm,'lol');renderFavList();}));
}
function loadFavorite(idx){
  const favs=getFavorites('lol'),f=favs[idx];if(!f)return;
  if(players.length>=getMax()){showToast(t('emptyHint'));return;}
  undoStack.push(JSON.parse(JSON.stringify(players)));
  players.push({id:Date.now()+Math.random().toString(36).slice(2),name:f.name,tierKey:f.tierKey,subTier:f.subTier||null,masterLpIdx:f.masterLpIdx??null,laneKey:f.laneKey||'상관없음',mustWith:[],avoidWith:[]});
  save();updateUI();showToast(`${f.name} ${t('toastAdded')}`);
}
