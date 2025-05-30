import { useNavigate, useSearch } from "@tanstack/react-router";
import { useContext, type FormEvent } from "react";
import DecksContext from "../../../contexts/decks";
import CloseContext from "../../../contexts/close";
import Modal from "../modal";
import supabase from "../../../supabase";

function Edit() {
  const { edit: id } = useSearch({ strict: false });
  const deck = useContext(DecksContext).filter((item) => item.id === id)[0];
  const { close } = useContext(CloseContext);
  const navigate = useNavigate();

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = new FormData(e.currentTarget).get("name");
    await supabase.from("decks").update({ name }).eq("id", id);

    navigate({ to: "/", search: { showDeck: id && id !== true ? id : "-1" } });
  };

  if (id) {
    return (
      <Modal close={close}>
        <form
          onSubmit={submit}
          className="flex flex-col gap-2 p-4 rounded-lg bg-white text-black"
        >
          <h1 className="text-center text-xl mb-4 font-medium">Add Deck</h1>
          <label htmlFor="name">Deck Name</label>
          <input
            defaultValue={deck.name}
            type="text"
            name="name"
            className="py-2 px-4 border border-stone-400 bg-stone-100 text-sm rounded"
          />
          <button className="rounded py-1 cursor-pointer hover:bg-stone-900 hover:text-white border border-stone-900 transition-all">
            Save
          </button>
        </form>
      </Modal>
    );
  }
}

export default Edit;
