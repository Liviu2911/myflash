import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import supabase from "../../../supabase.ts";
import { useContext } from "react";
import CloseContext from "../../../contexts/close/index.tsx";

function Options() {
  const { showDeck: id } = useSearch({ strict: false });
  const navigate = useNavigate();
  const { close } = useContext(CloseContext);

  const deleteDeck = async () => {
    await supabase.from("decks").delete().eq("id", id);

    close();
  };

  const edit = async () => {
    navigate({ to: "/", search: { edit: id && id !== true ? id : "-1" } });
  };

  return (
    <div className="flex flex-row gap-4 text-sm font-medium items-center">
      <Link
        to="/study"
        search={{ id }}
        className="hover:text-sky-500 cursor-pointer transition-all"
      >
        Study
      </Link>
      <Link
        to="/"
        search={{ addFlashcard: true }}
        className="hover:text-sky-500 cursor-pointer transition-all"
      >
        Add Card
      </Link>
      <button
        onClick={edit}
        className="hover:text-sky-500 cursor-pointer transition-all"
      >
        Edit
      </button>
      <button
        onClick={deleteDeck}
        className="hover:text-rose-500 cursor-pointer transition-all"
      >
        Delete
      </button>
    </div>
  );
}

export default Options;
