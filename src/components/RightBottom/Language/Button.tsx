"use client"
import { LanguageType } from "@/src/types/language";
import { ModalOpenType } from "@/src/types/modals";

import FlagComponent from "./FlagComponent";

type ChangeLanguageType = {
  lang: LanguageType;
  setModalOpen: (prevState: any) => void;
}

const ChangeLanguage = ({ lang, setModalOpen }: ChangeLanguageType) => {

  const handleClick = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      language: !prevState.language,
      footer: false,
    }));
  };

  return (
    <div className="cursor-pointer flex justify-center items-center w-12 h-12 sm:w-14 sm:h-14 bg-neutral-100 dark:bg-neutral-950 border-[1.5px] sm:border-[3px] border-black dark:border-white rounded-full z-[70]" onClick={handleClick}>
      <div className="h-[28px] w-[28px] sm:h-8 sm:w-8 flex justify-center items-center">
        <div className="shadow-md w-[28px] sm:w-8">
          <FlagComponent lang={lang} />
        </div>
      </div>
    </div>
  );
};

export default ChangeLanguage;
