import { useEffect, useRef } from 'react';

const useOnScrollEnd = (args: UseOnScrollEndArgs) => {
  const { onScrollEnd, direction, disable } = args;
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || disable) return;

    const handleScroll = () => {
      const isAtTop = direction === 'up' && el.scrollTop <= 50;
      const isAtBottom =
        direction === 'down' && el.scrollHeight - el.scrollTop - el.clientHeight <= 50;

      if (isAtTop || isAtBottom) {
        onScrollEnd();
      }
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [onScrollEnd, direction, disable]);

  return { scrollRef };
};

export default useOnScrollEnd;

export interface UseOnScrollEndArgs {
  onScrollEnd: () => void;
  direction: 'up' | 'down';
  disable: boolean;
}
