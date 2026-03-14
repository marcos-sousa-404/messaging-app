const ChatMessage = () => {};

export default ChatMessage;

export interface ChatMessageProps {
  text: string;
  origin: 'sent' | 'received';
}
