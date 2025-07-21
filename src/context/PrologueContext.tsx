import { createContext, useContext, useState, ReactNode } from "react";

type PrologueContextType = {
  isPrologueActive: boolean;
  setIsPrologueActive: (value: boolean) => void;
};

const PrologueContext = createContext<PrologueContextType | undefined>(undefined);

export const PrologueProvider = ({ children }: { children: ReactNode }) => {
  const [isPrologueActive, setIsPrologueActive] = useState(true);

  return (
    <PrologueContext.Provider value={{ isPrologueActive, setIsPrologueActive }}>
      {children}
    </PrologueContext.Provider>
  );
};

export const usePrologue = () => {
  const context = useContext(PrologueContext);
  if (!context) throw new Error("usePrologue must be used within PrologueProvider");
  return context;
};
