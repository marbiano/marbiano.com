import Link from 'next/link';

import { NotesProvider } from '@hooks/use-notes';
import { styled } from '@styles/stitches.config';
import { grid, gridUnit, rem } from '@styles/tokens';
import LogoSvg from '@assets/logo.svg';
import Paper from '@components/Paper';
import Notes from '@components/Notes';

export default function Entry({ entry }) {
  const lastEdited = new Date(entry.updatedAt);
  return (
    <NotesProvider>
      <Layout>
        <Link href="/" passHref>
          <Logo>
            <LogoSvg />
          </Logo>
        </Link>
        <Header>
          <Title>
            <span>{entry.title}</span>
          </Title>
          <Meta>
            <li>
              {lastEdited.toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric',
                day: 'numeric',
              })}
            </li>
          </Meta>
        </Header>
        <Paper body={entry.body} />
        <Notes />
      </Layout>
    </NotesProvider>
  );
}

const Logo = styled('a', {
  width: '2rem',
  color: 'white',
  position: 'fixed',
  top: '1rem',
  left: '1rem',
  '&:hover': {
    color: '$black',
  },
});

const Header = styled('header', {
  position: 'sticky',
  top: 0,
  gridRow: 1,
  gridColumn: 2,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'end',
  paddingLeft: `${rem(grid.gutter * 2)}`,
  paddingBottom: `${rem(grid.gutter * 3)}`,
});

const Layout = styled('div', {
  display: 'grid',
  gridTemplateColumns: `minmax(${rem(grid.gutter)}, ${rem(
    gridUnit(1),
  )}) minmax(${rem(gridUnit(2))}, ${rem(gridUnit(5))}) minmax(${rem(
    grid.gutter,
  )}, 1fr)`,
  gridTemplateRows: `minmax(${rem(grid.gutter)}, 50vh) 1fr`,
  columnGap: `${rem(grid.gutter)}`,
  position: 'relative',

  [`& ${Header}`]: {
    gridRow: 1,
    gridColumn: '2',
  },
  [`& ${Paper}`]: {
    gridRow: 2,
    gridColumn: 2,
  },
  [`& ${Notes}`]: {
    gridRow: 2,
    gridColumn: 3,
  },

  '&:before': {
    content: '',
    display: 'block',
    position: 'fixed',
    bottom: '0',
    right: `${rem(gridUnit(1.25))}`,
    height: rem(120),
    width: 1,
    background: '$orange',
  },
});

const Title = styled('h1', {
  fontSize: rem(58),
  fontWeight: '700',
  letterSpacing: '-0.025em',
  lineHeight: 1,
  position: 'relative',
  marginBottom: '.5rem',
  maxWidth: '30em',
  color: '$black90',

  '& span': {
    color: '$black90',
    background:
      'linear-gradient(to left, hsl(18 83% 20%), hsl(18 83% 5%) 25%, $black90 50%, $black 75%)',
    backgroundClip: 'text',
    '-webkit-text-fill-color': 'transparent',
  },

  '&:before': {
    content: '',
    display: 'block',
    position: 'absolute',
    top: rem(-40),
    left: 0,
    width: rem(40),
    height: rem(10),
    background: 'linear-gradient(to right, $orange, $lightOrange)',
  },
});

const Meta = styled('ul', {
  fontFamily: '$mono',
  fontSize: 15,
  color: '$black50',
  listStyle: 'none',
  padding: '.5rem 0',
  margin: 0,
  display: 'flex',
  alignItems: 'center',
  transition: 'color 200ms',
  '& li': {
    display: 'flex',
    alignItems: 'center',
  },
  '& li:not(:last-child)': {
    marginRight: '0.5rem',

    '&:after': {
      content: '" "',
      display: 'block',
      width: '5px',
      height: '5px',
      background: '$black10',
      marginLeft: '0.5rem',
      marginTop: 2,
    },
  },
});
