export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number,
  options: { leading?: boolean } = {},
): (...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout | null = null;
  let lastArgs: Parameters<T> | null = null;

  // 清理函数
  const cleanup = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  // 实际执行的函数
  const debouncedFunction = function (this: any, ...args: Parameters<T>) {
    lastArgs = args;

    cleanup();

    // 是否立即执行
    if (options.leading && !timer) {
      func.apply(this, args);
      return;
    }

    timer = setTimeout(() => {
      if (lastArgs) {
        func.apply(this, lastArgs);
        lastArgs = null;
      }
      cleanup();
    }, delay);
  };

  // 添加取消方法
  debouncedFunction.cancel = cleanup;

  return debouncedFunction;
}
