import { MenuRoot, MenuTrigger, MenuContent, MenuItem } from "@/components/ui";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { LuArrowUp, LuChevronDown } from "react-icons/lu";
import { useForm, type SubmitHandler } from "react-hook-form";

type FormValues = {
  message: string;
  model: string;
};

interface ChatInputProps {
  isLoading?: boolean;
  onSend: (payload: FormValues) => void;
}

export const ChatInput = ({ onSend, isLoading = false }: ChatInputProps) => {
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = data => {
    onSend({
      ...data,
      model: "gpt-4.1-mini-2025-04-14",
    });
  };

  return (
    <Box p={4} mb="6" border="1px solid" borderColor="border" rounded="xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Textarea
          px={0}
          py={0}
          autoresize
          placeholder="Ask me anything..."
          border="none"
          focusVisibleRing="none"
          focusRing="none"
          {...register("message")}
        />
        <Flex justify="flex-end">
          <Stack direction="row">
            <MenuRoot>
              <MenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  GPT-4o
                  <LuChevronDown />
                </Button>
              </MenuTrigger>
              <MenuContent>
                <MenuItem value="gpt-4o">GPT-4o</MenuItem>
                <MenuItem value="gpt-4o-mini">GPT-4o-mini</MenuItem>
              </MenuContent>
            </MenuRoot>
            <IconButton
              rounded="full"
              size="sm"
              aria-label="Send"
              type="submit"
              loading={isLoading}
            >
              <LuArrowUp />
            </IconButton>
          </Stack>
        </Flex>
      </form>
    </Box>
  );
};

export type { ChatInputProps };
