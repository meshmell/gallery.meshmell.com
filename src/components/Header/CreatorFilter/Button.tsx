"use client";
import Image from "next/image";
import { BsFillPersonFill } from "react-icons/bs";
import { RiFilter3Fill } from "react-icons/ri";

import { CreatorDetailsType } from "@/src/types/creators";
import { LanguageType } from "@/src/types/language";
import { ModalOpenType } from "@/src/types/modals";

type CreatorFilterButtonType = {
  setModalOpen: (prevState: any) => void;
  modalOpen: ModalOpenType;
  filteredCreatorsObj: CreatorDetailsType;
  lang: LanguageType;
};

const CreatorFilterButton = ({
  setModalOpen,
  modalOpen,
  filteredCreatorsObj,
  lang,
}: CreatorFilterButtonType) => {
  const handleClick = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      creatorFilter: !prevState.creatorFilter,
      modelInfo: false,
      download: false,
      downloadCredit: false,
      creatorId: false,
      actionsSwitch: false,
      creatorInfoInNotFocused: false,
      footer: false,
      language: false,
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
      creator: false,
      viewsSwitch: false,
      sponsors: false,
      shareThisPage: false,
      shareThisPageInList: false,
    }));
  };

  const creatorSlug = filteredCreatorsObj.slug
    ? filteredCreatorsObj.slug
    : "PlaceHolder";

  return (
    <>
      <button
        onClick={handleClick}
        className={
          "mt-[6px] sm:mt-[10px] relative rounded-full flex justify-center"
        }
      >
        <div
          className={`${modalOpen.creatorFilter ? "bg-blue-500 border-blue-500" : "bg-neutral-100 dark:bg-neutral-950 border-black dark:border-white "} px-[4px] sm:px-[8px] flex justify-center items-center h-12 sm:h-14 border-[1.5px] sm:border-[3px] rounded-[18px] sm:rounded-[24px]`}
        >
          <RiFilter3Fill
            className={`${modalOpen.creatorFilter ? "text-white" : "text-black dark:text-white"} text-3xl sm:text-4xl`}
          />
          <div className='w-[28px] sm:w-[30px] h-[28px] sm:h-[30px] relative'>
            {filteredCreatorsObj.slug === "" ? (
              <div className='text-3xl'>
                <BsFillPersonFill />
              </div>
            ) : (
              <Image
                src={`${process.env.NEXT_PUBLIC_GCS_BUCKET_PUBLIC_URL}/images/creators/${creatorSlug}/img.webp`}
                fill
                alt={filteredCreatorsObj.name[lang as LanguageType]}
                className='rounded-lg'
                style={{ objectFit: "cover" }}
                sizes='(max-width: 768px) 10vw, (max-width: 1200px) 5vw, 5vw'
              />
            )}
          </div>
        </div>
      </button>
    </>
  );
};

export default CreatorFilterButton;
