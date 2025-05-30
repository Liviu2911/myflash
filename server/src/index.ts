import express from "express";
import supabase from "./supabase";
import cors from "cors";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use((_, res, next) => {
  res.set("Content-Type", "application/json");
  next();
});

app.get("/", async (req, res) => {
  const { id } = req.query;
  const flashcards = (
    await supabase.from("flashcards").select("*").eq("deck", id)
  ).data;
  if (!flashcards) {
    res.send({ mes: "error" });
    return;
  }

  for (let i = 0; i < flashcards.length; i++) {
    const random = Math.floor(Math.random() * flashcards.length);
    const t = flashcards[random];
    flashcards[random] = flashcards[i];
    flashcards[i] = t;
  }

  res.send(flashcards);
});

app.listen(3000, () => console.log("working..."));
