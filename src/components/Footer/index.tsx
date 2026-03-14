import { Box } from '@chakra-ui/react';

const Footer = (props: FooterProps) => {
  const { children } = props;

  return (
    <Box
      flexDir={'column'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      w={'full'}
      position={'absolute'}
      bottom={2}
      as={'footer'}
    >
      {children}
    </Box>
  );
};

export default Footer;

export interface FooterProps {
  children: React.ReactNode;
}
