/* ================================================================
   📱 추가 앱 (apps.js) — 시계 · 음악 · 설정 · 애플리케이션 · 계산기

   index.html 맨 아래 </body> 바로 위에 이 한 줄만 넣으면 작동합니다.
     <script src="apps.js"></script>

   ✏️ 내용은 아래 '고칠 수 있는 칸'에서만 바꾸세요.
   ================================================================ */


/* ───────── 고칠 수 있는 칸 ───────── */

// 시계 앱의 알람 (단계 = 그 날짜부터 보임, 0 = 3월 14일부터)
const 알람 = [
  { 단계:0, 시각:'오전 6:30',  이름:'일어나기',           켜짐:true  },
  { 단계:0, 시각:'오전 7:20',  이름:'학교',               켜짐:false },
  { 단계:1, 시각:'오후 6:30',  이름:'무학국민학교 앞 (주열이랑)', 켜짐:true },
  { 단계:2, 시각:'오전 9:00',  이름:'주열이 어머니 찾아뵙기', 켜짐:true },
];

// 음악 앱 노래 목록
// 파일:'' 이면 휴대폰이 간단한 멜로디를 직접 연주해요.
// 직접 고른 노래를 넣으려면 mp3 파일을 같은 곳에 올리고 파일:'song1.mp3' 처럼 쓰세요.
const 음악목록 = [
  { 제목:'바다 보러 가자',   가수:'주열이 녹음',   파일:'' },
  { 제목:'두부의 아침',      가수:'마산상고 합창부', 파일:'' },
  { 제목:'만정이 화내는 소리',      가수:'주만징',   파일:'' },
  { 제목:'혜원이 발레하는 소리',     가수:'천혜원',   파일:'' },
];

// 설정 > 휴대폰 정보
const 휴대폰정보 = { 주인:'나', 모델:'M-1960', 버전:'2.3.6', 번호:'010-0315-0419' };


/* ================================================================
   여기부터는 기계 부분 — 고치지 마세요
   ================================================================ */
