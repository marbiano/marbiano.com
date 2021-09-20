import Link from 'next/link';

import { NotesProvider } from '@hooks/use-notes';
import { styled } from '@styles/stitches.config';
import { grid, gridUnit, rem } from '@styles/tokens';
import LogoSvg from '@assets/logo.svg';
import Paper from '@components/Paper';
import Notes from '@components/Notes';

export default function Entry({ entry }) {
  return (
    <NotesProvider>
      <Layout>
        <Link href="/" passHref>
          <Logo>
            <LogoSvg />
          </Logo>
        </Link>
        <Header>
          <Title>{entry.title}</Title>
          <Meta>
            <li>Last Edited: July 16, 2021</li>
            <li>Viewed by 1.2M people</li>
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
    color: '$orange',
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
  paddingLeft: `${rem(grid.gutter * 1.5)}`,
  paddingBottom: `${rem(grid.gutter * 3)}`,
});

const Layout = styled('div', {
  display: 'grid',
  gridTemplateColumns: `minmax(${rem(grid.gutter)}, ${rem(
    gridUnit(1),
  )}) minmax(${rem(gridUnit(2))}, ${rem(gridUnit(5))}) minmax(${rem(
    grid.gutter,
  )}, 1fr)`,
  gridTemplateRows: `minmax(${rem(grid.gutter)}, 45vh) 1fr`,
  columnGap: `${rem(grid.gutter)}`,
  position: 'relative',

  [`& ${Header}`]: {
    gridRow: 1,
    gridColumn: 2,
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
    right: `${rem(gridUnit(1))}`,
    height: rem(120),
    width: 1,
    background: '$orange',
  },
});

const Title = styled('h1', {
  fontFamily: '$serif',
  fontSize: rem(46),
  fontWeight: '300',
  fontStyle: 'italic',
  letterSpacing: '-0.025em',
  lineHeight: 1,
  position: 'relative',
  color: '$black',
  marginBottom: '1.33rem',

  '&:before': {
    content: '',
    display: 'block',
    position: 'absolute',
    top: '-40px',
    left: '0',
    borderTop: '8px solid $orange',
    width: rem(40),
  },
});

const Meta = styled('ul', {
  fontSize: 14,
  color: '$black40',
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
    marginRight: '0.5em',

    '&:after': {
      content: '" "',
      display: 'block',
      width: '0.5em',
      height: '0.5em',
      background: '$black10',
      marginLeft: '0.5em',
    },
  },
});
