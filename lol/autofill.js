'use strict';
let mobIdx=0;
function getNextMobName(){
  const available=JUNGLE_MOBS.filter(m=>!players.some(p=>p.name===m));
  if(!available.length)return'참가자'+(players.length+1);
  return available[mobIdx++%available.length];
}

function autoFill(){
  // This is now handled by the toggle — when toggle is on, openModal skips name step
  // The button now fills ALL remaining slots at once
  const max=getMax(),need=max-players.length;
  if(need<=0){showToast(t('emptyHint'));return;}
  undoStack.push(JSON.parse(JSON.stringify(players)));
  const tierPool=['실버','실버','골드','골드','골드','플래티넘'];
  for(let i=0;i<need;i++){
    const name=getNextMobName();
    const tier=tierPool[Math.floor(Math.random()*tierPool.length)];
    const sub=Math.floor(Math.random()*4)+1;
    const lane=LANE_KEYS[Math.floor(Math.random()*5)];
    players.push({
      id:Date.now()+Math.random().toString(36).slice(2),
      name,tierKey:tier,subTier:sub,masterLpIdx:null,
      laneKey:lane,mustWith:[],avoidWith:[]
    });
  }
  save();updateUI();showToast(t('btnAutoFill'));
}
