import { useRouter, useSearchParams } from "next/navigation"
import React, { useState } from "react";
import { ImCross } from "react-icons/im";

import { useTranslation } from "@/src/i18n/client";
import { CategoryDetailsType } from "@/src/types/categories";
import { LanguageType } from "@/src/types/language";
import { ModalOpenType } from "@/src/types/modals";
import { defaultCategoryDetails } from "@/src/utils/defaultData/categories";
import { languagesList } from "@/src/utils/language";
import { newRouterPush } from "@/src/utils/newRouterPush";

type CategoryFilterModalType = {
  lang: LanguageType;
  modalOpen: ModalOpenType;
  setModalOpen: (prevState: any) => void;
  categoryFiltersSlug: string
  setHoverOnModal: (hoverOnModal: boolean) => void;
  categories: CategoryDetailsType[]
}

const CategoryFilterModal = ({ lang, setModalOpen, categoryFiltersSlug, setHoverOnModal, modalOpen, categories }: CategoryFilterModalType) => {

  const { t } = useTranslation(lang, "main");

  const [searchTerm, setSearchTerm] = useState("");
  const searchParams = useSearchParams()

  const filteredCategories = categories.filter(category => {
    if (category.slug === "") return false;

    if (searchTerm === "") return true;

    return languagesList.some(language =>
      category.name[language] && category.name[language].toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const categoryFiltersSlugData = categories.find((category: CategoryDetailsType) => category.slug === categoryFiltersSlug) || defaultCategoryDetails;

  const router = useRouter();

  const handleClick = (paramValue: string) => {
    setHoverOnModal(false)
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      categoryFilter: false,
    }));
    newRouterPush(lang, [
      { key: "category", value: paramValue },
      { key: "focusedMode", value: "off" }
    ], searchParams, router);

  }

  const handleClickClose = () => {
    setHoverOnModal(false)
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      categoryFilter: false,
    }));
  }

  const handleMouseEnter = () => {
    setHoverOnModal(true)
  }

  const handleMouseLeave = () => {
    setHoverOnModal(false)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  }

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      event.target.blur();
    }
  }

  const handleClickInside = (event: any) => {
    event.stopPropagation();
  }

  const handleClickOutside = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      categoryFilter: false,
    }));
  }

  const allButton = (
    <div
      className={"select-none rounded-md"}
      onClick={() => handleClick("all")}
    >
      <div className="flex" >
        <div className={`rounded-md px-2 py-1 flex ${categoryFiltersSlug === "all" ? " bg-emerald-500 text-white dark:text-black" : "hover:text-blue-700 dark:hover:text-blue-300 border-2"}`}>
          <div className="text-3xl">
            {categories.find((category: CategoryDetailsType) => category.slug === "all")?.icon}
          </div>
          <div className="text-xl mt-[6px]">{t("categoryFilter.searchAll")}</div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {modalOpen.categoryFilter &&
        <div className="fixed inset-0 bg-black bg-opacity-0 z-[60] flex justify-end h-screen" onClick={handleClickOutside}></div>
      }
      <div
        className={`transition-transform duration-150 rounded-lg z-[100] fixed bottom-[0px] sm:top-[0px] right-0 bg-neutral-100 dark:bg-neutral-950 p-6 w-full sm:w-[384px] h-[700px] sm:h-screen flex flex-col gap-4 ${modalOpen.categoryFilter ? "translate-y-0 sm:translate-y-0 translate-x-0 sm:translate-x-0 ease-in" : "translate-y-full sm:translate-y-[0px] -translate-x-[0px] sm:translate-x-[384px] ease-out"}`}
        onClick={handleClickInside}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={() => setHoverOnModal(true)}
        onTouchEnd={() => setHoverOnModal(false)}
      >
        <div className="flex justify-end mb-4">
          <div onClick={handleClickClose} className={"flex justify-center items-center w-12 h-12 sm:w-14 sm:h-14 bg-transparent border-[2.2px] sm:border-[3px] border-black dark:border-white rounded-full"}>
            <button className="text-base sm:text-xl font-bold"><ImCross /></button>
          </div>
        </div>
        <h2 className='text-2xl font-bold mb-4'>{t("categoryFilter.filterByCategory")}</h2>
        {allButton}
        <div className="flex items-center gap-2 mt-2 sm:mt-4">
          <input
            onKeyDown={handleKeyPress}
            type="text"
            placeholder={t("categoryFilter.searchCategories")}
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-2 border border-gray-300 rounded w-[150px] sm:w-auto"
          />
          <button onClick={() => setSearchTerm("")} className="px-2 py-1 text-white bg-blue-500 rounded">{t("categoryFilter.clear")}</button>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:gap-6 max-h-[60%] overflow-y-auto mt-4">
          {filteredCategories.map(({ slug, color, name, icon }) => (
            <div
              key={slug}
              className={`select-none rounded-md px-2 py-1 ${categoryFiltersSlugData.slug === slug ? `${color} bg-emerald-500 text-white dark:text-black` : "hover:text-blue-700 dark:hover:text-blue-300"}`}
              onClick={() => handleClick(slug)}
            >
              {name[lang as LanguageType]}
              <div className="text-3xl">{icon}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default CategoryFilterModal
