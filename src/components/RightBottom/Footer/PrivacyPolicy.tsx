import { ImCross } from "react-icons/im";

import ContactUsParagraph from "@/src/components/RightBottom/Footer/ContactUsParagraph";
import { useTranslation } from "@/src/i18n/client";
import { LanguageType } from "@/src/types/language";
import { ModalOpenType } from "@/src/types/modals";

type PrivacyPolicyType = {
  lang: LanguageType;
  setModalOpen: (prevState: any) => void;
  modalOpen: ModalOpenType;
  setHoverOnModal: (hoverOnModal: boolean) => void;
}

const PrivacyPolicy = ({ lang, setModalOpen, modalOpen, setHoverOnModal }: PrivacyPolicyType) => {
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
      privacy: false,
    }));
  }

  const handleClickInside = (event: any) => {
    event.stopPropagation();
  }

  const handleClickOutside = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      privacy: false,
    }));
  }

  const handleMouseEnter = () => {
    setHoverOnModal(true)
  }

  const handleMouseLeave = () => {
    setHoverOnModal(false)
  }

  const contentInfo = {
    en: "Privacy Policy",
    ja: "プライバシーポリシー",
  };

  return (
    <>
      {modalOpen.privacy &&
        <div className="fixed inset-0 bg-black bg-opacity-0 z-[60] flex justify-end h-screen" onClick={handleClickOutside}></div>
      }
      <div
        className={`transition-transform duration-150 rounded-lg z-[100] fixed bottom-[0px] sm:top-[0px] right-0 bg-neutral-100 dark:bg-neutral-950 p-6 w-full sm:w-[450px] h-[700px] sm:h-screen flex flex-col gap-4 ${modalOpen.privacy ? "visible translate-y-0 sm:translate-y-0 translate-x-0 sm:translate-x-0 ease-in" : "invisible translate-y-full sm:translate-y-[0px] -translate-x-[0px] sm:translate-x-full"}`}
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
        <div className="max-h-[90%] overflow-y-auto">
          <h1 className="text-2xl font-bold mb-6">
            {t("privacyPolicy.h1")}
          </h1>

          <p className="mb-4">
            {t("privacyPolicy.lastUpdated")}
          </p>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              1. {t("privacyPolicy.informationWeCollect.h2")}
            </h2>
            <p>
              {t("privacyPolicy.informationWeCollect.p-1")}
            </p>
            <p>
              {t("privacyPolicy.informationWeCollect.p-2")}
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              2. {t("privacyPolicy.changesToThisPrivacyPolicy.h2")}
            </h2>
            <p>
              {t("privacyPolicy.changesToThisPrivacyPolicy.p-1")}
            </p>
          </section>

          {/* <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              {t("privacyPolicy.thirdPartyAdvertisements.h2")}
            </h2>
            <p>
              {t("privacyPolicy.thirdPartyAdvertisements.p-1")}
            </p>
          </section> */}

          <ContactUsParagraph lang={lang} handleGoToContact={handleGoToContact} content={contentInfo} num={3} />
        </div>
      </div>
    </>
  )
}

export default PrivacyPolicy;
