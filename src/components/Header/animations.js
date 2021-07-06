import { keyframes } from 'styled-components/macro';

export const background = keyframes`
  to {
    background: #222;
  }
`;

export const fadeout = keyframes`
  to {
    opacity: 0;
  }
`;

export const fadein = keyframes`
  to {
    opacity: 100%;
    color: goldenrod;
    font-weight: 700;
    text-shadow: 0.05em 0.02em 0.05em #000;
  }
`;

export const glitch = keyframes`
  0% {
    /* background-position: 0% 50%; */
    background-size: 200% 200%;
    clip-path: polygon(-50% 100%, 100% 100%, -100% 50%, 100% 0%);
    left: 40%;
  }

  10% {
    left: 37%;
    clip-path: polygon(-50% 100%, 100% 100%, -100% 50%, 100% 0%);
  }

  11% {
    clip-path: polygon(0% -54%, 3% -66%, 0% 60%, 10% 05%);
  }

  23% {
    // left: 53%;
    clip-path: polygon(0% -54%, 3% -66%, 0% 60%, 10% 05%);
  }

  25% {
    // left: 55%;
    clip-path: polygon(-50% 100%, 100% 100%, -100% 50%, 100% -50%);
  }

  34% {
    // left: 48%;
    clip-path: polygon(-50% 100%, 100% 100%, -100% 50%, 100% -50%);
  }

  35% {
    clip-path: polygon(-50% 100%, 870% -40%, -100% 50%, 100% -50%);
  }

  50% {
    background-position: 100% 50%;
    background-size: 200% 200%;
    clip-path: polygon(-50% 100%, 870% -40%, -100% 50%, 100% -50%);
  }

  51% {
    // right: 22px;
    clip-path: polygon(-20% -100%, 870% -40%, -100% 50%, 100% -50%);
  }

  71% {
    top: 48%;
    clip-path: polygon(-20% -100%, 870% -40%, -100% 50%, 100% -50%);
  }

  72% {
    clip-path: polygon(100% 50%, -100% 0%, -100% 0%, 0% -50%);
  }

  80% {
    clip-path: polygon(100% 50%, -100% 0%, -100% 0%, 0% -50%);
  }

  81% {
    clip-path: polygon(0% 1%, 25% 36%, -31% 29%, 40% 0%);
  }

  84% {
    clip-path: polygon(0% 1%, 25% 36%, -31% 29%, 40% 0%);
  }

  85% {
    clip-path: polygon(-1% 0%, 0% 0%, 50% 0%, 0% 50%);
  }

  95% {
    clip-path: polygon(-1% 0%, 0% 0%, 50% 0%, 0% 50%);
  }

  96% {
    clip-path: polygon(100% 50%, -100% 0%, -100% 0%, 0% -50%);
  }

  100% {
    clip-path: polygon(100% 50%, -100% 0%, -100% 0%, 0% -50%);
    background-position: 0% 50%;
    background-size: 200% 200%;
  }
`;
