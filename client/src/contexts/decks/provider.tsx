import type { ReactNode } from "react";
import DecksContext from "./index.tsx";

function DecksProvider({
  decks,
  children,
}: {
  decks: { id: string; name: string }[];
  children: ReactNode;
}) {
  return (
    <DecksContext.Provider value={decks}>{children}</DecksContext.Provider>
  );
}

export default DecksProvider;
