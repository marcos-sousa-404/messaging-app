import shouldShowDateMarker from '@/components/ChatView/shouldShowDateMarker.ts';
import type { ChatMessage } from '@/types/ChatMessage.ts';
import type { ChatMessageProps } from '@/components/ChatView/ActiveChat/ChatMessage';

const getChatMessageProps = ({
  msg,
  index,
  reversedMessages,
  userId,
  otherUserIsTyping,
}: GetChatMessagePropsParams) => {
  const isSameUserAbove =
    index > 0 && reversedMessages[index - 1].senderId?._id === msg.senderId?._id;

  const isSameUserBelow =
    index < reversedMessages.length - 1 &&
    reversedMessages[index + 1].senderId?._id === msg.senderId?._id;

  const showDateMarker = shouldShowDateMarker(msg, index, reversedMessages);
  const origin: ChatMessageProps['origin'] = msg.senderId?._id === userId ? 'sent' : 'received';

  const hasMessagesBefore = isSameUserAbove;
  const hasMessagesAfter = origin === 'received' && otherUserIsTyping ? true : isSameUserBelow;

  return {
    showDateMarker,
    origin,
    hasMessagesBefore,
    hasMessagesAfter,
    text: msg.text,
    fileUrl: msg.fileUrl,
    fileType: msg.fileType,
    fileName: msg.fileName,
    createdAt: msg.createdAt,
  };
};

export default getChatMessageProps;

export interface GetChatMessagePropsParams {
  msg: ChatMessage;
  index: number;
  reversedMessages: ChatMessage[];
  userId?: string;
  otherUserIsTyping: boolean;
}
