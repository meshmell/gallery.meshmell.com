import { ImCross } from "react-icons/im";

import { useTranslation } from "@/src/i18n/client";
import { LanguageType } from "@/src/types/language";
import { ModalOpenType } from "@/src/types/modals";

type ForSponsorsType = {
  lang: LanguageType;
  setModalOpen: (prevState: any) => void;
  modalOpen: ModalOpenType;
  setHoverOnModal: (hoverOnModal: boolean) => void;
};

const ForSponsors = ({
  lang,
  setModalOpen,
  modalOpen,
  setHoverOnModal,
}: ForSponsorsType) => {
  const { t } = useTranslation(lang, "main");

  const handleClickInside = (event: any) => {
    event.stopPropagation();
  };

  const handleClickOutside = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      forSponsors: false,
    }));
  };

  const handleClickClose = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      forSponsors: false,
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
      {modalOpen.forSponsors && (
        <div
          className='fixed inset-0 bg-black bg-opacity-0 z-[60] flex justify-end h-screen'
          onClick={handleClickOutside}
        ></div>
      )}
      <div
        className={`overflow-y-auto transition-transform duration-150 rounded-lg z-[100] fixed bottom-[0px] sm:top-[0px] right-0 bg-neutral-100 dark:bg-neutral-950 p-6 w-full sm:w-[450px] h-[700px] sm:h-screen flex flex-col gap-4 ${modalOpen.forSponsors ? "translate-y-0 sm:translate-y-0 translate-x-0 sm:translate-x-0 ease-in" : "translate-y-full sm:translate-y-[0px] -translate-x-[0px] sm:translate-x-full ease-out"}`}
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
        <div className='z-100 mx-6'>
          <h1 className='text-2xl font-bold mb-6'>{t("forSponsors.title")}</h1>
          <div className='flex flex-col text-base gap-2 mt-6 max-w-xl mx-auto'>
            <p>{t("forSponsors.description")}</p>
            <div className='bg-white rounded-lg shadow-lg p-6 dark:bg-neutral-800'>
              <h3 className='text-2xl font-bold mb-2'>
                {t("forSponsors.donation.oneThousand.title")}
              </h3>
              <ul>
                <li>
                  {t("forSponsors.donation.textSize")}:{" "}
                  {t("forSponsors.donation.oneThousand.textSize")}
                </li>
                <li>
                  {t("forSponsors.donation.contrast")}:{" "}
                  {t("forSponsors.donation.oneThousand.contrast")}
                </li>
                <li>
                  {t("forSponsors.donation.link")}:{" "}
                  {t("forSponsors.donation.oneThousand.link")}
                </li>
              </ul>
            </div>
            <div className='bg-white rounded-lg shadow-lg p-6 dark:bg-neutral-800'>
              <h3 className='text-2xl font-bold mb-2'>
                {t("forSponsors.donation.fiveHundred.title")}
              </h3>
              <ul>
                <li>
                  {t("forSponsors.donation.textSize")}:{" "}
                  {t("forSponsors.donation.fiveHundred.textSize")}
                </li>
                <li>
                  {t("forSponsors.donation.contrast")}:{" "}
                  {t("forSponsors.donation.fiveHundred.contrast")}
                </li>
                <li>
                  {t("forSponsors.donation.link")}:{" "}
                  {t("forSponsors.donation.fiveHundred.link")}
                </li>
              </ul>
            </div>
            <div className='bg-white rounded-lg shadow-lg p-6 dark:bg-neutral-800'>
              <h3 className='text-2xl font-bold mb-2'>
                {t("forSponsors.donation.oneHundred.title")}
              </h3>
              <ul>
                <li>
                  {t("forSponsors.donation.textSize")}:{" "}
                  {t("forSponsors.donation.oneHundred.textSize")}{" "}
                </li>
                <li>
                  {t("forSponsors.donation.contrast")}:{" "}
                  {t("forSponsors.donation.oneHundred.contrast")}
                </li>
                <li>
                  {t("forSponsors.donation.link")}:{" "}
                  {t("forSponsors.donation.oneHundred.link")}{" "}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForSponsors;
