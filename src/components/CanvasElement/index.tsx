import classnames from 'classnames';
import { gsap } from 'gsap';
import useObject from '@/lib/hooks/useObject';
import styles from './styles.module.css';
import { useEffect } from 'react';

interface CanvasElementProps {
  color: string;
  activeColor?: string;
  active?: boolean;
  className?: string;
  selected?: HTMLElement;
  onSelect?: CallableFunction;
}

const CanvasElement: React.FC<CanvasElementProps> = ({
  color,
  activeColor,
  active = false,
  className,
  selected,
  onSelect,
  children,
}) => {
  const { rootEl, rotateEl } = useObject({ active, onSelect });

  useEffect(() => {
    const tl = gsap.timeline();
    if (active) {
      tl.to(
        rootEl.current,
        {
          rotation: 20,
          duration: 0.5,
          ease: 'back.inOut(10)',
        },
        '>',
      );
    }
  }, [active, rootEl]);

  return (
    <div
      ref={rootEl}
      className={classnames(
        className,
        active && selected === rootEl.current
          ? styles.selected
          : styles.container,
      )}
      style={{ color: active ? activeColor || color : color }}
    >
      {children}
      {active && (
        <div
          className={styles.knob}
          ref={rotateEl}
          style={{ display: selected === rootEl.current ? 'block' : 'none' }}
        />
      )}
    </div>
  );
};

export default CanvasElement;
