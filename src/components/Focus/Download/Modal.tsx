import { useEffect, useState } from "react";
import { BiSolidDownload } from "react-icons/bi";
import { ImCross } from "react-icons/im";

import LoadingForButton from "@/src/components/ModalComponents/LoadingForButton";
import { useTranslation } from "@/src/i18n/client";
import { DateItem } from "@/src/types/downloadCountData";
import { LanguageType } from "@/src/types/language";
import { ModalOpenType } from "@/src/types/modals";
import { ModelDetailsType } from "@/src/types/models";
import { WindowType } from "@/src/types/views";
import { handleDownloadFileFromGCS } from "@/src/utils/downloadFileFromGCS";
import { fileFormats } from "@/src/utils/fileFormats";
import handleIncrementDownloadToFirebase from "@/src/utils/handleIncrementDownloadToFirebase";

import DownloadGraph from "./Graph";

type DownloadModalType = {
  lang: LanguageType;
  modalOpen: ModalOpenType;
  setModalOpen: (modal: any) => void;
  focusedModelsObj: ModelDetailsType;
  setFocusedModelsDownloadData: (
    focusedModelsDownloadData: Record<string, DateItem>,
  ) => void;
  focusedModelsDownloadData: Record<string, DateItem>;
  windowType: WindowType;
  setGetFirebaseDataLoading: (getFirebaseDataLoading: boolean) => void;
  isFocusedMode: boolean;
};

const DownloadModal = ({
  lang,
  setModalOpen,
  focusedModelsObj,
  setFocusedModelsDownloadData,
  focusedModelsDownloadData,
  modalOpen,
  windowType,
  setGetFirebaseDataLoading,
  isFocusedMode,
}: DownloadModalType) => {
  const { t } = useTranslation(lang, "main");

  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [selectedFormats, setSelectedFormats] = useState<string[]>(["glb"]);
  const [currentResolution, setCurrentResolution] = useState<string>("");
  const isZipped = true;

  const handleFormatChange = (format: string) => {
    setSelectedFormats((prevFormats) => {
      if (prevFormats.includes(format)) {
        return prevFormats.filter((f) => f !== format);
      } else {
        return [...prevFormats, format];
      }
    });
  };

  useEffect(() => {
    if (!isFocusedMode) {
      handleClickClose();
    }
  }, [isFocusedMode]);

  useEffect(() => {
    if (!focusedModelsObj.resolutions) return;

    if (focusedModelsObj.resolutions.length > 0) {
      setCurrentResolution(focusedModelsObj.resolutions[0]);
    }
  }, [focusedModelsObj.resolutions]);

  const handleDownloadClick = () => {
    setIsDownloading(true);
    const resolution = currentResolution ? `${currentResolution}` : "";

    handleDownloadFileFromGCS(focusedModelsObj, resolution, isZipped)
      .then(() => {
        setModalOpen((prevState: ModalOpenType) => ({
          ...prevState,
          downloadCredit: true,
        }));
        handleIncrementDownloadToFirebase(
          setFocusedModelsDownloadData,
          focusedModelsObj,
          setGetFirebaseDataLoading,
        );
        setIsDownloading(false);
      })
      .catch((error) => {
        setIsDownloading(false);
        setModalOpen((prevState: ModalOpenType) => ({
          ...prevState,
          downloadError: true,
        }));
        console.error("Download failed", error);
      });
  };

  const handleClickClose = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      download: false,
    }));
  };

  const handleClickInside = (event: any) => {
    event.stopPropagation();
  };

  const handleClickOutside = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      download: false,
    }));
  };

  return (
    <>
      {modalOpen.download && (
        <div
          className='fixed inset-0 bg-black bg-opacity-0 z-[60] flex justify-end h-screen'
          onClick={handleClickOutside}
        ></div>
      )}
      <div
        className={`transition-transform duration-150 rounded-lg z-[100] fixed bottom-[0px] sm:top-[0px] left-0 bg-neutral-100 dark:bg-neutral-950 p-6 w-full sm:w-[384px] h-[700px] sm:h-screen flex flex-col gap-4 ${modalOpen.download ? "visible translate-y-0 sm:translate-y-0 translate-x-0 sm:translate-x-0 ease-in" : "invisible translate-y-full sm:translate-y-[0px] -translate-x-[0px] sm:-translate-x-full"}`}
        onClick={handleClickInside}
      >
        <div className='flex justify-start mb-4'>
          <div
            onClick={handleClickClose}
            className={
              "flex justify-center items-center w-12 h-12 sm:w-14 sm:h-14 bg-transparent border-[2.2px] sm:border-[3px] border-black dark:border-white rounded-full"
            }
          >
            <button className='text-xl font-bold'>
              <ImCross />
            </button>
          </div>
        </div>
        <div className='flex flex-col gap-8'>
          <h2 className='text-3xl font-bold'>{t("download.download")}</h2>
          {focusedModelsObj.isDownloadable ? (
            <>
              <div className='flex flex-row justify-evenly gap-1 items-center'>
                {focusedModelsObj.resolutions &&
                  focusedModelsObj.resolutions.length > 0 && (
                    <div className='flex flex-col items-center'>
                      {focusedModelsObj.resolutions.map((resolution, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setCurrentResolution(resolution);
                          }}
                          className={`my-1 py-1 px-2 rounded border ${
                            currentResolution === resolution
                              ? "bg-blue-500 text-white"
                              : "bg-neutral-100 dark:bg-neutral-950 border-gray-300"
                          }`}
                        >
                          {resolution}
                        </button>
                      ))}
                    </div>
                  )}

                <div className='p-2 rounded'>
                  {fileFormats
                    .filter((format) =>
                      focusedModelsObj.formats.includes(format.extension),
                    )
                    .map((format, index) => (
                      <div key={index} className='flex items-center mb-2'>
                        <input
                          type='checkbox'
                          id={`format-${format.extension}`}
                          checked={selectedFormats.includes(format.extension)}
                          onChange={() => handleFormatChange(format.extension)}
                          className='mr-2'
                        />
                        <label
                          htmlFor={`format-${format.extension}`}
                          className='cursor-pointer'
                        >
                          {format.name} (.{format.extension})
                        </label>
                      </div>
                    ))}
                </div>
                {/* Download Button */}
                <div
                  className={`${!isDownloading && "border-black border-2 dark:border-white"} w-12 sm:w-14 h-12 sm:h-14 flex justify-center items-center p-1 rounded-full cursor-pointer`}
                >
                  {isDownloading ? (
                    windowType === "windowWidth_tablet" ||
                    windowType === "windowWidth_pc" ? (
                      <LoadingForButton height='56' width='56' />
                    ) : (
                      <LoadingForButton height='25' width='25' />
                    )
                  ) : (
                    <BiSolidDownload
                      className='text-3xl sm:text-4xl'
                      onClick={handleDownloadClick}
                    />
                  )}
                </div>
              </div>
              <DownloadGraph
                lang={lang}
                focusedModelsDownloadData={focusedModelsDownloadData}
              />
            </>
          ) : (
            <div className='text-lg text-center'>
              {t("download.canDownloadFromOriginalSite")}
              <div className='text-lg text-center mt-[15px]'>
                <a
                  href={focusedModelsObj.source?.downloadSite}
                  className='text-blue-500 dark:text-blue-400 font-bold'
                >
                  {focusedModelsObj.source?.downloadSite}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DownloadModal;
