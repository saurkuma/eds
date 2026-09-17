/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Squarespace site-wide cleanup.
 * Removes non-authorable global chrome and consent widgets.
 * All selectors verified against migration-work/cleaned.html.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Consent / cookie widgets (verified: TrustArc markup after footer)
    // #teconsent, #consent_blackbar, #truste-consent-track
    WebImporter.DOMUtils.remove(element, [
      '#teconsent',
      '#consent_blackbar',
      '#truste-consent-track',
      '[id*="truste"]',
    ]);

    // Promo banner (verified: <aside id="promo-banner">) — non-authorable site chrome
    WebImporter.DOMUtils.remove(element, ['#promo-banner']);
  }

  if (hookName === TransformHook.afterTransform) {
    // Global chrome — non-authorable (verified in cleaned.html)
    // Header: <header id="global-navigation">, Footer: id="footer"
    WebImporter.DOMUtils.remove(element, [
      '#global-navigation',
      '#footer',
      'link',
      'noscript',
      'iframe',
    ]);
  }
}
