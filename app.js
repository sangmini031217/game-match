'use strict';

// ══════════════════════════════════════════════════════════════════════════
// i18n — 다국어 텍스트 데이터
// ══════════════════════════════════════════════════════════════════════════
const I18N = {
  ko: {
    appTitle: 'LoL 내전',
    statLabel: '명 등록됨',
    btnAdd: '참가자 추가',
    btnReset: '초기화',
    btnMatch: '팀 밸런스 맞추기',
    resultTitle: '팀 편성 완료',
    balanceLabel: '팀 점수 밸런스',
    btnBack: '← 돌아가기',
    btnReroll: 'Reroll',
    btnNext: '다음',
    btnSkip: '건너뛰기',
    btnFinish: '등록 완료',
    btnDelete: '삭제',
    btnCopy: '디스코드 복사',
    toastCopied: '클립보드에 복사됐어요',
    scoreLabel: '점수',
    totalScore: '총점',
    comboLabel: '최적 밸런스 조합',
    noCombo: '조합 없음',
    errorMsg: '조건을 만족하는 팀을 짤 수 없습니다. 필수/기피 동료 조건을 확인해주세요.',
    warnRelaxed: '티어 불균형으로 인해 밸런스 조건이 완화되었습니다',
    conflictTitle: '인간관계 조건 충돌',
    conflictMsg: '필수/기피 동료 조건이 서로 충돌하여 팀을 짤 수 없습니다.\n조건을 무시하고 티어 밸런스만 맞출까요?',
    btnForceMatch: '강제 매칭',
    btnCancel: '취소',
    confirmReset: '모든 참가자를 초기화할까요?',
    toastAdded: '등록 완료!',
    toastDeleted: '삭제됨',
    toastCombo: '조합',
    emptyHint: '참가자를 추가해주세요',
    emptyHintSub: '최대 10명까지 등록할 수 있어요',
    noPlayers: '아직 등록된 참가자가 없습니다',
    nameRequired: '이름을 입력해주세요',
    inputPlaceholder: '소환사 이름 입력',
    stepTitles: ['이름 입력','티어 선택','세부 티어','선호 라인','필수 동료','기피 동료'],
    stepLabels: ['Step 1 — 이름','Step 2 — 티어 선택','Step 3 — 세부 티어','Step 4 — 선호 라인','Step 5 — 필수 동료 (선택사항)','Step 6 — 기피 동료 (선택사항)'],
    masterLpLabel: '마스터 LP 구간',
    tiers: ['아이언','브론즈','실버','골드','플래티넘','에메랄드','다이아몬드','마스터','그랜드마스터','챌린저'],
    tierShort: ['I','B','S','G','P','E','D','M','GM','C'],
    masterLp: ['저점 (0~200LP)', '고점 (200LP+)'],
    lanes: ['탑','정글','미드','원딜','서포터','상관없음'],
    blueTeam: 'BLUE 팀', redTeam: 'RED 팀', masterShort: '마스터',
    sectionPlayers: '참가자',
    placeholderTitle: '팀이 구성되면 여기에 표시됩니다',
    placeholderSub: '참가자 10명을 모두 등록하고\n팀 밸런스 맞추기를 눌러주세요',
  },
  en: {
    appTitle: 'LoL Custom',
    statLabel: 'players registered',
    btnAdd: 'Add Player', btnReset: 'Reset', btnMatch: 'Balance Teams',
    resultTitle: 'Teams Ready', balanceLabel: 'Team Score Balance',
    btnBack: '← Back', btnReroll: 'Reroll', btnNext: 'Next', btnSkip: 'Skip',
    btnFinish: 'Add Player', btnDelete: 'Remove',
    btnCopy: 'Copy for Discord',
    toastCopied: 'Copied to clipboard',
    scoreLabel: 'Score', totalScore: 'Total',
    comboLabel: 'Best Balance Combo', noCombo: 'No Combo',
    errorMsg: 'Cannot form valid teams. Please check must-play / avoid constraints.',
    warnRelaxed: 'Balance filters relaxed due to tier imbalance',
    conflictTitle: 'Constraint Conflict',
    conflictMsg: 'Must-play / avoid constraints conflict and cannot be resolved.\nIgnore constraints and balance by tier only?',
    btnForceMatch: 'Force Match', btnCancel: 'Cancel',
    confirmReset: 'Reset all players?',
    toastAdded: 'added!', toastDeleted: 'removed', toastCombo: 'Combo',
    emptyHint: 'Add players to get started', emptyHintSub: 'Up to 10 players can be registered',
    noPlayers: 'No players registered yet', nameRequired: 'Please enter a name',
    inputPlaceholder: 'Summoner name',
    stepTitles: ['Enter Name','Select Tier','Sub Tier','Preferred Lane','Must-Play With','Avoid Playing With'],
    stepLabels: ['Step 1 — Name','Step 2 — Tier','Step 3 — Sub Tier','Step 4 — Preferred Lane','Step 5 — Must-Play With (optional)','Step 6 — Avoid Playing With (optional)'],
    masterLpLabel: 'Master LP Range',
    tiers: ['Iron','Bronze','Silver','Gold','Platinum','Emerald','Diamond','Master','Grandmaster','Challenger'],
    tierShort: ['I','B','S','G','P','E','D','M','GM','C'],
    masterLp: ['Low (0~200LP)', 'High (200LP+)'],
    lanes: ['Top','Jungle','Mid','ADC','Support','Flex'],
    blueTeam: 'BLUE Team', redTeam: 'RED Team', masterShort: 'Master',
    sectionPlayers: 'Players',
    placeholderTitle: 'Team results will appear here',
    placeholderSub: 'Register all 10 players and\nclick Balance Teams',
  },
  ja: {
    appTitle: 'LoL カスタム',
    statLabel: '人登録済み',
    btnAdd: 'プレイヤー追加', btnReset: 'リセット', btnMatch: 'チームバランス調整',
    resultTitle: 'チーム編成完了', balanceLabel: 'チームスコアバランス',
    btnBack: '← 戻る', btnReroll: 'リロール', btnNext: '次へ', btnSkip: 'スキップ',
    btnFinish: '登録完了', btnDelete: '削除',
    btnCopy: 'Discordにコピー',
    toastCopied: 'クリップボードにコピーしました',
    scoreLabel: 'スコア', totalScore: '合計',
    comboLabel: '最適バランス組合せ', noCombo: '組合せなし',
    errorMsg: '条件を満たすチームを作れません。必須/回避条件を確認してください。',
    warnRelaxed: 'ティア不均衡のためバランス条件を緩和しました',
    conflictTitle: '条件の競合',
    conflictMsg: '必須/回避条件が競合しており、チームを作れません。\n条件を無視してティアバランスのみで組みますか？',
    btnForceMatch: '強制マッチング', btnCancel: 'キャンセル',
    confirmReset: '全プレイヤーをリセットしますか？',
    toastAdded: '登録完了！', toastDeleted: '削除しました', toastCombo: '組合せ',
    emptyHint: 'プレイヤーを追加してください', emptyHintSub: '最大10人まで登録できます',
    noPlayers: 'まだプレイヤーが登録されていません', nameRequired: '名前を入力してください',
    inputPlaceholder: 'サモナー名を入力',
    stepTitles: ['名前入力','ティア選択','サブティア','希望レーン','必須チームメイト','回避プレイヤー'],
    stepLabels: ['Step 1 — 名前','Step 2 — ティア選択','Step 3 — サブティア','Step 4 — 希望レーン','Step 5 — 必須チームメイト（任意）','Step 6 — 回避プレイヤー（任意）'],
    masterLpLabel: 'マスター LP 帯',
    tiers: ['アイアン','ブロンズ','シルバー','ゴールド','プラチナ','エメラルド','ダイヤモンド','マスター','グランドマスター','チャレンジャー'],
    tierShort: ['I','B','S','G','P','E','D','M','GM','C'],
    masterLp: ['低LP (0~200LP)', '高LP (200LP+)'],
    lanes: ['トップ','ジャングル','ミッド','ADC','サポート','フレックス'],
    blueTeam: 'BLUEチーム', redTeam: 'REDチーム', masterShort: 'マスター',
    sectionPlayers: 'プレイヤー',
    placeholderTitle: 'チーム結果がここに表示されます',
    placeholderSub: '10人全員を登録して\nチームバランス調整を押してください',
  },
  zh: {
    appTitle: 'LoL 内战',
    statLabel: '名玩家已注册',
    btnAdd: '添加玩家', btnReset: '重置', btnMatch: '平衡队伍',
    resultTitle: '队伍编排完成', balanceLabel: '队伍分数平衡',
    btnBack: '← 返回', btnReroll: '重新分配', btnNext: '下一步', btnSkip: '跳过',
    btnFinish: '完成注册', btnDelete: '删除',
    btnCopy: '复制到Discord',
    toastCopied: '已复制到剪贴板',
    scoreLabel: '分数', totalScore: '总分',
    comboLabel: '最优平衡组合', noCombo: '无组合',
    errorMsg: '无法满足条件组建队伍，请检查必须同队/回避条件。',
    warnRelaxed: '由于段位差异过大，平衡条件已放宽',
    conflictTitle: '条件冲突',
    conflictMsg: '必须同队/回避条件相互冲突，无法组建队伍。\n是否忽略条件，仅按段位平衡分队？',
    btnForceMatch: '强制匹配', btnCancel: '取消',
    confirmReset: '确定重置所有玩家吗？',
    toastAdded: '注册完成！', toastDeleted: '已删除', toastCombo: '组合',
    emptyHint: '请添加玩家', emptyHintSub: '最多可注册10名玩家',
    noPlayers: '暂无已注册玩家', nameRequired: '请输入名称',
    inputPlaceholder: '输入召唤师名称',
    stepTitles: ['输入名称','选择段位','细分段位','偏好路线','必须同队','回避玩家'],
    stepLabels: ['Step 1 — 名称','Step 2 — 段位选择','Step 3 — 细分段位','Step 4 — 偏好路线','Step 5 — 必须同队（可选）','Step 6 — 回避玩家（可选）'],
    masterLpLabel: '大师 LP 区间',
    tiers: ['坚韧黑铁','英勇黄铜','不屈白银','荣耀黄金','华贵铂金','翡翠','璀璨钻石','宗师','最强王者','挑战者'],
    tierShort: ['I','B','S','G','P','E','D','M','GM','C'],
    masterLp: ['低LP (0~200LP)', '高LP (200LP+)'],
    lanes: ['上路','打野','中路','ADC','辅助','随意'],
    blueTeam: '蓝色队', redTeam: '红色队', masterShort: '宗师',
    sectionPlayers: '玩家',
    placeholderTitle: '队伍结果将显示在这里',
    placeholderSub: '注册全部10名玩家后\n点击平衡队伍',
  },
};

