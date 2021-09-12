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
    {
      title: 'Preview',
      name: 'preview',
      type: 'boolean',
      initialValue: true,
    },
  ],
  blockEditor: {
    icon: BiDoorOpen,
    render: EntryLink,
  },
};

function EntryLink({ children }) {
  return (
    <span style={{ color: 'rebeccapurple', background: 'white' }}>
      {children}
    </span>
  );
}
