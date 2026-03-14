import {
  Input as InputBase,
  FormControl,
  FormErrorMessage,
  FormLabel,
  type InputProps as InputPropsBase,
} from '@chakra-ui/react';
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form';

function Input<T extends FieldValues>({ name, control, label, ...props }: InputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormControl isInvalid={!!fieldState.error}>
          {label && <FormLabel mb={-0.25}>{label}</FormLabel>}

          <InputBase {...props} {...field} />

          <FormErrorMessage>{fieldState.error?.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  );
}

export default Input;

type InputProps<T extends FieldValues> = InputPropsBase & {
  name: Path<T>;
  control: Control<T>;
  label?: string;
};
