/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroPhotoParser from './parsers/hero-photo.js';
import heroDisplayParser from './parsers/hero-display.js';
import heroVideoParser from './parsers/hero-video.js';
import carouselAngledParser from './parsers/carousel-angled.js';
import carouselFeatureParser from './parsers/carousel-feature.js';
import columnsStatsParser from './parsers/columns-stats.js';
import columnsAvatarsParser from './parsers/columns-avatars.js';
import tabsPillsParser from './parsers/tabs-pills.js';
import cardsFeatureParser from './parsers/cards-feature.js';
import cardsEntryParser from './parsers/cards-entry.js';
import accordionFaqParser from './parsers/accordion-faq.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/squarespace-cleanup.js';
import sectionsTransformer from './transformers/squarespace-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero-photo': heroPhotoParser,
  'hero-display': heroDisplayParser,
  'hero-video': heroVideoParser,
  'carousel-angled': carouselAngledParser,
  'carousel-feature': carouselFeatureParser,
  'columns-stats': columnsStatsParser,
  'columns-avatars': columnsAvatarsParser,
  'tabs-pills': tabsPillsParser,
  'cards-feature': cardsFeatureParser,
  'cards-entry': cardsEntryParser,
  'accordion-faq': accordionFaqParser,
};

// PAGE TEMPLATE CONFIGURATION - Embedded from page-templates.json
const PAGE_TEMPLATE = {
  name: 'home',
  description: 'Squarespace marketing homepage',
  urls: [
    'https://www.squarespace.com/',
  ],
  blocks: [
    {
      name: 'hero-photo',
      instances: ['#homepage-hero .homepage-hero__background', '#homepage-hero .hero-text__static'],
    },
    {
      name: 'carousel-angled',
      instances: ['#homepage-hero .angled-carousel'],
    },
    {
      name: 'columns-stats',
      instances: ['#homepage-hero .stats', '#homepage-hero .homepage-hero__stats'],
    },
    {
      name: 'tabs-pills',
      instances: ['#grow-your-business .pills-container', '#grow-your-business .pills'],
    },
    {
      name: 'carousel-feature',
      instances: ['#grow-your-business .king-carousel'],
    },
    {
      name: 'cards-feature',
      instances: ['#one-platform .card-carousel'],
    },
    {
      name: 'cards-entry',
      instances: ['#get-started .templates__template-carousel', '#get-started .templates__mobile-carousel-wrapper'],
    },
    {
      name: 'columns-avatars',
      instances: ['#customers-served .faces'],
    },
    {
      name: 'hero-display',
      instances: ['#made-with-sqsp .made-with-sqsp__intersection-ref', '#made-with-sqsp'],
    },
    {
      name: 'accordion-faq',
      instances: ['#homepage-how-to .accordion-headline', '#homepage-faq .accordion-headline', '#homepage-support .accordion-headline'],
    },
    {
      name: 'hero-video',
      instances: ['.conversion.conversion--centered', '.conversion'],
    },
  ],
  sections: [
    { id: 'homepage-hero', name: 'hero', selector: ['#homepage-hero'], style: 'dark', blocks: ['hero-photo', 'carousel-angled', 'columns-stats'], defaultContent: [] },
    { id: 'grow-your-business', name: 'grow-your-business', selector: ['#grow-your-business'], style: 'light', blocks: ['tabs-pills', 'carousel-feature'], defaultContent: ['#grow-your-business h2', '#grow-your-business p'] },
    { id: 'one-platform', name: 'one-platform', selector: ['#one-platform'], style: 'light', blocks: ['cards-feature'], defaultContent: ['#one-platform h2', '#one-platform p'] },
    { id: 'get-started', name: 'get-started', selector: ['#get-started'], style: 'dark', blocks: ['cards-entry'], defaultContent: ['#get-started h2', '#get-started p'] },
    { id: 'your-domain', name: 'your-domain', selector: ['#your-domain'], style: 'dark', blocks: [], defaultContent: ['#your-domain h2', '#your-domain p', '#your-domain a'] },
    { id: 'customers-served', name: 'customers-served', selector: ['#customers-served'], style: 'dark', blocks: ['columns-avatars'], defaultContent: ['#customers-served h2'] },
    { id: 'made-with-sqsp', name: 'made-with-squarespace', selector: ['#made-with-sqsp'], style: 'dark', blocks: ['hero-display'], defaultContent: [] },
    { id: 'homepage-how-to', name: 'how-to', selector: ['#homepage-how-to'], style: 'light', blocks: ['accordion-faq'], defaultContent: [] },
    { id: 'homepage-faq', name: 'faq', selector: ['#homepage-faq'], style: 'light', blocks: ['accordion-faq'], defaultContent: [] },
    { id: 'homepage-support', name: 'support', selector: ['#homepage-support'], style: 'light', blocks: ['accordion-faq'], defaultContent: [] },
    { id: 'conversion', name: 'conversion', selector: ['.conversion', '#content > div'], style: 'dark', blocks: ['hero-video'], defaultContent: [] },
  ],
};

// TRANSFORMER REGISTRY - cleanup first, then sections (afterTransform inserts breaks/metadata)
const transformers = [
  cleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [sectionsTransformer] : []),
];

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };
  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];
  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });
  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

// EXPORT DEFAULT CONFIGURATION
export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;

    const main = document.body;

    // 1. beforeTransform (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block; skip elements already replaced by a prior parser
    pageBlocks.forEach((block) => {
      if (!block.element.parentNode) return;
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. afterTransform (final cleanup + section breaks/metadata)
    executeTransformers('afterTransform', main, payload);

    // 5. WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path; map root URL to /index
    const rawPath = new URL(params.originalURL).pathname
      .replace(/\/$/, '')
      .replace(/\.html?$/, '');
    const path = WebImporter.FileUtils.sanitizePath(rawPath === '' ? '/index' : rawPath);

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
