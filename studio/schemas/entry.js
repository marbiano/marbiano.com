import link from './annotations/link';
import entryLink from './annotations/entry-link';

export default {
  title: 'Entry',
  name: 'entry',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (rule) => rule.required(),
    },
    {
      title: 'Tagline',
      name: 'tagline',
      type: 'string',
    },
    {
      title: 'Cover',
      name: 'cover',
      type: 'object',
      fields: [
        {
          title: 'Type',
          name: 'type',
          type: 'string',
          options: {
            list: [
              { title: 'Image', value: 'image' },
              { title: 'Solid', value: 'solid' },
            ],
          },
          initialValue: 'image',
        },
        {
          title: 'Image',
          name: 'image',
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt',
              options: {
                isHighlighted: true,
              },
            },
          ],
          hidden: ({ parent }) => parent.type === 'solid',
        },
        {
          title: 'Color',
          name: 'color',
          type: 'colorPicker',
          hidden: ({ parent }) => parent.type === 'image',
        },
      ],
    },
    {
      title: 'Body',
      name: 'body',
      type: 'array',
      of: [
        {
          type: 'block',
          marks: {
            annotations: [link, entryLink],
          },
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
        },
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt',
              options: {
                isHighlighted: true,
              },
            },
          ],
        },
        {
          type: 'codeBlock',
        },
        {
          type: 'youtubeEmbed',
        },
      ],
      validation: (rule) => rule.required(),
    },
    {
      title: 'Preview',
      name: 'preview',
      type: 'array',
      of: [
        {
          type: 'block',
          marks: {
            annotations: [link],
          },
        },
      ],
    },
  ],
};
