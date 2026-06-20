import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface CodeblockProps {
  children: string;
  language?: string;
}

const Codeblock = ({ children, language = "typescript" }: CodeblockProps) => {
  return (
    <div className="my-[var(--lh)] max-w-[calc(100vw-2rem)] overflow-hidden frame transition-colors hover:border-accent">
      <div className="flex items-center justify-between border-b border-background/15 bg-foreground px-[var(--lh)] py-[var(--bl)] text-background">
        <span className="meta-label text-background/45">{language}</span>
        <span className="meta-label text-accent/70">code</span>
      </div>
      <SyntaxHighlighter
        language={language}
        style={nord}
        customStyle={{
          margin: 0,
          padding: "24px",
          fontSize: "0.875rem",
          borderRadius: "0",
          overflowX: "auto",
          backgroundColor: "var(--foreground)",
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
