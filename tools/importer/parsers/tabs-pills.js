/* eslint-disable */
/* global WebImporter */
/**
 * Parser for tabs-pills. Base: tabs.
 * Source: https://www.squarespace.com/ (#grow-your-business .pills-container)
 * Library convention: 2 columns per row -> [tab label | tab content].
 *   Row 1 = block name (added by createBlock). Each subsequent row = one tab.
 * In the source, the pill row only holds the labels; the associated panels are
 * swapped in by JavaScript and are not co-located, so the content cell is empty
 * (padded) to preserve the 2-column structure.
 * Generated: 2026-09-17
 */
export default function parse(element, { document }) {
  if (element.closest('table')) return;

  const root = element.closest('.pills-container') || element;

  const pills = Array.from(root.querySelectorAll('.pills__pill'));

  const cells = [];
  pills.forEach((pill) => {
    const labelSource = pill.querySelector('p, span') || pill;
    const label = document.createElement('p');
    label.textContent = labelSource.textContent.trim();
    if (!label.textContent) return;
    cells.push([label, '']);
  });

  if (!cells.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, {
    name: 'tabs-pills',
    cells,
  });
  root.replaceWith(block);
}
