import * as React from 'react';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/dist/CustomEase';
import { CustomWiggle } from 'gsap/dist/CustomWiggle';

import useCanvasElement from '@hooks/use-canvas-element';
import { styled } from '@styles/stitches.config';

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

  const isSelected = active && selected === rootEl.current;

  return (
    <Container
      ref={rootEl}
      className={className}
      style={{ color }}
      selected={isSelected}
    >
      {children}
      {active && <Knob ref={rotateEl} visible={isSelected} />}
    </Container>
  );
}

const Container = styled('div', {
  border: '1px dashed transparent',
  position: 'relative',
  variants: {
    selected: {
      true: {
        borderColor: '$black50',
      },
    },
  },
});

const Knob = styled('div', {
  width: 12,
  height: 12,
  background: '$black50',
  border: '1px solid $white',
  position: 'absolute',
  top: 0,
  right: 0,
  zIndex: 100,
  transform: 'translate(50%, -50%)',
  display: 'none',
  variants: {
    visible: {
      true: {
        display: 'block',
      },
    },
  },
});
