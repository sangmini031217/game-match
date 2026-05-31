'use strict';
const T={
  ko:{subtitle:'게임 모드를 선택해주세요',lolTitle:'리그 오브 레전드',lolDesc:'10명을 두 팀으로 나눠 티어 밸런스를 맞춰줍니다',tftTitle:'롤토체스 더블업',tftDesc:'짝수 인원을 2인 1조로 균등하게 매칭합니다'},
  en:{subtitle:'Select a game mode',lolTitle:'League of Legends',lolDesc:'Splits 10 players into two balanced teams by tier',tftTitle:'TFT Double Up',tftDesc:'Pairs even-numbered players into balanced duos'},
  ja:{subtitle:'ゲームモードを選択してください',lolTitle:'リーグ・オブ・レジェンド',lolDesc:'10人を2チームに分けてティアバランスを調整します',tftTitle:'TFTダブルアップ',tftDesc:'偶数人数を2人1組で均等にマッチングします'},
  zh:{subtitle:'请选择游戏模式',lolTitle:'英雄联盟',lolDesc:'将10人分为两队并平衡段位',tftTitle:'云顶双人作战',tftDesc:'将偶数玩家均等配对为2人组'},
};
function getLang(){return localStorage.getItem('tm_lang')||'ko';}
function setLang(l){
  localStorage.setItem('tm_lang',l);
  document.querySelectorAll('.lang-btn').forEach(b=>b.classList.toggle('active',b.dataset.lang===l));
  const d=T[l]||T.ko;
  document.getElementById('subtitle').textContent=d.subtitle;
  document.getElementById('lolTitle').textContent=d.lolTitle;
  document.getElementById('lolDesc').textContent=d.lolDesc;
  document.getElementById('tftTitle').textContent=d.tftTitle;
  document.getElementById('tftDesc').textContent=d.tftDesc;
  document.documentElement.lang=l==='zh'?'zh-CN':l;
}
document.addEventListener('DOMContentLoaded',()=>{
  setLang(getLang());
  document.querySelectorAll('.lang-btn').forEach(b=>b.addEventListener('click',()=>setLang(b.dataset.lang)));
});
