import { useContext, useEffect, useRef } from "react";
import DecksContext from "../../contexts/decks";

interface Props {
  changeDeck: (deck: { id: string; name: string }) => void;
  close: () => void;
}

function ShowDecks({ changeDeck, close }: Props) {
  const decks = useContext(DecksContext);

  const ref = useRef(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      // @ts-expect-error idk
      if (ref.current && !ref.current.contains(e.target)) {
        close();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [close]);

  return (
    <div className="w-full h-[100vh] absolute top-0 left-0 flex items-center justify-center">
      <div
        ref={ref}
        className="p-1 bg-stone-200 border border-stone-400 absolute rounded top-[570px] flex flex-col gap-1"
      >
        {decks.map((item) => (
          <button
            key={`button${item.id}`}
            type="button"
            className="hover:bg-white p-1 transition-all rounded cursor-pointer px-[78px]"
            onClick={() => {
              changeDeck(item);
              close();
            }}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ShowDecks;
