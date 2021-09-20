import NextLink from 'next/link';
import ArrowDownSvg from '@assets/arrow-down.svg';
import { styled } from '@styles/stitches.config';
import Paper from '@components/Paper';

const Link = styled('a', {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 4,
  paddingLeft: 6,
  paddingRight: 6,
  borderRadius: 3,
  color: '$black75',
  background: '$blue05',
  transition: 'background 250ms ease-out',
  textDecoration: 'none',

  [`${Paper} &`]: {
    color: '$black75',
  },

  '&:hover': {
    background: '$blue15',
    color: '$black',
  },
});

const ArrowDown = styled(ArrowDownSvg, {
  width: 8,
  marginTop: 4,
  color: 'hsl(208 85% 47% / .9)',
});

export default function NoteLink({ url, onClick, children }) {
  function handleClick(e) {
    if (!e.metaKey && !e.altKey) {
      return;
    }

    e.preventDefault();
    onClick();
  }

  return (
    <NextLink href={url} passHref>
      <Link onClick={handleClick}>
        <span>{children}</span>
        <ArrowDown />
      </Link>
    </NextLink>
  );
}
