import * as React from 'react';
import cx from 'classnames';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/dist/CustomEase';
import { CustomWiggle } from 'gsap/dist/CustomWiggle';

import useCanvasElement from '@hooks/use-canvas-element';

import styles from './styles.module.css';

export default function CanvasElement({
  color,
  activeColor,
  active = false,
  className,
  selected,
  onSelect,
  children,
}) {
  const { rootEl, rotateEl } = useCanvasElement({ active, onSelect });

  React.useEffect(() => {
    gsap.registerPlugin(CustomEase, CustomWiggle);
    CustomWiggle.create('xEase', { type: 'uniform', wiggles: 20 });
    CustomWiggle.create('yEase', { type: 'uniform', wiggles: 16 });
    CustomWiggle.create('rotationEase', { type: 'uniform', wiggles: 14 });
    const tl = gsap.timeline({ paused: true });
    tl.to(rootEl.current, { x: '+=2', ease: 'xEase', duration: 0.5 });
    tl.to(rootEl.current, { y: '+=3', ease: 'yEase', duration: 0.5 }, '<');
    tl.to(
      rootEl.current,
      {
        rotation: 2,
        ease: 'rotationEase',
        duration: 0.5,
      },
      '<',
    );
    tl.to(
      rootEl.current,
      {
        color: activeColor,
        rotate:
          (Math.random() < 0.5 ? -1 : 1) *
            Math.floor(Math.random() * (30 - 5)) +
          5,
        duration: 1,
        ease: 'elastic.out(1, 0.3)',
      },
      '>-0.2',
    );
    if (active) {
      tl.play();
    }
  }, [active, rootEl, activeColor]);

  return (
    <div
      ref={rootEl}
      className={cx(
        className,
        active && selected === rootEl.current
          ? styles.selected
          : styles.container,
      )}
      style={{ color }}
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
}
