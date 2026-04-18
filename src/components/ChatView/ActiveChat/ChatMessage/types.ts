import type { BorderRadiusConfig } from './computeBorderRadius';

export interface MessageRendererProps {
  text?: string;
  fileUrl?: string;
  fileName?: string;
  time: string;
  isSent: boolean;
  bg: string;
  color: string;
  borderRadius: BorderRadiusConfig;
  onImageClick?: () => void;
}
