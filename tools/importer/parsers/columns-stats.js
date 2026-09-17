/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-stats. Base: columns.
 * Source: https://www.squarespace.com/ (#homepage-hero .stats)
 * Library convention: first row = block name (added by createBlock); subsequent
 *   rows have N cells, one per column. Here one row of 3 columns, each cell
 *   holding a large number followed by a short label.
 * The animated odometer markup is skipped in favour of the static counter value.
 * Generated: 2026-09-17
 */
export default function parse(element, { document }) {
  if (element.closest('table')) return;

  const root = element.closest('.stats') || element;

  const statCards = Array.from(root.querySelectorAll(':scope > .stats__card'));

  const row = [];
  statCards.forEach((card) => {
    const cell = [];
    // Prefer the clean, localized static number over the animated odometer.
    const number =
      card.querySelector('.stats__card-localized-counter') ||
      card.querySelector('.stats__counter--static');
    const label = card.querySelector('.text--footnote, p:last-of-type');
    if (number) {
      const p = document.createElement('p');
      p.textContent = number.textContent.trim();
      cell.push(p);
    }
    if (label && label !== number) {
      const l = document.createElement('p');
      l.textContent = label.textContent.trim();
      cell.push(l);
    }
    row.push(cell.length ? cell : '');
  });

  if (!row.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [row];

  const block = WebImporter.Blocks.createBlock(document, {
    name: 'columns-stats',
    cells,
  });
  root.replaceWith(block);
}
