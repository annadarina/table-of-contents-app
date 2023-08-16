type DebounceFunction = (func: (...args: any[]) => void, delay: number) => (...args: any[]) => void;

export const debounce: DebounceFunction = (func, delay = 300) => {
  let timeoutId: NodeJS.Timeout;

  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};