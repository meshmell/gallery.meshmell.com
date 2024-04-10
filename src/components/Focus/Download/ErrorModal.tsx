import { useEffect } from "react";
import { ImCross } from "react-icons/im";
import { RiShareBoxFill } from "react-icons/ri";

import { useTranslation } from "@/src/i18n/client";
import { LanguageType } from "@/src/types/language";
import { ModalOpenType } from "@/src/types/modals";

type DownloadErrorModalType = {
  lang: LanguageType;
  setModalOpen: (prevState: any) => void;
  isFocusedMode: boolean;
}

const DownloadErrorModal = ({ lang, setModalOpen, isFocusedMode }: DownloadErrorModalType) => {

  const { t } = useTranslation(lang, "main");

  useEffect(() => {
    if (!isFocusedMode) {
      handleClickClose();
    }
  }, [isFocusedMode])

  const handleClickClose = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      downloadError: false,
    }));
  }

  const handleGoToContact = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      downloadError: false,
      contact: true,
    }));
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[110] flex justify-center items-center">
      <div className="bg-neutral-100 dark:bg-neutral-950 p-6 w-[384px] h-96 rounded-lg">
        <div className="flex flex-col gap-2">
          <div className="flex justify-start mb-4">
            <div onClick={handleClickClose} className={"flex justify-center items-center w-12 h-12 sm:w-14 sm:h-14 bg-transparent border-[2.2px] sm:border-[3px] border-black dark:border-white rounded-full"}>
              <button className="text-base sm:text-xl font-bold"><ImCross /></button>
            </div>
          </div>
          <div className="mb-8 text-3xl font-bold">
            {t("download.sorry")}
          </div>
          <div className="mb-8">
            {t("download.couldNotFind")}
          </div>
          <div className="flex gap-1 text-blue-600 dark:text-blue-400" onClick={handleGoToContact}>
            <div className="underline cursor-pointer">{t("download.contactUs")}</div>
            <span className="mt-[6px]" >
              <RiShareBoxFill />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DownloadErrorModal
