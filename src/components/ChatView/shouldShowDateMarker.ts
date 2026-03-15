import type { ChatMessage } from '@/types/ChatMessage';

const shouldShowDateMarker = (
  msg: ChatMessage,
  index: number,
  messages: ChatMessage[],
): boolean => {
  const currentMsgDate = new Date(msg.createdAt);

  const currentMidnight = new Date(
    currentMsgDate.getFullYear(),
    currentMsgDate.getMonth(),
    currentMsgDate.getDate(),
  ).getTime();

  if (index === 0) {
    return true;
  }

  const previousMsg = messages[index - 1];
  const previousMsgDate = new Date(previousMsg.createdAt);

  const previousMidnight = new Date(
    previousMsgDate.getFullYear(),
    previousMsgDate.getMonth(),
    previousMsgDate.getDate(),
  ).getTime();

  return currentMidnight !== previousMidnight;
};

export default shouldShowDateMarker;
