/* eslint-disable */
/* global WebImporter */
/**
 * Parser for carousel-angled. Base: carousel.
 * Source: https://www.squarespace.com/ (#homepage-hero .angled-carousel)
 * Library convention: 2 columns per row -> [image | optional title + description + CTA].
 *   Row 1 = block name (added by createBlock). Each subsequent row = one slide.
 * These slides are decorative image tiles with no caption text, so the second
 * cell is empty (padded) to keep a consistent 2-column table.
 * Generated: 2026-09-17
 */
export default function parse(element, { document }) {
  if (element.closest('table')) return;

  const root = element.closest('.angled-carousel') || element;

  const cards = Array.from(root.querySelectorAll(':scope > .angled-carousel__card'));

  const cells = [];
  cards.forEach((card) => {
    const image = card.querySelector('img');
    if (!image) return;
    cells.push([image, '']);
  });

  if (!cells.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, {
    name: 'carousel-angled',
    cells,
  });
  root.replaceWith(block);
}
