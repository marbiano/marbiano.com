import { motion, AnimatePresence } from 'framer-motion';

import Note from '@components/Note';

import { PortableText } from '@lib/sanity/client';
import { styled } from '@styles/stitches.config';
import useNotes from '@hooks/use-notes';

const NotesGrid = styled('div', {
  gridRow: 2,
  gridColumn: 3,
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap',
  gap: '25px',
  height: 'auto',
  maxHeight: '100vh',
  alignContent: 'flex-start',
  position: 'sticky',
  top: '0',
});

const componentClassName = 'notes';

export default function Notes() {
  const { notes, removeNote } = useNotes();

  return (
    <NotesGrid className={componentClassName}>
      <AnimatePresence>
        {notes.map((note) => (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ ease: 'easeOut', duration: 0.2 }}
            key={note.id}
          >
            <Note title={note.title} onRemove={() => removeNote(note)}>
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ease: 'easeOut', duration: 0.15 }}
              >
                <PortableText blocks={note.body} />
              </motion.div>
            </Note>
          </motion.div>
        ))}
      </AnimatePresence>
    </NotesGrid>
  );
}

Notes.toString = () => `.${componentClassName}`;
