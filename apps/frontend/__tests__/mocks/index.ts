/* eslint-disable @typescript-eslint/no-explicit-any */
import { vitest } from 'vitest';

global.IntersectionObserver = class IntersectionObserver {
  observe() {
    return null;
  }

  disconnect() {
    return null;
  }

  unobserve() {
    return null;
  }
} as any;

vitest.mock('next/navigation', () => ({
  useRouter: vitest.fn(),
  usePathname: vitest.fn(),
}));

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: query === '(max-width: 767px)' ? window.innerWidth <= 767 : false,
    media: query,
    onchange: null,
    addEventListener: vitest.fn(),
    removeEventListener: vitest.fn(),
    addListener: vitest.fn(),
    removeListener: vitest.fn(),
    dispatchEvent: vitest.fn(),
  }),
});
