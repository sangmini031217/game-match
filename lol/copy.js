'use strict';
function copyToDiscord(){
  if(!matchResults.length)return;
  const c=matchResults[curIdx];if(!c)return;
  const l=getLang();
  const flip=Math.random()<.5;
  const bT=flip?c.teamA:c.teamB,rT=flip?c.teamB:c.teamA;
  const bS=flip?c.scoreA:c.scoreB,rS=flip?c.scoreB:c.scoreA;
  const li=p=>{const i=LANE_ORDER.indexOf(p.laneKey);return i<0?99:i;};
  const fmt=(team,lbl,sc)=>{
    const s=[...team].sort((a,b)=>li(a)-li(b));
    return`${lbl} (${t('totalScore')} ${sc.toFixed(1)})\n`+s.map(p=>`  🎮 [${LANE_LABEL[p.laneKey]||'·'}] ${p.name} — ${tierDisp(p,l)} (${calcScore(p).toFixed(1)}pt)`).join('\n');
  };
  const text=[
    `⚔️ **${t('resultTitle')}** ⚔️`,'',
    `🔵 ${fmt(bT,t('blueTeam'),bS)}`,'',
    `🔴 ${fmt(rT,t('redTeam'),rS)}`,'',
    `📊 ${t('comboLabel')} #${curIdx+1} / ${matchResults.length}`
  ].join('\n');
  navigator.clipboard.writeText(text).then(()=>showToast(t('toastCopied'))).catch(()=>{
    const ta=document.createElement('textarea');ta.value=text;document.body.appendChild(ta);ta.select();document.execCommand('copy');document.body.removeChild(ta);showToast(t('toastCopied'));
  });
}