// ══════════════════════════════════════════════════════════════════════════
// GAME DATA — 배점 및 라인 상수
// ══════════════════════════════════════════════════════════════════════════
const TIER_KEYS = ['아이언','브론즈','실버','골드','플래티넘','에메랄드','다이아몬드','마스터','그랜드마스터','챌린저'];
const TIER_COLORS = {
  '아이언':'#8B8B8B','브론즈':'#A0522D','실버':'#708090','골드':'#B8860B',
  '플래티넘':'#2E8B57','에메랄드':'#00A86B','다이아몬드':'#4169E1',
  '마스터':'#9B59B6','그랜드마스터':'#C0392B','챌린저':'#E67E22',
};
const SCORES = {
  '아이언':   [1.0,1.2,1.4,1.6],
  '브론즈':   [2.0,2.2,2.4,2.6],
  '실버':     [3.0,3.3,3.6,3.9],
  '골드':     [4.5,4.9,5.3,5.7],
  '플래티넘': [6.5,7.0,7.5,8.0],
  '에메랄드': [9.5,10.2,10.9,11.6],
  '다이아몬드':[13.5,14.5,15.5,16.5],
  '마스터':   null,
  '그랜드마스터': 32.0,
  '챌린저':   40.0,
};
const MASTER_LP_SCORES = { 0: 21.0, 1: 26.0 };
const LANE_KEYS       = ['탑','정글','미드','원딜','서포터','상관없음'];
const LANE_LABEL      = {'탑':'T','정글':'J','미드':'M','원딜':'A','서포터':'S','상관없음':'·'};
const LANE_ORDER_KEYS = ['탑','정글','미드','원딜','서포터'];
const NO_SUB_KEYS     = ['마스터','그랜드마스터','챌린저'];

