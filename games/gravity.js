(function () {
  "use strict";

  window.GAMES = window.GAMES || {};
  window.GAMES["gravity"] = {
    title: "Flip the Sweetener",
    intro: "Tap anywhere to flip gravity and collect 8 sweet treats in the upside-down world!",
    mount(root, api) {
      const p = (api && api.palette) || {};
      const bg1 = p.bg1 || "#f9ece4";
      const bg2 = p.bg2 || "#e8cbb8";
      const accent = p.accent || "#d98a6c";
      const text = p.text || "#4a3b32";
      const reduceMotion = !!(api && api.reduceMotion);

      const style = document.createElement("style");
      style.textContent = `
        .g-gravity-wrap {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          touch-action: none;
          user-select: none;
          -webkit-user-select: none;
          font-family: inherit;
          background: linear-gradient(180deg, ${bg2} 0%, ${bg1} 50%, ${bg2} 100%);
        }
        .g-gravity-canvas {
          display: block;
          width: 100%;
          height: 100%;
          touch-action: none;
        }
        .g-gravity-hud {
          position: absolute;
          top: 12px;
          left: 14px;
          right: 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          pointer-events: none;
          z-index: 2;
        }
        .g-gravity-pill {
          background: rgba(255, 255, 255, 0.82);
          color: ${text};
          padding: 6px 14px;
          border-radius: 999px;
          font-weight: 700;
          font-size: 15px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
          border: 1.5px solid ${accent};
        }
        .g-gravity-era {
          transform: rotate(180deg);
          font-size: 13px;
          letter-spacing: 1px;
          opacity: 0.9;
        }
        .g-gravity-nudge {
          position: absolute;
          left: 50%;
          bottom: 15%;
          transform: translateX(-50%);
          background: rgba(255, 255, 255, 0.94);
          color: ${text};
          padding: 10px 18px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 600;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
          border: 1.5px solid ${accent};
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.25s ease;
          white-space: nowrap;
          z-index: 3;
        }
        .g-gravity-nudge.g-gravity-show {
          opacity: 1;
        }
      `;
      root.appendChild(style);

      const wrap = document.createElement("div");
      wrap.className = "g-gravity-wrap";

      const hud = document.createElement("div");
      hud.className = "g-gravity-hud";

      const scoreEl = document.createElement("div");
      scoreEl.className = "g-gravity-pill";
      scoreEl.textContent = "🍬 0 / 8";

      const eraEl = document.createElement("div");
      eraEl.className = "g-gravity-pill g-gravity-era";
      eraEl.textContent = "sweetener";

      hud.appendChild(scoreEl);
      hud.appendChild(eraEl);

      const nudgeEl = document.createElement("div");
      nudgeEl.className = "g-gravity-nudge";
      nudgeEl.textContent = "Tap anywhere to flip gravity ☁️↕️";

      const canvas = document.createElement("canvas");
      canvas.className = "g-gravity-canvas";

      wrap.appendChild(canvas);
      wrap.appendChild(hud);
      wrap.appendChild(nudgeEl);
      root.appendChild(wrap);

      const ctx = canvas.getContext("2d");

      // Layout metrics
      let width = 360;
      let height = 600;
      let dpr = 1;
      let bandH = 66;
      let ceilY = 66;
      let floorY = 534;
      let playerX = 86;
      const playerR = 22;

      // Game state
      const TARGET_SCORE = 8;
      let score = 0;
      let won = false;
      let winTimer = null;
      let rafId = null;
      let lastTime = performance.now();

      // Player physics
      let gravDir = 1; // 1 = floor, -1 = ceiling
      let playerY = 300;
      let playerVy = 0;
      let visualRot = 0; // 0 = normal, Math.PI = upside down
      let shakeTime = 0;
      let slowFactor = 1;

      // Idle / mistake tracking for helpful nudge
      let idleTime = 0;
      let hitsSinceCollect = 0;
      let nextSpawnTimer = 0.25;
      let spawnCount = 0;

      // Entities & particles
      const items = [];
      const particles = [];
      const bgClouds = [
        { x: 40, yFrac: 0.28, s: 28, speed: 18 },
        { x: 190, yFrac: 0.65, s: 34, speed: 14 },
        { x: 310, yFrac: 0.42, s: 24, speed: 22 }
      ];

      function safeTone(freq, dur, type, vol) {
        try {
          if (api && typeof api.tone === "function") api.tone(freq, dur, type, vol);
        } catch (e) {}
      }

      function safeChord(freqs, dur) {
        try {
          if (api && typeof api.chord === "function") api.chord(freqs, dur);
        } catch (e) {}
      }

      function safeVibrate(ms) {
        try {
          if (api && typeof api.vibrate === "function") api.vibrate(ms);
        } catch (e) {}
      }

      function updateLayout() {
        const w = root.clientWidth || 360;
        const h = root.clientHeight || 600;
        width = Math.max(240, w);
        height = Math.max(320, h);
        dpr = Math.min(window.devicePixelRatio || 1, 2);

        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);

        bandH = Math.max(56, Math.min(82, Math.round(height * 0.12)));
        ceilY = bandH;
        floorY = height - bandH;
        playerX = Math.round(Math.min(100, Math.max(68, width * 0.24)));

        // Clamp player inside vertical bounds
        const minY = ceilY + playerR;
        const maxY = floorY - playerR;
        if (playerY < minY) playerY = minY;
        if (playerY > maxY) playerY = maxY;
      }

      updateLayout();
      playerY = floorY - playerR;

      let ro = null;
      if (typeof ResizeObserver !== "undefined") {
        try {
          ro = new ResizeObserver(() => updateLayout());
          ro.observe(root);
        } catch (e) {}
      }
      window.addEventListener("resize", updateLayout);

      function spawnBurst(x, y, emoji, count) {
        if (reduceMotion) return;
        for (let i = 0; i < count; i++) {
          const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
          const spd = 60 + Math.random() * 90;
          particles.push({
            x,
            y,
            vx: Math.cos(angle) * spd,
            vy: Math.sin(angle) * spd,
            emoji,
            life: 0.55,
            maxLife: 0.55,
            size: 16 + Math.random() * 6
          });
        }
      }

      function flipGravity() {
        if (won) return;
        gravDir = -gravDir;
        idleTime = 0;
        nudgeEl.classList.remove("g-gravity-show");

        // Gentle initial boost in the new gravity direction
        playerVy = gravDir * 140;
        safeTone(gravDir === -1 ? 520 : 390, 0.08, "sine", 0.05);
        safeVibrate(10);
        spawnBurst(playerX, playerY, "✨", 3);
      }

      function onPointerDown(e) {
        if (e && e.isPrimary === false) return;
        try {
          if (e && e.pointerId != null && canvas.setPointerCapture) {
            canvas.setPointerCapture(e.pointerId);
          }
        } catch (err) {}
        flipGravity();
      }

      function onPointerEnd(e) {
        try {
          if (e && e.pointerId != null && canvas.releasePointerCapture) {
            canvas.releasePointerCapture(e.pointerId);
          }
        } catch (err) {}
      }

      canvas.addEventListener("pointerdown", onPointerDown);
      canvas.addEventListener("pointerup", onPointerEnd);
      canvas.addEventListener("pointercancel", onPointerEnd);

      function onVisibilityChange() {
        if (!document.hidden) {
          lastTime = performance.now();
        }
      }
      document.addEventListener("visibilitychange", onVisibilityChange);

      function spawnNextWave() {
        spawnCount++;
        const startX = width + 40;
        // Every 3rd wave spawns a donut obstacle on one side and a treat on the other further down
        if (spawnCount % 3 === 0) {
          const donutSide = Math.random() < 0.5 ? 1 : -1;
          items.push({
            type: "donut",
            x: startX,
            side: donutSide,
            r: 20,
            wobble: Math.random() * Math.PI * 2
          });
          items.push({
            type: "treat",
            x: startX + 135,
            side: -donutSide,
            r: 22,
            wobble: Math.random() * Math.PI * 2
          });
          nextSpawnTimer = 1.45;
        } else {
          // Treat on alternating or random side
          const side = spawnCount % 2 === 0 ? -1 : 1;
          items.push({
            type: "treat",
            x: startX,
            side,
            r: 22,
            wobble: Math.random() * Math.PI * 2
          });
          nextSpawnTimer = 0.95;
        }
      }

      // Seed initial treats so the screen immediately feels alive
      items.push({
        type: "treat",
        x: width * 0.72,
        side: 1,
        r: 22,
        wobble: 0
      });
      items.push({
        type: "treat",
        x: width * 1.12,
        side: -1,
        r: 22,
        wobble: 1.5
      });
      nextSpawnTimer = 1.1;

      function triggerWin() {
        if (won) return;
        won = true;
        nudgeEl.classList.remove("g-gravity-show");
        safeChord([523.25, 659.25, 783.99, 1046.5], 0.45);
        safeVibrate(40);
        spawnBurst(playerX, playerY, "🍬", 10);
        spawnBurst(width * 0.5, height * 0.5, "✨", 12);

        const delay = reduceMotion ? 150 : 950;
        winTimer = setTimeout(() => {
          try {
            if (api && typeof api.win === "function") api.win();
          } catch (e) {}
        }, delay);
      }

      function step(dt) {
        if (!won) {
          idleTime += dt;
          if (idleTime > 8 || hitsSinceCollect >= 3) {
            nudgeEl.classList.add("g-gravity-show");
          }
        }

        if (shakeTime > 0) {
          shakeTime = Math.max(0, shakeTime - dt);
        }

        // Recover horizontal scroll speed smoothly after a gentle donut nudge
        slowFactor += (1 - slowFactor) * Math.min(1, dt * 4);

        // Gravity & vertical movement
        const gravityAccel = 1500;
        playerVy += gravDir * gravityAccel * dt;
        playerY += playerVy * dt;

        const minY = ceilY + playerR;
        const maxY = floorY - playerR;
        if (playerY <= minY) {
          playerY = minY;
          playerVy = 0;
        } else if (playerY >= maxY) {
          playerY = maxY;
          playerVy = 0;
        }

        // Smooth upside-down cloud rotation
        const targetRot = gravDir === -1 ? Math.PI : 0;
        if (reduceMotion) {
          visualRot = targetRot;
        } else {
          visualRot += (targetRot - visualRot) * Math.min(1, dt * 12);
        }

        // Background ambient clouds
        for (let i = 0; i < bgClouds.length; i++) {
          const c = bgClouds[i];
          c.x -= c.speed * dt;
          if (c.x < -50) c.x = width + 50;
        }

        // Spawning
        if (!won) {
          nextSpawnTimer -= dt;
          if (nextSpawnTimer <= 0) {
            spawnNextWave();
          }
        }

        // Move and check items
        const baseSpeed = Math.min(230, Math.max(175, width * 0.48));
        const moveSpeed = baseSpeed * slowFactor;

        for (let i = items.length - 1; i >= 0; i--) {
          const it = items[i];
          it.x -= moveSpeed * dt;
          it.wobble += dt * 4;

          const itemY =
            it.side === 1
              ? floorY - it.r - 4
              : ceilY + it.r + 4;

          const dx = it.x - playerX;
          const dy = itemY - playerY;
          const dist = Math.hypot(dx, dy);

          if (!won && dist < playerR + it.r - 4) {
            if (it.type === "treat") {
              score = Math.min(TARGET_SCORE, score + 1);
              scoreEl.textContent = `🍬 ${score} / ${TARGET_SCORE}`;
              hitsSinceCollect = 0;
              nudgeEl.classList.remove("g-gravity-show");

              const notes = [523.25, 587.33, 659.25, 698.46, 783.99, 880, 987.77, 1046.5];
              safeTone(notes[(score - 1) % notes.length], 0.14, "triangle", 0.08);
              safeVibrate(15);
              spawnBurst(it.x, itemY, "✨", 6);
              items.splice(i, 1);

              if (score >= TARGET_SCORE) {
                triggerWin();
              }
              continue;
            } else if (it.type === "donut") {
              // Soft obstacle nudge: gentle slowdown + shake, no score loss
              hitsSinceCollect++;
              slowFactor = -0.35;
              shakeTime = 0.28;
              safeTone(210, 0.14, "sine", 0.06);
              safeVibrate(25);
              spawnBurst(it.x, itemY, "💭", 5);
              items.splice(i, 1);
              continue;
            }
          }

          if (it.x < -60) {
            items.splice(i, 1);
          }
        }

        // Update particles
        for (let i = particles.length - 1; i >= 0; i--) {
          const pt = particles[i];
          pt.x += pt.vx * dt;
          pt.y += pt.vy * dt;
          pt.life -= dt;
          if (pt.life <= 0) {
            particles.splice(i, 1);
          }
        }
      }

      function draw() {
        ctx.save();
        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, width, height);

        // Gentle horizontal shake when nudged
        if (shakeTime > 0 && !reduceMotion) {
          const mag = Math.sin(shakeTime * 50) * 5;
          ctx.translate(mag, 0);
        }

        // Subtle upside-down watermark text in the middle
        ctx.save();
        ctx.translate(width * 0.5, height * 0.5);
        ctx.rotate(Math.PI);
        ctx.fillStyle = text;
        ctx.globalAlpha = 0.07;
        ctx.font = "800 32px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("sweetener", 0, -14);
        ctx.font = "600 14px sans-serif";
        ctx.fillText("2018", 0, 16);
        ctx.restore();

        // Ambient background clouds
        ctx.save();
        ctx.globalAlpha = 0.28;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        for (let i = 0; i < bgClouds.length; i++) {
          const c = bgClouds[i];
          ctx.font = `${c.s}px sans-serif`;
          ctx.fillText("☁️", c.x, height * c.yFrac);
        }
        ctx.restore();

        // Ceiling & floor bands (dreamy warm peach/beige stripes)
        ctx.fillStyle = bg2;
        ctx.fillRect(0, 0, width, ceilY);
        ctx.fillRect(0, floorY, width, height - floorY);

        ctx.strokeStyle = accent;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(0, ceilY);
        ctx.lineTo(width, ceilY);
        ctx.moveTo(0, floorY);
        ctx.lineTo(width, floorY);
        ctx.stroke();

        // Draw items (treats 🍬 and donuts 🍩)
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        for (let i = 0; i < items.length; i++) {
          const it = items[i];
          const bob = reduceMotion ? 0 : Math.sin(it.wobble) * 3;
          const itemY =
            (it.side === 1 ? floorY - it.r - 4 : ceilY + it.r + 4) + bob;

          ctx.save();
          ctx.translate(it.x, itemY);
          if (it.side === -1) ctx.rotate(Math.PI);
          ctx.font = it.type === "treat" ? "28px sans-serif" : "26px sans-serif";
          ctx.fillText(it.type === "treat" ? "🍬" : "🍩", 0, 0);
          ctx.restore();
        }

        // Draw player cloud ☁️
        ctx.save();
        ctx.translate(playerX, playerY);
        ctx.rotate(visualRot);
        ctx.font = "38px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("☁️", 0, 0);
        ctx.restore();

        // Draw particles
        for (let i = 0; i < particles.length; i++) {
          const pt = particles[i];
          ctx.save();
          ctx.globalAlpha = Math.max(0, pt.life / pt.maxLife);
          ctx.font = `${Math.round(pt.size)}px sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(pt.emoji, pt.x, pt.y);
          ctx.restore();
        }

        // Win banner
        if (won) {
          ctx.save();
          ctx.fillStyle = "rgba(255, 255, 255, 0.88)";
          const boxW = Math.min(260, width - 40);
          const boxH = 74;
          const bx = (width - boxW) / 2;
          const by = (height - boxH) / 2;
          ctx.beginPath();
          if (ctx.roundRect) {
            ctx.roundRect(bx, by, boxW, boxH, 20);
          } else {
            ctx.rect(bx, by, boxW, boxH);
          }
          ctx.fill();
          ctx.strokeStyle = accent;
          ctx.lineWidth = 2;
          ctx.stroke();

          ctx.fillStyle = text;
          ctx.font = "700 20px sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("Sweetener Complete! 🍬", width * 0.5, height * 0.5);
          ctx.restore();
        }

        ctx.restore();
      }

      function loop(now) {
        rafId = requestAnimationFrame(loop);
        if (document.hidden) {
          lastTime = now;
          return;
        }
        const dt = Math.min(0.05, Math.max(0.001, (now - lastTime) / 1000));
        lastTime = now;
        step(dt);
        draw();
      }

      rafId = requestAnimationFrame(loop);

      // Expose state & helpers on root so solveForTest can inspect and drive real events
      root.__gravityTest = {
        getState() {
          return {
            won,
            score,
            gravDir,
            playerX,
            playerY,
            items: items.map((it) => ({
              type: it.type,
              x: it.x,
              side: it.side
            }))
          };
        },
        prepareFastSolve() {
          // Line up 8 treats right ahead on alternating sides for a swift automated test run
          items.length = 0;
          for (let i = 0; i < 10; i++) {
            items.push({
              type: "treat",
              x: playerX + 220 + i * 38,
              side: -gravDir,
              r: 22,
              wobble: 0
            });
          }
          nextSpawnTimer = 10;
        },
        stepSim(dt) {
          step(dt);
          draw();
        },
        canvas
      };

      return function cleanup() {
        if (rafId != null) cancelAnimationFrame(rafId);
        if (winTimer != null) clearTimeout(winTimer);
        if (ro) {
          try {
            ro.disconnect();
          } catch (e) {}
        }
        window.removeEventListener("resize", updateLayout);
        document.removeEventListener("visibilitychange", onVisibilityChange);
        canvas.removeEventListener("pointerdown", onPointerDown);
        canvas.removeEventListener("pointerup", onPointerEnd);
        canvas.removeEventListener("pointercancel", onPointerEnd);
        delete root.__gravityTest;
        root.innerHTML = "";
      };
    },

    async solveForTest(root) {
      const helper = root.__gravityTest;
      if (!helper) return;

      helper.prepareFastSolve();
      const canvas = helper.canvas;

      const dispatchTap = () => {
        const rect = canvas.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const down = new PointerEvent("pointerdown", {
          bubbles: true,
          cancelable: true,
          clientX: cx,
          clientY: cy,
          pointerId: 1,
          isPrimary: true
        });
        const up = new PointerEvent("pointerup", {
          bubbles: true,
          cancelable: true,
          clientX: cx,
          clientY: cy,
          pointerId: 1,
          isPrimary: true
        });
        canvas.dispatchEvent(down);
        canvas.dispatchEvent(up);
      };

      for (let stepIdx = 0; stepIdx < 260; stepIdx++) {
        const st = helper.getState();
        if (st.won) break;

        // Find the closest upcoming item in front of the cloud
        let targetSide = st.gravDir;
        let bestX = Infinity;

        for (let i = 0; i < st.items.length; i++) {
          const it = st.items[i];
          if (it.x >= st.playerX - 14 && it.x < bestX) {
            bestX = it.x;
            targetSide = it.type === "treat" ? it.side : -it.side;
          }
        }

        if (targetSide !== st.gravDir) {
          dispatchTap();
        }

        // Advance simulation smoothly and yield briefly
        helper.stepSim(0.032);
        await new Promise((r) => setTimeout(r, 8));
      }
    }
  };
})();