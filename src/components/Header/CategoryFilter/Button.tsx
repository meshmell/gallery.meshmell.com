"use client";
import { RiFilter3Fill } from "react-icons/ri";

import { CategoryDetailsType } from "@/src/types/categories";
import { ModalOpenType } from "@/src/types/modals";

type CategoryFilterButtonType = {
  setModalOpen: (prevState: any) => void;
  filteredCategorysObj: CategoryDetailsType;
  modalOpen: ModalOpenType;
};

const CategoryFilterButton = ({
  setModalOpen,
  filteredCategorysObj,
  modalOpen,
}: CategoryFilterButtonType) => {
  const handleClick = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      categoryFilter: !prevState.categoryFilter,
      modelInfo: false,
      download: false,
      downloadCredit: false,
      creator: false,
      actionsSwitch: false,
      creatorInfoInNotFocused: false,
      footer: false,
      language: false,
      creatorFilter: false,
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
    <>
      <button
        onClick={handleClick}
        className={
          "mt-[6px] sm:mt-[10px] relative rounded-full flex justify-center select-none"
        }
      >
        <div
          className={`${modalOpen.categoryFilter ? "bg-blue-500 border-blue-500" : "bg-neutral-100 dark:bg-neutral-950 border-black dark:border-white "} px-[4px] sm:px-[8px] flex justify-center items-center h-12 sm:h-14  border-[1.5px] sm:border-[3px] rounded-[18px] sm:rounded-[24px]`}
        >
          <RiFilter3Fill
            className={`${modalOpen.categoryFilter ? "text-white" : "text-black dark:text-white"} text-3xl sm:text-4xl`}
          />
          <div className='w-[28px] sm:w-[30px] h-[28px] sm:h-[30px] text-3xl sm:text-4xl flex justify-center items-center -mt-1'>
            {filteredCategorysObj.icon}
          </div>
        </div>
      </button>
    </>
  );
};

export default CategoryFilterButton;
