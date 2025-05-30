import type { ReactNode } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

interface Props {
  close: () => void;
  children: ReactNode;
}

function Modal({ close, children }: Props) {
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      // @ts-expect-error Function is not functioning
      if (ref.current && !ref.current.contains(e.target)) {
        close();
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [close]);

  return (
    <div className="w-full h-[100vh] absolute left-0 top-0 z-20 bg-[rgba(0, 0, 0, 0.25)] flex items-center justify-center">
      <div ref={ref}>{children}</div>
    </div>
  );
}

export default Modal;
