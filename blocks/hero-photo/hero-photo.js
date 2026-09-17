export default function decorate(block) {
  // The first cell holding a picture becomes the full-bleed background image.
  const picture = block.querySelector(':scope > div:first-child picture');
  if (!picture) {
    block.classList.add('no-image');
  } else {
    // Move the picture to be a direct child so it can be positioned as a background.
    const owningRow = picture.closest(':scope > div');
    block.prepend(picture);
    if (owningRow && !owningRow.textContent.trim() && !owningRow.querySelector('a, h1, h2, h3, h4, h5, h6')) {
      owningRow.remove();
    }
  }

  // Wrap the remaining textual content so it can be centered over the image.
  const content = document.createElement('div');
  content.className = 'hero-photo-content';
  [...block.children].forEach((child) => {
    if (child === picture) return;
    content.append(child);
  });
  block.append(content);
}
