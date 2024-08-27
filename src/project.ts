import {makeProject} from '@motion-canvas/core';

import polarCode from './scenes/polar-code?scene';
import polarDemo from './scenes/polar-demo?scene';

import './global.css';

export default makeProject({
  scenes: [
    polarCode,
    polarDemo,
  ],
});
