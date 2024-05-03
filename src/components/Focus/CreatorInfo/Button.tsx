import Image from "next/image";
import { useEffect } from "react";

import { CreatorDetailsType } from "@/src/types/creators";
import { LanguageType } from "@/src/types/language";
import { ModalOpenType } from "@/src/types/modals";
import { ModelDetailsType } from "@/src/types/models";
import { defaultCreatorDetails } from "@/src/utils/defaultData/creators";
import { defaultModelDetails } from "@/src/utils/defaultData/models";

type CreatorInfoButtonType = {
  setModalOpen: (prevState: any) => void;
  modalOpen: ModalOpenType
  focusedModelsSlug: string
  lang: LanguageType
  models: ModelDetailsType[]
  creators: CreatorDetailsType[]
}

const CreatorInfoButton = ({ setModalOpen, modalOpen, focusedModelsSlug, lang, models, creators }: CreatorInfoButtonType) => {
  const currentModel = models.find((model: ModelDetailsType) => model.slug === focusedModelsSlug) || defaultModelDetails;
  const focusedModelsSlugsCreator = creators.find((creator: CreatorDetailsType) => creator.slug === currentModel.creator) || defaultCreatorDetails;
  const creatorSlug = focusedModelsSlugsCreator.slug ? focusedModelsSlugsCreator.slug : "PlaceHolder";

  useEffect(() => {
  }, [focusedModelsSlug]);

  const handleClick = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      creatorInfo: !prevState.creatorInfo,
      modelInfo: false,
      download: false,
      downloadCredit: false,
      actionsSwitch: false,
      creatorInfoInNotFocused: false,
      footer: false,
      language: false,
      creatorFilter: false,
      categoryFilter: false,
      search: false,
      terms: false,
      privacy: false,
      contact: false,
      about: false,
      who: false,
      forDevelopers: false,
      forSponsors: false,
      lightAndDarkTheme: false,
      copyRight: false,
      viewsSwitch: false,
      sponsors: false,
      shareThisPage: false,
      shareThisPageInList: false,
    }));
  };

  return (
    <div className={`${modalOpen.creatorInfo ? "bg-blue-500 border-blue-500 dark:border-blue-500 text-white" : "bg-neutral-100 dark:bg-neutral-950 text-black dark:text-white border-black dark:border-white"} cursor-pointer shadow-lg mt-2 mb-2 flex justify-center items-center rounded-full w-12 h-12 sm:w-14 select-none sm:h-14 text-3xl sm:text-4xl border-[1.5px] sm:border-[3px]`}
      onClick={handleClick}
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_GCS_BUCKET_PUBLIC_URL}/images/creators/${creatorSlug}/img.webp`}
        width={30}
        height={30}
        alt={focusedModelsSlugsCreator.name[lang as LanguageType]}
        className='rounded-md'
      />
    </div>
  )
}

export default CreatorInfoButton
