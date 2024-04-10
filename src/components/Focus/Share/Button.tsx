import { FaShareSquare } from "react-icons/fa";

import { ModalOpenType } from "@/src/types/modals";

type ShareModalButtonType = {
  setModalOpen: (prevState: any) => void;
  modalOpen: ModalOpenType
}

const ShareModalButton = ({ setModalOpen, modalOpen }: ShareModalButtonType) => {

  const handleClick = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      shareThisPage: !prevState.shareThisPage,
      download: false,
      downloadCredit: false,
      creator: false,
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
      lightAndDarkTheme: false,
      copyRight: false,
      viewsSwitch: false,
      sponsors: false,
      modelInfo: false,
    }));
  };

  return (
    <div className="cursor-pointer" onClick={handleClick}>
      <div className={`${modalOpen.shareThisPage ? "bg-blue-500 border-blue-500 dark:border-blue-500 text-white" : "bg-neutral-100 dark:bg-neutral-950 text-black dark:text-white border-black dark:border-white"} shadow-lg mt-2 mb-2 flex justify-center items-center rounded-full w-12 h-12 sm:w-14 sm:h-14 text-3xl sm:text-4xl  border-[1.5px] sm:border-[3px]`}>
        <FaShareSquare />
      </div>
    </div>
  )
}

export default ShareModalButton
