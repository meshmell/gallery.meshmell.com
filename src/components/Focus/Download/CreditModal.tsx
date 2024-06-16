import { useEffect } from "react";
import { ImCross } from "react-icons/im";

import CreatorInfo from "@/src/components/Focus/CreatorInfo/Contents";
import { useTranslation } from "@/src/i18n/client";
import { CreatorDetailsType } from "@/src/types/creators";
import { LanguageType } from "@/src/types/language";
import { ModalOpenType } from "@/src/types/modals";

type DownloadCreditModalType = {
  lang: LanguageType;
  setModalOpen: (prevState: any) => void;
  focusedModelsCreatorsObj: CreatorDetailsType;
  isFocusedMode: boolean;
};

const DownloadCreditModal = ({
  lang,
  setModalOpen,
  focusedModelsCreatorsObj,
  isFocusedMode,
}: DownloadCreditModalType) => {
  const { t } = useTranslation(lang, "main");

  useEffect(() => {
    if (!isFocusedMode) {
      handleClickClose();
    }
  }, [isFocusedMode]);

  const handleClickClose = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      downloadCredit: false,
    }));
  };

  return (
    <div className='fixed inset-0 bg-black dark:bg-gray-500 bg-opacity-50 dark:bg-opacity-50 z-[110] flex justify-center items-center'>
      <div className='bg-neutral-100 dark:bg-neutral-900 p-6 w-96 rounded-lg'>
        <div className='flex flex-col gap-4'>
          <div className='flex justify-start mb-4'>
            <div
              onClick={handleClickClose}
              className={
                "flex justify-center items-center w-12 h-12 sm:w-14 sm:h-14 bg-transparent border-2 sm:border-4 border-black dark:border-white rounded-full"
              }
            >
              <button className='text-base sm:text-xl font-bold'>
                <ImCross />
              </button>
            </div>
          </div>
          <div className='text-xl sm:text-2xl font-bold'>
            {t("download.thankTo")}
          </div>
          <CreatorInfo
            creatorsObj={focusedModelsCreatorsObj}
            lang={lang}
            isFocusedMode={isFocusedMode}
          />
        </div>
      </div>
    </div>
  );
};

export default DownloadCreditModal;
