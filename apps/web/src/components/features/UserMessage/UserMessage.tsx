import { Box, Text } from "@chakra-ui/react";

interface UserMessageProps {
  message: string;
}

export const UserMessage: React.FC<UserMessageProps> = ({ message }) => {
  return (
    <Box
      border="1px solid"
      borderColor="border"
      p="2"
      rounded="lg"
      bg="bg.emphasized"
      alignSelf="flex-end"
    >
      <Text>{message}</Text>
    </Box>
  );
};

export type { UserMessageProps };
