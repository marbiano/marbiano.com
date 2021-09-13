import {
  createImageUrlBuilder,
  createPortableTextComponent,
  createPreviewSubscriptionHook,
} from 'next-sanity';
import config from './config';

export const urlForImage = (source) =>
  createImageUrlBuilder(config).image(source).auto('format').fit('max');

export const usePreviewSubscription = createPreviewSubscriptionHook(config);

export const PortableText = createPortableTextComponent({
  ...config,
});
