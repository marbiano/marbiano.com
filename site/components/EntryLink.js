import useEntries from '@hooks/use-entries';
import Link from 'next/link';

export default function EntryLink({ mark, children }) {
  const { slug, preview } = mark;
  const { setEntries } = useEntries();

  async function handleClick(e) {
    if (!e.metaKey && !e.altKey) {
      return;
    }

    e.preventDefault();
    const url = `/api/entries/${slug}${preview ? '?preview=1' : ''}`;
    const res = await fetch(url);
    const { entry } = await res.json();
    setEntries((prevEntries) => [...prevEntries, entry]);
  }

  return (
    <Link href={`/entries/${slug}`}>
      <a onClick={handleClick}>{children}</a>
    </Link>
  );
}
