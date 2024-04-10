"use client"
import { FaPeopleGroup } from "react-icons/fa6";

import { useTranslation } from "@/src/i18n/client";
import { LanguageType } from "@/src/types/language";
import { ModalOpenType } from "@/src/types/modals";

type SponsorsButtonType = {
  lang: LanguageType
  setModalOpen: (prevState: any) => void;
}

const SponsorButton = ({ lang, setModalOpen }: SponsorsButtonType) => {
  const { t } = useTranslation(lang, "main");;

  const handleClick = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      sponsors: !prevState.sponsors,
    }));
  };

  let classNameForButton = "select-none -mt-2" + " ";

  switch (lang) {
    case "en":
      classNameForButton += "text-sm";
      break;
    case "ja":
      classNameForButton += "text-[10px]";
      break;
    default:
      classNameForButton += "text-sm";
      break;
  }

  return (
    <>
      <div className="cursor-pointer flex flex-col justify-center items-center w-[70px] h-12 sm:w-[70px] sm:h-14 bg-neutral-100 dark:bg-neutral-950 border-[1.5px] sm:border-[3px] border-black dark:border-white  rounded-md" onClick={handleClick}>
        <div className="p-1 flex flex-col justify-center">
          <FaPeopleGroup className="text-3xl sm:text-4xl mx-auto" />
          <div className={classNameForButton}>{t("sponsors.title")}</div>
        </div>
      </div>
    </>
  );
};

export default SponsorButton;