// ══════════════════════════════════════════════════════════════════════════
// STATE
// ══════════════════════════════════════════════════════════════════════════
let players        = [];
let matchResults   = [];
let currentResultIdx = 0;
let currentStep    = 1;
let draft          = {};
let lang           = 'ko';
let matchMode      = 'normal'; // 'normal' | 'relaxed' | 'forced'

// ── helpers ───────────────────────────────────────────────────────────────
const t   = key => I18N[lang]?.[key] ?? I18N.ko[key] ?? key;
const $   = id  => document.getElementById(id);
const esc = s   => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

// ══════════════════════════════════════════════════════════════════════════
// LOCALSTORAGE
// ══════════════════════════════════════════════════════════════════════════
function save() { localStorage.setItem('lol_players', JSON.stringify(players)); }
function load() {
  try { players = JSON.parse(localStorage.getItem('lol_players') || '[]'); } catch { players = []; }
  lang = localStorage.getItem('lol_lang') || 'ko';
}

// ══════════════════════════════════════════════════════════════════════════
// SCORE CALCULATION
// ══════════════════════════════════════════════════════════════════════════
function calcScore(p) {
  const tk = p.tierKey;
  if (tk === '그랜드마스터') return 32.0;
  if (tk === '챌린저')       return 40.0;
  if (tk === '마스터')       return MASTER_LP_SCORES[p.masterLpIdx] ?? 21.0;
  const arr = SCORES[tk];
  if (!arr) return 0;
  return arr[Math.max(0, Math.min(3, 4 - parseInt(p.subTier)))];
}

// ══════════════════════════════════════════════════════════════════════════
// DISPLAY HELPERS
// ══════════════════════════════════════════════════════════════════════════
function tierDisplay(p) {
  const tiers    = t('tiers');
  const tierIdx  = TIER_KEYS.indexOf(p.tierKey);
  const tierName = tiers[tierIdx] || p.tierKey;
  if (NO_SUB_KEYS.includes(p.tierKey)) {
    if (p.tierKey === '마스터') return `${tierName} (${t('masterLp')[p.masterLpIdx] || ''})`;
    return tierName;
  }
  return `${tierName} ${p.subTier}`;
}

function tierShortDisplay(p) {
  const s = (t('tierShort')[TIER_KEYS.indexOf(p.tierKey)] || '?');
  return NO_SUB_KEYS.includes(p.tierKey) ? s : `${s}${p.subTier}`;
}

function laneDisplay(laneKey) {
  const idx = LANE_KEYS.indexOf(laneKey);
  return (t('lanes')[idx] || laneKey);
}

// ══════════════════════════════════════════════════════════════════════════
// TOAST
// ══════════════════════════════════════════════════════════════════════════
function showToast(msg, dur = 2200) {
  const el = $('toast');
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), dur);
}

