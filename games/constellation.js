(function () {
  "use strict";

  window.GAMES = window.GAMES || {};

  const SHAPES = [
    {
      name: "CRESCENT MOON",
      sub: "My Everything · I / III",
      loop: true,
      points: [
        { x: 0.62, y: 0.16 },
        { x: 0.30, y: 0.31 },
        { x: 0.24, y: 0.54 },
        { x: 0.34, y: 0.76 },
        { x: 0.65, y: 0.85 },
        { x: 0.49, y: 0.52 }
      ]
    },
    {
      name: "LAVENDER HEART",
      sub: "My Everything · II / III",
      loop: true,
      points: [
        { x: 0.50, y: 0.33 },
        { x: 0.25, y: 0.22 },
        { x: 0.18, y: 0.48 },
        { x: 0.50, y: 0.82 },
        { x: 0.82, y: 0.48 },
        { x: 0.75, y: 0.22 }
      ]
    },
    {
      name: "NIGHT ROCKET",
      sub: "Break Free · III / III",
      loop: true,
      points: [
        { x: 0.50, y: 0.14 },
        { x: 0.72, y: 0.42 },
        { x: 0.80, y: 0.77 },
        { x: 0.50, y: 0.66 },
        { x: 0.20, y: 0.77 },
        { x: 0.28, y: 0.42 }
      ]
    }
  ];

  // Pentatonic scale notes (C4, D4, E4, G4, A4, C5)
  const SCALE = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];

  const BG_STARS = [
    [12, 8, 1.5], [84, 11, 2], [28, 19, 1], [67, 24, 1.5], [91, 33, 1],
    [9, 41, 2], [44, 14, 1], [76, 48, 1.5], [16, 66, 1.5], [88, 63, 2],
    [35, 74, 1], [62, 82, 1.5], [11, 88, 1], [83, 89, 1.5], [51, 92, 2],
    [23, 52, 1], [72, 16, 1.2], [39, 38, 1.2], [58, 60, 1], [93, 76, 1.2]
  ];

  window.GAMES["constellation"] = {
    title: "Star Trace",
    intro: "Drag or tap through the numbered stars in order to trace three night-sky constellations.",

    mount(root, api) {
      let cleanedUp = false;
      let shapeIdx = 0;
      let nextStar = 0;
      let isTransitioning = false;
      let isWon = false;
      let isDragging = false;
      let activePointerId = null;
      let dragPos = null;
      let mistakes = 0;
      let idleTimer = null;
      let timeouts = [];

      const pal = (api && api.palette) || {};
      const accent = pal.accent || "#d4b8ff";
      const textCol = pal.text || "#f7f4fc";
      const reduceMotion = !!(api && api.reduceMotion);

      function later(fn, ms) {
        const id = setTimeout(() => {
          if (!cleanedUp) fn();
        }, ms);
        timeouts.push(id);
        return id;
      }

      function safeTone(freq, dur, type, vol) {
        try {
          if (api && api.tone) api.tone(freq, dur, type || "sine", vol || 0.08);
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

      // Inject isolated styles
      const style = document.createElement("style");
      style.textContent = `
        .g-constellation-wrap {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: radial-gradient(circle at 50% 42%, #241b35 0%, #110d19 52%, #060508 100%);
          color: ${textCol};
          font-family: inherit;
          user-select: none;
          -webkit-user-select: none;
          touch-action: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 12px 14px 16px;
          box-sizing: border-box;
        }
        .g-constellation-deco {
          position: absolute;
          inset: 8px;
          border: 1px solid rgba(226, 208, 255, 0.22);
          pointer-events: none;
        }
        .g-constellation-deco::before {
          content: "";
          position: absolute;
          inset: 4px;
          border: 1px solid rgba(226, 208, 255, 0.1);
        }
        .g-constellation-corner {
          position: absolute;
          width: 14px;
          height: 14px;
          border-color: ${accent};
          border-style: solid;
          opacity: 0.55;
          pointer-events: none;
        }
        .g-constellation-corner.tl { top: 12px; left: 12px; border-width: 1.5px 0 0 1.5px; }
        .g-constellation-corner.tr { top: 12px; right: 12px; border-width: 1.5px 1.5px 0 0; }
        .g-constellation-corner.bl { bottom: 12px; left: 12px; border-width: 0 0 1.5px 1.5px; }
        .g-constellation-corner.br { bottom: 12px; right: 12px; border-width: 0 1.5px 1.5px 0; }
        .g-constellation-moonglow {
          position: absolute;
          left: 50%;
          top: 46%;
          transform: translate(-50%, -50%);
          width: 280px;
          height: 280px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(218, 192, 255, 0.18) 0%, rgba(255, 255, 255, 0.06) 45%, transparent 72%);
          pointer-events: none;
        }
        .g-constellation-hud {
          position: relative;
          z-index: 2;
          text-align: center;
          margin-top: 6px;
          pointer-events: none;
        }
        .g-constellation-era {
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(235, 222, 255, 0.72);
          margin-bottom: 3px;
        }
        .g-constellation-title {
          font-size: 16px;
          letter-spacing: 0.22em;
          font-weight: 600;
          color: #ffffff;
          text-shadow: 0 0 12px rgba(212, 184, 255, 0.65);
        }
        .g-constellation-dots {
          display: flex;
          gap: 10px;
          justify-content: center;
          margin-top: 7px;
        }
        .g-constellation-dot {
          width: 8px;
          height: 8px;
          transform: rotate(45deg);
          border: 1px solid ${accent};
          background: transparent;
          transition: background 0.3s, box-shadow 0.3s;
        }
        .g-constellation-dot.done {
          background: ${accent};
          box-shadow: 0 0 8px ${accent};
        }
        .g-constellation-dot.current {
          background: rgba(212, 184, 255, 0.45);
        }
        .g-constellation-board {
          position: relative;
          z-index: 2;
          flex: 1;
          width: 100%;
          max-width: 380px;
          max-height: 400px;
          margin: 4px 0;
          touch-action: none;
          transition: opacity 0.32s ease, transform 0.32s ease;
        }
        .g-constellation-board.shining {
          filter: drop-shadow(0 0 14px ${accent});
          transform: scale(1.03);
        }
        .g-constellation-board.fading {
          opacity: 0;
          transform: scale(0.96);
        }
        .g-constellation-board.shake {
          animation: g-constellation-shake 0.28s ease;
        }
        .g-constellation-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: visible;
          pointer-events: none;
        }
        .g-constellation-star {
          position: absolute;
          width: 56px;
          height: 56px;
          margin-left: -28px;
          margin-top: -28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          touch-action: none;
          -webkit-tap-highlight-color: transparent;
        }
        .g-constellation-star-core {
          width: 14px;
          height: 14px;
          transform: rotate(45deg);
          background: rgba(255, 255, 255, 0.22);
          border: 1.5px solid rgba(235, 222, 255, 0.75);
          box-shadow: 0 0 10px rgba(212, 184, 255, 0.35);
          transition: transform 0.2s, background 0.2s, box-shadow 0.2s;
          pointer-events: none;
        }
        .g-constellation-star.active .g-constellation-star-core {
          background: #ffffff;
          border-color: #ffffff;
          transform: rotate(45deg) scale(1.22);
          box-shadow: 0 0 16px #ffffff, 0 0 26px ${accent};
        }
        .g-constellation-star.next .g-constellation-star-core {
          border-color: #ffffff;
          background: rgba(212, 184, 255, 0.55);
          box-shadow: 0 0 14px ${accent};
        }
        .g-constellation-star.pulse .g-constellation-star-core {
          animation: g-constellation-pulse 1.1s infinite ease-in-out;
        }
        .g-constellation-star.wrong .g-constellation-star-core {
          background: rgba(255, 130, 160, 0.75);
          border-color: #ff9eb5;
        }
        .g-constellation-num {
          position: absolute;
          top: 2px;
          right: 6px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: rgba(247, 244, 252, 0.85);
          text-shadow: 0 1px 4px #000;
          pointer-events: none;
        }
        .g-constellation-star.active .g-constellation-num {
          color: ${accent};
        }
        .g-constellation-footer {
          position: relative;
          z-index: 2;
          text-align: center;
          min-height: 22px;
          font-size: 12px;
          letter-spacing: 0.08em;
          color: rgba(247, 244, 252, 0.78);
          margin-bottom: 4px;
          pointer-events: none;
        }
        @keyframes g-constellation-pulse {
          0%, 100% { transform: rotate(45deg) scale(1); box-shadow: 0 0 10px ${accent}; }
          50% { transform: rotate(45deg) scale(1.48); box-shadow: 0 0 22px #ffffff, 0 0 32px ${accent}; }
        }
        @keyframes g-constellation-shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
      `;
      root.appendChild(style);

      // Build DOM
      const wrap = document.createElement("div");
      wrap.className = "g-constellation-wrap";

      // Background ambient stars SVG
      const bgSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      bgSvg.setAttribute("class", "g-constellation-svg");
      bgSvg.setAttribute("viewBox", "0 0 100 100");
      bgSvg.setAttribute("preserveAspectRatio", "none");
      BG_STARS.forEach(([x, y, r]) => {
        const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        c.setAttribute("cx", x);
        c.setAttribute("cy", y);
        c.setAttribute("r", r * 0.35);
        c.setAttribute("fill", "#ffffff");
        c.setAttribute("opacity", "0.38");
        bgSvg.appendChild(c);
      });
      wrap.appendChild(bgSvg);

      // Art deco frame & moon glow
      const deco = document.createElement("div");
      deco.className = "g-constellation-deco";
      wrap.appendChild(deco);

      ["tl", "tr", "bl", "br"].forEach((pos) => {
        const c = document.createElement("div");
        c.className = `g-constellation-corner ${pos}`;
        wrap.appendChild(c);
      });

      const moonGlow = document.createElement("div");
      moonGlow.className = "g-constellation-moonglow";
      wrap.appendChild(moonGlow);

      // HUD
      const hud = document.createElement("div");
      hud.className = "g-constellation-hud";
      const eraEl = document.createElement("div");
      eraEl.className = "g-constellation-era";
      const titleEl = document.createElement("div");
      titleEl.className = "g-constellation-title";
      const dotsEl = document.createElement("div");
      dotsEl.className = "g-constellation-dots";
      const dotEls = SHAPES.map(() => {
        const d = document.createElement("div");
        d.className = "g-constellation-dot";
        dotsEl.appendChild(d);
        return d;
      });
      hud.appendChild(eraEl);
      hud.appendChild(titleEl);
      hud.appendChild(dotsEl);
      wrap.appendChild(hud);

      // Interactive Board
      const board = document.createElement("div");
      board.className = "g-constellation-board";
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("class", "g-constellation-svg");
      const guidePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
      guidePath.setAttribute("fill", "none");
      guidePath.setAttribute("stroke", "rgba(212, 184, 255, 0.16)");
      guidePath.setAttribute("stroke-width", "1.2");
      guidePath.setAttribute("stroke-dasharray", "3 5");

      const tracedGlow = document.createElementNS("http://www.w3.org/2000/svg", "path");
      tracedGlow.setAttribute("fill", "none");
      tracedGlow.setAttribute("stroke", accent);
      tracedGlow.setAttribute("stroke-width", "6");
      tracedGlow.setAttribute("stroke-linecap", "round");
      tracedGlow.setAttribute("stroke-linejoin", "round");
      tracedGlow.setAttribute("opacity", "0.45");

      const tracedPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
      tracedPath.setAttribute("fill", "none");
      tracedPath.setAttribute("stroke", "#ffffff");
      tracedPath.setAttribute("stroke-width", "2.2");
      tracedPath.setAttribute("stroke-linecap", "round");
      tracedPath.setAttribute("stroke-linejoin", "round");

      const dragLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
      dragLine.setAttribute("stroke", accent);
      dragLine.setAttribute("stroke-width", "2");
      dragLine.setAttribute("stroke-dasharray", "4 4");
      dragLine.setAttribute("stroke-linecap", "round");
      dragLine.setAttribute("opacity", "0");

      svg.appendChild(guidePath);
      svg.appendChild(tracedGlow);
      svg.appendChild(tracedPath);
      svg.appendChild(dragLine);
      board.appendChild(svg);

      const starLayer = document.createElement("div");
      starLayer.style.position = "absolute";
      starLayer.style.inset = "0";
      board.appendChild(starLayer);
      wrap.appendChild(board);

      // Footer hint
      const footer = document.createElement("div");
      footer.className = "g-constellation-footer";
      footer.textContent = "Trace 1 → 6 in order";
      wrap.appendChild(footer);

      root.appendChild(wrap);

      let starEls = [];
      let boardRect = { width: 300, height: 320, left: 0, top: 0 };

      function measureBoard() {
        if (cleanedUp) return;
        const r = board.getBoundingClientRect();
        if (r.width > 0 && r.height > 0) {
          boardRect = r;
        } else {
          boardRect = {
            width: Math.max(240, (root.clientWidth || 340) - 32),
            height: Math.max(240, (root.clientHeight || 520) - 160),
            left: 0,
            top: 0
          };
        }
        svg.setAttribute("viewBox", `0 0 ${boardRect.width} ${boardRect.height}`);
        layoutStars();
        renderLines(false);
      }

      function getStarPx(pt) {
        const pad = 28;
        const w = Math.max(60, boardRect.width - pad * 2);
        const h = Math.max(60, boardRect.height - pad * 2);
        return {
          x: pad + pt.x * w,
          y: pad + pt.y * h
        };
      }

      function layoutStars() {
        const shape = SHAPES[shapeIdx];
        if (!shape) return;
        shape.points.forEach((pt, i) => {
          const el = starEls[i];
          if (!el) return;
          const pos = getStarPx(pt);
          el.style.left = `${pos.x}px`;
          el.style.top = `${pos.y}px`;
        });
      }

      function renderLines(completedLoop) {
        const shape = SHAPES[shapeIdx];
        if (!shape) return;
        const pts = shape.points.map(getStarPx);

        // Faint art-deco guide path
        let gd = "";
        pts.forEach((p, i) => {
          gd += (i === 0 ? "M" : "L") + `${p.x.toFixed(1)},${p.y.toFixed(1)} `;
        });
        if (shape.loop && pts.length > 2) {
          gd += "Z";
        }
        guidePath.setAttribute("d", gd);

        // Traced path
        let td = "";
        for (let i = 0; i < nextStar; i++) {
          const p = pts[i];
          td += (i === 0 ? "M" : "L") + `${p.x.toFixed(1)},${p.y.toFixed(1)} `;
        }
        if (completedLoop && shape.loop && pts.length > 1) {
          td += `L${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`;
        }
        tracedPath.setAttribute("d", td);
        tracedGlow.setAttribute("d", td);

        // Live rubber-band line from last star to finger
        if (isDragging && nextStar > 0 && nextStar <= pts.length && dragPos && !completedLoop) {
          const from = pts[nextStar - 1];
          dragLine.setAttribute("x1", from.x.toFixed(1));
          dragLine.setAttribute("y1", from.y.toFixed(1));
          dragLine.setAttribute("x2", dragPos.x.toFixed(1));
          dragLine.setAttribute("y2", dragPos.y.toFixed(1));
          dragLine.setAttribute("opacity", "0.85");
        } else {
          dragLine.setAttribute("opacity", "0");
        }
      }

      function resetIdleTimer() {
        if (idleTimer) clearTimeout(idleTimer);
        starEls.forEach((el) => el.classList.remove("pulse"));
        if (isWon || isTransitioning) return;
        idleTimer = setTimeout(() => {
          if (cleanedUp || isWon || isTransitioning) return;
          const target = starEls[nextStar];
          if (target) {
            target.classList.add("pulse");
            footer.textContent = `Hint: touch star ${nextStar + 1}`;
          }
        }, 6000);
      }

      function updateStarStates() {
        starEls.forEach((el, i) => {
          el.classList.toggle("active", i < nextStar);
          el.classList.toggle("next", i === nextStar);
          if (i !== nextStar) el.classList.remove("pulse");
        });
      }

      function loadShape(idx) {
        shapeIdx = idx;
        nextStar = 0;
        mistakes = 0;
        dragPos = null;
        isTransitioning = false;

        const shape = SHAPES[shapeIdx];
        eraEl.textContent = shape.sub;
        titleEl.textContent = shape.name;
        footer.textContent = `Trace 1 → ${shape.points.length} in order`;

        dotEls.forEach((d, i) => {
          d.classList.toggle("done", i < shapeIdx);
          d.classList.toggle("current", i === shapeIdx);
        });

        starLayer.innerHTML = "";
        starEls = shape.points.map((_, i) => {
          const el = document.createElement("div");
          el.className = "g-constellation-star";
          el.dataset.index = String(i);
          const core = document.createElement("div");
          core.className = "g-constellation-star-core";
          const num = document.createElement("div");
          num.className = "g-constellation-num";
          num.textContent = String(i + 1);
          el.appendChild(core);
          el.appendChild(num);
          starLayer.appendChild(el);
          return el;
        });

        measureBoard();
        updateStarStates();
        resetIdleTimer();
      }

      function triggerWrongStar(wrongIdx) {
        mistakes++;
        safeTone(155, 0.12, "triangle", 0.05);
        safeVibrate(25);

        const wrongEl = starEls[wrongIdx];
        if (wrongEl) {
          wrongEl.classList.add("wrong");
          later(() => wrongEl.classList.remove("wrong"), 260);
        }
        if (!reduceMotion) {
          board.classList.remove("shake");
          void board.offsetWidth;
          board.classList.add("shake");
        }
        if (mistakes >= 2 && starEls[nextStar]) {
          starEls[nextStar].classList.add("pulse");
          footer.textContent = `Next up: star ${nextStar + 1}`;
        }
      }

      function activateStar(idx) {
        if (isTransitioning || isWon) return;
        const shape = SHAPES[shapeIdx];
        if (!shape || idx !== nextStar) return;

        nextStar++;
        mistakes = 0;
        const note = SCALE[(idx) % SCALE.length];
        safeTone(note, 0.24, "sine", 0.09);
        safeVibrate(12);

        updateStarStates();
        const finished = nextStar >= shape.points.length;
        renderLines(finished);
        resetIdleTimer();

        if (finished) {
          completeShape();
        } else {
          footer.textContent = `Star ${nextStar} linked · next is ${nextStar + 1}`;
        }
      }

      function completeShape() {
        isTransitioning = true;
        isDragging = false;
        dragLine.setAttribute("opacity", "0");
        if (idleTimer) clearTimeout(idleTimer);

        dotEls[shapeIdx].classList.remove("current");
        dotEls[shapeIdx].classList.add("done");
        board.classList.add("shining");
        footer.textContent = `${SHAPES[shapeIdx].name} complete ✦`;

        safeChord([261.63, 329.63, 392.00, 523.25], 0.45);

        if (shapeIdx < SHAPES.length - 1) {
          const delay = reduceMotion ? 220 : 620;
          later(() => {
            board.classList.remove("shining");
            if (!reduceMotion) board.classList.add("fading");
            later(() => {
              board.classList.remove("fading");
              loadShape(shapeIdx + 1);
            }, reduceMotion ? 40 : 260);
          }, delay);
        } else {
          isWon = true;
          footer.textContent = "All constellations aligned ✦";
          const winDelay = reduceMotion ? 200 : 850;
          later(() => {
            if (!cleanedUp && api && typeof api.win === "function") {
              api.win();
            }
          }, winDelay);
        }
      }

      function checkPointerAt(clientX, clientY, isInitialTap) {
        if (isTransitioning || isWon) return;
        const r = board.getBoundingClientRect();
        if (r.width > 0) boardRect = r;

        const localX = clientX - boardRect.left;
        const localY = clientY - boardRect.top;
        dragPos = { x: localX, y: localY };

        const shape = SHAPES[shapeIdx];
        if (!shape) return;

        // Hit radius at least 32px around star center
        const hitRadius = 34;
        const targetPt = getStarPx(shape.points[nextStar]);
        const distToNext = Math.hypot(localX - targetPt.x, localY - targetPt.y);

        if (distToNext <= hitRadius) {
          activateStar(nextStar);
          return;
        }

        // On initial pointerdown, check if player tapped a wrong future star
        if (isInitialTap) {
          for (let i = nextStar + 1; i < shape.points.length; i++) {
            const p = getStarPx(shape.points[i]);
            if (Math.hypot(localX - p.x, localY - p.y) <= 28) {
              triggerWrongStar(i);
              break;
            }
          }
        }

        renderLines(false);
      }

      function onPointerDown(e) {
        if (isTransitioning || isWon) return;
        isDragging = true;
        activePointerId = e.pointerId;
        try {
          board.setPointerCapture(e.pointerId);
        } catch (err) {}
        resetIdleTimer();
        checkPointerAt(e.clientX, e.clientY, true);
      }

      function onPointerMove(e) {
        if (!isDragging || (activePointerId !== null && e.pointerId !== activePointerId)) return;
        checkPointerAt(e.clientX, e.clientY, false);
      }

      function onPointerUp(e) {
        if (activePointerId !== null && e.pointerId !== activePointerId) return;
        isDragging = false;
        activePointerId = null;
        dragPos = null;
        try {
          board.releasePointerCapture(e.pointerId);
        } catch (err) {}
        renderLines(nextStar >= SHAPES[shapeIdx].points.length);
      }

      board.addEventListener("pointerdown", onPointerDown);
      board.addEventListener("pointermove", onPointerMove);
      board.addEventListener("pointerup", onPointerUp);
      board.addEventListener("pointercancel", onPointerUp);

      // Guard ResizeObserver
      let ro = null;
      const onWinResize = () => measureBoard();
      if (typeof ResizeObserver !== "undefined") {
        try {
          ro = new ResizeObserver(() => measureBoard());
          ro.observe(root);
        } catch (e) {}
      }
      window.addEventListener("resize", onWinResize);

      loadShape(0);

      return function cleanup() {
        cleanedUp = true;
        if (idleTimer) clearTimeout(idleTimer);
        timeouts.forEach(clearTimeout);
        timeouts = [];
        if (ro) {
          try { ro.disconnect(); } catch (e) {}
        }
        window.removeEventListener("resize", onWinResize);
        board.removeEventListener("pointerdown", onPointerDown);
        board.removeEventListener("pointermove", onPointerMove);
        board.removeEventListener("pointerup", onPointerUp);
        board.removeEventListener("pointercancel", onPointerUp);
      };
    },

    async solveForTest(root) {
      const wait = (ms) => new Promise((res) => setTimeout(res, ms));
      const board = root.querySelector(".g-constellation-board");
      if (!board) return;

      for (let s = 0; s < SHAPES.length; s++) {
        // Wait until current shape's stars are mounted and ready
        for (let retry = 0; retry < 30; retry++) {
          const stars = board.querySelectorAll(".g-constellation-star");
          const isFading = board.classList.contains("fading") || board.classList.contains("shining");
          if (stars.length === SHAPES[s].points.length && !isFading) break;
          await wait(50);
        }

        const stars = Array.from(board.querySelectorAll(".g-constellation-star"));
        for (let i = 0; i < stars.length; i++) {
          const star = stars[i];
          const r = star.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;

          const evType = i === 0 ? "pointerdown" : "pointermove";
          board.dispatchEvent(
            new PointerEvent(evType, {
              bubbles: true,
              pointerId: 1,
              clientX: cx,
              clientY: cy
            })
          );
          await wait(35);
        }

        board.dispatchEvent(
          new PointerEvent("pointerup", {
            bubbles: true,
            pointerId: 1
          })
        );

        if (s < SHAPES.length - 1) {
          await wait(950);
        } else {
          await wait(120);
        }
      }
    }
  };
})();