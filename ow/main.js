'use strict';
// ── OW TIER DATA ──
const OW_TIERS=['브론즈','실버','골드','플래티넘','다이아몬드','마스터','그랜드마스터','챔피언'];
const OW_TIERS_EN=['Bronze','Silver','Gold','Platinum','Diamond','Master','Grandmaster','Champion'];
const OW_TIERS_JA=['ブロンズ','シルバー','ゴールド','プラチナ','ダイヤ','マスター','グラマス','チャンピオン'];
const OW_TIERS_ZH=['青铜','白银','黄金','铂金','钻石','大师','宗师','冠军'];
const OW_SHORT=['B','S','G','P','D','M','GM','C'];
const OW_COLORS={'브론즈':'#A0522D','실버':'#708090','골드':'#B8860B','플래티넘':'#2E8B57','다이아몬드':'#4169E1','마스터':'#9B59B6','그랜드마스터':'#C0392B','챔피언':'#E67E22'};
const OW_SCORES={'브론즈':[1,1.5,2,2.5,3],'실버':[3.5,4,4.5,5,5.5],'골드':[6,6.5,7,7.5,8],'플래티넘':[9,9.5,10,10.5,11],'다이아몬드':[12,13,14,15,16],'마스터':[18,20,22,24,26],'그랜드마스터':[30,32,34,36,38],'챔피언':[42,44,46,48,50]};
const OW_ROLES_KO=['탱크','딜러','힐러','자유'];
const OW_ROLES_EN=['Tank','DPS','Support','Flex'];
const OW_ROLES_JA=['タンク','DPS','サポート','フレックス'];
const OW_ROLES_ZH=['坦克','输出','辅助','自由'];
const OW_ROLE_LABEL={'탱크':'T','딜러':'D','힐러':'H','자유':'F'};

// ── ANIMAL NICKNAMES ──
const ADJ_KO=['침착한','용감한','졸린','배고픈','신나는','수줍은','당당한','느긋한','호기심많은','엉뚱한'];
const ANIMAL_KO=['치와와','고양이','펭귄','수달','너구리','알파카','카피바라','미어캣','레서판다','북극여우'];

// ── STATE ──
let players=[],matchResults=[],curIdx=0,draft={},step=1,undoStack=[],simpleMode=false,nickIdx=0;

// ── HELPERS ──
function owCalcScore(p){const arr=OW_SCORES[p.tierKey];if(!arr)return 0;const sub=parseInt(p.subTier);if(isNaN(sub))return(arr[0]+arr[4])/2;return arr[Math.max(0,Math.min(4,5-sub))];}
function owTierDisp(p){const l=getLang();const tiers=l==='en'?OW_TIERS_EN:l==='ja'?OW_TIERS_JA:l==='zh'?OW_TIERS_ZH:OW_TIERS;const i=OW_TIERS.indexOf(p.tierKey);const n=tiers[i]||p.tierKey;return p.subTier?`${n} ${p.subTier}`:n;}
function owTierShort(p){const s=OW_SHORT[OW_TIERS.indexOf(p.tierKey)]||'?';return p.subTier?`${s}${p.subTier}`:s;}
function owRoleDisp(p){const l=getLang();const roles=l==='en'?OW_ROLES_EN:l==='ja'?OW_ROLES_JA:l==='zh'?OW_ROLES_ZH:OW_ROLES_KO;return roles[OW_ROLES_KO.indexOf(p.role)]||p.role;}
function getNextNick(){const adj=ADJ_KO[nickIdx%ADJ_KO.length];const animal=ANIMAL_KO[Math.floor(nickIdx/ADJ_KO.length)%ANIMAL_KO.length];nickIdx++;return`${adj} ${animal}`;}

function save(){localStorage.setItem('ow_players',JSON.stringify(players));}
function load(){try{players=JSON.parse(localStorage.getItem('ow_players')||'[]');}catch{players=[];}simpleMode=localStorage.getItem('ow_simpleMode')==='true';}

