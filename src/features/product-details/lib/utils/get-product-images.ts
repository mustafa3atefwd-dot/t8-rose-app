export function getProductImages(cover: string | null, gallery: string) {
  let galleryImages: unknown = [];

  try {
    galleryImages = JSON.parse(gallery || '[]');
  } catch {
    galleryImages = [];
  }

  const images = [cover, ...(Array.isArray(galleryImages) ? galleryImages : [])].filter(
    (image): image is string => typeof image === 'string' && image.length > 0
  );

  return [...new Set(images)];
}
