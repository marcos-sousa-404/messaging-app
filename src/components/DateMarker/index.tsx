import { Flex, Text, useColorModeValue } from '@chakra-ui/react';

const DateMarker = ({ date }: DateMarkerProps) => {
  const messageDateRaw = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const messageDateMidnight = new Date(
    messageDateRaw.getFullYear(),
    messageDateRaw.getMonth(),
    messageDateRaw.getDate(),
  );

  const msPerDay = 1000 * 60 * 60 * 24;
  const diffDays = Math.round((today.getTime() - messageDateMidnight.getTime()) / msPerDay);

  let label: string;

  if (diffDays === 0) {
    label = 'Hoje';
  } else if (diffDays === 1) {
    label = 'Ontem';
  } else if (diffDays < 7 && diffDays > 0) {
    label = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' }).format(messageDateRaw);
    label = label.charAt(0).toUpperCase() + label.slice(1);
  } else {
    label = new Intl.DateTimeFormat('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: messageDateRaw.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
    }).format(messageDateRaw);
  }

  const bg = useColorModeValue('white', 'gray.700');
  const color = useColorModeValue('gray.600', 'gray.300');

  return (
    <Flex w="100%" justify="center" my={4} position="sticky" top={0} zIndex={1}>
      <Text
        bg={bg}
        color={color}
        px={3}
        py={1}
        borderRadius="full"
        fontSize="xs"
        fontWeight="bold"
        boxShadow="sm"
      >
        {label}
      </Text>
    </Flex>
  );
};

export default DateMarker;

export interface DateMarkerProps {
  date: Date | string;
}
