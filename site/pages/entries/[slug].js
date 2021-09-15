import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { getEntryBySlug } from '@lib/sanity/queries';
import { fetchEntry, fetchEntriesSlugs } from '@lib/sanity/server';
import { usePreviewSubscription, PortableText } from '@lib/sanity/client';
import { styled } from '@styles/stitches.config';
import useEntries, { EntriesProvider } from '@hooks/use-entries';
import Logo from '@components/Logo';
import EntryLink from '@components/EntryLink';
import Close from '@components/close.svg';

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

const Header = styled('header', {
  marginTop: '240px',
  marginLeft: '180px',
  marginBottom: 80,
  position: 'sticky',
  top: 40,
  // zIndex: 1,
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

const Title = styled('h1', {
  fontFamily: '$serif',
  fontWeight: '300',
  fontStyle: 'italic',
  fontSize: '46px',
  letterSpacing: '-0.02em',
  lineHeight: '1',
  position: 'relative',
  color: 'hsl(120 11% 8%)',
  marginBottom: 0,
  marginBottom: '20px',
});

const Meta = styled('ul', {
  fontSize: '13px',
  color: 'hsl(120 7% 45%)',
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  alignItems: 'center',
  '& li': {
    display: 'flex',
    alignItems: 'center',
  },
  '& li:not(:last-child)': {
    marginRight: 6,

    '&:after': {
      content: '" "',
      display: 'block',
      width: '6px',
      height: '6px',
      background: 'hsl(120 6% 75%)',
      marginLeft: 6,
    },
  },
});

const Body = styled('div', {
  display: 'flex',
  gap: '25px',
  // overflowX: 'scroll',
  // marginRight: '10px',
  position: 'relative',
  '&:before': {
    content: '',
    display: 'block',
    position: 'fixed',
    bottom: '0',
    right: '13vw',
    height: 120,
    width: 1,
    background: '#E84F06',
  },
});

const Content = styled('div', {
  flex: '0 1 45em',
  fontSize: '18px',
  fontFamily: '$sans',
  lineHeight: '1.75',
  background: 'rgba(255, 255, 255, 1)',
  color: 'hsl(120 11% 8% / .85)',
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
  lineHeight: '1.85',
  width: '30em',
  background: 'hsl(120 6% 99% / .95)',
  position: 'relative',
  padding: '2rem 3rem',
  borderRadius: '2px',
  color: 'hsl(120 11% 8% / .8)',
  // borderTop: '10px solid hsl(120 6% 79% / .95)',
  overflowY: 'scroll',

  '& h2': {
    fontSize: '21px',
    margin: 0,
    fontWeight: '400',
    color: 'hsl(120 11% 8% / .9)',
    cursor: 'pointer',
  },

  '& a': {
    color: 'hsl(208 37% 62%)',
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
        <Header>
          <Title>{router.isFallback ? 'Loading…' : entry.title}</Title>
          <Meta>
            <li>Last Edited: July 16, 2021</li>
            <li>Viewed by 1.2M people</li>
          </Meta>
        </Header>

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
  const { entries, setEntries } = useEntries();

  const removeEntry = (entry) => {
    setEntries((prevEntries) =>
      prevEntries.filter((e) => e.slug !== entry.slug),
    );
  };

  return (
    <Grid>
      <AnimatePresence>
        {entries.map((entry) => (
          <LinkedEntry
            key={entry.slug}
            entry={entry}
            removeEntry={removeEntry}
          />
        ))}
      </AnimatePresence>
    </Grid>
  );
}

const BoxHeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const CloseButton = styled('button', {
  border: 0,
  background: 'transparent',
  fontSize: 0,
  cursor: 'pointer',
});

const CloseButtonIcon = styled(Close, {
  width: 16,
  padding: 2,
  opacity: 0.5,
  '&:hover': {
    opacity: 1,
  },
});

function LinkedEntry({ entry, removeEntry }) {
  const [isExpanded, setIsExpanded] = React.useState(true);
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 10, opacity: 0 }}
      transition={{ ease: 'easeOut', duration: 0.2 }}
      key={entry.slug}
    >
      <Box>
        <BoxHeader>
          <h2 onClick={() => setIsExpanded((prev) => !prev)}>{entry.title}</h2>
          <CloseButton onClick={() => removeEntry(entry)}>
            Remove
            <CloseButtonIcon />
          </CloseButton>
        </BoxHeader>
        {isExpanded && (
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ease: 'easeOut', duration: 0.15 }}
          >
            <PortableText blocks={entry.body} />
          </motion.div>
        )}
      </Box>
    </motion.div>
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
