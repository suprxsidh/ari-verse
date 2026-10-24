(function () {
  "use strict";

  const ON_SONGS = [
    "The Way",
    "Honeymoon Avenue",
    "Baby I",
    "Right There",
    "Tattooed Heart",
    "Piano"
  ];

  const NOT_SONGS = [
    "7 rings",
    "Side to Side",
    "Break Free",
    "Positions",
    "Bloodline",
    "God Is a Woman",
    "Into You",
    "Problem"
  ];

  const LABEL_COLORS = [
    "#f7b2c4",
    "#f9d5e5",
    "#fde2e4",
    "#fad2e1",
    "#e2ece9",
    "#bee1e6",
    "#f4c2c2",
    "#ffd1dc"
  ];

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }

  window.GAMES = window.GAMES || {};
  window.GAMES["jukebox"] = {
    title: "Jukebox Sort",
    intro: "Sort the 8 vinyl records: put Yours Truly songs in the jukebox, and others in the crate!",
    mount(root, api) {
      let cleanedUp = false;
      let won = false;
      let timers = [];
      let idleTimer = null;

      function setTimer(fn, ms) {
        const id = setTimeout(fn, ms);
        timers.push(id);
        return id;
      }

      function safeTone(freq, dur, type, vol) {
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

      const pal = (api && api.palette) || {
        bg1: "#fff5f8",
        bg2: "#fce4ec",
        accent: "#d81b60",
        text: "#3a1d28"
      };

      const style = document.createElement("style");
      style.textContent = `
        .g-jukebox-wrap {
          position: absolute;
           inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background-color: ${pal.bg1};
          background-image: 
            radial-gradient(circle at 50% 20%, rgba(255,255,255,0.8), transparent 70%);
          color: ${pal.text};
          font-family: inherit;
          user-select: none;
          -webkit-user-select: none;
          overflow: hidden;
          box-sizing: border-box;
        }
        .g-jukebox-floor {
          position: absolute;
          left: 0; right: 0; bottom: 0;
          height: 28%;
          background-color: #fffaf0;
          background-image:
            linear-gradient(45deg, #f3d1dc 25%, transparent 25%),
            linear-gradient(-45deg, #f3d1dc 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #f3d1dc 75%),
            linear-gradient(-45deg, transparent 75%, #f3d1dc 75%);
          background-size: 36px 36px;
          background-position: 0 0, 0 18px, 18px -18px, -18px 0;
          border-top: 4px solid #e0c8d0;
          z-index: 0;
        }
        .g-jukebox-topbar {
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 14px 4px;
          font-size: 14px;
          font-weight: 700;
        }
        .g-jukebox-era-tag {
          background: #fff;
          border: 2px solid ${pal.accent};
          color: ${pal.accent};
          padding: 3px 10px;
          border-radius: 999px;
          font-size: 12px;
          letter-spacing: 0.5px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.06);
        }
        .g-jukebox-counter {
          background: rgba(255,255,255,0.85);
          padding: 4px 10px;
          border-radius: 999px;
          border: 1px solid rgba(0,0,0,0.1);
        }
        .g-jukebox-bins {
          position: relative;
          z-index: 2;
          display: flex;
          gap: 12px;
          padding: 6px 12px;
          flex: 1;
          max-height: 46%;
          min-height: 150px;
          align-items: stretch;
          justify-content: center;
        }
        .g-jukebox-bin {
          flex: 1;
          max-width: 210px;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 10px 8px;
          position: relative;
          cursor: pointer;
          touch-action: manipulation;
          transition: transform 0.18s ease, box-shadow 0.18s ease;
          box-sizing: border-box;
        }
        .g-jukebox-bin-on {
          background: linear-gradient(180deg, #ffdde8 0%, #f8bbd0 55%, #f48fb1 100%);
          border: 4px solid #e0e0e0;
          border-top-left-radius: 75px;
          border-top-right-radius: 75px;
          box-shadow: 
            inset 0 0 0 3px #ff80ab,
            0 6px 14px rgba(216,27,96,0.18);
        }
        .g-jukebox-bin-on::before {
          content: "";
          position: absolute;
          inset: 6px;
          border-top-left-radius: 66px;
          border-top-right-radius: 66px;
          border-bottom-left-radius: 10px;
          border-bottom-right-radius: 10px;
          border: 2px dashed rgba(255,255,255,0.8);
          pointer-events: none;
        }
        .g-jukebox-slot {
          width: 75%;
          height: 14px;
          background: #2b111c;
          border-radius: 99px;
          border: 3px solid #fafafa;
          box-shadow: 0 0 10px #ff4081, inset 0 2px 4px rgba(0,0,0,0.8);
          margin: 4px 0;
          position: relative;
        }
        .g-jukebox-slot::after {
          content: "";
          position: absolute;
          left: 10%; right: 10%; top: 5px; height: 2px;
          background: #ff80ab;
          box-shadow: 0 0 6px #ff80ab;
        }
        .g-jukebox-bin-not {
          background: repeating-linear-gradient(
            0deg,
            #deb887,
            #deb887 18px,
            #cfa36e 18px,
            #cfa36e 22px
          );
          border: 4px solid #a67b4b;
          border-radius: 12px;
          margin-top: 22px;
          box-shadow: inset 0 6px 12px rgba(0,0,0,0.18), 0 6px 14px rgba(0,0,0,0.12);
        }
        .g-jukebox-crate-hole {
          width: 48%;
          height: 14px;
          background: rgba(58, 29, 40, 0.75);
          border-radius: 99px;
          border: 2px solid #8c6239;
          margin-top: 4px;
        }
        .g-jukebox-bin-title {
          font-weight: 800;
          font-size: 14px;
          text-align: center;
          background: #fff9fb;
          color: #3a1d28;
          padding: 5px 10px;
          border-radius: 10px;
          border: 2px solid rgba(0,0,0,0.12);
          box-shadow: 0 2px 4px rgba(0,0,0,0.08);
          z-index: 1;
          line-height: 1.15;
        }
        .g-jukebox-bin-sub {
          font-size: 11px;
          font-weight: 600;
          opacity: 0.85;
          display: block;
        }
        .g-jukebox-bin-hover,
        .g-jukebox-bin-nudge {
          transform: scale(1.04);
          box-shadow: 0 0 0 4px ${pal.accent}, 0 8px 20px rgba(216,27,96,0.35) !important;
        }
        .g-jukebox-bin-pop {
          transform: scale(1.07);
        }
        .g-jukebox-tray-area {
          position: relative;
          z-index: 3;
          height: 44%;
          min-height: 200px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding: 4px 12px 14px;
          box-sizing: border-box;
        }
        .g-jukebox-status {
          min-height: 26px;
          margin-bottom: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .g-jukebox-bubble {
          background: #fff;
          color: ${pal.text};
          border: 2px solid ${pal.accent};
          padding: 3px 12px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 700;
          box-shadow: 0 3px 8px rgba(0,0,0,0.12);
          transition: opacity 0.2s, transform 0.2s;
        }
        .g-jukebox-stage {
          position: relative;
          width: 100%;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .g-jukebox-tray-back {
          position: absolute;
          bottom: 4px;
          width: 240px;
          height: 36px;
          background: linear-gradient(90deg, #d7ccc8, #ffffff 50%, #d7ccc8);
          border: 3px solid #9e9e9e;
          border-radius: 12px;
          box-shadow: 0 6px 14px rgba(0,0,0,0.18);
          pointer-events: none;
        }
        .g-jukebox-record {
          position: absolute;
          width: 156px;
          height: 156px;
          border-radius: 50%;
          background: 
            radial-gradient(circle, 
              #161616 0%, 
              #242424 34%, 
              #111 36%, 
              #292929 48%, 
              #141414 51%, 
              #2a2a2a 64%, 
              #111 67%, 
              #1f1f1f 100%);
          box-shadow: 0 6px 16px rgba(0,0,0,0.35), inset 0 0 0 2px rgba(255,255,255,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          touch-action: none;
          cursor: grab;
          transition: transform 0.22s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.22s ease;
          will-change: transform;
        }
        .g-jukebox-record::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: conic-gradient(
            from 35deg,
            transparent 0deg,
            rgba(255,255,255,0.14) 25deg,
            transparent 50deg,
            transparent 180deg,
            rgba(255,255,255,0.14) 205deg,
            transparent 230deg
          );
          pointer-events: none;
        }
        .g-jukebox-record-selected {
          box-shadow: 0 0 0 4px ${pal.accent}, 0 12px 26px rgba(216,27,96,0.45);
        }
        .g-jukebox-record-dragging {
          transition: none !important;
          cursor: grabbing;
          z-index: 50 !important;
          box-shadow: 0 16px 32px rgba(0,0,0,0.45);
        }
        .g-jukebox-label {
          width: 68%;
          height: 68%;
          border-radius: 50%;
          background: #f9d5e5;
          border: 2px solid rgba(255,255,255,0.9);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 10px 8px;
          box-sizing: border-box;
          text-align: center;
          position: relative;
          box-shadow: inset 0 0 6px rgba(0,0,0,0.12);
          pointer-events: none;
        }
        .g-jukebox-hole {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #2b1d23;
          border: 2px solid rgba(255,255,255,0.8);
          flex-shrink: 0;
        }
        .g-jukebox-song {
          font-size: 13px;
          font-weight: 800;
          color: #2b111c;
          line-height: 1.15;
          word-break: break-word;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .g-jukebox-rpm {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.5px;
          color: rgba(43,17,28,0.65);
        }
        @keyframes g-jukebox-shake {
          0%, 100% { transform: translate(0, -10px) rotate(0deg); }
          20% { transform: translate(-14px, -10px) rotate(-6deg); }
          40% { transform: translate(14px, -10px) rotate(6deg); }
          60% { transform: translate(-10px, -10px) rotate(-4deg); }
          80% { transform: translate(10px, -10px) rotate(4deg); }
        }
        .g-jukebox-shake {
          animation: g-jukebox-shake 0.36s ease;
        }
      `;
      root.appendChild(style);

      // Build records list: 4 ON, 4 NOT
      const pickedOn = shuffle(ON_SONGS).slice(0, 4).map((title) => ({ title, isOn: true }));
      const pickedNot = shuffle(NOT_SONGS).slice(0, 4).map((title) => ({ title, isOn: false }));
      const deck = shuffle(pickedOn.concat(pickedNot));

      const wrap = document.createElement("div");
      wrap.className = "g-jukebox-wrap";

      const floor = document.createElement("div");
      floor.className = "g-jukebox-floor";
      wrap.appendChild(floor);

      // Top bar
      const topbar = document.createElement("div");
      topbar.className = "g-jukebox-topbar";
      const eraTag = document.createElement("div");
      eraTag.className = "g-jukebox-era-tag";
      eraTag.textContent = "✨ Yours Truly (2013)";
      const counterEl = document.createElement("div");
      counterEl.className = "g-jukebox-counter";
      counterEl.textContent = "Sorted: 0 / 8";
      topbar.appendChild(eraTag);
      topbar.appendChild(counterEl);
      wrap.appendChild(topbar);

      // Bins container
      const binsRow = document.createElement("div");
      binsRow.className = "g-jukebox-bins";

      const binOn = document.createElement("div");
      binOn.className = "g-jukebox-bin g-jukebox-bin-on";
      binOn.setAttribute("role", "button");
      binOn.dataset.bin = "on";
      binOn.innerHTML = `
        <div style="font-size:24px; line-height:1; margin-top:2px;">🎶</div>
        <div class="g-jukebox-slot"></div>
        <div class="g-jukebox-bin-title">
          On Yours Truly
          <span class="g-jukebox-bin-sub">Jukebox Slot</span>
        </div>
      `;

      const binNot = document.createElement("div");
      binNot.className = "g-jukebox-bin g-jukebox-bin-not";
      binNot.setAttribute("role", "button");
      binNot.dataset.bin = "not";
      binNot.innerHTML = `
        <div class="g-jukebox-crate-hole"></div>
        <div style="font-size:24px; line-height:1;">📦</div>
        <div class="g-jukebox-bin-title">
          Not on it
          <span class="g-jukebox-bin-sub">Record Crate</span>
        </div>
      `;

      binsRow.appendChild(binOn);
      binsRow.appendChild(binNot);
      wrap.appendChild(binsRow);

      // Tray & status area
      const trayArea = document.createElement("div");
      trayArea.className = "g-jukebox-tray-area";

      const statusRow = document.createElement("div");
      statusRow.className = "g-jukebox-status";
      const bubble = document.createElement("div");
      bubble.className = "g-jukebox-bubble";
      bubble.textContent = "Drag or tap the top record to sort it!";
      statusRow.appendChild(bubble);

      const stage = document.createElement("div");
      stage.className = "g-jukebox-stage";
      const trayBack = document.createElement("div");
      trayBack.className = "g-jukebox-tray-back";
      stage.appendChild(trayBack);

      trayArea.appendChild(statusRow);
      trayArea.appendChild(stage);
      wrap.appendChild(trayArea);
      root.appendChild(wrap);

      let sortedCount = 0;
      let selectedItem = null;
      let mistakesOnCurrent = 0;
      const recordItems = [];

      function showBubble(msg, isAlert) {
        bubble.textContent = msg;
        bubble.style.borderColor = isAlert ? "#d81b60" : pal.accent;
        bubble.style.backgroundColor = isAlert ? "#fff0f5" : "#ffffff";
      }

      function clearNudges() {
        binOn.classList.remove("g-jukebox-bin-nudge");
        binNot.classList.remove("g-jukebox-bin-nudge");
      }

      function triggerNudge() {
        if (won || cleanedUp) return;
        const top = getTopItem();
        if (!top) return;
        const targetBin = top.isOn ? binOn : binNot;
        targetBin.classList.add("g-jukebox-bin-nudge");
        const hintText = top.isOn
          ? `Psst! "${top.title}" goes in On Yours Truly!`
          : `Psst! "${top.title}" goes in Not on it!`;
        showBubble(hintText, false);
      }

      function resetIdleTimer() {
        if (idleTimer) clearTimeout(idleTimer);
        if (won || cleanedUp) return;
        idleTimer = setTimeout(() => {
          triggerNudge();
        }, 8000);
      }

      function getTopItem() {
        for (let i = recordItems.length - 1; i >= 0; i--) {
          if (!recordItems[i].sorted) return recordItems[i];
        }
        return null;
      }

      function layoutStack() {
        const remaining = recordItems.filter((r) => !r.sorted);
        const total = remaining.length;
        remaining.forEach((item, idx) => {
          const depthFromTop = total - 1 - idx; // 0 is top record
          item.el.style.zIndex = String(10 + idx);
          if (item.dragging) return;
          const isTop = depthFromTop === 0;
          const yOff = isTop ? -10 : Math.min(depthFromTop * 4, 22);
          const xOff = isTop ? 0 : ((idx % 2 === 0 ? -1 : 1) * Math.min(depthFromTop * 2, 8));
          const scale = isTop ? (selectedItem === item ? 1.06 : 1) : Math.max(0.84, 1 - depthFromTop * 0.03);
          const rot = isTop ? 0 : (idx % 2 === 0 ? -3 : 3) * depthFromTop;
          item.el.style.transform = `translate(${xOff}px, ${yOff}px) scale(${scale}) rotate(${rot}deg)`;
          item.el.style.pointerEvents = isTop ? "auto" : "none";
          if (isTop && selectedItem === item) {
            item.el.classList.add("g-jukebox-record-selected");
          } else {
            item.el.classList.remove("g-jukebox-record-selected");
          }
        });
      }

      function checkBinHit(clientX, clientY) {
        const rOn = binOn.getBoundingClientRect();
        if (clientX >= rOn.left && clientX <= rOn.right && clientY >= rOn.top && clientY <= rOn.bottom) {
          return "on";
        }
        const rNot = binNot.getBoundingClientRect();
        if (clientX >= rNot.left && clientX <= rNot.right && clientY >= rNot.top && clientY <= rNot.bottom) {
          return "not";
        }
        return null;
      }

      function attemptSort(item, binType) {
        if (won || cleanedUp || !item || item.sorted || item.busy) return;
        resetIdleTimer();
        clearNudges();

        const correct = (binType === "on" && item.isOn) || (binType === "not" && !item.isOn);
        const targetBinEl = binType === "on" ? binOn : binNot;

        if (correct) {
          item.sorted = true;
          item.busy = true;
          selectedItem = null;
          mistakesOnCurrent = 0;
          sortedCount++;
          counterEl.textContent = `Sorted: ${sortedCount} / 8`;

          safeTone(587.33, 0.1, "sine", 0.12);
          setTimer(() => safeTone(880, 0.15, "triangle", 0.12), 70);
          safeVibrate(20);

          showBubble(`Nice! "${item.title}" sorted! ✨`, false);

          const stageRect = stage.getBoundingClientRect();
          const binRect = targetBinEl.getBoundingClientRect();
          const dx = (binRect.left + binRect.width / 2) - (stageRect.left + stageRect.width / 2);
          const dy = (binRect.top + binRect.height / 2) - (stageRect.top + stageRect.height / 2);

          item.el.classList.remove("g-jukebox-record-selected");
          item.el.style.pointerEvents = "none";
          item.el.style.transform = `translate(${dx}px, ${dy}px) scale(0.2) rotate(180deg)`;
          item.el.style.opacity = "0";

          targetBinEl.classList.add("g-jukebox-bin-pop");
          setTimer(() => targetBinEl.classList.remove("g-jukebox-bin-pop"), 200);

          layoutStack();

          if (sortedCount >= 8) {
            won = true;
            if (idleTimer) clearTimeout(idleTimer);
            showBubble("All 8 records sorted! Jukebox ready! 💖", false);
            safeChord([523.25, 659.25, 783.99, 1046.5], 0.45);
            const delay = api && api.reduceMotion ? 150 : 900;
            setTimer(() => {
              if (!cleanedUp && api && typeof api.win === "function") {
                api.win();
              }
            }, delay);
          }
        } else {
          // Soft wrong feedback
          mistakesOnCurrent++;
          safeTone(190, 0.18, "sawtooth", 0.08);
          safeVibrate(45);
          showBubble("Other bin! 💿", true);

          item.busy = true;
          selectedItem = item;
          layoutStack();

          if (!(api && api.reduceMotion)) {
            item.el.classList.remove("g-jukebox-shake");
            void item.el.offsetWidth;
            item.el.classList.add("g-jukebox-shake");
          }

          if (mistakesOnCurrent >= 2) {
            triggerNudge();
          }

          setTimer(() => {
            item.el.classList.remove("g-jukebox-shake");
            item.busy = false;
            layoutStack();
          }, 360);
        }
      }

      // Create the 8 vinyl DOM elements
      deck.forEach((data, idx) => {
        const el = document.createElement("div");
        el.className = "g-jukebox-record";
        el.dataset.isOn = data.isOn ? "true" : "false";
        el.dataset.title = data.title;

        const color = LABEL_COLORS[idx % LABEL_COLORS.length];
        el.innerHTML = `
          <div class="g-jukebox-label" style="background:${color}">
            <div class="g-jukebox-rpm">45 RPM</div>
            <div class="g-jukebox-hole"></div>
            <div class="g-jukebox-song"></div>
          </div>
        `;
        el.querySelector(".g-jukebox-song").textContent = data.title;

        const item = {
          el,
          title: data.title,
          isOn: data.isOn,
          sorted: false,
          dragging: false,
          busy: false
        };

        let startX = 0;
        let startY = 0;
        let hasDragged = false;
        let activePointerId = null;

        el.addEventListener("pointerdown", (e) => {
          if (won || cleanedUp || item.sorted || item.busy) return;
          if (getTopItem() !== item) return;
          resetIdleTimer();
          activePointerId = e.pointerId;
          startX = e.clientX;
          startY = e.clientY;
          hasDragged = false;
          item.dragging = true;
          try {
            el.setPointerCapture(e.pointerId);
          } catch (err) {}
        });

        el.addEventListener("pointermove", (e) => {
          if (!item.dragging || e.pointerId !== activePointerId) return;
          const dx = e.clientX - startX;
          const dy = e.clientY - startY;
          if (!hasDragged && Math.hypot(dx, dy) > 7) {
            hasDragged = true;
            el.classList.add("g-jukebox-record-dragging");
          }
          if (hasDragged) {
            el.style.transform = `translate(${dx}px, ${dy - 10}px) scale(1.06) rotate(${dx * 0.08}deg)`;
            const over = checkBinHit(e.clientX, e.clientY);
            binOn.classList.toggle("g-jukebox-bin-hover", over === "on");
            binNot.classList.toggle("g-jukebox-bin-hover", over === "not");
          }
        });

        function finishPointer(e, cancelled) {
          if (!item.dragging || e.pointerId !== activePointerId) return;
          item.dragging = false;
          activePointerId = null;
          el.classList.remove("g-jukebox-record-dragging");
          binOn.classList.remove("g-jukebox-bin-hover");
          binNot.classList.remove("g-jukebox-bin-hover");
          try {
            el.releasePointerCapture(e.pointerId);
          } catch (err) {}

          if (cancelled) {
            layoutStack();
            return;
          }

          if (hasDragged) {
            const hit = checkBinHit(e.clientX, e.clientY);
            if (hit) {
              attemptSort(item, hit);
              return;
            }
            layoutStack();
          } else {
            // Tap to select/deselect
            safeTone(440, 0.06, "sine", 0.07);
            selectedItem = item;
            showBubble(`Tap a bin for "${item.title}"!`, false);
            layoutStack();
          }
        }

        el.addEventListener("pointerup", (e) => finishPointer(e, false));
        el.addEventListener("pointercancel", (e) => finishPointer(e, true));

        stage.appendChild(el);
        recordItems.push(item);
      });

      function onBinTap(binType) {
        if (won || cleanedUp) return;
        resetIdleTimer();
        const top = selectedItem && !selectedItem.sorted ? selectedItem : getTopItem();
        if (!top) return;
        attemptSort(top, binType);
      }

      binOn.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        onBinTap("on");
      });

      binNot.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        onBinTap("not");
      });

      // Responsive sizing
      function handleResize() {
        if (cleanedUp) return;
        const w = root.clientWidth || 360;
        const h = root.clientHeight || 600;
        const recSize = Math.max(124, Math.min(164, Math.floor(Math.min(w * 0.44, h * 0.27))));
        recordItems.forEach((r) => {
          r.el.style.width = `${recSize}px`;
          r.el.style.height = `${recSize}px`;
        });
        layoutStack();
      }

      let ro = null;
      if (typeof ResizeObserver !== "undefined") {
        try {
          ro = new ResizeObserver(handleResize);
          ro.observe(root);
        } catch (e) {}
      }
      window.addEventListener("resize", handleResize);

      handleResize();
      resetIdleTimer();

      return function cleanup() {
        cleanedUp = true;
        if (idleTimer) clearTimeout(idleTimer);
        timers.forEach((id) => clearTimeout(id));
        timers = [];
        if (ro) {
          try {
            ro.disconnect();
          } catch (e) {}
        }
        window.removeEventListener("resize", handleResize);
      };
    },

    async solveForTest(root) {
      const wait = (ms) => new Promise((r) => setTimeout(r, ms));
      const binOn = root.querySelector('.g-jukebox-bin[data-bin="on"]');
      const binNot = root.querySelector('.g-jukebox-bin[data-bin="not"]');
      if (!binOn || !binNot) return;

      for (let step = 0; step < 8; step++) {
        const records = Array.from(root.querySelectorAll(".g-jukebox-record")).filter(
          (el) => el.style.opacity !== "0"
        );
        if (!records.length) break;
        const topRecord = records[records.length - 1];
        const isOn = topRecord.dataset.isOn === "true";

        topRecord.dispatchEvent(
          new PointerEvent("pointerdown", { bubbles: true, pointerId: 1, clientX: 100, clientY: 100 })
        );
        topRecord.dispatchEvent(
          new PointerEvent("pointerup", { bubbles: true, pointerId: 1, clientX: 100, clientY: 100 })
        );
        await wait(45);

        const targetBin = isOn ? binOn : binNot;
        targetBin.dispatchEvent(
          new PointerEvent("pointerdown", { bubbles: true, pointerId: 1 })
        );
        await wait(65);
      }
    }
  };
})();