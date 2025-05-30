import type { ReactNode } from "react";
import type { Flashcard } from ".";
import FlashcardsContext from ".";

function FlashcardsProvider({
  flashcards,
  children,
}: {
  flashcards: Flashcard[];
  children: ReactNode;
}) {
  return (
    <FlashcardsContext.Provider value={flashcards}>
      {children}
    </FlashcardsContext.Provider>
  );
}

export default FlashcardsProvider;
