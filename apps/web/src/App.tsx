import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "@/components/ui";
import { ChatPage } from "@/pages/ChatPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <ChatPage conversationId="123" />
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
