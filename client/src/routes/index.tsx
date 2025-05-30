import { createFileRoute, useNavigate } from "@tanstack/react-router";
import FlashcardsProvider from "../contexts/flashcards/provider";
import CloseProvider from "../contexts/close/provider";
import DecksProvider from "../contexts/decks/provider";
import { useQuery } from "@tanstack/react-query";
import supabase from "../supabase";
import Nav from "../components/home/nav";
import AddDeck from "../components/home/addDeck";
import Decks from "../components/home/decks";
import Deck from "../components/home/deck";
import EditFlashcard from "../components/home/editflashcard";
import Edit from "../components/home/edit";
import AddFlashcard from "../components/home/addflashcard";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  validateSearch: (search: Record<string, boolean | string>) => search,
});

function RouteComponent() {
  const navigate = useNavigate();
  const close = () => {
    navigate({ to: "/", search: {} });
  };

  const { data: decks } = useQuery({
    queryKey: ["decks"],
    queryFn: async () => (await supabase.from("decks").select("*")).data,
    refetchInterval: 100,
  });

  const { data: flashcards } = useQuery({
    queryKey: ["flashcards"],
    queryFn: async () => (await supabase.from("flashcards").select("*")).data,
    refetchInterval: 100,
  });

  if (!decks || !flashcards) {
    return <h1>Decks not found</h1>;
  }

  return (
    <CloseProvider close={close}>
      <Nav />
      <AddDeck />
      <DecksProvider decks={decks}>
        <Decks />
        <FlashcardsProvider flashcards={flashcards}>
          <Deck />
          <EditFlashcard />
        </FlashcardsProvider>
        <Edit />
        <AddFlashcard />
      </DecksProvider>
    </CloseProvider>
  );
}
