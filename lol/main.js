'use strict';
document.addEventListener('DOMContentLoaded',()=>{
  load();applyI18n();updateUI();

  // Lang
  document.querySelectorAll('.lang-btn').forEach(b=>b.addEventListener('click',()=>{setLangStorage(b.dataset.lang);applyI18n();updateUI();}));

  // Match size
  $('matchSizeSelect').addEventListener('change',e=>{
    matchSize=+e.target.value;localStorage.setItem('lol_matchSize',String(matchSize));
    if(players.length>getMax()){undoStack.push(JSON.parse(JSON.stringify(players)));players=players.slice(0,getMax());save();}
    $('resultScreen').classList.remove('active');$('placeholderCard').style.display='';updateUI();
  });

  // Simple mode
  $('simpleModeToggle').addEventListener('change',e=>{
    simpleMode=e.target.checked;localStorage.setItem('lol_simpleMode',String(simpleMode));updateUI();
  });

  // Buttons
  $('btnAdd').addEventListener('click',openModal);
  $('btnReset').addEventListener('click',resetAll);
  $('btnMatch').addEventListener('click',doMatch);
  $('btnUndo').addEventListener('click',undo);
  $('btnBack').addEventListener('click',backToMain);
  $('btnCopy').addEventListener('click',copyToDiscord);
  $('btnReroll').addEventListener('click',doReroll);

  // Modal
  $('modalCloseBtn').addEventListener('click',closeModal);
  $('modalBackBtn').addEventListener('click',prevStep);
  $('modalOverlay').addEventListener('click',e=>{if(e.target===$('modalOverlay'))closeModal();});
  $('inputName').addEventListener('keydown',e=>{if(e.key==='Enter')nextStep(1);});
  $('btnNext').addEventListener('click',()=>nextStep(1));

  // Edit modal
  $('editCloseBtn').addEventListener('click',closeEditModal);
  $('editOverlay').addEventListener('click',e=>{if(e.target===$('editOverlay'))closeEditModal();});

  // Conflict
  $('conflictCloseBtn').addEventListener('click',closeConflict);
  $('conflictCancelBtn').addEventListener('click',closeConflict);
  $('conflictForceBtn').addEventListener('click',forceMatch);
});
