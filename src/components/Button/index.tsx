import { Button as ButtonBase, type ButtonProps as ButtonPropsBase } from '@chakra-ui/react';
import useDarkMode from '@/hooks/useDarkMode.ts';

const Button = (props: ButtonProps) => {
  const { variant = 'solid', loadingText, colorScheme, ...rest } = props;
  const { isDarkMode } = useDarkMode();

  let backgroundColor = props.backgroundColor;
  let backgroundColorHover = props.backgroundColor;
  let color = props.color;

  if (colorScheme && variant === 'solid') {
    backgroundColor = isDarkMode ? `${colorScheme}.400` : `${colorScheme}.500`;
    backgroundColorHover = isDarkMode ? `${colorScheme}.500` : `${colorScheme}.400`;

    color = 'white';
  }

  return (
    <ButtonBase
      {...rest}
      variant={variant}
      colorScheme={colorScheme}
      backgroundColor={backgroundColor}
      _hover={backgroundColorHover ? { backgroundColor: backgroundColorHover } : undefined}
      color={color}
      spinnerPlacement="start"
      loadingText={loadingText}
    />
  );
};

export default Button;

export type ButtonProps = ButtonPropsBase;
