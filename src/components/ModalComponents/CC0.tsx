import { RiShareBoxFill, RiFileCopy2Line } from "react-icons/ri";

import { useTranslation } from "@/src/i18n/client";
import { LanguageType } from "@/src/types/language";

type InfoModalType = {
  lang: LanguageType;
};

const CC0 = ({ lang }: InfoModalType) => {
  const { t } = useTranslation(lang, "main");

  return (
    <div className='text-xl cursor-pointer flex'>
      <span className='w-8'>
        <RiFileCopy2Line className='mt-[1px] pl-1 text-2xl sm:text-3xl text-black dark:text-white' />
      </span>
      <span className='ml-1 sm:ml-1'>{t("copyRight.cc0")}</span>
      <span className='text-blue-600 dark:text-blue-400 mt-[6px] sm:mt-[5px] ml-1 sm:ml-2'>
        <a href='https://creativecommons.org/publicdomain/zero/1.0/'>
          <RiShareBoxFill />
        </a>
      </span>
    </div>
  );
};

export default CC0;
