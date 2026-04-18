import { useRef, useState } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';

export interface UseChatInputParams {
  messageInputText: string;
  handleSendMessage: (file?: File) => Promise<void>;
}

const useChatInput = ({ messageInputText, handleSendMessage }: UseChatInputParams) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const onSend = async () => {
    if (!messageInputText.trim() && !selectedFile) return;
    await handleSendMessage(selectedFile ?? undefined);
    clearFile();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      void onSend();
    }
  };

  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };

  const sendDisabled = !messageInputText.trim() && !selectedFile;

  return {
    selectedFile,
    fileInputRef,
    handleFileChange,
    clearFile,
    onSend,
    onKeyDown,
    handleAttachmentClick,
    sendDisabled,
  };
};

export default useChatInput;
