(function () {
  "use strict";

  window.GAMES = window.GAMES || {};

  const ROUND_LENGTHS = [2, 3, 4, 5, 6];
  const PAD_DATA = [
    { id: 0, name: "rose", color: "#e88b9c", glow: "#ffbfd0", freq: 329.63, icon: "☀️" },
    { id: 1, name: "gold", color: "#e5b567", glow: "#ffe3a8", freq: 392.00, icon: "✨" },
    { id: 2, name: "teal", color: "#68b0ab", glow: "#b8f2ee", freq: 493.88, icon: "🫧" },
    { id: 3, name: "lavender", color: "#9d8cbe", glow: "#decfff", freq: 587.33, icon: "🧸" }
  ];

  window.GAMES["memory"] = {
    title: "Brighter Days",
    intro: "Watch the glowing memory pads, then tap the sequence back in the same order.",

    mount(root, api) {
      let unmounted = false;
      const timers = new Set();
      let idleTimer = null;

      function setTimer(fn, ms) {
        const id = setTimeout(() => {
          timers.delete(id);
          if (!unmounted) fn();
        }, ms);
        timers.add(id);
        return id;
      }

      function clearAllTimers() {
        timers.forEach((id) => clearTimeout(id));
        timers.clear();
        if (idleTimer) {
          clearTimeout(idleTimer);
          idleTimer = null;
        }
      }

      function safeTone(freq, dur, type = "sine", vol = 0.12) {
        try {
          if (api && api.tone) api.tone(freq, dur, type, vol);
        } catch (e) {}
      }

      function safeChord(freqs, dur) {
        try {
          if (api && api.chord) api.chord(freqs, dur);
        } catch (e) {}
      }

      function safeVibrate(ms) {
        try {
          if (api && api.vibrate) api.vibrate(ms);
        } catch (e) {}
      }

      const pal = (api && api.palette) || {};
      const bg1 = pal.bg1 || "#f7EFE5";
      const bg2 = pal.bg2 || "#e8d8c8";
      const accent = pal.accent || "#a41623";
      const textCol = pal.text || "#3d2622";

      const style = document.createElement("style");
      style.textContent = `
        .g-memory-wrap {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 16px;
          box-sizing: border-box;
          background: radial-gradient(circle at 80% 12%, rgba(255, 246, 224, 0.9) 0%, ${bg1} 45%, ${bg2} 100%);
          color: ${textCol};
          font-family: inherit;
          user-select: none;
          -webkit-user-select: none;
          touch-action: manipulation;
          overflow: hidden;
        }
        .g-memory-sunbeam {
          position: absolute;
          top: -15%;
          right: -15%;
          width: 75%;
          height: 55%;
          background: linear-gradient(135deg, rgba(255,250,235,0.65) 0%, rgba(255,250,235,0) 70%);
          transform: rotate(-15deg);
          pointer-events: none;
          z-index: 0;
        }
        .g-memory-header {
          z-index: 1;
          width: 100%;
          max-width: 340px;
          background: rgba(255, 252, 247, 0.85);
          border: 1.5px solid rgba(164, 22, 35, 0.2);
          border-radius: 14px;
          padding: 10px 14px;
          box-shadow: 0 4px 14px rgba(61, 38, 34, 0.06);
          text-align: center;
          box-sizing: border-box;
        }
        .g-memory-clinic-tag {
          font-size: 11px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: ${accent};
          font-weight: 700;
          margin-bottom: 4px;
        }
        .g-memory-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin: 6px 0 8px;
        }
        .g-memory-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(61, 38, 34, 0.16);
          transition: transform 0.25s ease, background 0.25s ease;
        }
        .g-memory-dot.is-current {
          background: ${accent};
          transform: scale(1.25);
        }
        .g-memory-dot.is-done {
          background: #d47a84;
        }
        .g-memory-status {
          font-size: 14px;
          min-height: 20px;
          font-weight: 600;
          color: ${textCol};
          transition: opacity 0.2s;
        }
        .g-memory-board-area {
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          flex: 1;
          min-height: 0;
        }
        .g-memory-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: 14px;
          width: 260px;
          height: 260px;
          padding: 14px;
          background: rgba(255, 250, 242, 0.7);
          border-radius: 28px;
          border: 1px solid rgba(61, 38, 34, 0.1);
          box-shadow: inset 0 2px 8px rgba(0,0,0,0.04), 0 8px 24px rgba(61, 38, 34, 0.08);
          box-sizing: border-box;
        }
        .g-memory-grid.g-memory-shake {
          animation: g-memory-shake-anim 0.35s ease;
        }
        @keyframes g-memory-shake-anim {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          75% { transform: translateX(6px); }
        }
        .g-memory-pad {
          position: relative;
          border: none;
          border-radius: 20px;
          background: var(--pad-col);
          box-shadow: 0 5px 0 rgba(61, 38, 34, 0.15), inset 0 2px 4px rgba(255, 255, 255, 0.5);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          transition: transform 0.12s ease, filter 0.15s ease, box-shadow 0.15s ease;
          touch-action: none;
          outline: none;
          min-width: 60px;
          min-height: 60px;
          -webkit-tap-highlight-color: transparent;
        }
        .g-memory-pad::after {
          content: "";
          position: absolute;
          inset: 6px;
          border-radius: 15px;
          border: 1.5px solid rgba(255, 255, 255, 0.35);
          pointer-events: none;
        }
        .g-memory-pad.is-lit {
          transform: translateY(3px) scale(0.98);
          background: var(--pad-glow);
          box-shadow: 0 2px 0 rgba(61, 38, 34, 0.15), 0 0 24px var(--pad-glow), inset 0 0 12px #ffffff;
          filter: brightness(1.1);
        }
        .g-memory-pad.is-hint {
          box-shadow: 0 5px 0 rgba(61, 38, 34, 0.15), 0 0 0 4px ${accent};
        }
        .g-memory-footer {
          z-index: 1;
          min-height: 54px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
        }
        .g-memory-begin-btn {
          background: ${accent};
          color: #fffaf5;
          border: none;
          border-radius: 999px;
          padding: 12px 34px;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 0.5px;
          font-family: inherit;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(164, 22, 35, 0.35);
          min-height: 48px;
          min-width: 140px;
          touch-action: none;
          transition: transform 0.12s ease, opacity 0.2s ease;
        }
        .g-memory-begin-btn:active {
          transform: scale(0.96);
        }
        .g-memory-begin-btn[hidden] {
          display: none;
        }
        .g-memory-subnote {
          font-size: 12px;
          opacity: 0.75;
          text-align: center;
        }
      `;
      root.appendChild(style);

      const wrap = document.createElement("div");
      wrap.className = "g-memory-wrap";

      const sunbeam = document.createElement("div");
      sunbeam.className = "g-memory-sunbeam";
      wrap.appendChild(sunbeam);

      const header = document.createElement("div");
      header.className = "g-memory-header";

      const tag = document.createElement("div");
      tag.className = "g-memory-clinic-tag";
      tag.textContent = "Brighter Days Inc. • Room 24";

      const dotsWrap = document.createElement("div");
      dotsWrap.className = "g-memory-dots";
      const dots = ROUND_LENGTHS.map(() => {
        const d = document.createElement("div");
        d.className = "g-memory-dot";
        dotsWrap.appendChild(d);
        return d;
      });

      const statusEl = document.createElement("div");
      statusEl.className = "g-memory-status";
      statusEl.textContent = "Tap Begin when you're ready";

      header.appendChild(tag);
      header.appendChild(dotsWrap);
      header.appendChild(statusEl);
      wrap.appendChild(header);

      const boardArea = document.createElement("div");
      boardArea.className = "g-memory-board-area";

      const grid = document.createElement("div");
      grid.className = "g-memory-grid";

      const padEls = PAD_DATA.map((p) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "g-memory-pad";
        btn.dataset.pad = String(p.id);
        btn.setAttribute("aria-label", p.name + " pad");
        btn.style.setProperty("--pad-col", p.color);
        btn.style.setProperty("--pad-glow", p.glow);
        btn.textContent = p.icon;
        grid.appendChild(btn);
        return btn;
      });

      boardArea.appendChild(grid);
      wrap.appendChild(boardArea);

      const footer = document.createElement("div");
      footer.className = "g-memory-footer";

      const beginBtn = document.createElement("button");
      beginBtn.type = "button";
      beginBtn.className = "g-memory-begin-btn";
      beginBtn.textContent = "Begin";

      const subnote = document.createElement("div");
      subnote.className = "g-memory-subnote";
      subnote.hidden = true;
      subnote.textContent = "eternal sunshine • memory session";

      footer.appendChild(beginBtn);
      footer.appendChild(subnote);
      wrap.appendChild(footer);

      root.appendChild(wrap);

      // State exposed on root for solveForTest
      const state = {
        phase: "idle", // "idle" | "showing" | "input" | "won"
        roundIndex: 0,
        sequence: [],
        userStep: 0,
        mistakesInRound: 0,
        won: false
      };
      root.__memoryState = state;

      function updateLayout() {
        if (unmounted) return;
        const w = root.clientWidth || 360;
        const h = root.clientHeight || 600;
        const availH = Math.max(180, h - 190);
        const availW = Math.max(180, w - 36);
        const size = Math.min(310, availW, availH);
        grid.style.width = size + "px";
        grid.style.height = size + "px";
      }

      updateLayout();
      let ro = null;
      if (typeof ResizeObserver !== "undefined") {
        try {
          ro = new ResizeObserver(() => updateLayout());
          ro.observe(root);
        } catch (e) {}
      }
      window.addEventListener("resize", updateLayout);

      function updateDots() {
        dots.forEach((d, idx) => {
          d.classList.toggle("is-done", idx < state.roundIndex || state.phase === "won");
          d.classList.toggle("is-current", idx === state.roundIndex && state.phase !== "won");
        });
      }

      function clearHints() {
        padEls.forEach((el) => el.classList.remove("is-hint"));
      }

      function resetIdleTimer() {
        if (idleTimer) {
          clearTimeout(idleTimer);
          idleTimer = null;
        }
        clearHints();
        if (state.phase === "input" && !unmounted) {
          idleTimer = setTimeout(() => {
            if (unmounted || state.phase !== "input") return;
            const expectedPad = state.sequence[state.userStep];
            if (padEls[expectedPad]) {
              padEls[expectedPad].classList.add("is-hint");
            }
            statusEl.textContent = "Hint: tap the highlighted pad";
          }, 8000);
        }
      }

      function flashPad(padId, duration = 300) {
        const el = padEls[padId];
        const info = PAD_DATA[padId];
        if (!el || !info) return;
        el.classList.add("is-lit");
        safeTone(info.freq, duration / 1000, "triangle", 0.14);
        setTimer(() => {
          el.classList.remove("is-lit");
        }, duration);
      }

      function buildFullSequence() {
        const maxLen = ROUND_LENGTHS[ROUND_LENGTHS.length - 1];
        const seq = [];
        for (let i = 0; i < maxLen; i++) {
          let next = Math.floor(Math.random() * 4);
          if (i > 0 && next === seq[i - 1] && Math.random() < 0.65) {
            next = (next + 1 + Math.floor(Math.random() * 3)) % 4;
          }
          seq.push(next);
        }
        return seq;
      }

      let masterSequence = buildFullSequence();

      function startRound() {
        if (unmounted || state.won) return;
        state.phase = "showing";
        state.userStep = 0;
        clearHints();
        if (idleTimer) clearTimeout(idleTimer);

        const targetLen = ROUND_LENGTHS[state.roundIndex];
        state.sequence = masterSequence.slice(0, targetLen);
        updateDots();

        statusEl.textContent = `Watch closely (${targetLen} notes)...`;

        const stepInterval = 520;
        const flashDur = 320;

        state.sequence.forEach((padId, idx) => {
          setTimer(() => {
            if (state.phase !== "showing") return;
            flashPad(padId, flashDur);
          }, 350 + idx * stepInterval);
        });

        setTimer(() => {
          if (unmounted || state.phase !== "showing") return;
          state.phase = "input";
          state.userStep = 0;
          statusEl.textContent = "Your turn: repeat the memory";
          resetIdleTimer();
          if (state.mistakesInRound >= 2) {
            const firstPad = state.sequence[0];
            if (padEls[firstPad]) padEls[firstPad].classList.add("is-hint");
          }
        }, 380 + state.sequence.length * stepInterval);
      }

      function handleBegin() {
        if (state.phase !== "idle") return;
        beginBtn.hidden = true;
        subnote.hidden = false;
        state.roundIndex = 0;
        state.mistakesInRound = 0;
        masterSequence = buildFullSequence();
        safeTone(440, 0.1, "sine", 0.08);
        startRound();
      }

      function handlePadTap(padId) {
        if (unmounted || state.phase !== "input") return;

        clearHints();
        const expected = state.sequence[state.userStep];

        if (padId === expected) {
          flashPad(padId, 240);
          safeVibrate(12);
          state.userStep++;

          if (state.userStep >= state.sequence.length) {
            // Round complete
            state.phase = "showing";
            if (idleTimer) clearTimeout(idleTimer);
            state.mistakesInRound = 0;

            if (state.roundIndex + 1 >= ROUND_LENGTHS.length) {
              // Won!
              state.phase = "won";
              state.won = true;
              updateDots();
              statusEl.textContent = "Memory restored! ☀️";
              safeChord([329.63, 392.00, 493.88, 659.25], 0.6);
              safeVibrate([30, 50, 40]);

              if (!api || !api.reduceMotion) {
                padEls.forEach((el, i) => {
                  setTimer(() => el.classList.add("is-lit"), i * 90);
                });
              }

              const winDelay = api && api.reduceMotion ? 250 : 950;
              setTimer(() => {
                if (!unmounted && api && typeof api.win === "function") {
                  api.win();
                }
              }, winDelay);
            } else {
              statusEl.textContent = "Lovely! Next memory...";
              state.roundIndex++;
              updateDots();
              setTimer(() => {
                startRound();
              }, 650);
            }
          } else {
            resetIdleTimer();
          }
        } else {
          // Gentle mistake: replay SAME sequence
          state.phase = "showing";
          state.mistakesInRound++;
          if (idleTimer) clearTimeout(idleTimer);

          safeTone(196.0, 0.25, "sine", 0.1);
          safeVibrate(35);

          if (!api || !api.reduceMotion) {
            grid.classList.remove("g-memory-shake");
            void grid.offsetWidth;
            grid.classList.add("g-memory-shake");
          }

          statusEl.textContent = "Let's try that memory again";
          setTimer(() => {
            startRound();
          }, 950);
        }
      }

      // Pointer events with setPointerCapture
      function onBeginPointerDown(e) {
        e.preventDefault();
        try {
          beginBtn.setPointerCapture(e.pointerId);
        } catch (err) {}
        handleBegin();
      }
      beginBtn.addEventListener("pointerdown", onBeginPointerDown);
      beginBtn.addEventListener("click", handleBegin);

      const padListeners = padEls.map((btn, idx) => {
        const onDown = (e) => {
          e.preventDefault();
          try {
            btn.setPointerCapture(e.pointerId);
          } catch (err) {}
          handlePadTap(idx);
        };
        const onClick = (e) => {
          if (e.detail === 0) handlePadTap(idx);
        };
        btn.addEventListener("pointerdown", onDown);
        btn.addEventListener("click", onClick);
        return { btn, onDown, onClick };
      });

      updateDots();

      return function cleanup() {
        unmounted = true;
        clearAllTimers();
        if (ro) {
          try {
            ro.disconnect();
          } catch (e) {}
        }
        window.removeEventListener("resize", updateLayout);
        beginBtn.removeEventListener("pointerdown", onBeginPointerDown);
        beginBtn.removeEventListener("click", handleBegin);
        padListeners.forEach(({ btn, onDown, onClick }) => {
          btn.removeEventListener("pointerdown", onDown);
          btn.removeEventListener("click", onClick);
        });
      };
    },

    async solveForTest(root) {
      const wait = (ms) => new Promise((r) => setTimeout(r, ms));
      const beginBtn = root.querySelector(".g-memory-begin-btn");
      const pads = Array.from(root.querySelectorAll(".g-memory-pad"));

      function triggerTap(el) {
        if (!el) return;
        try {
          const ev = new PointerEvent("pointerdown", {
            bubbles: true,
            cancelable: true,
            pointerId: 1
          });
          el.dispatchEvent(ev);
        } catch (e) {
          el.click();
        }
      }

      if (beginBtn && !beginBtn.hidden) {
        triggerTap(beginBtn);
      }

      const maxWaitMs = 25000;
      const start = Date.now();

      while (Date.now() - start < maxWaitMs) {
        const st = root.__memoryState;
        if (!st || st.won || st.phase === "won") {
          break;
        }
        if (st.phase === "input") {
          const seq = st.sequence.slice();
          for (let i = 0; i < seq.length; i++) {
            if (st.phase !== "input") break;
            const padIdx = seq[i];
            triggerTap(pads[padIdx]);
            await wait(70);
          }
        }
        await wait(60);
      }
    }
  };
})();