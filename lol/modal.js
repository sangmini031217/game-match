'use strict';
let draft={},curStep=1;

function openModal(){
  if(players.length>=getMax())return;
  draft={mustWith:[],avoidWith:[]};curStep=1;
  const autoName=$('autoNameToggle').checked;
  if(autoName){
    // Skip name step — auto-assign mob name
    draft.name=getNextMobName();
    const totalSteps=simpleMode?2:3; // tier, (sub), lane
    $('stepIndicator').innerHTML=Array.from({length:totalSteps},(_,i)=>`<div class="step-dot" id="dot${i+1}"></div>`).join('');
    buildTierChips();goStep(2);
  } else {
    const totalSteps=simpleMode?3:4;
    $('stepIndicator').innerHTML=Array.from({length:totalSteps},(_,i)=>`<div class="step-dot" id="dot${i+1}"></div>`).join('');
    goStep(1);$('inputName').value='';$('inputName').placeholder=t('inputPlaceholder');
  }
  $('modalOverlay').classList.add('active');
  if(!autoName)setTimeout(()=>$('inputName').focus(),300);
}
function closeModal(){$('modalOverlay').classList.remove('active');}

function goStep(n){
  const totalSteps=simpleMode?3:4;
  for(let i=1;i<=4;i++){const el=$('step'+i);if(el)el.classList.toggle('active',i===n);}
  curStep=n;
  for(let i=1;i<=totalSteps;i++){const d=$('dot'+i);if(d)d.className='step-dot'+(i<n?' done':i===n?' active':'');}
  $('modalTitle').textContent=t('stepTitles')[n-1]||'';
  for(let i=1;i<=4;i++){const e=$('stepLabel'+i);if(e)e.textContent=t('stepLabels')[i-1]||'';}
  const ml=$('masterLpLabel');if(ml)ml.textContent=t('masterLpLabel');
  const nx=$('btnNext');if(nx)nx.textContent=t('btnNext');
  const back=$('modalBackBtn');if(back)back.style.display=n>1?'':'none';
}
function prevStep(){if(curStep>1)goStep(curStep-1);}

function nextStep(from){
  if(from===1){
    const nm=$('inputName').value.trim();
    if(!nm){showToast(t('nameRequired'));return;}
    draft.name=nm;buildTierChips();goStep(2);
  }
}

function buildTierChips(){
  const ts=t('tiers');
  $('tierChips').innerHTML=TIER_KEYS.map((k,i)=>`<div class="chip" data-t="${k}">${ts[i]}</div>`).join('');
  $('tierChips').querySelectorAll('.chip').forEach(e=>e.addEventListener('click',()=>selTier(e,e.dataset.t)));
}
function selTier(el,tk){
  draft.tierKey=tk;$('tierChips').querySelectorAll('.chip').forEach(c=>c.classList.remove('selected'));el.classList.add('selected');
  setTimeout(()=>{
    if(simpleMode){draft.subTier=null;draft.masterLpIdx=null;buildLaneChips();goStep(4);return;}
    if(NO_SUB.includes(tk)){if(tk==='마스터')buildMasterChips();else{draft.subTier=null;draft.masterLpIdx=null;buildLaneChips();goStep(4);}}
    else{buildSubChips(tk);goStep(3);}
  },180);
}
function buildSubChips(tk){
  const tn=t('tiers')[TIER_KEYS.indexOf(tk)];
  $('subTierChips').innerHTML=[4,3,2,1].map(n=>`<div class="chip" data-s="${n}">${tn} ${n}</div>`).join('');
  $('subTierChips').querySelectorAll('.chip').forEach(e=>e.addEventListener('click',()=>selSub(e,+e.dataset.s)));
  $('masterLpWrap').style.display='none';
}
function selSub(el,n){
  draft.subTier=n;$('subTierChips').querySelectorAll('.chip').forEach(c=>c.classList.remove('selected'));el.classList.add('selected');
  setTimeout(()=>{buildLaneChips();goStep(4);},180);
}
function buildMasterChips(){
  $('subTierChips').innerHTML='';$('masterLpWrap').style.display='';$('masterLpLabel').textContent=t('masterLpLabel');
  const lp=t('masterLp');
  $('masterLpChips').innerHTML=lp.map((l,i)=>`<div class="chip" data-lp="${i}">${l}</div>`).join('');
  $('masterLpChips').querySelectorAll('.chip').forEach(e=>e.addEventListener('click',()=>selMLP(e,+e.dataset.lp)));
  goStep(3);
}
function selMLP(el,i){
  draft.masterLpIdx=i;draft.subTier=null;$('masterLpChips').querySelectorAll('.chip').forEach(c=>c.classList.remove('selected'));el.classList.add('selected');
  setTimeout(()=>{buildLaneChips();goStep(4);},180);
}
function buildLaneChips(){
  const ls=t('lanes');
  $('laneChips').innerHTML=LANE_KEYS.map((k,i)=>`<div class="chip" data-l="${k}">${ls[i]}</div>`).join('');
  $('laneChips').querySelectorAll('.chip').forEach(e=>e.addEventListener('click',()=>selLane(e,e.dataset.l)));
}
function selLane(el,lk){
  draft.laneKey=lk;$('laneChips').querySelectorAll('.chip').forEach(c=>c.classList.remove('selected'));el.classList.add('selected');
  setTimeout(()=>finishAdd(),180);
}
function finishAdd(){
  undoStack.push(JSON.parse(JSON.stringify(players)));
  const p={id:Date.now()+Math.random().toString(36).slice(2),name:draft.name,tierKey:draft.tierKey,subTier:draft.subTier||null,masterLpIdx:draft.masterLpIdx??null,laneKey:draft.laneKey||'상관없음',mustWith:draft.mustWith||[],avoidWith:draft.avoidWith||[]};
  players.push(p);save();updateUI();closeModal();showToast(`${p.name} ${t('toastAdded')}`);
}
