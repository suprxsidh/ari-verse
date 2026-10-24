(function () {
  "use strict";

  window.GAMES = window.GAMES || {};

  const STICKERS = [
    { id: "text", label: "thank u, next", isText: true },
    { id: "lip", label: "💄" },
    { id: "phone", label: "📞" },
    { id: "ring", label: "💍" },
    { id: "bow", label: "🎀" },
    { id: "butterfly", label: "🦋" },
    { id: "nails", label: "💅" },
    { id: "crown", label: "👑" },
    { id: "sparkle", label: "✨" },
    { id: "book", label: "📓" }
  ];

  // 6 cycle states: 3 sizes paired with fun tilts
  const STATES = [
    { scale: 1.0, rot: -6 },
    { scale: 1.35, rot: 8 },
    { scale: 0.75, rot: -14 },
    { scale: 1.0, rot: 12 },
    { scale: 1.35, rot: -8 },
    { scale: 0.75, rot: 5 }
  ];

  const MIN_STICKERS = 5;

  window.GAMES["scrapbook"] = {
    title: "Burn Book Collage",
    intro: "Tap stickers to add them to your page, drag to arrange, and tap placed stickers to resize!",

    mount(root, api) {
      const palette = (api && api.palette) || {
        bg1: "#ffd1e8",
        bg2: "#ff9ebb",
        accent: "#e01171",
        text: "#3a001e"
      };

      let placed = []; // { uid, def, x, y, stateIdx, z, el }
      let selectedUid = null;
      let zCounter = 10;
      let uidCounter = 1;
      let won = false;
      let idleTimer = null;
      let winTimer = null;
      let resizeObserver = null;

      // Audio / Haptics helpers
      function playTone(freq, dur, type, vol) {
        try {
          if (api && api.tone) api.tone(freq, dur, type || "sine", vol || 0.08);
        } catch (e) {}
      }
      function playChord(freqs, dur) {
        try {
          if (api && api.chord) api.chord(freqs, dur || 0.25);
        } catch (e) {}
      }
      function buzz(ms) {
        try {
          if (api && api.vibrate) api.vibrate(ms);
        } catch (e) {}
      }

      // Inject CSS
      const style = document.createElement("style");
      style.textContent = `
        .g-scrapbook-wrap {
          position: absolute;
           inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 10px 12px;
          box-sizing: border-box;
          background: radial-gradient(circle at 50% 20%, ${palette.bg1}, ${palette.bg2});
          color: ${palette.text};
          font-family: inherit;
          user-select: none;
          -webkit-user-select: none;
          overflow: hidden;
        }
        .g-scrapbook-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 6px;
          z-index: 20;
          min-height: 44px;
        }
        .g-scrapbook-counter {
          font-size: 13px;
          font-weight: 800;
          background: rgba(255, 255, 255, 0.78);
          color: #b80058;
          padding: 6px 10px;
          border-radius: 999px;
          border: 2px solid #ff66b2;
          box-shadow: 0 2px 6px rgba(184,0,88,0.12);
          white-space: nowrap;
        }
        .g-scrapbook-actions {
          display: flex;
          gap: 6px;
          align-items: center;
        }
        .g-scrapbook-btn {
          min-height: 44px;
          min-width: 44px;
          padding: 0 12px;
          border-radius: 999px;
          border: 2px solid #fff;
          background: linear-gradient(180deg, #ff77bc, #d60b6c);
          color: #fff;
          font-family: inherit;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.3px;
          box-shadow: 0 3px 8px rgba(180, 0, 90, 0.28), inset 0 1px 1px rgba(255,255,255,0.6);
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          touch-action: manipulation;
          transition: transform 0.12s ease, opacity 0.15s ease;
        }
        .g-scrapbook-btn:active {
          transform: scale(0.94);
        }
        .g-scrapbook-btn[data-disabled="true"] {
          opacity: 0.45;
          filter: grayscale(0.35);
        }
        .g-scrapbook-btn-secondary {
          background: linear-gradient(180deg, #ffffff, #ffd6eb);
          color: #b80058;
          border-color: #ff85c2;
        }
        .g-scrapbook-btn-done:not([data-disabled="true"]) {
          background: linear-gradient(180deg, #ff3399, #a80051);
          box-shadow: 0 0 14px rgba(255, 20, 147, 0.6), inset 0 1px 2px #fff;
        }
        .g-scrapbook-page-wrap {
          position: relative;
          flex: 1;
          margin: 8px 0;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 180px;
        }
        .g-scrapbook-page {
          position: relative;
          width: 100%;
          height: 100%;
          background-color: #ff9ec7;
          background-image:
            radial-gradient(rgba(255, 255, 255, 0.38) 1.5px, transparent 1.5px),
            linear-gradient(145deg, #ffb6d9 0%, #ff7eb6 55%, #ff5da2 100%);
          background-size: 18px 18px, 100% 100%;
          border-radius: 18px;
          border: 4px solid #ffffff;
          box-shadow:
            0 10px 24px rgba(130, 0, 65, 0.25),
            inset 0 0 22px rgba(190, 0, 90, 0.22);
          overflow: hidden;
          touch-action: none;
        }
        .g-scrapbook-page::before {
          content: "";
          position: absolute;
          left: 10px;
          top: 12px;
          bottom: 12px;
          width: 12px;
          background: repeating-linear-gradient(
            to bottom,
            #ffffff 0px,
            #ffffff 6px,
            rgba(180, 0, 80, 0.35) 6px,
            rgba(180, 0, 80, 0.35) 12px,
            transparent 12px,
            transparent 22px
          );
          border-radius: 4px;
          pointer-events: none;
          z-index: 2;
        }
        .g-scrapbook-banner {
          position: absolute;
          top: 12px;
          left: 50%;
          transform: translateX(-50%) rotate(-2deg);
          background: #1a000d;
          color: #ffffff;
          padding: 4px 16px;
          font-weight: 900;
          font-size: 14px;
          letter-spacing: 2px;
          border: 2px dashed #ff66b2;
          box-shadow: 3px 3px 0px #e01171;
          pointer-events: none;
          white-space: nowrap;
          z-index: 2;
        }
        .g-scrapbook-watermark {
          position: absolute;
          bottom: 8px;
          right: 12px;
          font-size: 11px;
          font-weight: 800;
          color: rgba(140, 0, 65, 0.45);
          letter-spacing: 1px;
          pointer-events: none;
          z-index: 2;
        }
        .g-scrapbook-hint {
          position: absolute;
          bottom: 12px;
          left: 28px;
          right: 28px;
          text-align: center;
          background: rgba(255, 255, 255, 0.9);
          color: #b80058;
          font-size: 12px;
          font-weight: 800;
          padding: 6px 10px;
          border-radius: 999px;
          border: 2px solid #ff66b2;
          box-shadow: 0 4px 10px rgba(0,0,0,0.12);
          pointer-events: none;
          z-index: 900;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.25s ease, transform 0.25s ease;
        }
        .g-scrapbook-hint[data-show="true"] {
          opacity: 1;
          transform: translateY(0);
        }
        .g-scrapbook-placed {
          position: absolute;
          left: 0;
          top: 0;
          min-width: 48px;
          min-height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: grab;
          touch-action: none;
          user-select: none;
          -webkit-user-select: none;
          will-change: transform;
          filter: drop-shadow(0 3px 5px rgba(100, 0, 50, 0.28));
        }
        .g-scrapbook-placed-emoji {
          font-size: 42px;
          line-height: 1;
          padding: 4px;
        }
        .g-scrapbook-placed-text {
          background: #1a000d;
          color: #ff9ec7;
          border: 2.5px solid #ffffff;
          box-shadow: 3px 3px 0 #e01171;
          padding: 5px 11px;
          font-size: 15px;
          font-weight: 900;
          letter-spacing: 0.8px;
          border-radius: 6px;
          white-space: nowrap;
        }
        .g-scrapbook-placed[data-selected="true"]::after {
          content: "";
          position: absolute;
          inset: -4px;
          border: 2px dashed #ffffff;
          border-radius: 12px;
          box-shadow: 0 0 8px rgba(255, 20, 147, 0.75);
          pointer-events: none;
        }
        .g-scrapbook-tray {
          background: rgba(255, 255, 255, 0.78);
          border: 2px solid #ffffff;
          border-radius: 16px;
          padding: 6px;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 6px;
          box-shadow: 0 4px 14px rgba(150, 0, 70, 0.16);
          z-index: 20;
        }
        .g-scrapbook-tray-item {
          min-height: 44px;
          min-width: 44px;
          border-radius: 12px;
          border: 1.5px solid #ffb3d9;
          background: linear-gradient(180deg, #ffffff, #fff0f7);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          cursor: pointer;
          touch-action: manipulation;
          padding: 2px;
          box-shadow: 0 2px 4px rgba(180, 0, 90, 0.1);
          transition: transform 0.12s ease, background 0.15s ease;
        }
        .g-scrapbook-tray-item:active {
          transform: scale(0.9);
          background: #ffd6eb;
        }
        .g-scrapbook-tray-text {
          font-size: 10px;
          font-weight: 900;
          line-height: 1.05;
          text-align: center;
          background: #1a000d;
          color: #ff9ec7;
          padding: 4px 5px;
          border-radius: 5px;
          border: 1px solid #ff66b2;
        }
        @keyframes g-scrapbook-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        .g-scrapbook-nudge {
          animation: g-scrapbook-pulse 0.9s ease-in-out infinite;
        }
        @keyframes g-scrapbook-shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .g-scrapbook-shake {
          animation: g-scrapbook-shake 0.28s ease;
        }
        .g-scrapbook-celebrate {
          position: absolute;
          inset: 0;
          pointer-events: none;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 46px;
          z-index: 1000;
        }
      `;
      root.appendChild(style);

      // Build DOM
      const wrap = document.createElement("div");
      wrap.className = "g-scrapbook-wrap";

      // Top bar
      const topbar = document.createElement("div");
      topbar.className = "g-scrapbook-topbar";

      const counterEl = document.createElement("div");
      counterEl.className = "g-scrapbook-counter";
      counterEl.textContent = `0 / ${MIN_STICKERS} stickers`;

      const actionsEl = document.createElement("div");
      actionsEl.className = "g-scrapbook-actions";

      const binBtn = document.createElement("button");
      binBtn.type = "button";
      binBtn.className = "g-scrapbook-btn g-scrapbook-btn-secondary";
      binBtn.setAttribute("aria-label", "Remove selected sticker");
      binBtn.dataset.disabled = "true";
      binBtn.textContent = "🗑️";

      const saveBtn = document.createElement("button");
      saveBtn.type = "button";
      saveBtn.className = "g-scrapbook-btn g-scrapbook-btn-secondary";
      saveBtn.setAttribute("aria-label", "Save picture");
      saveBtn.textContent = "📸 Save";

      const doneBtn = document.createElement("button");
      doneBtn.type = "button";
      doneBtn.className = "g-scrapbook-btn g-scrapbook-btn-done";
      doneBtn.dataset.role = "done";
      doneBtn.dataset.disabled = "true";
      doneBtn.textContent = "Done ✨";

      actionsEl.appendChild(binBtn);
      actionsEl.appendChild(saveBtn);
      actionsEl.appendChild(doneBtn);
      topbar.appendChild(counterEl);
      topbar.appendChild(actionsEl);

      // Scrapbook page
      const pageWrap = document.createElement("div");
      pageWrap.className = "g-scrapbook-page-wrap";

      const page = document.createElement("div");
      page.className = "g-scrapbook-page";

      const banner = document.createElement("div");
      banner.className = "g-scrapbook-banner";
      banner.textContent = "BURN BOOK";

      const watermark = document.createElement("div");
      watermark.className = "g-scrapbook-watermark";
      watermark.textContent = "xoxo ♥ thank u, next";

      const hintEl = document.createElement("div");
      hintEl.className = "g-scrapbook-hint";
      hintEl.textContent = "Tap stickers below to decorate your page!";

      page.appendChild(banner);
      page.appendChild(watermark);
      page.appendChild(hintEl);
      pageWrap.appendChild(page);

      // Tray
      const tray = document.createElement("div");
      tray.className = "g-scrapbook-tray";

      const trayButtons = [];
      STICKERS.forEach((def) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "g-scrapbook-tray-item";
        btn.dataset.stickerId = def.id;
        if (def.isText) {
          const span = document.createElement("span");
          span.className = "g-scrapbook-tray-text";
          span.textContent = def.label;
          btn.appendChild(span);
        } else {
          btn.textContent = def.label;
        }
        btn.addEventListener("click", () => {
          if (won) return;
          addSticker(def);
        });
        tray.appendChild(btn);
        trayButtons.push(btn);
      });

      wrap.appendChild(topbar);
      wrap.appendChild(pageWrap);
      wrap.appendChild(tray);
      root.appendChild(wrap);

      // Hint / Idle system
      function showHint(msg) {
        hintEl.textContent = msg;
        hintEl.dataset.show = "true";
      }
      function hideHint() {
        hintEl.dataset.show = "false";
        tray.classList.remove("g-scrapbook-nudge");
        doneBtn.classList.remove("g-scrapbook-nudge");
      }
      function resetIdle() {
        hideHint();
        if (idleTimer) clearTimeout(idleTimer);
        if (won) return;
        idleTimer = setTimeout(() => {
          if (won) return;
          if (placed.length < MIN_STICKERS) {
            const rem = MIN_STICKERS - placed.length;
            showHint(`Tap ${rem} more sticker${rem === 1 ? "" : "s"} below, or tap one to resize!`);
            if (!api || !api.reduceMotion) tray.classList.add("g-scrapbook-nudge");
          } else {
            showHint("Looking glam! Tap 'Done ✨' at the top when ready!");
            if (!api || !api.reduceMotion) doneBtn.classList.add("g-scrapbook-nudge");
          }
        }, 8000);
      }

      // Render transform for a placed sticker
      function applyStickerTransform(item) {
        const st = STATES[item.stateIdx % STATES.length];
        item.el.style.transform = `translate(${item.x}px, ${item.y}px) translate(-50%, -50%) rotate(${st.rot}deg) scale(${st.scale})`;
        item.el.style.zIndex = String(item.z);
        item.el.dataset.selected = item.uid === selectedUid ? "true" : "false";
      }

      function updateUI() {
        const count = placed.length;
        counterEl.textContent =
          count < MIN_STICKERS
            ? `${count} / ${MIN_STICKERS} stickers`
            : `${count} stickers ♥`;
        doneBtn.dataset.disabled = count >= MIN_STICKERS ? "false" : "true";
        binBtn.dataset.disabled = selectedUid !== null ? "false" : "true";
        placed.forEach(applyStickerTransform);
      }

      function selectSticker(uid) {
        selectedUid = uid;
        const item = placed.find((p) => p.uid === uid);
        if (item) {
          item.z = ++zCounter;
        }
        updateUI();
      }

      // Add sticker to page
      function addSticker(def) {
        resetIdle();
        const rect = page.getBoundingClientRect();
        const w = rect.width || 300;
        const h = rect.height || 340;

        // Scatter gently around the center area
        const spreadX = Math.max(60, w - 120);
        const spreadY = Math.max(60, h - 140);
        const offsetIdx = placed.length;
        const goldenAngle = offsetIdx * 2.39996;
        const radius = Math.min(spreadX, spreadY) * (0.14 + ((offsetIdx % 4) * 0.08));
        const x = Math.round(w / 2 + Math.cos(goldenAngle) * radius);
        const y = Math.round(h / 2 + 12 + Math.sin(goldenAngle) * radius);

        const el = document.createElement("div");
        el.className = "g-scrapbook-placed";
        if (def.isText) {
          const inner = document.createElement("div");
          inner.className = "g-scrapbook-placed-text";
          inner.textContent = def.label;
          el.appendChild(inner);
        } else {
          const inner = document.createElement("div");
          inner.className = "g-scrapbook-placed-emoji";
          inner.textContent = def.label;
          el.appendChild(inner);
        }

        const item = {
          uid: uidCounter++,
          def,
          x: Math.max(44, Math.min(w - 44, x)),
          y: Math.max(54, Math.min(h - 44, y)),
          stateIdx: placed.length % STATES.length,
          z: ++zCounter,
          el
        };

        bindStickerPointer(item);
        page.appendChild(el);
        placed.push(item);
        selectSticker(item.uid);

        playTone(520 + (placed.length % 6) * 60, 0.09, "triangle", 0.08);
        buzz(10);
      }

      // Pointer drag & tap to cycle size/tilt
      function bindStickerPointer(item) {
        let dragging = false;
        let startX = 0;
        let startY = 0;
        let origX = 0;
        let origY = 0;
        let moved = false;

        item.el.addEventListener("pointerdown", (e) => {
          if (won) return;
          e.stopPropagation();
          resetIdle();
          dragging = true;
          moved = false;
          startX = e.clientX;
          startY = e.clientY;
          origX = item.x;
          origY = item.y;
          selectSticker(item.uid);
          try {
            item.el.setPointerCapture(e.pointerId);
          } catch (err) {}
        });

        item.el.addEventListener("pointermove", (e) => {
          if (!dragging || won) return;
          const dx = e.clientX - startX;
          const dy = e.clientY - startY;
          if (Math.hypot(dx, dy) > 6) {
            moved = true;
          }
          if (moved) {
            const rect = page.getBoundingClientRect();
            const pad = 28;
            item.x = Math.max(pad, Math.min((rect.width || 300) - pad, origX + dx));
            item.y = Math.max(pad, Math.min((rect.height || 340) - pad, origY + dy));
            applyStickerTransform(item);
          }
        });

        function finishPointer(e) {
          if (!dragging) return;
          dragging = false;
          try {
            item.el.releasePointerCapture(e.pointerId);
          } catch (err) {}
          if (!moved && !won) {
            // Simple tap on placed sticker cycles size and tilt
            item.stateIdx = (item.stateIdx + 1) % STATES.length;
            applyStickerTransform(item);
            playTone(660 + (item.stateIdx * 55), 0.07, "sine", 0.07);
            buzz(8);
          }
        }

        item.el.addEventListener("pointerup", finishPointer);
        item.el.addEventListener("pointercancel", finishPointer);
      }

      // Deselect when tapping blank scrapbook page
      page.addEventListener("pointerdown", (e) => {
        if (e.target === page) {
          resetIdle();
          selectedUid = null;
          updateUI();
        }
      });

      // Bin button removes last selected sticker
      binBtn.addEventListener("click", () => {
        if (won) return;
        resetIdle();
        if (selectedUid === null) {
          binBtn.classList.remove("g-scrapbook-shake");
          void binBtn.offsetWidth;
          binBtn.classList.add("g-scrapbook-shake");
          playTone(220, 0.1, "sawtooth", 0.05);
          showHint("Tap a sticker on the page first to select it!");
          return;
        }
        const idx = placed.findIndex((p) => p.uid === selectedUid);
        if (idx !== -1) {
          const [removed] = placed.splice(idx, 1);
          if (removed.el && removed.el.parentNode) {
            removed.el.parentNode.removeChild(removed.el);
          }
          selectedUid = placed.length ? placed[placed.length - 1].uid : null;
          playTone(300, 0.09, "sine", 0.07);
          buzz(12);
          updateUI();
        }
      });

      // Save picture to canvas -> PNG download (with fallback)
      saveBtn.addEventListener("click", () => {
        resetIdle();
        playTone(740, 0.08, "triangle", 0.07);
        try {
          const rect = page.getBoundingClientRect();
          const cw = Math.max(300, Math.round(rect.width || 320));
          const ch = Math.max(340, Math.round(rect.height || 380));
          const canvas = document.createElement("canvas");
          canvas.width = cw * 2;
          canvas.height = ch * 2;
          const ctx = canvas.getContext("2d");
          ctx.scale(2, 2);

          // Background gradient
          const grad = ctx.createLinearGradient(0, 0, cw, ch);
          grad.addColorStop(0, "#ffb6d9");
          grad.addColorStop(0.55, "#ff7eb6");
          grad.addColorStop(1, "#ff5da2");
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, cw, ch);

          // Subtle polka dots
          ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
          for (let x = 12; x < cw; x += 18) {
            for (let y = 12; y < ch; y += 18) {
              ctx.beginPath();
              ctx.arc(x, y, 1.5, 0, Math.PI * 2);
              ctx.fill();
            }
          }

          // White border
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 6;
          ctx.strokeRect(3, 3, cw - 6, ch - 6);

          // Burn Book header
          ctx.save();
          ctx.translate(cw / 2, 26);
          ctx.rotate((-2 * Math.PI) / 180);
          ctx.fillStyle = "#1a000d";
          ctx.fillRect(-62, -13, 124, 26);
          ctx.strokeStyle = "#ff66b2";
          ctx.lineWidth = 2;
          ctx.strokeRect(-62, -13, 124, 26);
          ctx.fillStyle = "#ffffff";
          ctx.font = "900 14px sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("BURN BOOK", 0, 1);
          ctx.restore();

          // Watermark
          ctx.fillStyle = "rgba(140, 0, 65, 0.55)";
          ctx.font = "bold 11px sans-serif";
          ctx.textAlign = "right";
          ctx.fillText("xoxo ♥ thank u, next", cw - 12, ch - 10);

          // Placed stickers sorted by z-index
          const sorted = placed.slice().sort((a, b) => a.z - b.z);
          sorted.forEach((item) => {
            const st = STATES[item.stateIdx % STATES.length];
            ctx.save();
            ctx.translate(item.x, item.y);
            ctx.rotate((st.rot * Math.PI) / 180);
            ctx.scale(st.scale, st.scale);
            if (item.def.isText) {
              ctx.font = "900 15px sans-serif";
              const tw = ctx.measureText(item.def.label).width + 22;
              const th = 28;
              ctx.fillStyle = "#e01171";
              ctx.fillRect(-tw / 2 + 3, -th / 2 + 3, tw, th);
              ctx.fillStyle = "#1a000d";
              ctx.fillRect(-tw / 2, -th / 2, tw, th);
              ctx.strokeStyle = "#ffffff";
              ctx.lineWidth = 2;
              ctx.strokeRect(-tw / 2, -th / 2, tw, th);
              ctx.fillStyle = "#ff9ec7";
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              ctx.fillText(item.def.label, 0, 1);
            } else {
              ctx.font = "42px sans-serif";
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              ctx.fillText(item.def.label, 0, 2);
            }
            ctx.restore();
          });

          const dataUrl = canvas.toDataURL("image/png");
          try {
            const link = document.createElement("a");
            link.download = "burn-book-collage.png";
            link.href = dataUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            showHint("Saved your Burn Book page! 📸");
          } catch (dlErr) {
            window.open(dataUrl, "_blank");
          }
        } catch (err) {
          showHint("Snapshot ready! ✨");
        }
      });

      // Done button triggers win flow
      doneBtn.addEventListener("click", () => {
        if (won) return;
        resetIdle();
        if (placed.length < MIN_STICKERS) {
          const need = MIN_STICKERS - placed.length;
          doneBtn.classList.remove("g-scrapbook-shake");
          void doneBtn.offsetWidth;
          doneBtn.classList.add("g-scrapbook-shake");
          playTone(240, 0.12, "sawtooth", 0.06);
          buzz(25);
          showHint(`Place ${need} more sticker${need === 1 ? "" : "s"} to finish your page!`);
          return;
        }

        won = true;
        selectedUid = null;
        updateUI();
        playChord([523.25, 659.25, 783.99, 1046.5], 0.45);
        buzz(40);

        const delay = api && api.reduceMotion ? 120 : 900;
        if (!api || !api.reduceMotion) {
          const cel = document.createElement("div");
          cel.className = "g-scrapbook-celebrate";
          cel.textContent = "💖✨👑✨💖";
          page.appendChild(cel);
        }

        winTimer = setTimeout(() => {
          try {
            if (api && typeof api.win === "function") api.win();
          } catch (e) {}
        }, delay);
      });

      // Keep stickers inside bounds on resize
      function handleResize() {
        const rect = page.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        const pad = 28;
        placed.forEach((item) => {
          item.x = Math.max(pad, Math.min(rect.width - pad, item.x));
          item.y = Math.max(pad, Math.min(rect.height - pad, item.y));
          applyStickerTransform(item);
        });
      }

      if (typeof ResizeObserver !== "undefined") {
        try {
          resizeObserver = new ResizeObserver(handleResize);
          resizeObserver.observe(root);
        } catch (e) {}
      }
      window.addEventListener("resize", handleResize);

      // Initial hint & idle timer
      resetIdle();

      return function cleanup() {
        if (idleTimer) clearTimeout(idleTimer);
        if (winTimer) clearTimeout(winTimer);
        if (resizeObserver) {
          try {
            resizeObserver.disconnect();
          } catch (e) {}
        }
        window.removeEventListener("resize", handleResize);
        root.innerHTML = "";
      };
    },

    async solveForTest(root) {
      const wait = (ms) => new Promise((r) => setTimeout(r, ms));
      const trayItems = root.querySelectorAll(".g-scrapbook-tray-item");
      for (let i = 0; i < 5 && i < trayItems.length; i++) {
        trayItems[i].click();
        await wait(40);
      }
      const placedEl = root.querySelector(".g-scrapbook-placed");
      if (placedEl) {
        placedEl.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, clientX: 100, clientY: 100 }));
        placedEl.dispatchEvent(new PointerEvent("pointerup", { bubbles: true, clientX: 100, clientY: 100 }));
        await wait(30);
      }
      const doneBtn = root.querySelector('[data-role="done"]');
      if (doneBtn) {
        doneBtn.click();
      }
      await wait(60);
    }
  };
})();