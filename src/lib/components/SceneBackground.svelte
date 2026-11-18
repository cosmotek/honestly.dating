<!--
  Illustrated backdrop: soft sun + drifting clouds + bright mint hills, fixed
  behind all content over the body's sky→mint gradient, parallaxing gently as
  the page scrolls. The daytime hills keep the hero and mid-page lively; the
  dark evening landscape appears only at the very bottom, behind the footer
  (see +layout.svelte), so the middle is never darkened.
  Decorative only (aria-hidden), non-interactive, freezes under reduced-motion.
-->
<script>
  let sceneEl = $state(/** @type {HTMLElement | null} */ (null));

  // Write scroll progress (0 at top → 1 at the bottom) to a CSS var that the
  // parallax + dusk layers read. Runs only in the browser.
  $effect(() => {
    if (!sceneEl) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      sceneEl?.style.setProperty('--p', p.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  });
</script>

<div class="scene" aria-hidden="true" bind:this={sceneEl}>
  <!-- Sky layer (sun + clouds) parallaxes gently with scroll -->
  <div class="sky">
    <!-- Soft sun with a gentle glow -->
    <div class="sun"></div>

    <!-- Drifting clouds, three different shapes. Negative delays pre-populate
         the sky at load. -->
    <div class="clouds">
      <svg class="cloud c1" viewBox="0 0 220 96"><use href="#cloud-a" /></svg>
      <svg class="cloud c2" viewBox="0 0 220 96"><use href="#cloud-b" /></svg>
      <svg class="cloud c3" viewBox="0 0 220 96"><use href="#cloud-c" /></svg>
      <svg class="cloud c4" viewBox="0 0 220 96"><use href="#cloud-b" /></svg>
      <svg class="cloud c5" viewBox="0 0 220 96"><use href="#cloud-a" /></svg>
      <svg class="cloud c6" viewBox="0 0 220 96"><use href="#cloud-c" /></svg>
      <svg class="cloud c7" viewBox="0 0 220 96"><use href="#cloud-b" /></svg>
    </div>
  </div>

  <!-- Bright daytime mint hills anchored to the bottom of every viewport, for
       the lighthearted green base through the hero and mid-page. (The dark
       evening landscape only appears at the very bottom, behind the footer.) -->
  <svg class="hills" viewBox="0 0 1440 320" preserveAspectRatio="xMidYMax slice">
    <path class="hill-back" d="M0 170 C 220 110 360 150 560 160 C 820 174 980 120 1200 140 C 1320 151 1390 168 1440 160 L1440 320 L0 320 Z" />
    <path class="hill-mid" d="M0 220 C 180 172 340 204 520 210 C 760 218 900 176 1120 198 C 1280 214 1380 226 1440 218 L1440 320 L0 320 Z" />
    <g>
      <path class="hill-front" d="M0 272 C 200 236 360 266 600 270 C 860 274 1020 248 1240 262 C 1340 269 1400 276 1440 272 L1440 320 L0 320 Z" />
      <g>
        <rect x="236" y="252" width="7" height="20" rx="3" class="trunk" />
        <circle cx="239.5" cy="246" r="14" class="leaf" />
      </g>
      <g>
        <rect x="1052" y="244" width="8" height="24" rx="3" class="trunk" />
        <circle cx="1056" cy="237" r="17" class="leaf" />
      </g>
    </g>
  </svg>

  <!-- Reusable cloud shapes: three distinct silhouettes built from puffs on a
       flat base, so the sky doesn't repeat the same cloud. -->
  <svg class="defs" width="0" height="0" aria-hidden="true">
    <defs>
      <!-- a: wide, tall-crowned -->
      <g id="cloud-a">
        <ellipse cx="112" cy="70" rx="100" ry="20" />
        <circle cx="58" cy="60" r="26" />
        <circle cx="104" cy="44" r="36" />
        <circle cx="152" cy="54" r="30" />
        <circle cx="190" cy="64" r="21" />
      </g>
      <!-- b: small and round -->
      <g id="cloud-b">
        <ellipse cx="92" cy="66" rx="74" ry="18" />
        <circle cx="60" cy="54" r="27" />
        <circle cx="100" cy="46" r="31" />
        <circle cx="134" cy="58" r="22" />
      </g>
      <!-- c: long and low, more puffs -->
      <g id="cloud-c">
        <ellipse cx="120" cy="72" rx="112" ry="16" />
        <circle cx="46" cy="64" r="20" />
        <circle cx="84" cy="56" r="27" />
        <circle cx="124" cy="50" r="31" />
        <circle cx="164" cy="58" r="24" />
        <circle cx="198" cy="66" r="17" />
      </g>
    </defs>
  </svg>
</div>

<style>
  .scene {
    position: fixed;
    inset: 0;
    z-index: -1;
    overflow: hidden;
    pointer-events: none;
  }

  /* Sky layer parallaxes up slightly as the page scrolls. */
  .sky {
    position: absolute;
    inset: 0;
    transform: translateY(calc(var(--p, 0) * -44px));
    will-change: transform;
  }

  /* --- Sun --- */
  .sun {
    position: absolute;
    top: clamp(-40px, 2vh, 48px);
    right: clamp(-30px, 8vw, 140px);
    width: clamp(140px, 22vw, 260px);
    aspect-ratio: 1;
    border-radius: var(--radius-full);
    background: radial-gradient(
      circle at 50% 50%,
      rgba(255, 255, 255, 0.95) 0%,
      rgba(255, 255, 255, 0.6) 38%,
      rgba(234, 254, 245, 0.25) 62%,
      rgba(234, 254, 245, 0) 72%
    );
    animation: sun-pulse 9s ease-in-out infinite;
  }

  /* --- Clouds --- */
  .clouds { position: absolute; inset: 0; }
  .cloud {
    position: absolute;
    height: auto;
    color: #ffffff;
    fill: currentColor;
    filter: drop-shadow(0 10px 18px rgba(52, 70, 75, 0.06));
    will-change: transform;
    animation-name: drift;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
  /* width + vertical band + speed + starting offset (negative delay) per cloud */
  .c1 { width: 240px; top: 7%;  opacity: 0.95; animation-duration: 90s;  animation-delay: -12s; }
  .c2 { width: 150px; top: 15%; opacity: 0.8;  animation-duration: 120s; animation-delay: -70s; }
  .c3 { width: 300px; top: 24%; opacity: 0.9;  animation-duration: 75s;  animation-delay: -40s; }
  .c4 { width: 120px; top: 33%; opacity: 0.7;  animation-duration: 140s; animation-delay: -100s; }
  .c5 { width: 200px; top: 42%; opacity: 0.6;  animation-duration: 105s; animation-delay: -25s; }
  .c6 { width: 170px; top: 11%; opacity: 0.7;  animation-duration: 112s; animation-delay: -56s; }
  .c7 { width: 130px; top: 37%; opacity: 0.55; animation-duration: 132s; animation-delay: -88s; }

  @keyframes drift {
    from { transform: translateX(-340px); }
    to   { transform: translateX(calc(100vw + 340px)); }
  }

  @keyframes sun-pulse {
    0%, 100% { transform: scale(1);    opacity: 0.95; }
    50%      { transform: scale(1.05); opacity: 1; }
  }

  /* --- Daytime mint hills (bright base for hero + mid-page) --- */
  .hills {
    position: absolute;
    left: 0; right: 0; bottom: -40px; /* extra below the fold so parallax never gaps */
    width: 100%;
    height: calc(clamp(160px, 28vh, 300px) + 40px);
    display: block;
    transform: translateY(calc(var(--p, 0) * 20px));
    /* Fade these out before the very bottom so they never peek behind the night
       landscape during fast scrolling / overscroll bounce (gone by ~96% down). */
    opacity: clamp(0, calc((0.96 - var(--p, 0)) / 0.14), 1);
    will-change: transform, opacity;
  }
  .hill-back  { fill: var(--mint-200); opacity: 0.7; }
  .hill-mid   { fill: var(--mint-300); opacity: 0.85; }
  .hill-front { fill: var(--mint-400); }
  .trunk { fill: var(--mint-700); }
  .leaf  { fill: var(--mint-600); }

  @media (max-width: 640px) {
    .c3 { width: 220px; }
    .c1 { width: 180px; }
  }

  /* Freeze all motion for users who prefer reduced motion. (The global reset
     also neutralizes durations; this keeps the scene pleasant and static.)
     Only the parallax translate is disabled. */
  @media (prefers-reduced-motion: reduce) {
    .cloud, .sun { animation: none; }
    .sky, .hills { transform: none; }
    .c1 { transform: translateX(6vw); }
    .c2 { transform: translateX(58vw); }
    .c3 { transform: translateX(30vw); }
    .c4 { transform: translateX(78vw); }
    .c5 { transform: translateX(44vw); }
    .c6 { transform: translateX(84vw); }
    .c7 { transform: translateX(18vw); }
  }
</style>
