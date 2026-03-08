import { Button as ButtonBase, type ButtonProps as ButtonPropsBase } from '@chakra-ui/react';

const Button = (props: ButtonProps) => {

  return <ButtonBase {...props} />;
};

export default Button;

export interface ButtonProps extends ButtonPropsBase {
}