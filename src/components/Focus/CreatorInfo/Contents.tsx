import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { RiShareBoxFill } from "react-icons/ri";

import CopyCredit from "@/src/components/ModalComponents/CopyCredit";
import { useTranslation } from "@/src/i18n/client";
import { CreatorDetailsType } from "@/src/types/creators";
import { LanguageType } from "@/src/types/language";
import { newRouterPush } from "@/src/utils/newRouterPush";

import CreatorSNS from "./SNS";

type CreatorInfoType = {
  creatorsObj: CreatorDetailsType;
  lang: LanguageType;
  isFocusedMode: boolean;
};

const CreatorInfo = ({ creatorsObj, lang, isFocusedMode }: CreatorInfoType) => {
  const { t } = useTranslation(lang, "main");

  const router = useRouter();
  const searchParams = useSearchParams();
  const creatorSlug = creatorsObj.slug ? creatorsObj.slug : "PlaceHolder";
  const handleGotoFilter = () => {
    newRouterPush(
      lang,
      [
        { key: "creator", value: creatorsObj.slug },
        { key: "focusedMode", value: "off" },
      ],
      searchParams,
      router,
    );
  };

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex'>
        <h2 className='text-3xl font-bold flex gap-2'>
          {creatorsObj.slug !== "" && (
            <div className='w-[30px] h-[30px]'>
              <Image
                src={`${process.env.NEXT_PUBLIC_GCS_BUCKET_PUBLIC_URL}/images/creators/${creatorSlug}/img.webp`}
                width={30}
                height={30}
                alt={creatorsObj.name[lang as LanguageType]}
                className='rounded-md'
              />
            </div>
          )}
          <span>{creatorsObj.name[lang as LanguageType]}</span>
        </h2>
        <CopyCredit lang={lang} creatorsObj={creatorsObj} />
      </div>
      <div className='text-xl'>
        {creatorsObj.description[lang as LanguageType]}
      </div>
      <CreatorSNS creatorsObj={creatorsObj} />
      {isFocusedMode && (
        <div
          className='flex items-center gap-2 select-none mt-4 sm:mt-8'
          onClick={handleGotoFilter}
        >
          <div className='text-base cursor-pointer'>
            {t("creatorInfo.seeMoreModels")}
          </div>
          <RiShareBoxFill className=' text-blue-600 dark:text-blue-400 text-xl sm:text-2xl' />
        </div>
      )}
    </div>
  );
};

export default CreatorInfo;
