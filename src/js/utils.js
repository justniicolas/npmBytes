export function slugify(text) {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

  
  export function formatDate(date) {
    return new Date(date).toLocaleDateString('fr-EU', {
      timeZone: "UTC",
    })
  }