import { Box } from '@chakra-ui/react';

const Footer = (props: FooterProps) => {
  const { children } = props;

  return <Box display={'flex'} justifyContent={'center'} w={'full'} position={'absolute'} bottom={2} as={'footer'}>{children}</Box>;
};

export default Footer;

export interface FooterProps {
  children: React.ReactNode;
}