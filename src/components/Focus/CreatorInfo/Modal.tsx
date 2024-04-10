import { useEffect } from "react";
import { ImCross } from "react-icons/im";

import { useTranslation } from "@/src/i18n/client";
import { CreatorDetailsType } from "@/src/types/creators";
import { LanguageType } from "@/src/types/language";
import { ModalOpenType } from "@/src/types/modals";
import { ModelDetailsType } from "@/src/types/models";

import Contents from "./Contents";

type CreatorInfoModal = {
  lang: LanguageType;
  modalOpen: ModalOpenType;
  setModalOpen: (prevState: any) => void;
  focusedModelsObj: ModelDetailsType;
  focusedModelsCreatorsObj: CreatorDetailsType;
  isFocusedMode: boolean;
}

const CreatorInfoModal = ({ lang, setModalOpen, focusedModelsCreatorsObj, focusedModelsObj, modalOpen, isFocusedMode }: CreatorInfoModal) => {

  const { t } = useTranslation(lang, "main");

  const handleClickClose = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      creatorInfo: false,
    }));
  }

  useEffect(() => {
    if (!isFocusedMode) {
      handleClickClose();
    }
  }, [isFocusedMode])

  const handleClickInside = (event: any) => {
    event.stopPropagation();
  }

  const handleClickOutside = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      creatorInfo: false,
    }));
  }

  return (
    <>
      {modalOpen.creatorInfo &&
        <div className="fixed inset-0 bg-black bg-opacity-0 z-[60] flex justify-end h-screen" onClick={handleClickOutside}></div>
      }
      <div
        className={`transition-transform duration-150 rounded-lg z-[100] fixed bottom-[0px] sm:top-[0px] left-0 bg-neutral-100 dark:bg-neutral-950 p-6 w-full sm:w-[384px] h-[700px] sm:h-screen flex flex-col gap-4 ${modalOpen.creatorInfo ? "translate-y-0 sm:translate-y-0 translate-x-0 sm:translate-x-0 ease-in" : "translate-y-full sm:translate-y-[0px] -translate-x-[0px] sm:-translate-x-full ease-out"}`} onClick={handleClickInside}
      >
        <div className="">
          <div className="flex justify-start mb-4">
            <div onClick={handleClickClose} className={"flex justify-center items-center w-12 h-12 sm:w-14 sm:h-14 bg-transparent border-[2.2px] sm:border-[3px] border-black dark:border-white rounded-full"}>
              <button className="text-xl font-bold"><ImCross /></button>
            </div>
          </div>
          <Contents lang={lang} creatorsObj={focusedModelsCreatorsObj} isFocusedMode={isFocusedMode} />
        </div>
        {focusedModelsObj.source ?
          <div className="flex justify-center mt-4">
            <div className=""> {t("creatorInfo.sourceCreator")} </div>
            <div>
              <a
                href={focusedModelsObj.source.sourceSite}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 dark:text-blue-400 text-sm font-bold"
              >
                {t("creatorInfo.source")}
              </a>
            </div>
          </div>
          :
          null
        }
      </div >
    </>
  )
}

export default CreatorInfoModal
