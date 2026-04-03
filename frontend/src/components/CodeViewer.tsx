import React from "react";

import type { BundledLanguage } from "@/components/ui/shadcn-io/code-block";
import {
  CodeBlock,
  CodeBlockBody,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockFiles,
  CodeBlockHeader,
  CodeBlockItem,
} from "@/components/ui/shadcn-io/code-block";

interface Props {
  data: Array<{
    filename: string;
    language: string;
    code: string;
  }>;
}

export const CodeViewer = ({ data }: Props) => {
  const [currentFile, setCurrentFile] = React.useState(data[0]?.filename);

  return (
    <CodeBlock data={data} defaultValue={"tsx"}>
      <CodeBlockHeader>
        <CodeBlockFiles>
          {(item) => (
            <CodeBlockFilename
              key={item.language}
              value={item.language}
              onClick={() => setCurrentFile(item.filename)}
              className={
                item.filename === currentFile ? "bg-gray-500 rounded-md " : ""
              }
            >
              {item.filename}
            </CodeBlockFilename>
          )}
        </CodeBlockFiles>

        <CodeBlockCopyButton
          onCopy={() => console.log("Copied code to clipboard")}
          onError={() => console.error("Failed to copy code to clipboard")}
        />
      </CodeBlockHeader>
      <CodeBlockBody>
        {(item) =>
          item.filename === currentFile && (
            <CodeBlockItem key={item.language} value={item.language}>
              <CodeBlockContent language={item.language as BundledLanguage}>
                {item.code}
              </CodeBlockContent>
            </CodeBlockItem>
          )
        }
      </CodeBlockBody>
    </CodeBlock>
  );
};
