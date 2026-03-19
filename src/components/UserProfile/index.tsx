import { Avatar, HStack, Text, useBreakpointValue } from '@chakra-ui/react';
import useAuthStore from '../../store/useAuthStore.ts';
import { useChatStore } from '@/store';
import ChangeProfilePictureModal from '@/components/UserProfile/ChangeProfilePictureModal.tsx';
import { useDisclosure } from '@chakra-ui/icons';

const UserProfile = () => {
  const { user } = useAuthStore();
  const { otherUser, chatsListOpen } = useChatStore();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const isMobile = useBreakpointValue({ base: true, md: false });

  const isOwnProfile = !isMobile || chatsListOpen || !otherUser;
  const userDataToUse = isOwnProfile ? user : otherUser;

  const ownUserProps = isOwnProfile
    ? {
        cursor: 'pointer',
        onClick: onOpen,
        _hover: {
          transform: 'scale(1.05)',
          transition: 'transform 0.2s',
        },
      }
    : {};

  const { image: userProfilePicture, name: userName } = userDataToUse ?? {};

  return (
    <>
      <HStack spacing={3}>
        <Avatar {...ownUserProps} name={userName} src={userProfilePicture} size="sm" />
        <Text fontWeight="semibold">{userName}</Text>
      </HStack>
      {user && <ChangeProfilePictureModal user={user} isOpen={isOpen} onClose={onClose} />}
    </>
  );
};

export default UserProfile;
