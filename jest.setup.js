require('@testing-library/jest-dom');

class IntersectionObserverMock {
  constructor(callback, options) {}
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.IntersectionObserver = IntersectionObserverMock;
