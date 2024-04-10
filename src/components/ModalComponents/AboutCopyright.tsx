import { RiShareBoxFill } from "react-icons/ri";

import { useTranslation } from "@/src/i18n/client";
import { LanguageType } from "@/src/types/language";
import { ModalOpenType } from "@/src/types/modals";

type AboutCopyrightType = {
  lang: LanguageType;
  setModalOpen: (prevState: any) => void;
}

const AboutCopyright = ({ lang, setModalOpen }: AboutCopyrightType) => {
  const { t } = useTranslation(lang, "main");;

  const handleClick = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      copyRight: true
    }));
  };

  return (
    <div className="cursor-pointer flex" onClick={handleClick}>
      {t("copyRight.aboutCopyRight")}
      <span className="ml-2 text-xl">
        <RiShareBoxFill />
      </span>
    </div>
  )
}

export default AboutCopyright
