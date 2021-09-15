import { useRouter } from 'next/router';
import Link from 'next/link';

import useEntries from '@hooks/use-entries';
import ArrowDown from '@components/arrow-down.svg';
import { styled } from '@styles/stitches.config';

const Nav = styled('a', {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 4,
  color: 'hsl(208 85% 47%)',
  background: 'transparent',
  paddingLeft: 6,
  paddingRight: 6,
  borderRadius: 3,
  '&:hover': {
    background: 'hsl(208 85% 47% / 0.1)',
  },
});

const StyledArrowDown = styled(ArrowDown, {
  width: 8,
  marginTop: 4,
  color: 'hsl(208 85% 47% / .9)',
});

export default function EntryLink({ mark, children }) {
  const router = useRouter();
  const { slug, preview, title, body } = mark;
  const { setEntries } = useEntries();

  const url = `/api/entries/${slug}${preview ? '?preview=1' : ''}`;

  async function handleClick(e) {
    if (!e.metaKey && !e.altKey) {
      return;
    }

    e.preventDefault();
    const entry = {
      slug,
      title,
      body,
    };
    setEntries((prevEntries) => {
      return prevEntries.some((e) => e.slug === entry.slug)
        ? prevEntries
        : [...prevEntries, entry];
    });
  }

  function handleHover(e) {
    if (!e.metaKey && !e.altKey) {
      return;
    }

    router.prefetch('/');
    router.prefetch(url);
  }

  return (
    <Link href={`/entries/${slug}`} passHref>
      <Nav onClick={handleClick} onMouseEnter={handleHover}>
        <span>{children}</span>
        <StyledArrowDown />
      </Nav>
    </Link>
  );
}
