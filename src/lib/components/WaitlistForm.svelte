<script>
  import { validateContact } from '#lib/contact.js';
  import { submitWaitlist } from '#lib/waitlist.js';

  let {
    compact = false,
    cta = 'Request invite',
    submittingLabel = 'Joining…',
    source = 'marketing-waitlist',
    label = 'Email or phone number',
    placeholder = 'Email or phone number',
    hint = 'Enter an email or a phone number, whichever you prefer.',
    successTitle = "You're on the list.",
    successSub = "We'll reach out when a spot opens up."
  } = $props();

  // Stable unique id so multiple forms on one page don't collide (label/aria).
  const uid = $props.id();
  const fieldId = `contact-${uid}`;
  const errorId = `contact-error-${uid}`;

  let value = $state('');
  let error = $state('');
  let status = $state('idle'); // idle | submitting | success
  let noteStub = $state(false);

  /** @param {SubmitEvent} e */
  async function onSubmit(e) {
    e.preventDefault();
    error = '';
    const result = validateContact(value);
    if (!result.ok) {
      error = result.error ?? 'Please check what you entered.';
      return;
    }
    status = 'submitting';
    const res = await submitWaitlist({ kind: result.kind, value: result.value }, source);
    if (res.ok) {
      status = 'success';
      noteStub = res.stub;
    } else {
      status = 'idle';
      error = res.error ?? 'Something went wrong. Please try again.';
    }
  }
</script>

{#if status === 'success'}
  <div class="done" class:compact role="status" aria-live="polite">
    <span class="check" aria-hidden="true">✓</span>
    <div>
      <p class="done-title">{successTitle}</p>
      <p class="done-sub">
        {successSub}
        {#if noteStub}<span class="stub">(demo mode: nothing was sent)</span>{/if}
      </p>
    </div>
  </div>
{:else}
  <form class="form" class:compact onsubmit={onSubmit} novalidate>
    <div class="row">
      <label class="sr-only" for={fieldId}>{label}</label>
      <input
        id={fieldId}
        name="contact"
        class="input"
        class:invalid={!!error}
        type="text"
        inputmode="email"
        autocomplete="email"
        {placeholder}
        bind:value
        oninput={() => (error = '')}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        disabled={status === 'submitting'}
      />
      <button class="btn" type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? submittingLabel : cta}
      </button>
    </div>
    {#if error}
      <p class="error" id={errorId} role="alert">{error}</p>
    {:else}
      <p class="hint">{hint}</p>
    {/if}
  </form>
{/if}

<style>
  .form { width: 100%; }
  .row {
    display: flex;
    gap: var(--space-2);
    background: var(--white);
    padding: var(--space-2);
    border-radius: var(--radius-full);
    box-shadow: var(--shadow-md);
    border: 1px solid var(--neutral-100);
  }
  .input {
    flex: 1 1 auto;
    min-width: 0;
    border: 0;
    background: transparent;
    font: inherit;
    font-size: var(--text-base);
    color: var(--neutral-800);
    padding: var(--space-3) var(--space-5);
    border-radius: var(--radius-full);
  }
  .input::placeholder { color: var(--neutral-400); }
  .input:focus { outline: none; }
  .input.invalid { color: var(--danger-700); }
  .btn {
    flex: 0 0 auto;
    border: 0;
    cursor: pointer;
    font: inherit;
    font-weight: var(--weight-bold);
    color: var(--white);
    background: var(--accent-500);
    padding: var(--space-3) var(--space-6);
    border-radius: var(--radius-full);
    transition: background-color 0.15s ease, transform 0.15s ease;
    white-space: nowrap;
  }
  .btn:hover:not(:disabled) { background: var(--accent-600); }
  .btn:active:not(:disabled) { transform: translateY(1px); }
  .btn:disabled { opacity: 0.65; cursor: default; }

  .hint, .error {
    font-size: var(--text-sm);
    margin: var(--space-2) var(--space-4) 0;
  }
  .hint { color: var(--neutral-500); }
  .error { color: var(--danger-600); font-weight: var(--weight-medium); }

  .done {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    background: var(--white);
    padding: var(--space-5) var(--space-6);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-md);
    border: 1px solid var(--mint-200);
  }
  .check {
    display: grid;
    place-items: center;
    flex: 0 0 auto;
    width: 40px; height: 40px;
    border-radius: var(--radius-full);
    background: var(--mint-100);
    color: var(--mint-600);
    font-size: var(--text-xl);
    font-weight: var(--weight-bold);
  }
  .done-title { color: var(--neutral-800); font-weight: var(--weight-bold); }
  .done-sub { color: var(--neutral-500); font-size: var(--text-sm); }
  .stub { color: var(--neutral-400); }

  @media (max-width: 560px) {
    .row { flex-direction: column; border-radius: var(--radius-2xl); }
    .input { text-align: center; }
    .btn { width: 100%; }
  }
</style>
