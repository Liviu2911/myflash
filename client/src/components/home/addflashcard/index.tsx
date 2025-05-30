import { useContext, useState, type FormEvent } from "react";
import { useSearch } from "@tanstack/react-router";
import Modal from "../modal";
import { IoMdArrowDropdown } from "react-icons/io";
import ShowDecks from "../showDecks";
import CloseContext from "../../../contexts/close";
import supabase from "../../../supabase";

function AddFlashcard() {
  const { close } = useContext(CloseContext);
  const { addFlashcard } = useSearch({ strict: false });

  const [showDecks, setShowDecks] = useState(false);
  const [selectedDeck, setSelectedDeck] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const front = new FormData(e.currentTarget).get("front");
    const back = new FormData(e.currentTarget).get("back");

    await supabase
      .from("flashcards")
      .insert({ front, back, deck: selectedDeck?.id });
    close();
  };

  const closeDecks = () => {
    setShowDecks(false);
  };

  const changeDeck = (deck: { id: string; name: string }) => {
    setSelectedDeck(deck);
  };

  if (addFlashcard) {
    return (
      <Modal close={close}>
        <form
          onSubmit={submit}
          className="flex flex-col gap-2 p-4 rounded-lg bg-white text-black"
        >
          <h1 className="font-medium text-center text-xl">Add Flashcard</h1>
          <div className="flex flex-col gap-2">
            <label htmlFor="front">Front</label>
            <input
              className="border border-stone-400 rounded px-4 py-1 focus:bg-stone-100 bg-white transition-all"
              type="text"
              name="front"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="back">Back</label>
            <input
              className="border border-stone-400 rounded px-4 py-1 focus:bg-stone-100 bg-white transition-all"
              type="text"
              name="back"
            />
          </div>
          <button
            type="button"
            onClick={() => setShowDecks(true)}
            className="flex flex-row gap-2 items-center justify-center cursor-pointer hover:bg-stone-100 bg-white transition-all rounded border border-stone-400 w-full py-1"
          >
            <h1>{selectedDeck?.name || "Select Deck"}</h1>
            <span className="text-lg">
              <IoMdArrowDropdown />
            </span>
          </button>

          {showDecks && (
            <ShowDecks close={closeDecks} changeDeck={changeDeck} />
          )}
          <button className="border border-stone-400 rounded py-1.5 hover:bg-stone-100 mt-4 transition-all cursor-pointer">
            Submit
          </button>
        </form>
      </Modal>
    );
  }
}

export default AddFlashcard;
