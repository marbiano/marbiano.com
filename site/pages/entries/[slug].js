import Link from 'next/link';
import { useRouter } from 'next/router';

import { getEntryBySlug } from '@lib/sanity/queries';
import { fetchEntry, fetchEntriesSlugs } from '@lib/sanity/server';
import { usePreviewSubscription, PortableText } from '@lib/sanity/client';
import { styled } from '@styles/stitches.config';
import useEntries, { EntriesProvider } from '@hooks/use-entries';
import Logo from '@components/Logo';
import Cover from '@components/Cover';
import EntryLink from '@components/EntryLink';

const StyledLogo = styled(Logo, {
  width: 33,
  color: '$white',
  '&:hover': {
    color: 'rgb(255, 219, 5)',
  },
});

const Fixed = styled('div', {
  position: 'fixed',
  top: 'var(--fixed-top, 10px)',
  left: 'var(--fixed-left, 10px)',
});

const Absolute = styled('div', {
  position: 'absolute',
  top: 'var(--fixed-top, 10px)',
  left: 'var(--fixed-left, 10px)',
});

const Title = styled('h1', {
  fontFamily: '$serif',
  fontWeight: '300',
  fontStyle: 'italic',
  fontSize: '52px',
  position: 'relative',
  color: '$black',
  marginTop: '240px',
  marginLeft: '220px',
  marginBottom: '70px',
});

const Body = styled('div', {
  display: 'flex',
  gap: '25px',
});

const Content = styled('div', {
  fontSize: '19px',
  fontFamily: '$sans',
  lineHeight: '1.75',
  maxWidth: '44em',
  background: 'rgba(255, 255, 255, 1)',
  position: 'relative',
  marginLeft: '180px',
  // marginBottom: '100px',
  padding: '3em 8em 5em 4em',
  borderRadius: '2px',
  '& a': {
    color: '#0f71e3',
    textDecoration: 'none',
  },
});

const Box = styled('div', {
  fontSize: '16px',
  fontFamily: '$sans',
  lineHeight: '1.66',
  width: '30em',
  background: 'rgba(255, 255, 255, .8)',
  position: 'relative',
  marginBottom: '25px',
  padding: '2rem 3rem',
  borderRadius: '2px',

  '& h2': {
    fontSize: '21px',
    marginTop: 0,
    fontWeight: '400',
  },
});

const serializers = {
  marks: {
    entryLink: EntryLink,
  },
};

export default function EntryPage({ entry: initialEntry = {}, preview }) {
  const router = useRouter();
  const entry = _useSanityEntry(initialEntry, preview);

  return (
    <EntriesProvider>
      <div>
        <Link href="/" passHref>
          <Fixed
            style={{ '--fixed-top': '20px', '--fixed-left': '20px', zIndex: 4 }}
            as="a"
          >
            <StyledLogo />
          </Fixed>
        </Link>
        <Title>{router.isFallback ? 'Loading…' : entry.title}</Title>
        <Body>
          <Content>
            <PortableText blocks={entry.body} serializers={serializers} />
          </Content>
          <LinkedEntries />
        </Body>

        {/* {preview && (
        <div>
          Preview mode{' '}
          <a href={`/api/exit-preview?slug=${entry?.slug}`}>Exit</a>
        </div>
      )} */}
      </div>
    </EntriesProvider>
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

function LinkedEntries() {
  const { entries } = useEntries();
  if (entries.length === 0) {
    return null;
  }

  return (
    <div>
      {entries.map((entry) => (
        <Box key={entry._id}>
          <h2>{entry.title}</h2>
          <PortableText blocks={entry.preview} />
        </Box>
      ))}
    </div>
  );
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
