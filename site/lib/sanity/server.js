import { createClient } from 'next-sanity';
import config from './config';
import { getEntriesBySlug, getEntriesSlugs } from './queries';

// Set up the client for fetching data
const sanityClient = createClient(config);

// Set up a preview client with authentication for drafts
const previewClient = createClient({
  ...config,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// Helper function for easily switching between normal client and preview client
const getClient = (usePreview) => (usePreview ? previewClient : sanityClient);

// Overlay published documents with drafts, if available.
export function overlayDrafts(docs) {
  const documents = docs || [];
  const overlayed = documents.reduce((map, doc) => {
    if (!doc._id) {
      throw new Error('Ensure that `_id` is included in query projection');
    }

    const isDraft = doc._id.startsWith('drafts.');
    const id = isDraft ? doc._id.slice(7) : doc._id;
    return isDraft || !map.has(id) ? map.set(id, doc) : map;
  }, new Map());

  return Array.from(overlayed.values());
}

export async function fetchEntry(slug, usePreview) {
  const [entry] = overlayDrafts(
    await getClient(usePreview).fetch(getEntriesBySlug, {
      slug,
    }),
  );

  return entry;
}

export async function fetchEntriesSlugs() {
  return sanityClient.fetch(getEntriesSlugs);
}
