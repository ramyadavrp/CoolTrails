import { useEffect } from "react";
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

export const  timeAgo = (dateString: string) =>{
        const now = new Date();
        const past = new Date(dateString);
        const diff = now.getTime() - past.getTime(); // difference in ms

        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);

        if (weeks > 0) return weeks === 1 ? "1 w" : `${weeks} w`;
        if (days > 0) return days === 1 ? "1 d" : `${days} d`;
        if (hours > 0) return hours === 1 ? "1 h" : `${hours} h`;
        if (minutes > 0) return minutes === 1 ? "1 m" : `${minutes} m`;
        return "now";
}
export const usePageTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};