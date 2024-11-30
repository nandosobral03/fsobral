import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface CodeblockProps {
  children: string;
  language?: string;
}

const Codeblock = ({ children, language = "typescript" }: CodeblockProps) => {
  return (
    <div className="my-2 overflow-x-auto rounded-lg">
      <SyntaxHighlighter
        language={language}
        style={nord}
        customStyle={{
          margin: 0,
          padding: "1rem",
          fontSize: "0.875rem",
          borderRadius: "0.5rem",
        }}
        wrapLines={true}
        wrapLongLines={true}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
};

export default Codeblock;
