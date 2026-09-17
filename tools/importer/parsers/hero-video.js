/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-video. Base: hero.
 * Source: https://www.squarespace.com/ (section#conversion.conversion--centered)
 * Library convention: 1 column. Row 1 = block name (added by createBlock).
 *   Row 2 = Background Image (optional). Row 3 = Title + Subheading + CTA.
 * Closing conversion banner over a full-bleed background video; the video
 * carries a poster image used here as the background asset.
 * Generated: 2026-09-17
 */
export default function parse(element, { document }) {
  if (element.closest('table')) return;

  const root = element.closest('.conversion, #conversion, section') || element;

  // Background asset: use the video poster image (static, importable).
  const bgImage =
    root.querySelector(
      '.conversion__centered-video-desktop img, .video-base__poster, img[class*="poster"]',
    ) || null;

  // Heading + subtext.
  const heading = root.querySelector('.conversion__title, h1, h2');
  const description = root.querySelector('.conversion__body, p.text--body-medium');

  // Primary CTA (the inline desktop CTA; ignore the duplicate sticky mobile CTAs).
  const cta =
    root.querySelector('a.conversion-component__cta') ||
    root.querySelector('a.cta:not(.mobile-cta__link)');

  if (!heading && !description) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];
  if (bgImage) cells.push([bgImage]);

  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (description) contentCell.push(description);
  if (cta) contentCell.push(cta);
  cells.push([contentCell]);

  const block = WebImporter.Blocks.createBlock(document, {
    name: 'hero-video',
    cells,
  });
  root.replaceWith(block);
}
