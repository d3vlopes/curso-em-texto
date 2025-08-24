import { renderHook } from '@testing-library/react';
import { vitest } from 'vitest';

import { useMediaQuery } from '.';

describe('useMediaQuery', () => {
  const addEventListenerMock = vitest.fn();
  const removeEventListenerMock = vitest.fn();

  beforeEach(() => {
    addEventListenerMock.mockClear();
    removeEventListenerMock.mockClear();
  });

  function setupMatchMedia(matches: boolean) {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: (query: string) => ({
        matches,
        media: query,
        onchange: null,
        addEventListener: addEventListenerMock,
        removeEventListener: removeEventListenerMock,
        addListener: vitest.fn(),
        removeListener: vitest.fn(),
        dispatchEvent: vitest.fn(),
      }),
    });
  }

  it('should return true if media query matches', () => {
    setupMatchMedia(true);

    const { result } = renderHook(() => useMediaQuery('(max-width: 767px)'));

    expect(result.current).toBe(true);
  });

  it('should return false if media query does not match', () => {
    setupMatchMedia(false);

    const { result } = renderHook(() => useMediaQuery('(max-width: 767px)'));

    expect(result.current).toBe(false);
  });
});
