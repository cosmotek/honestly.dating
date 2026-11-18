<script>
  let { question, open = false, children } = $props();
</script>

<details class="faq" {open}>
  <summary>
    <span>{question}</span>
    <span class="chev" aria-hidden="true">+</span>
  </summary>
  <div class="body">{@render children()}</div>
</details>

<style>
  .faq {
    background: var(--white);
    border: 1px solid var(--neutral-100);
    border-radius: var(--radius-xl);
    padding: var(--space-5) var(--space-6);
    box-shadow: var(--shadow-sm);
  }
  summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
    cursor: pointer;
    list-style: none;
    font-weight: var(--weight-semibold);
    color: var(--neutral-800);
    font-size: var(--text-lg);
  }
  summary::-webkit-details-marker { display: none; }
  .chev {
    flex: 0 0 auto;
    display: grid;
    place-items: center;
    width: 28px; height: 28px;
    border-radius: var(--radius-full);
    background: var(--primary-50);
    color: var(--accent-500);
    font-size: var(--text-xl);
    transition: transform 0.2s ease;
  }
  .faq[open] .chev { transform: rotate(45deg); }
  .body {
    margin-top: var(--space-3);
    color: var(--neutral-600);
  }
</style>
