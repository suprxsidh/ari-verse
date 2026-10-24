(function () {
  "use strict";

  window.GAMES = window.GAMES || {};

  const ITEMS = [
    { id: "gloves", name: "Ruby Gloves", emoji: "🧤", price: 12 },
    { id: "vial", name: "Moon Vial", emoji: "🧪", price: 22 },
    { id: "bow", name: "Robot Bow", emoji: "🎀", price: 34 },
    { id: "goggles", name: "Star Goggles", emoji: "🥽", price: 35 },
    { id: "tape", name: "Golden Tape", emoji: "📼", price: 9 },
    { id: "beaker", name: "Pink Beaker", emoji: "⚗️", price: 18 }
  ];

  const DIALS = [
    { id: "mood", label: "Mood", opts: ["Dreamy", "Bold", "Cozy"] },
    { id: "color", label: "Color", opts: ["Pink", "Silver", "Gold"] },
    { id: "sound", label: "Sound", opts: ["Soft", "Sparkle", "Bass"] }
  ];

  const EMOJI_MAP = {
    "Dreamy-Pink": "🌸", "Dreamy-Silver": "🌙", "Dreamy-Gold": "✨",
    "Bold-Pink": "💖", "Bold-Silver": "⚡", "Bold-Gold": "👑",
    "Cozy-Pink": "🧸", "Cozy-Silver": "☁️", "Cozy-Gold": "🍯"
  };

  const SOUND_TEXT = {
    "Soft": "gentle velvet melodies and floating daydreams",
    "Sparkle": "glittering synth chimes and starry midnight magic",
    "Bass": "confident retro beats that shake the whole laboratory"
  };

  window.GAMES["lab"] = {
    title: "The Birthday Machine",
    intro: "Ring up exactly 69 at the lab register, then mix and pull the lever for your custom era card!",

    mount(root, api) {
      let state = {
        stage: 1,
        cart: [],
        mistakes: 0,
        dials: [0, 0, 0],
        leverPulled: false,
        won: false
      };

      let timers = [];
      let idleTimer = null;
      let resizeObserver = null;

      function addTimer(fn, ms) {
        const id = setTimeout(fn, ms);
        timers.push(id);
        return id;
      }

      function safeTone(f, d, t, v) {
        try { api.tone(f, d, t, v); } catch (e) {}
      }
      function safeChord(arr, d) {
        try { api.chord(arr, d); } catch (e) {}
      }
      function safeVibe(ms) {
        try { api.vibrate(ms); } catch (e) {}
      }

      // Inject styles
      const style = document.createElement("style");
      const p = api.palette || { bg1: "#1a0924", bg2: "#2d123d", accent: "#ff2a85", text: "#ffffff" };
      style.textContent = `
        .g-lab-wrap {
          position: absolute; inset: 0;
          background: radial-gradient(circle at 50% 20%, ${p.bg2}, ${p.bg1} 85%);
          color: ${p.text};
          font-family: inherit;
          display: flex; flex-direction: column;
          padding: 8px 12px; box-sizing: border-box;
          user-select: none; -webkit-user-select: none;
          overflow: hidden;
        }
        .g-lab-deco {
          position: absolute; pointer-events: none; opacity: 0.14; z-index: 0;
          font-size: 48px;
        }
        .g-lab-gear1 { top: -10px; left: -10px; animation: g-lab-spin 18s linear infinite; }
        .g-lab-gear2 { bottom: -15px; right: -10px; animation: g-lab-spin 24s linear infinite reverse; }
        @keyframes g-lab-spin { 100% { transform: rotate(360deg); } }

        .g-lab-panel {
          position: relative; z-index: 1;
          background: rgba(15, 25, 35, 0.78);
          border: 2px solid #00f0ff;
          box-shadow: 0 0 12px rgba(0, 240, 255, 0.3), inset 0 0 15px rgba(255, 42, 133, 0.2);
          border-radius: 14px;
          padding: 8px 10px;
          margin-bottom: 8px;
          display: flex; flex-direction: column;
          transition: opacity 0.3s, filter 0.3s, transform 0.3s;
        }
        .g-lab-panel.g-lab-locked {
          opacity: 0.45;
          filter: grayscale(0.6);
          pointer-events: none;
        }
        .g-lab-header {
          display: flex; justify-content: space-between; align-items: center;
          font-size: 12px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 1px; color: #00f0ff; margin-bottom: 6px;
          text-shadow: 0 0 6px rgba(0,240,255,0.5);
        }
        .g-lab-lights { display: flex; gap: 5px; }
        .g-lab-bulb {
          width: 9px; height: 9px; border-radius: 50%;
          background: #ff2a85; box-shadow: 0 0 6px #ff2a85;
          transition: background 0.2s, box-shadow 0.2s;
        }
        .g-lab-bulb.g-lab-teal { background: #00f0ff; box-shadow: 0 0 6px #00f0ff; }
        .g-lab-flash .g-lab-bulb {
          animation: g-lab-blink 0.18s infinite alternate;
        }
        @keyframes g-lab-blink {
          0% { background: #ff2a85; box-shadow: 0 0 10px #ff2a85; transform: scale(1.2); }
          100% { background: #00f0ff; box-shadow: 0 0 10px #00f0ff; transform: scale(0.9); }
        }

        /* Stage 1: Register */
        .g-lab-display {
          background: #061519;
          border: 2px inset #00f0ff;
          border-radius: 8px;
          padding: 6px 10px;
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 8px;
          min-height: 36px;
        }
        .g-lab-status {
          font-size: 13px; color: #aefb2a; font-family: monospace;
          text-shadow: 0 0 5px rgba(174, 251, 42, 0.5);
          flex: 1; padding-right: 6px;
        }
        .g-lab-total {
          font-size: 22px; font-weight: 800; font-family: monospace;
          color: #00f0ff; text-shadow: 0 0 8px #00f0ff;
          letter-spacing: 1px;
        }
        .g-lab-display.g-lab-over {
          border-color: #ff2a85;
          animation: g-lab-shake 0.35s ease;
        }
        .g-lab-display.g-lab-over .g-lab-status,
        .g-lab-display.g-lab-over .g-lab-total {
          color: #ff2a85; text-shadow: 0 0 8px #ff2a85;
        }
        @keyframes g-lab-shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        .g-lab-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px;
          margin-bottom: 6px;
        }
        .g-lab-item {
          background: linear-gradient(145deg, rgba(255,42,133,0.18), rgba(0,240,255,0.1));
          border: 1.5px solid rgba(255, 42, 133, 0.6);
          border-radius: 10px;
          min-height: 52px;
          padding: 4px;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          color: #fff; cursor: pointer; touch-action: manipulation;
          transition: transform 0.1s, border-color 0.2s, box-shadow 0.2s;
        }
        .g-lab-item:active { transform: scale(0.94); }
        .g-lab-item.g-lab-nudge {
          border-color: #aefb2a;
          box-shadow: 0 0 12px #aefb2a, inset 0 0 8px rgba(174,251,42,0.4);
        }
        .g-lab-item-top { display: flex; align-items: center; gap: 4px; font-size: 16px; font-weight: 700; }
        .g-lab-item-price { color: #00f0ff; font-family: monospace; font-size: 14px; }
        .g-lab-item-name { font-size: 10px; opacity: 0.9; text-align: center; line-height: 1.1; margin-top: 2px; }

        .g-lab-controls { display: flex; gap: 8px; }
        .g-lab-btn {
          flex: 1; min-height: 44px;
          background: rgba(0, 240, 255, 0.15);
          border: 1.5px solid #00f0ff;
          border-radius: 8px;
          color: #fff; font-weight: 700; font-size: 13px;
          cursor: pointer; touch-action: manipulation;
          display: flex; align-items: center; justify-content: center; gap: 4px;
        }
        .g-lab-btn:active { transform: scale(0.96); background: rgba(0, 240, 255, 0.3); }
        .g-lab-btn-pink {
          background: linear-gradient(90deg, #ff2a85, #ff5e9c);
          border-color: #fff;
          box-shadow: 0 0 10px rgba(255, 42, 133, 0.6);
          color: #fff;
        }

        /* Stage 2: Mixer */
        .g-lab-stage2 { flex: 1; display: flex; flex-direction: column; justify-content: space-between; margin-bottom: 0; }
        .g-lab-mixer-row {
          display: flex; gap: 8px; align-items: stretch; flex: 1; min-height: 120px;
        }
        .g-lab-dials {
          flex: 1; display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px;
        }
        .g-lab-dial {
          background: rgba(0, 0, 0, 0.45);
          border: 1.5px solid #00f0ff;
          border-radius: 10px;
          min-height: 44px;
          padding: 6px 2px;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          cursor: pointer; touch-action: manipulation;
        }
        .g-lab-dial:active { transform: scale(0.95); }
        .g-lab-dial-knob {
          width: 34px; height: 34px; border-radius: 50%;
          border: 2px solid #ff2a85;
          background: radial-gradient(circle, #2d123d, #09030e);
          box-shadow: 0 0 8px rgba(255,42,133,0.5);
          position: relative; margin-bottom: 5px;
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .g-lab-dial-knob::after {
          content: ""; position: absolute; top: 3px; left: 50%;
          transform: translateX(-50%);
          width: 3px; height: 9px; border-radius: 2px; background: #00f0ff;
        }
        .g-lab-dial-lbl { font-size: 10px; text-transform: uppercase; opacity: 0.75; }
        .g-lab-dial-val { font-size: 12px; font-weight: 700; color: #00f0ff; margin-top: 2px; }

        .g-lab-lever-box {
          width: 82px; display: flex; flex-direction: column; align-items: center; justify-content: space-between;
          background: rgba(255, 42, 133, 0.1);
          border: 1.5px dashed rgba(255, 42, 133, 0.6);
          border-radius: 10px; padding: 6px 4px;
        }
        .g-lab-lever-box.g-lab-nudge {
          border-color: #aefb2a; box-shadow: 0 0 12px #aefb2a;
        }
        .g-lab-track {
          position: relative; width: 12px; flex: 1; min-height: 48px;
          background: #061519; border-radius: 6px; border: 1px solid #00f0ff;
          margin: 4px 0; touch-action: none;
        }
        .g-lab-handle {
          position: absolute; left: 50%; top: 0;
          transform: translate(-50%, 0);
          width: 44px; height: 28px; border-radius: 14px;
          background: radial-gradient(circle at 30% 30%, #ff7eb3, #ff2a85);
          border: 2px solid #fff;
          box-shadow: 0 2px 8px rgba(255,42,133,0.8);
          cursor: grab; touch-action: none;
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 800;
        }
        .g-lab-pull-btn {
          width: 100%; min-height: 44px;
          border-radius: 8px; border: 1.5px solid #fff;
          background: #ff2a85; color: #fff;
          font-weight: 800; font-size: 12px; text-transform: uppercase;
          cursor: pointer; touch-action: manipulation;
          box-shadow: 0 0 8px rgba(255,42,133,0.6);
        }
        .g-lab-pull-btn:active { transform: scale(0.95); }

        /* Era Card Flip */
        .g-lab-card-wrap {
          display: none; flex-direction: column; justify-content: space-between; flex: 1;
          animation: g-lab-flipIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .g-lab-card-wrap.g-lab-show { display: flex; }
        @keyframes g-lab-flipIn {
          0% { opacity: 0; transform: perspective(600px) rotateY(90deg) scale(0.9); }
          100% { opacity: 1; transform: perspective(600px) rotateY(0deg) scale(1); }
        }
        .g-lab-card {
          background: linear-gradient(135deg, rgba(255,42,133,0.28), rgba(0,240,255,0.22));
          border: 2px solid #fff;
          box-shadow: 0 0 16px rgba(255,42,133,0.5), inset 0 0 12px rgba(0,240,255,0.4);
          border-radius: 12px; padding: 10px 12px;
          text-align: center; margin-bottom: 8px;
          display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1;
        }
        .g-lab-card-sup { font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #00f0ff; font-weight: 700; }
        .g-lab-card-title { font-size: 17px; font-weight: 800; margin: 4px 0; color: #fff; text-shadow: 0 0 8px #ff2a85; }
        .g-lab-card-emoji { font-size: 32px; margin: 2px 0; filter: drop-shadow(0 0 8px rgba(255,255,255,0.6)); }
        .g-lab-card-desc { font-size: 12px; line-height: 1.35; opacity: 0.95; max-width: 280px; }

        /* Compact height adjustments */
        .g-lab-compact .g-lab-panel { padding: 6px 8px; margin-bottom: 5px; }
        .g-lab-compact .g-lab-item { min-height: 44px; padding: 2px; }
        .g-lab-compact .g-lab-display { min-height: 30px; padding: 4px 8px; margin-bottom: 5px; }
        .g-lab-compact .g-lab-card-emoji { font-size: 24px; }
      `;
      root.appendChild(style);

      // Build DOM
      const wrap = document.createElement("div");
      wrap.className = "g-lab-wrap";
      wrap.innerHTML = `
        <div class="g-lab-deco g-lab-gear1">⚙️</div>
        <div class="g-lab-deco g-lab-gear2">⚗️</div>

        <!-- STAGE 1 -->
        <div class="g-lab-panel" id="g-lab-s1">
          <div class="g-lab-header">
            <span>01 // Lab Register</span>
            <div class="g-lab-lights">
              <div class="g-lab-bulb"></div>
              <div class="g-lab-bulb g-lab-teal"></div>
              <div class="g-lab-bulb"></div>
            </div>
          </div>
          <div class="g-lab-display" id="g-lab-disp">
            <div class="g-lab-status" id="g-lab-status">TARGET: 69</div>
            <div class="g-lab-total" id="g-lab-total">00</div>
          </div>
          <div class="g-lab-grid" id="g-lab-grid"></div>
          <div class="g-lab-controls">
            <button type="button" class="g-lab-btn" id="g-lab-undo">↩ Undo</button>
            <button type="button" class="g-lab-btn" id="g-lab-clear">✖ Clear</button>
          </div>
        </div>

        <!-- STAGE 2 -->
        <div class="g-lab-panel g-lab-stage2 g-lab-locked" id="g-lab-s2">
          <div class="g-lab-header">
            <span>02 // Era Synthesizer</span>
            <div class="g-lab-lights">
              <div class="g-lab-bulb g-lab-teal"></div>
              <div class="g-lab-bulb"></div>
              <div class="g-lab-bulb g-lab-teal"></div>
            </div>
          </div>

          <div class="g-lab-mixer-row" id="g-lab-mixer">
            <div class="g-lab-dials" id="g-lab-dials"></div>
            <div class="g-lab-lever-box" id="g-lab-lever-box">
              <div class="g-lab-track" id="g-lab-track">
                <div class="g-lab-handle" id="g-lab-handle">⬇</div>
              </div>
              <button type="button" class="g-lab-pull-btn" id="g-lab-pull">Pull</button>
            </div>
          </div>

          <div class="g-lab-card-wrap" id="g-lab-card-wrap">
            <div class="g-lab-card">
              <div class="g-lab-card-sup">Your Supreme Era</div>
              <div class="g-lab-card-title" id="g-lab-c-title"></div>
              <div class="g-lab-card-emoji" id="g-lab-c-emoji"></div>
              <div class="g-lab-card-desc" id="g-lab-c-desc"></div>
            </div>
            <button type="button" class="g-lab-btn g-lab-btn-pink" id="g-lab-collect">✨ Collect Card ✨</button>
          </div>
        </div>
      `;
      root.appendChild(wrap);

      // References
      const s1Panel = wrap.querySelector("#g-lab-s1");
      const s2Panel = wrap.querySelector("#g-lab-s2");
      const dispEl = wrap.querySelector("#g-lab-disp");
      const statusEl = wrap.querySelector("#g-lab-status");
      const totalEl = wrap.querySelector("#g-lab-total");
      const gridEl = wrap.querySelector("#g-lab-grid");
      const undoBtn = wrap.querySelector("#g-lab-undo");
      const clearBtn = wrap.querySelector("#g-lab-clear");
      const dialsEl = wrap.querySelector("#g-lab-dials");
      const mixerRow = wrap.querySelector("#g-lab-mixer");
      const leverBox = wrap.querySelector("#g-lab-lever-box");
      const trackEl = wrap.querySelector("#g-lab-track");
      const handleEl = wrap.querySelector("#g-lab-handle");
      const pullBtn = wrap.querySelector("#g-lab-pull");
      const cardWrap = wrap.querySelector("#g-lab-card-wrap");
      const cTitle = wrap.querySelector("#g-lab-c-title");
      const cEmoji = wrap.querySelector("#g-lab-c-emoji");
      const cDesc = wrap.querySelector("#g-lab-c-desc");
      const collectBtn = wrap.querySelector("#g-lab-collect");

      const itemEls = {};

      // Populate Stage 1 items
      ITEMS.forEach((it) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "g-lab-item";
        btn.dataset.id = it.id;
        btn.innerHTML = `
          <div class="g-lab-item-top">
            <span>${it.emoji}</span>
            <span class="g-lab-item-price">${it.price}</span>
          </div>
          <div class="g-lab-item-name">${it.name}</div>
        `;
        btn.addEventListener("pointerdown", (e) => {
          e.preventDefault();
          onItemTap(it);
        });
        gridEl.appendChild(btn);
        itemEls[it.id] = btn;
      });

      // Populate Stage 2 dials
      const dialEls = [];
      DIALS.forEach((d, idx) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "g-lab-dial";
        btn.dataset.dial = d.id;
        btn.innerHTML = `
          <div class="g-lab-dial-knob"></div>
          <div class="g-lab-dial-lbl">${d.label}</div>
          <div class="g-lab-dial-val">${d.opts[0]}</div>
        `;
        btn.addEventListener("pointerdown", (e) => {
          e.preventDefault();
          onDialTap(idx);
        });
        dialsEl.appendChild(btn);
        dialEls.push(btn);
      });

      // Idle / Nudge logic
      function clearNudges() {
        Object.values(itemEls).forEach((el) => el.classList.remove("g-lab-nudge"));
        leverBox.classList.remove("g-lab-nudge");
      }

      function triggerNudge() {
        if (state.won) return;
        clearNudges();
        if (state.stage === 1) {
          itemEls["bow"].classList.add("g-lab-nudge");
          itemEls["goggles"].classList.add("g-lab-nudge");
          if (getSum() === 0) {
            statusEl.textContent = "HINT: TRY 34 + 35";
          }
        } else if (state.stage === 2 && !state.leverPulled) {
          leverBox.classList.add("g-lab-nudge");
        }
      }

      function resetIdle() {
        clearNudges();
        if (idleTimer) clearTimeout(idleTimer);
        idleTimer = setTimeout(triggerNudge, 8000);
      }

      // Stage 1 Logic
      function getSum() {
        return state.cart.reduce((acc, it) => acc + it.price, 0);
      }

      function updateRegisterUI() {
        const sum = getSum();
        totalEl.textContent = sum < 10 ? "0" + sum : String(sum);
        dispEl.classList.remove("g-lab-over");

        if (sum < 69) {
          const expr = state.cart.map((i) => i.price).join("+");
          statusEl.textContent = expr ? expr : "TARGET: 69";
        } else if (sum > 69) {
          dispEl.classList.add("g-lab-over");
          statusEl.textContent = "Too much! Undo or clear.";
          state.mistakes++;
          safeTone(190, 0.22, "sawtooth", 0.08);
          safeVibe(45);
          if (state.mistakes >= 2) {
            triggerNudge();
          }
        } else if (sum === 69) {
          state.stage = 2;
          const ids = state.cart.map((i) => i.id);
          const used3435 = state.cart.length === 2 && ids.includes("bow") && ids.includes("goggles");
          statusEl.textContent = used3435 ? "34 + 35 = 69" : "69, perfect!";
          safeChord([587.33, 880, 1174.66], 0.35);
          safeVibe(60);

          s1Panel.classList.add("g-lab-locked");
          s2Panel.classList.remove("g-lab-locked");
          resetIdle();
        }
      }

      function onItemTap(item) {
        if (state.stage !== 1) return;
        resetIdle();
        if (getSum() >= 69) {
          // Gentle reminder to undo/clear first
          dispEl.classList.remove("g-lab-over");
          void dispEl.offsetWidth;
          dispEl.classList.add("g-lab-over");
          safeTone(180, 0.15, "sawtooth", 0.06);
          return;
        }
        state.cart.push(item);
        safeTone(360 + item.price * 7, 0.08, "sine", 0.07);
        safeVibe(15);
        updateRegisterUI();
      }

      undoBtn.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        if (state.stage !== 1) return;
        resetIdle();
        if (state.cart.length > 0) {
          state.cart.pop();
          safeTone(300, 0.08, "triangle", 0.07);
          updateRegisterUI();
        }
      });

      clearBtn.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        if (state.stage !== 1) return;
        resetIdle();
        state.cart = [];
        safeTone(250, 0.1, "triangle", 0.07);
        updateRegisterUI();
      });

      // Stage 2 Logic
      function onDialTap(idx) {
        if (state.stage !== 2 || state.leverPulled) return;
        resetIdle();
        state.dials[idx] = (state.dials[idx] + 1) % 3;
        const val = DIALS[idx].opts[state.dials[idx]];
        const el = dialEls[idx];
        el.querySelector(".g-lab-dial-val").textContent = val;
        const deg = (state.dials[idx] - 1) * 50;
        el.querySelector(".g-lab-dial-knob").style.transform = `rotate(${deg}deg)`;
        safeTone(440 + idx * 90 + state.dials[idx] * 45, 0.07, "sine", 0.07);
        safeVibe(12);
      }

      //Initial knob angles
      dialEls.forEach((el) => {
        el.querySelector(".g-lab-dial-knob").style.transform = "rotate(-50deg)";
      });

      function triggerLeverSuccess() {
        if (state.stage !== 2 || state.leverPulled) return;
        state.leverPulled = true;
        resetIdle();

        // Animate lever handle to bottom
        const maxTravel = Math.max(20, trackEl.clientHeight - handleEl.offsetHeight);
        handleEl.style.top = maxTravel + "px";

        safeChord([440, 554.37, 659.25, 880], 0.45);
        safeVibe(80);

        if (!api.reduceMotion) {
          wrap.classList.add("g-lab-flash");
        }

        const mood = DIALS[0].opts[state.dials[0]];
        const color = DIALS[1].opts[state.dials[1]];
        const sound = DIALS[2].opts[state.dials[2]];

        cTitle.textContent = `The ${mood} ${color} Era`;
        cEmoji.textContent = EMOJI_MAP[`${mood}-${color}`] || "💖";
        cDesc.textContent = `Your birthday lab formula blends ${color.toLowerCase()} retro sparkle with ${SOUND_TEXT[sound]}.`;

        const delay = api.reduceMotion ? 60 : 350;
        addTimer(() => {
          wrap.classList.remove("g-lab-flash");
          mixerRow.style.display = "none";
          cardWrap.classList.add("g-lab-show");
        }, delay);
      }

      // Lever drag handling
      let dragging = false;
      let startY = 0;

      handleEl.addEventListener("pointerdown", (e) => {
        if (state.stage !== 2 || state.leverPulled) return;
        e.preventDefault();
        resetIdle();
        dragging = true;
        startY = e.clientY;
        try { handleEl.setPointerCapture(e.pointerId); } catch (err) {}
      });

      handleEl.addEventListener("pointermove", (e) => {
        if (!dragging || state.leverPulled) return;
        const maxTravel = Math.max(24, trackEl.clientHeight - handleEl.offsetHeight);
        const dy = Math.max(0, Math.min(maxTravel, e.clientY - startY));
        handleEl.style.top = dy + "px";
        if (dy >= maxTravel * 0.7) {
          dragging = false;
          triggerLeverSuccess();
        }
      });

      function endDrag() {
        if (!dragging) return;
        dragging = false;
        if (!state.leverPulled) {
          handleEl.style.top = "0px";
        }
      }
      handleEl.addEventListener("pointerup", endDrag);
      handleEl.addEventListener("pointercancel", endDrag);

      pullBtn.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        triggerLeverSuccess();
      });

      collectBtn.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        if (state.won) return;
        state.won = true;
        resetIdle();
        safeChord([523.25, 659.25, 783.99, 1046.5], 0.5);
        safeVibe(100);
        if (!api.reduceMotion) {
          wrap.classList.add("g-lab-flash");
        }
        const winDelay = api.reduceMotion ? 50 : 650;
        addTimer(() => {
          wrap.classList.remove("g-lab-flash");
          api.win();
        }, winDelay);
      });

      // Responsive layout check
      function checkLayout() {
        if (!root) return;
        if (root.clientHeight < 550) {
          wrap.classList.add("g-lab-compact");
        } else {
          wrap.classList.remove("g-lab-compact");
        }
      }
      checkLayout();

      if (typeof ResizeObserver !== "undefined") {
        try {
          resizeObserver = new ResizeObserver(checkLayout);
          resizeObserver.observe(root);
        } catch (e) {}
      }

      resetIdle();

      return function cleanup() {
        timers.forEach(clearTimeout);
        if (idleTimer) clearTimeout(idleTimer);
        if (resizeObserver) {
          try { resizeObserver.disconnect(); } catch (e) {}
        }
      };
    },

    async solveForTest(root, api) {
      const wait = (ms) => new Promise((r) => setTimeout(r, ms));
      const tap = (el) => {
        if (!el) return;
        el.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, cancelable: true }));
        el.dispatchEvent(new PointerEvent("pointerup", { bubbles: true, cancelable: true }));
      };

      await wait(60);
      const bow = root.querySelector('[data-id="bow"]');
      const goggles = root.querySelector('[data-id="goggles"]');
      tap(bow);
      await wait(80);
      tap(goggles);
      await wait(120);

      const dialMood = root.querySelector('[data-dial="mood"]');
      const dialColor = root.querySelector('[data-dial="color"]');
      tap(dialMood);
      await wait(60);
      tap(dialColor);
      await wait(60);

      const pullBtn = root.querySelector("#g-lab-pull");
      tap(pullBtn);
      await wait(450);

      const collectBtn = root.querySelector("#g-lab-collect");
      tap(collectBtn);
      await wait(100);
    }
  };
})();