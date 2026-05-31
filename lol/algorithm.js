'use strict';
function doMatch(){
  const max=getMax();if(players.length!==max)return;
  matchMode='normal';
  let r=gather(true,true);
  if(r.length){matchResults=r;curIdx=0;showRes(r[0]);return;}
  r=gather(true,false);
  if(r.length){matchMode='relaxed';matchResults=r;curIdx=0;showRes(r[0]);return;}
  showConflict();
}
function doReroll(){
  if(!matchResults.length)return;
  curIdx=(curIdx+1)%matchResults.length;
  showRes(matchResults[curIdx]);
  showToast(`${t('toastCombo')} #${curIdx+1} / ${matchResults.length}`);
}
function gather(aC,aB){
  const n=players.length,half=n/2,combos=[];
  const total=1<<n;
  for(let mask=0;mask<total;mask++){
    if(pc(mask)!==half)continue;
    const a=[],b=[];
    for(let i=0;i<n;i++){(mask&(1<<i)?a:b).push(players[i]);}
    if(aC&&!chkC(a,b))continue;
    const sA=a.reduce((s,p)=>s+calcScore(p),0),sB=b.reduce((s,p)=>s+calcScore(p),0);
    if(aB){
      if(Math.abs(Math.max(...a.map(calcScore))-Math.max(...b.map(calcScore)))>5)continue;
      if(!simpleMode&&!chkL(a,b))continue;
    }
    combos.push({teamA:a,teamB:b,scoreA:sA,scoreB:sB,diff:Math.abs(sA-sB)});
  }
  combos.sort((a,b)=>a.diff-b.diff);
  return combos.slice(0,200); // cap for performance
}
function pc(n){let c=0;while(n){c+=n&1;n>>=1;}return c;}
function chkC(a,b){
  const ids=new Set(a.map(p=>p.id));
  for(const p of[...a,...b]){const inA=ids.has(p.id);
    for(const m of(p.mustWith||[]))if(inA!==ids.has(m))return false;
    for(const v of(p.avoidWith||[]))if(inA===ids.has(v))return false;
  }return true;
}
function chkL(a,b){
  for(const lane of LANE_ORDER){const f='상관없음';
    const pA=a.filter(p=>p.laneKey===lane||p.laneKey===f);
    const pB=b.filter(p=>p.laneKey===lane||p.laneKey===f);
    if(!pA.length||!pB.length)continue;
    if(Math.abs(Math.max(...pA.map(calcScore))-Math.max(...pB.map(calcScore)))>7)return false;
  }return true;
}
function showConflict(){
  $('conflictTitle').textContent=t('conflictTitle');$('conflictMsg').textContent=t('conflictMsg');
  $('conflictCancelBtn').textContent=t('btnCancel');$('conflictForceBtn').textContent=t('btnForceMatch');
  $('conflictOverlay').classList.add('active');
}
function closeConflict(){$('conflictOverlay').classList.remove('active');}
function forceMatch(){closeConflict();matchMode='forced';matchResults=gather(false,false);curIdx=0;showRes(matchResults.length?matchResults[0]:null);}

function showRes(combo){
  $('placeholderCard').style.display='none';$('resultScreen').classList.add('active');
  $('resultTitle').textContent=t('resultTitle');$('balanceLabel').textContent=t('balanceLabel');
  const err=$('errorMsg'),warn=$('warnMsg'),bal=$('balanceSection'),tw=$('teamsWrapper');
  if(warn){warn.style.display=matchMode==='relaxed'?'':'none';if(matchMode==='relaxed')warn.textContent=t('warnRelaxed');}
  if(!combo){err.style.display='';err.textContent=t('errorMsg');bal.style.display='none';tw.innerHTML='';$('btnReroll').disabled=true;$('resultSubtitle').textContent=t('noCombo');return;}
  err.style.display='none';bal.style.display='';$('btnReroll').disabled=matchResults.length<=1;
  $('resultSubtitle').textContent=`${t('comboLabel')} #${curIdx+1} / ${matchResults.length}`;
  const flip=Math.random()<.5;
  const bT=flip?combo.teamA:combo.teamB,rT=flip?combo.teamB:combo.teamA;
  const bS=flip?combo.scoreA:combo.scoreB,rS=flip?combo.scoreB:combo.scoreA;
  const tot=bS+rS,pct=Math.round(bS/tot*100);
  $('blueBar').style.width=pct+'%';$('redBar').style.width=(100-pct)+'%';
  $('bluePct').textContent=pct+'%';$('redPct').textContent=(100-pct)+'%';
  tw.innerHTML=renderTeam(bT,bS,'blue')+renderTeam(rT,rS,'red');
}
function renderTeam(team,score,side){
  const l=getLang(),lbl=side==='blue'?t('blueTeam'):t('redTeam'),cls=side==='blue'?'team-blue':'team-red';
  const sorted=[...team].sort((a,b)=>{const ai=LANE_ORDER.indexOf(a.laneKey),bi=LANE_ORDER.indexOf(b.laneKey);return(ai<0?99:ai)-(bi<0?99:bi);});
  const rows=sorted.map(p=>`<div class="team-player-row"><div class="lane-badge">${LANE_LABEL[p.laneKey]||'·'}</div><div class="team-player-name">${esc(p.name)}</div><div class="team-player-tier">${tierDisp(p,l)} · ${calcScore(p).toFixed(1)}pt</div></div>`).join('');
  return`<div class="team-card ${cls}"><div class="team-header"><span>${lbl}</span><span class="team-score-badge">${t('totalScore')} ${score.toFixed(1)}</span></div><div class="team-player-list">${rows}</div></div>`;
}
function backToMain(){$('resultScreen').classList.remove('active');$('placeholderCard').style.display='';}
