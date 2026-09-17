/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-feature. Base: cards.
 * Source: https://www.squarespace.com/ (#one-platform .card-carousel)
 * Library convention: 2 columns per row -> [image/icon | title + description + optional CTA].
 *   Row 1 = block name (added by createBlock). Each subsequent row = one card.
 * Each card wraps an asset (image or video poster) plus a heading and body.
 * Generated: 2026-09-17
 */
export default function parse(element, { document }) {
  if (element.closest('table')) return;

  const root = element.closest('.card-carousel') || element;

  const cardEls = Array.from(root.querySelectorAll('.card-carousel-card'));

  const cells = [];
  const seen = new Set();
  cardEls.forEach((card) => {
    const image = card.querySelector(
      'img[class*="asset-image"], img[class*="poster"], img',
    );
    const title = card.querySelector('h2, h3, h4');
    const body = card.querySelector('.card-carousel-card__body');

    // Dedupe any cloned carousel slides by heading text.
    const key = (title && title.textContent.trim()) || '';
    if (key && seen.has(key)) return;
    if (key) seen.add(key);

    const contentCell = [];
    if (title) contentCell.push(title);
    if (body) contentCell.push(body);

    if (!image && !contentCell.length) return;
    cells.push([image || '', contentCell.length ? contentCell : '']);
  });

  if (!cells.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, {
    name: 'cards-feature',
    cells,
  });
  root.replaceWith(block);
}
