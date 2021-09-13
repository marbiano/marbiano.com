import * as React from 'react';
import { gsap } from 'gsap';

import { styled } from '@styles/stitches.config';

import Canvas from '@components/Canvas';
import SiteHead from '@components/SiteHead';

export default function HomePage() {
  const [artMode, setArtMode] = React.useState(false);
  const titleRef = React.useRef(null);
  const tagLineRef = React.useRef(null);

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
          <Name>Martin Bavio</Name>
          <Role>, UI Engineer.</Role>
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
  fontWeight: 'bold',
});

const Role = styled('span', {
  fontFamily: '$serif',
  fontStyle: 'italic',
  fontSize: '1.4rem',
});

const Tagline = styled(Role, {
  display: 'none',
});

const Button = styled('button', {
  display: 'block',
  position: 'absolute',
  top: '1rem',
  right: '1rem',
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.5)',
  color: 'rgba(255, 255, 255, 0.75)',
  borderRadius: '3px',
  cursor: 'pointer',
  transition: 'background 200ms, color 200ms',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  padding: '1em 2em',

  '&:hover': {
    background: 'rgba(255, 255, 255, 1)',
    color: 'rgba(0, 0, 0, 0.8)',
  },
});
