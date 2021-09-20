import { fetchEntry } from '@lib/sanity/server';

export default async function entry(req, res) {
  const { slug, preview } = req.query;
  const isPreview = req.preview;

  // Check slug presence
  if (!slug) {
    return res.status(401).json({ message: 'Missing slug' });
  }

  const entry = await fetchEntry(req.query.slug, isPreview, preview);

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!entry) {
    return res.status(401).json({ message: 'Invalid slug' });
  }

  res.status(200).json({ entry });
}
