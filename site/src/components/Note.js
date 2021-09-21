import * as React from 'react';

import Close from '@assets/close.svg';
import { styled } from '@styles/stitches.config';
import { rem } from '@styles/tokens';

const Container = styled('div', {
  fontSize: '16px',
  fontFamily: '$sans',
  lineHeight: '1.85',
  width: '30em',
  background: 'hsl(120 6% 99% / .95)',
  position: 'relative',
  padding: '2rem 3rem',
  borderRadius: '2px',
  color: '$black75',

  '& a': {
    color: '$paleBlue',
    '&:hover': {
      color: '$blue',
    },
  },
});

const Header = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const CloseAction = styled('button', {
  border: 0,
  background: 'transparent',
  fontSize: 0,
  cursor: 'pointer',
  marginRight: -28,
});

const CloseIcon = styled(Close, {
  width: 28,
  padding: 8,
  color: '$black30',
  background: 'transparent',
  borderRadius: 3,
  transition: 'all 200ms',

  '&:hover': {
    color: '$black75',
    background: '$lightGreen30',
  },
});

const Title = styled('h2', {
  margin: 0,
  fontSize: rem(21),
  fontWeight: '700',
  color: '$lightGreen',
  cursor: 'pointer',
  flex: 1,

  '&.is-expanded': {
    color: '$black75',
  },
});

export default function Note({ title, onRemove, children }) {
  const [isExpanded, setIsExpanded] = React.useState(true);

  return (
    <Container>
      <Header>
        <Title
          onClick={() => setIsExpanded((prev) => !prev)}
          className={isExpanded ? 'is-expanded' : ''}
        >
          {title}
        </Title>
        <CloseAction onClick={onRemove}>
          Remove
          <CloseIcon />
        </CloseAction>
      </Header>
      {isExpanded && children}
    </Container>
  );
}
