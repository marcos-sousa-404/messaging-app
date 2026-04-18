import { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react';
import { useAuthStore, useChatStore } from '@/store';
import { useOnScrollEnd } from '@/hooks';

const useActiveChat = () => {
  const {
    selectedChat,
    messages,
    messagesLoading,
    typingUserIds,
    otherUser,
    fetchNextMessagesPage,
    hasNextMessagesPage,
    isFetchingNextMessagesPage,
  } = useChatStore();
  const { user } = useAuthStore();

  const [previewImage, setPreviewImage] = useState<{ src: string; alt?: string } | null>(null);

  const { scrollRef } = useOnScrollEnd({
    direction: 'up',
    onScrollEnd: fetchNextMessagesPage,
    disable: !hasNextMessagesPage || isFetchingNextMessagesPage,
  });

  const bottomRef = useRef<HTMLDivElement>(null);
  const previousScrollHeight = useRef(0);
  const previousOldestMessageId = useRef<string | undefined>(undefined);

  const reversedMessages = messages ? [...messages].reverse() : [];
  const newestMessageId = messages?.[0]?._id;
  const oldestMessageId = reversedMessages[0]?._id;

  const scrollToBottom = useCallback((behavior: ScrollBehavior = 'auto') => {
    bottomRef.current?.scrollIntoView({ behavior });
  }, []);

  useLayoutEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    if (
      oldestMessageId &&
      previousOldestMessageId.current &&
      previousOldestMessageId.current !== oldestMessageId
    ) {
      const heightDifference = container.scrollHeight - previousScrollHeight.current;
      container.scrollTop = heightDifference;
    }

    previousScrollHeight.current = container.scrollHeight;
    previousOldestMessageId.current = oldestMessageId;
  }, [oldestMessageId, scrollRef]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => {
      const isNearBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight < 150;

      if (isNearBottom) {
        scrollToBottom();
      }
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, [scrollToBottom, scrollRef]);

  useEffect(() => {
    if (newestMessageId) {
      scrollToBottom();
    }
  }, [newestMessageId, selectedChat?._id, scrollToBottom]);

  useEffect(() => {
    const otherUserIsTyping = !!otherUser && typingUserIds.includes(otherUser._id);
    if (otherUserIsTyping) {
      scrollToBottom();
    }
  }, [typingUserIds, otherUser, scrollToBottom]);

  return {
    selectedChat,
    messagesLoading,
    reversedMessages,
    otherUserIsTyping: !!otherUser && typingUserIds.includes(otherUser._id),
    hasNextMessagesPage,
    isFetchingNextMessagesPage,
    scrollRef,
    bottomRef,
    user,
    previewImage,
    setPreviewImage,
  };
};

export default useActiveChat;
