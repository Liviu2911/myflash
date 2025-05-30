import { useSearch } from "@tanstack/react-router";
import Modal from "../modal";
import { useContext } from "react";
import CloseContext from "../../../contexts/close/index.tsx";
import DecksContext from "../../../contexts/decks/index.tsx";
import Options from "./options.tsx";
import FlashcardsContext from "../../../contexts/flashcards/index.tsx";
import Flashcard from "./flashcard.tsx";

function Deck() {
  const { showDeck: id } = useSearch({ strict: false });
  const { close } = useContext(CloseContext);
  const decks = useContext(DecksContext);
  const flashcards = useContext(FlashcardsContext).filter(
    (item) => item.deck === id
  );

  if (id) {
    const deck = decks.filter((item) => item.id === id)[0];
    return (
      <Modal close={close}>
        <div className="bg-white text-black p-8 rounded-xl flex flex-col gap-8">
          <div className="flex flex-row gap-24">
            <h1 className="text-xl font-medium">{deck.name}</h1>
            <Options />
          </div>
          <div className="flex flex-col gap-2">
            {flashcards.map((item) => (
              <Flashcard key={`flashcard${item.id}`} flashcard={item} />
            ))}
          </div>
        </div>
      </Modal>
    );
  }
}

export default Deck;
