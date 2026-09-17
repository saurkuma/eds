/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-home.js
  var import_home_exports = {};
  __export(import_home_exports, {
    default: () => import_home_default
  });

  // tools/importer/parsers/hero-photo.js
  function parse(element, { document: document2 }) {
    if (element.closest("table")) return;
    const root = element.closest(".homepage-hero, #homepage-hero, section") || element;
    const bgImage = root.querySelector(
      '.homepage-hero__background img, .dynamic-background img, img[class*="poster"], img[class*="background"]'
    ) || null;
    const heading = root.querySelector(".hero-text, h1, h2");
    const paragraphs = Array.from(
      root.querySelectorAll(".homepage-hero__text-container p, p.text--body")
    );
    const description = paragraphs.find(
      (p) => !p.closest(".stats, .angled-carousel, .king-carousel")
    ) || null;
    const cta = root.querySelector(
      'a.homepage-hero__cta, .homepage-hero__text-container a.cta, a[class*="hero__cta"]'
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
    const block = WebImporter.Blocks.createBlock(document2, {
      name: "hero-photo",
      cells
    });
    const bgContainer = root.querySelector(".homepage-hero__background");
    const textContainer = root.querySelector(".homepage-hero__text-container");
    const anchor = element.closest(".homepage-hero__background, .homepage-hero__text-container") || bgContainer || textContainer || element;
    if (anchor.parentNode) anchor.parentNode.insertBefore(block, anchor);
    else element.replaceWith(block);
    if (bgContainer && bgContainer !== block) bgContainer.remove();
    if (textContainer && textContainer !== block) textContainer.remove();
  }

  // tools/importer/parsers/hero-display.js
  function parse2(element, { document: document2 }) {
    if (element.closest("table")) return;
    const root = element.closest("#made-with-sqsp, section") || element;
    const bgImage = root.querySelector(
      '.made-with-sqsp__fallback-image, .made-with-sqsp__fallback img, img[class*="fallback"], img[class*="background"]'
    ) || null;
    const displayTitle = root.querySelector(".made-with-sqsp__title p, .made-with-sqsp__title") || root.querySelector("h1, h2");
    if (!displayTitle && !bgImage) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [];
    if (bgImage) cells.push([bgImage]);
    const contentCell = [];
    if (displayTitle) contentCell.push(displayTitle);
    cells.push([contentCell]);
    const block = WebImporter.Blocks.createBlock(document2, {
      name: "hero-display",
      cells
    });
    const anchor = root.querySelector(".made-with-sqsp__intersection-ref") || element;
    if (anchor.parentNode) anchor.replaceWith(block);
    else root.replaceWith(block);
    root.querySelectorAll(
      ".made-with-sqsp__fallback, .made-with-sqsp__title-container, .made-with-sqsp__accessible-list"
    ).forEach((n) => {
      if (n !== block && !block.contains(n)) n.remove();
    });
  }

  // tools/importer/parsers/hero-video.js
  function parse3(element, { document: document2 }) {
    if (element.closest("table")) return;
    const root = element.closest(".conversion, #conversion, section") || element;
    const bgImage = root.querySelector(
      '.conversion__centered-video-desktop img, .video-base__poster, img[class*="poster"]'
    ) || null;
    const heading = root.querySelector(".conversion__title, h1, h2");
    const description = root.querySelector(".conversion__body, p.text--body-medium");
    const cta = root.querySelector("a.conversion-component__cta") || root.querySelector("a.cta:not(.mobile-cta__link)");
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
    const block = WebImporter.Blocks.createBlock(document2, {
      name: "hero-video",
      cells
    });
    root.replaceWith(block);
  }

  // tools/importer/parsers/carousel-angled.js
  function parse4(element, { document: document2 }) {
    if (element.closest("table")) return;
    const root = element.closest(".angled-carousel") || element;
    const cards = Array.from(root.querySelectorAll(":scope > .angled-carousel__card"));
    const cells = [];
    cards.forEach((card) => {
      const image = card.querySelector("img");
      if (!image) return;
      cells.push([image, ""]);
    });
    if (!cells.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document2, {
      name: "carousel-angled",
      cells
    });
    root.replaceWith(block);
  }

  // tools/importer/parsers/carousel-feature.js
  function parse5(element, { document: document2 }) {
    if (element.closest("table")) return;
    const root = element.closest(".king-carousel") || element;
    const cards = Array.from(root.querySelectorAll(".king-carousel__card"));
    const cells = [];
    const seen = /* @__PURE__ */ new Set();
    cards.forEach((card) => {
      const link = card.querySelector("a.king-carousel__card-cta, a");
      const key = link && link.getAttribute("href") || (card.querySelector(".king-carousel__card-title, h2, h3, h4") || {}).textContent || "";
      if (key && seen.has(key)) return;
      if (key) seen.add(key);
      const image = card.querySelector("img");
      const title = card.querySelector(".king-carousel__card-title, h2, h3, h4");
      const body = card.querySelector(".king-carousel__card-body");
      const footnote = card.querySelector(".king-carousel__card-footnote");
      const contentCell = [];
      if (title) contentCell.push(title);
      if (body) contentCell.push(body);
      if (footnote) contentCell.push(footnote);
      if (link && link.getAttribute("href") && title) {
        const cta = document2.createElement("a");
        cta.setAttribute("href", link.getAttribute("href"));
        cta.textContent = title.textContent.trim();
        contentCell.push(cta);
      }
      if (!image && !contentCell.length) return;
      cells.push([image || "", contentCell.length ? contentCell : ""]);
    });
    if (!cells.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document2, {
      name: "carousel-feature",
      cells
    });
    root.replaceWith(block);
  }

  // tools/importer/parsers/columns-stats.js
  function parse6(element, { document: document2 }) {
    if (element.closest("table")) return;
    const root = element.closest(".stats") || element;
    const statCards = Array.from(root.querySelectorAll(":scope > .stats__card"));
    const row = [];
    statCards.forEach((card) => {
      const cell = [];
      const number = card.querySelector(".stats__card-localized-counter") || card.querySelector(".stats__counter--static");
      const label = card.querySelector(".text--footnote, p:last-of-type");
      if (number) {
        const p = document2.createElement("p");
        p.textContent = number.textContent.trim();
        cell.push(p);
      }
      if (label && label !== number) {
        const l = document2.createElement("p");
        l.textContent = label.textContent.trim();
        cell.push(l);
      }
      row.push(cell.length ? cell : "");
    });
    if (!row.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [row];
    const block = WebImporter.Blocks.createBlock(document2, {
      name: "columns-stats",
      cells
    });
    root.replaceWith(block);
  }

  // tools/importer/parsers/columns-avatars.js
  function parse7(element, { document: document2 }) {
    if (element.closest("table")) return;
    const root = element.closest(".faces") || element;
    const images = Array.from(root.querySelectorAll("img.faces__face, img"));
    const row = images.map((img) => img);
    if (!row.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [row];
    const block = WebImporter.Blocks.createBlock(document2, {
      name: "columns-avatars",
      cells
    });
    root.replaceWith(block);
  }

  // tools/importer/parsers/tabs-pills.js
  function parse8(element, { document: document2 }) {
    if (element.closest("table")) return;
    const root = element.closest(".pills-container") || element;
    const pills = Array.from(root.querySelectorAll(".pills__pill"));
    const cells = [];
    pills.forEach((pill) => {
      const labelSource = pill.querySelector("p, span") || pill;
      const label = document2.createElement("p");
      label.textContent = labelSource.textContent.trim();
      if (!label.textContent) return;
      cells.push([label, ""]);
    });
    if (!cells.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document2, {
      name: "tabs-pills",
      cells
    });
    root.replaceWith(block);
  }

  // tools/importer/parsers/cards-feature.js
  function parse9(element, { document: document2 }) {
    if (element.closest("table")) return;
    const root = element.closest(".card-carousel") || element;
    const cardEls = Array.from(root.querySelectorAll(".card-carousel-card"));
    const cells = [];
    const seen = /* @__PURE__ */ new Set();
    cardEls.forEach((card) => {
      const image = card.querySelector(
        'img[class*="asset-image"], img[class*="poster"], img'
      );
      const title = card.querySelector("h2, h3, h4");
      const body = card.querySelector(".card-carousel-card__body");
      const key = title && title.textContent.trim() || "";
      if (key && seen.has(key)) return;
      if (key) seen.add(key);
      const contentCell = [];
      if (title) contentCell.push(title);
      if (body) contentCell.push(body);
      if (!image && !contentCell.length) return;
      cells.push([image || "", contentCell.length ? contentCell : ""]);
    });
    if (!cells.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document2, {
      name: "cards-feature",
      cells
    });
    root.replaceWith(block);
  }

  // tools/importer/parsers/cards-entry.js
  function parse10(element, { document: document2 }) {
    if (element.closest("table")) return;
    const root = element.closest(".templates__template-carousel") || element;
    const thumbs = Array.from(root.querySelectorAll("a.template-carousel__thumbnail"));
    const cells = [];
    const seen = /* @__PURE__ */ new Set();
    thumbs.forEach((thumb) => {
      const image = thumb.querySelector("img");
      const nameEl = thumb.querySelector(
        ".template-carousel__thumbnail-name, .feature-tag"
      );
      const href = thumb.getAttribute("href");
      const name = nameEl && nameEl.textContent.trim() || "";
      const key = name || href || "";
      if (key && seen.has(key)) return;
      if (key) seen.add(key);
      const contentCell = [];
      if (name) {
        const title = document2.createElement("p");
        title.textContent = name;
        contentCell.push(title);
      }
      if (href && name) {
        const cta = document2.createElement("a");
        cta.setAttribute("href", href);
        cta.textContent = name;
        contentCell.push(cta);
      }
      if (!image && !contentCell.length) return;
      cells.push([image || "", contentCell.length ? contentCell : ""]);
    });
    if (!cells.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document2, {
      name: "cards-entry",
      cells
    });
    root.replaceWith(block);
  }

  // tools/importer/parsers/accordion-faq.js
  function parse11(element, { document: document2 }) {
    if (element.closest("table")) return;
    const root = element.closest(".accordion-headline") || element;
    const items = Array.from(root.querySelectorAll(".accordion-headline__item"));
    const cells = [];
    items.forEach((item) => {
      const titleEl = item.querySelector(
        ".accordion-headline__title h2, .accordion-headline__title h3, h2, h3"
      );
      const title = document2.createElement("p");
      title.textContent = titleEl && titleEl.textContent.trim() || "";
      const content = item.querySelector(
        ".accordion-headline__content, .accordion-headline__content-wrapper"
      );
      if (!title.textContent && !content) return;
      cells.push([title, content || ""]);
    });
    if (!cells.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document2, {
      name: "accordion-faq",
      cells
    });
    root.replaceWith(block);
  }

  // tools/importer/transformers/squarespace-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [
        "#teconsent",
        "#consent_blackbar",
        "#truste-consent-track",
        '[id*="truste"]'
      ]);
      WebImporter.DOMUtils.remove(element, ["#promo-banner"]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        "#global-navigation",
        "#footer",
        "link",
        "noscript",
        "iframe"
      ]);
    }
  }

  // tools/importer/transformers/squarespace-sections.js
  var SECTION_MARKER_ATTR = "data-excat-section-id";
  function querySection(root, selectors) {
    for (const sel of selectors) {
      const el = root.querySelector(sel);
      if (el) return el;
    }
    return null;
  }
  function transform2(hookName, element, payload) {
    const sections = payload.template && payload.template.sections || [];
    if (hookName === "beforeTransform") {
      for (let i = sections.length - 1; i >= 0; i -= 1) {
        const section = sections[i];
        if (i === 0 && !section.style) continue;
        const sectionEl = querySection(element, section.selector);
        if (!sectionEl) continue;
        const hr = document.createElement("hr");
        if (section.style) hr.setAttribute(SECTION_MARKER_ATTR, section.id);
        sectionEl.before(hr);
      }
    }
    if (hookName === "afterTransform") {
      for (let i = sections.length - 1; i >= 0; i -= 1) {
        const section = sections[i];
        if (!section.style) continue;
        const marker = element.querySelector(`[${SECTION_MARKER_ATTR}="${section.id}"]`);
        const anchor = marker || querySection(element, section.selector);
        if (!anchor) continue;
        const metadataBlock = WebImporter.Blocks.createBlock(document, {
          name: "Section Metadata",
          cells: { style: section.style }
        });
        anchor.after(metadataBlock);
        if (marker) {
          marker.removeAttribute(SECTION_MARKER_ATTR);
          if (i === 0) marker.remove();
        }
      }
    }
  }

  // tools/importer/import-home.js
  var parsers = {
    "hero-photo": parse,
    "hero-display": parse2,
    "hero-video": parse3,
    "carousel-angled": parse4,
    "carousel-feature": parse5,
    "columns-stats": parse6,
    "columns-avatars": parse7,
    "tabs-pills": parse8,
    "cards-feature": parse9,
    "cards-entry": parse10,
    "accordion-faq": parse11
  };
  var PAGE_TEMPLATE = {
    name: "home",
    description: "Squarespace marketing homepage",
    urls: [
      "https://www.squarespace.com/"
    ],
    blocks: [
      {
        name: "hero-photo",
        instances: ["#homepage-hero .homepage-hero__background", "#homepage-hero .hero-text__static"]
      },
      {
        name: "carousel-angled",
        instances: ["#homepage-hero .angled-carousel"]
      },
      {
        name: "columns-stats",
        instances: ["#homepage-hero .stats", "#homepage-hero .homepage-hero__stats"]
      },
      {
        name: "tabs-pills",
        instances: ["#grow-your-business .pills-container", "#grow-your-business .pills"]
      },
      {
        name: "carousel-feature",
        instances: ["#grow-your-business .king-carousel"]
      },
      {
        name: "cards-feature",
        instances: ["#one-platform .card-carousel"]
      },
      {
        name: "cards-entry",
        instances: ["#get-started .templates__template-carousel", "#get-started .templates__mobile-carousel-wrapper"]
      },
      {
        name: "columns-avatars",
        instances: ["#customers-served .faces"]
      },
      {
        name: "hero-display",
        instances: ["#made-with-sqsp .made-with-sqsp__intersection-ref", "#made-with-sqsp"]
      },
      {
        name: "accordion-faq",
        instances: ["#homepage-how-to .accordion-headline", "#homepage-faq .accordion-headline", "#homepage-support .accordion-headline"]
      },
      {
        name: "hero-video",
        instances: [".conversion.conversion--centered", ".conversion"]
      }
    ],
    sections: [
      { id: "homepage-hero", name: "hero", selector: ["#homepage-hero"], style: "dark", blocks: ["hero-photo", "carousel-angled", "columns-stats"], defaultContent: [] },
      { id: "grow-your-business", name: "grow-your-business", selector: ["#grow-your-business"], style: "light", blocks: ["tabs-pills", "carousel-feature"], defaultContent: ["#grow-your-business h2", "#grow-your-business p"] },
      { id: "one-platform", name: "one-platform", selector: ["#one-platform"], style: "light", blocks: ["cards-feature"], defaultContent: ["#one-platform h2", "#one-platform p"] },
      { id: "get-started", name: "get-started", selector: ["#get-started"], style: "dark", blocks: ["cards-entry"], defaultContent: ["#get-started h2", "#get-started p"] },
      { id: "your-domain", name: "your-domain", selector: ["#your-domain"], style: "dark", blocks: [], defaultContent: ["#your-domain h2", "#your-domain p", "#your-domain a"] },
      { id: "customers-served", name: "customers-served", selector: ["#customers-served"], style: "dark", blocks: ["columns-avatars"], defaultContent: ["#customers-served h2"] },
      { id: "made-with-sqsp", name: "made-with-squarespace", selector: ["#made-with-sqsp"], style: "dark", blocks: ["hero-display"], defaultContent: [] },
      { id: "homepage-how-to", name: "how-to", selector: ["#homepage-how-to"], style: "light", blocks: ["accordion-faq"], defaultContent: [] },
      { id: "homepage-faq", name: "faq", selector: ["#homepage-faq"], style: "light", blocks: ["accordion-faq"], defaultContent: [] },
      { id: "homepage-support", name: "support", selector: ["#homepage-support"], style: "light", blocks: ["accordion-faq"], defaultContent: [] },
      { id: "conversion", name: "conversion", selector: [".conversion", "#content > div"], style: "dark", blocks: ["hero-video"], defaultContent: [] }
    ]
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document2, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        const elements = document2.querySelectorAll(selector);
        if (elements.length === 0) {
          console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        }
        elements.forEach((element) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element,
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_home_default = {
    transform: (payload) => {
      const { document: document2, url, html, params } = payload;
      const main = document2.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document2, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        if (!block.element.parentNode) return;
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document: document2, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
          }
        } else {
          console.warn(`No parser found for block: ${block.name}`);
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document2.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document2);
      WebImporter.rules.transformBackgroundImages(main, document2);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const rawPath = new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html?$/, "");
      const path = WebImporter.FileUtils.sanitizePath(rawPath === "" ? "/index" : rawPath);
      return [{
        element: main,
        path,
        report: {
          title: document2.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_home_exports);
})();
