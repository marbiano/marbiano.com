import NextLink from 'next/link';
import ArrowDownSvg from '@assets/arrow-down.svg';
import { styled } from '@styles/stitches.config';

const Link = styled('a', {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 4,
  paddingLeft: 6,
  paddingRight: 6,
  borderRadius: 3,
  textDecoration: 'none',
  color: '$orange80',
  '&:hover': {
    color: '$orange',
  },
});

const ArrowDown = styled(ArrowDownSvg, {
  width: 8,
  marginTop: 4,
  color: '$orange',
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
