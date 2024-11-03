// eslint-disable-next-line @typescript-eslint/no-explicit-any
function debounce<T extends (...args: any[]) => any>(
  func: T,
  timeout: number = 300,
): (...args: Parameters<T>) => void {
  let timer: number | null = null;

  return (...args: Parameters<T>) => {
    if (timer !== null) {
      clearTimeout(timer);
    }

    timer = window.setTimeout(() => {
      func(...args);
      timer = null;
    }, timeout);
  };
}

export default debounce;
