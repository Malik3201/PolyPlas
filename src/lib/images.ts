/** Build a verified Unsplash image URL */
function unsplash(id: string, w = 800, h = 1000) {
  return `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&q=85`;
}

// Verified working Unsplash photo IDs (tested — old IDs were returning 404)
const PHOTOS = {
  packaging: "photo-1606787366850-de6330128bfc",
  cups: "photo-1495474472287-4d71bcdd2085",
  kitchen: "photo-1556911220-e15b29be8c8f",
  coffee: "photo-1544787219-7f47ccb76574",
  food: "photo-1504674900247-0877df9cc836",
  supplies: "photo-1558618666-fcd25c85cd64",
  catering: "photo-1556909114-f6e7ad7d3136",
  table: "photo-1582719508461-905c673771fd",
  business: "photo-1600880292203-757bb62b4baf",
} as const;

export const CATEGORY_IMAGES: Record<string, string> = {
  "disposable-glasses": unsplash(PHOTOS.coffee),
  "disposable-cups": unsplash(PHOTOS.cups),
  "disposable-plates": unsplash(PHOTOS.kitchen),
  "disposable-spoons": unsplash(PHOTOS.table),
  "disposable-straws": unsplash(PHOTOS.supplies),
  "food-packaging": unsplash(PHOTOS.packaging),
  "custom-products": unsplash(PHOTOS.catering),
};

export const HERO_FALLBACK_IMAGE = unsplash(PHOTOS.packaging, 1200, 1400);

export const HERO_SIDE_IMAGE =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYIL_FtWjbMTA1ZeSxr78bf4g-wTVSw22jsBRgPuePz0QxZss3osp5D204";

export const HERO_IMAGES = {
  packaging: unsplash(PHOTOS.packaging),
  cups: unsplash(PHOTOS.cups),
  plates: unsplash(PHOTOS.kitchen),
};

export const ABOUT_IMAGE = unsplash(PHOTOS.packaging);

export function getCategoryImage(slug: string, customUrl?: string): string {
  return customUrl || CATEGORY_IMAGES[slug] || CATEGORY_IMAGES["food-packaging"];
}
