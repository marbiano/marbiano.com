import * as React from 'react';

import Close from '@assets/close.svg';
import { styled } from '@styles/stitches.config';
import { rem } from '@styles/tokens';

const Container = styled('div', {
  backdropFilter: 'blur(7px) brightness(1)',
  border: '1.5px solid',
  background: 'linear-gradient(200deg, $white60, $white90 50vh, $white 90%)',
  borderColor: '$white30 $white30 $white50 $white70',
  boxShadow: 'inset 0 0 1em -0.3em $paper',
  fontSize: '16px',
  fontFamily: '$sans',
  lineHeight: '1.85',
  width: '30em',
  position: 'relative',
  padding: '2rem 3rem',
  borderRadius: 3,
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
    color: '$black60',
    background: '$black05',
  },
});

const Title = styled('h2', {
  margin: 0,
  fontFamily: '$serif',
  fontSize: rem(25),
  fontWeight: '600',
  color: '$black40',
  cursor: 'pointer',
  flex: 1,
  transition: 'color 200ms',

  '&.is-expanded': {
    color: '$black90',
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
