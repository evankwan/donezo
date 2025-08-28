import React, { createContext, useState, useContext } from "react";

export interface _CurrentListContextInterface {
  currentList: any;
  setCurrentList: React.Dispatch<React.SetStateAction<any>>;
  isShowingCompletedItems: boolean;
  setIsShowingCompletedItems: React.Dispatch<React.SetStateAction<boolean>>;
}

export type CurrentListContextValue = _CurrentListContextInterface;

const CurrentListContext: React.Context<CurrentListContextValue> =
  createContext<CurrentListContextValue>({
    currentList: null,
    setCurrentList: () => {},
    isShowingCompletedItems: false,
    setIsShowingCompletedItems: () => {},
  });

const CurrentListProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentList, setCurrentList] = useState("");
  const [isShowingCompletedItems, setIsShowingCompletedItems] = useState(false);

  return (
    <CurrentListContext
      value={{
        currentList,
        setCurrentList,
        isShowingCompletedItems,
        setIsShowingCompletedItems,
      }}
    >
      {children}
    </CurrentListContext>
  );
};

export const useCurrentListProvider = () => useContext(CurrentListContext);
export default CurrentListProvider;
