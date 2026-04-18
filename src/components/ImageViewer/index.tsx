import { memo } from 'react';
import Viewer from 'react-viewer';
import { IconButton, useColorModeValue } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

const ImageViewer = memo(({ image, onClose }: ImageViewerProps) => {
  const iconColor = useColorModeValue('white', 'gray.200');

  const isVisible = !!image;

  return (
    <>
      <Viewer
        className="chakra-theme-viewer"
        visible={isVisible}
        onClose={onClose}
        images={image ? [image] : []}
        noNavbar={true}
        showTotal={false}
        downloadable={true}
        rotatable={false}
        scalable={false}
        noImgDetails={true}
        noToolbar={true}
        noClose={true}
        zoomSpeed={0.15}
        drag={true}
      />

      {isVisible && (
        <IconButton
          aria-label={'fechar'}
          icon={<CloseIcon />}
          variant={'ghost'}
          position="fixed"
          _hover={{ bg: 'transparent', transform: 'scale(1.1)', transition: 'transform 0.2s' }}
          top={{ base: '16px', md: '24px' }}
          right={{ base: '16px', md: '24px' }}
          size="lg"
          zIndex={1006}
          onClick={onClose}
          color={iconColor}
        />
      )}
    </>
  );
});

export default ImageViewer;

export interface ImageViewerProps {
  image: { src: string; alt?: string } | null;
  onClose: () => void;
}
