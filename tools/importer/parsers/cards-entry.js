/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-entry. Base: cards.
 * Source: https://www.squarespace.com/ (#get-started .templates__template-carousel)
 * Library convention: 2 columns per row -> [image/icon | title + description + optional CTA].
 *   Row 1 = block name (added by createBlock). Each subsequent row = one card.
 * Each entry is an <a> thumbnail wrapping a background image and a template name;
 * the name becomes the card title and the link becomes the card CTA.
 * Generated: 2026-09-17
 */
export default function parse(element, { document }) {
  if (element.closest('table')) return;

  const root = element.closest('.templates__template-carousel') || element;

  const thumbs = Array.from(root.querySelectorAll('a.template-carousel__thumbnail'));

  const cells = [];
  const seen = new Set();
  thumbs.forEach((thumb) => {
    const image = thumb.querySelector('img');
    const nameEl = thumb.querySelector(
      '.template-carousel__thumbnail-name, .feature-tag',
    );
    const href = thumb.getAttribute('href');
    const name = (nameEl && nameEl.textContent.trim()) || '';

    // Dedupe cloned carousel slides by template name / href.
    const key = name || href || '';
    if (key && seen.has(key)) return;
    if (key) seen.add(key);

    const contentCell = [];
    if (name) {
      const title = document.createElement('p');
      title.textContent = name;
      contentCell.push(title);
    }
    if (href && name) {
      const cta = document.createElement('a');
      cta.setAttribute('href', href);
      cta.textContent = name;
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
    name: 'cards-entry',
    cells,
  });
  root.replaceWith(block);
}
