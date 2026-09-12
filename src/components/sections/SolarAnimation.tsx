"use client";

import { useEffect, useRef } from "react";

export default function SolarAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0;
    let time = 0;
    const timeSpeed = 0.0006;

    function resize() {
      W = canvas!.width = canvas!.offsetWidth;
      H = canvas!.height = canvas!.offsetHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // Stars
    const stars = Array.from({ length: 100 }, () => ({
      x: Math.random(), y: Math.random() * 0.55,
      r: Math.random() * 1.3, twinkle: Math.random() * Math.PI * 2,
    }));

    // Clouds
    const clouds = Array.from({ length: 4 }, () => ({
      x: Math.random() * 1200, y: 50 + Math.random() * 60,
      speed: 0.15 + Math.random() * 0.25, size: 0.5 + Math.random() * 0.7,
      alpha: 0.2 + Math.random() * 0.35,
    }));

    // Dust
    const dust = Array.from({ length: 30 }, () => ({
      x: Math.random(), y: Math.random() * 0.5 + 0.1,
      vx: (Math.random() - 0.5) * 0.0003, vy: -Math.random() * 0.0002,
      r: Math.random() * 1.5, a: Math.random() * 0.4,
    }));

    let photons: any[] = [];
    let sparks: any[] = [];
    let wireParticles: any[] = [];
    let savedToday = 0, co2 = 0, savedDisplay = 0, co2Display = 0;

    function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
    function clamp(v: number, lo: number, hi: number) { return Math.max(lo, Math.min(hi, v)); }

    function skyColor(t: number): [number, number, number] {
      const stops: [number, [number, number, number]][] = [
        [0, [10, 14, 26]], [0.18, [255, 100, 50]], [0.28, [135, 206, 250]],
        [0.5, [70, 130, 220]], [0.72, [135, 206, 250]], [0.82, [255, 80, 40]], [1, [10, 14, 26]],
      ];
      for (let i = 0; i < stops.length - 1; i++) {
        const [t0, c0] = stops[i], [t1, c1] = stops[i + 1];
        if (t >= t0 && t <= t1) {
          const f = (t - t0) / (t1 - t0);
          return c0.map((v, j) => Math.round(lerp(v, c1[j], f))) as [number, number, number];
        }
      }
      return [10, 14, 26];
    }

    function sunPos(t: number) {
      const angle = (t * 2 - 0.5) * Math.PI;
      return { x: W * 0.5 + W * 0.46 * Math.cos(angle), y: H * 0.42 + H * 0.35 * Math.sin(angle) };
    }

    // Panels
    const groundY = 0.62;
    const getPanels = () => {
      const hx = W * 0.5, hy = H * groundY, hw = Math.min(220, W * 0.22), hh = Math.min(130, H * 0.17);
      const roofTop = { x: hx, y: hy - hh - 80 };
      const roofLeft = { x: hx - hw / 2 - 16, y: hy - hh };
      const angle = Math.atan2(roofTop.y - roofLeft.y, roofTop.x - roofLeft.x);
      return Array.from({ length: 4 }, (_, i) => {
        const f = 0.2 + i * 0.15;
        return { cx: lerp(roofLeft.x, roofTop.x, f), cy: lerp(roofLeft.y, roofTop.y, f), w: 42, h: 20, angle };
      });
    };

    let lastTs = 0;

    function frame(ts: number) {
      const dt = ts - lastTs; lastTs = ts;
      time += timeSpeed;
      if (time > 1) { time = 0; savedToday = 0; co2 = 0; }
      const t = time;
      ctx!.clearRect(0, 0, W, H);

      // SKY
      const [r, g, b] = skyColor(t);
      const sg = ctx!.createLinearGradient(0, 0, 0, H * 0.62);
      sg.addColorStop(0, `rgb(${r},${g},${b})`);
      sg.addColorStop(1, `rgb(${Math.round(r * 1.1)},${Math.round(g * 1.1)},${Math.round(b * 1.1)})`);
      ctx!.fillStyle = sg; ctx!.fillRect(0, 0, W, H * 0.62);

      // STARS
      const starAlpha = clamp(1 - Math.abs(t * 2 - 1) * 2, 0, 1) * 0.85;
      if (starAlpha > 0.01) stars.forEach(s => {
        const tw = 0.5 + 0.5 * Math.sin(s.twinkle + time * 3);
        ctx!.beginPath(); ctx!.arc(s.x * W, s.y * H, s.r * tw, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255,255,255,${starAlpha * tw})`; ctx!.fill();
      });

      // MOON
      const na = clamp(Math.abs(t * 2 - 1) * 2 - 0.5, 0, 1);
      if (na > 0.05) {
        const mx = W * 0.75, my = H * 0.18;
        const mg = ctx!.createRadialGradient(mx, my, 0, mx, my, 28);
        mg.addColorStop(0, `rgba(255,250,220,${na * 0.9})`);
        mg.addColorStop(1, "transparent");
        ctx!.beginPath(); ctx!.arc(mx, my, 28, 0, Math.PI * 2); ctx!.fillStyle = mg; ctx!.fill();
        ctx!.beginPath(); ctx!.arc(mx + 14, my - 5, 24, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${r},${g},${b},${na * 0.88})`; ctx!.fill();
      }

      // CLOUDS
      clouds.forEach(c => {
        c.x += c.speed; if (c.x > W + 200) c.x = -200;
        ctx!.save(); ctx!.globalAlpha = c.alpha; ctx!.fillStyle = "rgba(255,255,255,0.9)";
        [[0,0,45],[32,-12,35],[64,0,40],[96,-8,32],[46,18,27]].forEach(([dx, dy, rr]) => {
          ctx!.beginPath(); ctx!.arc(c.x + dx * c.size, c.y + dy * c.size, rr * c.size, 0, Math.PI * 2); ctx!.fill();
        }); ctx!.restore();
      });

      // SUN
      const sp = sunPos(t);
      const isDark = t < 0.2 || t > 0.8;
      const intensity = clamp((t > 0.2 && t < 0.8) ? Math.sin((t - 0.2) / 0.6 * Math.PI) : 0, 0, 1);

      if (sp.y < H * 0.62) {
        const sr2 = lerp(35, 60, intensity * 0.5 + 0.3);
        const glow = ctx!.createRadialGradient(sp.x, sp.y, 0, sp.x, sp.y, sr2 * 4);
        glow.addColorStop(0, `rgba(255,200,60,${0.05 + 0.2 * intensity})`);
        glow.addColorStop(1, "rgba(255,100,0,0)");
        ctx!.fillStyle = glow; ctx!.fillRect(0, 0, W, H);
        // Rays
        ctx!.save(); ctx!.translate(sp.x, sp.y); ctx!.rotate(time * 0.4);
        for (let i = 0; i < 12; i++) {
          const a = (i / 12) * Math.PI * 2;
          const len = sr2 * (1.5 + 0.3 * Math.sin(time * 2 + i));
          const rg = ctx!.createLinearGradient(sr2 * 0.9, 0, len, 0);
          rg.addColorStop(0, `rgba(255,220,60,${0.6 * intensity})`);
          rg.addColorStop(1, "rgba(255,220,60,0)");
          ctx!.save(); ctx!.rotate(a);
          ctx!.beginPath(); ctx!.moveTo(sr2 * 0.9, -3); ctx!.lineTo(len, 0); ctx!.lineTo(sr2 * 0.9, 3);
          ctx!.fillStyle = rg; ctx!.fill(); ctx!.restore();
        }
        ctx!.restore();
        // Sun body
        const sbg = ctx!.createRadialGradient(sp.x - sr2 * 0.2, sp.y - sr2 * 0.2, 0, sp.x, sp.y, sr2);
        sbg.addColorStop(0, "#fff7aa"); sbg.addColorStop(0.4, "#FFE033");
        sbg.addColorStop(0.8, "#FF9500"); sbg.addColorStop(1, "#FF5500");
        ctx!.beginPath(); ctx!.arc(sp.x, sp.y, sr2, 0, Math.PI * 2); ctx!.fillStyle = sbg; ctx!.fill();
        ctx!.beginPath(); ctx!.arc(sp.x - sr2 * 0.25, sp.y - sr2 * 0.25, sr2 * 0.3, 0, Math.PI * 2);
        ctx!.fillStyle = "rgba(255,255,255,0.15)"; ctx!.fill();
      }

      // DUST
      if (intensity > 0.1) dust.forEach(d => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0) d.x = 1; if (d.x > 1) d.x = 0; if (d.y < 0.05) d.y = 0.6;
        ctx!.beginPath(); ctx!.arc(d.x * W, d.y * H, d.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255,200,100,${d.a * intensity * 0.5})`; ctx!.fill();
      });

      // GROUND
      const hx = W * 0.5, hy = H * groundY, hw = Math.min(220, W * 0.22), hh = Math.min(130, H * 0.17);
      const gc = isDark ? "#0d1f0d" : "#2d7a2d";
      ctx!.beginPath(); ctx!.moveTo(0, H); ctx!.lineTo(0, H * groundY);
      for (let x = 0; x <= W; x += 20) ctx!.lineTo(x, H * groundY + Math.sin(x * 0.008) * 15);
      ctx!.lineTo(W, H); ctx!.closePath();
      const gg2 = ctx!.createLinearGradient(0, H * groundY, 0, H);
      gg2.addColorStop(0, gc); gg2.addColorStop(1, isDark ? "#0a1505" : "#1e4a14");
      ctx!.fillStyle = gg2; ctx!.fill();

      // HOUSE
      ctx!.save(); ctx!.shadowColor = "rgba(0,0,0,0.35)"; ctx!.shadowBlur = 24;
      ctx!.fillStyle = isDark ? "#1a1f2e" : "#e8e0d0";
      ctx!.fillRect(hx - hw / 2, hy - hh, hw, hh);
      // Windows
      [[hx - hw * 0.34, hy - hh + 30], [hx + hw * 0.12, hy - hh + 30]].forEach(([wx, wy]) => {
        ctx!.fillStyle = isDark ? `rgba(255,200,50,${0.3 + 0.2 * Math.sin(time * 2)})` : "rgba(180,220,255,0.8)";
        ctx!.fillRect(wx, wy, 36, 30); ctx!.strokeStyle = isDark ? "#222" : "#c0b090"; ctx!.lineWidth = 2; ctx!.strokeRect(wx, wy, 36, 30);
      });
      // Door
      ctx!.fillStyle = isDark ? "#0d1018" : "#8B4513"; ctx!.fillRect(hx - 18, hy - 50, 36, 50);
      // Roof
      ctx!.beginPath(); ctx!.moveTo(hx - hw / 2 - 16, hy - hh); ctx!.lineTo(hx, hy - hh - 80); ctx!.lineTo(hx + hw / 2 + 16, hy - hh); ctx!.closePath();
      const rg2 = ctx!.createLinearGradient(hx, hy - hh - 80, hx, hy - hh);
      rg2.addColorStop(0, isDark ? "#1a1020" : "#5a3020"); rg2.addColorStop(1, isDark ? "#100c15" : "#3a1e0a");
      ctx!.fillStyle = rg2; ctx!.fill(); ctx!.restore();

      // SOLAR PANELS
      const panels = getPanels();
      panels.forEach((p, i) => {
        ctx!.save(); ctx!.translate(p.cx, p.cy); ctx!.rotate(p.angle);
        const pg = ctx!.createLinearGradient(0, -p.h / 2, 0, p.h / 2);
        const g = intensity * (0.7 + 0.3 * Math.sin(time * 2 + i));
        pg.addColorStop(0, `rgba(0,${Math.round(80 + g * 100)},${Math.round(160 + g * 60)},0.95)`);
        pg.addColorStop(1, `rgba(0,${Math.round(40 + g * 60)},${Math.round(100 + g * 40)},0.95)`);
        ctx!.fillStyle = pg; ctx!.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx!.strokeStyle = "rgba(255,255,255,0.2)"; ctx!.lineWidth = 0.7; ctx!.strokeRect(-p.w / 2, -p.h / 2, p.w, p.h);
        for (let gi = 1; gi < 3; gi++) {
          ctx!.beginPath(); ctx!.moveTo(-p.w / 2 + p.w / 3 * gi, -p.h / 2); ctx!.lineTo(-p.w / 2 + p.w / 3 * gi, p.h / 2); ctx!.stroke();
        }
        ctx!.beginPath(); ctx!.moveTo(-p.w / 2, 0); ctx!.lineTo(p.w / 2, 0); ctx!.stroke();
        if (intensity > 0.15) {
          const shimX = ((time * 3 + i * 0.3) % 1) * p.w - p.w / 2;
          const sg2 = ctx!.createLinearGradient(shimX - 12, 0, shimX + 12, 0);
          sg2.addColorStop(0, "rgba(255,255,255,0)"); sg2.addColorStop(0.5, `rgba(255,255,255,${0.22 * intensity})`); sg2.addColorStop(1, "rgba(255,255,255,0)");
          ctx!.fillStyle = sg2; ctx!.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        }
        if (intensity > 0.2) {
          ctx!.shadowColor = `rgba(0,150,255,${0.4 * intensity})`; ctx!.shadowBlur = 14;
          ctx!.strokeStyle = `rgba(80,180,255,${0.45 * intensity})`; ctx!.lineWidth = 1.5; ctx!.strokeRect(-p.w / 2, -p.h / 2, p.w, p.h);
        }
        ctx!.restore();
      });

      // PHOTONS
      if (intensity > 0.1 && Math.random() < intensity * 0.5) {
        const tgt = panels[Math.floor(Math.random() * panels.length)];
        photons.push({ x: sp.x + (Math.random() - 0.5) * 140, y: sp.y + (Math.random() - 0.5) * 50, tx: tgt.cx, ty: tgt.cy, progress: 0, speed: 0.014 + Math.random() * 0.01, size: 2 + Math.random() * 2.5, color: `hsl(${40 + Math.random() * 20},100%,${65 + Math.random() * 25}%)`, trail: [] });
      }
      photons = photons.filter(p => {
        p.progress += p.speed;
        const cpx = (p.x + p.tx) * 0.5, cpy = Math.min(p.y, p.ty) - 70;
        const bx = (1 - p.progress) ** 2 * p.x + 2 * (1 - p.progress) * p.progress * cpx + p.progress ** 2 * p.tx;
        const by = (1 - p.progress) ** 2 * p.y + 2 * (1 - p.progress) * p.progress * cpy + p.progress ** 2 * p.ty;
        p.trail.push({ x: bx, y: by }); if (p.trail.length > 8) p.trail.shift();
        for (let i = 0; i < p.trail.length - 1; i++) {
          ctx!.beginPath(); ctx!.moveTo(p.trail[i].x, p.trail[i].y); ctx!.lineTo(p.trail[i + 1].x, p.trail[i + 1].y);
          ctx!.strokeStyle = `hsla(${p.color.slice(4,-1)},${i / p.trail.length * 0.7})`; ctx!.lineWidth = p.size * 0.45; ctx!.stroke();
        }
        const pg2 = ctx!.createRadialGradient(bx, by, 0, bx, by, p.size * 2);
        pg2.addColorStop(0, "rgba(255,255,255,0.95)"); pg2.addColorStop(0.4, p.color); pg2.addColorStop(1, "transparent");
        ctx!.beginPath(); ctx!.arc(bx, by, p.size, 0, Math.PI * 2); ctx!.fillStyle = pg2; ctx!.fill();
        if (p.progress >= 1) {
          for (let j = 0; j < 5; j++) {
            const a = Math.random() * Math.PI * 2;
            sparks.push({ x: p.tx, y: p.ty, vx: Math.cos(a) * (1 + Math.random() * 2), vy: Math.sin(a) * (1 + Math.random() * 2), life: 1, color: p.color, size: 1.5 });
          }
          return false;
        }
        return true;
      });

      // SPARKS
      sparks = sparks.filter(s => {
        s.x += s.vx; s.y += s.vy; s.vy += 0.08; s.life -= 0.07;
        if (s.life <= 0) return false;
        const sparkRadius = Math.max(0.1, s.size * s.life);
        ctx!.beginPath(); ctx!.arc(s.x, s.y, sparkRadius, 0, Math.PI * 2);
        ctx!.fillStyle = s.color; ctx!.globalAlpha = Math.max(0, s.life); ctx!.fill(); ctx!.globalAlpha = 1;
        return true;
      });

      // WIRE + METER
      const wirePts = [{ x: hx - 40, y: hy - hh + 8 }, { x: hx - 80, y: hy - hh + 4 }, { x: hx - 95, y: hy - hh + 28 }, { x: hx - 95, y: hy - 50 }, { x: hx - 60, y: hy - 50 }];
      ctx!.beginPath(); ctx!.moveTo(wirePts[0].x, wirePts[0].y);
      wirePts.slice(1).forEach(p2 => ctx!.lineTo(p2.x, p2.y));
      ctx!.strokeStyle = `rgba(60,180,255,${0.15 + intensity * 0.3})`; ctx!.lineWidth = 2; ctx!.setLineDash([5, 4]); ctx!.stroke(); ctx!.setLineDash([]);
      if (intensity > 0.1 && Math.random() < intensity * 0.35) wireParticles.push({ progress: 0, speed: 0.02 + Math.random() * 0.01 });
      wireParticles = wireParticles.filter((p2: any) => {
        p2.progress += p2.speed;
        const idx = p2.progress * (wirePts.length - 1);
        const i0 = Math.min(Math.floor(idx), wirePts.length - 2);
        const f = idx - i0;
        const px = lerp(wirePts[i0].x, wirePts[i0 + 1].x, f);
        const py2 = lerp(wirePts[i0].y, wirePts[i0 + 1].y, f);
        const wg2 = ctx!.createRadialGradient(px, py2, 0, px, py2, 8);
        wg2.addColorStop(0, "rgba(80,200,255,0.9)"); wg2.addColorStop(1, "transparent");
        ctx!.beginPath(); ctx!.arc(px, py2, 4, 0, Math.PI * 2); ctx!.fillStyle = wg2; ctx!.fill();
        return p2.progress < 1;
      });

      // STATS
      const kw = intensity * 6.6;
      savedToday += intensity * 0.00007 * dt;
      co2 += intensity * 0.00011 * dt;
      savedDisplay = lerp(savedDisplay, savedToday, 0.04);
      co2Display = lerp(co2Display, co2, 0.04);
      const kwEl = document.getElementById("kw-display");
      const savEl = document.getElementById("sav-display");
      const co2El = document.getElementById("co2-display");
      const tmpEl = document.getElementById("tmp-display");
      if (kwEl) kwEl.textContent = kw.toFixed(2);
      if (savEl) savEl.textContent = "$" + savedDisplay.toFixed(2);
      if (co2El) co2El.textContent = co2Display.toFixed(2) + " kg";
      if (tmpEl) tmpEl.textContent = Math.round(18 + intensity * 14) + "°C";

      animRef.current = requestAnimationFrame(frame);
    }

    animRef.current = requestAnimationFrame((ts) => { lastTs = ts; animRef.current = requestAnimationFrame(frame); });
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <section className="relative w-full overflow-hidden" style={{ height: "520px", background: "#0a0e1a" }}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {/* Overlay UI */}
      <div className="absolute inset-0 flex flex-col items-center justify-start pt-6 pointer-events-none">
        {/* Stats row */}
        <div className="flex gap-3 flex-wrap justify-center">
          {[
            { id: "kw-display", val: "0.00", unit: "kW", label: "Generating" },
            { id: "sav-display", val: "$0.00", unit: "saved", label: "Today" },
            { id: "co2-display", val: "0.00 kg", unit: "CO₂", label: "Offset" },
            { id: "tmp-display", val: "18°C", unit: "", label: "Panel Temp" },
          ].map((s) => (
            <div key={s.id} className="backdrop-blur-md border border-white/10 rounded-2xl px-5 py-3 text-center"
              style={{ background: "rgba(0,0,0,0.4)", minWidth: "100px" }}>
              <div id={s.id} className="text-xl font-black" style={{ color: "#FF660D" }}>{s.val}</div>
              {s.unit && <div className="text-xs text-gray-400">{s.unit}</div>}
              <div className="text-xs text-white/40 uppercase tracking-widest mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="absolute bottom-0 left-0 right-0 px-8 py-5 flex items-center justify-between"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)" }}>
        <div>
          <p className="text-white font-bold text-lg leading-tight">Save up to <span style={{ color: "#FF660D" }}>$20,000/year</span> with solar ⚡</p>
          <p className="text-white/40 text-xs">Victoria's New Energy Tech Approved Installer</p>
        </div>
        <a href="/get-a-free-quote/"
          className="pointer-events-auto px-7 py-3 rounded-full font-bold text-white text-sm transition-transform hover:-translate-y-1"
          style={{ background: "#FF660D", boxShadow: "0 4px 20px rgba(255,102,13,0.5)" }}>
          ☀️ Get a Free Quote →
        </a>
      </div>
    </section>
  );
}