(function () {
  if (typeof show !== 'function' || typeof APPS === 'undefined') return;

  /* ---------- 스타일 ---------- */
  const css = document.createElement('style');
  css.textContent = `
  .ic-calc{background:linear-gradient(#7c8794,#3e4752)}
  .xa-tabs{flex:none;display:flex;background:linear-gradient(#2c2e33,#17181b);border-bottom:1px solid #000}
  .xa-tab{flex:1;height:44px;font-size:13px;color:#c9ccd2;border-right:1px solid #0c0c0d}
  .xa-tab.on{background:linear-gradient(#3d86d8,#1d5aa8);color:#fff;font-weight:700}
  .xa-face{flex:none;display:flex;flex-direction:column;align-items:center;padding:16px 0 10px;background:radial-gradient(circle at 50% 40%,#2a2c31,#0d0e10)}
  .xa-face svg{width:170px;height:170px}
  .xa-face b{font-size:30px;font-weight:300;margin-top:6px}
  .xa-face small{font-size:13px;color:#9a9da3}
  .xa-row{display:flex;align-items:center;gap:12px;padding:12px 14px;border-bottom:1px solid #1d1e21;width:100%;text-align:left;background:linear-gradient(#141518,#0d0e10)}
  .xa-row .m{flex:1;min-width:0}
  .xa-row .m b{display:block;font-size:22px;font-weight:300}
  .xa-row .m span{display:block;font-size:13px;color:#9a9da3;margin-top:1px}
  .xa-row.off .m{opacity:.4}
  .xa-chk{width:26px;height:26px;border-radius:3px;border:2px solid #8a8d93;background:#1a1b1e;flex:none;display:flex;align-items:center;justify-content:center}
  .xa-chk.on{background:linear-gradient(#5fd35a,#1e9a24);border-color:#3fbf3a}
  .xa-chk.on::after{content:"✓";font-size:18px;font-weight:900;color:#fff}
  .xa-sw{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;background:radial-gradient(circle at 50% 35%,#24262b,#0b0b0c)}
  .xa-sw .t{font-size:58px;font-weight:200;font-variant-numeric:tabular-nums;letter-spacing:1px}
  .xa-sw .t small{font-size:28px}
  .xa-laps{width:100%;max-height:170px;overflow-y:auto;margin-top:12px;font-size:14px;color:#c9ccd2}
  .xa-laps div{display:flex;justify-content:space-between;padding:6px 40px;border-bottom:1px solid #1d1e21;font-variant-numeric:tabular-nums}
  .xa-btns{flex:none;display:grid;grid-template-columns:1fr 1fr;gap:6px;padding:8px;background:#111}
  .xa-btn{height:52px;border-radius:5px;background:linear-gradient(#55595f,#34373c);font-size:16px;font-weight:600;box-shadow:inset 0 1px 0 rgba(255,255,255,.18)}
  .xa-btn.go{background:linear-gradient(#5fd35a,#1e9a24)}
  .xa-btn.stop{background:linear-gradient(#f0554a,#b81d14)}
  .xa-trk{display:flex;align-items:center;gap:10px;padding:9px 12px;border-bottom:1px solid #1d1e21;width:100%;text-align:left;background:linear-gradient(#141518,#0d0e10)}
  .xa-trk.on{background:linear-gradient(#1f3b63,#16294a)}
  .xa-art{width:48px;height:48px;border-radius:3px;flex:none;display:flex;align-items:center;justify-content:center;font-size:22px;box-shadow:inset 0 0 0 1px rgba(255,255,255,.2)}
  .xa-trk .m{flex:1;min-width:0}.xa-trk b{display:block;font-size:15px}.xa-trk span{font-size:12px;color:#9a9da3}
  .xa-mini{flex:none;display:flex;align-items:center;gap:10px;padding:8px 10px;background:linear-gradient(#3b3d42,#212226);border-top:1px solid #000}
  .xa-mini .m{flex:1;min-width:0;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  .xa-pb{width:40px;height:40px;border-radius:50%;background:linear-gradient(#5aa2e8,#1f5fb6);font-size:16px;flex:none}
  #np{background:linear-gradient(#26282d,#0b0b0c)}
  .np-art{width:230px;height:230px;margin:26px auto 0;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:90px;box-shadow:0 10px 30px rgba(0,0,0,.7),inset 0 0 0 1px rgba(255,255,255,.2)}
  .np-t{text-align:center;font-size:21px;font-weight:700;margin-top:20px;padding:0 16px}
  .np-a{text-align:center;font-size:14px;color:#9a9da3;margin-top:4px}
  .np-bar{margin:22px 22px 4px;height:6px;border-radius:3px;background:#333;overflow:hidden}
  .np-bar i{display:block;height:100%;width:0;background:linear-gradient(90deg,#5aa2e8,#9fd0ff)}
  .np-tm{display:flex;justify-content:space-between;margin:0 22px;font-size:11px;color:#9a9da3;font-variant-numeric:tabular-nums}
  .np-ctl{display:flex;justify-content:center;align-items:center;gap:26px;margin-top:22px}
  .np-ctl button{width:58px;height:58px;border-radius:50%;background:linear-gradient(#55595f,#34373c);font-size:20px}
  .np-ctl button.pp{width:76px;height:76px;background:linear-gradient(#5aa2e8,#1f5fb6);font-size:28px}
  .xa-sec{font-size:12px;color:#9a9da3;padding:7px 12px;background:#26272b;border-bottom:1px solid #000}
  .xa-set{display:flex;align-items:center;gap:12px;padding:12px;border-bottom:1px solid #1d1e21;width:100%;text-align:left;background:linear-gradient(#141518,#0d0e10)}
  .xa-set:active{background:#1f3b63}
  .xa-set .m{flex:1;min-width:0}.xa-set b{display:block;font-size:16px;font-weight:600}.xa-set span{display:block;font-size:12px;color:#9a9da3;margin-top:2px}
  .xa-set .ar{color:#666;font-size:18px}
  .xa-dim{position:absolute;inset:0;background:#000;pointer-events:none;z-index:65;opacity:0;transition:opacity .2s}
  .xa-dlg{position:absolute;inset:0;background:rgba(0,0,0,.6);z-index:66;display:none;align-items:center;justify-content:center;padding:0 18px}
  .xa-dlg.on{display:flex}
  .xa-box{width:100%;background:#2b2c30;border:1px solid #555;border-radius:4px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.7)}
  .xa-box h3{font-size:17px;padding:12px 14px;border-bottom:2px solid #3d86d8;background:#232427}
  .xa-opt{display:flex;align-items:center;justify-content:space-between;width:100%;text-align:left;padding:13px 14px;border-bottom:1px solid #3a3b40;font-size:15px}
  .xa-opt i{width:20px;height:20px;border-radius:50%;border:2px solid #8a8d93;flex:none}
  .xa-opt.on i{border-color:#5fd35a;background:radial-gradient(circle,#5fd35a 0 5px,transparent 6px)}
  .xa-sl{padding:18px 14px}
  .xa-sl input{width:100%}
  .xa-box .ft{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:#3a3b40}
  .xa-box .ft button{padding:12px;background:#2b2c30;font-size:15px}
  .xa-wp{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;padding:12px}
  .xa-wp button{aspect-ratio:.6;border-radius:4px;border:2px solid transparent}
  .xa-wp button.on{border-color:#5fd35a}
  .xa-info{padding:6px 0}
  .xa-info div{padding:11px 14px;border-bottom:1px solid #1d1e21}
  .xa-info b{display:block;font-size:15px}.xa-info span{font-size:13px;color:#9a9da3}
  #appdrawer{background:linear-gradient(#141518,#000)}
  .xa-grid{display:grid;grid-template-columns:repeat(4,1fr);row-gap:18px;padding:14px 6px}
  #calc{background:#111}
  .xa-disp{flex:none;height:110px;display:flex;flex-direction:column;justify-content:flex-end;align-items:flex-end;padding:10px 14px;background:linear-gradient(#cfd8c4,#aab79c);color:#1d2617;font-variant-numeric:tabular-nums;border-bottom:2px solid #000}
  .xa-disp small{font-size:14px;opacity:.7;min-height:18px}
  .xa-disp b{font-size:40px;font-weight:400;white-space:nowrap;overflow:hidden;max-width:100%}
  .xa-keys{flex:1;display:grid;grid-template-columns:repeat(4,1fr);gap:4px;padding:6px}
  .xa-keys button{border-radius:5px;background:linear-gradient(#45484e,#2b2d31);font-size:22px;box-shadow:inset 0 1px 0 rgba(255,255,255,.12)}
  .xa-keys button.op{background:linear-gradient(#5b6470,#3a414a);color:#cfe3ff}
  .xa-keys button.eq{background:linear-gradient(#f0a33a,#c9700f)}
  .xa-keys button:active{filter:brightness(1.4)}
  `;
  document.head.appendChild(css);

  /* ---------- 화면 추가 ---------- */
  const scr = document.getElementById('screen'), before = document.getElementById('drawer');
  const addPage = (id, html, cls = '') => { const d = document.createElement('div'); d.className = 'pg ' + cls; d.id = id; d.innerHTML = html; scr.insertBefore(d, before); return d; };
  addPage('clockApp', `<div class="xa-tabs" id="xaClockTabs"></div><div id="xaClockBody" style="flex:1;display:flex;flex-direction:column;min-height:0"></div>`);
  addPage('musicApp', `<div class="bar"><b>음악</b><small id="xaMusicCnt"></small></div><div class="scroll" id="xaTracks"></div><div class="xa-mini" id="xaMini" style="display:none"></div>`);
  addPage('np', `<div class="np-art" id="npArt"></div><div class="np-t" id="npT"></div><div class="np-a" id="npA"></div>
    <div class="np-bar"><i id="npBar"></i></div><div class="np-tm"><span id="npCur">0:00</span><span id="npDur">0:00</span></div>
    <div class="np-ctl"><button id="npPrev">⏮</button><button class="pp" id="npPP">▶</button><button id="npNext">⏭</button></div>`);
  addPage('setApp', `<div class="bar"><b>설정</b><small></small></div><div class="scroll" id="xaSet"></div>`);
  addPage('about', `<div class="bar"><b>휴대폰 정보</b><small></small></div><div class="scroll xa-info" id="xaAbout"></div>`);
  addPage('appdrawer', `<div class="bar"><b>애플리케이션</b><small></small></div><div class="scroll"><div class="xa-grid" id="xaGrid"></div></div>`);
  addPage('calc', `<div class="xa-disp"><small id="cxExp"></small><b id="cxOut">0</b></div><div class="xa-keys" id="cxKeys"></div>`);
  const dim = document.createElement('div'); dim.className = 'xa-dim'; scr.appendChild(dim);
  const dlg = document.createElement('div'); dlg.className = 'xa-dlg'; scr.appendChild(dlg);

  /* ---------- 설정값 ---------- */
  const X = { mute:false, vibrate:true, wifi:false, bright:100, ring:0, wall:0, clockTab:'alarm', alarms:알람.map(a => ({ ...a })),
              sw:{ run:false, t0:0, acc:0, laps:[] }, track:-1, playing:false, pos:0, calc:{ cur:'0', prev:null, op:null, exp:'' } };

  /* 소리 끄기 · 벨소리 바꾸기 (원래 기능 위에 덧씌움) */
  const rawTone = tone;
  tone = function (...a) { if (!X.mute) rawTone(...a); };
  const RINGS = [
    { n:'기본 벨소리', f:() => [784, 988, 1175, 988, 784, 988, 1175, 1568].forEach((f, i) => rawTone(f, i * .14, .28, .1, 'square')) },
    { n:'따르릉',     f:() => { for (let i = 0; i < 12; i++) rawTone(i % 2 ? 1250 : 1500, i * .07, .06, .08, 'square'); } },
    { n:'오르골',     f:() => [1046, 1318, 1568, 2093, 1568, 1318, 1046, 1318].forEach((f, i) => rawTone(f, i * .18, .5, .09, 'sine')) },
    { n:'마림바',     f:() => [523, 659, 784, 659, 880, 784, 659, 523].forEach((f, i) => rawTone(f, i * .15, .35, .14, 'triangle')) },
  ];
  ringPhrase = function () { if (!X.mute) RINGS[X.ring].f(); };
  const rawStartRing = startRing;
  startRing = function () { if (X.mute){ stopRing(); if (X.vibrate && navigator.vibrate){ navigator.vibrate([700, 400, 700]); T.vib = setInterval(() => navigator.vibrate([700, 400, 700]), 2200); } return; } rawStartRing(); };
  const rawIncoming = incoming;
  incoming = function (...a) { pauseMusic(); rawIncoming(...a); };
  const rawCallOut = callOut;
  callOut = function (...a) { pauseMusic(); rawCallOut(...a); };

  /* 앱 연결 */
  const setGo = (k, fn) => { const a = [...APPS, ...DOCK].find(x => x.k === k); if (a) a.go = fn; };
  setGo('clock', () => show('clockApp'));
  setGo('music', () => show('musicApp'));
  setGo('set', () => show('setApp'));
  setGo('apps', () => show('appdrawer'));
  G.calc = '<svg viewBox="0 0 32 32"><rect x="7" y="4" width="18" height="24" rx="2" fill="#e9eef3"/><rect x="9.5" y="7" width="13" height="5" fill="#9fb48c"/><g fill="#555"><rect x="9.5" y="14.5" width="3.5" height="3"/><rect x="14.3" y="14.5" width="3.5" height="3"/><rect x="19" y="14.5" width="3.5" height="3"/><rect x="9.5" y="19" width="3.5" height="3"/><rect x="14.3" y="19" width="3.5" height="3"/><rect x="9.5" y="23.3" width="3.5" height="3"/><rect x="14.3" y="23.3" width="3.5" height="3"/></g><rect x="19" y="19" width="3.5" height="7.3" fill="#e8822a"/></svg>';

  const H = s => esc(s);
  const fmt = s => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

  /* ================= 시계 ================= */
  function clockFace(){
    const m = ST.minBase + ST.min, h = (m / 60) % 12, mi = m % 60;
    const tick = Array.from({ length:12 }, (_, i) => `<line x1="50" y1="8" x2="50" y2="${i % 3 ? 12 : 15}" stroke="#ccc" stroke-width="${i % 3 ? 1 : 2.2}" transform="rotate(${i * 30} 50 50)"/>`).join('');
    return `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="#1b1c20" stroke="#55585e" stroke-width="2"/>${tick}
      <line x1="50" y1="50" x2="50" y2="27" stroke="#fff" stroke-width="3.5" stroke-linecap="round" transform="rotate(${h * 30} 50 50)"/>
      <line x1="50" y1="50" x2="50" y2="15" stroke="#9fd0ff" stroke-width="2" stroke-linecap="round" transform="rotate(${mi * 6} 50 50)"/>
      <circle cx="50" cy="50" r="3" fill="#e8322a"/></svg>`;
  }
  let swIv = null;
  const swNow = () => X.sw.acc + (X.sw.run ? Date.now() - X.sw.t0 : 0);
  const swFmt = ms => { const cs = Math.floor(ms / 10) % 100, s = Math.floor(ms / 1000) % 60, m = Math.floor(ms / 60000); return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}<small>.${String(cs).padStart(2, '0')}</small>`; };
  RENDER.clockApp = () => {
    $('#xaClockTabs').innerHTML = [['alarm', '알람'], ['sw', '스톱워치'], ['timer', '타이머']].map(([k, n]) => `<button class="xa-tab ${X.clockTab === k ? 'on' : ''}" data-k="${k}">${n}</button>`).join('');
    $('#xaClockTabs').querySelectorAll('button').forEach(b => b.onclick = () => { X.clockTab = b.dataset.k; RENDER.clockApp(); });
    const body = $('#xaClockBody'); clearInterval(swIv);
    if (X.clockTab === 'alarm'){
      const list = X.alarms.map((a, i) => ({ ...a, i })).filter(a => (a.단계 || 0) <= ST.stage);
      body.innerHTML = `<div class="xa-face">${clockFace()}<b>${H(nowT())}</b><small>${연도}년 ${H(D().날짜)}</small></div>
        <div class="scroll">${list.map(a => { const [ap, hm] = a.시각.split(' ');
          return `<button class="xa-row ${a.켜짐 ? '' : 'off'}" data-i="${a.i}"><div class="m"><b>${H(hm)} <small style="font-size:14px">${H(ap)}</small></b><span>${H(a.이름)}</span></div><div class="xa-chk ${a.켜짐 ? 'on' : ''}"></div></button>`; }).join('')}</div>`;
      body.querySelectorAll('.xa-row').forEach(b => b.onclick = () => { const a = X.alarms[b.dataset.i]; a.켜짐 = !a.켜짐; toast(a.켜짐 ? `${a.시각} 알람이 설정되었습니다` : '알람이 해제되었습니다'); RENDER.clockApp(); });
    } else if (X.clockTab === 'sw'){
      body.innerHTML = `<div class="xa-sw"><div class="t" id="swT">${swFmt(swNow())}</div><div class="xa-laps" id="swL">${X.sw.laps.map((l, i) => `<div><span>구간 ${X.sw.laps.length - i}</span><span>${swFmt(l).replace(/<\/?small>/g, '')}</span></div>`).join('')}</div></div>
        <div class="xa-btns"><button class="xa-btn ${X.sw.run ? 'stop' : 'go'}" id="swA">${X.sw.run ? '정지' : '시작'}</button><button class="xa-btn" id="swB">${X.sw.run ? '구간' : '초기화'}</button></div>`;
      $('#swA').onclick = () => { if (X.sw.run){ X.sw.acc = swNow(); X.sw.run = false; } else { X.sw.t0 = Date.now(); X.sw.run = true; } RENDER.clockApp(); };
      $('#swB').onclick = () => { if (X.sw.run) X.sw.laps.unshift(swNow()); else X.sw = { run:false, t0:0, acc:0, laps:[] }; RENDER.clockApp(); };
      if (X.sw.run) swIv = setInterval(() => { const el = $('#swT'); if (el) el.innerHTML = swFmt(swNow()); }, 37);
    } else {
      const left = X.timerEnd ? Math.max(0, X.timerEnd - Date.now()) : (X.timerSet || 60) * 1000;
      body.innerHTML = `<div class="xa-sw"><div class="t" id="tmT">${fmt(Math.ceil(left / 1000))}</div>
        <div style="display:flex;gap:8px;margin-top:16px">${[30, 60, 180, 300].map(s => `<button class="xa-btn" style="width:66px;height:40px;font-size:13px" data-s="${s}">${s < 60 ? s + '초' : s / 60 + '분'}</button>`).join('')}</div></div>
        <div class="xa-btns"><button class="xa-btn ${X.timerEnd ? 'stop' : 'go'}" id="tmA">${X.timerEnd ? '정지' : '시작'}</button><button class="xa-btn" id="tmB">초기화</button></div>`;
      body.querySelectorAll('[data-s]').forEach(b => b.onclick = () => { if (X.timerEnd) return; X.timerSet = +b.dataset.s; RENDER.clockApp(); });
      $('#tmA').onclick = () => { if (X.timerEnd){ clearTimeout(X.timerT); X.timerEnd = 0; } else { X.timerEnd = Date.now() + (X.timerSet || 60) * 1000; X.timerT = setTimeout(() => { X.timerEnd = 0; toast('⏰ 타이머 종료'); for (let i = 0; i < 3; i++) RINGS[1].f && setTimeout(RINGS[1].f, i * 900); if (ST.cur === 'clockApp') RENDER.clockApp(); }, (X.timerSet || 60) * 1000); } RENDER.clockApp(); };
      $('#tmB').onclick = () => { clearTimeout(X.timerT); X.timerEnd = 0; RENDER.clockApp(); };
      if (X.timerEnd) swIv = setInterval(() => { const el = $('#tmT'); if (el) el.textContent = fmt(Math.ceil(Math.max(0, X.timerEnd - Date.now()) / 1000)); }, 250);
    }
  };

  /* ================= 음악 ================= */
  const ART = ['#3a6fb0,#173a6b', '#b05a3a,#5b2414', '#3a8f5a,#16452a', '#7a4fb0,#3a1f63', '#b08a3a,#5b4214'];
  const artOf = i => `background:linear-gradient(135deg,${ART[i % ART.length]})`;
  const SCALE = [523, 587, 659, 784, 880, 1046, 1175, 1318];
  function melodyOf(title){ let h = 7; for (const c of title) h = (h * 31 + c.charCodeAt(0)) >>> 0; const r = () => (h = (h * 1103515245 + 12345) >>> 0) / 4294967296; return Array.from({ length:32 }, () => ({ f:SCALE[Math.floor(r() * SCALE.length)], d:[.25, .25, .5, .5, .75][Math.floor(r() * 5)] })); }
  const SYN_LEN = 45;
  let audio = null, synT = null, posT = null, synStart = 0;
  const trackLen = () => audio && isFinite(audio.duration) ? audio.duration : SYN_LEN;
  const curPos = () => audio ? audio.currentTime : X.pos + (X.playing ? (Date.now() - synStart) / 1000 : 0);
  function synthPlay(from){
    const mel = melodyOf(음악목록[X.track].제목); let t = 0, idx = 0; const total = mel.reduce((a, n) => a + n.d, 0) * .5;
    synStart = Date.now();
    const step = () => {
      if (!X.playing) return;
      const p = curPos(); if (p >= SYN_LEN) return next();
      const n = mel[idx % mel.length]; idx++;
      rawTone(n.f, 0, n.d * .5, .07, 'triangle'); if (idx % 4 === 1) rawTone(n.f / 2, 0, .6, .05, 'sine');
      synT = setTimeout(step, n.d * 500);
    };
    void total; void t; void from; step();
  }
  function playTrack(i){
    stopAll(); X.track = i; X.pos = 0; X.playing = true;
    const tr = 음악목록[i];
    if (tr.파일){ audio = new Audio(tr.파일); audio.onended = next; audio.play().catch(() => {}); } else synthPlay(0);
    tickPos(); syncUI();
  }
  function stopAll(){ clearTimeout(synT); if (audio){ audio.pause(); audio = null; } }
  function pauseMusic(){ if (!X.playing) return; X.pos = curPos(); X.playing = false; clearTimeout(synT); if (audio) audio.pause(); syncUI(); }
  function resume(){ if (X.track < 0) return playTrack(0); X.playing = true; if (audio) audio.play().catch(() => {}); else synthPlay(X.pos); tickPos(); syncUI(); }
  function next(){ playTrack((X.track + 1) % 음악목록.length); }
  function prev(){ if (curPos() > 3) return playTrack(X.track); playTrack((X.track - 1 + 음악목록.length) % 음악목록.length); }
  function tickPos(){ clearInterval(posT); posT = setInterval(() => { if (!X.playing) return; const el = $('#npBar'); if (el){ el.style.width = Math.min(100, curPos() / trackLen() * 100) + '%'; $('#npCur').textContent = fmt(curPos()); $('#npDur').textContent = fmt(trackLen()); } }, 300); }
  function syncUI(){
    const sb = document.getElementById('sbIcons');
    let note = document.getElementById('xaNote'); if (!note){ note = document.createElement('span'); note.id = 'xaNote'; note.style.cssText = 'font-size:13px;color:#9fd0ff;margin-left:2px'; note.textContent = '♪'; }
    if (X.playing && sb && !sb.contains(note)) sb.appendChild(note); if (!X.playing && note.parentNode) note.remove();
    if (ST.cur === 'musicApp') RENDER.musicApp(); if (ST.cur === 'np') RENDER.np();
  }
  const rawSb = renderSbIcons;
  renderSbIcons = function () { rawSb(); syncNoteOnly(); };
  function syncNoteOnly(){ const n = document.getElementById('xaNote'); if (X.playing && n && !n.parentNode) document.getElementById('sbIcons').appendChild(n); }
  RENDER.musicApp = () => {
    $('#xaMusicCnt').textContent = `${음악목록.length}곡`;
    $('#xaTracks').innerHTML = 음악목록.map((t, i) => `<button class="xa-trk ${i === X.track ? 'on' : ''}" data-i="${i}"><div class="xa-art" style="${artOf(i)}">♪</div><div class="m"><b>${H(t.제목)}</b><span>${H(t.가수)}</span></div><span>${i === X.track && X.playing ? '▶' : ''}</span></button>`).join('');
    $('#xaTracks').querySelectorAll('.xa-trk').forEach(b => b.onclick = () => { const i = +b.dataset.i; if (i !== X.track) playTrack(i); show('np'); });
    const mini = $('#xaMini');
    if (X.track >= 0){ const t = 음악목록[X.track]; mini.style.display = 'flex'; mini.innerHTML = `<div class="xa-art" style="${artOf(X.track)};width:36px;height:36px;font-size:16px">♪</div><div class="m"><b>${H(t.제목)}</b> · ${H(t.가수)}</div><button class="xa-pb" id="xaMiniPP">${X.playing ? '❚❚' : '▶'}</button>`;
      $('#xaMiniPP').onclick = e => { e.stopPropagation(); X.playing ? pauseMusic() : resume(); }; mini.onclick = () => show('np'); }
    else mini.style.display = 'none';
  };
  RENDER.np = () => {
    if (X.track < 0) return;
    const t = 음악목록[X.track];
    $('#npArt').style.cssText = artOf(X.track); $('#npArt').textContent = '♪';
    $('#npT').textContent = t.제목; $('#npA').textContent = t.가수;
    $('#npPP').textContent = X.playing ? '❚❚' : '▶';
    $('#npBar').style.width = Math.min(100, curPos() / trackLen() * 100) + '%'; $('#npCur').textContent = fmt(curPos()); $('#npDur').textContent = fmt(trackLen());
  };
  $('#npPP').onclick = () => X.playing ? pauseMusic() : resume();
  $('#npNext').onclick = next; $('#npPrev').onclick = prev;

  /* ================= 설정 ================= */
  const WALLS = [
    { n:'파란 물결', css:getComputedStyle(document.getElementById('home')).backgroundImage },
    { n:'노을', css:'radial-gradient(80% 40% at 70% 30%,rgba(255,220,150,.7),transparent 70%),linear-gradient(170deg,#3b1c4a 0%,#b24a3a 45%,#f2a14a 70%,#3b1c2a 100%)' },
    { n:'밤바다', css:'radial-gradient(40% 20% at 75% 18%,rgba(255,255,230,.8),transparent 70%),radial-gradient(120% 30% at 50% 80%,rgba(80,140,200,.35),transparent 70%),linear-gradient(#060b1c 0%,#14254a 55%,#0b1a33 70%,#02060f 100%)' },
    { n:'초록 들판', css:'radial-gradient(90% 40% at 30% 20%,rgba(255,255,255,.5),transparent 70%),linear-gradient(170deg,#3c8fd0 0%,#9ad0f0 40%,#7cc25a 55%,#2f7a2a 100%)' },
  ];
  function applyWall(){ const c = WALLS[X.wall].css; document.getElementById('home').style.backgroundImage = c; document.documentElement.style.setProperty('--wall', c); }
  function dialog(title, inner, onOk){
    dlg.innerHTML = `<div class="xa-box"><h3>${H(title)}</h3>${inner}<div class="ft"><button id="dlOk">확인</button><button id="dlNo">취소</button></div></div>`;
    dlg.classList.add('on');
    $('#dlNo').onclick = () => { dlg.classList.remove('on'); if (onOk && onOk.cancel) onOk.cancel(); };
    $('#dlOk').onclick = () => { dlg.classList.remove('on'); onOk && onOk(); };
    dlg.onclick = e => { if (e.target === dlg) $('#dlNo').onclick(); };
  }
  RENDER.setApp = () => {
    const row = (id, t, s, chk) => `<button class="xa-set" data-id="${id}"><div class="m"><b>${t}</b><span>${s}</span></div>${chk == null ? '<span class="ar">›</span>' : `<div class="xa-chk ${chk ? 'on' : ''}"></div>`}</button>`;
    $('#xaSet').innerHTML = `<div class="xa-sec">무선 및 네트워크</div>
      ${row('wifi', 'Wi-Fi', X.wifi ? '연결됨: MASAN_FREE' : 'Wi-Fi 끄기', X.wifi)}
      ${row('air', '비행기 탑승 모드', '모든 무선 연결 끄기', false)}
      <div class="xa-sec">소리</div>
      ${row('mute', '무음 모드', X.mute ? '벨소리·알림음이 꺼져 있습니다' : '모든 소리 켜짐', X.mute)}
      ${row('vib', '진동', X.vibrate ? '전화가 오면 진동' : '진동 끔', X.vibrate)}
      ${row('ring', '벨소리', RINGS[X.ring].n)}
      <div class="xa-sec">화면</div>
      ${row('bright', '밝기', X.bright + '%')}
      ${row('wall', '배경화면', WALLS[X.wall].n)}
      <div class="xa-sec">휴대폰</div>
      ${row('about', '휴대폰 정보', '모델 번호, 버전')}`;
    $('#xaSet').querySelectorAll('.xa-set').forEach(b => b.onclick = () => setAction(b.dataset.id));
  };
  function setAction(id){
    if (id === 'wifi'){ X.wifi = !X.wifi; toast(X.wifi ? 'Wi-Fi에 연결되었습니다' : 'Wi-Fi가 꺼졌습니다'); }
    if (id === 'air') toast('지금은 비행기 탑승 모드를 켤 수 없어요');
    if (id === 'mute'){ X.mute = !X.mute; toast(X.mute ? '무음 모드' : '소리 켜짐'); if (!X.mute) rawTone(880, 0, .12, .06, 'sine'); }
    if (id === 'vib'){ X.vibrate = !X.vibrate; if (X.vibrate && navigator.vibrate) navigator.vibrate(200); }
    if (id === 'ring'){
      let pick = X.ring;
      const draw = () => RINGS.map((r, i) => `<button class="xa-opt ${i === pick ? 'on' : ''}" data-i="${i}">${H(r.n)}<i></i></button>`).join('');
      dialog('벨소리', `<div id="dlList">${draw()}</div>`, () => { X.ring = pick; toast(`벨소리: ${RINGS[pick].n}`); RENDER.setApp(); });
      const bind = () => document.querySelectorAll('#dlList .xa-opt').forEach(b => b.onclick = () => { pick = +b.dataset.i; RINGS[pick].f(); $('#dlList').innerHTML = draw(); bind(); });
      bind(); return;
    }
    if (id === 'bright'){
      const old = X.bright;
      const ok = () => RENDER.setApp(); ok.cancel = () => { X.bright = old; dim.style.opacity = (100 - old) / 140; };
      dialog('밝기', `<div class="xa-sl"><input type="range" min="20" max="100" value="${X.bright}" id="dlRange"></div>`, ok);
      $('#dlRange').oninput = e => { X.bright = +e.target.value; dim.style.opacity = (100 - X.bright) / 140; };
      return;
    }
    if (id === 'wall'){
      let pick = X.wall;
      const draw = () => WALLS.map((w, i) => `<button class="${i === pick ? 'on' : ''}" data-i="${i}" style="background:${w.css}" title="${H(w.n)}"></button>`).join('');
      dialog('배경화면', `<div class="xa-wp" id="dlWp">${draw()}</div>`, () => { X.wall = pick; applyWall(); toast(`배경화면: ${WALLS[pick].n}`); RENDER.setApp(); });
      const bind = () => document.querySelectorAll('#dlWp button').forEach(b => b.onclick = () => { pick = +b.dataset.i; $('#dlWp').innerHTML = draw(); bind(); });
      bind(); return;
    }
    if (id === 'about') return show('about');
    RENDER.setApp();
  }
  RENDER.about = () => {
    const i = 휴대폰정보;
    $('#xaAbout').innerHTML = [['휴대폰 주인', i.주인], ['내 전화번호', i.번호], ['모델 번호', i.모델], ['펌웨어 버전', i.버전], ['배터리 상태', '충전 중이 아님 (78%)'], ['오늘 날짜', `${연도}년 ${D().날짜}`]]
      .map(([a, b]) => `<div><b>${H(a)}</b><span>${H(b)}</span></div>`).join('');
  };

  /* ================= 애플리케이션 (전체 앱) ================= */
  const CALC = { k:'calc', n:'계산기', go:() => show('calc') };
  RENDER.appdrawer = () => {
    const all = [...DOCK.filter(a => a.k !== 'apps'), ...APPS, CALC];
    $('#xaGrid').innerHTML = all.map(a => icon(a)).join('');
    $('#xaGrid').querySelectorAll('[data-app]').forEach(b => b.onclick = () => { const a = all.find(x => x.k === b.dataset.app); a.go ? a.go() : toast(`${a.n} — 지금은 열 수 없어요`); });
    updateBadges();
  };

  /* ================= 계산기 ================= */
  const C = X.calc;
  const fmtN = n => { if (!isFinite(n)) return '오류'; const s = String(+n.toPrecision(10)); return s.length > 12 ? (+n).toExponential(5) : s; };
  const calcOp = (a, b, op) => op === '+' ? a + b : op === '−' ? a - b : op === '×' ? a * b : op === '÷' ? a / b : b;
  RENDER.calc = () => {
    const K = ['C', '±', '%', '÷', '7', '8', '9', '×', '4', '5', '6', '−', '1', '2', '3', '+', '0', '.', '⌫', '='];
    $('#cxKeys').innerHTML = K.map(k => `<button class="${'÷×−+'.includes(k) ? 'op' : k === '=' ? 'eq' : ''}" data-k="${k}">${k}</button>`).join('');
    $('#cxKeys').querySelectorAll('button').forEach(b => b.onclick = () => calcKey(b.dataset.k));
    $('#cxOut').textContent = C.cur; $('#cxExp').textContent = C.exp;
  };
  function calcKey(k){
    if (/\d/.test(k)){ C.cur = (C.cur === '0' || C.fresh) ? k : (C.cur.length < 12 ? C.cur + k : C.cur); C.fresh = false; }
    else if (k === '.'){ if (C.fresh){ C.cur = '0.'; C.fresh = false; } else if (!C.cur.includes('.')) C.cur += '.'; }
    else if (k === 'C'){ Object.assign(C, { cur:'0', prev:null, op:null, exp:'', fresh:false }); }
    else if (k === '⌫'){ C.cur = C.cur.length > 1 ? C.cur.slice(0, -1) : '0'; }
    else if (k === '±'){ C.cur = fmtN(-parseFloat(C.cur)); }
    else if (k === '%'){ C.cur = fmtN(parseFloat(C.cur) / 100); }
    else if ('÷×−+'.includes(k)){ if (C.op && !C.fresh) C.prev = calcOp(C.prev, parseFloat(C.cur), C.op); else if (C.prev == null || !C.op) C.prev = parseFloat(C.cur); C.op = k; C.exp = `${fmtN(C.prev)} ${k}`; C.cur = fmtN(C.prev); C.fresh = true; }
    else if (k === '='){ if (C.op){ const b = parseFloat(C.cur), r = calcOp(C.prev, b, C.op); C.exp = `${fmtN(C.prev)} ${C.op} ${fmtN(b)} =`; C.cur = fmtN(r); C.prev = null; C.op = null; C.fresh = true; } }
    rawTone(1100, 0, .04, .03, 'sine');
    $('#cxOut').textContent = C.cur; $('#cxExp').textContent = C.exp;
  }
})();
