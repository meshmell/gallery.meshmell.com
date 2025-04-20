import { MdOutlineSource } from "react-icons/md";

import { useTranslation } from "@/src/i18n/client";
import { LanguageType } from "@/src/types/language";

type ModelSourceUrlType = {
  lang: LanguageType;
  sourceUrl: string;
};

const ModelSourceUrl = ({ lang, sourceUrl }: ModelSourceUrlType) => {
  const { t } = useTranslation(lang, "main");

  const sourceWebsite = sourceUrl
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .split("/")[0];

  return (
    <div className='text-xl cursor-pointer flex'>
      <span className='w-8'>
        <MdOutlineSource className='mt-[3px] pl-1 text-2xl' />
      </span>
      <span className='ml-1 sm:ml-2'>
        {t("modelSourceUrl.source1")}
        <a href={sourceUrl} className='text-blue-600 dark:text-blue-400'>
          {sourceWebsite}
        </a>
        {t("modelSourceUrl.source2")}
      </span>
    </div>
  );
};

export default ModelSourceUrl;
