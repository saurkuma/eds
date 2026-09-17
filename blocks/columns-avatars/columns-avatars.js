export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-avatars-${cols.length}-cols`);

  // Mark each image cell so it can be rendered as an overlapping circular avatar.
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        col.classList.add('columns-avatars-avatar');
      }
    });
  });
}
