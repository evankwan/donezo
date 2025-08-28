import { useTodosProvider } from "../contexts/TodosProvider";

const Header = () => {
  const { isShowingCompletedItems, setIsShowingCompletedItems } =
    useTodosProvider();

  const handleClick = () => {
    setIsShowingCompletedItems(!isShowingCompletedItems);
  };

  return (
    <header className="p-4 col-span-full">
      <h1 className="text-[4rem] font-bold">DONEZO</h1>
      <button onClick={handleClick}>
        {isShowingCompletedItems ? "hide completed" : "show completed"}
      </button>
    </header>
  );
};

export default Header;
