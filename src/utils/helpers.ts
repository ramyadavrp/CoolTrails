// Generate encode Id
export const encodeId = (id: string | number): string => {
  return btoa(id.toString());
};
// Generate decode Id
export const decodeId = (encoded: string): string => {
  return atob(encoded);
};
// Generate slug based on title (lucknow Janesh convert to lucknow-janesh)
export const generateSlug = (title: string): string => {
  if (!title) return "";
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric
    .replace(/^-+|-+$/g, '');    // Trim leading/trailing hyphens
};

// Generate slug to title(lucknow-janesh convert to lucknow janesh)
export const slugToTitle = (slug: string): string => { 
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};