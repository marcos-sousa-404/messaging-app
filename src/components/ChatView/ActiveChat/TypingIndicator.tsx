import { Box, Flex, HStack, useColorModeValue } from '@chakra-ui/react';
import { motion, type Variants } from 'framer-motion';

const MotionBox = motion(Box);

const TypingIndicator = () => {
  const dotColor = useColorModeValue('gray.500', 'gray.400');
  const bg = useColorModeValue('white', 'gray.700');

  const dotVariants: Variants = {
    animate: (i: number) => ({
      y: [0, -5, 0],
      opacity: [0.4, 1, 0.4],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatDelay: 0.2,
        delay: i * 0.15,
        ease: 'easeInOut',
      },
    }),
  };

  return (
    <Flex w="100%" justify="flex-start" mb={2}>
      <Box
        bg={bg}
        px={4}
        py={3}
        borderRadius={'xl'}
        borderBottomLeftRadius={'sm'}
        boxShadow="sm"
        display="flex"
        alignItems="center"
        minH="40px"
      >
        <HStack spacing="4px" alignItems="center">
          {[0, 1, 2].map((index) => (
            <MotionBox
              key={index}
              w="6px"
              h="6px"
              bg={dotColor}
              borderRadius="full"
              custom={index}
              variants={dotVariants}
              animate="animate"
            />
          ))}
        </HStack>
      </Box>
    </Flex>
  );
};

export default TypingIndicator;
