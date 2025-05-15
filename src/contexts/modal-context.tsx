"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface IModalContext {
  isOpen: string[];
  toggleOpen: (id: string) => void;
}

const context = createContext<IModalContext>({
  isOpen: [],
  toggleOpen: () => {},
});

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<string[]>([]);

  const toggleOpen = (id: string) => {
    setIsOpen((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <context.Provider value={{ isOpen, toggleOpen }}>
      {children}
    </context.Provider>
  );
};

export const useModal = () => {
  const ctx = useContext(context);
  if (!ctx) throw new Error("useModal must be used within a ModalProvider");

  return ctx;
};
