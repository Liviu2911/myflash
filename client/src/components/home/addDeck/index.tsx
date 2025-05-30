import { useSearch } from "@tanstack/react-router";
import Modal from "../modal";
import { useContext, type FormEvent } from "react";
import CloseContext from "../../../contexts/close";
import supabase from "../../../supabase";

function AddDeck() {
  const { close } = useContext(CloseContext);
  const { addDeck } = useSearch({ strict: false });

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = new FormData(e.currentTarget).get("name");

    await supabase.from("decks").insert({ name });
    close();
  };

  if (addDeck)
    return (
      <Modal close={close}>
        <form
          className="flex flex-col gap-2 p-4 rounded-lg bg-white text-black"
          onSubmit={submit}
        >
          <h1 className="text-center text-xl mb-4 font-medium">Add Deck</h1>
          <label htmlFor="name">Deck Name</label>
          <input
            type="text"
            name="name"
            className="py-2 px-4 border border-stone-400 bg-stone-100 text-sm rounded"
          />
          <button className="rounded py-1 cursor-pointer hover:bg-stone-900 hover:text-white border border-stone-900 transition-all">
            Add Deck
          </button>
        </form>
      </Modal>
    );
}

export default AddDeck;
