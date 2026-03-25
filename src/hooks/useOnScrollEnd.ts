import { useEffect, useRef } from 'react';

const useOnScrollEnd = (args: UseOnScrollEndArgs) => {
  const { onScrollEnd, direction, disable } = args;
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scrollElement = scrollRef.current;

    const checkScrollEndReached = () => {
      if (!scrollElement || disable) return;

      const clientHeight = scrollElement.clientHeight;
      const scrollTop = scrollElement.scrollTop;
      const scrollHeight = scrollElement.scrollHeight;

      const distance = direction === 'up' ? scrollTop : scrollHeight - clientHeight - scrollTop;

      if (Math.abs(distance) < 150) onScrollEnd();
    };

    if (scrollElement) {
      scrollElement.addEventListener('scroll', checkScrollEndReached);
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', checkScrollEndReached);
      }
    };
  }, [onScrollEnd, direction, disable]);

  return { scrollRef };
};

export default useOnScrollEnd;

export interface UseOnScrollEndArgs {
  onScrollEnd: () => void;
  direction: 'up' | 'down';
  disable: boolean;
}
