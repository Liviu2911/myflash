import { useEffect, useRef } from "react";
import supabase from "../../../supabase";
import { Link } from "@tanstack/react-router";

function FlashcardOptions({ close, id }: { close: () => void; id: number }) {
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

  const deleteFlashcard = async () => {
    await supabase.from("flashcards").delete().eq("id", id);
    close();
  };

  return (
    <div className="absolute top-0 left-0 w-full h-[100vh] z-50">
      <div
        ref={ref}
        className={`absolute p-1 rounded-lg bg-stone-200 border border-stone-400 flex flex-col gap-1`}
      >
        <Link
          to="/"
          search={{ editFlashcard: id.toString() }}
          className="rounded py-1 pl-4 text-sm pr-13 text-left hover:bg-white hover:text-sky-500 transition-all cursor-pointer"
        >
          Edit
        </Link>
        <button
          onClick={deleteFlashcard}
          className="rounded py-1 px-8 pl-4 text-sm text-left hover:bg-white hover:text-rose-500 transition-all cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default FlashcardOptions;
