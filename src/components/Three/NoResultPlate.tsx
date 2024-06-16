import { Html } from "@react-three/drei";

import { useTranslation } from "@/src/i18n/client";
import { LanguageType } from "@/src/types/language";

type NamePlateType = {
  lang: LanguageType;
};

const NoResultPlate = ({ lang }: NamePlateType) => {
  const { t } = useTranslation(lang, "main");

  return (
    <Html fullscreen zIndexRange={[0, 0]}>
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-20 flex justify-center items-center bg-neutral-100 dark:bg-neutral-950 rounded-lg px-4 py-2'>
        <div className='text-3xl font-bold text-center'>
          {t("namePlate.noResult")}
        </div>
      </div>
    </Html>
  );
};

export default NoResultPlate;
