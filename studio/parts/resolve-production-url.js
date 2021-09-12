export default function resolveProductionUrl(document) {
  return `${process.env.SANITY_STUDIO_SITE_URL}/api/preview?secret=${process.env.SANITY_STUDIO_PREVIEW_SECRET}&slug=${document.slug.current}`;
}
