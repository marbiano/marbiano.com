import ReactYouTube from 'react-youtube';
import getYouTubeId from 'get-youtube-id';

import { PortableText } from '@lib/sanity/client';
import NoteLink from '@components/NoteLink';
import { styled, css } from '@styles/stitches.config';
import useNotes from '@hooks/use-notes';
import { rem } from '@styles/tokens';

const Pre = styled('pre', {
  background: '$black05',
  color: '$black75',
  padding: '2em',
  margin: '3.5rem -4rem 3.5rem -3rem',
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
  margin: '3.5rem -4rem 3.5rem -3rem',
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

const FullQuote = styled('figure', {
  padding: '3rem 2rem',
  borderTop: '1px solid $black10',
  borderBottom: '1px solid $black10',
  '& blockquote': {
    fontFamily: '$serif',
    margin: 0,
    position: 'relative',
    lineHeight: 1.66,
    fontSize: rem(26),
    letterSpacing: '-0.01em',
    maxWidth: '21em',
    '&:before': {
      content: '“',
      display: 'block',
      fontFamily: '$sans',
      fontSize: '2.5em',
      lineHeight: 1,
      color: '$orange',
      position: 'absolute',
      top: '-0.25rem',
      left: '-2.25rem',
    },
    '& p': {
      margin: 0,
    },
  },
  '& figcaption': {
    marginTop: '1.25rem',
    fontSize: rem(16),
    color: '$black60',
    '& cite': {
      fontStyle: 'normal',
    },
    '& span': {
      color: '$orange80',
    },
  },
});

const Quote = ({ text, author }) => {
  return (
    <FullQuote>
      <blockquote>
        <p>{text}</p>
      </blockquote>
      <figcaption>
        <cite>
          <span>—</span> {author}
        </cite>
      </figcaption>
    </FullQuote>
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
    quote: ({ node }) => <Quote {...node} />,
  },
};

const Body = styled('div', {
  backdropFilter: 'blur(7px) brightness(1)',
  border: '1.5px solid',
  background: 'linear-gradient(200deg, $white60, $white90 50vh, $white 90%)',
  borderColor: '$white70 $white50 transparent $white30',
  boxShadow: 'inset 0 0 2em -0.6em $paper',
  minHeight: '50vh',
  padding: '6rem 9rem 5rem 6rem',
  fontSize: rem(18),
  lineHeight: 1.85,
  color: '$black90',
  position: 'relative',
  borderRadius: 3,

  '& a[href^="http:"], & a[href^="https:"]': {
    color: '$paleBlue',
    transition: 'color 200ms',
    '&:hover': {
      color: '$blue',
    },
  },

  '& h2': {
    marginTop: '2.5rem',
    marginBottom: '1rem',
    fontFamily: '$serif',
    fontWeight: '600',
    fontSize: rem(28),
  },

  '& h3': {
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginTop: '2.5rem',
    marginBottom: '1rem',
    fontSize: rem(16),
    fontWeight: '700',
  },

  '& h2 + h3': {
    marginTop: '1.5rem',
  },

  '& p': {
    marginTop: 0,
    marginBottom: '1.85rem',
  },

  '& figure': {
    margin: '3.5rem -4rem 3.5rem -3rem',
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
