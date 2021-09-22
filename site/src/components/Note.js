import * as React from 'react';

import Close from '@assets/close.svg';
import { styled } from '@styles/stitches.config';
import { rem } from '@styles/tokens';

const Wrapper = styled('div', {
  width: '30em',
  maxHeight: '47vh',
  position: 'relative',

  '&:after': {
    content: '',
    display: 'none',
    pointerEvents: 'none',
    position: 'absolute',
    bottom: 1,
    left: 1,
    right: 16,
    height: 40,
    background: 'linear-gradient(0deg, $white, $white 33%, transparent)',
  },

  '&.is-expanded:after': {
    display: 'block',
  },
});

const Container = styled('div', {
  backdropFilter: 'blur(7px) brightness(1)',
  border: '1.5px solid',
  background: 'linear-gradient(200deg, $white60, $white90 50vh, $white 90%)',
  borderColor: '$white30 $white30 $white50 $white70',
  boxShadow: 'inset 0 0 1em -0.3em $paper',
  fontSize: '16px',
  fontFamily: '$sans',
  lineHeight: '1.85',
  width: '100%',
  maxHeight: '47vh',
  overflowY: 'auto',
  padding: '1.5rem 3rem',
  borderRadius: 3,
  color: '$black75',

  '& a': {
    color: '$paleBlue',
    '&:hover': {
      color: '$blue',
    },
  },

  '&::-webkit-scrollbar': {
    width: 10,
  },

  '&::-webkit-scrollbar-track': {
    backgroundColor: '$black05',
    borderRadius: 3,
  },

  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '$lightGreen',
    borderRadius: 3,
    border: '1px solid $black05',
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
  fontSize: rem(20),
  fontWeight: '600',
  color: '$black50',
  cursor: 'pointer',
  flex: 1,
  transition: 'color 200ms',

  '.is-expanded &': {
    color: '$black90',
  },
});

export default function Note({ title, onRemove, children }) {
  const [isExpanded, setIsExpanded] = React.useState(true);

  return (
    <Wrapper className={isExpanded ? 'is-expanded' : ''}>
      <Container>
        <Header>
          <Title onClick={() => setIsExpanded((prev) => !prev)}>{title}</Title>
          <CloseAction onClick={onRemove}>
            Remove
            <CloseIcon />
          </CloseAction>
        </Header>
        {isExpanded && children}
      </Container>
    </Wrapper>
  );
}
