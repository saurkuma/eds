/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-display. Base: hero.
 * Source: https://www.squarespace.com/ (#made-with-sqsp)
 * Library convention: 1 column. Row 1 = block name (added by createBlock).
 *   Row 2 = Background Image (optional). Row 3 = Title + optional short subtext.
 * A large centered display headline over a full-bleed animated background.
 * Generated: 2026-09-17
 */
export default function parse(element, { document }) {
  if (element.closest('table')) return;

  const root = element.closest('#made-with-sqsp, section') || element;

  // Background/fallback image (the animated grid falls back to a static image).
  const bgImage =
    root.querySelector(
      '.made-with-sqsp__fallback-image, .made-with-sqsp__fallback img, img[class*="fallback"], img[class*="background"]',
    ) || null;

  // Display title. Visible title lives in .made-with-sqsp__title; there is also
  // an sr-only h2 with the same statement — prefer the visible one, fall back
  // to the accessible heading.
  const displayTitle =
    root.querySelector('.made-with-sqsp__title p, .made-with-sqsp__title') ||
    root.querySelector('h1, h2');

  if (!displayTitle && !bgImage) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];
  if (bgImage) cells.push([bgImage]);

  const contentCell = [];
  if (displayTitle) contentCell.push(displayTitle);
  cells.push([contentCell]);

  const block = WebImporter.Blocks.createBlock(document, {
    name: 'hero-display',
    cells,
  });
  // The matched instance (.made-with-sqsp__intersection-ref) is an empty marker
  // div that contains neither the title nor the image, so replacing it never
  // nests the parent. Anchor there and drop the now-emptied source wrappers.
  const anchor = root.querySelector('.made-with-sqsp__intersection-ref') || element;
  if (anchor.parentNode) anchor.replaceWith(block);
  else root.replaceWith(block);
  root
    .querySelectorAll(
      '.made-with-sqsp__fallback, .made-with-sqsp__title-container, .made-with-sqsp__accessible-list',
    )
    .forEach((n) => {
      if (n !== block && !block.contains(n)) n.remove();
    });
}
