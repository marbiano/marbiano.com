import * as React from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/dist/Draggable';
import useClickOutside from '@hooks/use-click-outside';

export default function useCanvasElement({ active, onSelect }) {
  const draggableInstance = React.useRef(null);
  const rotableInstance = React.useRef(null);
  const rootEl = React.useRef(null);
  const rotateEl = React.useRef(null);

  const setDraggable = React.useCallback(
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

  React.useEffect(() => {
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
    React.useCallback(() => onSelect(null), [onSelect]),
  );

  return React.useMemo(() => {
    return {
      rootEl,
      rotateEl,
    };
  }, [rootEl, rotateEl]);
}
