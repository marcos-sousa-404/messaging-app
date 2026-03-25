import { useFilePicker } from 'use-file-picker';
import { useColorModeValue } from '@chakra-ui/react';
import useUpdateUserMutation from '@/api/http/mutations/useUpdateUser.ts';
import dataURLtoBlob from '@/helpers/dataUrlToBlob.ts';
import { useEffect } from 'react';

const useChangeProfilePictureModal = (params: UseChangeProfilePictureModalParams) => {
  const { onClose, userId, isOpen } = params;
  const { openFilePicker, filesContent, clear } = useFilePicker({
    accept: '.png,.jpg',
    readAs: 'DataURL',
  });
  const { mutateAsync: updateUser, isPending: isSaving } = useUpdateUserMutation();
  const selectedImage = filesContent?.[0];
  const selectedImageUrl = selectedImage?.content;

  useEffect(() => {
    if (!isOpen) clear();
  }, [isOpen]);

  const handleSave = async () => {
    const imageBlob = await dataURLtoBlob(selectedImageUrl);
    const fileToUpload = new File([imageBlob], selectedImage.name, {
      type: imageBlob.type || 'image/jpeg',
    });

    await updateUser({ id: userId, image: fileToUpload });
    onClose();
  };

  const savingDisabled = !userId || !selectedImageUrl || isSaving;

  const badgeBg = useColorModeValue('brand.500', 'brand.400');

  return { selectedImageUrl, badgeBg, openFilePicker, isSaving, savingDisabled, handleSave };
};

export default useChangeProfilePictureModal;

export interface UseChangeProfilePictureModalParams {
  onClose: () => void;
  isOpen: boolean;
  userId: string;
}
