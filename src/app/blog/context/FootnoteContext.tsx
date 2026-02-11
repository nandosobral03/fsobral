"use client";

import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from "react";

type Footnote = {
  id: string;
  content: ReactNode;
};

type FootnoteContextType = {
  footnotes: Footnote[];
  addFootnote: (id: string, content: ReactNode) => void;
  getFootnoteIndex: (id: string) => number;
};

const FootnoteContext = createContext<FootnoteContextType | undefined>(undefined);

export const useFootnotes = () => {
  const context = useContext(FootnoteContext);
  if (!context) {
    throw new Error("useFootnotes must be used within a FootnoteProvider");
  }
  return context;
};

export const FootnoteProvider = ({ children }: { children: ReactNode }) => {
  const [footnotes, setFootnotes] = useState<Footnote[]>([]);

  const addFootnote = useCallback((id: string, content: ReactNode) => {
    setFootnotes((prevFootnotes) => {
      const index = prevFootnotes.findIndex((footnote) => footnote.id === id);
      if (index === -1) {
        return [...prevFootnotes, { id, content }];
      } else {
        return prevFootnotes;
      }
    });
  }, []);

  const getFootnoteIndex = useCallback(
    (id: string) => {
      return footnotes.findIndex((footnote) => footnote.id === id);
    },
    [footnotes]
  );

  const value = useMemo(() => ({ footnotes, addFootnote, getFootnoteIndex }), [footnotes, addFootnote, getFootnoteIndex]);

  return <FootnoteContext.Provider value={value}>{children}</FootnoteContext.Provider>;
};