// ══════════════════════════════════════════════════════════════════════════
// i18n APPLY
// ══════════════════════════════════════════════════════════════════════════
function setLang(l) {
  lang = l;
  localStorage.setItem('lol_lang', l);
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === l);
  });
  applyI18n();
  updateMainUI();
}

function applyI18n() {
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang;
  $('appTitle').textContent    = t('appTitle');
  $('statLabel').textContent   = t('statLabel');
  const sub = $('statLabelSub');
  if (sub) sub.textContent     = t('statLabel');

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key) el.textContent = t(key);
  });

  const inp = $('inputName');
  if (inp) inp.placeholder = t('inputPlaceholder');

  for (let i = 1; i <= 6; i++) {
    const el = $('stepLabel' + i);
    if (el) el.textContent = t('stepLabels')[i - 1];
  }
  const mlLabel = $('masterLpLabel');
  if (mlLabel) mlLabel.textContent = t('masterLpLabel');

  const cancelBtn = $('conflictCancelBtn');
  if (cancelBtn) cancelBtn.textContent = t('btnCancel');
  const forceBtn  = $('conflictForceBtn');
  if (forceBtn)  forceBtn.textContent  = t('btnForceMatch');

  const pt = $('placeholderTitle');
  if (pt) pt.textContent = t('placeholderTitle');
  const ps = $('placeholderSub');
  if (ps) ps.textContent = t('placeholderSub');

  const et = $('emptyTitle');
  if (et) et.textContent = t('emptyHint');
  const es = $('emptySubtitle');
  if (es) es.textContent = t('emptyHintSub');

  // 복사 버튼 텍스트
  const copyBtn = $('btnCopy');
  if (copyBtn) {
    const copySpan = copyBtn.querySelector('[data-i18n]');
    if (copySpan) copySpan.textContent = t('btnCopy');
  }

  // 언어 버튼 active 상태 동기화
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

// ══════════════════════════════════════════════════════════════════════════
// MAIN UI UPDATE
// ══════════════════════════════════════════════════════════════════════════
function updateMainUI() {
  const n = players.length;
  $('countNum').textContent = n;
  $('statLabel').textContent = t('statLabel');
  const sub = $('statLabelSub');
  if (sub) sub.textContent = t('statLabel');

  const prog = $('countProgress');
  if (prog) prog.style.width = (n / 10 * 100) + '%';

  const btnAdd = $('btnAdd');
  const addSpan = btnAdd.querySelector('[data-i18n]');
  if (addSpan) addSpan.textContent = t('btnAdd');
  btnAdd.style.display = n >= 10 ? 'none' : '';

  const btnReset = $('btnReset');
  btnReset.textContent  = t('btnReset');
  btnReset.style.display = n > 0 ? '' : 'none';

  const matchWrap = $('btnMatchWrap');
  matchWrap.style.display = n === 10 ? '' : 'none';
  if (n === 10) {
    const ms = matchWrap.querySelector('[data-i18n]');
    if (ms) ms.textContent = t('btnMatch');
  }

  const secLabel = $('sectionLabelPlayers');
  if (secLabel) {
    secLabel.style.display = n > 0 ? '' : 'none';
    secLabel.textContent   = t('sectionPlayers');
  }

  const listCard  = $('playerListCard');
  const emptyCard = $('emptyCard');
  if (listCard)  listCard.style.display  = n > 0 ? '' : 'none';
  if (emptyCard) emptyCard.style.display = n > 0 ? 'none' : '';

  renderPlayerGrid();
}

function renderPlayerGrid() {
  const grid = $('playerGrid');
  if (players.length === 0) { grid.innerHTML = ''; return; }

  grid.innerHTML = players.map((p, i) => {
    const score    = calcScore(p).toFixed(1);
    const tierStr  = tierDisplay(p);
    const shortStr = tierShortDisplay(p);
    const laneStr  = laneDisplay(p.laneKey);
    const color    = TIER_COLORS[p.tierKey] || '#6B7684';
    const mustNames  = (p.mustWith  || []).map(id => players.find(x => x.id === id)?.name).filter(Boolean);
    const avoidNames = (p.avoidWith || []).map(id => players.find(x => x.id === id)?.name).filter(Boolean);
    const tags = [
      ...mustNames.map(n  => `<span class="tag tag-must">+ ${esc(n)}</span>`),
      ...avoidNames.map(n => `<span class="tag tag-avoid">- ${esc(n)}</span>`),
    ].join('');
    return `<div class="player-item">
      <div class="tier-badge" style="color:${color};background:${color}18">${shortStr}</div>
      <div class="player-info">
        <div class="player-name">${esc(p.name)}</div>
        <div class="player-meta">${tierStr} · ${laneStr}</div>
        <span class="score-pill">${t('scoreLabel')} ${score}</span>
        ${tags ? `<div class="player-tags">${tags}</div>` : ''}
      </div>
      <button class="btn btn-danger" data-remove="${i}">${t('btnDelete')}</button>
    </div>`;
  }).join('');

  // delegate delete buttons
  grid.querySelectorAll('[data-remove]').forEach(btn => {
    btn.addEventListener('click', () => removePlayer(Number(btn.dataset.remove)));
  });
}

