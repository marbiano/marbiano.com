import { styled } from './stitches.config';

export const Fixed = styled('div', {
  position: 'fixed',
  top: 'var(--fixedTop, 1rem)',
  left: 'var(--fixedLeft, 1rem)',
});
