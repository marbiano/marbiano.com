import Image from 'next/image';

import { urlForImage } from '@lib/sanity/client';

export default function Cover({ image }) {
  return (
    <Image
      width={1000}
      height={1000}
      alt={image.alt}
      src={urlForImage(image).width(1000).height(1000).url()}
    />
  );
}