function removePlayer(idx) {
  const removed = players[idx];
  players.splice(idx, 1);
  players.forEach(p => {
    p.mustWith  = (p.mustWith  || []).filter(id => id !== removed.id);
    p.avoidWith = (p.avoidWith || []).filter(id => id !== removed.id);
  });
  save();
  updateMainUI();
  showToast(`${removed.name} ${t('toastDeleted')}`);
}

function resetAll() {
  if (!confirm(t('confirmReset'))) return;
  players = []; matchResults = []; currentResultIdx = 0;
  save();
  updateMainUI();
  $('resultScreen').classList.remove('active');
  $('placeholderCard').style.display = '';
}

// ══════════════════════════════════════════════════════════════════════════
// MODAL — 참가자 추가
// ══════════════════════════════════════════════════════════════════════════
function openModal() {
  if (players.length >= 10) return;
  draft = { mustWith: [], avoidWith: [] };
  currentStep = 1;
  buildStepIndicator();
  showStep(1);
  const inp = $('inputName');
  inp.value       = '';
  inp.placeholder = t('inputPlaceholder');
  $('modalOverlay').classList.add('active');
  setTimeout(() => inp.focus(), 350);
}

function closeModal() {
  $('modalOverlay').classList.remove('active');
}

function buildStepIndicator() {
  $('stepIndicator').innerHTML =
    [1,2,3,4,5,6].map(i => `<div class="step-dot" id="dot${i}"></div>`).join('');
  updateDots(1);
}

function updateDots(active) {
  [1,2,3,4,5,6].forEach(i => {
    const d = $('dot' + i);
    d.className = 'step-dot' + (i < active ? ' done' : i === active ? ' active' : '');
  });
}

function showStep(n) {
  [1,2,3,4,5,6].forEach(i =>
    $('step' + i).classList.toggle('active', i === n)
  );
  currentStep = n;
  updateDots(n);
  $('modalTitle').textContent = t('stepTitles')[n - 1];
  for (let i = 1; i <= 6; i++) {
    const el = $('stepLabel' + i);
    if (el) el.textContent = t('stepLabels')[i - 1];
  }
  const mlLabel = $('masterLpLabel');
  if (mlLabel) mlLabel.textContent = t('masterLpLabel');
  const skipBtn   = $('btnSkip');
  if (skipBtn)   skipBtn.textContent   = t('btnSkip');
  const finishBtn = $('btnFinish');
  if (finishBtn) finishBtn.textContent = t('btnFinish');
  const nextBtn   = $('btnNext');
  if (nextBtn)   nextBtn.textContent   = t('btnNext');
}

function nextStep(from) {
  if (from === 1) {
    const name = $('inputName').value.trim();
    if (!name) { showToast(t('nameRequired')); return; }
    draft.name = name;
    buildTierChips();
    showStep(2);
  } else if (from === 5) {
    buildAvoidChips();
    showStep(6);
  }
}

// ── TIER ──────────────────────────────────────────────────────────────────
function buildTierChips() {
  const tiers = t('tiers');
  $('tierChips').innerHTML = TIER_KEYS.map((key, i) =>
    `<div class="chip" style="min-width:76px;text-align:center" data-tier="${key}">${tiers[i]}</div>`
  ).join('');
  $('tierChips').querySelectorAll('.chip').forEach(el =>
    el.addEventListener('click', () => selectTier(el, el.dataset.tier))
  );
}

function selectTier(el, tierKey) {
  draft.tierKey = tierKey;
  $('tierChips').querySelectorAll('.chip').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  setTimeout(() => {
    if (NO_SUB_KEYS.includes(tierKey)) {
      if (tierKey === '마스터') { buildMasterStep(); }
      else { draft.subTier = null; draft.masterLpIdx = null; buildLaneChips(); showStep(4); }
    } else {
      buildSubTierChips(tierKey);
      showStep(3);
    }
  }, 180);
}

function buildSubTierChips(tierKey) {
  const tierName = t('tiers')[TIER_KEYS.indexOf(tierKey)];
  $('subTierChips').innerHTML = [4,3,2,1].map(n =>
    `<div class="chip" data-sub="${n}">${tierName} ${n}</div>`
  ).join('');
  $('subTierChips').querySelectorAll('.chip').forEach(el =>
    el.addEventListener('click', () => selectSubTier(el, Number(el.dataset.sub)))
  );
  $('masterLpWrap').style.display = 'none';
}

function selectSubTier(el, n) {
  draft.subTier = n;
  $('subTierChips').querySelectorAll('.chip').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  setTimeout(() => { buildLaneChips(); showStep(4); }, 180);
}

function buildMasterStep() {
  $('subTierChips').innerHTML = '';
  $('masterLpWrap').style.display = '';
  $('masterLpLabel').textContent = t('masterLpLabel');
  const lpArr = t('masterLp');
  $('masterLpChips').innerHTML = lpArr.map((label, idx) =>
    `<div class="chip" data-lp="${idx}">${label}</div>`
  ).join('');
  $('masterLpChips').querySelectorAll('.chip').forEach(el =>
    el.addEventListener('click', () => selectMasterLp(el, Number(el.dataset.lp)))
  );
  showStep(3);
}

