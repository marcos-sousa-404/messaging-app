import { VStack } from '@chakra-ui/react';
import { Fragment, type ReactNode } from 'react';

const GenericList = <T,>(props: GenericListProps<T>) => {
  const { items, keyExtractor, renderItem } = props;

  return (
    <VStack spacing={2} align="stretch">
      {items.map((item) => (
        <Fragment key={keyExtractor(item)}>{renderItem(item)}</Fragment>
      ))}
    </VStack>
  );
};

export default GenericList;

interface GenericListProps<T> {
  items: T[];
  keyExtractor: (item: T) => string;
  renderItem: (item: T) => ReactNode;
}
