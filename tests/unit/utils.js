// import ResizeObserver from 'resize-observer-polyfill'

class ResizeObserver {
  observe() {
    // do nothing
  }
  unobserve() {
    // do nothing
  }
  disconnect() {
    // do nothing
  }
}

// window.ResizeObserver = ResizeObserver;
// export default ResizeObserver;
export function addResizeObserver() {
  window.ResizeObserver = ResizeObserver
}
