"use client";
import { ImCross } from "react-icons/im";

import LanguageFlag from "@/src/components/RightBottom/Language/Flag";
import { useTranslation } from "@/src/i18n/client";
import { LanguageType } from "@/src/types/language";
import { ModalOpenType } from "@/src/types/modals";

type LanguageSwitchModalType = {
  lang: LanguageType;
  setModalOpen: (prevState: any) => void;
  setHoverOnModal: (hoverOnModal: boolean) => void;
  modalOpen: ModalOpenType;
};

const LanguageSwitchModal = ({
  lang,
  setModalOpen,
  setHoverOnModal,
  modalOpen,
}: LanguageSwitchModalType) => {
  const { t } = useTranslation(lang, "main");

  const handleClickInside = (event: any) => {
    event.stopPropagation();
  };

  const handleClickOutside = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      language: false,
    }));
  };

  const handleClickClose = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      language: false,
    }));
  };

  const handleMouseEnter = () => {
    setHoverOnModal(true);
  };

  const handleMouseLeave = () => {
    setHoverOnModal(false);
  };

  return (
    <>
      {modalOpen.language && (
        <div
          className='fixed inset-0 bg-black bg-opacity-0 z-[60] flex justify-end h-screen'
          onClick={handleClickOutside}
        ></div>
      )}
      <div
        className={`transition-transform duration-150 rounded-lg z-[100] fixed bottom-[0px] sm:top-[0px] right-0 bg-neutral-100 dark:bg-neutral-950 p-6 w-full sm:w-[208px] h-[500px] sm:h-screen flex flex-col gap-4 ${modalOpen.language ? "visible translate-y-0 sm:translate-y-0 translate-x-0 sm:translate-x-0 ease-in" : "invisible translate-y-full sm:translate-y-[0px] -translate-x-[0px] sm:translate-x-full"}`}
        onClick={handleClickInside}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={() => setHoverOnModal(true)}
        onTouchEnd={() => setHoverOnModal(false)}
      >
        <div className='flex justify-end mb-4'>
          <div
            onClick={handleClickClose}
            className={
              "flex justify-center items-center w-12 h-12 sm:w-14 sm:h-14 bg-transparent border-[2.2px] sm:border-[3px] border-black dark:border-white rounded-full"
            }
          >
            <button className='text-base sm:text-xl font-bold'>
              <ImCross />
            </button>
          </div>
        </div>
        <h2 className='text-2xl font-bold'>
          {t("languageSwitch.switchLanguage")}
        </h2>
        <div className='flex flex-col gap-8 mt-10 mb-10'>
          <LanguageFlag lang='en' text='English' setModalOpen={setModalOpen} />
          <LanguageFlag lang='ja' text='日本語' setModalOpen={setModalOpen} />
        </div>
      </div>
    </>
  );
};

export default LanguageSwitchModal;
