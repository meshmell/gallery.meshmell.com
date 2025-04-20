import { BiSolidDownload } from "react-icons/bi";

import LoadingForButton from "@/src/components/ModalComponents/LoadingForButton";
import { DateItem } from "@/src/types/downloadCountData";
import { ModalOpenType } from "@/src/types/modals";
import { getDownloadSum } from "@/src/utils/getDownloadSum";

type DownloadButtonType = {
  setModalOpen: (prevState: any) => void;
  modalOpen: ModalOpenType;
  getFirebaseDataLoading: boolean;
  focusedModelsDownloadData: Record<string, DateItem>;
};

const DownloadButton = ({
  setModalOpen,
  modalOpen,
  getFirebaseDataLoading,
  focusedModelsDownloadData,
}: DownloadButtonType) => {
  const handleClick = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      download: !prevState.download,
      modelInfo: false,
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
      shareThisPage: false,
      shareThisPageInList: false,
    }));
  };

  return (
    <div
      className={`${modalOpen.download ? "bg-blue-500 border-blue-500 dark:border-blue-500 text-white" : "bg-neutral-100 dark:bg-neutral-950 text-black dark:text-white border-black dark:border-white"} cursor-pointer shadow-lg mt-2 mb-2 flex flex-col justify-center items-center rounded-full w-12 h-16 sm:w-14 sm:h-20 border-[1.5px] sm:border-[3px]`}
      onClick={handleClick}
    >
      <div className='mx-auto text-3xl sm:text-4xl'>
        <BiSolidDownload />
      </div>
      <div className='text-center select-none'>
        {getFirebaseDataLoading ? (
          <LoadingForButton height='20' width='20' />
        ) : (
          getDownloadSum(focusedModelsDownloadData)
        )}
      </div>
    </div>
  );
};

export default DownloadButton;
