import { ImCross } from "react-icons/im";

import SNSLinksForYuri from "@/src/components/RightBottom/Footer/Who/SnsLinks/YuriNakansihi";
import { useTranslation } from "@/src/i18n/client";
import { CreatorDetailsType } from "@/src/types/creators";
import { LanguageType } from "@/src/types/language";
import { ModalOpenType } from "@/src/types/modals";

type WhoType = {
  lang: LanguageType;
  setModalOpen: (prevState: any) => void;
  modalOpen: ModalOpenType;
  setHoverOnModal: (hoverOnModal: boolean) => void;
  creators: CreatorDetailsType[];
}

const Who = ({ lang, setModalOpen, modalOpen, setHoverOnModal, creators }: WhoType) => {
  const { t } = useTranslation(lang, "main");;

  const handleClickInside = (event: any) => {
    event.stopPropagation();
  }

  const handleClickOutside = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      who: false,
      forDevelopers: false,
      lightAndDarkTheme: false,
    }));
  }

  const handleClickClose = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      who: false,
      forDevelopers: false,
      lightAndDarkTheme: false,
    }));
  }

  const handleMouseEnter = () => {
    setHoverOnModal(true)
  }

  const handleMouseLeave = () => {
    setHoverOnModal(false)
  }

  const developersInfo = creators.filter((creator) => creator.roles.includes("developer"));

  return (
    <>
      {modalOpen.who &&
        <div className="fixed inset-0 bg-black bg-opacity-0 z-[60] flex justify-end h-screen" onClick={handleClickOutside}></div>
      }
      <div
        className={`transition-transform duration-150 rounded-lg z-[100] fixed bottom-[0px] sm:top-[0px] right-0 bg-neutral-100 dark:bg-neutral-950 p-6 w-full sm:w-[450px] h-[700px] sm:h-screen flex flex-col gap-4 ${modalOpen.who ? "translate-y-0 sm:translate-y-0 translate-x-0 sm:translate-x-0 ease-in" : "translate-y-full sm:translate-y-[0px] -translate-x-[0px] sm:translate-x-full ease-out"}`}
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
        <div className="mx-4">
          <section className="mb-8 flex flex-col min-h-screen w-full">
            <h1 className={"text-2xl mb-6 font-bold"}>
              {t("who.developers")}
            </h1>
            {developersInfo.map((developer: CreatorDetailsType) => (
              <div key={developer.slug} className="mb-4">
                <div className="text-xl">
                  {developer.name[lang as LanguageType]}
                </div>
                <div className="text-base mb-2">
                  {developer.description[lang as LanguageType]}
                </div>
                <SNSLinksForYuri />
              </div>
            ))}
          </section >
          <div>
            {t("who.contributorWanted")}
          </div>
        </div>
      </div>
    </>
  )
}

export default Who;
