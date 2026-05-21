const fs = require('fs');
const path = require('path');

const css = `/**
 * @ui-platform/ui
 * Component styles - imports design tokens
 */

@import '@ui-platform/design-tokens/css';

/* Animation keyframes */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Base component utilities */
@layer components {
  .animate-spin {
    animation: spin 1s linear infinite;
  }
  
  .animate-in {
    animation-duration: var(--duration-200);
    animation-timing-function: var(--easing-out);
    animation-fill-mode: both;
  }
  
  .animate-out {
    animation-duration: var(--duration-150);
    animation-timing-function: var(--easing-in);
    animation-fill-mode: both;
  }
  
  .fade-in-0 {
    animation-name: fadeIn;
  }
  
  .fade-out-0 {
    animation-name: fadeOut;
  }
  
  .zoom-in-95 {
    animation-name: zoomIn95;
  }
  
  .zoom-out-95 {
    animation-name: zoomOut95;
  }
  
  .slide-in-from-top-2 {
    animation-name: slideInFromTop2;
  }
  
  .slide-in-from-bottom-full {
    animation-name: slideInFromBottomFull;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes zoomIn95 {
  from {
    transform: scale(0.95);
  }
  to {
    transform: scale(1);
  }
}

@keyframes zoomOut95 {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0.95);
  }
}

@keyframes slideInFromTop2 {
  from {
    transform: translateY(-0.5rem);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes slideInFromBottomFull {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
`;

const distDir = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

fs.writeFileSync(path.join(distDir, 'styles.css'), css);
console.log('✓ Generated styles.css');
