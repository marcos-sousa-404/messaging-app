import { Button, Text } from '@chakra-ui/react';
import Footer from '@/components/Footer';

const CtaFooter = ({
                     actionText,
                     actionHandler,
                     promptText,
                   }: CtaFooterProps) => {
  return (
    <Footer>
      <Text fontSize="md" color="gray.500">
        {promptText}{' '}
        <Button
          variant="link"
          colorScheme="brand"
          onClick={actionHandler}
          ml={1}
        >
          {actionText}
        </Button>
      </Text>
    </Footer>
  );
};

export default CtaFooter;

interface CtaFooterProps {
  promptText: string;
  actionText: string;
  actionHandler: () => void;
}
