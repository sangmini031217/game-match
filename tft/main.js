'use strict';
let players=[],tftTeams=[],tftCount=8,draft={},step=1,undoStack=[],mobIdx=0,simpleMode=false;

function save(){localStorage.setItem('tft_players',JSON.stringify(players));}
function load(){try{players=JSON.parse(localStorage.getItem('tft_players')||'[]');}catch{players=[];}tftCount=parseInt(localStorage.getItem('tft_count')||'8');simpleMode=localStorage.getItem('tft_simpleMode')==='true';}
function getNextMobName(){
  const available=JUNGLE_MOBS.filter(m=>!players.some(p=>p.name===m));
  if(!available.length)return'Player'+(players.length+1);
  return available[mobIdx++%available.length];
}

function applyI18n(){
  const l=getLang();document.documentElement.lang=l==='zh'?'zh-CN':l;
  document.querySelectorAll('.lang-btn').forEach(b=>b.classList.toggle('active',b.dataset.lang===l));
  const s=(id,val)=>{const el=$(id);if(el)el.textContent=val;};
  s('appTitle',t('appTitleTft'));s('statLabelSub',t('statLabel'));
  s('btnAddText',t('btnAdd'));s('btnReset',t('btnReset'));s('btnMatchText',t('btnMatch'));
  s('emptyTitle',t('emptyHint'));s('placeholderTitle',t('placeholderTitle'));s('placeholderSub',t('placeholderSub'));
  s('sectionLabelPlayers',t('sectionPlayers'));s('tftCountLabel',t('tftCountLabel'));
  s('btnBack',t('btnBack'));s('btnCopyText',t('btnCopy'));
  s('btnUndo','↩ '+t('btnUndo'));s('autoNameLabel',t('autoNameLabel'));s('simpleModeLabel',t('simpleMode'));
  s('btnNext',t('btnNext'));s('guideAlgo','⚖️ '+t('guideAlgo'));
  const ait=$('algoInfoText');if(ait)ait.textContent='⚖️ '+t('guideAlgo');
  const inp=$('inputName');if(inp)inp.placeholder=t('inputPlaceholder');
  for(let i=1;i<=3;i++){const e=$('stepLabel'+i);if(e)e.textContent=t('stepLabels')[i-1];}
  const ml=$('masterLpLabel');if(ml)ml.textContent=t('masterLpLabel');
}

function updateUI(){
  const max=tftCount,n=players.length;
  $('countNum').textContent=n;$('countTotal').textContent=max;
  $('countProgress').style.width=(n/max*100)+'%';
  $('btnAdd').style.display=n>=max?'none':'';$('btnReset').style.display=n>0?'':'none';
  $('btnMatchWrap').style.display=n===max?'':'none';
  $('btnUndo').style.display=undoStack.length?'':'none';
  const sm=$('simpleModeToggle');if(sm)sm.checked=simpleMode;
  $('sectionLabelPlayers').style.display=n>0?'':'none';$('playerListCard').style.display=n>0?'':'none';
  renderGrid();
}

function renderGrid(){
  const g=$('playerGrid'),l=getLang();if(!players.length){g.innerHTML='';return;}
  g.innerHTML=players.map((p,i)=>{
    const sc=calcScore(p).toFixed(1),ts=tierDisp(p,l),sh=tierShort(p,l),c=TIER_COLORS[p.tierKey]||'#6B7684';
    return`<div class="player-item" data-idx="${i}"><div class="tier-badge" style="color:${c};background:${c}18">${sh}</div><div class="player-info"><div class="player-name">${esc(p.name)}</div><div class="player-meta">${ts}</div><span class="score-pill">${t('scoreLabel')} ${sc}</span></div><button class="btn btn-danger" data-rm="${i}">${t('btnDelete')}</button></div>`;
  }).join('');
  g.querySelectorAll('[data-rm]').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();rmPlayer(+b.dataset.rm);}));
  g.querySelectorAll('.player-item').forEach(el=>el.addEventListener('click',()=>openEditModal(+el.dataset.idx)));
}
function rmPlayer(i){undoStack.push(JSON.parse(JSON.stringify(players)));const r=players[i];players.splice(i,1);save();updateUI();showToast(`${r.name} ${t('toastDeleted')}`);}
function resetAll(){if(!confirm(t('confirmReset')))return;undoStack.push(JSON.parse(JSON.stringify(players)));players=[];tftTeams=[];save();$('resultScreen').classList.remove('active');$('placeholderCard').style.display='';updateUI();}
function undo(){if(!undoStack.length)return;players=undoStack.pop();save();updateUI();showToast(t('btnUndo'));}

