import * as React from 'react';
import { gsap } from 'gsap';
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
      <div className="container">
        <Canvas artMode={artMode} />
        <h1 ref={titleRef}>
          <span className="name">Martin Bavio</span>
          <span className="role">, web developer.</span>
        </h1>
        <div className="tagline" ref={tagLineRef}>
          what can you do with less?
        </div>
        {!artMode && (
          <button
            type="button"
            onClick={() => setArtMode(!artMode)}
            className="cta"
          >
            Play
          </button>
        )}
      </div>
    </>
  );
}
