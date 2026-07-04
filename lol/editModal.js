'use strict';
function openEditModal(idx){
  const p=players[idx];if(!p)return;
  const l=getLang();
  $('editModalTitle').textContent=t('editTitle');
  const body=$('editModalBody');
  const tiers=t('tiers');
  const others=players.filter((_,i)=>i!==idx);

  body.innerHTML=`
    <div class="edit-section">
      <div class="edit-section-title">${t('editName')}</div>
      <input class="input-field" id="editNameInput" value="${esc(p.name)}" maxlength="20">
    </div>
    <div class="edit-section">
      <div class="edit-section-title">${t('editTier')}</div>
      <div class="chip-grid" id="editTierGrid">${TIER_KEYS.map((k,i)=>`<div class="chip${k===p.tierKey?' selected':''}" data-t="${k}">${tiers[i]}</div>`).join('')}</div>
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

  // tier selection in edit
  body.querySelectorAll('#editTierGrid .chip').forEach(c=>c.addEventListener('click',()=>{
    body.querySelectorAll('#editTierGrid .chip').forEach(x=>x.classList.remove('selected'));
    c.classList.add('selected');
  }));

  $('editCancelBtn').addEventListener('click',closeEditModal);
  $('editSaveBtn').addEventListener('click',()=>{
    undoStack.push(JSON.parse(JSON.stringify(players)));
    p.name=$('editNameInput').value.trim()||p.name;
    const selTier=body.querySelector('#editTierGrid .chip.selected');
    if(selTier)p.tierKey=selTier.dataset.t;
    if(NO_SUB.includes(p.tierKey))p.subTier=null;
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
