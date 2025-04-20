import { FaShareSquare } from "react-icons/fa";

import { ModalOpenType } from "@/src/types/modals";

type ShareModalButtonWhenListType = {
  setModalOpen: (prevState: any) => void;
  modalOpen: ModalOpenType;
};

const ShareModalButtonWhenList = ({
  setModalOpen,
  modalOpen,
}: ShareModalButtonWhenListType) => {
  const handleClick = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      shareThisPageInList: !prevState.shareThisPageInList,
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
      forSponsors: false,
      lightAndDarkTheme: false,
      copyRight: false,
      viewsSwitch: false,
      sponsors: false,
      modelInfo: false,
    }));
  };

  return (
    <div
      className='fixed bottom-[18px] left-[10px] cursor-pointer z-[70] flex flex-col gap-2 justify-end'
      onClick={handleClick}
    >
      <div
        className={`${modalOpen.shareThisPageInList ? "bg-blue-500 border-blue-500 dark:border-blue-500 text-white " : "bg-neutral-100 dark:bg-neutral-950 text-black dark:text-white border-black dark:border-white"} shadow-lg mt-2 mb-2 flex justify-center items-center rounded-full w-12 h-12 sm:w-14 sm:h-14 text-3xl sm:text-4xl  border-[1.5px] sm:border-[3px]`}
      >
        <FaShareSquare />
      </div>
    </div>
  );
};

export default ShareModalButtonWhenList;