// ── I18N ──
const OW_I18N={
  ko:{appTitle:'오버워치 2',btnAdd:'참가자 추가',btnReset:'초기화',btnMatch:'팀 밸런스 맞추기',resultTitle:'팀 편성 완료',balanceLabel:'팀 점수 밸런스',btnBack:'돌아가기',btnReroll:'Reroll',btnCopy:'디스코드 복사',btnNext:'다음',btnDelete:'삭제',btnUndo:'되돌리기',autoNameLabel:'동물 별명 자동 배정',simpleMode:'티어 단독 매칭',scoreLabel:'점수',totalScore:'총점',comboLabel:'최적 조합',noCombo:'조합 없음',toastAdded:'등록 완료!',toastDeleted:'삭제됨',toastCopied:'클립보드에 복사됐어요',toastCombo:'조합',confirmReset:'모든 참가자를 초기화할까요?',sectionPlayers:'참가자',placeholderTitle:'팀이 구성되면 여기에 표시됩니다',placeholderSub:'10명을 등록하고 팀 밸런스 맞추기를 눌러주세요',guideAlgo:'알고리즘 안내: 역할(탱크/딜러/힐러)을 고려하여 양 팀의 평균 점수가 가장 비슷해지도록 조합을 계산합니다. 역할 배분이 완벽하지 않아도 매칭은 무조건 성사됩니다.',stepTitles:['이름 입력','티어 선택','세부 티어','역할 선택'],stepLabels:['Step 1 — 이름','Step 2 — 티어','Step 3 — 세부 티어','Step 4 — 역할'],nameRequired:'이름을 입력해주세요',inputPlaceholder:'배틀태그 입력',blueTeam:'BLUE 팀',redTeam:'RED 팀',btnSave:'저장',btnCancel:'취소',editTitle:'참가자 수정',editName:'이름',editTier:'티어',errorMsg:'매칭할 수 없습니다'},
  en:{appTitle:'Overwatch 2',btnAdd:'Add Player',btnReset:'Reset',btnMatch:'Balance Teams',resultTitle:'Teams Ready',balanceLabel:'Score Balance',btnBack:'Back',btnReroll:'Reroll',btnCopy:'Copy for Discord',btnNext:'Next',btnDelete:'Remove',btnUndo:'Undo',autoNameLabel:'Auto animal nicknames',simpleMode:'Simple Tier Match',scoreLabel:'Score',totalScore:'Total',comboLabel:'Best Combo',noCombo:'No Combo',toastAdded:'added!',toastDeleted:'removed',toastCopied:'Copied!',toastCombo:'Combo',confirmReset:'Reset all?',sectionPlayers:'Players',placeholderTitle:'Results here',placeholderSub:'Register 10 players',guideAlgo:'Algorithm: Considers roles (Tank/DPS/Support) and calculates combinations for the closest average score between teams. Matching always succeeds.',stepTitles:['Name','Tier','Sub Tier','Role'],stepLabels:['Step 1','Step 2','Step 3','Step 4'],nameRequired:'Enter a name',inputPlaceholder:'Battletag',blueTeam:'BLUE',redTeam:'RED',btnSave:'Save',btnCancel:'Cancel',editTitle:'Edit Player',editName:'Name',editTier:'Tier',errorMsg:'Cannot match'},
  ja:{appTitle:'オーバーウォッチ2',btnAdd:'追加',btnReset:'リセット',btnMatch:'バランス調整',resultTitle:'編成完了',balanceLabel:'スコアバランス',btnBack:'戻る',btnReroll:'リロール',btnCopy:'コピー',btnNext:'次へ',btnDelete:'削除',btnUndo:'元に戻す',autoNameLabel:'動物ニックネーム自動',simpleMode:'シンプルティア',scoreLabel:'スコア',totalScore:'合計',comboLabel:'最適組合せ',noCombo:'なし',toastAdded:'登録完了',toastDeleted:'削除',toastCopied:'コピーしました',toastCombo:'組合せ',confirmReset:'リセットしますか？',sectionPlayers:'プレイヤー',placeholderTitle:'結果表示エリア',placeholderSub:'10人登録してください',guideAlgo:'アルゴリズム: ロール(タンク/DPS/サポート)を考慮し、両チームの平均スコアが最も近くなるよう計算します。',stepTitles:['名前','ティア','サブ','ロール'],stepLabels:['Step 1','Step 2','Step 3','Step 4'],nameRequired:'名前を入力',inputPlaceholder:'バトルタグ',blueTeam:'BLUE',redTeam:'RED',btnSave:'保存',btnCancel:'キャンセル',editTitle:'編集',editName:'名前',editTier:'ティア',errorMsg:'マッチ不可'},
  zh:{appTitle:'守望先锋2',btnAdd:'添加',btnReset:'重置',btnMatch:'平衡队伍',resultTitle:'编排完成',balanceLabel:'分数平衡',btnBack:'返回',btnReroll:'重新分配',btnCopy:'复制',btnNext:'下一步',btnDelete:'删除',btnUndo:'撤销',autoNameLabel:'自动动物昵称',simpleMode:'简单段位',scoreLabel:'分数',totalScore:'总分',comboLabel:'最优组合',noCombo:'无',toastAdded:'完成',toastDeleted:'已删除',toastCopied:'已复制',toastCombo:'组合',confirmReset:'确定重置？',sectionPlayers:'玩家',placeholderTitle:'结果显示区',placeholderSub:'注册10人后点击平衡',guideAlgo:'算法: 考虑职责(坦克/输出/辅助)，计算两队平均分最接近的组合。',stepTitles:['名称','段位','细分','职责'],stepLabels:['Step 1','Step 2','Step 3','Step 4'],nameRequired:'请输入',inputPlaceholder:'战网ID',blueTeam:'蓝队',redTeam:'红队',btnSave:'保存',btnCancel:'取消',editTitle:'编辑',editName:'名称',editTier:'段位',errorMsg:'无法匹配'},
};
function ot(k){const l=getLang();return OW_I18N[l]?.[k]??OW_I18N.ko[k]??k;}

