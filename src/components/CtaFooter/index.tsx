import { Button, Text } from '@chakra-ui/react';
import Footer from '@/components/Footer';
import useDarkMode from '@/hooks/useDarkMode.ts';

const CtaFooter = ({
                     actionText,
                     actionHandler,
                     promptText,
                   }: CtaFooterProps) => {
  const {isDarkMode} = useDarkMode();

  return (
    <Footer>
      <Text fontSize="md" color="gray.500">
        {promptText}{' '}
        <Button
          variant="link"
          color={isDarkMode ? 'brand.400' : 'brand.500'}
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
