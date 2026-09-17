/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-avatars. Base: columns.
 * Source: https://www.squarespace.com/ (#customers-served .faces)
 * Library convention: first row = block name (added by createBlock); subsequent
 *   rows have N cells, one per column. Here one row whose columns each hold a
 *   single customer headshot image.
 * Generated: 2026-09-17
 */
export default function parse(element, { document }) {
  if (element.closest('table')) return;

  const root = element.closest('.faces') || element;

  const images = Array.from(root.querySelectorAll('img.faces__face, img'));

  const row = images.map((img) => img);

  if (!row.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [row];

  const block = WebImporter.Blocks.createBlock(document, {
    name: 'columns-avatars',
    cells,
  });
  root.replaceWith(block);
}
