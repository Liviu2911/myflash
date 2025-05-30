import { createContext } from "react";

const DecksContext = createContext<{ id: string; name: string }[]>([]);

export default DecksContext;
