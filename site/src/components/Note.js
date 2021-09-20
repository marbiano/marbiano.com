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
    color: '$blue',
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
  color: 'hsl(208 35% 47% / 0.5)',
  background: 'transparent',
  borderRadius: 3,
  transition: 'all 200ms ease-out',

  '&:hover': {
    color: 'hsl(208 85% 47% / 1)',
    background: 'hsl(208 37% 62% / 0.1)',
  },
});

const Title = styled('h2', {
  margin: 0,
  fontSize: rem(21),
  fontWeight: '700',
  color: '$black30',
  cursor: 'pointer',

  '&.is-expanded': {
    color: '$black85',
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
