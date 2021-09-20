import ReactYouTube from 'react-youtube';
import getYouTubeId from 'get-youtube-id';

import { PortableText } from '@lib/sanity/client';
import NoteLink from '@components/NoteLink';
import { styled, css } from '@styles/stitches.config';
import useNotes from '@hooks/use-notes';
import { rem } from '@styles/tokens';

const Pre = styled('pre', {
  background: 'hsl(120 11% 8% / .05)',
  color: 'hsl(120 11% 8% / .6)',
  padding: '2em',
  margin: '3rem -3rem 3rem -2rem',
  borderRadius: '2px',
  transition: 'all 50ms',
  '& code': {
    fontFamily: '$mono',
    fontSize: 16,
  },
  '&:hover': {
    background: 'hsl(120 11% 8%)',
    color: '$white',
  },
});

const CodeBlock = ({ code, language }) => {
  return (
    <Pre data-language={language}>
      <code>{code}</code>
    </Pre>
  );
};

const youTubeContainerClassName = css({
  position: 'relative',
  aspectRatio: '16/9',
  margin: '3rem -3rem 3rem -2rem',
  '& iframe': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
})().className;

const YouTube = ({ url }) => {
  const id = getYouTubeId(url);
  return (
    <ReactYouTube videoId={id} containerClassName={youTubeContainerClassName} />
  );
};

const EntryLink = ({ title, body, slug, children }) => {
  const { addNote } = useNotes();

  return (
    <NoteLink
      url={`/entries/${slug}`}
      onClick={() => {
        addNote({ id: slug, title, body });
      }}
    >
      {children}
    </NoteLink>
  );
};

const defaultSerializers = {
  marks: {
    entryLink: ({ mark, children }) => (
      <EntryLink {...mark}>{children}</EntryLink>
    ),
  },
  types: {
    codeBlock: ({ node }) => (
      <CodeBlock language={node.language} code={node.code} />
    ),
    youtubeEmbed: ({ node }) => <YouTube url={node.url} />,
  },
};

const Body = styled('div', {
  background: 'white',
  padding: '5rem 9rem 5rem 6rem',
  fontSize: rem(18),
  lineHeight: 1.75,
  color: '$black75',
  position: 'relative',
  borderRadius: 2,

  '& a': {
    color: '$blue',
  },

  '& h2': {
    marginTop: '2.25rem',
    marginBottom: '0.75rem',
    fontSize: rem(24),
    color: '$black85',
  },

  '& h3': {
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginTop: '1.75rem',
    marginBottom: '0.75rem',
    fontSize: rem(16),
    fontWeight: '700',
    color: '$black85',
  },

  '& h2 + h3': {
    marginTop: '1rem',
  },

  '& p': {
    marginTop: 0,
    marginBottom: '1.75rem',
  },

  '& figure': {
    margin: '3rem -3rem 3rem -2rem',
  },

  '& img': {
    maxWidth: '100%',
    display: 'block',
  },
});

const componentClassName = 'paper';

export default function Paper({ body, serializers = defaultSerializers }) {
  return (
    <Body className={componentClassName}>
      <PortableText blocks={body} serializers={serializers} />
    </Body>
  );
}

Paper.toString = () => `.${componentClassName}`;
