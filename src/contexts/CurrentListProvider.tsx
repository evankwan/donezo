import React, { createContext, useState, useContext } from "react";

const CurrentListContext = createContext<{
  currentList: any;
  setCurrentList: React.Dispatch<React.SetStateAction<any>>;
} | null>(null);

const CurrentListProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentList, setCurrentList] = useState(null);
  return (
    <CurrentListContext value={{ currentList, setCurrentList }}>
      {children}
    </CurrentListContext>
  );
};

export const useCurrentListProvider = () => useContext(CurrentListContext);
export default CurrentListProvider;
