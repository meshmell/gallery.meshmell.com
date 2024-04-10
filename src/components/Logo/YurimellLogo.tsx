import { RiShareBoxFill } from "react-icons/ri";

import { useTranslation } from "@/src/i18n/client";
import { LanguageType } from "@/src/types/language";

type LogoType = {
  lang: LanguageType;
}

const YurimellLogo = ({ lang }: LogoType) => {

  const { t } = useTranslation(lang, "main");

  const cssClasses = {
    en: {
      tracking: "-tracking-[.05em]",
      mtLogo: "mt-[-10px]",
      mtDescription: "-mt-[22px] sm:-mt-[22px] ml-[3px]",
      mtIcon: "mt-[10px] sm:mt-[10px]",
    },
    ja: {
      tracking: "-tracking-[.12em]",
      mtLogo: "mt-[-10px]",
      mtDescription: "-mt-[20px] sm:-mt-[20px] ml-[3px]",
      mtIcon: "mt-[14px] sm:mt-[14px] -ml-[1px]",
    },
  };

  const selectedClasses = cssClasses[lang as LanguageType] || cssClasses.en;

  return (
    <div className="font-sans">
      <div className="text-sm">{t("yurimellLogo.visitThisSite")}</div>
      <a href="https://yurimell.com/" className="flex">
        <div>
          <div className={`${selectedClasses.tracking} font-sans leading-[1.6] sm:leading-[1.6] bg-clip-text text-transparent bg-gradient-to-l from-[#00ff95] to-[#00aeff] font-bold ${selectedClasses.mtLogo} text-5xl`}>
            {t("yurimellLogo.logo")}
          </div>
          <div className={`font-bold text-lg ${selectedClasses.mtDescription}`}>
            {t("yurimellLogo.description")}
          </div>
        </div>
        <RiShareBoxFill className={`text-5xl ${selectedClasses.mtIcon}`} />
      </a>
    </div>
  )
}

export default YurimellLogo
