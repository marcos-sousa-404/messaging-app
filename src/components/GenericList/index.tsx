import { Spinner, VStack } from '@chakra-ui/react';
import { type ComponentType } from 'react';
import { useOnScrollEnd } from '@/hooks';

const GenericList = <T, P extends Record<string, unknown>>(props: GenericListProps<T, P>) => {
  const {
    items,
    keyExtractor,
    ItemComponent,
    itemProps,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = props;

  const { scrollRef } = useOnScrollEnd({
    onScrollEnd: fetchNextPage,
    direction: 'down',
    disable: isFetchingNextPage || !hasNextPage,
  });

  return (
    <VStack
      overflowY={'auto'}
      maxHeight={'100%'}
      ref={scrollRef}
      as={'div'}
      spacing={2}
      align="stretch"
    >
      {items.map((item) => (
        <ItemComponent key={keyExtractor(item)} item={item} {...(itemProps as P)} />
      ))}
      {hasNextPage && (
        <VStack h="60px" justify="center" py={2}>
          {isFetchingNextPage && <Spinner size="md" color="brand.500" />}
        </VStack>
      )}
    </VStack>
  );
};

export default GenericList;

interface GenericListProps<T, P = object> {
  items: T[];
  keyExtractor: (item: T) => string;
  ItemComponent: ComponentType<{ item: T } & P>;
  itemProps?: P;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
}
