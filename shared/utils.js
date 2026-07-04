'use strict';
const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

function showToast(msg,dur=2200){
  const el=$('toast');if(!el)return;
  el.textContent=msg;el.classList.add('show');
  setTimeout(()=>el.classList.remove('show'),dur);
}

function calcScore(p){
  const k=p.tierKey;
  if(k==='그랜드마스터')return 32;
  if(k==='챌린저')return 40;
  if(k==='마스터')return MASTER_LP_SCORES[p.masterLpIdx]??21;
  const a=SCORES[k];if(!a)return 0;
  const sub=parseInt(p.subTier);
  if(isNaN(sub))return(a[0]+a[3])/2; // simple mode: average
  return a[Math.max(0,Math.min(3,4-sub))];
}

function tierDisp(p,lang){
  const tiers=(typeof I18N!=='undefined'&&I18N[lang])?I18N[lang].tiers:TIER_KEYS;
  const i=TIER_KEYS.indexOf(p.tierKey),n=tiers[i]||p.tierKey;
  if(NO_SUB.includes(p.tierKey)){
    if(p.tierKey==='마스터'){
      const lp=(typeof I18N!=='undefined'&&I18N[lang])?I18N[lang].masterLp:['저점','고점'];
      return`${n} (${lp[p.masterLpIdx]||''})`;
    }
    return n;
  }
  return p.subTier?`${n} ${p.subTier}`:n;
}

function tierShort(p,lang){
  const shorts=(typeof I18N!=='undefined'&&I18N[lang])?I18N[lang].tierShort:['I','B','S','G','P','E','D','M','GM','C'];
  const s=shorts[TIER_KEYS.indexOf(p.tierKey)]||'?';
  return NO_SUB.includes(p.tierKey)?s:(p.subTier?`${s}${p.subTier}`:s);
}

function laneDisp(k,lang){
  const lanes=(typeof I18N!=='undefined'&&I18N[lang])?I18N[lang].lanes:LANE_KEYS;
  return lanes[LANE_KEYS.indexOf(k)]||k;
}

function getLang(){return localStorage.getItem('tm_lang')||'ko';}
function setLangStorage(l){localStorage.setItem('tm_lang',l);}

// Dark mode
function getDarkMode(){return localStorage.getItem('tm_dark')==='true';}
function setDarkMode(on){
  localStorage.setItem('tm_dark',String(on));
  document.documentElement.setAttribute('data-theme',on?'dark':'light');
  const btn=document.getElementById('darkModeBtn');
  if(btn)btn.textContent=on?'☀️':'🌙';
}
function initDarkMode(){
  const saved=getDarkMode();
  document.documentElement.setAttribute('data-theme',saved?'dark':'light');
  const btn=document.getElementById('darkModeBtn');
  if(btn){btn.textContent=saved?'☀️':'🌙';btn.addEventListener('click',()=>setDarkMode(!getDarkMode()));}
}

// Favorites
function getFavorites(game){const key='tm_favorites_'+(game||'lol');try{return JSON.parse(localStorage.getItem(key)||'[]');}catch{return[];}}
function saveFavorites(favs,game){const key='tm_favorites_'+(game||'lol');localStorage.setItem(key,JSON.stringify(favs));}
function addFavorite(player,game){
  const favs=getFavorites(game);
  const exists=favs.find(f=>f.name===player.name&&f.tierKey===player.tierKey&&f.subTier===player.subTier);
  if(exists)return false;
  favs.push({name:player.name,tierKey:player.tierKey,subTier:player.subTier,masterLpIdx:player.masterLpIdx??null,laneKey:player.laneKey||'상관없음',role:player.role||null});
  saveFavorites(favs,game);
  return true;
}
function removeFavorite(idx,game){
  const favs=getFavorites(game);
  favs.splice(idx,1);
  saveFavorites(favs,game);
}
