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
    color: '#E84F06',
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
  fontSize: '46px',
  letterSpacing: '-0.02em',
  lineHeight: '1',
  position: 'relative',
  color: '$black',
  marginTop: '240px',
  marginLeft: '180px',
  marginBottom: 0,
  marginBottom: '20px',
  position: 'relative',
  '&:before': {
    content: '',
    display: 'block',
    position: 'absolute',
    top: '-40px',
    left: '0',
    borderTop: '8px solid #E84F06',
    width: '36px',
  },
});

const Meta = styled('div', {
  fontSize: '13px',
  marginLeft: '180px',
  marginBottom: '50px',
  color: 'rgba(0, 0, 0, .5)',
});

const Body = styled('div', {
  display: 'flex',
  gap: '25px',
  // overflowX: 'scroll',
  // marginRight: '10px',
});

const Content = styled('div', {
  flex: '0 1 45em',
  fontSize: '18px',
  fontFamily: '$sans',
  lineHeight: '1.75',
  background: 'rgba(255, 255, 255, 1)',
  color: 'rgba(0, 0, 0, .8)',
  position: 'relative',
  marginLeft: '140px',
  padding: '3em 9em 5em 5em',
  borderRadius: '2px',
  '& a': {
    color: '#0f71e3',
    textDecoration: 'none',
  },
});

const Grid = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  gap: '25px',
  height: 'auto',
  maxHeight: '100vh',
  alignContent: 'flex-start',
  position: 'sticky',
  top: '25px',
});

const Box = styled('div', {
  fontSize: '16px',
  fontFamily: '$sans',
  lineHeight: '1.66',
  width: '30em',
  background: 'rgba(255, 255, 255, .8)',
  position: 'relative',
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
        <Meta>Last Edited: July 16, 2021 – Viewed by 1.2M people</Meta>
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
    <Grid>
      {entries.map((entry) => (
        <Box key={entry._id}>
          <h2>{entry.title}</h2>
          <PortableText blocks={entry.body} />
        </Box>
      ))}
    </Grid>
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
