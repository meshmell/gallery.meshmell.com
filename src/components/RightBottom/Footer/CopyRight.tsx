import { ImCross } from "react-icons/im";
import { RiShareBoxFill } from "react-icons/ri";

import ContactUsParagraph from "@/src/components/RightBottom/Footer/ContactUsParagraph";
import { useTranslation } from "@/src/i18n/client";
import { LanguageType } from "@/src/types/language";
import { ModalOpenType } from "@/src/types/modals";

type CopyRightType = {
  lang: LanguageType;
  setModalOpen: (prevState: any) => void;
  modalOpen: ModalOpenType;
  setHoverOnModal: (hoverOnModal: boolean) => void;
}

const CopyRight = ({ lang, setModalOpen, modalOpen, setHoverOnModal }: CopyRightType) => {
  const { t } = useTranslation(lang, "main");;

  const handleClickInside = (event: any) => {
    event.stopPropagation();
  }

  const handleClickOutside = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      copyRight: false,
    }));
  }

  const handleGoToContact = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      contact: true,
    }));
  }

  const handleClickClose = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      copyRight: false,
    }));
  }

  const handleMouseEnter = () => {
    setHoverOnModal(true)
  }

  const handleMouseLeave = () => {
    setHoverOnModal(false)
  }

  const contentInfo = {
    en: "CopyRight",
    ja: "著作権ポリシー",
  };

  return (
    <>
      {modalOpen.copyRight &&
        <div className="fixed inset-0 bg-black bg-opacity-0 z-[60] flex justify-end h-screen" onClick={handleClickOutside}></div>
      }
      <div
        className={`transition-transform duration-150 rounded-lg z-[100] fixed bottom-[0px] sm:top-[0px] right-0 bg-neutral-100 dark:bg-neutral-950 p-6 w-full sm:w-[450px] h-[700px] sm:h-screen flex flex-col gap-4 ${modalOpen.copyRight ? "visible translate-y-0 sm:translate-y-0 translate-x-0 sm:translate-x-0 ease-in" : "invisible translate-y-full sm:translate-y-[0px] -translate-x-[0px] sm:translate-x-full"}`}
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
        <div className="max-h-[90%] overflow-y-auto flex flex-col gap-12">
          <div>
            <h1 className="text-2xl font-bold">
              {t("copyRight.h1")}
            </h1>
            <p className="mt-2">
              {t("copyRight.lastUpdated")}
            </p>
          </div>
          <section className="flex flex-col gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-1">
                1. {t("copyRight.licenseOfEachModel.h2")}
              </h2>
              <p>
                {t("copyRight.licenseOfEachModel.p-1")}
              </p>
              <div className="text-base cursor-pointer flex text-blue-600 dark:text-blue-400">
                <span>
                  {t("copyRight.cc0")}
                </span>
                <span className="mt-[6px] sm:mt-[5px] ml-1">
                  <a href="https://creativecommons.org/publicdomain/zero/1.0/">
                    <RiShareBoxFill />
                  </a>
                </span>
              </div>
              <p className="mt-2">
                {t("copyRight.licenseOfEachModel.p-2")}
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-1">
                2. {t("copyRight.licenseOfSoftware.h2")}
              </h2>
              <p>
                {t("copyRight.licenseOfSoftware.p-1")}
              </p>
              <p>
                {t("copyRight.licenseOfSoftware.p-2")}
                <a
                  href={`${process.env.NEXT_PUBLIC_MESHMELL_GITHUB_REPOSITORY}`}
                  className="text-blue-500 hover:underline"
                >
                  {process.env.NEXT_PUBLIC_MESHMELL_GITHUB_REPOSITORY}
                </a>
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-1">
                3. {t("copyRight.changesToThisCopyrightPolicy.h2")}
              </h2>
              <p>
                {t("copyRight.changesToThisCopyrightPolicy.p-1")}
              </p>
            </div>
          </section>
          <ContactUsParagraph lang={lang} handleGoToContact={handleGoToContact} content={contentInfo} num={4} />
        </div>
      </div>
    </>
  )
}

export default CopyRight;
