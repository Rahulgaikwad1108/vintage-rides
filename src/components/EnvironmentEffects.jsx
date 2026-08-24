import React, { useEffect, useRef } from 'react';

export default function EnvironmentEffects({ isLightOn = true, isDaytime = false, isRainMode = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let animationFrameId;

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const viewWidth = window.innerWidth;
    const viewHeight = window.innerHeight;

    // Dust particles setup (20 max)
    const dustCount = 20;
    const dustParticles = [];
    for (let i = 0; i < dustCount; i++) {
      dustParticles.push({
        x: Math.random() * viewWidth,
        y: Math.random() * viewHeight,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.35 + 0.1,
        speedX: (Math.random() - 0.5) * 0.15,
        speedY: -Math.random() * 0.2 - 0.05,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.015 + Math.random() * 0.015,
      });
    }

    // Rain drop streaks setup (35 max when rain mode enabled)
    const rainCount = 35;
    const rainDrops = [];
    for (let i = 0; i < rainCount; i++) {
      rainDrops.push({
        x: Math.random() * viewWidth,
        y: Math.random() * viewHeight,
        length: Math.random() * 25 + 15,
        speedY: Math.random() * 12 + 10,
        speedX: -Math.random() * 2 - 1, // Slight wind angle
        alpha: Math.random() * 0.4 + 0.15
      });
    }

    const render = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      // 1. Render Rain Streaks outside/across scene if Rain Mode is ON
      if (isRainMode) {
        ctx.lineWidth = 1.2;
        rainDrops.forEach((r) => {
          r.y += r.speedY;
          r.x += r.speedX;

          if (r.y > h) {
            r.y = -r.length;
            r.x = Math.random() * w;
          }
          if (r.x < 0) r.x = w;

          ctx.beginPath();
          ctx.moveTo(r.x, r.y);
          ctx.lineTo(r.x + r.speedX * 1.5, r.y + r.length);
          ctx.strokeStyle = `rgba(186, 230, 253, ${r.alpha})`;
          ctx.stroke();
        });
      }

      // 2. Light Beam Ray Shift
      if ((isLightOn || isDaytime) && !isRainMode) {
        const gradient = ctx.createLinearGradient(w * 0.5, 0, w * 0.5, h);
        const rayAlpha = isLightOn ? 0.03 : 0.015;
        gradient.addColorStop(0, `rgba(255, 190, 91, ${rayAlpha * 1.5})`);
        gradient.addColorStop(0.7, `rgba(217, 119, 6, ${rayAlpha * 0.5})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(w * 0.35, 0);
        ctx.lineTo(w * 0.65, 0);
        ctx.lineTo(w * 0.85, h);
        ctx.lineTo(w * 0.15, h);
        ctx.closePath();
        ctx.fill();
      }

      // 3. Render Floating Dust Particles
      dustParticles.forEach((p) => {
        p.wobble += p.wobbleSpeed;
        p.x += p.speedX + Math.sin(p.wobble) * 0.12;
        p.y += p.speedY;

        if (p.y < 0) {
          p.y = h;
          p.x = Math.random() * w;
        }
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        const currentAlpha = p.alpha * (isLightOn ? 1 : 0.4);
        ctx.fillStyle = `rgba(250, 235, 210, ${currentAlpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isLightOn, isDaytime, isRainMode]);

  return (
    <>
      <canvas ref={canvasRef} className="dust-canvas" />
      {isRainMode && <div className="rain-dark-overlay" />}
      {isRainMode && <div className="lightning-flash-anim" style={{ position: 'absolute', inset: 0, backgroundColor: '#38bdf8', pointerEvents: 'none', zIndex: 23 }} />}
      <div className="film-grain" />
      <div className="vignette-overlay" />
    </>
  );
}
