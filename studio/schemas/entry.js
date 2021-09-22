import link from './annotations/link';
import entryLink from './annotations/entry-link';

export default {
  title: 'Entry',
  name: 'entry',
  type: 'document',
  fieldsets: [
    {
      name: 'main',
      title: 'Main',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'text',
      title: 'Text',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'extra',
      title: 'Extra',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      fieldset: 'main',
      validation: (rule) => rule.required(),
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      fieldset: 'main',
      options: {
        source: 'title',
      },
      validation: (rule) => rule.required(),
    },
    {
      title: 'Tagline',
      name: 'tagline',
      type: 'string',
      fieldset: 'main',
    },
    {
      title: 'Body',
      name: 'body',
      type: 'array',
      fieldset: 'text',
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
        {
          type: 'quote',
        },
      ],
      validation: (rule) => rule.required(),
    },
    {
      title: 'Mini',
      name: 'mini',
      type: 'array',
      of: [
        {
          type: 'block',
          marks: {
            annotations: [link],
          },
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H3', value: 'h3' },
          ],
        },
      ],
      fieldset: 'text',
    },
    {
      title: 'Cover',
      name: 'cover',
      type: 'object',
      fieldset: 'extra',
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
  ],
};
