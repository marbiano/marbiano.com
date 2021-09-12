import * as React from 'react';

import CanvasElement from '@components/CanvasElement';

import styles from './styles.module.css';

const logoParts = [
  {
    key: 'gimli',
    component: <Gimli />,
    className: styles.gimli,
    activeColor: '#ff0532',
  },
  {
    key: 'aragorn',
    component: <Aragorn />,
    className: styles.aragorn,
    activeColor: '#054bff',
  },
  {
    key: 'legolas',
    component: <Legolas />,
    className: styles.legolas,
  },
];

export default function Canvas({ artMode = false }) {
  const [selectedEl, setSelectedEl] = React.useState(null);

  return (
    <div className={styles.logo}>
      {logoParts.map((part) => (
        <CanvasElement
          key={part.key}
          color="#ffdb05"
          activeColor={part.activeColor}
          active={artMode}
          selected={selectedEl}
          onSelect={setSelectedEl}
          className={part.className}
        >
          {part.component}
        </CanvasElement>
      ))}
    </div>
  );
}

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
