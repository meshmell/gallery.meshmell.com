import { useSearchParams } from "next/navigation"
import { useEffect } from "react";
import { ImCross } from "react-icons/im";

import SnsLinksForShareThisSite from "@/src/components/ModalComponents/SnsLinksForShareThisSite";
import { useTranslation } from "@/src/i18n/client";
import { LanguageType } from "@/src/types/language";
import { ModalOpenType } from "@/src/types/modals";

type ShareModalWhenListType = {
  lang: LanguageType;
  setModalOpen: (prevState: any) => void;
  modalOpen: ModalOpenType;
  isFocusedMode: boolean;
}

const ShareModalWhenList = ({ lang, setModalOpen, modalOpen, isFocusedMode }: ShareModalWhenListType) => {
  const { t } = useTranslation(lang, "main");
  const params = useSearchParams();
  const baseUrl = params.toString()

  useEffect(() => {
    if (isFocusedMode) {
      handleClickClose();
    }
  }, [isFocusedMode])

  const handleClickClose = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      shareThisPageInList: false,
    }));
  }

  const handleClickInside = (event: any) => {
    event.stopPropagation();
  }

  const handleClickOutside = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      shareThisPageInList: false,
    }));
  }

  return (
    <>
      {modalOpen.shareThisPageInList &&
        <div className="fixed inset-0 bg-black bg-opacity-0 z-[60] flex justify-end h-screen" onClick={handleClickOutside}></div>
      }
      <div
        className={`transition-transform duration-150 rounded-lg z-[100] fixed bottom-[0px] sm:top-[0px] left-0 bg-neutral-100 dark:bg-neutral-950 p-6 w-full sm:w-[384px] h-[700px] sm:h-screen flex flex-col gap-4 ${modalOpen.shareThisPageInList ? "visible translate-y-0 sm:translate-y-0 translate-x-0 sm:translate-x-0 ease-in" : "invisible translate-y-full sm:translate-y-[0px] -translate-x-[0px] sm:-translate-x-full"}`} onClick={handleClickInside}
      >
        <div className="flex justify-start mb-4">
          <div onClick={handleClickClose} className={"flex justify-center items-center w-12 h-12 sm:w-14 sm:h-14 bg-transparent border-2 sm:border-4 border-black dark:border-white rounded-full"}>
            <button className="text-base sm:text-xl font-bold"><ImCross /></button>
          </div>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold">
          {t("share.title")}
        </h2>
        <div className="">
          <SnsLinksForShareThisSite lang={lang} baseUrl={`https://meshmell.com/${lang}/${baseUrl}`} />
        </div>
      </div>
    </>
  )
}

export default ShareModalWhenList
