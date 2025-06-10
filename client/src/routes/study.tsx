import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";

export const Route = createFileRoute("/study")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useSearch({ strict: false });
  const { data: flashcards } = useQuery({
    queryKey: ["flashcardsstudy", id],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/?id=" + id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.json();
    },
  });

  const [current, setCurrent] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [points, setPoints] = useState(0);
  const [revealPoints, setRevealPoints] = useState(false);

  if (flashcards) {
    return (
      <div className="w-full h-[100vh] absolute top-0 left-0 flex items-center justify-center">
        <div className="w-[600px] h-72  bg-bg border border-secondary text-stone-200 rounded-lg flex flex-col items-center justify-center gap-4 relative">
          <h1
            className={`${revealed && "opacity-75"} uppercase text-2xl font-medium text-white`}
          >
            {!revealPoints && flashcards[current].front}
          </h1>
          {!revealPoints && (
            <button
              disabled={revealed}
              onClick={() => setRevealed(true)}
              className="p-2 border border-secondary-darker rounded hover:bg-primary transition-all cursor-pointer"
            >
              Reveal Answer
            </button>
          )}
          {revealed && (
            <>
              <h1 className="uppercase text-2xl font-medium">
                {flashcards[current].back}
              </h1>
              <div className="flex flex-row gap-4">
                <button
                  onClick={() => {
                    setRevealed(false);
                    if (flashcards[current + 1]) setCurrent(current + 1);
                    else setRevealPoints(true);
                  }}
                  className="border border-secondary-darker px-4 py-1 rounded hover:bg-primary hover:text-white transition-all cursor-pointer"
                >
                  0 Point
                </button>
                <button
                  onClick={() => {
                    setPoints(points + 1);
                    setRevealed(false);
                    if (flashcards[current + 1]) setCurrent(current + 1);
                    else setRevealPoints(true);
                  }}
                  className="border border-secondary-darker px-4 py-1 rounded hover:bg-green-500 hover:text-white transition-all cursor-pointer"
                >
                  +1 Point
                </button>
              </div>
            </>
          )}
          {revealPoints && (
            <>
              <Link
                to="/"
                className="flex items-center hover:bg-primary transition-all absolute left-6 top-6 border border-secondary-darker px-3 py-1 rounded"
              >
                <span className="text-xl">
                  <IoIosArrowRoundBack />
                </span>
                <h1>Home</h1>
              </Link>
              <h1 className="text-2xl text-primary">
                Result: {points}/{flashcards.length}
              </h1>
              <button
                className="hover:bg-primary transition-all cursor-pointer border px-3 py-1 rounded border-secondary-darker"
                onClick={() => {
                  window.location.reload();
                }}
              >
                Retake
              </button>
            </>
          )}
        </div>
      </div>
    );
  } else {
    return <h1>Loading...</h1>;
  }
}
