import { ImCross } from "react-icons/im";

import { useTranslation } from "@/src/i18n/client";
import { LanguageType } from "@/src/types/language";
import { ModalOpenType } from "@/src/types/modals";

type AboutType = {
  lang: LanguageType;
  setModalOpen: (prevState: any) => void;
  modalOpen: ModalOpenType;
  setHoverOnModal: (hoverOnModal: boolean) => void;
};

const About = ({
  lang,
  setModalOpen,
  modalOpen,
  setHoverOnModal,
}: AboutType) => {
  const { t } = useTranslation(lang, "main");

  const handleClickInside = (event: any) => {
    event.stopPropagation();
  };

  const handleClickOutside = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      about: false,
    }));
  };

  const handleClickClose = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      about: false,
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
      {modalOpen.about && (
        <div
          className='fixed inset-0 bg-black bg-opacity-0 z-[60] flex justify-end h-screen'
          onClick={handleClickOutside}
        ></div>
      )}
      <div
        className={`transition-transform duration-150 rounded-lg z-[100] fixed bottom-[0px] sm:top-[0px] right-0 bg-neutral-100 dark:bg-neutral-950 p-6 w-full sm:w-[450px] h-[700px] sm:h-screen flex flex-col gap-4 ${modalOpen.about ? "visible translate-y-0 sm:translate-y-0 translate-x-0 sm:translate-x-0 ease-in" : "invisible translate-y-full sm:translate-y-[0px] -translate-x-[0px] sm:translate-x-full"}`}
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
        <div className='z-100 mx-6 flex flex-col gap-6'>
          <div>
            <h1 className='text-2xl font-bold'>{t("about.title")}</h1>
            <div className='text-base mt-2'>
              <p>{t("about.description")}</p>
            </div>
          </div>
          <div>
            <h2 className='text-xl font-semibold mb-1'>
              {t("about.articleAboutMeshmell")}
            </h2>
            <a
              href={`https://yurimell.com/${lang}/diary/detail/3`}
              className='text-blue-500 hover:underline'
            >
              {`https://yurimell.com/${lang}/diary/detail/3`}
            </a>
          </div>
          <div>
            <h2 className='text-xl font-semibold mb-1'>
              {t("about.articleAboutMeshmellTechnology")}
            </h2>
            <a
              href={`https://yurimell.com/${lang}/diary/detail/4`}
              className='text-blue-500 hover:underline'
            >
              {`https://yurimell.com/${lang}/diary/detail/4`}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
