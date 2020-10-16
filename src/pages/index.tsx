import { useState } from 'react';
import { EyeClosedIcon, EyeOpenIcon } from '@modulz/radix-icons';
import Canvas from '@/components/Canvas';

const IndexPage: React.FC = () => {
  const [artMode, setArtMode] = useState(false);
  return (
    <div className="container">
      <Canvas artMode={artMode} />
      <h1>
        {artMode ? (
          <span className="tagline">what can you do with less?</span>
        ) : (
          <>
            <span className="name">Martin Bavio</span>
            <span className="role">, web developer.</span>
          </>
        )}
      </h1>
      <button
        type="button"
        onClick={() => setArtMode(!artMode)}
        className="cta"
      >
        {artMode ? <EyeOpenIcon /> : <EyeClosedIcon />}
      </button>
    </div>
  );
};

export default IndexPage;
