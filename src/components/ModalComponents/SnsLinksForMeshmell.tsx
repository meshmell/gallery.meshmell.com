"use client"
import Link from "next/link";
import { RiTwitterXFill } from "react-icons/ri"

import { useTranslation } from "@/src/i18n/client";
import { LanguageType } from "@/src/types/language";

type SnsLinksForMeshmellType = {
  lang: LanguageType
}

const SnsLinksForMeshmell = ({ lang }: SnsLinksForMeshmellType) => {
  const { t } = useTranslation(lang, "main");

  return (
    <>
      <div className="text-xl font-semibold pt-[4px] sm:pt-[4px] border-t-2">{t("officialSNSAccounts")}</div>
      <div className="flex justify-start gap-4 sm:gap-4 mt-[4px]">
        <Link href={" https://twitter.com/meshmell6174"} aria-label="Go to Twitter page for Meshmell">
          <div className="mt-1">
            <RiTwitterXFill size={22} />
          </div>
        </Link>
      </div>
    </>
  )
}

export default SnsLinksForMeshmell
