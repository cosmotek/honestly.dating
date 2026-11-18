<script>
  import '../app.css';
  import SceneBackground from '#lib/components/SceneBackground.svelte';
  let { children } = $props();
  const year = new Date().getFullYear();

  // Playful easter egg: clicking the brand puffs out a few floating hearts.
  /** @typedef {{ id: number, x: number, dx: number, rot: number, dur: number, delay: number, size: number, color: string }} Heart */
  const HEART_COLORS = ['#6c84da', '#5fb6dd', '#ff6b8a', '#8a9ee6'];
  let hearts = $state(/** @type {Heart[]} */ ([]));
  let heartId = 0;

  /** @param {MouseEvent} e */
  function puffHearts(e) {
    // Scroll to the very top ourselves. The default `#top` jump lands below the
    // header and would scroll the logo (and these hearts) off-screen.
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const count = 5 + Math.floor(Math.random() * 3);
    const batch = Array.from({ length: count }, () => ({
      id: heartId++,
      x: 6 + Math.random() * 30, // start offset from the logo (px)
      dx: (Math.random() * 2 - 1) * 42, // horizontal drift (px)
      rot: (Math.random() * 2 - 1) * 45, // rotation (deg)
      dur: 1100 + Math.random() * 700, // ms
      delay: Math.random() * 130, // ms
      size: 13 + Math.random() * 13, // px
      color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)]
    }));
    hearts = [...hearts, ...batch];
    const ids = new Set(batch.map((b) => b.id));
    setTimeout(() => {
      hearts = hearts.filter((h) => !ids.has(h.id));
    }, 2200);
  }
</script>

<SceneBackground />

<a class="skip" href="#main">Skip to content</a>

