"use client";
import { FaWalking } from "react-icons/fa";

import { ModalOpenType } from "@/src/types/modals";

type ActionsSwitchButtonType = {
  setModalOpen: (prevState: any) => void;
  modalOpen: ModalOpenType
}

const ActionsSwitchButton = ({ setModalOpen, modalOpen }: ActionsSwitchButtonType) => {

  const handleClick = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      actionsSwitch: !prevState.actionsSwitch,
      modelInfo: false,
      download: false,
      downloadCredit: false,
      creator: false,
      footer: false,
      language: false,
      categoryFilter: false,
      creatorFilter: false,
      search: false,
      terms: false,
      privacy: false,
      contact: false,
      about: false,
      who: false,
      forDevelopers: false,
      lightAndDarkTheme: false,
      copyRight: false,
    }));
  }

  return (
    <>
      <button
        onClick={handleClick}
        className={"mt-[6px] sm:mt-[10px] relative rounded-full flex justify-center"}
      >
        <div className={`${modalOpen.actionsSwitch ? "bg-blue-500 border-blue-500" : "bg-neutral-100 dark:bg-neutral-950 border-black dark:border-white"} flex justify-center items-center h-12 sm:h-14 w-12 sm:w-14 border-[1.5px] sm:border-[3px]  rounded-full`}>
          <FaWalking className={`${modalOpen.actionsSwitch ? "text-white" : "text-black dark:text-white"} text-3xl sm:text-4xl`} />
        </div>
      </button>
    </>
  );
};

export default ActionsSwitchButton;
