import { Button as ButtonBase, type ButtonProps as ButtonPropsBase } from '@chakra-ui/react';
import useDarkMode from '@/hooks/useDarkMode.ts';

const Button = (props: ButtonProps) => {
  const { variant = 'solid', loadingText, ...rest } = props;
  let backgroundColor = props.backgroundColor;
  let color = props.color;

  const { isDarkMode } = useDarkMode();

  if (props.colorScheme === 'brand' && variant === 'solid') {
    backgroundColor = isDarkMode ? 'brand.400' : 'brand.500';
    color = 'white';
  }

  return (
    <ButtonBase
      {...rest}
      backgroundColor={backgroundColor}
      color={color}
      spinnerPlacement="start"
      loadingText={loadingText}
    />
  );
};

export default Button;

export interface ButtonProps extends ButtonPropsBase {
}
