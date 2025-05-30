import { createContext } from "react";

export type Flashcard = {
  front: string;
  back: string;
  id: string;
  deck: string;
};
const FlashcardsContext = createContext<Flashcard[]>([]);

export default FlashcardsContext;
