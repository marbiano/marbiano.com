import * as React from 'react';

const NotesContext = React.createContext(null);

export default function useNotes() {
  const context = React.useContext(NotesContext);
  if (context == null) {
    throw new Error(`useNotes must be used within a NotesProvider`);
  }

  return context;
}

export function NotesProvider({ children }) {
  const [notes, setNotes] = React.useState([]);

  const addNote = (note) => {
    if (notes.some((n) => n.id === note.id)) {
      return;
    }
    setNotes([...notes, note]);
  };

  const removeNote = (note) => {
    setNotes((prevNotes) => prevNotes.filter((e) => e.id !== note.id));
  };

  const value = { notes, addNote, removeNote };

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
}