function selectMasterLp(el, idx) {
  draft.masterLpIdx = idx; draft.subTier = null;
  $('masterLpChips').querySelectorAll('.chip').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  setTimeout(() => { buildLaneChips(); showStep(4); }, 180);
}

// ── LANE ──────────────────────────────────────────────────────────────────
function buildLaneChips() {
  const lanes = t('lanes');
  $('laneChips').innerHTML = LANE_KEYS.map((key, i) =>
    `<div class="chip" style="min-width:80px;text-align:center" data-lane="${key}">${lanes[i]}</div>`
  ).join('');
  $('laneChips').querySelectorAll('.chip').forEach(el =>
    el.addEventListener('click', () => selectLane(el, el.dataset.lane))
  );
}

function selectLane(el, laneKey) {
  draft.laneKey = laneKey;
  $('laneChips').querySelectorAll('.chip').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  setTimeout(() => { buildMustChips(); showStep(5); }, 180);
}

// ── MUST / AVOID ──────────────────────────────────────────────────────────
function buildMustChips() {
  const wrap = $('mustChips');
  if (players.length === 0) {
    wrap.innerHTML = `<div style="color:var(--text3);font-size:13px;font-weight:500">${t('noPlayers')}</div>`;
    return;
  }
  wrap.innerHTML = players.map(p =>
    `<div class="chip" data-id="${p.id}">${esc(p.name)}</div>`
  ).join('');
  wrap.querySelectorAll('.chip').forEach(el =>
    el.addEventListener('click', () => toggleMust(el, el.dataset.id))
  );
}

function toggleMust(el, id) {
  const idx = draft.mustWith.indexOf(id);
  if (idx === -1) { draft.mustWith.push(id); el.classList.add('sel-must'); }
  else            { draft.mustWith.splice(idx, 1); el.classList.remove('sel-must'); }
}

function buildAvoidChips() {
  const wrap = $('avoidChips');
  if (players.length === 0) {
    wrap.innerHTML = `<div style="color:var(--text3);font-size:13px;font-weight:500">${t('noPlayers')}</div>`;
    return;
  }
  wrap.innerHTML = players.map(p =>
    `<div class="chip" data-id="${p.id}">${esc(p.name)}</div>`
  ).join('');
  wrap.querySelectorAll('.chip').forEach(el =>
    el.addEventListener('click', () => toggleAvoid(el, el.dataset.id))
  );
}

function toggleAvoid(el, id) {
  const idx = draft.avoidWith.indexOf(id);
  if (idx === -1) { draft.avoidWith.push(id); el.classList.add('sel-avoid'); }
  else            { draft.avoidWith.splice(idx, 1); el.classList.remove('sel-avoid'); }
}

// ── FINISH ────────────────────────────────────────────────────────────────
function finishAdd() {
  const p = {
    id:          Date.now() + Math.random().toString(36).slice(2),
    name:        draft.name,
    tierKey:     draft.tierKey,
    subTier:     draft.subTier     || null,
    masterLpIdx: draft.masterLpIdx ?? null,
    laneKey:     draft.laneKey,
    mustWith:    draft.mustWith    || [],
    avoidWith:   draft.avoidWith   || [],
  };
  players.push(p);
  save();
  updateMainUI();
  closeModal();
  showToast(`${p.name} ${t('toastAdded')}`);
}

// ══════════════════════════════════════════════════════════════════════════
// MATCHING ALGORITHM — 3단계 폴백
// ══════════════════════════════════════════════════════════════════════════
function doMatch() {
  if (players.length !== 10) return;
  matchMode = 'normal';

  // Tier 1: 필수/기피 조건 + 밸런스 필터 모두 적용
  let results = gatherCombos(true, true);
  if (results.length > 0) {
    matchResults = results; currentResultIdx = 0;
    showResultScreen(matchResults[0]); return;
  }

  // Tier 2: 필수/기피 조건만 적용, 밸런스 필터 해제
  results = gatherCombos(true, false);
  if (results.length > 0) {
    matchMode = 'relaxed';
    matchResults = results; currentResultIdx = 0;
    showResultScreen(matchResults[0]); return;
  }

  // Tier 3: 조건 자체가 충돌 → 충돌 모달
  showConflictModal();
}

function doReroll() {
  if (matchResults.length === 0) return;
  currentResultIdx = (currentResultIdx + 1) % matchResults.length;
  showResultScreen(matchResults[currentResultIdx]);
  showToast(`${t('toastCombo')} #${currentResultIdx + 1} / ${matchResults.length}`);
}

