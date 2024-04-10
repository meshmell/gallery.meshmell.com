"use client"
import Logo from "@/src/components/Logo";
import { LanguageType } from "@/src/types/language";

type BottomLogoType = {
  lang: LanguageType;
}

const BottomLogo = ({ lang }: BottomLogoType) => {
  return (
    <>
      <div className="fixed bottom-0 left-0 w-full bg-transparent z-50">
        <div className="absolute bottom-1 -translate-x-2/4 left-2/4">
          <div className="flex items-center sm:mb-0 -mb-2">
            <Logo lang={lang} />
          </div>
        </div>
      </div>
    </ >
  )
}

export default BottomLogo
