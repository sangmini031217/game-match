'use strict';
function openEditModal(idx){
  const p=players[idx];if(!p)return;
  const l=getLang();
  $('editModalTitle').textContent=t('editTitle');
  const body=$('editModalBody');
  const tiers=t('tiers');
  const lanes=t('lanes');
  const others=players.filter((_,i)=>i!==idx);
  const curTierIdx=TIER_KEYS.indexOf(p.tierKey);
  const showSub=!NO_SUB.includes(p.tierKey);

  body.innerHTML=`
    <div class="edit-section">
      <div class="edit-section-title">${t('editName')}</div>
      <input class="input-field" id="editNameInput" value="${esc(p.name)}" maxlength="20">
    </div>
    <div class="edit-section">
      <div class="edit-section-title">${t('editTier')}</div>
      <div class="chip-grid" id="editTierGrid">${TIER_KEYS.map((k,i)=>`<div class="chip${k===p.tierKey?' selected':''}" data-t="${k}">${tiers[i]}</div>`).join('')}</div>
    </div>
    <div class="edit-section" id="editSubSection" style="${showSub?'':'display:none'}">
      <div class="edit-section-title">${t('stepLabels')[2]||'세부 티어'}</div>
      <div class="chip-grid" id="editSubGrid">${[4,3,2,1].map(n=>`<div class="chip${p.subTier===n?' selected':''}" data-s="${n}">${tiers[curTierIdx]||''} ${n}</div>`).join('')}</div>
    </div>
    <div class="edit-section">
      <div class="edit-section-title">${t('stepLabels')[3]||'라인'}</div>
      <div class="chip-grid" id="editLaneGrid">${LANE_KEYS.map((k,i)=>`<div class="chip${k===p.laneKey?' selected':''}" data-l="${k}">${lanes[i]}</div>`).join('')}</div>
    </div>
    <div class="edit-section">
      <div class="edit-section-title">${t('editMust')}</div>
      <div class="edit-check-list" id="editMustList">${others.map(o=>`<label class="edit-check-item"><input type="checkbox" data-id="${o.id}" ${(p.mustWith||[]).includes(o.id)?'checked':''}>${esc(o.name)}</label>`).join('')}</div>
    </div>
    <div class="edit-section">
      <div class="edit-section-title">${t('editAvoid')}</div>
      <div class="edit-check-list" id="editAvoidList">${others.map(o=>`<label class="edit-check-item"><input type="checkbox" data-id="${o.id}" ${(p.avoidWith||[]).includes(o.id)?'checked':''}>${esc(o.name)}</label>`).join('')}</div>
    </div>
    <div style="display:flex;gap:8px;margin-top:16px">
      <button class="btn btn-ghost" style="flex:1" id="editCancelBtn">${t('btnCancel')}</button>
      <button class="btn btn-primary" style="flex:1" id="editSaveBtn">${t('btnSave')}</button>
    </div>
    <button class="btn btn-ghost" style="width:100%;margin-top:8px" id="editFavBtn">${t('favAdd')}</button>
  `;

  // Tier selection — update sub tier chips when tier changes
  body.querySelectorAll('#editTierGrid .chip').forEach(c=>c.addEventListener('click',()=>{
    body.querySelectorAll('#editTierGrid .chip').forEach(x=>x.classList.remove('selected'));
    c.classList.add('selected');
    const tk=c.dataset.t;
    const subSec=$('editSubSection');
    if(NO_SUB.includes(tk)){
      subSec.style.display='none';
    }else{
      subSec.style.display='';
      const tn=tiers[TIER_KEYS.indexOf(tk)];
      $('editSubGrid').innerHTML=[4,3,2,1].map(n=>`<div class="chip" data-s="${n}">${tn} ${n}</div>`).join('');
      $('editSubGrid').querySelectorAll('.chip').forEach(sc=>sc.addEventListener('click',()=>{
        $('editSubGrid').querySelectorAll('.chip').forEach(x=>x.classList.remove('selected'));
        sc.classList.add('selected');
      }));
    }
  }));

  // Sub tier selection
  body.querySelectorAll('#editSubGrid .chip').forEach(c=>c.addEventListener('click',()=>{
    body.querySelectorAll('#editSubGrid .chip').forEach(x=>x.classList.remove('selected'));
    c.classList.add('selected');
  }));

  // Lane selection
  body.querySelectorAll('#editLaneGrid .chip').forEach(c=>c.addEventListener('click',()=>{
    body.querySelectorAll('#editLaneGrid .chip').forEach(x=>x.classList.remove('selected'));
    c.classList.add('selected');
  }));

  $('editCancelBtn').addEventListener('click',closeEditModal);
  $('editSaveBtn').addEventListener('click',()=>{
    undoStack.push(JSON.parse(JSON.stringify(players)));
    p.name=$('editNameInput').value.trim()||p.name;
    const selTier=body.querySelector('#editTierGrid .chip.selected');
    if(selTier)p.tierKey=selTier.dataset.t;
    if(NO_SUB.includes(p.tierKey)){
      p.subTier=null;
    }else{
      const selSub=body.querySelector('#editSubGrid .chip.selected');
      if(selSub)p.subTier=+selSub.dataset.s;
    }
    const selLane=body.querySelector('#editLaneGrid .chip.selected');
    if(selLane)p.laneKey=selLane.dataset.l;
    p.mustWith=[];body.querySelectorAll('#editMustList input:checked').forEach(cb=>p.mustWith.push(cb.dataset.id));
    p.avoidWith=[];body.querySelectorAll('#editAvoidList input:checked').forEach(cb=>p.avoidWith.push(cb.dataset.id));
    save();updateUI();closeEditModal();showToast(t('btnSave'));
  });
  $('editFavBtn').addEventListener('click',()=>{
    const ok=addFavorite(p,'lol');
    showToast(ok?t('favAdded'):t('favExists'));
    if(ok&&typeof renderFavList==='function')renderFavList();
  });

  $('editOverlay').classList.add('active');
}
function closeEditModal(){$('editOverlay').classList.remove('active');}
