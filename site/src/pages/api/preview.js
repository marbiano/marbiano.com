import { fetchEntry } from '@lib/sanity/server';

export default async function preview(req, res) {
  const { secret, slug } = req.query;

  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  if (secret !== process.env.SANITY_PREVIEW_SECRET || !slug) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  const entry = await fetchEntry(slug);

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!entry) {
    return res.status(401).json({ message: 'Invalid slug' });
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({});

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  res.writeHead(307, { Location: `/entries/${entry.slug}` });
  res.end();
}