// Edit Modal
function openEditModal(idx){
  const p=players[idx];if(!p)return;
  const l=getLang(),tiers=t('tiers');
  $('editModalTitle').textContent=t('editTitle');
  const body=$('editModalBody');
  body.innerHTML=`
    <div class="edit-section"><div class="edit-section-title">${t('editName')}</div><input class="input-field" id="editNameInput" value="${esc(p.name)}" maxlength="20"></div>
    <div class="edit-section"><div class="edit-section-title">${t('editTier')}</div><div class="chip-grid" id="editTierGrid">${TIER_KEYS.map((k,i)=>`<div class="chip${k===p.tierKey?' selected':''}" data-t="${k}">${tiers[i]}</div>`).join('')}</div></div>
    <div style="display:flex;gap:8px;margin-top:16px"><button class="btn btn-ghost" style="flex:1" id="editCancelBtn">${t('btnCancel')}</button><button class="btn btn-primary" style="flex:1" id="editSaveBtn">${t('btnSave')}</button></div>
  `;
  body.querySelectorAll('#editTierGrid .chip').forEach(c=>c.addEventListener('click',()=>{body.querySelectorAll('#editTierGrid .chip').forEach(x=>x.classList.remove('selected'));c.classList.add('selected');}));
  $('editCancelBtn').addEventListener('click',closeEditModal);
  $('editSaveBtn').addEventListener('click',()=>{
    undoStack.push(JSON.parse(JSON.stringify(players)));
    p.name=$('editNameInput').value.trim()||p.name;
    const sel=body.querySelector('#editTierGrid .chip.selected');
    if(sel)p.tierKey=sel.dataset.t;
    if(NO_SUB.includes(p.tierKey))p.subTier=null;
    save();updateUI();closeEditModal();showToast(t('btnSave'));
  });
  $('editOverlay').classList.add('active');
}
function closeEditModal(){$('editOverlay').classList.remove('active');}

// Modal
function openModal(){
  if(players.length>=tftCount)return;draft={};step=1;
  const autoName=$('autoNameToggle').checked;
  if(autoName){
    draft.name=getNextMobName();
    $('stepIndicator').innerHTML=[1,2].map(i=>`<div class="step-dot" id="dot${i}"></div>`).join('');
    buildTier();goStep(2);
  } else {
    $('stepIndicator').innerHTML=[1,2,3].map(i=>`<div class="step-dot" id="dot${i}"></div>`).join('');
    goStep(1);$('inputName').value='';$('inputName').placeholder=t('inputPlaceholder');
  }
  $('modalOverlay').classList.add('active');
  if(!autoName)setTimeout(()=>$('inputName').focus(),300);
}
function closeModal(){$('modalOverlay').classList.remove('active');}
function goStep(n){for(let i=1;i<=3;i++){const el=$('step'+i);if(el)el.classList.toggle('active',i===n);}step=n;for(let i=1;i<=3;i++){const d=$('dot'+i);if(d)d.className='step-dot'+(i<n?' done':i===n?' active':'');}$('modalTitle').textContent=t('stepTitles')[n-1]||'';for(let i=1;i<=3;i++){const e=$('stepLabel'+i);if(e)e.textContent=t('stepLabels')[i-1]||'';}const nx=$('btnNext');if(nx)nx.textContent=t('btnNext');}
function nextStep(f){if(f===1){const nm=$('inputName').value.trim();if(!nm){showToast(t('nameRequired'));return;}draft.name=nm;buildTier();goStep(2);}}
function buildTier(){const ts=t('tiers');$('tierChips').innerHTML=TIER_KEYS.map((k,i)=>`<div class="chip" data-t="${k}">${ts[i]}</div>`).join('');$('tierChips').querySelectorAll('.chip').forEach(e=>e.addEventListener('click',()=>selTier(e,e.dataset.t)));}
function selTier(el,tk){draft.tierKey=tk;$('tierChips').querySelectorAll('.chip').forEach(c=>c.classList.remove('selected'));el.classList.add('selected');setTimeout(()=>{if(simpleMode){draft.subTier=null;draft.masterLpIdx=null;finishAdd();return;}if(NO_SUB.includes(tk)){if(tk==='마스터')buildMaster();else{draft.subTier=null;draft.masterLpIdx=null;finishAdd();}}else{buildSub(tk);goStep(3);}},180);}
function buildSub(tk){const tn=t('tiers')[TIER_KEYS.indexOf(tk)];$('subTierChips').innerHTML=[4,3,2,1].map(n=>`<div class="chip" data-s="${n}">${tn} ${n}</div>`).join('');$('subTierChips').querySelectorAll('.chip').forEach(e=>e.addEventListener('click',()=>selSub(e,+e.dataset.s)));$('masterLpWrap').style.display='none';}
function selSub(el,n){draft.subTier=n;$('subTierChips').querySelectorAll('.chip').forEach(c=>c.classList.remove('selected'));el.classList.add('selected');setTimeout(()=>finishAdd(),180);}
function buildMaster(){$('subTierChips').innerHTML='';$('masterLpWrap').style.display='';$('masterLpLabel').textContent=t('masterLpLabel');const lp=t('masterLp');$('masterLpChips').innerHTML=lp.map((l,i)=>`<div class="chip" data-lp="${i}">${l}</div>`).join('');$('masterLpChips').querySelectorAll('.chip').forEach(e=>e.addEventListener('click',()=>selMLP(e,+e.dataset.lp)));goStep(3);}
function selMLP(el,i){draft.masterLpIdx=i;draft.subTier=null;$('masterLpChips').querySelectorAll('.chip').forEach(c=>c.classList.remove('selected'));el.classList.add('selected');setTimeout(()=>finishAdd(),180);}
function finishAdd(){undoStack.push(JSON.parse(JSON.stringify(players)));players.push({id:Date.now()+Math.random().toString(36).slice(2),name:draft.name,tierKey:draft.tierKey,subTier:draft.subTier||null,masterLpIdx:draft.masterLpIdx??null,laneKey:'상관없음',mustWith:[],avoidWith:[]});save();updateUI();closeModal();showToast(`${draft.name} ${t('toastAdded')}`);}

