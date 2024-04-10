"use client"
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast, { Toaster } from "react-hot-toast";
import { AiFillFacebook } from "react-icons/ai"
import { FaSquareInstagram } from "react-icons/fa6";
import { FiCopy } from "react-icons/fi";
import { RiTwitterXFill } from "react-icons/ri"

import { useTranslation } from "@/src/i18n/client";
import { LanguageType } from "@/src/types/language";

type SnsLinksForShareThisSiteType = {
  lang: LanguageType
  baseUrl: string
}

const SnsLinksForShareThisSite = ({ lang, baseUrl }: SnsLinksForShareThisSiteType) => {
  const { t } = useTranslation(lang, "main");;

  const notify = () => toast(`${t("copied")}`);
  const newBaseUrl = baseUrl.replace("en/", "en?").replace("ja/", "ja?");
  const currentUrl = `${newBaseUrl}`;

  return (
    <>
      <div className="flex justify-start gap-4 sm:gap-4 my-2 sm:my-6">
        <div className='-mt-[22px]'>
          <CopyToClipboard text={currentUrl} >
            <span className='text-blue-600 dark:text-blue-400 ml-1' onClick={notify} >
              <FiCopy size={28} />
            </span>
          </CopyToClipboard>
          <Toaster />
        </div>
        <a href={` https://twitter.com/intent/tweet?text=${currentUrl}`} aria-label="Share on X">
          <div className="mt-1">
            <RiTwitterXFill size={22} />
          </div>
        </a>
        <a href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`} aria-label="Share on Facebook">
          <div className="text-blue-500">
            <AiFillFacebook size={28} />
          </div>
        </a>
        <a href={`https://www.instagram.com/?url=${currentUrl}`} aria-label="Share on Instagram">
          <div className="text-pink-500">
            <FaSquareInstagram size={28} />
          </div>
        </a>
      </div>
    </>
  )
}

export default SnsLinksForShareThisSite
