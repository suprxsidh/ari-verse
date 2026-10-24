(function () {
  "use strict";

  window.GAMES = window.GAMES || {};

  var DIFFS = [
    { id: 0, x: 256, y: 40, name: "Banner star" },
    { id: 1, x: 75, y: 120, name: "Brass lamp" },
    { id: 2, x: 200, y: 145, name: "Rotary phone" },
    { id: 3, x: 325, y: 125, name: "Desk globe" },
    { id: 4, x: 140, y: 185, name: "Tulip vase" }
  ];

  function drawSceneSVG(changed, isAfter) {
    var star3 = changed
      ? ""
      : '<polygon points="256,28 259,36 268,36 261,41 263,49 256,44 249,49 251,41 244,36 253,36" fill="#d4af37"/>';

    var lampShade = changed
      ? '<g><circle cx="75" cy="96" r="6" fill="#fffdf5"/><circle cx="75" cy="96" r="11" fill="#fffdf5" opacity="0.35"/></g>'
      : '<g><path d="M 48 102 L 102 102 L 90 74 L 60 74 Z" fill="#2e523b" stroke="#b59449" stroke-width="2"/><path d="M 52 102 L 98 102" stroke="#ebd59b" stroke-width="2"/></g>';

    var phoneColor = changed ? "#d97b88" : "#f4EFE6";
    var phoneTrim = changed ? "#f4EFE6" : "#d4af37";

    var globeArc = changed
      ? '<path d="M 325 82 A 30 30 0 0 1 325 142" fill="none" stroke="#b59449" stroke-width="4"/>'
      : '<path d="M 325 82 A 30 30 0 0 0 325 142" fill="none" stroke="#b59449" stroke-width="4"/>';

    var globeContinents = changed
      ? '<path d="M 322 98 Q 335 105 330 118 Q 320 125 315 112 Z" fill="#739c79"/><path d="M 308 118 Q 315 125 312 132 Z" fill="#739c79"/>'
      : '<path d="M 315 98 Q 328 102 322 115 Q 312 122 308 110 Z" fill="#739c79"/><path d="M 332 108 Q 342 115 335 128 Z" fill="#739c79"/>';

    var rightFlower = changed
      ? ""
      : '<g><path d="M 144 195 Q 152 180 156 170" fill="none" stroke="#4a7050" stroke-width="2.5"/><path d="M 156 170 C 151 165 153 157 158 161 C 160 156 164 156 163 162 C 168 160 167 168 161 171 Z" fill="#e38aae"/></g>';

    var afterOverlays = isAfter
      ? '<g id="g-desk-hints"></g><g id="g-desk-marks"></g><g id="g-desk-ripples"></g>'
      : "";

    return (
      '<svg class="g-desk-svg' + (isAfter ? " g-desk-after" : "") + '" viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg">' +
        // 1960s Sage Wallpaper & Wainscoting
        '<rect width="400" height="240" fill="#cad8c8"/>' +
        '<g stroke="#bfcebd" stroke-width="2" opacity="0.7">' +
          '<line x1="40" y1="0" x2="40" y2="155"/><line x1="80" y1="0" x2="80" y2="155"/>' +
          '<line x1="120" y1="0" x2="120" y2="155"/><line x1="160" y1="0" x2="160" y2="155"/>' +
          '<line x1="200" y1="0" x2="200" y2="155"/><line x1="240" y1="0" x2="240" y2="155"/>' +
          '<line x1="280" y1="0" x2="280" y2="155"/><line x1="320" y1="0" x2="320" y2="155"/>' +
          '<line x1="360" y1="0" x2="360" y2="155"/>' +
        '</g>' +
        // Arched Window Center
        '<path d="M 145 155 L 145 55 A 55 55 0 0 1 255 55 L 255 155 Z" fill="#e6f0ec" stroke="#f7f4eb" stroke-width="6"/>' +
        '<line x1="200" y1="0" x2="200" y2="155" stroke="#f7f4eb" stroke-width="4"/>' +
        '<line x1="145" y1="95" x2="255" y2="95" stroke="#f7f4eb" stroke-width="4"/>' +
        // Curtains
        '<path d="M 135 0 Q 165 65 142 155 L 125 155 L 125 0 Z" fill="#829c85"/>' +
        '<path d="M 265 0 Q 235 65 258 155 L 275 155 L 275 0 Z" fill="#829c85"/>' +
        // Moulding
        '<rect x="0" y="150" width="400" height="8" fill="#f7f4eb"/>' +
        '<line x1="0" y1="150" x2="400" y2="150" stroke="#b59449" stroke-width="1.5"/>' +

        // DIFF 0: Presidential / Positions Style Banner
        '<g id="g-desk-item-0">' +
          '<rect x="115" y="16" width="170" height="36" rx="6" fill="#233b2d" stroke="#d4af37" stroke-width="2.5"/>' +
          '<text x="200" y="29" fill="#f7f4eb" font-size="8" font-weight="bold" letter-spacing="2.5" text-anchor="middle">POSITIONS</text>' +
          '<polygon points="144,28 147,36 156,36 149,41 151,49 144,44 137,49 139,41 132,36 141,36" fill="#d4af37"/>' +
          '<polygon points="200,28 203,36 212,36 205,41 207,49 200,44 193,49 195,41 188,36 197,36" fill="#d4af37"/>' +
          star3 +
        '</g>' +

        // Stately Mahogany & Brass Desk Surface
        '<polygon points="15,158 385,158 400,222 0,222" fill="#633d28" stroke="#422617" stroke-width="2"/>' +
        '<rect x="0" y="220" width="400" height="20" fill="#472a1a"/>' +
        '<rect x="20" y="224" width="105" height="14" fill="#361f12" stroke="#b59449" stroke-width="1"/>' +
        '<circle cx="72" cy="231" r="3" fill="#d4af37"/>' +
        '<rect x="275" y="224" width="105" height="14" fill="#361f12" stroke="#b59449" stroke-width="1"/>' +
        '<circle cx="328" cy="231" r="3" fill="#d4af37"/>' +
        '<rect x="140" y="224" width="120" height="14" fill="#361f12" stroke="#b59449" stroke-width="1"/>' +
        '<path d="M 190 230 L 210 230" stroke="#d4af37" stroke-width="2.5" stroke-linecap="round"/>' +

        // Desk Blotter & Papers
        '<polygon points="105,168 295,168 310,214 90,214" fill="#2c4c38" stroke="#d4af37" stroke-width="1.5"/>' +
        '<polygon points="175,176 232,174 238,206 170,208" fill="#fcfaf2" stroke="#d9d2c5" stroke-width="1"/>' +
        '<line x1="182" y1="183" x2="222" y2="182" stroke="#999" stroke-width="1.5"/>' +
        '<line x1="181" y1="190" x2="225" y2="189" stroke="#999" stroke-width="1.5"/>' +
        '<line x1="180" y1="197" x2="212" y2="196" stroke="#999" stroke-width="1.5"/>' +
        // Brass Nameplate
        '<rect x="242" y="194" width="58" height="16" rx="2" fill="#d4af37" stroke="#5c4314" stroke-width="1.5"/>' +
        '<text x="271" y="205" fill="#261b07" font-size="6.5" font-weight="bold" letter-spacing="0.8" text-anchor="middle">MADAM PRES.</text>' +

        // DIFF 1: Banker's Brass Lamp (Left)
        '<g id="g-desk-item-1">' +
          '<ellipse cx="75" cy="166" rx="20" ry="6" fill="#b59449" stroke="#7a6024" stroke-width="1.5"/>' +
          '<rect x="72" y="100" width="6" height="65" fill="#d4af37" stroke="#7a6024" stroke-width="1"/>' +
          '<line x1="83" y1="102" x2="83" y2="122" stroke="#d4af37" stroke-width="1.5"/>' +
          '<circle cx="83" cy="123" r="2.5" fill="#d4af37"/>' +
          lampShade +
        '</g>' +

        // DIFF 4: Tulip Vase (Left-Center)
        '<g id="g-desk-item-4">' +
          '<path d="M 134 195 Q 134 176 130 165" fill="none" stroke="#4a7050" stroke-width="2.5"/>' +
          '<path d="M 130 165 C 125 160 127 152 132 156 C 134 151 138 151 137 157 C 142 155 141 163 135 166 Z" fill="#e38aae"/>' +
          '<path d="M 139 195 Q 140 175 142 160" fill="none" stroke="#4a7050" stroke-width="2.5"/>' +
          '<path d="M 142 160 C 137 155 139 147 144 151 C 146 146 150 146 149 152 C 154 150 153 158 147 161 Z" fill="#f2b6cf"/>' +
          rightFlower +
          '<path d="M 129 182 C 125 198 128 208 139 208 C 150 208 153 198 149 182 Z" fill="#f7f4eb" stroke="#b59449" stroke-width="1.5"/>' +
          '<ellipse cx="139" cy="182" rx="10" ry="3" fill="#d4af37"/>' +
        '</g>' +

        // DIFF 2: 1960s Rotary Phone (Center)
        '<g id="g-desk-item-2">' +
          '<path d="M 178 164 L 222 164 L 215 140 L 185 140 Z" fill="' + phoneColor + '" stroke="#594d46" stroke-width="1.5"/>' +
          '<circle cx="200" cy="153" r="9" fill="#fff" stroke="' + phoneTrim + '" stroke-width="2"/>' +
          '<circle cx="200" cy="153" r="2.5" fill="#b59449"/>' +
          '<rect x="187" y="133" width="6" height="8" fill="#b59449"/>' +
          '<rect x="207" y="133" width="6" height="8" fill="#b59449"/>' +
          '<path d="M 172 132 Q 200 123 228 132 L 224 139 Q 200 132 176 139 Z" fill="' + phoneColor + '" stroke="#594d46" stroke-width="1.5"/>' +
        '</g>' +

        // DIFF 3: Stately World Globe (Right)
        '<g id="g-desk-item-3">' +
          '<ellipse cx="325" cy="164" rx="18" ry="5.5" fill="#b59449" stroke="#7a6024" stroke-width="1.5"/>' +
          '<rect x="322" y="142" width="6" height="20" fill="#b59449"/>' +
          globeArc +
          '<circle cx="325" cy="112" r="23" fill="#9bc4be" stroke="#7a6024" stroke-width="1.5"/>' +
          globeContinents +
          '<line x1="302" y1="112" x2="348" y2="112" stroke="#7a6024" stroke-width="0.8" opacity="0.5"/>' +
        '</g>' +

        afterOverlays +
      '</svg>'
    );
  }

  window.GAMES["desk"] = {
    title: "Desk Inspector",
    intro: "Tap all 5 differences on the bottom 'After' desk to approve the oval office.",

    mount: function (root, api) {
      var found = {};
      var foundCount = 0;
      var won = false;
      var idleTimer = null;
      var winTimer = null;
      var mistakes = 0;

      var style = document.createElement("style");
      style.textContent = [
        ".g-desk-wrap { position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:space-between; padding:6px 10px 10px; box-sizing:border-box; background:linear-gradient(165deg, " + (api.palette.bg1 || "#e8efe9") + ", " + (api.palette.bg2 || "#cfded2") + "); color:" + (api.palette.text || "#1e3326") + "; font-family:inherit; user-select:none; -webkit-user-select:none; overflow:hidden; }",
        ".g-desk-hud { width:100%; max-width:440px; display:flex; align-items:center; justify-content:space-between; padding:4px 10px; box-sizing:border-box; background:rgba(247,244,235,0.88); border:1.5px solid #b59449; border-radius:999px; font-size:13px; font-weight:700; letter-spacing:0.6px; box-shadow:0 2px 6px rgba(0,0,0,0.08); }",
        ".g-desk-pips { display:flex; gap:6px; }",
        ".g-desk-pip { width:14px; height:14px; border-radius:50%; border:1.5px solid #8c6d23; background:rgba(181,148,73,0.2); transition:transform 0.25s, background 0.25s; }",
        ".g-desk-pip.g-desk-on { background:#b8252b; border-color:#7a1317; transform:scale(1.15); }",
        ".g-desk-boards { flex:1; width:100%; max-width:440px; display:flex; flex-direction:column; justify-content:center; gap:8px; min-height:0; }",
        ".g-desk-card { position:relative; flex:1; min-height:0; display:flex; align-items:center; justify-content:center; background:#f7f4eb; border:2.5px solid #b59449; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.12); overflow:hidden; }",
        ".g-desk-card-after { border-color:#2e523b; cursor:pointer; touch-action:none; }",
        ".g-desk-badge { position:absolute; top:6px; left:8px; z-index:2; background:#233b2d; color:#f7f4eb; border:1px solid #d4af37; padding:2px 8px; border-radius:4px; font-size:10px; font-weight:800; letter-spacing:1.2px; text-transform:uppercase; pointer-events:none; }",
        ".g-desk-badge-after { background:#872328; }",
        ".g-desk-svg { width:100%; height:100%; max-height:100%; display:block; object-fit:contain; }",
        "@keyframes g-desk-pulse { 0%,100% { r:24px; opacity:0.85; } 50% { r:33px; opacity:0.25; } }",
        ".g-desk-hint-ring { fill:none; stroke:#fff3b0; stroke-width:3.5; stroke-dasharray:5 4; animation:g-desk-pulse 1.5s infinite ease-in-out; pointer-events:none; }",
        "@keyframes g-desk-pop { 0% { transform:scale(1.6) rotate(-14deg); opacity:0; } 100% { transform:scale(1) rotate(-14deg); opacity:1; } }",
        ".g-desk-stamp { transform-box:fill-box; transform-origin:center; transform:rotate(-14deg); animation:g-desk-pop 0.22s cubic-bezier(0.2,0.9,0.3,1.2); pointer-events:none; }",
        "@keyframes g-desk-rip { 0% { r:3px; opacity:0.85; } 100% { r:22px; opacity:0; } }",
        ".g-desk-ripple { fill:none; stroke:#333; stroke-width:2; animation:g-desk-rip 0.45s ease-out forwards; pointer-events:none; }",
        ".g-desk-banner-win { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(35,59,45,0.45); z-index:10; opacity:0; pointer-events:none; transition:opacity 0.25s; }",
        ".g-desk-banner-win.g-desk-show { opacity:1; }",
        ".g-desk-win-box { background:#f7f4eb; border:3px solid #d4af37; color:#233b2d; padding:12px 24px; border-radius:10px; font-weight:900; font-size:18px; letter-spacing:2px; box-shadow:0 8px 24px rgba(0,0,0,0.25); transform:rotate(-4deg); }"
      ].join("\n");
      root.appendChild(style);

      var wrap = document.createElement("div");
      wrap.className = "g-desk-wrap";
      wrap.innerHTML =
        '<div class="g-desk-hud">' +
          '<span id="g-desk-status">INSPECTION: 0 / 5</span>' +
          '<div class="g-desk-pips" id="g-desk-pips">' +
            '<span class="g-desk-pip"></span><span class="g-desk-pip"></span><span class="g-desk-pip"></span><span class="g-desk-pip"></span><span class="g-desk-pip"></span>' +
          '</div>' +
        '</div>' +
        '<div class="g-desk-boards">' +
          '<div class="g-desk-card">' +
            '<div class="g-desk-badge">BEFORE</div>' +
            drawSceneSVG(false, false) +
          '</div>' +
          '<div class="g-desk-card g-desk-card-after" id="g-desk-after-card">' +
            '<div class="g-desk-badge g-desk-badge-after">AFTER (TAP HERE)</div>' +
            drawSceneSVG(true, true) +
          '</div>' +
        '</div>' +
        '<div class="g-desk-banner-win" id="g-desk-win">' +
          '<div class="g-desk-win-box">DESK APPROVED ✓</div>' +
        '</div>';
      root.appendChild(wrap);

      var afterCard = wrap.querySelector("#g-desk-after-card");
      var afterSvg = afterCard.querySelector("svg");
      var marksGroup = afterSvg.querySelector("#g-desk-marks");
      var hintsGroup = afterSvg.querySelector("#g-desk-hints");
      var ripplesGroup = afterSvg.querySelector("#g-desk-ripples");
      var statusEl = wrap.querySelector("#g-desk-status");
      var pips = wrap.querySelectorAll(".g-desk-pip");
      var winOverlay = wrap.querySelector("#g-desk-win");

      function safeTone(freq, dur, type, vol) {
        try { api.tone(freq, dur, type, vol); } catch (e) {}
      }
      function safeChord(freqs, dur) {
        try { api.chord(freqs, dur); } catch (e) {}
      }
      function safeVibrate(ms) {
        try { api.vibrate(ms); } catch (e) {}
      }

      function clearHint() {
        while (hintsGroup.firstChild) hintsGroup.removeChild(hintsGroup.firstChild);
      }

      function showNudge() {
        if (won) return;
        clearHint();
        for (var i = 0; i < DIFFS.length; i++) {
          if (!found[DIFFS[i].id]) {
            var d = DIFFS[i];
            var ring = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            ring.setAttribute("cx", d.x);
            ring.setAttribute("cy", d.y);
            ring.setAttribute("r", "26");
            ring.setAttribute("class", "g-desk-hint-ring");
            hintsGroup.appendChild(ring);
            break;
          }
        }
      }

      function resetIdle() {
        if (idleTimer) clearTimeout(idleTimer);
        if (!won) {
          idleTimer = setTimeout(showNudge, 8000);
        }
      }

      function addStamp(d) {
        var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        g.setAttribute("class", "g-desk-stamp");

        var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", d.x);
        circle.setAttribute("cy", d.y);
        circle.setAttribute("r", "24");
        circle.setAttribute("fill", "rgba(184, 37, 43, 0.12)");
        circle.setAttribute("stroke", "#b8252b");
        circle.setAttribute("stroke-width", "2.5");

        var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", d.x - 28);
        rect.setAttribute("y", d.y - 7);
        rect.setAttribute("width", "56");
        rect.setAttribute("height", "14");
        rect.setAttribute("rx", "2");
        rect.setAttribute("fill", "#f7f4eb");
        rect.setAttribute("stroke", "#b8252b");
        rect.setAttribute("stroke-width", "1.8");

        var txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
        txt.setAttribute("x", d.x);
        txt.setAttribute("y", d.y + 3);
        txt.setAttribute("text-anchor", "middle");
        txt.setAttribute("fill", "#b8252b");
        txt.setAttribute("font-size", "7.5");
        txt.setAttribute("font-weight", "900");
        txt.setAttribute("letter-spacing", "0.6");
        txt.textContent = "APPROVED";

        g.appendChild(circle);
        g.appendChild(rect);
        g.appendChild(txt);
        marksGroup.appendChild(g);
      }

      function addRipple(x, y) {
        var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        c.setAttribute("cx", x);
        c.setAttribute("cy", y);
        c.setAttribute("r", "4");
        c.setAttribute("class", "g-desk-ripple");
        ripplesGroup.appendChild(c);
        setTimeout(function () {
          if (c.parentNode) c.parentNode.removeChild(c);
        }, 460);
      }

      function inspectAt(svgX, svgY) {
        if (won) return;
        resetIdle();

        var hitDiff = null;
        var bestDist = 38; //generous 38 SVG unit hit radius
        for (var i = 0; i < DIFFS.length; i++) {
          var d = DIFFS[i];
          if (found[d.id]) continue;
          var dx = svgX - d.x;
          var dy = svgY - d.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist <= bestDist) {
            bestDist = dist;
            hitDiff = d;
          }
        }

        if (hitDiff) {
          found[hitDiff.id] = true;
          foundCount++;
          mistakes = 0;
          clearHint();
          addStamp(hitDiff);

          if (pips[foundCount - 1]) {
            pips[foundCount - 1].classList.add("g-desk-on");
          }
          statusEl.textContent = "INSPECTION: " + foundCount + " / 5";

          // Stamp thump tone + chime
          safeTone(135, 0.09, "triangle", 0.22);
          safeTone(520 + foundCount * 60, 0.14, "sine", 0.12);
          safeVibrate(25);

          if (foundCount >= 5) {
            won = true;
            if (idleTimer) clearTimeout(idleTimer);
            winOverlay.classList.add("g-desk-show");
            safeChord([523.25, 659.25, 783.99, 1046.5], 0.45);
            var delay = api.reduceMotion ? 150 : 950;
            winTimer = setTimeout(function () {
              api.win();
            }, delay);
          }
        } else {
          mistakes++;
          addRipple(svgX, svgY);
          safeTone(210, 0.06, "sine", 0.07);
          if (mistakes >= 3) {
            showNudge();
          }
        }
      }

      function clientToSvg(clientX, clientY) {
        var rect = afterSvg.getBoundingClientRect();
        if (!rect.width || !rect.height) return { x: 200, y: 120 };
        var scaleX = 400 / rect.width;
        var scaleY = 240 / rect.height;
        var scale = Math.max(scaleX, scaleY);
        var renderedW = 400 / scale;
        var renderedH = 240 / scale;
        var offsetX = rect.left + (rect.width - renderedW) / 2;
        var offsetY = rect.top + (rect.height - renderedH) / 2;
        return {
          x: (clientX - offsetX) * scale,
          y: (clientY - offsetY) * scale
        };
      }

      function onPointerDown(e) {
        if (won) return;
        e.preventDefault();
        try { afterCard.setPointerCapture(e.pointerId); } catch (err) {}
        var pt = clientToSvg(e.clientX, e.clientY);
        inspectAt(pt.x, pt.y);
      }

      afterCard.addEventListener("pointerdown", onPointerDown);

      // Expose helper for solveForTest so synthetic events or direct SVG coords work cleanly
      afterCard._inspectSvgPoint = inspectAt;

      var ro = null;
      if (typeof ResizeObserver !== "undefined") {
        try {
          ro = new ResizeObserver(function () {});
          ro.observe(root);
        } catch (e) {}
      }

      resetIdle();

      return function cleanup() {
        if (idleTimer) clearTimeout(idleTimer);
        if (winTimer) clearTimeout(winTimer);
        if (ro) {
          try { ro.disconnect(); } catch (e) {}
        }
        afterCard.removeEventListener("pointerdown", onPointerDown);
      };
    },

    solveForTest: async function (root) {
      var afterCard = root.querySelector("#g-desk-after-card");
      if (!afterCard) return;
      var afterSvg = afterCard.querySelector("svg");

      for (var i = 0; i < DIFFS.length; i++) {
        var d = DIFFS[i];
        var rect = afterSvg.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          var scale = Math.max(400 / rect.width, 240 / rect.height);
          var renderedW = 400 / scale;
          var renderedH = 240 / scale;
          var offsetX = rect.left + (rect.width - renderedW) / 2;
          var offsetY = rect.top + (rect.height - renderedH) / 2;
          var clientX = offsetX + d.x / scale;
          var clientY = offsetY + d.y / scale;

          var ev = new PointerEvent("pointerdown", {
            bubbles: true,
            cancelable: true,
            clientX: clientX,
            clientY: clientY,
            pointerId: 1
          });
          afterCard.dispatchEvent(ev);
        } else if (typeof afterCard._inspectSvgPoint === "function") {
          afterCard._inspectSvgPoint(d.x, d.y);
        }
        await new Promise(function (r) { setTimeout(r, 60); });
      }
    }
  };
})();