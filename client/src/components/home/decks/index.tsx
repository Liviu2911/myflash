import { Link } from "@tanstack/react-router";
import { useContext } from "react";
import DecksContext from "../../../contexts/decks/index.tsx";

function Decks() {
  const decks = useContext(DecksContext);
  return (
    <div className="ml-12 mt-8 flex flex-col gap-8">
      <h1 className="text-2xl font-semibold">DECKS</h1>
      <div className="flex flex-row gap-4 items-center">
        {decks.map((item) => (
          <Link
            to="/"
            search={{ showDeck: item.id }}
            key={"deck" + item.id}
            className="border border-stone-400 rounded-lg px-4 py-2 hover:bg-stone-200 hover:text-black transition-all"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Decks;
