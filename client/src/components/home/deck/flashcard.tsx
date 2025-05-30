import type { Flashcard as Type } from "../../../contexts/flashcards";
import { HiDotsVertical } from "react-icons/hi";
import FlashcardOptions from "./flashcardopts";
import { useState } from "react";

function Flashcard({ flashcard }: { flashcard: Type }) {
  const { front, back } = flashcard;
  const [showOptions, setShowOptions] = useState(false);

  const closeOptions = () => {
    setShowOptions(false);
  };

  return (
    <div className="w-full py-2 px-4 rounded-lg border border-stone-400 flex flex-row justify-between">
      <div className="flex flex-row gap-4">
        <h1>
          <b>Front:</b> {front}
        </h1>
        <h1>
          <b>Back:</b> {back}
        </h1>
      </div>

      <div className="relative">
        <button
          onClick={() => setShowOptions(true)}
          className="cursor-pointer hover:text-purple-500 transition-all"
        >
          <HiDotsVertical />
        </button>
        {showOptions && (
          <FlashcardOptions id={parseInt(flashcard.id)} close={closeOptions} />
        )}
      </div>
    </div>
  );
}

export default Flashcard;