// ── UI ──
function applyI18n(){
  const l=getLang();document.documentElement.lang=l==='zh'?'zh-CN':l;
  document.querySelectorAll('.lang-btn').forEach(b=>b.classList.toggle('active',b.dataset.lang===l));
  const s=(id,val)=>{const el=$(id);if(el)el.textContent=val;};
  s('appTitle',ot('appTitle'));s('btnAddText',ot('btnAdd'));s('btnReset',ot('btnReset'));
  s('btnMatchText',ot('btnMatch'));s('placeholderTitle',ot('placeholderTitle'));s('placeholderSub',ot('placeholderSub'));
  s('sectionLabelPlayers',ot('sectionPlayers'));s('btnBack',ot('btnBack'));s('btnCopyText',ot('btnCopy'));
  s('btnRerollText',ot('btnReroll'));s('btnUndo','↩ '+ot('btnUndo'));
  s('autoNameLabel',ot('autoNameLabel'));s('simpleModeLabel',ot('simpleMode'));
  s('btnNext',ot('btnNext'));s('balanceLabel',ot('balanceLabel'));
  s('guideAlgo','⚖️ '+ot('guideAlgo'));s('algoInfoText','⚖️ '+ot('guideAlgo'));
  const inp=$('inputName');if(inp)inp.placeholder=ot('inputPlaceholder');
  for(let i=1;i<=4;i++){const e=$('stepLabel'+i);if(e)e.textContent=ot('stepLabels')[i-1];}
}

function updateUI(){
  const n=players.length;
  $('countNum').textContent=n;$('countTotal').textContent='10';
  $('countProgress').style.width=(n/10*100)+'%';
  $('btnAdd').style.display=n>=10?'none':'';$('btnReset').style.display=n>0?'':'none';
  $('btnMatchWrap').style.display=n===10?'':'none';
  $('btnUndo').style.display=undoStack.length?'':'none';
  const sm=$('simpleModeToggle');if(sm)sm.checked=simpleMode;
  $('sectionLabelPlayers').style.display=n>0?'':'none';$('playerListCard').style.display=n>0?'':'none';
  renderGrid();
}

function renderGrid(){
  const g=$('playerGrid');if(!players.length){g.innerHTML='';return;}
  g.innerHTML=players.map((p,i)=>{
    const sc=owCalcScore(p).toFixed(1),ts=owTierDisp(p),sh=owTierShort(p),c=OW_COLORS[p.tierKey]||'#6B7684';
    const role=owRoleDisp(p);
    return`<div class="player-item" data-idx="${i}"><div class="tier-badge" style="color:${c};background:${c}18">${sh}</div><div class="player-info"><div class="player-name">${esc(p.name)}</div><div class="player-meta">${ts} · ${role}</div><span class="score-pill">${ot('scoreLabel')} ${sc}</span></div><button class="btn btn-danger" data-rm="${i}">${ot('btnDelete')}</button></div>`;
  }).join('');
  g.querySelectorAll('[data-rm]').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();rmPlayer(+b.dataset.rm);}));
  g.querySelectorAll('.player-item').forEach(el=>el.addEventListener('click',()=>openEditModal(+el.dataset.idx)));
}
function rmPlayer(i){undoStack.push(JSON.parse(JSON.stringify(players)));const r=players[i];players.splice(i,1);save();updateUI();showToast(`${r.name} ${ot('toastDeleted')}`);}
function resetAll(){if(!confirm(ot('confirmReset')))return;undoStack.push(JSON.parse(JSON.stringify(players)));players=[];matchResults=[];curIdx=0;save();$('resultScreen').classList.remove('active');$('placeholderCard').style.display='';updateUI();}
function undo(){if(!undoStack.length)return;players=undoStack.pop();save();updateUI();showToast(ot('btnUndo'));}

