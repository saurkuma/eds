// media query match that indicates desktop width
const isDesktop = window.matchMedia('(min-width: 900px)');

/**
 * Fetch the nav fragment. Metadata-independent dual-fetch:
 * /content first (localhost / aem up), then root (DA/EDS production).
 */
async function fetchNav() {
  let resp = await fetch('/content/nav.plain.html');
  if (!resp.ok) resp = await fetch('/nav.plain.html');
  if (!resp.ok) return null;
  const html = await resp.text();
  const container = document.createElement('div');
  container.innerHTML = html;
  return container;
}

function closeAllPanels(nav) {
  nav.querySelectorAll('.nav-drop[aria-expanded="true"]').forEach((d) => {
    d.setAttribute('aria-expanded', 'false');
  });
}

function toggleMenu(nav, expand) {
  const open = expand !== undefined ? expand : nav.getAttribute('aria-expanded') !== 'true';
  nav.setAttribute('aria-expanded', open ? 'true' : 'false');
  const button = nav.querySelector('.nav-hamburger button');
  if (button) button.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  document.body.style.overflowY = open && !isDesktop.matches ? 'hidden' : '';
  if (!open) closeAllPanels(nav);
}

export default async function decorate(block) {
  const fragment = await fetchNav();
  block.textContent = '';
  if (!fragment) return;

  const nav = document.createElement('nav');
  nav.id = 'nav';
  nav.setAttribute('aria-expanded', 'false');

  // The fragment's <main> holds the top-level sections:
  // [0] brand, [1..n-2] menu groups (Products/Solutions/Resources), [n-1] tools
  const main = fragment.querySelector('main') || fragment;
  const sections = [...main.children].filter((el) => el.tagName === 'DIV');

  // Brand (first section)
  const brand = document.createElement('div');
  brand.className = 'nav-brand';
  if (sections[0]) {
    const link = sections[0].querySelector('a');
    if (link) brand.append(link);
  }

  // Tools (last section) — Log In + Get Started
  const tools = document.createElement('div');
  tools.className = 'nav-tools';
  const toolsSection = sections[sections.length - 1];
  if (toolsSection) {
    toolsSection.querySelectorAll('a').forEach((a, idx, arr) => {
      // last tool link becomes the primary CTA button
      if (idx === arr.length - 1) a.classList.add('nav-cta');
      tools.append(a);
    });
  }

  // Menu groups (everything between brand and tools)
  const navSections = document.createElement('div');
  navSections.className = 'nav-sections';
  const groupList = document.createElement('ul');
  const menuGroups = sections.slice(1, sections.length - 1);
  menuGroups.forEach((group) => {
    const heading = group.querySelector('h2');
    if (!heading) return;
    const li = document.createElement('li');
    li.className = 'nav-drop';
    li.setAttribute('aria-expanded', 'false');

    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'nav-drop-trigger';
    trigger.textContent = heading.textContent;
    li.append(trigger);

    // Panel: move remaining content (h3 groups + ul lists) into a panel
    const panel = document.createElement('div');
    panel.className = 'nav-panel';
    const inner = document.createElement('div');
    inner.className = 'nav-panel-inner';
    [...group.children].forEach((child) => {
      if (child === heading) return;
      inner.append(child);
    });
    panel.append(inner);
    li.append(panel);

    // Desktop: hover opens; click toggles. Mobile: click toggles (accordion).
    trigger.addEventListener('click', () => {
      const expanded = li.getAttribute('aria-expanded') === 'true';
      closeAllPanels(nav);
      li.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    });
    li.addEventListener('mouseenter', () => {
      if (isDesktop.matches) {
        closeAllPanels(nav);
        li.setAttribute('aria-expanded', 'true');
      }
    });
    li.addEventListener('mouseleave', () => {
      if (isDesktop.matches) li.setAttribute('aria-expanded', 'false');
    });

    groupList.append(li);
  });
  navSections.append(groupList);

  // Hamburger (mobile)
  const hamburger = document.createElement('div');
  hamburger.className = 'nav-hamburger';
  hamburger.innerHTML = '<button type="button" aria-controls="nav" aria-label="Open navigation"><span class="nav-hamburger-icon"></span></button>';
  hamburger.addEventListener('click', () => toggleMenu(nav));

  nav.append(hamburger, brand, navSections, tools);

  // Close panels on outside click / escape
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) closeAllPanels(nav);
  });
  window.addEventListener('keydown', (e) => {
    if (e.code === 'Escape') {
      closeAllPanels(nav);
      if (!isDesktop.matches) toggleMenu(nav, false);
    }
  });

  // Reset state cleanly when crossing the desktop/mobile breakpoint
  isDesktop.addEventListener('change', () => {
    closeAllPanels(nav);
    toggleMenu(nav, false);
    const button = nav.querySelector('.nav-hamburger button');
    if (button) button.setAttribute('aria-label', 'Open navigation');
    document.body.style.overflowY = '';
  });

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);
}
