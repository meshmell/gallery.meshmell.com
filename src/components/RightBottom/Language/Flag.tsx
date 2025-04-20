"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { LanguageType } from "@/src/types/language";
import { ModalOpenType } from "@/src/types/modals";

import FlagComponent from "./FlagComponent";

type LanguagePopupType = {
  lang: LanguageType;
  setModalOpen: (prevState: any) => void;
  text: string;
};

const LanguageFlag = ({ lang, setModalOpen, text }: LanguagePopupType) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const cleanedPathname = pathname.replace(/(\/ja|\/en)/g, "");

  const handleClickClose = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      language: false,
    }));
  };

  return (
    <Link
      href={`/${lang}/${cleanedPathname}/?${searchParams}`}
      onClick={handleClickClose}
    >
      <div className='flex cursor-pointer'>
        <div className='w-8 h-6 shadow-md'>
          <FlagComponent lang={lang} />
        </div>
        <div className={"select-none ml-2"}>{text}</div>
      </div>
    </Link>
  );
};

export default LanguageFlag;
