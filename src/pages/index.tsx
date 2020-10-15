import { useEffect } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/dist/Draggable';
import Logo from '@/components/Logo';

const IndexPage: React.FC = () => {
  useEffect(() => {
    gsap.registerPlugin(Draggable);
    Draggable.create('#el-1');
    Draggable.create('#el-2');
    Draggable.create('#el-3');
  }, []);

  return (
    <div className="container">
      <Logo />
      <h1>
        <span className="name">Martin Bavio</span>
        <span className="role">, web developer.</span>
      </h1>
    </div>
  );
};

export default IndexPage;
