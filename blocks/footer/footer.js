/**
 * Fetch the footer fragment. Metadata-independent dual-fetch:
 * /content first (localhost / aem up), then root (DA/EDS production).
 */
async function fetchFooter() {
  let resp = await fetch('/content/footer.plain.html');
  if (!resp.ok) resp = await fetch('/footer.plain.html');
  if (!resp.ok) return null;
  const html = await resp.text();
  const container = document.createElement('div');
  container.innerHTML = html;
  return container;
}

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const fragment = await fetchFooter();
  block.textContent = '';
  if (!fragment) return;

  const main = fragment.querySelector('main') || fragment;
  const sections = [...main.children].filter((el) => el.tagName === 'DIV');

  const footer = document.createElement('div');
  footer.className = 'footer-content';

  // Brand block (first section)
  if (sections[0]) {
    sections[0].classList.add('footer-brand');
    footer.append(sections[0]);
  }

  // Link columns (middle sections that have an h2)
  const columns = document.createElement('div');
  columns.className = 'footer-columns';
  const middle = sections.slice(1, sections.length - 1);
  middle.forEach((col) => {
    col.classList.add('footer-column');
    columns.append(col);
  });
  footer.append(columns);

  // Bottom bar (last section: legal links + copyright)
  const bottom = sections[sections.length - 1];
  if (bottom) {
    bottom.classList.add('footer-bottom');
    footer.append(bottom);
  }

  block.append(footer);
}
