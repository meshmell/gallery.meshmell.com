import Image from "next/image";
import { useEffect } from "react";
import { ImCross } from "react-icons/im";
import { MdUpdate } from "react-icons/md";
import { RiShareBoxFill } from "react-icons/ri";

import SourceUrl from "@/src/components/Focus/ModelInfo/ModelSourceUrl";
import CC0 from "@/src/components/ModalComponents/CC0";
import { CreatorDetailsType } from "@/src/types/creators";
import { LanguageType } from "@/src/types/language";
import { ModalOpenType } from "@/src/types/modals";
import { ModelDetailsType } from "@/src/types/models";
import { dateFormat } from "@/src/utils/dateFormat";

type ModelInfoModalType = {
  lang: LanguageType;
  modalOpen: ModalOpenType;
  setModalOpen: (prevState: any) => void;
  focusedModelsObj: ModelDetailsType;
  focusedModelsCreatorsObj: CreatorDetailsType
  isFocusedMode: boolean
}

const ModelInfoModal = ({ lang, setModalOpen, focusedModelsObj, focusedModelsCreatorsObj, modalOpen, isFocusedMode }: ModelInfoModalType) => {

  useEffect(() => {
    if (!isFocusedMode) {
      handleClickClose();
    }
  }, [isFocusedMode])

  const openCreatorModal = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      creatorInfo: true,
    }));
  }

  const handleClickClose = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      modelInfo: false,
    }));
  }

  const handleClickInside = (event: any) => {
    event.stopPropagation();
  }

  const handleClickOutside = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      modelInfo: false,
    }));
  }

  const creatorSlug = focusedModelsCreatorsObj.slug ? focusedModelsCreatorsObj.slug : "PlaceHolder"

  return (
    <>
      {modalOpen.modelInfo &&
        <div className="fixed inset-0 bg-black bg-opacity-0 z-[60] flex justify-end h-screen" onClick={handleClickOutside}></div>
      }
      <div
        className={`transition-transform duration-150 rounded-lg z-[100] fixed bottom-[0px] sm:top-[0px] left-0 bg-neutral-100 dark:bg-neutral-950 p-6 w-full sm:w-[384px] h-[700px] sm:h-screen flex flex-col gap-4 ${modalOpen.modelInfo ? "translate-y-0 sm:translate-y-0 translate-x-0 sm:translate-x-0 ease-in" : "translate-y-full sm:translate-y-[0px] -translate-x-[0px] sm:-translate-x-full ease-out"}`} onClick={handleClickInside}
      >
        <div className="flex justify-start mb-4">
          <div onClick={handleClickClose} className={"flex justify-center items-center w-12 h-12 sm:w-14 sm:h-14 bg-transparent border-[2.2px] sm:border-[3px] border-black dark:border-white rounded-full"}>
            <button className="text-xl font-bold"><ImCross /></button>
          </div>
        </div>
        <h2 className="text-3xl font-bold">
          {focusedModelsObj.name[lang as LanguageType]}
        </h2>
        <div className="flex flex-col text-xl gap-2">
          {focusedModelsObj.description[lang as LanguageType] &&
            <div className={"italic my-2"}>
              {focusedModelsObj.description[lang as LanguageType]}
            </div>
          }
          <div className="flex">
            <span className="w-8">
              {focusedModelsCreatorsObj.slug !== "" &&
                <Image
                  src={`${process.env.NEXT_PUBLIC_GCS_BUCKET_PUBLIC_URL}/images/creators/${creatorSlug}/img.webp`}
                  width={30}
                  height={30}
                  alt={focusedModelsCreatorsObj.name[lang as LanguageType]}
                  className='rounded-md'
                />
              }
            </span>
            <span className="ml-1 sm:ml-2">
              {focusedModelsCreatorsObj.name[lang as LanguageType]}
            </span>
            <span className="text-blue-600 dark:text-blue-400 mt-[6px] sm:mt-[5px] ml-1 sm:ml-2" onClick={openCreatorModal} >
              <RiShareBoxFill />
            </span>
          </div>
          <div className="flex">
            <span className="w-8">
              <MdUpdate className="mt-[5px] text-2xl" />
            </span>
            <span className="ml-1 sm:ml-2">
              {
                /^\d{4}-\d{2}-\d{2}$/.test(focusedModelsObj.updated)
                  ? dateFormat(new Date(focusedModelsObj.updated), lang)
                  : "2024-01-01"
              }
            </span>
          </div>
          <CC0 lang={lang} />
          <SourceUrl lang={lang} sourceUrl={focusedModelsObj.credit} />
        </div>
      </div>
    </>
  )
}

export default ModelInfoModal
