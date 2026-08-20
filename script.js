// ===== VouchRestore — shared behavior =====

// Mobile nav toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  // Generic tab groups: any [data-tabs] wrapper with [data-tab] buttons
  // controlling sibling [data-panel] elements matching the button's data-tab value.
  document.querySelectorAll('[data-tabs]').forEach(group => {
    const buttons = group.querySelectorAll('[data-tab]');
    const panelWrap = document.querySelector(group.getAttribute('data-panels'));
    if (!panelWrap) return;
    const panels = panelWrap.querySelectorAll('[data-panel]');

    function activate(key) {
      buttons.forEach(b => b.classList.toggle('active', b.getAttribute('data-tab') === key));
      panels.forEach(p => p.classList.toggle('active', p.getAttribute('data-panel') === key));
    }

    buttons.forEach(b => b.addEventListener('click', () => {
      activate(b.getAttribute('data-tab'));
      if (group.hasAttribute('data-scroll-target')) {
        document.querySelector(group.getAttribute('data-scroll-target'))
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }));
  });

  // Copy-to-clipboard on command usage snippets
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-copy');
      navigator.clipboard?.writeText(text).then(() => {
        const original = btn.innerHTML;
        btn.classList.add('copied');
        setTimeout(() => btn.classList.remove('copied'), 1200);
      });
    });
  });
});
