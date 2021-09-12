import { useRouter } from 'next/router';

import { getEntryBySlug } from '@lib/sanity/queries';
import { fetchEntry, fetchEntriesSlugs } from '@lib/sanity/server';
import { usePreviewSubscription } from '@lib/sanity/client';
import { styled } from '@styles/stitches.config';

const Title = styled('div', {
  fontFamily: '$mono',
});

export default function EntryPage({ entry: initialEntry = {}, preview }) {
  const router = useRouter();
  const entry = _useSanityEntry(initialEntry, preview);

  return (
    <div>
      {preview && (
        <div>
          Preview mode{' '}
          <a href={`/api/exit-preview?slug=${entry?.slug}`}>Exit</a>
        </div>
      )}
      <Title>{router.isFallback ? 'Loading…' : entry.title}</Title>
    </div>
  );
}

function _useSanityEntry(initialEntry, preview) {
  const slug = initialEntry?.slug;

  const { data } = usePreviewSubscription(getEntryBySlug, {
    params: { slug },
    initialData: initialEntry,
    enabled: preview && slug,
  });

  return data;
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

export async function getStaticPaths() {
  const slugs = await fetchEntriesSlugs();
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}
