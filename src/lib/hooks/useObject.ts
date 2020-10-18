import { useRef, useCallback, useEffect, useMemo } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/dist/Draggable';
import useClickOutside from '@/lib/hooks/useClickOutside';

interface useObjectableProps {
  active: boolean;
  onSelect: CallableFunction;
}

const useObject = ({ active, onSelect }: useObjectableProps) => {
  const draggableInstance = useRef(null);
  const rotableInstance = useRef(null);
  const rootEl = useRef(null);
  const rotateEl = useRef(null);

  const setDraggable = useCallback(
    function (event) {
      const isRotation = this.vars.type === 'rotation';
      const isRotateEl = event.target === rotateEl.current;

      if (rootEl.current.contains(event.target)) {
        onSelect(rootEl.current);
      }

      if (isRotateEl) {
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
      draggableInstance.current = new Draggable(rootEl.current, {
        onPress: setDraggable,
        zIndexBoost: false,
      });
    }
    if (rotableInstance.current === null) {
      rotableInstance.current = new Draggable(rootEl.current, {
        type: 'rotation',
        trigger: rotateEl.current,
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
    rootEl,
    useCallback(() => onSelect(null), [onSelect]),
  );

  return useMemo(() => {
    return {
      rootEl,
      rotateEl,
    };
  }, [rootEl, rotateEl]);
};

export default useObject;