<header class="site-header">
  <div class="container">
    <a class="brand" href="#top" aria-label="Honestly home" onclick={puffHearts}>
      <span class="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 32 32" width="28" height="28">
          <path d="M16 25C10 21 7 17.75 7 14.25 7 11.5 9.15 9.5 11.75 9.5c1.7 0 3.25.9 4.25 2.3C17 10.4 18.55 9.5 20.25 9.5 22.85 9.5 25 11.5 25 14.25 25 17.75 22 21 16 25Z" fill="currentColor"/>
        </svg>
      </span>
      <span class="brand-name">Honestly</span>
      <span class="hearts" aria-hidden="true">
        {#each hearts as h (h.id)}
          <span
            class="heart"
            style="left:{h.x}px; width:{h.size}px; height:{h.size}px; color:{h.color}; --dx:{h.dx}px; --rot:{h.rot}deg; --dur:{h.dur}ms; --delay:{h.delay}ms"
          >
            <svg viewBox="0 0 24 24"><path d="M12 21C7 17.5 3.5 14.2 3.5 10.3 3.5 7.5 5.6 5.5 8.2 5.5c1.7 0 3.1.9 3.8 2.3C12.7 6.4 14.1 5.5 15.8 5.5 18.4 5.5 20.5 7.5 20.5 10.3 20.5 14.2 17 17.5 12 21Z" fill="currentColor"/></svg>
          </span>
        {/each}
      </span>
    </a>
  </div>
</header>

<main id="main">
  {@render children()}
</main>

<footer class="site-footer">
  <!-- Night landscape: the green hills after dark, rising behind the footer at
       the very bottom of the page so the daytime land turns to night there. -->
  <svg class="landscape" viewBox="0 0 1440 360" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
    <!-- back (lightest, furthest) -->
    <path class="hill-back" d="M0 150 C 220 92 360 132 560 142 C 820 156 980 104 1200 124 C 1320 135 1390 150 1440 142 L1440 360 L0 360 Z" />
    <!-- mid -->
    <path class="hill-mid" d="M0 214 C 180 166 340 198 520 204 C 760 212 900 170 1120 190 C 1280 206 1380 218 1440 210 L1440 360 L0 360 Z" />
    <!-- front (deepest, closest) -->
    <path class="hill-front" d="M0 276 C 200 236 360 268 600 272 C 860 276 1020 248 1240 264 C 1340 271 1400 278 1440 274 L1440 360 L0 360 Z" />
  </svg>

  <div class="container foot">
    <div class="foot-brand">
      <span class="foot-logo">
        <span class="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 32 32" width="28" height="28">
            <path d="M16 25C10 21 7 17.75 7 14.25 7 11.5 9.15 9.5 11.75 9.5c1.7 0 3.25.9 4.25 2.3C17 10.4 18.55 9.5 20.25 9.5 22.85 9.5 25 11.5 25 14.25 25 17.75 22 21 16 25Z" fill="currentColor"/>
          </svg>
        </span>
        <span class="brand-name">Honestly</span>
      </span>
      <p>Honestly just dating.</p>
    </div>
    <nav class="foot-links" aria-label="Footer">
      <a href="#how">How it works</a>
      <a href="#transparency">Transparency</a>
      <a href="#faq">FAQ</a>
      <a href="#waitlist">Request invite</a>
    </nav>
    <p class="copyright">© {year} Honestly, a non-profit. Invite-only while we grow carefully.</p>
  </div>
</footer>

<style>
  .skip {
    position: absolute;
    left: var(--space-4);
    top: calc(-1 * var(--space-16));
    z-index: 100;
    background: var(--white);
    color: var(--accent-600);
    padding: var(--space-3) var(--space-5);
    border-radius: var(--radius-full);
    box-shadow: var(--shadow-md);
    font-weight: var(--weight-semibold);
    transition: top 0.2s ease;
  }
  .skip:focus { top: var(--space-4); }

  /* Just the logo + name in the top-left — no bar, not sticky. */
  .site-header {
    padding-top: var(--space-6);
  }
  .brand {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    color: var(--neutral-800);
    text-decoration: none;
  }

  /* Floating-hearts easter egg (spawned on click, see puffHearts). */
  .hearts {
    position: absolute;
    left: 6px; top: 100%; /* anchor just below the logo so hearts rise up through it */
    width: 0; height: 0;
    pointer-events: none;
  }
  .heart {
    position: absolute;
    top: 0;
    opacity: 0;
    animation: heart-float var(--dur) linear var(--delay) forwards;
  }
  .heart svg {
    width: 100%;
    height: 100%;
    display: block;
    filter: drop-shadow(0 2px 3px rgba(52, 70, 75, 0.18));
  }
  @keyframes heart-float {
    0%   { opacity: 0; transform: translate(0, 8px) rotate(0) scale(0.5); }
    20%  { opacity: 1; transform: translate(calc(var(--dx) * 0.2), -4px) rotate(calc(var(--rot) * 0.25)) scale(1); }
    100% { opacity: 0; transform: translate(var(--dx), -58px) rotate(var(--rot)) scale(0.9); }
  }
  .brand-mark {
    display: grid;
    place-items: center;
    width: 36px; height: 36px;
    border-radius: var(--radius-full);
    background: var(--white);
    color: var(--accent-500);
    box-shadow: var(--shadow-sm);
  }
  .brand-name {
    font-weight: var(--weight-extrabold);
    letter-spacing: -0.03em;
    font-size: var(--text-xl);
    color: var(--neutral-800);
  }

  /* The footer sits on the night landscape that rises behind it. The large
     top padding leaves room for the dark hills to crest above the content,
     which keeps its light text on the dark land. */
  .site-footer {
    position: relative;
    margin-top: var(--space-20);
    padding: calc(var(--space-24) + var(--space-8)) 0 var(--space-12);
    overflow: hidden;
  }
  .landscape {
    position: absolute;
    left: 0; right: 0; bottom: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
  }
  /* Night landscape: the same green hills after dark, using the deep end of the
     mint scale, lighter in the distance and nearly black-green up close. */
  .landscape .hill-back  { fill: var(--mint-800); opacity: 0.95; }
  .landscape .hill-mid   { fill: var(--mint-900); }
  .landscape .hill-front { fill: var(--mint-950); }
  .foot {
    position: relative;
    z-index: 1;
    display: grid;
    gap: var(--space-6);
    align-items: start;
    grid-template-columns: 1fr auto;
  }
  .foot-logo {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
  }
  .foot-brand .brand-name { color: var(--white); }
  .foot-brand p { color: rgba(255, 255, 255, 0.72); font-size: var(--text-sm); margin-top: var(--space-2); }
  .foot-links { display: flex; flex-wrap: wrap; gap: var(--space-5); }
  .foot-links a { color: rgba(255, 255, 255, 0.82); font-size: var(--text-sm); }
  .foot-links a:hover { color: var(--white); }
  .copyright {
    grid-column: 1 / -1;
    color: rgba(255, 255, 255, 0.55);
    font-size: var(--text-sm);
    margin-top: var(--space-4);
  }
  @media (max-width: 560px) {
    .foot { grid-template-columns: 1fr; }
  }
</style>
