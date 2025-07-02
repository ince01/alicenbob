import type { PropsWithChildren } from "react";
import { Box, Container, Flex, Text } from "@chakra-ui/react";
import { ColorModeButton } from "@/components/ui";

export type ChatLayoutProps = PropsWithChildren;

export const ChatLayout: React.FC<ChatLayoutProps> = ({ children }) => {
  return (
    <>
      {/* Header */}
      <Box as="header" px={6} py={4}>
        <Flex justify="space-between" align="center">
          <Text fontWeight="bold">💬 alicenbob</Text>
          <ColorModeButton />
        </Flex>
      </Box>

      {/* Main Content */}
      <Box as="main" overflow="hidden">
        <Container p={0}>{children}</Container>
      </Box>
    </>
  );
};
