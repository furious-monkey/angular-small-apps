/**
 * Convert a text into a slug or id.
 * https://gist.github.com/codeguy/6684588#gistcomment-3332719
 *
 * @param {string} text Text to slugify.
 */
 const slugify = (text: string) => {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "-")
    .replace(/--+/g, "-")
    .replace(/^-|-$/g, "");
};

export { slugify };