// Match
function doMatch(){if(players.length!==tftCount){showToast(t('needFull'));return;}const sorted=[...players].sort((a,b)=>calcScore(b)-calcScore(a));tftTeams=[];const half=sorted.length/2;for(let i=0;i<half;i++)tftTeams.push([sorted[i],sorted[sorted.length-1-i]]);showResult();}
function showResult(){
  $('placeholderCard').style.display='none';$('resultScreen').classList.add('active');
  $('resultTitle').textContent=t('tftResultTitle');$('resultSubtitle').textContent=t('tftResultSub');
  const ait=$('algoInfoText');if(ait)ait.textContent='⚖️ '+t('guideAlgo');
  const l=getLang(),w=$('teamsWrapper');
  w.innerHTML=tftTeams.map((pair,i)=>{
    const avg=((calcScore(pair[0])+calcScore(pair[1]))/2).toFixed(1);
    const rows=pair.map(p=>`<div class="tft-player-row"><div class="tier-badge" style="color:${TIER_COLORS[p.tierKey]||'#6B7684'};background:${(TIER_COLORS[p.tierKey]||'#6B7684')}18;width:32px;height:32px;font-size:11px">${tierShort(p,l)}</div><div class="tft-player-name">${esc(p.name)}</div><div class="tft-player-tier">${tierDisp(p,l)} · ${calcScore(p).toFixed(1)}pt</div></div>`).join('');
    return`<div class="tft-team-card"><div class="tft-team-header"><span>${t('teamLabel')} ${i+1}</span><span class="tft-team-avg">${t('avgLabel')} ${avg}pt</span></div><div class="tft-team-players">${rows}</div></div>`;
  }).join('');
}
function backToMain(){$('resultScreen').classList.remove('active');$('placeholderCard').style.display='';}
function copyDisc(){
  if(!tftTeams.length)return;const l=getLang();
  const lines=tftTeams.map((pair,i)=>`* ${t('teamLabel')} ${i+1}: ${pair[0].name} (${tierDisp(pair[0],l)}), ${pair[1].name} (${tierDisp(pair[1],l)})`);
  const txt=['🎲 **'+t('tftCopyHeader')+'**','',...lines].join('\n');
  navigator.clipboard.writeText(txt).then(()=>showToast(t('toastCopied'))).catch(()=>{const ta=document.createElement('textarea');ta.value=txt;document.body.appendChild(ta);ta.select();document.execCommand('copy');document.body.removeChild(ta);showToast(t('toastCopied'));});
}

// Init
document.addEventListener('DOMContentLoaded',()=>{
  load();$('tftCountSelect').value=String(tftCount);applyI18n();updateUI();
  document.querySelectorAll('.lang-btn').forEach(b=>b.addEventListener('click',()=>{setLangStorage(b.dataset.lang);applyI18n();updateUI();}));
  $('tftCountSelect').addEventListener('change',e=>{tftCount=+e.target.value;localStorage.setItem('tft_count',String(tftCount));if(players.length>tftCount){undoStack.push(JSON.parse(JSON.stringify(players)));players=players.slice(0,tftCount);save();}$('resultScreen').classList.remove('active');$('placeholderCard').style.display='';updateUI();});
  $('simpleModeToggle').addEventListener('change',e=>{simpleMode=e.target.checked;localStorage.setItem('tft_simpleMode',String(simpleMode));updateUI();});
  $('btnAdd').addEventListener('click',openModal);$('btnReset').addEventListener('click',resetAll);$('btnMatch').addEventListener('click',doMatch);
  $('btnUndo').addEventListener('click',undo);
  $('modalCloseBtn').addEventListener('click',closeModal);$('modalOverlay').addEventListener('click',e=>{if(e.target===$('modalOverlay'))closeModal();});
  $('inputName').addEventListener('keydown',e=>{if(e.key==='Enter')nextStep(1);});$('btnNext').addEventListener('click',()=>nextStep(1));
  $('btnBack').addEventListener('click',backToMain);$('btnCopy').addEventListener('click',copyDisc);
  $('editCloseBtn').addEventListener('click',closeEditModal);$('editOverlay').addEventListener('click',e=>{if(e.target===$('editOverlay'))closeEditModal();});
});
