/* eslint-disable */
/* global WebImporter */
/**
 * Parser for accordion-faq. Base: accordion.
 * Source: https://www.squarespace.com/ (.accordion-headline in how-to / faq / support)
 * Library convention: 2 columns per row -> [title | content].
 *   Row 1 = block name (added by createBlock). Each subsequent row = one item.
 * Each item pairs a heading button with a revealed content section.
 * Generated: 2026-09-17
 */
export default function parse(element, { document }) {
  if (element.closest('table')) return;

  const root = element.closest('.accordion-headline') || element;

  const items = Array.from(root.querySelectorAll('.accordion-headline__item'));

  const cells = [];
  items.forEach((item) => {
    // Title lives in the toggle button; use the heading text (drop the +/- icon).
    const titleEl = item.querySelector(
      '.accordion-headline__title h2, .accordion-headline__title h3, h2, h3',
    );
    const title = document.createElement('p');
    title.textContent = (titleEl && titleEl.textContent.trim()) || '';

    // Body content revealed on expand.
    const content = item.querySelector(
      '.accordion-headline__content, .accordion-headline__content-wrapper',
    );

    if (!title.textContent && !content) return;
    cells.push([title, content || '']);
  });

  if (!cells.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, {
    name: 'accordion-faq',
    cells,
  });
  root.replaceWith(block);
}
