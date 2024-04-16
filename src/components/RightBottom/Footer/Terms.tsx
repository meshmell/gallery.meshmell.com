import { ImCross } from "react-icons/im";

import ContactUsParagraph from "@/src/components/RightBottom/Footer/ContactUsParagraph";
import { useTranslation } from "@/src/i18n/client";
import { LanguageType } from "@/src/types/language";
import { ModalOpenType } from "@/src/types/modals";

type TermsType = {
  lang: LanguageType;
  setModalOpen: (prevState: any) => void;
  modalOpen: ModalOpenType;
  setHoverOnModal: (hoverOnModal: boolean) => void;
}

const Terms = ({ lang, setModalOpen, modalOpen, setHoverOnModal }: TermsType) => {
  const { t } = useTranslation(lang, "main");;

  const handleGoToContact = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      contact: true,
    }));
  }

  const handleClickClose = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      terms: false,
    }));
  }

  const contentInfo = {
    en: "Terms",
    ja: "利用規約",
  };

  const handleClickInside = (event: any) => {
    event.stopPropagation();
  }

  const handleClickOutside = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      terms: false,
    }));
  }

  const handleMouseEnter = () => {
    setHoverOnModal(true)
  }

  const handleMouseLeave = () => {
    setHoverOnModal(false)
  }

  return (
    <>
      {modalOpen.terms &&
        <div className="fixed inset-0 bg-black bg-opacity-0 z-[60] flex justify-end h-screen" onClick={handleClickOutside}></div>
      }
      <div
        className={`transition-transform duration-150 rounded-lg z-[100] fixed bottom-[0px] sm:top-[0px] right-0 bg-neutral-100 dark:bg-neutral-950 p-6 w-full sm:w-[450px] h-[700px] sm:h-screen flex flex-col gap-4 ${modalOpen.terms ? "visible translate-y-0 sm:translate-y-0 translate-x-0 sm:translate-x-0 ease-in" : "invisible translate-y-full sm:translate-y-[0px] -translate-x-[0px] sm:translate-x-full"}`}
        onClick={handleClickInside}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={() => setHoverOnModal(true)}
        onTouchEnd={() => setHoverOnModal(false)}
      >
        <div className="flex justify-end mb-4">
          <div onClick={handleClickClose} className={"flex justify-center items-center w-12 h-12 sm:w-14 sm:h-14 bg-transparent border-2 sm:border-4 border-black dark:border-white  rounded-full"}>
            <button className="text-base sm:text-xl font-bold"><ImCross /></button>
          </div>
        </div>
        <div className="max-h-[90%] overflow-y-auto">
          <div className="mx-4">
            <h1 className="text-2xl font-bold mb-6">
              {t("terms.h1")}
            </h1>
            <p className="mb-4">
              {t("terms.lastUpdated")}
            </p>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2">
                1. {t("terms.acceptanceOfTerms.h2")}
              </h2>
              <p>
                {t("terms.acceptanceOfTerms.p-1")}
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2">
                2. {t("terms.changesToTerms.h2")}
              </h2>
              <p>
                {t("terms.changesToTerms.p-1")}
              </p>
            </section>

            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2">
                3. {t("terms.limitationsOfLiability.h2")}
              </h2>
              <p>
                {t("terms.limitationsOfLiability.p-1")}
              </p>
            </section>
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2">
                4. {t("terms.governingLaw.h2")}
              </h2>
              <p>
                {t("terms.governingLaw.p-1")}
              </p>
            </section>
            <ContactUsParagraph lang={lang} handleGoToContact={handleGoToContact} content={contentInfo} num={5} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Terms;
