import { useEffect, useLayoutEffect, useRef, useState } from 'react';
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

  const otherUserIsTyping = !!otherUser && typingUserIds.includes(otherUser._id);

  const { scrollRef } = useOnScrollEnd({
    direction: 'up',
    onScrollEnd: fetchNextMessagesPage,
    disable: !hasNextMessagesPage || isFetchingNextMessagesPage,
  });

  const bottomRef = useRef<HTMLDivElement>(null);

  const reversedMessages = messages ? [...messages].reverse() : [];
  const newestMessageId = messages?.[0]?._id;
  const oldestMessageId = reversedMessages[0]?._id;

  const previousScrollHeight = useRef(0);
  const previousOldestMessageId = useRef(oldestMessageId);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView();
  };

  useLayoutEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    if (
      oldestMessageId &&
      previousOldestMessageId.current &&
      previousOldestMessageId.current !== oldestMessageId
    ) {
      const heightDifference = container.scrollHeight - previousScrollHeight.current;
      container.scrollTop += heightDifference;
    }

    previousScrollHeight.current = container.scrollHeight;
    previousOldestMessageId.current = oldestMessageId;
  }, [reversedMessages.length, oldestMessageId, scrollRef]);

  useEffect(() => {
    if (newestMessageId) {
      scrollToBottom();
    }
  }, [newestMessageId, selectedChat?._id]);

  useEffect(() => {
    if (otherUserIsTyping) {
      scrollToBottom();
    }
  }, [otherUserIsTyping]);

  return {
    selectedChat,
    messagesLoading,
    reversedMessages,
    otherUserIsTyping,
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
