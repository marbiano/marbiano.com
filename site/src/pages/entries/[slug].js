import { getEntryBySlug } from '@lib/sanity/queries';
import { fetchEntry, fetchEntriesSlugs } from '@lib/sanity/server';
import { usePreviewSubscription } from '@lib/sanity/client';

import Entry from '@screens/Entry';

export async function getStaticPaths() {
  const slugs = await fetchEntriesSlugs();
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

export async function getStaticProps({ params, preview = false }) {
  const entry = await fetchEntry(params.slug, preview);

  return {
    props: {
      entry: entry || {},
      preview,
    },
  };
}

export default function EntryPage({ entry: initialEntry = {}, preview }) {
  const entry = useSanityEntry(initialEntry, preview);

  return <Entry entry={entry} />;
}

function useSanityEntry(initialEntry, preview) {
  const slug = initialEntry?.slug;

  const { data } = usePreviewSubscription(getEntryBySlug, {
    params: { slug },
    initialData: initialEntry,
    enabled: preview && slug,
  });

  return data;
}
