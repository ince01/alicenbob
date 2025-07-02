import { VStack } from "@chakra-ui/react";
import { ChatLayout } from "@/components/layouts";
import { ChatInput, ResponseMessage, UserMessage } from "@/components/features";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getMessagesByConversationId, streamMessage } from "@/apis";
import { MessageAuthor } from "@/types";

interface ChatPageProps {
  conversationId: string;
}

export const ChatPage: React.FC<ChatPageProps> = ({ conversationId }) => {
  const { data, refetch } = useQuery({
    queryKey: ["messages", conversationId],
    queryFn: () => getMessagesByConversationId(conversationId),
  });

  const { mutate: streamMessageMutate, isPending } = useMutation({
    mutationFn: streamMessage,
    onSuccess: () => {
      refetch();
    },
  });

  const handleSend = ({
    message,
    model,
  }: {
    message: string;
    model: string;
  }) => {
    streamMessageMutate({
      conversationId,
      modelId: model,
      text: message,
    });
  };

  return (
    <ChatLayout>
      <VStack align="start" pb="6" gap="4" flexDirection="column-reverse">
        {data?.data?.messages.map(message =>
          message.author === MessageAuthor.User ? (
            <UserMessage key={message.id} message={message.text} />
          ) : (
            <ResponseMessage key={message.id} message={message.text} />
          )
        )}
      </VStack>
      <ChatInput onSend={handleSend} isLoading={isPending} />
    </ChatLayout>
  );
};
