import { Link } from "@tanstack/react-router";

function Nav() {
  return (
    <nav className="w-full h-[8vh] bg-stone-800 flex items-center px-16">
      <Link
        to="/"
        search={{ addDeck: true }}
        className="px-2 py-1 rounded bg-white text-black hover:opacity-90 transition-all"
      >
        Add Deck
      </Link>
    </nav>
  );
}

export default Nav;
