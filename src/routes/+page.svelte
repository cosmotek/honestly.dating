<script>
  import WaitlistForm from '#lib/components/WaitlistForm.svelte';
  import FaqItem from '#lib/components/FaqItem.svelte';

  const pillars = [
    {
      emoji: '🫶',
      title: 'Non-profit. Not for sale.',
      body:
        'For-profit apps earn more the longer you stay single and subscribed. Honestly is a non-profit: no paywalls, no phoney boosts, no paid likes. Our only incentive is a real match, even when that means you leave for good.'
    },
    {
      emoji: '🔍',
      title: 'Radically transparent.',
      body:
        'No secret algorithm tuned to keep you swiping. We publish the real data, for accountability and study.'
    },
    {
      emoji: '🛡️',
      title: 'Community and safety first.',
      body:
        'Honestly is built to reward good actors. Your reputation comes from how you actually treat people, through honest feedback after real interactions, so it works the way it does in the real world. Show up well and it shows. Act badly and that follows you too.'
    }
  ];

  const steps = [
    { n: '01', title: 'Get an invite', body: 'Honestly is invite-only for now. Join the waitlist and we’ll bring you in carefully as room opens, so the community stays healthy.' },
    { n: '02', title: 'Verify, once', body: 'A quick phone verification keeps everyone real and safe. No bots, no duplicate profiles, nothing to buy your way around.' },
    { n: '03', title: 'Meet real people', body: 'Browse verified members and start a few genuine conversations. No pay-to-win, no feed engineered to keep you scrolling.' }
  ];

  // The kinds of data we commit to publishing (not the figures themselves).
  const shareTypes = [
    { emoji: '📈', title: 'Dating metrics', body: 'Matches, first and second dates, ghosting, and more.' },
    { emoji: '🌱', title: 'Growth', body: 'How many people are here and how fast it’s growing.' },
    { emoji: '💸', title: 'Financial numbers', body: 'Where the money comes from and where it goes.' },
    { emoji: '⚙️', title: 'Algorithm design', body: 'How matching and ranking actually work.' }
  ];
</script>

<svelte:head>
  <title>Honestly · just dating</title>
  <meta
    name="description"
    content="Honestly is a non-profit, transparent, community- and safety-first dating app. The alternative to for-profit apps that profit when you stay single. Invite-only. Join the waitlist with your email or phone number."
  />
  <meta property="og:title" content="Honestly · just dating" />
  <meta
    property="og:description"
    content="A non-profit dating app built for people, not profit. Radically transparent, community- and safety-first. Request an invite."
  />
  <meta property="og:type" content="website" />
</svelte:head>

<span id="top"></span>

<!-- HERO -->
<section class="hero">
  <div class="container hero-inner">
    <h1>Honestly just dating.</h1>
    <p class="lede">
      Honestly is a grassroots dating app built for people, not profit. In a time when connection is
      complicated, we need a radical shift towards transparency, safety and community-involvement in
      online dating... and unlike those other apps, Honestly isn’t incentivized to keep you single.
    </p>

    <div id="waitlist" class="waitlist-wrap">
      <WaitlistForm />
    </div>
    <p class="micro">No spam. One note when your invite is ready.</p>
  </div>
</section>

