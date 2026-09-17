export default function decorate(block) {
  // A background video is authored as a link to a video file; a poster/background
  // image may also be present. Detect either as the full-bleed background.
  const picture = block.querySelector(':scope > div:first-child picture');
  const videoLink = block.querySelector('a[href$=".mp4"], a[href*=".mp4?"]');

  if (videoLink) {
    const video = document.createElement('video');
    video.setAttribute('autoplay', '');
    video.setAttribute('muted', '');
    video.setAttribute('loop', '');
    video.setAttribute('playsinline', '');
    video.muted = true;
    const source = document.createElement('source');
    source.src = videoLink.href;
    source.type = 'video/mp4';
    video.append(source);
    video.className = 'hero-video-bg';
    const owningRow = videoLink.closest(':scope > div');
    block.prepend(video);
    if (owningRow && !owningRow.textContent.trim()) owningRow.remove();
    else videoLink.remove();
  } else if (picture) {
    const owningRow = picture.closest(':scope > div');
    block.prepend(picture);
    if (owningRow && !owningRow.textContent.trim() && !owningRow.querySelector('a, h1, h2, h3, h4, h5, h6')) {
      owningRow.remove();
    }
  } else {
    block.classList.add('no-image');
  }

  // Center the closing CTA content over the background.
  const content = document.createElement('div');
  content.className = 'hero-video-content';
  [...block.children].forEach((child) => {
    if (child.tagName === 'VIDEO' || child.tagName === 'PICTURE') return;
    content.append(child);
  });
  block.append(content);
}
