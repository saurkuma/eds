/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-photo. Base: hero.
 * Source: https://www.squarespace.com/ (#homepage-hero)
 * Library convention: 1 column. Row 1 = block name (added by createBlock).
 *   Row 2 = Background Image (optional). Row 3 = Title + Subheading + CTA (optional).
 * Generated: 2026-09-17
 */
export default function parse(element, { document }) {
  // Idempotency guard: instances[] carries a union of selectors (the background
  // container AND the inner text span). Once the hero has been converted, the
  // secondary selector still resolves to a node now living inside the generated
  // block table — skip it so we don't rebuild or nest.
  if (element.closest('table')) return;

  const root =
    element.closest('.homepage-hero, #homepage-hero, section') || element;

  // Background image: the dynamic background is video-driven with a poster image.
  const bgImage =
    root.querySelector(
      '.homepage-hero__background img, .dynamic-background img, img[class*="poster"], img[class*="background"]',
    ) || null;

  // Title / heading.
  const heading = root.querySelector('.hero-text, h1, h2');

  // Supporting subtext (ignore text belonging to the sibling stats/carousel blocks).
  const paragraphs = Array.from(
    root.querySelectorAll('.homepage-hero__text-container p, p.text--body'),
  );
  const description =
    paragraphs.find(
      (p) => !p.closest('.stats, .angled-carousel, .king-carousel'),
    ) || null;

  // Primary CTA.
  const cta = root.querySelector(
    'a.homepage-hero__cta, .homepage-hero__text-container a.cta, a[class*="hero__cta"]',
  );

  if (!heading && !bgImage) {
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
    name: 'hero-photo',
    cells,
  });

  // Insert the block at the hero's position and remove only the consumed hero
  // sub-containers. The parent section also holds the sibling carousel/stats
  // blocks, so we must never replace the whole section. Anchor at whichever
  // consumed container holds `element` so the block lands exactly where the
  // matched instance was (handles both the background and text-span selectors).
  const bgContainer = root.querySelector('.homepage-hero__background');
  const textContainer = root.querySelector('.homepage-hero__text-container');
  const anchor =
    element.closest('.homepage-hero__background, .homepage-hero__text-container') ||
    bgContainer ||
    textContainer ||
    element;
  if (anchor.parentNode) anchor.parentNode.insertBefore(block, anchor);
  else element.replaceWith(block);
  if (bgContainer && bgContainer !== block) bgContainer.remove();
  if (textContainer && textContainer !== block) textContainer.remove();
}
