// Partículas suaves: brasas en los bordes de la pantalla y sobre los botones del Hub.
(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const canvas = document.createElement("canvas");
  canvas.className = "particulas";
  canvas.setAttribute("aria-hidden", "true");
  document.body.prepend(canvas);
  const ctx = canvas.getContext("2d");

  let w = 0, h = 0;
  const ps = [];
  const rnd = (a, b) => a + Math.random() * (b - a);

  function medir() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener("resize", medir);
  medir();

  function nueva(x, y, sobreBoton) {
    ps.push({
      x, y,
      vx: rnd(-0.15, 0.15),
      vy: -rnd(sobreBoton ? 0.35 : 0.15, sobreBoton ? 0.8 : 0.45),
      r: rnd(0.8, 2.2),
      vida: 0,
      dura: rnd(180, 380),
      max: rnd(0.18, 0.4),
      fase: rnd(0, 6.28)
    });
  }

  function generar() {
    // Bordes de la pantalla
    const limite = Math.min(70, Math.round((w + h) / 28));
    if (ps.length < limite && Math.random() < 0.35) {
      const lado = Math.random(), g = rnd(0, 56);
      if (lado < 0.4) nueva(g, rnd(0, h));
      else if (lado < 0.8) nueva(w - g, rnd(0, h));
      else nueva(rnd(0, w), h - rnd(0, 20));
    }
    // Sobre los botones del Hub
    if (ps.length > 200) return;
    document.querySelectorAll(".hub-main, .hub-btn").forEach((b) => {
      if (Math.random() > 0.06) return;
      const r = b.getBoundingClientRect();
      if (r.bottom < 0 || r.top > h) return;
      nueva(rnd(r.left + 10, r.right - 10), r.top + rnd(0, 6), true);
    });
  }

  function paso() {
    ctx.clearRect(0, 0, w, h);
    generar();
    for (let i = ps.length - 1; i >= 0; i--) {
      const p = ps[i];
      p.vida++;
      p.x += p.vx + Math.sin(p.vida * 0.02 + p.fase) * 0.12;
      p.y += p.vy;
      const t = p.vida / p.dura;
      if (t >= 1 || p.y < -10) { ps.splice(i, 1); continue; }
      ctx.fillStyle = `rgba(255, 150, 60, ${(p.max * Math.sin(Math.PI * t)).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 6.283);
      ctx.fill();
    }
    requestAnimationFrame(paso);
  }
  requestAnimationFrame(paso);
})();
