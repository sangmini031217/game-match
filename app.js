'use strict';
const MAIN_TEXT={
  ko:{subtitle:'게임 모드를 선택해주세요',lolTitle:'리그 오브 레전드',lolDesc:'10명을 두 팀으로 나눠 티어 밸런스를 맞춰줍니다',tftTitle:'롤토체스 더블업',tftDesc:'짝수 인원을 2인 1조로 균등하게 매칭합니다',tftBadge:'2인조',owTitle:'오버워치',owDesc:'역할(탱커/딜러/힐러)을 고려해 밸런스를 맞춰줍니다',owBadge:'5v5 / 6v6'},
  en:{subtitle:'Select a game mode',lolTitle:'League of Legends',lolDesc:'Splits players into two balanced teams by tier',tftTitle:'TFT Double Up',tftDesc:'Pairs players into balanced duos',tftBadge:'Duos',owTitle:'Overwatch',owDesc:'Role-balanced team matching (Tank/DPS/Support)',owBadge:'5v5 / 6v6'},
  ja:{subtitle:'ゲームモードを選択',lolTitle:'リーグ・オブ・レジェンド',lolDesc:'プレイヤーを2チームに分けてバランス調整',tftTitle:'TFTダブルアップ',tftDesc:'偶数人数を2人1組で均等マッチング',tftBadge:'2人組',owTitle:'オーバーウォッチ',owDesc:'ロール別にバランス調整(タンク/DPS/サポート)',owBadge:'5v5 / 6v6'},
  zh:{subtitle:'请选择游戏模式',lolTitle:'英雄联盟',lolDesc:'将玩家分为两队并平衡段位',tftTitle:'云顶双人作战',tftDesc:'将偶数玩家均等配对',tftBadge:'双人组',owTitle:'守望先锋',owDesc:'按职责平衡分队(坦克/输出/辅助)',owBadge:'5v5 / 6v6'},
};
function applyMain(){
  const l=getLang(),d=MAIN_TEXT[l]||MAIN_TEXT.ko;
  $('subtitle').textContent=d.subtitle;
  $('lolTitle').textContent=d.lolTitle;$('lolDesc').textContent=d.lolDesc;
  $('tftTitle').textContent=d.tftTitle;$('tftDesc').textContent=d.tftDesc;
  $('tftBadge').textContent=d.tftBadge;
  $('owTitle').textContent=d.owTitle;$('owDesc').textContent=d.owDesc;
  $('owBadge').textContent=d.owBadge;
  document.documentElement.lang=l==='zh'?'zh-CN':l;
  document.querySelectorAll('.lang-btn').forEach(b=>b.classList.toggle('active',b.dataset.lang===l));
}
document.addEventListener('DOMContentLoaded',()=>{
  applyMain();initDarkMode();
  document.querySelectorAll('.lang-btn').forEach(b=>b.addEventListener('click',()=>{
    setLangStorage(b.dataset.lang);applyMain();
  }));
});