// ── EDIT MODAL ──
function openEditModal(idx){
  const p=players[idx];if(!p)return;
  $('editModalTitle').textContent=ot('editTitle');
  const l=getLang(),tiers=l==='en'?OW_TIERS_EN:l==='ja'?OW_TIERS_JA:l==='zh'?OW_TIERS_ZH:OW_TIERS;
  const body=$('editModalBody');
  body.innerHTML=`
    <div class="edit-section"><div class="edit-section-title">${ot('editName')}</div><input class="input-field" id="editNameInput" value="${esc(p.name)}" maxlength="20"></div>
    <div class="edit-section"><div class="edit-section-title">${ot('editTier')}</div><div class="chip-grid" id="editTierGrid">${OW_TIERS.map((k,i)=>`<div class="chip${k===p.tierKey?' selected':''}" data-t="${k}">${tiers[i]}</div>`).join('')}</div></div>
    <div style="display:flex;gap:8px;margin-top:16px"><button class="btn btn-ghost" style="flex:1" id="editCancelBtn">${ot('btnCancel')}</button><button class="btn btn-primary" style="flex:1" id="editSaveBtn">${ot('btnSave')}</button></div>
  `;
  body.querySelectorAll('#editTierGrid .chip').forEach(c=>c.addEventListener('click',()=>{body.querySelectorAll('#editTierGrid .chip').forEach(x=>x.classList.remove('selected'));c.classList.add('selected');}));
  $('editCancelBtn').addEventListener('click',closeEditModal);
  $('editSaveBtn').addEventListener('click',()=>{
    undoStack.push(JSON.parse(JSON.stringify(players)));
    p.name=$('editNameInput').value.trim()||p.name;
    const sel=body.querySelector('#editTierGrid .chip.selected');
    if(sel)p.tierKey=sel.dataset.t;
    save();updateUI();closeEditModal();showToast(ot('btnSave'));
  });
  $('editOverlay').classList.add('active');
}
function closeEditModal(){$('editOverlay').classList.remove('active');}

