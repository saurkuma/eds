export default function decorate(block) {
  // First cell with a picture becomes the full-bleed background.
  const picture = block.querySelector(':scope > div:first-child picture');
  if (!picture) {
    block.classList.add('no-image');
  } else {
    const owningRow = picture.closest(':scope > div');
    block.prepend(picture);
    if (owningRow && !owningRow.textContent.trim() && !owningRow.querySelector('a, h1, h2, h3, h4, h5, h6')) {
      owningRow.remove();
    }
  }

  // Center the large display title (and any supporting content) over the background.
  const content = document.createElement('div');
  content.className = 'hero-display-content';
  [...block.children].forEach((child) => {
    if (child === picture) return;
    content.append(child);
  });
  block.append(content);
}
