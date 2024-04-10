"use client"
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast, { Toaster } from "react-hot-toast";
import { FiCopy } from "react-icons/fi";

import { useTranslation } from "@/src/i18n/client";
import { CreatorDetailsType } from "@/src/types/creators";
import { LanguageType } from "@/src/types/language";

type CopyCreditType = {
  lang: LanguageType;
  creatorsObj: CreatorDetailsType;
}

const CopyCredit = ({ lang, creatorsObj }: CopyCreditType) => {

  const { t } = useTranslation(lang, "main");;

  const notify = () => toast(`${t("copied")}`);

  return (
    <div className="ml-2 mt-[8px]">
      <CopyToClipboard text={creatorsObj.name[lang as LanguageType]} >
        <span onClick={notify} className='text-2xl sm:text-3xl text-blue-600 dark:text-blue-400'>
          <FiCopy />
        </span>
      </CopyToClipboard>
      <Toaster />
    </div>
  )
}

export default CopyCredit
