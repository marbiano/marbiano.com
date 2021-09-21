import * as React from 'react';
import { gsap } from 'gsap';

import { styled } from '@styles/stitches.config';

import Canvas from '@components/Canvas';
import SiteHead from '@components/SiteHead';

const ROLES = ['web developer', 'UI Engineer', 'frontend nerd'];

export default function HomePage() {
  const [artMode, setArtMode] = React.useState(false);
  const [role, setRole] = React.useState('');
  const titleRef = React.useRef(null);
  const tagLineRef = React.useRef(null);

  React.useEffect(() => {
    setRole(ROLES[Math.floor(Math.random() * ROLES.length)]);
  }, []);

  React.useEffect(() => {
    const tl = gsap.timeline({ paused: true, delay: 0.2 });
    tl.fromTo(
      titleRef.current,
      { opacity: 1, y: 0 },
      { opacity: 0, y: 30, ease: 'circ.Out' },
    );
    tl.fromTo(
      tagLineRef.current,
      { opacity: 0, y: -40, display: 'block' },
      { opacity: 1, y: -20, ease: 'circ.In' },
      '>-0.3',
    );
    if (artMode) {
      tl.play();
    }
  }, [artMode]);

  return (
    <>
      <SiteHead title="Martin Bavio, web developer." />
      <Container>
        <Canvas artMode={artMode} />
        <Heading ref={titleRef}>
          <Name as="a" href="https://twitter.com/marbiano3">
            Martin Bavio
          </Name>
          {role && (
            <Role>
              , <span>{role}</span>.
            </Role>
          )}
        </Heading>
        <Tagline ref={tagLineRef}>what can you do with less?</Tagline>
        {!artMode && (
          <Button type="button" onClick={() => setArtMode(!artMode)}>
            Play
          </Button>
        )}
      </Container>
    </>
  );
}

const Container = styled('div', {
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const Heading = styled('h1', {
  fontWeight: '400',
  fontSize: '1.4rem',
  margin: '3rem 0 0',
});

const Name = styled('span', {
  textDecoration: 'none',
  color: '$black90',
  display: 'inline-block',
  padding: '3px',
  '&:hover': {
    color: '#00acee',
  },
});

const Role = styled('span', {
  fontFamily: '$serif',
  fontStyle: 'italic',
  fontSize: '1.4rem',
  color: '$black75',
  '& span': {
    display: 'inline-block',
    paddingLeft: '2px',
  },
});

const Tagline = styled(Role, {
  display: 'none',
  zIndex: '-1',
});

const Button = styled('button', {
  display: 'block',
  position: 'absolute',
  top: '1rem',
  right: '1rem',
  background: '$white',
  color: '$black75',
  border: 0,
  borderRadius: '3px',
  cursor: 'pointer',
  transition: 'background 200ms, color 200ms',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  padding: '1em 2em',

  '&:hover': {
    background: '$black',
    color: '$white',
  },
});