<!-- PILLARS -->
<section id="how" class="section">
  <div class="container">
    <header class="section-head">
      <span class="eyebrow">Why Honestly</span>
      <h2>Dating apps profit when you stay single. We don’t.</h2>
    </header>
    <div class="cards">
      {#each pillars as p}
        <article class="card">
          <div class="card-emoji" aria-hidden="true">{p.emoji}</div>
          <h3>{p.title}</h3>
          <p>{p.body}</p>
        </article>
      {/each}
    </div>
  </div>
</section>

<!-- SIGNAL, NOT NOISE -->
<section class="section">
  <div class="container">
    <header class="section-head">
      <span class="eyebrow">Signal, not noise</span>
      <h2>Less noise. The matches you actually want.</h2>
      <p>
        Dating shouldn’t feel like a second inbox. Honestly is built to cut the overload and point you
        toward the connections that matter, while making sure the right people actually notice you.
      </p>
    </header>
    <div class="duo">
      <article class="card">
        <div class="card-emoji" aria-hidden="true">🎯</div>
        <h3>No overload</h3>
        <p>
          We strip out the endless swiping and noise, so you can focus on the matches you really want
          instead of an inbox you dread.
        </p>
      </article>
      <article class="card">
        <div class="card-emoji" aria-hidden="true">✨</div>
        <h3>Get noticed</h3>
        <p>
          We make sure you’re seen by the people you deserve to meet, so the right matches find their
          way to you too.
        </p>
      </article>
    </div>
  </div>
</section>

<!-- DATING SHOULDN'T STAY ONLINE -->
<section class="section">
  <div class="container">
    <header class="section-head">
      <span class="eyebrow">Beyond the app</span>
      <h2>Dating shouldn’t stay online.</h2>
      <p>
        The best connections happen with a little help and a lot of real life. Honestly brings your
        friends into the process and gets the community together off-screen.
      </p>
    </header>
    <div class="duo">
      <article class="card">
        <div class="card-emoji" aria-hidden="true">👯</div>
        <h3>Friends can help</h3>
        <p>
          Your friends know you best. Built-in matchmaking lets them suggest people, make intros, and
          vouch for you, right inside the app.
        </p>
      </article>
      <article class="card">
        <div class="card-emoji" aria-hidden="true">🎉</div>
        <h3>Meet in real life</h3>
        <p>
          We bring the community together with real, in-person events, so you can skip the small talk
          and actually be in the same room.
        </p>
      </article>
    </div>
  </div>
</section>

<!-- SMART MATCHING + FEEDBACK -->
<section class="section">
  <div class="container">
    <header class="section-head">
      <span class="eyebrow">Built in</span>
      <h2>Smart matching, honest feedback.</h2>
      <p>
        Under the hood, Honestly works to put you with the right people and keep the community safe,
        with matching that understands you and feedback that keeps everyone honest.
      </p>
    </header>
    <div class="duo">
      <article class="card">
        <div class="card-emoji" aria-hidden="true">🧭</div>
        <h3>Smart matching</h3>
        <p>
          We match you on your core goals and needs, not just a photo, so you meet people who actually
          want the same things you do.
        </p>
      </article>
      <article class="card">
        <div class="card-emoji" aria-hidden="true">💬</div>
        <h3>Honest feedback</h3>
        <p>
          Feedback after real interactions helps protect everyone from bad actors, and gives people a
          real chance to learn from their mistakes.
        </p>
      </article>
    </div>
  </div>
</section>

<!-- HOW IT WORKS -->
<section class="section">
  <div class="container">
    <header class="section-head">
      <span class="eyebrow">How it works</span>
      <h2>From invite to first conversation.</h2>
    </header>
    <ol class="steps">
      {#each steps as s}
        <li class="step">
          <span class="step-n">{s.n}</span>
          <h3>{s.title}</h3>
          <p>{s.body}</p>
        </li>
      {/each}
    </ol>
  </div>
</section>

<!-- TRANSPARENCY -->
<section id="transparency" class="section">
  <div class="container">
    <div class="transparency">
      <div class="transparency-copy">
        <span class="eyebrow">Radical transparency</span>
        <h2>We publish what other apps hide.</h2>
        <p>
          We open up the data for-profit apps keep to themselves, with clear definitions and no
          editorial control. If the dating is going badly, you’ll be the first to know. That’s the
          whole point of the name. Here’s the kind of thing we share:
        </p>
      </div>
      <div class="share-grid">
        {#each shareTypes as s}
          <div class="share">
            <span class="share-emoji" aria-hidden="true">{s.emoji}</span>
            <span class="share-title">{s.title}</span>
            <span class="share-desc">{s.body}</span>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<!-- FAQ -->
<section id="faq" class="section">
  <div class="container narrow">
    <header class="section-head">
      <span class="eyebrow">Questions</span>
      <h2>Good to know.</h2>
    </header>
    <div class="faqs">
      <FaqItem question="Is Honestly really non-profit?" open>
        Yes. Honestly is run as a non-profit. We don’t sell ads, boosts, or your data, and there’s
        nothing to pay your way past other people. Our incentive is a genuine match, not keeping you
        subscribed and swiping.
      </FaqItem>
      <FaqItem question="How is this different from the big dating apps?">
        They’re for-profit, so they earn more the longer you stay single, and the product gets tuned
        for engagement. We publish our real outcomes, run with the community, put safety first, and
        measure ourselves on whether you actually find someone.
      </FaqItem>
      <FaqItem question="Why is it invite-only?">
        We’re growing carefully so the community stays healthy, real, and safe. The waitlist is how you
        get in. We send invites in batches as room opens up.
      </FaqItem>
      <FaqItem question="Do I give you my email or my phone number?">
        Either one. Use whichever you prefer in the box above. We just need one way to reach you
        when your invite is ready, and you can add the other later in the app.
      </FaqItem>
    </div>
  </div>
</section>

<!-- GET INVOLVED -->
<section class="section">
  <div class="container">
    <div class="cta">
      <h2>Join the project</h2>
      <p>Honestly is a non-profit made by volunteers, and there’s plenty to do. Whatever you’re good at, if you want to lend a hand, leave your email or phone and we’ll reach out.</p>
      <div class="cta-form">
        <WaitlistForm
          cta="Get involved"
          submittingLabel="Sending…"
          source="volunteer"
          label="Your email or phone number"
          hint="Tell us you’d like to volunteer and we’ll follow up."
          successTitle="Thanks for raising your hand."
          successSub="We’ll be in touch about how you can help."
        />
      </div>
    </div>
  </div>
</section>

<style>
  /* HERO */
  .hero { padding: var(--space-20) 0 var(--space-12); }
  .hero-inner { text-align: center; max-width: 760px; }
  .hero h1 {
    font-size: clamp(2.25rem, 7vw, var(--text-6xl));
    margin-bottom: var(--space-5);
    white-space: nowrap; /* keep "Honestly just dating." on one line by default */
  }

  /* Narrow screens: let it wrap rather than overflow. */
  @media (max-width: 520px) {
    .hero h1 { white-space: normal; }
  }
  .lede {
    font-size: var(--text-xl);
    color: var(--neutral-600);
    max-width: 620px;
    margin: 0 auto var(--space-8);
  }
  .waitlist-wrap { max-width: 540px; margin: 0 auto; }
  .micro { color: var(--neutral-400); font-size: var(--text-sm); margin-top: var(--space-4); }

  /* SECTIONS */
  .section { padding: var(--space-16) 0 0; }
  .container.narrow { max-width: 760px; }
  .section-head { text-align: center; max-width: 640px; margin: 0 auto var(--space-10); }
  .eyebrow {
    display: inline-block;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-size: var(--text-xs);
    font-weight: var(--weight-bold);
    color: var(--accent-500);
    margin-bottom: var(--space-3);
  }
  .section-head h2 { font-size: clamp(1.75rem, 4.5vw, var(--text-4xl)); }
  .section-head p { color: var(--neutral-600); font-size: var(--text-lg); margin-top: var(--space-4); }

  /* Two-up feature cards (signal, not noise) */
  .duo {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-5);
    max-width: 880px;
    margin: 0 auto;
  }
  @media (max-width: 720px) { .duo { grid-template-columns: 1fr; } }

  /* CARDS */
  .cards {
    display: grid;
    gap: var(--space-5);
    grid-template-columns: repeat(3, 1fr);
  }
  .card {
    background: var(--white);
    border-radius: var(--radius-2xl);
    padding: var(--space-8);
    box-shadow: var(--shadow-md);
    border: 1px solid var(--neutral-100);
  }
  .card-emoji {
    font-size: var(--text-3xl);
    width: 64px; height: 64px;
    display: grid; place-items: center;
    background: var(--primary-50);
    border-radius: var(--radius-xl);
    margin-bottom: var(--space-5);
  }
  .card h3 { font-size: var(--text-xl); margin-bottom: var(--space-3); }
  .card p { color: var(--neutral-600); }
  @media (max-width: 860px) { .cards { grid-template-columns: 1fr; } }

  /* STEPS */
  .steps {
    display: grid;
    gap: var(--space-5);
    grid-template-columns: repeat(3, 1fr);
    list-style: none;
    padding: 0; margin: 0;
    counter-reset: step;
  }
  .step {
    background: color-mix(in srgb, var(--white) 55%, transparent);
    border: 1px solid var(--white);
    border-radius: var(--radius-2xl);
    padding: var(--space-8);
  }
  .step-n {
    display: inline-block;
    font-size: var(--text-2xl);
    font-weight: var(--weight-extrabold);
    color: var(--accent-400);
    letter-spacing: -0.03em;
    margin-bottom: var(--space-4);
  }
  .step h3 { font-size: var(--text-lg); margin-bottom: var(--space-2); }
  .step p { color: var(--neutral-600); }
  @media (max-width: 860px) { .steps { grid-template-columns: 1fr; } }

  /* TRANSPARENCY */
  .transparency {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-12);
    align-items: center;
    background: var(--white);
    border-radius: var(--radius-2xl);
    padding: var(--space-12);
    box-shadow: var(--shadow-lg);
    border: 1px solid var(--neutral-100);
  }
  .transparency-copy h2 { font-size: clamp(1.6rem, 4vw, var(--text-3xl)); margin: var(--space-1) 0 var(--space-4); }
  .transparency-copy p { color: var(--neutral-600); }
  .share-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4); }
  .share {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    background: var(--mint-50);
    border: 1px solid var(--mint-200);
    border-radius: var(--radius-xl);
    padding: var(--space-5);
  }
  .share-emoji {
    font-size: var(--text-2xl);
    margin-bottom: var(--space-1);
  }
  .share-title {
    font-weight: var(--weight-bold);
    color: var(--neutral-800);
    font-size: var(--text-lg);
    letter-spacing: -0.01em;
  }
  .share-desc { color: var(--neutral-500); font-size: var(--text-sm); }
  @media (max-width: 420px) {
    .share-grid { grid-template-columns: 1fr; }
  }
  @media (max-width: 860px) {
    .transparency { grid-template-columns: 1fr; gap: var(--space-8); padding: var(--space-8); }
  }

  /* FAQ */
  .faqs { display: grid; gap: var(--space-4); }

  /* CLOSING CTA */
  .cta {
    text-align: center;
    background: linear-gradient(135deg, var(--accent-500), var(--accent-700));
    border-radius: var(--radius-2xl);
    padding: var(--space-16) var(--space-8);
    box-shadow: var(--shadow-xl);
  }
  .cta h2 { color: var(--white); font-size: clamp(1.75rem, 4.5vw, var(--text-4xl)); }
  .cta p { color: var(--accent-100); margin: var(--space-3) 0 var(--space-8); font-size: var(--text-lg); }
  .cta-form { max-width: 520px; margin: 0 auto; }
  /* Lift the form's hint/error off the dark periwinkle so they stay legible. */
  .cta-form :global(.hint) { color: var(--white); }
  .cta-form :global(.error) { color: var(--danger-200); }
</style>