// ── MODAL ──
function openModal(){
  if(players.length>=10)return;draft={};step=1;
  const autoName=$('autoNameToggle').checked;
  if(autoName){draft.name=getNextNick();$('stepIndicator').innerHTML=[1,2].map(i=>`<div class="step-dot" id="dot${i}"></div>`).join('');buildTierChips();goStep(2);}
  else{const steps=simpleMode?3:4;$('stepIndicator').innerHTML=Array.from({length:steps},(_,i)=>`<div class="step-dot" id="dot${i+1}"></div>`).join('');goStep(1);$('inputName').value='';$('inputName').placeholder=ot('inputPlaceholder');}
  $('modalOverlay').classList.add('active');
  if(!autoName)setTimeout(()=>$('inputName').focus(),300);
}
function closeModal(){$('modalOverlay').classList.remove('active');}
function goStep(n){for(let i=1;i<=4;i++){const el=$('step'+i);if(el)el.classList.toggle('active',i===n);}step=n;for(let i=1;i<=4;i++){const d=$('dot'+i);if(d)d.className='step-dot'+(i<n?' done':i===n?' active':'');}const mt=$('modalTitle');if(mt)mt.textContent=ot('stepTitles')[n-1]||'';for(let i=1;i<=4;i++){const e=$('stepLabel'+i);if(e)e.textContent=ot('stepLabels')[i-1]||'';}const nx=$('btnNext');if(nx)nx.textContent=ot('btnNext');}
function nextStep(f){if(f===1){const nm=$('inputName').value.trim();if(!nm){showToast(ot('nameRequired'));return;}draft.name=nm;buildTierChips();goStep(2);}}
function buildTierChips(){const l=getLang(),tiers=l==='en'?OW_TIERS_EN:l==='ja'?OW_TIERS_JA:l==='zh'?OW_TIERS_ZH:OW_TIERS;$('tierChips').innerHTML=OW_TIERS.map((k,i)=>`<div class="chip" data-t="${k}">${tiers[i]}</div>`).join('');$('tierChips').querySelectorAll('.chip').forEach(e=>e.addEventListener('click',()=>selTier(e,e.dataset.t)));}
function selTier(el,tk){draft.tierKey=tk;$('tierChips').querySelectorAll('.chip').forEach(c=>c.classList.remove('selected'));el.classList.add('selected');setTimeout(()=>{if(simpleMode){draft.subTier=null;buildRoleChips();goStep(4);}else{buildSubChips(tk);goStep(3);}},180);}
function buildSubChips(tk){const l=getLang(),tiers=l==='en'?OW_TIERS_EN:l==='ja'?OW_TIERS_JA:l==='zh'?OW_TIERS_ZH:OW_TIERS;const tn=tiers[OW_TIERS.indexOf(tk)];$('subTierChips').innerHTML=[5,4,3,2,1].map(n=>`<div class="chip" data-s="${n}">${tn} ${n}</div>`).join('');$('subTierChips').querySelectorAll('.chip').forEach(e=>e.addEventListener('click',()=>selSub(e,+e.dataset.s)));}
function selSub(el,n){draft.subTier=n;$('subTierChips').querySelectorAll('.chip').forEach(c=>c.classList.remove('selected'));el.classList.add('selected');setTimeout(()=>{buildRoleChips();goStep(4);},180);}
function buildRoleChips(){const l=getLang(),roles=l==='en'?OW_ROLES_EN:l==='ja'?OW_ROLES_JA:l==='zh'?OW_ROLES_ZH:OW_ROLES_KO;$('roleChips').innerHTML=OW_ROLES_KO.map((k,i)=>`<div class="chip" data-r="${k}">${roles[i]}</div>`).join('');$('roleChips').querySelectorAll('.chip').forEach(e=>e.addEventListener('click',()=>selRole(e,e.dataset.r)));}
function selRole(el,r){draft.role=r;$('roleChips').querySelectorAll('.chip').forEach(c=>c.classList.remove('selected'));el.classList.add('selected');setTimeout(()=>finishAdd(),180);}
function finishAdd(){undoStack.push(JSON.parse(JSON.stringify(players)));players.push({id:Date.now()+Math.random().toString(36).slice(2),name:draft.name,tierKey:draft.tierKey,subTier:draft.subTier||null,role:draft.role||'자유',mustWith:[],avoidWith:[]});save();updateUI();closeModal();showToast(`${draft.name} ${ot('toastAdded')}`);}

// ── ALGORITHM (greedy best-diff, role-aware) ──
function doMatch(){
  if(players.length!==10)return;
  matchResults=[];curIdx=0;
  // Try all C(10,5) combos, sort by score diff
  const combos=[];
  for(let mask=0;mask<1024;mask++){
    if(pc(mask)!==5)continue;
    const a=[],b=[];for(let i=0;i<10;i++){(mask&(1<<i)?a:b).push(players[i]);}
    const sA=a.reduce((s,p)=>s+owCalcScore(p),0),sB=b.reduce((s,p)=>s+owCalcScore(p),0);
    combos.push({teamA:a,teamB:b,scoreA:sA,scoreB:sB,diff:Math.abs(sA-sB)});
  }
  combos.sort((a,b)=>a.diff-b.diff);
  matchResults=combos.slice(0,200);
  showRes(matchResults[0]);
}
function pc(n){let c=0;while(n){c+=n&1;n>>=1;}return c;}
function doReroll(){if(!matchResults.length)return;curIdx=(curIdx+1)%matchResults.length;showRes(matchResults[curIdx]);showToast(`${ot('toastCombo')} #${curIdx+1} / ${matchResults.length}`);}

