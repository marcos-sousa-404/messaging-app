import {
  Avatar,
  Box,
  Center,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
import { Button } from '@/components';
import type { User } from '@/types/User.ts';
import { EditIcon } from '@chakra-ui/icons';
import useChangeProfilePictureModal from '@/components/UserProfile/useChangeProfilePictureModal.ts';

const ChangeProfilePictureModal = (props: ChangeProfilePictureModalProps) => {
  const { isOpen, onClose, user } = props;
  const { image, name, email } = user ?? {};

  const { openFilePicker, selectedImageUrl, badgeBg, handleSave, isSaving, savingDisabled } =
    useChangeProfilePictureModal({ onClose, userId: user._id, isOpen });

  return (
    <Modal size={{ base: 'xs', md: 'lg' }} isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Seu perfil</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Center padding={2} flexDirection={'column'} gap={2}>
            <Tooltip label={'Mudar foto de perfil'} hasArrow>
              <Box position="relative" cursor="pointer" onClick={openFilePicker}>
                <Avatar
                  className={'user-avatar'}
                  size={'2xl'}
                  src={selectedImageUrl ?? image}
                  name={name}
                />
                <Center
                  position="absolute"
                  bottom="2px"
                  right="2px"
                  bg={badgeBg}
                  borderRadius="full"
                  boxSize="32px"
                  zIndex={3}
                  border="2px solid"
                  borderColor={useColorModeValue('white', 'gray.700')}
                  boxShadow="sm"
                  transition="transform 0.2s"
                >
                  <Icon as={EditIcon} color={'white'} boxSize="14px" />
                </Center>
              </Box>
            </Tooltip>

            <Stack gap={0} mt={2}>
              <Text as={'h3'} fontWeight={600} fontSize={24} textAlign={'center'}>
                {name}
              </Text>
              <Text fontSize={18} variant={'secondary'} textAlign={'center'}>
                {email}
              </Text>
            </Stack>
          </Center>
        </ModalBody>
        <ModalFooter>
          <Button
            disabled={savingDisabled}
            onClick={handleSave}
            isLoading={isSaving}
            colorScheme={'brand'}
          >
            Salvar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ChangeProfilePictureModal;

export interface ChangeProfilePictureModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}
