import * as React from 'react';
import cx from 'classnames';

import CanvasElement from '@components/CanvasElement';
import { css, styled } from '@styles/stitches.config';

export default function Canvas({ artMode = false }) {
  const [selectedEl, setSelectedEl] = React.useState(null);

  return (
    <Logo>
      {logoParts.map((part) => {
        const Component = part.component;
        return (
          <CanvasElement
            key={part.key}
            color="#ffdb05"
            activeColor={part.activeColor}
            active={artMode}
            selected={selectedEl}
            onSelect={setSelectedEl}
            className={part.className}
          >
            <Component />
          </CanvasElement>
        );
      })}
    </Logo>
  );
}

const Logo = styled('div', {
  display: 'flex',
  alignItems: 'flex-end',
  '--gimli-width': '43px',
  '--gimli-to-aragorn-ratio': 3.217,
  '--gimli-to-legolas-ratio': 1.63,
});

function Gimli() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46.21 72.24">
      <path
        d="M0,72.24C15.07,43.42,24.2,20.43,32.62,0h5.16c1.49,23,4.07,42.73,8.43,72.24Z"
        fill="currentColor"
      />
    </svg>
  );
}

function Aragorn() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 148.15 232.8">
      <polygon
        points="0 0 70.4 0 148.15 167.07 113.34 232.8 109.28 232.8 0 0"
        fill="currentColor"
      />
    </svg>
  );
}

function Legolas() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 74.77 229.84">
      <polygon
        points="0 0 65.64 0 74.77 229.84 9.12 229.84 0 0"
        fill="currentColor"
      />
    </svg>
  );
}

const blockCss = css({
  display: 'block',
  color: '#ffdb05',
  position: 'relative',
  '& svg': {
    width: '100%',
    overflow: 'visible',
  },
});

const gimliCss = css({
  width: 'var(--gimli-width)',
  transform: 'translate(1.5%, -0.75%)',
  zIndex: 3,
  '& [data-corner]': {
    borderRadius: '50%',
    background: 'rgba(3, 169, 244, 0.3)',
    border: '1px solid rgba(3, 169, 244, 0.6)',
    transition: 'background 0.1s ease-out',
    width: 10,
    height: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    '&:hover': {
      background: 'rgba(3, 169, 244, 0.6)',
    },
  },
});

const aragornCss = css({
  width: 'calc(var(--gimli-width) * var(--gimli-to-aragorn-ratio))',
  transform: 'translate(-20%, 0)',
  zIndex: 2,
  '& svg': {
    width: '100%',
    overflow: 'visible',
  },
});

const legolasCss = css({
  width: 'calc(var(--gimli-width) * var(--gimli-to-legolas-ratio))',
  transform: 'translate(1.5%, -1%)',
  zIndex: 1,
});

const logoParts = [
  {
    key: 'gimli',
    activeColor: '#ff0532',
    className: cx(blockCss(), gimliCss()),
    component: Gimli,
  },
  {
    key: 'aragorn',
    activeColor: '#054bff',
    className: cx(blockCss(), aragornCss()),
    component: Aragorn,
  },
  {
    key: 'legolas',
    className: cx(blockCss(), legolasCss()),
    component: Legolas,
  },
];
