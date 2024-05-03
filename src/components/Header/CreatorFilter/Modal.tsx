import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react";
import { BsFillPersonFill } from "react-icons/bs"
import { ImCross } from "react-icons/im";

import { useTranslation } from "@/src/i18n/client";
import { CreatorDetailsType } from "@/src/types/creators";
import { LanguageType } from "@/src/types/language";
import { ModalOpenType } from "@/src/types/modals";
import { languagesList } from "@/src/utils/language";
import { newRouterPush } from "@/src/utils/newRouterPush";

type CreatorFilterModalType = {
  lang: LanguageType;
  modalOpen: ModalOpenType;
  setModalOpen: (prevState: any) => void;
  creatorFiltersSlug: string
  setHoverOnModal: (hoverOnModal: boolean) => void;
  creators: CreatorDetailsType[]
}

const CreatorFilterModal = ({ lang, setModalOpen, creatorFiltersSlug, setHoverOnModal, modalOpen, creators
}: CreatorFilterModalType) => {
  const { t } = useTranslation(lang, "main");
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams()

  const filteredCreators = creators.filter(creator => {
    if (creator.slug === "") return false;

    if (searchTerm === "") return true;

    return languagesList.some(language =>
      creator.name[language] && creator.name[language].toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleClick = (paramValue: string) => {
    setHoverOnModal(false)
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      creatorFilter: false,
    }));
    newRouterPush(lang, [
      { key: "creator", value: paramValue },
      { key: "focusedMode", value: "off" }
    ], searchParams, router);

  }

  const handleMouseEnter = () => {
    setHoverOnModal(true)
  }

  const handleMouseLeave = () => {
    setHoverOnModal(false)
  }

  const handleClickClose = () => {
    setHoverOnModal(false)
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      creatorFilter: false,
    }));
  }

  const handleSearchChange = (event: any) => {
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
      creatorFilter: false,
    }));
  }

  const allButton = (
    <div
      className={"select-none rounded-md"}
      onClick={() => handleClick("")}
    >
      <div className="flex gap-4" >
        <div className={`rounded-md px-2 py-1 flex ${creatorFiltersSlug === "" ? " bg-emerald-500 text-white dark:text-black" : "hover:text-blue-700 dark:hover:text-blue-300 border-2"}`}>
          <div className="text-3xl"><BsFillPersonFill /></div>
          <div className="text-xl">{t("creatorFilter.searchAll")}</div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {modalOpen.creatorFilter &&
        <div className="fixed inset-0 bg-black bg-opacity-0 z-[60] flex justify-end h-screen" onClick={handleClickOutside}></div>
      }
      <div
        className={`transition-transform duration-150 rounded-lg z-[100] fixed bottom-[0px] sm:top-[0px] right-0 bg-neutral-100 dark:bg-neutral-950 p-6 w-full sm:w-[384px] h-[700px] sm:h-screen flex flex-col gap-4 ${modalOpen.creatorFilter ? "visible translate-y-0 sm:translate-y-0 translate-x-0 sm:translate-x-0 ease-in" : "invisible translate-y-full sm:translate-y-[0px] -translate-x-[0px] sm:translate-x-full"}`}
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
        <h2 className='text-2xl font-bold mb-4'>{t("creatorFilter.filterByCreator")}</h2>
        {allButton}
        <div className="flex items-center gap-2">
          <input
            onKeyDown={handleKeyPress}
            type="text"
            placeholder={t("creatorFilter.searchCreators")}
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-2 border border-gray-300 rounded w-[150px] sm:w-auto"
          />
          <button onClick={() => setSearchTerm("")} className="px-2 py-1 text-white bg-blue-500 rounded">{t("creatorFilter.clear")}</button>
        </div>
        <div className="flex flex-col gap-2 sm:gap-6 max-h-[70%] overflow-y-auto">
          {filteredCreators.map(({ name, slug }) => {
            const creatorsPath = slug ? slug : "placeHolder"

            return (
              <div
                key={slug}
                className={`select-none rounded-md ${creatorFiltersSlug === slug ? " bg-emerald-500 text-white dark:text-black" : "hover:text-blue-700 dark:hover:text-blue-300"}`}
                onClick={() => handleClick(slug)}
              >
                <div className="flex gap-4 py-2 px-1">
                  <div className="">
                    {slug === "all" ?
                      <div className="text-3xl"><BsFillPersonFill /></div>
                      :
                      <Image
                        src={`${process.env.NEXT_PUBLIC_GCS_BUCKET_PUBLIC_URL}/images/creators/${creatorsPath}/img.webp`}
                        width={30}
                        height={30}
                        alt={name[lang as LanguageType]}
                        className='rounded-md'
                      />
                    }
                  </div>
                  <div className="">
                    {name[lang as LanguageType]}
                  </div>
                </div>
              </div>
            )
          }
          )}
        </div>
      </div >
    </>
  )
}

export default CreatorFilterModal
