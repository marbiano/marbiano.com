import { useRouter } from 'next/router';
import Link from 'next/link';

import useEntries from '@hooks/use-entries';

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
      title,
      body,
    };
    setEntries((prevEntries) => [...prevEntries, entry]);
  }

  function handleHover(e) {
    if (!e.metaKey && !e.altKey) {
      return;
    }

    router.prefetch('/');
    router.prefetch(url);
  }

  return (
    <Link href={`/entries/${slug}`}>
      <a onClick={handleClick} onMouseEnter={handleHover}>
        {children}
      </a>
    </Link>
  );
}