function showRes(combo){
  $('placeholderCard').style.display='none';$('resultScreen').classList.add('active');
  const s=(id,val)=>{const el=$(id);if(el)el.textContent=val;};
  s('resultTitle',ot('resultTitle'));s('balanceLabel',ot('balanceLabel'));s('algoInfoText','⚖️ '+ot('guideAlgo'));
  if(!combo){s('errorMsg',ot('errorMsg'));$('errorMsg').style.display='';$('balanceSection').style.display='none';$('teamsWrapper').innerHTML='';$('btnReroll').disabled=true;s('resultSubtitle',ot('noCombo'));return;}
  $('errorMsg').style.display='none';$('balanceSection').style.display='';
  $('btnReroll').disabled=matchResults.length<=1;
  s('resultSubtitle',`${ot('comboLabel')} #${curIdx+1} / ${matchResults.length}`);
  const flip=Math.random()<.5;
  const bT=flip?combo.teamA:combo.teamB,rT=flip?combo.teamB:combo.teamA;
  const bS=flip?combo.scoreA:combo.scoreB,rS=flip?combo.scoreB:combo.scoreA;
  const tot=bS+rS,pct=Math.round(bS/tot*100);
  $('blueBar').style.width=pct+'%';$('redBar').style.width=(100-pct)+'%';$('bluePct').textContent=pct+'%';$('redPct').textContent=(100-pct)+'%';
  $('teamsWrapper').innerHTML=renderTeam(bT,bS,'blue')+renderTeam(rT,rS,'red');
}
function renderTeam(team,score,side){
  const lbl=side==='blue'?ot('blueTeam'):ot('redTeam'),cls=side==='blue'?'team-blue':'team-red';
  const rows=team.map(p=>`<div class="team-player-row"><div class="lane-badge">${OW_ROLE_LABEL[p.role]||'F'}</div><div class="team-player-name">${esc(p.name)}</div><div class="team-player-tier">${owTierDisp(p)} · ${owRoleDisp(p)} · ${owCalcScore(p).toFixed(1)}pt</div></div>`).join('');
  return`<div class="team-card ${cls}"><div class="team-header"><span>${lbl}</span><span class="team-score-badge">${ot('totalScore')} ${score.toFixed(1)}</span></div><div class="team-player-list">${rows}</div></div>`;
}
function backToMain(){$('resultScreen').classList.remove('active');$('placeholderCard').style.display='';}

// ── COPY ──
function copyToDiscord(){
  if(!matchResults.length)return;const c=matchResults[curIdx];if(!c)return;
  const flip=Math.random()<.5;const bT=flip?c.teamA:c.teamB,rT=flip?c.teamB:c.teamA;
  const bS=flip?c.scoreA:c.scoreB,rS=flip?c.scoreB:c.scoreA;
  const fmt=(team,lbl,sc)=>`${lbl} (${ot('totalScore')} ${sc.toFixed(1)})\n`+team.map(p=>`  🎮 [${OW_ROLE_LABEL[p.role]||'F'}] ${p.name} — ${owTierDisp(p)} (${owCalcScore(p).toFixed(1)}pt)`).join('\n');
  const txt=[`⚔️ **${ot('resultTitle')}** ⚔️`,'',`🔵 ${fmt(bT,ot('blueTeam'),bS)}`,'',`🔴 ${fmt(rT,ot('redTeam'),rS)}`,'',`📊 ${ot('comboLabel')} #${curIdx+1}`].join('\n');
  navigator.clipboard.writeText(txt).then(()=>showToast(ot('toastCopied'))).catch(()=>{const ta=document.createElement('textarea');ta.value=txt;document.body.appendChild(ta);ta.select();document.execCommand('copy');document.body.removeChild(ta);showToast(ot('toastCopied'));});
}

// ── INIT ──
document.addEventListener('DOMContentLoaded',()=>{
  load();applyI18n();updateUI();
  document.querySelectorAll('.lang-btn').forEach(b=>b.addEventListener('click',()=>{setLangStorage(b.dataset.lang);applyI18n();updateUI();}));
  $('simpleModeToggle').addEventListener('change',e=>{simpleMode=e.target.checked;localStorage.setItem('ow_simpleMode',String(simpleMode));updateUI();});
  $('btnAdd').addEventListener('click',openModal);$('btnReset').addEventListener('click',resetAll);$('btnMatch').addEventListener('click',doMatch);
  $('btnUndo').addEventListener('click',undo);$('btnBack').addEventListener('click',backToMain);$('btnCopy').addEventListener('click',copyToDiscord);$('btnReroll').addEventListener('click',doReroll);
  $('modalCloseBtn').addEventListener('click',closeModal);$('modalOverlay').addEventListener('click',e=>{if(e.target===$('modalOverlay'))closeModal();});
  $('inputName').addEventListener('keydown',e=>{if(e.key==='Enter')nextStep(1);});$('btnNext').addEventListener('click',()=>nextStep(1));
  $('editCloseBtn').addEventListener('click',closeEditModal);$('editOverlay').addEventListener('click',e=>{if(e.target===$('editOverlay'))closeEditModal();});
});
