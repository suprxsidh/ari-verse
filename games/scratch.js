(function () {
  "use strict";

  window.GAMES = window.GAMES || {};
  window.GAMES["scratch"] = {
    title: "Scratch Off",
    intro: "Scratch away the black metallic foil to uncover the glowing Dangerous Woman poster underneath.",
    mount(root, api) {
      const p = (api && api.palette) || {};
      const cBg1 = p.bg1 || "#0b0711";
      const cBg2 = p.bg2 || "#1f1230";
      const cAccent = p.accent || "#c084fc";
      const cText = p.text || "#f5f3ff";

      const style = document.createElement("style");
      style.textContent = `
        .g-scratch-wrap {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 14px 16px 18px;
          box-sizing: border-box;
          background: radial-gradient(circle at 50% 25%, ${cBg2} 0%, ${cBg1} 75%, #050308 100%);
          color: ${cText};
          font-family: inherit;
          user-select: none;
          -webkit-user-select: none;
          overflow: hidden;
        }
        .g-scratch-top {
          width: 100%;
          max-width: 360px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          z-index: 3;
        }
        .g-scratch-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          border-radius: 999px;
          background: rgba(15, 10, 24, 0.78);
          border: 1px solid rgba(192, 132, 252, 0.45);
          box-shadow: 0 0 16px rgba(192, 132, 252, 0.25);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .g-scratch-ring-box {
          position: relative;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: rgba(15, 10, 24, 0.78);
          border: 1px solid rgba(255, 255, 255, 0.16);
          box-shadow: 0 0 14px rgba(192, 132, 252, 0.25);
        }
        .g-scratch-ring-svg {
          width: 42px;
          height: 42px;
          transform: rotate(-90deg);
        }
        .g-scratch-ring-bg {
          fill: none;
          stroke: rgba(255, 255, 255, 0.15);
          stroke-width: 3.6;
        }
        .g-scratch-ring-fg {
          fill: none;
          stroke: ${cAccent};
          stroke-width: 3.6;
          stroke-linecap: round;
          transition: stroke-dashoffset 0.2s ease-out;
          filter: drop-shadow(0 0 4px ${cAccent});
        }
        .g-scratch-ring-txt {
          position: absolute;
          font-size: 11px;
          font-weight: 700;
          color: ${cText};
        }
        .g-scratch-stage {
          position: relative;
          flex: 1;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 220px;
          margin: 8px 0;
        }
        .g-scratch-card {
          position: relative;
          border-radius: 22px;
          overflow: hidden;
          background: linear-gradient(155deg, #160926 0%, #09040e 55%, #1e0b36 100%);
          border: 2px solid rgba(216, 180, 254, 0.55);
          box-shadow:
            0 14px 36px rgba(0, 0, 0, 0.75),
            0 0 28px rgba(192, 132, 252, 0.35),
            inset 0 0 24px rgba(192, 132, 252, 0.22);
          touch-action: none;
        }
        .g-scratch-poster {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 18px 14px;
          box-sizing: border-box;
          pointer-events: none;
        }
        .g-scratch-poster::before {
          content: "";
          position: absolute;
          inset: 8px;
          border-radius: 15px;
          border: 1px solid rgba(233, 213, 255, 0.3);
          box-shadow: inset 0 0 18px rgba(192, 132, 252, 0.25);
          pointer-events: none;
        }
        .g-scratch-poster-head {
          text-align: center;
          z-index: 1;
          margin-top: 2px;
        }
        .g-scratch-era-sub {
          font-size: 11px;
          letter-spacing: 0.24em;
          color: #d8b4fe;
          text-transform: uppercase;
          margin-bottom: 3px;
        }
        .g-scratch-era-title {
          font-size: 20px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #ffffff;
          text-shadow: 0 0 8px #c084fc, 0 0 18px #9333ea;
        }
        .g-scratch-art {
          position: relative;
          width: 78%;
          height: 56%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
        }
        .g-scratch-art svg {
          width: 100%;
          height: 100%;
          overflow: visible;
          filter: drop-shadow(0 0 10px rgba(192, 132, 252, 0.85));
        }
        .g-scratch-emojis {
          display: flex;
          align-items: center;
          justify-content: space-around;
          width: 88%;
          z-index: 1;
          margin-bottom: 4px;
        }
        .g-scratch-emoji-pill {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(192,132,252,0.32) 0%, rgba(15,8,26,0.85) 75%);
          border: 1.5px solid rgba(233, 213, 255, 0.55);
          box-shadow: 0 0 14px rgba(192, 132, 252, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 23px;
        }
        .g-scratch-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          touch-action: none;
          cursor: crosshair;
          z-index: 2;
          transition: opacity 0.55s ease, transform 0.55s ease;
        }
        .g-scratch-canvas.g-scratch-cleared {
          opacity: 0;
          pointer-events: none;
          transform: scale(1.03);
        }
        .g-scratch-shimmer {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 3;
          opacity: 0;
          background: linear-gradient(120deg, transparent 20%, rgba(255,255,255,0.75) 50%, rgba(192,132,252,0.65) 58%, transparent 80%);
          transform: translateX(-120%);
        }
        .g-scratch-shimmer.g-scratch-active {
          opacity: 1;
          transition: transform 0.75s ease-out, opacity 0.75s ease-out;
          transform: translateX(120%);
        }
        .g-scratch-nudge {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          z-index: 4;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .g-scratch-nudge.g-scratch-show {
          opacity: 1;
        }
        .g-scratch-nudge-pill {
          padding: 10px 16px;
          border-radius: 999px;
          background: rgba(12, 8, 20, 0.9);
          border: 1.5px solid ${cAccent};
          box-shadow: 0 0 20px rgba(192, 132, 252, 0.65);
          font-size: 14px;
          font-weight: 600;
          color: #fff;
          animation: g-scratch-wiggle 1.2s ease-in-out infinite;
        }
        @keyframes g-scratch-wiggle {
          0%, 100% { transform: translateX(-8px); }
          50% { transform: translateX(8px); }
        }
        .g-scratch-bottom {
          width: 100%;
          max-width: 360px;
          text-align: center;
          min-height: 24px;
          font-size: 14px;
          color: rgba(245, 243, 255, 0.88);
          letter-spacing: 0.02em;
          z-index: 3;
        }
        .g-scratch-win-glow {
          animation: g-scratch-pulse 0.6s ease-in-out infinite alternate;
        }
        @keyframes g-scratch-pulse {
          from { box-shadow: 0 0 24px rgba(192, 132, 252, 0.5), inset 0 0 20px rgba(192, 132, 252, 0.3); }
          to { box-shadow: 0 0 42px rgba(233, 213, 255, 0.95), inset 0 0 34px rgba(192, 132, 252, 0.65); }
        }
      `;
      root.appendChild(style);

      const wrap = document.createElement("div");
      wrap.className = "g-scratch-wrap";
      const circumference = 2 * Math.PI * 16;

      wrap.innerHTML = `
        <div class="g-scratch-top">
          <div class="g-scratch-badge">
            <span>🌙</span>
            <span>2016 • Foil Reveal</span>
          </div>
          <div class="g-scratch-ring-box" aria-label="Scratch progress">
            <svg class="g-scratch-ring-svg" viewBox="0 0 40 40">
              <circle class="g-scratch-ring-bg" cx="20" cy="20" r="16"></circle>
              <circle class="g-scratch-ring-fg" cx="20" cy="20" r="16"
                stroke-dasharray="${circumference.toFixed(2)}"
                stroke-dashoffset="${circumference.toFixed(2)}"></circle>
            </svg>
            <div class="g-scratch-ring-txt">0%</div>
          </div>
        </div>
        <div class="g-scratch-stage">
          <div class="g-scratch-card">
            <div class="g-scratch-poster">
              <div class="g-scratch-poster-head">
                <div class="g-scratch-era-sub">2016 Era</div>
                <div class="g-scratch-era-title">Dangerous Woman</div>
              </div>
              <div class="g-scratch-art">
                <svg viewBox="0 0 220 230" aria-hidden="true">
                  <defs>
                    <linearGradient id="g-scratch-neon" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stop-color="#f3e8ff"/>
                      <stop offset="50%" stop-color="#c084fc"/>
                      <stop offset="100%" stop-color="#9333ea"/>
                    </linearGradient>
                  </defs>
                  <!-- Crescent Moon -->
                  <path d="M150 26 A36 36 0 1 0 184 76 A29 29 0 1 1 150 26 Z"
                    fill="none" stroke="url(#g-scratch-neon)" stroke-width="3.2" />
                  <!-- Neon Stars / Glints -->
                  <path d="M44 48 L48 58 L58 62 L48 66 L44 76 L40 66 L30 62 L40 58 Z"
                    fill="#e9d5ff" opacity="0.85"/>
                  <circle cx="176" cy="128" r="3" fill="#f3e8ff"/>
                  <circle cx="38" cy="140" r="2.5" fill="#d8b4fe"/>
                  <!-- Abstract Bunny-Ear Mask Silhouette -->
                  <path d="M84 132
                           C64 78, 52 20, 72 14
                           C90 10, 98 68, 102 122
                           L118 122
                           C122 68, 130 10, 148 14
                           C168 20, 156 78, 136 132
                           C154 144, 162 166, 154 186
                           C146 202, 126 210, 110 202
                           C94 210, 74 202, 66 186
                           C58 166, 66 144, 84 132 Z"
                    fill="rgba(26, 11, 46, 0.75)"
                    stroke="url(#g-scratch-neon)"
                    stroke-width="4"
                    stroke-linejoin="round"/>
                  <!-- Mask Eye Cutouts -->
                  <path d="M77 162 Q90 150 103 162 Q90 171 77 162 Z"
                    fill="none" stroke="#f3e8ff" stroke-width="3"/>
                  <path d="M117 162 Q130 150 143 162 Q130 171 117 162 Z"
                    fill="none" stroke="#f3e8ff" stroke-width="3"/>
                </svg>
              </div>
              <div class="g-scratch-emojis">
                <div class="g-scratch-emoji-pill">🐰</div>
                <div class="g-scratch-emoji-pill">🌙</div>
                <div class="g-scratch-emoji-pill">🖤</div>
              </div>
            </div>
            <canvas class="g-scratch-canvas"></canvas>
            <div class="g-scratch-shimmer"></div>
            <div class="g-scratch-nudge">
              <div class="g-scratch-nudge-pill">✨ Rub across the silver foil!</div>
            </div>
          </div>
        </div>
        <div class="g-scratch-bottom">Rub the metallic foil to reveal the neon poster</div>
      `;
      root.appendChild(wrap);

      const stageEl = wrap.querySelector(".g-scratch-stage");
      const cardEl = wrap.querySelector(".g-scratch-card");
      const canvas = wrap.querySelector(".g-scratch-canvas");
      const shimmerEl = wrap.querySelector(".g-scratch-shimmer");
      const nudgeEl = wrap.querySelector(".g-scratch-nudge");
      const ringFg = wrap.querySelector(".g-scratch-ring-fg");
      const ringTxt = wrap.querySelector(".g-scratch-ring-txt");
      const statusEl = wrap.querySelector(".g-scratch-bottom");

      const ctx = canvas.getContext("2d");

      // Downscaled measurement canvas (64x80) to keep readback fast and preserve strokes across resizes
      const SAMPLE_W = 64;
      const SAMPLE_H = 80;
      const sampleCanvas = document.createElement("canvas");
      sampleCanvas.width = SAMPLE_W;
      sampleCanvas.height = SAMPLE_H;
      const sampleCtx = sampleCanvas.getContext("2d", { willReadFrequently: true });

      const maskCanvas = document.createElement("canvas");
      maskCanvas.width = 256;
      maskCanvas.height = 320;
      const maskCtx = maskCanvas.getContext("2d");

      let cardW = 260;
      let cardH = 340;
      let dpr = 1;
      let isDown = false;
      let activePointerId = null;
      let lastPt = null;
      let won = false;
      let clearedRatio = 0;
      let lastToneAt = 0;
      let lastMeasureAt = 0;
      let measureTimer = null;
      let idleTimer = null;
      let winTimer = null;
      let ro = null;

      function safeTone(freq, dur, type, vol) {
        try {
          if (api && typeof api.tone === "function") {
            api.tone(freq, dur, type, vol);
          }
        } catch (e) {}
      }

      function safeChord(freqs, dur) {
        try {
          if (api && typeof api.chord === "function") {
            api.chord(freqs, dur);
          }
        } catch (e) {}
      }

      function safeVibrate(ms) {
        try {
          if (api && typeof api.vibrate === "function") {
            api.vibrate(ms);
          }
        } catch (e) {}
      }

      function resetIdleTimer() {
        if (idleTimer) clearTimeout(idleTimer);
        nudgeEl.classList.remove("g-scratch-show");
        if (won) return;
        idleTimer = setTimeout(() => {
          if (!won) nudgeEl.classList.add("g-scratch-show");
        }, 8000);
      }

      function drawFoilBase(w, h) {
        ctx.save();
        ctx.globalCompositeOperation = "source-over";

        // Metallic black & silver diagonal gradient
        const grad = ctx.createLinearGradient(0, 0, w, h);
        grad.addColorStop(0.0, "#14131a");
        grad.addColorStop(0.22, "#353340");
        grad.addColorStop(0.38, "#7b7888");
        grad.addColorStop(0.5, "#1d1b24");
        grad.addColorStop(0.68, "#4b4859");
        grad.addColorStop(0.84, "#9a96a8");
        grad.addColorStop(1.0, "#15141c");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        // Glossy metallic streaks
        const streaks = [
          { x: -w * 0.2, w: w * 0.18, a: 0.22 },
          { x: w * 0.15, w: w * 0.08, a: 0.32 },
          { x: w * 0.42, w: w * 0.22, a: 0.18 },
          { x: w * 0.78, w: w * 0.12, a: 0.28 }
        ];
        streaks.forEach((s) => {
          ctx.fillStyle = `rgba(245, 243, 255, ${s.a})`;
          ctx.beginPath();
          ctx.moveTo(s.x, 0);
          ctx.lineTo(s.x + s.w, 0);
          ctx.lineTo(s.x + s.w - h * 0.45, h);
          ctx.lineTo(s.x - h * 0.45, h);
          ctx.closePath();
          ctx.fill();
        });

        // Subtle purple neon sheen + brushed lines
        ctx.strokeStyle = "rgba(192, 132, 252, 0.22)";
        ctx.lineWidth = 1.5;
        for (let y = 12; y < h; y += 16) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
          ctx.stroke();
        }

        // Outer metallic border & center emblem on foil
        ctx.strokeStyle = "rgba(228, 224, 240, 0.45)";
        ctx.lineWidth = 2;
        ctx.strokeRect(10, 10, w - 20, h - 20);

        ctx.fillStyle = "rgba(245, 243, 255, 0.82)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = `700 ${Math.round(w * 0.065)}px sans-serif`;
        ctx.fillText("DANGEROUS WOMAN", w / 2, h * 0.44);

        ctx.fillStyle = "rgba(216, 180, 254, 0.85)";
        ctx.font = `600 ${Math.round(w * 0.048)}px sans-serif`;
        ctx.fillText("✦ SCRATCH FOIL ✦", w / 2, h * 0.54);

        // Re-apply existing scratch mask if resizing mid-game
        ctx.globalCompositeOperation = "destination-out";
        ctx.drawImage(maskCanvas, 0, 0, w, h);
        ctx.restore();
      }

      function layout() {
        const sw = Math.max(220, stageEl.clientWidth || root.clientWidth - 32 || 300);
        const sh = Math.max(220, stageEl.clientHeight || root.clientHeight - 130 || 380);
        const targetRatio = 0.78;
        let w = Math.min(sw - 8, 320);
        let h = w / targetRatio;
        if (h > sh - 8) {
          h = sh - 8;
          w = h * targetRatio;
        }
        cardW = Math.max(190, Math.round(w));
        cardH = Math.max(230, Math.round(h));
        cardEl.style.width = cardW + "px";
        cardEl.style.height = cardH + "px";

        dpr = Math.min(window.devicePixelRatio || 1, 2.5);
        canvas.width = Math.round(cardW * dpr);
        canvas.height = Math.round(cardH * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        drawFoilBase(cardW, cardH);
      }

      function scratchSegment(x0, y0, x1, y1) {
        if (won) return;
        const brushR = Math.max(22, Math.round(Math.min(cardW, cardH) * 0.1));

        // Erase on display canvas
        ctx.save();
        ctx.globalCompositeOperation = "destination-out";
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.lineWidth = brushR * 2;
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x1, y1, brushR, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Record on persistent mask canvas
        const sx = maskCanvas.width / cardW;
        const sy = maskCanvas.height / cardH;
        const mBrush = brushR * ((sx + sy) * 0.5);
        maskCtx.save();
        maskCtx.globalCompositeOperation = "source-over";
        maskCtx.strokeStyle = "#000";
        maskCtx.fillStyle = "#000";
        maskCtx.lineCap = "round";
        maskCtx.lineJoin = "round";
        maskCtx.lineWidth = mBrush * 2;
        maskCtx.beginPath();
        maskCtx.moveTo(x0 * sx, y0 * sy);
        maskCtx.lineTo(x1 * sx, y1 * sy);
        maskCtx.stroke();
        maskCtx.beginPath();
        maskCtx.arc(x1 * sx, y1 * sy, mBrush, 0, Math.PI * 2);
        maskCtx.fill();
        maskCtx.restore();

        const now = performance.now();
        if (now - lastToneAt >= 90) {
          lastToneAt = now;
          const sparkleFreqs = [880, 987.77, 1174.66, 1318.5, 1567.98];
          const f = sparkleFreqs[Math.floor(Math.random() * sparkleFreqs.length)];
          safeTone(f, 0.055, "sine", 0.045);
        }

        if (now - lastMeasureAt >= 300) {
          measureCleared();
        } else if (!measureTimer) {
          measureTimer = setTimeout(() => {
            measureTimer = null;
            measureCleared();
          }, 300);
        }
      }

      function updateProgressUI(ratio) {
        const scaled = Math.min(100, Math.round((ratio / 0.55) * 100));
        const offset = circumference * (1 - Math.min(1, ratio / 0.55));
        ringFg.style.strokeDashoffset = offset.toFixed(2);
        ringTxt.textContent = scaled + "%";
      }

      function measureCleared() {
        if (won) return;
        lastMeasureAt = performance.now();
        try {
          sampleCtx.clearRect(0, 0, SAMPLE_W, SAMPLE_H);
          sampleCtx.drawImage(canvas, 0, 0, SAMPLE_W, SAMPLE_H);
          const data = sampleCtx.getImageData(0, 0, SAMPLE_W, SAMPLE_H).data;
          let transparentCount = 0;
          const total = SAMPLE_W * SAMPLE_H;
          for (let i = 3; i < data.length; i += 4) {
            if (data[i] < 128) transparentCount++;
          }
          clearedRatio = transparentCount / total;
        } catch (e) {
          // Fallback using maskCanvas if canvas readback fails
          try {
            sampleCtx.clearRect(0, 0, SAMPLE_W, SAMPLE_H);
            sampleCtx.drawImage(maskCanvas, 0, 0, SAMPLE_W, SAMPLE_H);
            const mData = sampleCtx.getImageData(0, 0, SAMPLE_W, SAMPLE_H).data;
            let hit = 0;
            const total = SAMPLE_W * SAMPLE_H;
            for (let i = 3; i < mData.length; i += 4) {
              if (mData[i] > 128) hit++;
            }
            clearedRatio = hit / total;
          } catch (err) {
            clearedRatio = Math.min(1, clearedRatio + 0.08);
          }
        }

        updateProgressUI(clearedRatio);

        if (clearedRatio >= 0.55 && !won) {
          finishGame();
        }
      }

      function finishGame() {
        if (won) return;
        won = true;
        if (idleTimer) clearTimeout(idleTimer);
        if (measureTimer) clearTimeout(measureTimer);
        nudgeEl.classList.remove("g-scratch-show");

        updateProgressUI(0.55);
        ringTxt.textContent = "100%";
        statusEl.textContent = "✨ Dangerous Woman poster revealed! ✨";

        canvas.classList.add("g-scratch-cleared");
        cardEl.classList.add("g-scratch-win-glow");
        if (!api || !api.reduceMotion) {
          shimmerEl.classList.add("g-scratch-active");
        }

        safeVibrate(35);
        safeChord([587.33, 739.99, 880, 1174.66], 0.45);

        const delay = api && api.reduceMotion ? 120 : 850;
        winTimer = setTimeout(() => {
          try {
            if (api && typeof api.win === "function") {
              api.win();
            }
          } catch (e) {}
        }, delay);
      }

      function getLocalPoint(e) {
        const rect = canvas.getBoundingClientRect();
        return {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
      }

      function onPointerDown(e) {
        if (won) return;
        if (isDown && activePointerId !== null && e.pointerId !== activePointerId) return;
        isDown = true;
        activePointerId = e.pointerId;
        try {
          canvas.setPointerCapture(e.pointerId);
        } catch (err) {}
        resetIdleTimer();
        const pt = getLocalPoint(e);
        lastPt = pt;
        scratchSegment(pt.x, pt.y, pt.x + 0.1, pt.y + 0.1);
      }

      function onPointerMove(e) {
        if (!isDown || won) return;
        if (activePointerId !== null && e.pointerId !== activePointerId) return;
        resetIdleTimer();
        const pt = getLocalPoint(e);
        if (!lastPt) lastPt = pt;
        scratchSegment(lastPt.x, lastPt.y, pt.x, pt.y);
        lastPt = pt;
      }

      function onPointerUp(e) {
        if (activePointerId !== null && e.pointerId !== activePointerId) return;
        isDown = false;
        activePointerId = null;
        lastPt = null;
        try {
          if (canvas.hasPointerCapture && canvas.hasPointerCapture(e.pointerId)) {
            canvas.releasePointerCapture(e.pointerId);
          }
        } catch (err) {}
        measureCleared();
      }

      canvas.addEventListener("pointerdown", onPointerDown);
      canvas.addEventListener("pointermove", onPointerMove);
      canvas.addEventListener("pointerup", onPointerUp);
      canvas.addEventListener("pointercancel", onPointerUp);

      layout();
      resetIdleTimer();

      const onWinResize = () => layout();
      if (typeof ResizeObserver !== "undefined") {
        try {
          ro = new ResizeObserver(() => layout());
          ro.observe(root);
        } catch (e) {
          window.addEventListener("resize", onWinResize);
        }
      } else {
        window.addEventListener("resize", onWinResize);
      }

      return function cleanup() {
        if (idleTimer) clearTimeout(idleTimer);
        if (measureTimer) clearTimeout(measureTimer);
        if (winTimer) clearTimeout(winTimer);
        if (ro) {
          try {
            ro.disconnect();
          } catch (e) {}
        }
        window.removeEventListener("resize", onWinResize);
        canvas.removeEventListener("pointerdown", onPointerDown);
        canvas.removeEventListener("pointermove", onPointerMove);
        canvas.removeEventListener("pointerup", onPointerUp);
        canvas.removeEventListener("pointercancel", onPointerUp);
      };
    },

    async solveForTest(root) {
      const canvas = root.querySelector(".g-scratch-canvas");
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width || 240;
      const h = rect.height || 300;

      const fire = (type, x, y) => {
        const ev = new PointerEvent(type, {
          bubbles: true,
          cancelable: true,
          pointerId: 1,
          pointerType: "touch",
          isPrimary: true,
          clientX: rect.left + x,
          clientY: rect.top + y
        });
        canvas.dispatchEvent(ev);
      };

      const pause = (ms) => new Promise((r) => setTimeout(r, ms));

      fire("pointerdown", w * 0.12, h * 0.12);
      const rows = 7;
      for (let r = 0; r < rows; r++) {
        const y = h * (0.12 + (r / (rows - 1)) * 0.78);
        const xStart = r % 2 === 0 ? w * 0.1 : w * 0.9;
        const xEnd = r % 2 === 0 ? w * 0.9 : w * 0.1;
        const steps = 6;
        for (let s = 1; s <= steps; s++) {
          const x = xStart + ((xEnd - xStart) * s) / steps;
          fire("pointermove", x, y);
        }
        await pause(12);
      }
      fire("pointerup", w * 0.5, h * 0.9);
      await pause(50);
    }
  };
})();