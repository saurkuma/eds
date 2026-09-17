/* eslint-disable */
/* global WebImporter */
/**
 * Parser for carousel-feature. Base: carousel.
 * Source: https://www.squarespace.com/ (#grow-your-business .king-carousel)
 * Library convention: 2 columns per row -> [image | title + description + CTA].
 *   Row 1 = block name (added by createBlock). Each subsequent row = one slide.
 * Each card is an <a> wrapping a background image plus heading, body, footnote,
 * and an arrow; the card link becomes the slide CTA.
 * Generated: 2026-09-17
 */
export default function parse(element, { document }) {
  if (element.closest('table')) return;

  const root = element.closest('.king-carousel') || element;

  const cards = Array.from(root.querySelectorAll('.king-carousel__card'));

  const cells = [];
  const seen = new Set();
  cards.forEach((card) => {
    const link = card.querySelector('a.king-carousel__card-cta, a');

    // The live carousel clones slides for infinite scroll; dedupe by CTA href
    // (falling back to title text) so each real slide appears exactly once.
    const key =
      (link && link.getAttribute('href')) ||
      (card.querySelector('.king-carousel__card-title, h2, h3, h4') || {})
        .textContent ||
      '';
    if (key && seen.has(key)) return;
    if (key) seen.add(key);

    const image = card.querySelector('img');
    const title = card.querySelector('.king-carousel__card-title, h2, h3, h4');
    const body = card.querySelector('.king-carousel__card-body');
    const footnote = card.querySelector('.king-carousel__card-footnote');

    const contentCell = [];
    if (title) contentCell.push(title);
    if (body) contentCell.push(body);
    if (footnote) contentCell.push(footnote);

    // Rebuild the card link as a clean text CTA (the source <a> wraps the whole
    // card, including the image, so we cannot reuse it directly as the CTA).
    if (link && link.getAttribute('href') && title) {
      const cta = document.createElement('a');
      cta.setAttribute('href', link.getAttribute('href'));
      cta.textContent = title.textContent.trim();
      contentCell.push(cta);
    }

    if (!image && !contentCell.length) return;
    cells.push([image || '', contentCell.length ? contentCell : '']);
  });

  if (!cells.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, {
    name: 'carousel-feature',
    cells,
  });
  root.replaceWith(block);
}
