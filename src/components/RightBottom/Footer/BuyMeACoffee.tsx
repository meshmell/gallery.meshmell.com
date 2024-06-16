"use client";
import Image from "next/image";
import Link from "next/link";

import { useTranslation } from "@/src/i18n/client";
import { LanguageType } from "@/src/types/language";

type BuyMeACoffeeType = {
  lang: LanguageType;
};

const BuyMeACoffee = ({ lang }: BuyMeACoffeeType) => {
  const { t } = useTranslation(lang, "main");

  return (
    <>
      <div className='my-0 mx-0 text-xs md:text-xs lg:text-xs mb-2'>
        {t("buyMeACoffee")}
      </div>
      <div className=''>
        <Link href='https://www.buymeacoffee.com/yurinakanishi'>
          <div className='w-36 sm:36 md:w-36 lg:w-36 xl:w-36 relative'>
            <Image
              src={`${process.env.NEXT_PUBLIC_GCS_BUCKET_PUBLIC_URL}/images/general/bmc-button.webp`}
              width={272.5}
              height={76.5}
              alt='Buy me a coffee logo'
            />
          </div>
        </Link>
        <Link href='https://ko-fi.com/R5R7PXETX'>
          <div className='w-36 sm:w-36 lg:w-36 xl:w-36 relative flex justify-center'>
            <Image
              width={145}
              height={306}
              className='my-auto'
              src='https://storage.ko-fi.com/cdn/brandasset/kofi_bg_tag_white.png?_gl=1*1n7esak*_ga*MTc4OTc4MTE2OC4xNjk5NDg4Njcx*_ga_M13FZ7VQ2C*MTY5OTQ4ODY3MS4xLjEuMTY5OTQ4ODg3NS41Mi4wLjA.'
              alt='Buy Me a Coffee at ko-fi.com'
            />
          </div>
        </Link>
      </div>
    </>
  );
};

export default BuyMeACoffee;
