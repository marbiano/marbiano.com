import { useEffect, useRef, useCallback } from 'react';
import classnames from 'classnames';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/dist/Draggable';
import styles from './styles.module.css';
import useClickOutside from '@/lib/useClickOutside';

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
  const draggableInstance = useRef(null);
  const rotableInstance = useRef(null);
  const artEl = useRef(null);
  const knobEl = useRef(null);

  const setDraggable = useCallback(
    function (event) {
      const isRotation = this.vars.type === 'rotation';
      const isKnob = event.target === knobEl.current;

      if (artEl.current.contains(event.target)) {
        onSelect(artEl.current);
      }

      if (isKnob) {
        if (!isRotation) {
          draggableInstance.current.disable();
          rotableInstance.current.enable().startDrag(event);
        }
      } else if (isRotation) {
        rotableInstance.current.disable();
        draggableInstance.current.enable().startDrag(event);
      }
    },
    [onSelect],
  );

  useEffect(() => {
    gsap.registerPlugin(Draggable);
    if (draggableInstance.current === null) {
      draggableInstance.current = new Draggable(artEl.current, {
        onPress: setDraggable,
        zIndexBoost: false,
      });
    }
    if (rotableInstance.current === null) {
      rotableInstance.current = new Draggable(artEl.current, {
        type: 'rotation',
        trigger: knobEl.current,
        onPress: setDraggable,
        zIndexBoost: false,
      });
    }
    if (active) {
      draggableInstance.current.enable();
      rotableInstance.current.enable();
    } else {
      onSelect(null);
      draggableInstance.current.disable();
      rotableInstance.current.disable();
    }
  }, [active, onSelect, setDraggable]);

  useClickOutside(
    artEl,
    useCallback(() => onSelect(null), [onSelect]),
  );

  return (
    <div
      ref={artEl}
      className={classnames(
        className,
        active && selected === artEl.current
          ? styles.selected
          : styles.container,
      )}
      style={{ color: active ? activeColor || color : color }}
    >
      {children}
      {active && selected === artEl.current && (
        <div className={styles.knob} ref={knobEl} />
      )}
    </div>
  );
};

export default CanvasElement;
