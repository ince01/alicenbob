import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Prose } from "@/components/ui/prose";
import { processMarkdownToHTMLString } from "./helpers";

interface ResponseMessageProps {
  message: string;
}

export const ResponseMessage: React.FC<ResponseMessageProps> = ({
  message: markdown,
}) => {
  const [content, setContent] = useState("");

  useEffect(
    function () {
      (async function () {
        const processedContent = await processMarkdownToHTMLString(markdown);
        setContent(processedContent);
      })();
    },
    [markdown]
  );
  return (
    <Box p="2">
      <Prose
        size="md"
        maxW="full"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </Box>
  );
};

export type { ResponseMessageProps };
