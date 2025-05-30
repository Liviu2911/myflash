import { createContext } from "react";

const CloseContext = createContext<{ close: () => void }>({
  close: () => {},
});

export default CloseContext;
