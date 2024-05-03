import { useRouter, useSearchParams } from "next/navigation"
import { FaSearch } from "react-icons/fa";
import { ImCross } from "react-icons/im";

import { LanguageType } from "@/src/types/language";
import { ModalOpenType } from "@/src/types/modals";
import { newRouterPush } from "@/src/utils/newRouterPush";

type SearchButtonType = {
  lang: LanguageType
  setModalOpen: (prevState: any) => void;
  searchWord: string
  modalOpen: ModalOpenType
  setSearchWord: (searchWord: string) => void
}

const SearchButton = ({ lang, setModalOpen, searchWord, modalOpen, setSearchWord }: SearchButtonType) => {

  const router = useRouter();
  const searchParams = useSearchParams();
  const isSearchWordEmpty = searchWord === "";

  const handleReset = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!isSearchWordEmpty) {
      setSearchWord("");
      newRouterPush(
        lang,
        [
          { key: "searchWord", value: "" }
        ],
        searchParams,
        router
      );
    }
  }

  const handleClick = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      search: !prevState.search,
      modelInfo: false,
      download: false,
      downloadCredit: false,
      creator: false,
      actionsSwitch: false,
      creatorInfoInNotFocused: false,
      footer: false,
      language: false,
      categoryFilter: false,
      creatorFilter: false,
      terms: false,
      privacy: false,
      contact: false,
      about: false,
      who: false,
      forDevelopers: false,
      forSponsors: false,
      lightAndDarkTheme: false,
      copyRight: false,
      viewsSwitch: false,
      sponsors: false,
      shareThisPage: false,
      shareThisPageInList: false,
    }));
  }

  return (
    <div className={`${modalOpen.search ? "bg-blue-500 border-blue-500" : "bg-neutral-100 dark:bg-neutral-950 border-black x dark:border-white"} fixed top-[60px] sm:top-[80px] left-[10px] flex cursor-pointer justify-start items-center z-[70] rounded-[18px] sm:rounded-[24px] border-[1.5px] sm:border-[3px]`}>
      <div className={` ${searchWord !== "" ? "rounded-l-full" : "rounded-full"} px-1 flex justify-center items-center ${isSearchWordEmpty ? "w-12 sm:w-14" : ""} h-12 sm:h-14 `} aria-label="Open Search Page" onClick={handleClick}>
        <FaSearch className={`${modalOpen.search ? "text-white" : "text-black dark:text-white"} text-3xl sm:text-4xl`} />
        <div className="text-2xl sm:text-3xl -mt-[3px] sm:-mt-[5px]">{searchWord.substring(0, 5)}</div>
      </div>

      {
        searchWord !== "" &&
        <div className={"pr-1 flex justify-center items-center rounded-r-full h-12 sm:h-14"}>
          <div onClick={handleReset} className={"ml-1 flex justify-center items-center w-8 h-8 sm:w-10 sm:h-10 border-2 border-black dark:border-white rounded-full z-60"}>
            <button className="dark:text-white text-base sm:text-xl"><ImCross /></button>
          </div>
        </div>
      }
    </div >
  );
};

export default SearchButton;
