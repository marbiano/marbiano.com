import * as React from 'react';
import { BiDoorOpen } from 'react-icons/bi';

export default {
  title: 'Entry Link',
  name: 'entryLink',
  type: 'object',
  fields: [
    {
      title: 'Entry',
      name: 'entry',
      type: 'reference',
      to: [{ type: 'entry' }],
    },
  ],
  blockEditor: {
    icon: BiDoorOpen,
    render: EntryLink,
  },
};

function EntryLink({ children }) {
  return (
    <span style={{ color: 'hsl(19 95% 47%)', background: 'white' }}>
      {children}
    </span>
  );
}