function gatherCombos(applyConstraints, applyBalance) {
  const combos = [];
  for (let mask = 0; mask < (1 << 10); mask++) {
    if (popcount(mask) !== 5) continue;
    const teamA = [], teamB = [];
    for (let i = 0; i < 10; i++) {
      (mask & (1 << i) ? teamA : teamB).push(players[i]);
    }
    if (applyConstraints && !checkConstraints(teamA, teamB)) continue;
    const scoreA = teamA.reduce((s, p) => s + calcScore(p), 0);
    const scoreB = teamB.reduce((s, p) => s + calcScore(p), 0);
    if (applyBalance) {
      const aceA = Math.max(...teamA.map(p => calcScore(p)));
      const aceB = Math.max(...teamB.map(p => calcScore(p)));
      if (Math.abs(aceA - aceB) > 5) continue;
      if (!checkLaneDiff(teamA, teamB)) continue;
    }
    combos.push({ teamA, teamB, scoreA, scoreB, diff: Math.abs(scoreA - scoreB) });
  }
  combos.sort((a, b) => a.diff - b.diff);
  return combos;
}

function popcount(n) { let c = 0; while (n) { c += n & 1; n >>= 1; } return c; }

function checkConstraints(teamA, teamB) {
  const idsA = new Set(teamA.map(p => p.id));
  for (const p of [...teamA, ...teamB]) {
    const inA = idsA.has(p.id);
    for (const mid of (p.mustWith  || [])) { if (inA !== idsA.has(mid)) return false; }
    for (const aid of (p.avoidWith || [])) { if (inA === idsA.has(aid)) return false; }
  }
  return true;
}

function checkLaneDiff(teamA, teamB) {
  for (const lane of LANE_ORDER_KEYS) {
    const flex = '상관없음';
    const pA = teamA.filter(p => p.laneKey === lane || p.laneKey === flex);
    const pB = teamB.filter(p => p.laneKey === lane || p.laneKey === flex);
    if (!pA.length || !pB.length) continue;
    if (Math.abs(Math.max(...pA.map(calcScore)) - Math.max(...pB.map(calcScore))) > 7) return false;
  }
  return true;
}

// ── 충돌 모달 ─────────────────────────────────────────────────────────────
function showConflictModal() {
  $('conflictTitle').textContent     = t('conflictTitle');
  $('conflictMsg').textContent       = t('conflictMsg');
  $('conflictCancelBtn').textContent = t('btnCancel');
  $('conflictForceBtn').textContent  = t('btnForceMatch');
  $('conflictOverlay').classList.add('active');
}

function closeConflictModal() {
  $('conflictOverlay').classList.remove('active');
}

function forceMatch() {
  closeConflictModal();
  matchMode    = 'forced';
  matchResults = gatherCombos(false, false);
  currentResultIdx = 0;
  showResultScreen(matchResults.length > 0 ? matchResults[0] : null);
}

// ══════════════════════════════════════════════════════════════════════════
// RESULT SCREEN
// ══════════════════════════════════════════════════════════════════════════
function showResultScreen(combo) {
  $('placeholderCard').style.display = 'none';
  $('resultScreen').classList.add('active');

  document.querySelector('.result-title').textContent    = t('resultTitle');
  document.querySelector('.balance-label').textContent   = t('balanceLabel');
  $('btnBack').textContent = t('btnBack');
  const rerollSpan = $('btnReroll').querySelector('[data-i18n]');
  if (rerollSpan) rerollSpan.textContent = t('btnReroll');

  const errEl    = $('errorMsg');
  const warnEl   = $('warnMsg');
  const balSec   = $('balanceSection');
  const teamsWrap= $('teamsWrapper');

  if (warnEl) {
    warnEl.style.display = matchMode === 'relaxed' ? '' : 'none';
    if (matchMode === 'relaxed') warnEl.textContent = t('warnRelaxed');
  }

  if (!combo) {
    errEl.style.display = ''; errEl.textContent = t('errorMsg');
    balSec.style.display = 'none'; teamsWrap.innerHTML = '';
    $('btnReroll').disabled = true;
    $('resultSubtitle').textContent = t('noCombo');
    return;
  }

  errEl.style.display = 'none'; balSec.style.display = '';
  $('btnReroll').disabled = matchResults.length <= 1;
  $('resultSubtitle').textContent =
    `${t('comboLabel')} #${currentResultIdx + 1} / ${matchResults.length}`;

  const flip      = Math.random() < 0.5;
  const blueTeam  = flip ? combo.teamA : combo.teamB;
  const redTeam   = flip ? combo.teamB : combo.teamA;
  const blueScore = flip ? combo.scoreA : combo.scoreB;
  const redScore  = flip ? combo.scoreB : combo.scoreA;

  const total   = blueScore + redScore;
  const bluePct = Math.round(blueScore / total * 100);
  $('blueBar').style.width  = bluePct + '%';
  $('redBar').style.width   = (100 - bluePct) + '%';
  $('bluePct').textContent  = bluePct + '%';
  $('redPct').textContent   = (100 - bluePct) + '%';

  teamsWrap.innerHTML =
    renderTeamCard(blueTeam, blueScore, 'blue') +
    renderTeamCard(redTeam,  redScore,  'red');
}

