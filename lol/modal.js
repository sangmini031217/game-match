'use strict';
let draft={},curStep=1,modalTotalSteps=4;

function openModal(){
  if(players.length>=getMax())return;
  draft={mustWith:[],avoidWith:[]};curStep=1;
  const autoName=$('autoNameToggle').checked;
  if(autoName){
    draft.name=getNextMobName();
    modalTotalSteps=simpleMode?2:3; // tier, lane  OR  tier, sub, lane
    $('stepIndicator').innerHTML=Array.from({length:modalTotalSteps},(_,i)=>`<div class="step-dot" id="dot${i+1}"></div>`).join('');
    buildTierChips();showStep(1,2);
  } else {
    modalTotalSteps=simpleMode?3:4; // name, tier, lane  OR  name, tier, sub, lane
    $('stepIndicator').innerHTML=Array.from({length:modalTotalSteps},(_,i)=>`<div class="step-dot" id="dot${i+1}"></div>`).join('');
    showStep(1);$('inputName').value='';$('inputName').placeholder=t('inputPlaceholder');
  }
  $('modalOverlay').classList.add('active');
  if(!autoName)setTimeout(()=>$('inputName').focus(),300);
}
function closeModal(){$('modalOverlay').classList.remove('active');}

// stepNum = visual step (1-based), panelId = which step-panel to show
let currentPanel=1;
function showStep(visualStep,panelId){
  if(panelId===undefined)panelId=visualStep;
  currentPanel=panelId;curStep=visualStep;
  for(let i=1;i<=4;i++){const el=$('step'+i);if(el)el.classList.toggle('active',i===panelId);}
  for(let i=1;i<=modalTotalSteps;i++){const d=$('dot'+i);if(d)d.className='step-dot'+(i<visualStep?' done':i===visualStep?' active':'');}
  $('modalTitle').textContent=t('stepTitles')[panelId-1]||'';
  for(let i=1;i<=4;i++){const e=$('stepLabel'+i);if(e)e.textContent=t('stepLabels')[i-1]||'';}
  const ml=$('masterLpLabel');if(ml)ml.textContent=t('masterLpLabel');
  const nx=$('btnNext');if(nx)nx.textContent=t('btnNext');
  const back=$('modalBackBtn');if(back)back.style.display=visualStep>1?'':'none';
}
function prevStep(){
  // Go back based on current panel
  const autoName=$('autoNameToggle').checked;
  if(currentPanel===4){
    // lane → go back to sub/tier
    if(simpleMode||NO_SUB.includes(draft.tierKey)){showStep(autoName?1:2,2);}
    else{showStep(autoName?2:3,3);}
  }else if(currentPanel===3){
    showStep(autoName?1:2,2);
  }else if(currentPanel===2){
    if(!autoName)showStep(1,1);
  }
}

function nextStep(from){
  if(from===1){
    const nm=$('inputName').value.trim();
    if(!nm){showToast(t('nameRequired'));return;}
    draft.name=nm;buildTierChips();
    showStep(2,2);
  }
}

function buildTierChips(){
  const ts=t('tiers');
  $('tierChips').innerHTML=TIER_KEYS.map((k,i)=>`<div class="chip" data-t="${k}">${ts[i]}</div>`).join('');
  $('tierChips').querySelectorAll('.chip').forEach(e=>e.addEventListener('click',()=>selTier(e,e.dataset.t)));
}
function selTier(el,tk){
  draft.tierKey=tk;$('tierChips').querySelectorAll('.chip').forEach(c=>c.classList.remove('selected'));el.classList.add('selected');
  const autoName=$('autoNameToggle').checked;
  setTimeout(()=>{
    if(simpleMode){
      draft.subTier=null;draft.masterLpIdx=null;
      buildLaneChips();showStep(autoName?2:3,4);return;
    }
    if(NO_SUB.includes(tk)){
      if(tk==='마스터'){buildMasterChips();showStep(autoName?2:3,3);}
      else{draft.subTier=null;draft.masterLpIdx=null;buildLaneChips();showStep(autoName?2:3,4);}
    }else{buildSubChips(tk);showStep(autoName?2:3,3);}
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
  const autoName=$('autoNameToggle').checked;
  setTimeout(()=>{buildLaneChips();showStep(autoName?3:4,4);},180);
}
function buildMasterChips(){
  $('subTierChips').innerHTML='';$('masterLpWrap').style.display='';$('masterLpLabel').textContent=t('masterLpLabel');
  const lp=t('masterLp');
  $('masterLpChips').innerHTML=lp.map((l,i)=>`<div class="chip" data-lp="${i}">${l}</div>`).join('');
  $('masterLpChips').querySelectorAll('.chip').forEach(e=>e.addEventListener('click',()=>selMLP(e,+e.dataset.lp)));
}
function selMLP(el,i){
  draft.masterLpIdx=i;draft.subTier=null;$('masterLpChips').querySelectorAll('.chip').forEach(c=>c.classList.remove('selected'));el.classList.add('selected');
  const autoName=$('autoNameToggle').checked;
  setTimeout(()=>{buildLaneChips();showStep(autoName?3:4,4);},180);
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
