"use client";
import { useRouter, useSearchParams } from "next/navigation"
import { FaSearch } from "react-icons/fa";
import { ImCross } from "react-icons/im";

import { useTranslation } from "@/src/i18n/client";
import { LanguageType } from "@/src/types/language";
import { ModalOpenType } from "@/src/types/modals";
import { newRouterPush } from "@/src/utils/newRouterPush";

type SearchModalType = {
  lang: LanguageType;
  modalOpen: ModalOpenType;
  setModalOpen: (prevState: any) => void;
  searchWord: string
  setSearchWord: (searchWord: string) => void
}

const SearchModal = ({ lang, setModalOpen, searchWord, setSearchWord, modalOpen }: SearchModalType) => {
  const searchParams = useSearchParams()
  const router = useRouter();
  const { t } = useTranslation(lang, "main");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchWord) {
      newRouterPush(lang, [
        { key: "searchWord", value: searchWord },
        { key: "focusedMode", value: "off" }
      ], searchParams, router);
    } else {
      newRouterPush(lang, [], searchParams, router);
    }
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      search: false,
    }));
  };

  const handleClickClose = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      search: false,
    }));
  }

  const handleReset = (e: React.MouseEvent) => {
    e.preventDefault();

    if (searchWord !== "") {
      setSearchWord("");
      setModalOpen((prevState: ModalOpenType) => ({
        ...prevState,
        search: false,
      }));
      newRouterPush(lang, [
        { key: "searchWord", value: "" }
      ], searchParams, router);

    }
  }

  const handleClickInside = (event: any) => {
    event.stopPropagation();
  }

  const handleClickOutside = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      search: false,
    }));
  }

  return (
    <>
      {modalOpen.search &&
        <div className="fixed inset-0 bg-black bg-opacity-0 z-[60] flex justify-end h-screen" onClick={handleClickOutside}></div>
      }
      <div
        className={`transition-transform duration-150 rounded-lg z-[100] fixed bottom-[0px] sm:top-[0px] left-0 bg-neutral-100 dark:bg-neutral-950 p-6 w-full sm:w-[384px] h-[700px] sm:h-screen flex flex-col gap-4 ${modalOpen.search ? "visible translate-y-0 sm:translate-y-0 translate-x-0 sm:translate-x-0 ease-in" : "invisible translate-y-full sm:translate-y-[0px] -translate-x-[0px] sm:-translate-x-full"}`} onClick={handleClickInside}
      >
        <div className="flex justify-start mb-4">
          <div onClick={handleClickClose} className={"flex justify-center items-center w-12 h-12 sm:w-14 sm:h-14 bg-transparent border-[2.2px] sm:border-[3px] border-black dark:border-white rounded-full"}>
            <button className="text-base sm:text-xl font-bold"><ImCross /></button>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 mb-12">
          <div className="flex w-full">
            <div className="h-10">
              <input
                name="searchValue"
                className="w-36 md:w-56 lg:w-56 xl:w-72 h-[40px] rounded-l-lg text-xl border border-black dark:border-white border-solid p-2 focus:outline-none focus:border-2 focus:border-blue-500"
                placeholder={`${t("search.search")}...`}
                value={searchWord}
                onChange={handleInputChange}
              />
            </div>
            <button aria-label="Search" type="submit" className="flex justify-center items-center rounded-r-lg bg-neutral-100 dark:bg-neutral-950 p-0 border-y border-r border-black dark:border-white text-black dark:text-white h-[40px] w-[40px]" >
              <FaSearch size="2rem" />
            </button>
          </div>
          <div className="flex justify-start">
            <button onClick={handleReset} className="bg-red-500 text-white p-2 rounded mt-4">
              {t("search.reset")}
            </button>
          </div>
        </form >
      </div>
    </>
  );
}

export default SearchModal
