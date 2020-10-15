import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/dist/Draggable';
import Logo from '@/components/Logo';

const IndexPage: React.FC = () => {
  const logoRef = useRef();

  useEffect(() => {
    gsap.registerPlugin(Draggable);
    Draggable.create('#el-1', {
      zIndexBoost: false,
    });
    Draggable.create('#el-2', {
      zIndexBoost: false,
    });
    Draggable.create('#el-3', {
      zIndexBoost: false,
    });
  }, []);

  return (
    <div className="container">
      <Logo />
      {/* <img
        src="/logo1.svg"
        alt="Marbiano logo"
        className="logo"
        ref={logoRef.current}
        id="logo"
      /> */}
      <h1>
        <span className="name">Martin Bavio</span>
        <span className="role">, web developer.</span>
      </h1>
    </div>
  );
};

export const config = { unstable_runtimeJS: false };

export default IndexPage;
