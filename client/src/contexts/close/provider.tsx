import type { ReactNode } from "react";
import CloseContext from "./index.tsx";

function CloseContextProvider({
  close,
  children,
}: {
  close: () => void;
  children: ReactNode;
}) {
  return (
    <CloseContext.Provider value={{ close }}>{children}</CloseContext.Provider>
  );
}

export default CloseContextProvider;