function renderTeamCard(team, score, side) {
  const label = side === 'blue' ? t('blueTeam') : t('redTeam');
  const cls   = side === 'blue' ? 'team-blue'   : 'team-red';
  const laneIdx = p => { const i = LANE_ORDER_KEYS.indexOf(p.laneKey); return i === -1 ? 99 : i; };
  const sorted  = [...team].sort((a, b) => laneIdx(a) - laneIdx(b));
  const rows = sorted.map(p =>
    `<div class="team-player-row">
      <div class="lane-badge">${LANE_LABEL[p.laneKey] || '·'}</div>
      <div class="team-player-name">${esc(p.name)}</div>
      <div class="team-player-tier">${tierDisplay(p)} · ${calcScore(p).toFixed(1)}pt</div>
    </div>`
  ).join('');
  return `<div class="team-card ${cls}">
    <div class="team-header">
      <span>${label}</span>
      <span class="team-score-badge">${t('totalScore')} ${score.toFixed(1)}</span>
    </div>
    <div class="team-player-list">${rows}</div>
  </div>`;
}

function backToMain() {
  $('resultScreen').classList.remove('active');
  $('placeholderCard').style.display = '';
}

// ══════════════════════════════════════════════════════════════════════════
// COPY TO DISCORD — 결과를 텍스트로 클립보드에 복사
// ══════════════════════════════════════════════════════════════════════════
function copyToDiscord() {
  if (matchResults.length === 0) return;
  const combo = matchResults[currentResultIdx];
  if (!combo) return;

  const flip      = Math.random() < 0.5;
  const blueTeam  = flip ? combo.teamA : combo.teamB;
  const redTeam   = flip ? combo.teamB : combo.teamA;
  const blueScore = flip ? combo.scoreA : combo.scoreB;
  const redScore  = flip ? combo.scoreB : combo.scoreA;

  const laneIdx = p => { const i = LANE_ORDER_KEYS.indexOf(p.laneKey); return i === -1 ? 99 : i; };
  const formatTeam = (team, label, score) => {
    const sorted = [...team].sort((a, b) => laneIdx(a) - laneIdx(b));
    const lines = sorted.map(p => {
      const lane = LANE_LABEL[p.laneKey] || '·';
      return `  [${lane}] ${p.name} — ${tierDisplay(p)} (${calcScore(p).toFixed(1)}pt)`;
    });
    return `${label}  (${t('totalScore')} ${score.toFixed(1)})\n${lines.join('\n')}`;
  };

  const text = [
    `── ${t('resultTitle')} ──`,
    '',
    formatTeam(blueTeam, t('blueTeam'), blueScore),
    '',
    formatTeam(redTeam, t('redTeam'), redScore),
    '',
    `${t('comboLabel')} #${currentResultIdx + 1} / ${matchResults.length}`,
  ].join('\n');

  navigator.clipboard.writeText(text).then(() => {
    showToast(t('toastCopied'));
  }).catch(() => {
    // fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast(t('toastCopied'));
  });
}

// ══════════════════════════════════════════════════════════════════════════
// DOM EVENT WIRING — DOMContentLoaded 이후 안전하게 실행
// ══════════════════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {

  // ── 초기 데이터 로드 ──────────────────────────────────────────────────
  load();
  applyI18n();
  updateMainUI();

  // ── 언어 선택 버튼 ────────────────────────────────────────────────────
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });

  // ── 참가자 추가 버튼 ──────────────────────────────────────────────────
  $('btnAdd').addEventListener('click', openModal);

  // ── 초기화 버튼 ───────────────────────────────────────────────────────
  $('btnReset').addEventListener('click', resetAll);

  // ── 팀 밸런스 맞추기 버튼 ────────────────────────────────────────────
  $('btnMatch').addEventListener('click', doMatch);

  // ── 모달 닫기 (X 버튼 + 오버레이 클릭) ──────────────────────────────
  $('modalCloseBtn').addEventListener('click', closeModal);
  $('modalOverlay').addEventListener('click', e => {
    if (e.target === $('modalOverlay')) closeModal();
  });

  // ── 이름 입력 Enter 키 ────────────────────────────────────────────────
  $('inputName').addEventListener('keydown', e => {
    if (e.key === 'Enter') nextStep(1);
  });

  // ── 다음 버튼 (Step 1) ────────────────────────────────────────────────
  $('btnNext').addEventListener('click', () => nextStep(1));

  // ── 건너뛰기 버튼 (Step 5) ───────────────────────────────────────────
  $('btnSkip').addEventListener('click', () => nextStep(5));

  // ── 등록 완료 버튼 (Step 6) ──────────────────────────────────────────
  $('btnFinish').addEventListener('click', finishAdd);

  // ── 결과 화면 — 돌아가기 ─────────────────────────────────────────────
  $('btnBack').addEventListener('click', backToMain);

  // ── 결과 화면 — Reroll ───────────────────────────────────────────────
  $('btnReroll').addEventListener('click', doReroll);

  // ── 결과 화면 — 디스코드 복사 ────────────────────────────────────────
  $('btnCopy').addEventListener('click', copyToDiscord);

  // ── 충돌 모달 — 닫기 ─────────────────────────────────────────────────
  $('conflictCloseBtn').addEventListener('click', closeConflictModal);
  $('conflictCancelBtn').addEventListener('click', closeConflictModal);

  // ── 충돌 모달 — 강제 매칭 ────────────────────────────────────────────
  $('conflictForceBtn').addEventListener('click', forceMatch);
});
