import * as React from 'react';

const EntriesContext = React.createContext();

export default function useEntries() {
  return React.useContext(EntriesContext);
}

export function EntriesProvider({ children }) {
  const [entries, setEntries] = React.useState([]);
  return (
    <EntriesContext.Provider value={{ entries, setEntries }}>
      {children}
    </EntriesContext.Provider>
  );
}
