import { useTodosProvider } from "../contexts/TodosProvider";

const Header = () => {
  const { isShowingCompletedItems, setIsShowingCompletedItems } =
    useTodosProvider();

  const handleClick = () => {
    setIsShowingCompletedItems(!isShowingCompletedItems);
  };

  return (
    <header className="m-0 col-span-full flex flex-row justify-between items-center gap-4">
      <h1 className="text-[4rem] font-bold">DONEZO</h1>
      <button
        className="cursor-pointer border-2 !p-1 rounded-md focus-visible:outline hover:outline outline-[#888] outline-offset-[-4px] mt-2"
        onClick={handleClick}
      >
        {isShowingCompletedItems ? "hide completed" : "show completed"}
      </button>
    </header>
  );
};

export default Header;
