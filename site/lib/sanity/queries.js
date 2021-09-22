import { groq } from 'next-sanity';

const entryFields = groq`
  _id,
  title,
  tagline,
  "cover": cover.image,
  "slug": slug.current,
  'updatedAt': _updatedAt,
  body[]{
    ...,
    markDefs[]{
      ...,
      _type == "entryLink" => {
        "title": @.entry->title,
        "slug": @.entry->slug.current,
        "body": select(defined(@.entry->mini) => @.entry->mini, @.entry->body[0..4]),
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
