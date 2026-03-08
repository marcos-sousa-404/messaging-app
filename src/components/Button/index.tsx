import { Button as ButtonBase, type ButtonProps as ButtonPropsBase } from '@chakra-ui/react';
import useDarkMode from '@/hooks/useDarkMode.ts';

const Button = (props: ButtonProps) => {
  const {variant = 'solid'} = props;
  let backgroundColor = props.backgroundColor;
  let color = props.color;

  const { isDarkMode } = useDarkMode();

  if (props.colorScheme === 'brand' && variant === 'solid') {
    backgroundColor = isDarkMode ? 'brand.400' : 'brand.500';
    color = 'white';
  }

  return <ButtonBase {...props} backgroundColor={backgroundColor} color={color} />;
};

export default Button;

export interface ButtonProps extends ButtonPropsBase {
}