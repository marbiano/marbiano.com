import * as React from 'react';

export default {
  title: 'Link',
  name: 'link',
  type: 'object',
  fields: [
    {
      title: 'URL',
      name: 'href',
      type: 'url',
    },
  ],
  blockEditor: {
    render: Link,
  },
};

function Link({ children }) {
  return <span style={{ color: 'blue', background: 'white' }}>{children}</span>;
}
