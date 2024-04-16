"use client";
import { BsFillCameraVideoFill } from "react-icons/bs";

import { ModalOpenType } from "@/src/types/modals";

type ViewsSwitchButtonType = {
  setModalOpen: (prevState: any) => void;
  modalOpen: ModalOpenType
}

const ViewsSwitchButton = ({ setModalOpen, modalOpen }: ViewsSwitchButtonType) => {

  const handleClick = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      viewsSwitch: !prevState.viewsSwitch,
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
      categoryFilter: false,
      shareThisPage: false,
      shareThisPageInList: false,
    }));
  }

  return (
    <>
      <button
        onClick={handleClick}
        className={"mt-[6px] sm:mt-[10px] relative rounded-full flex justify-center"}
      >
        <div className={`${modalOpen.viewsSwitch ? "bg-blue-500 border-blue-500" : "bg-neutral-100 dark:bg-neutral-950 border-black dark:border-white"} flex justify-center items-center h-12 sm:h-14 w-12 sm:w-14 border-[1.5px] sm:border-[3px]  rounded-full`}>
          <BsFillCameraVideoFill className={`${modalOpen.viewsSwitch ? "text-white" : "text-black dark:text-white"} text-3xl sm:text-4xl`} />
        </div>
      </button>
    </>
  );
};

export default ViewsSwitchButton;
