/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Squarespace section breaks + Section Metadata.
 * Template "home" defines 11 sections (all styled), so this inserts
 * an <hr> before every non-first section and a Section Metadata block
 * for every section with a style.
 *
 * Section selectors come from tools/importer/page-templates.json,
 * each verified against migration-work/cleaned.html (e.g. #homepage-hero,
 * #grow-your-business, ... , .conversion).
 *
 * Both hooks are used deliberately: block parsers run between the hooks
 * and replaceWith() the elements section selectors point at, so breaks are
 * inserted in beforeTransform (while every section element still exists)
 * with a temporary marker anchor, and metadata blocks are attached in
 * afterTransform relative to that surviving marker.
 */

const SECTION_MARKER_ATTR = 'data-excat-section-id';

// section.selector is an array of candidate selectors — try each in order, first match wins.
function querySection(root, selectors) {
  for (const sel of selectors) {
    const el = root.querySelector(sel);
    if (el) return el;
  }
  return null;
}

export default function transform(hookName, element, payload) {
  const sections = (payload.template && payload.template.sections) || [];

  if (hookName === 'beforeTransform') {
    // Insert breaks now, before parsers can replace any section element.
    // Walk backwards so unprocessed sections keep their original positions.
    for (let i = sections.length - 1; i >= 0; i -= 1) {
      const section = sections[i];
      if (i === 0 && !section.style) continue; // first section: no leading break needed
      const sectionEl = querySection(element, section.selector);
      if (!sectionEl) continue; // no selector matched — skip, never guess

      const hr = document.createElement('hr');
      if (section.style) hr.setAttribute(SECTION_MARKER_ATTR, section.id);
      sectionEl.before(hr);
    }
  }

  if (hookName === 'afterTransform') {
    // Parsers have run and may have replaced section elements. Anchor each
    // styled section's Section Metadata to whichever survives: the marker <hr>
    // placed above, or (first section) the original element itself.
    for (let i = sections.length - 1; i >= 0; i -= 1) {
      const section = sections[i];
      if (!section.style) continue;

      const marker = element.querySelector(`[${SECTION_MARKER_ATTR}="${section.id}"]`);
      const anchor = marker || querySection(element, section.selector);
      if (!anchor) continue; // neither survived — skip, never guess

      const metadataBlock = WebImporter.Blocks.createBlock(document, {
        name: 'Section Metadata',
        cells: { style: section.style },
      });
      anchor.after(metadataBlock);

      if (marker) {
        marker.removeAttribute(SECTION_MARKER_ATTR);
        if (i === 0) marker.remove(); // section 0 never gets a real leading break
      }
    }
  }
}
