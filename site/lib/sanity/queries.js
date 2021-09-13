import { groq } from 'next-sanity';

const entryFields = groq`
  _id,
  title,
  tagline,
  "cover": cover.image,
  "slug": slug.current,
  body[]{
    ...,
    markDefs[]{
      ...,
      _type == "entryLink" => {
        "slug": @.entry->slug.current,
      }
    }
  }
`;

export const getEntriesSlugs = groq`
  *[_type == "entry" && defined(slug.current)][].slug.current
`;

export const getEntryBySlug = groq`
  *[_type == "entry" && slug.current == $slug][0] {
    ${entryFields}
  }
`;

export const getEntriesBySlug = groq`
  *[_type == "entry" && slug.current == $slug] {
    ${entryFields}
  }
`;

export const getEntriesPreviewsBySlug = groq`
  *[_type == "entry" && slug.current == $slug] {
    _id,
    title,
    preview
  }
`;
