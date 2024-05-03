import { useRouter, useSearchParams } from "next/navigation"
import { useTheme } from "next-themes";
import { ImCross } from "react-icons/im";

import HorizontalViewIcon from "@/src/components/Svg/Views/HorizontalViewIcon";
import PerspectiveViewIcon from "@/src/components/Svg/Views/PerspectiveViewIcon";
import VerticalViewIcon from "@/src/components/Svg/Views/VerticalViewIcon";
import { useTranslation } from "@/src/i18n/client";
import { LanguageType } from "@/src/types/language";
import { ModalOpenType } from "@/src/types/modals";
import { viewTypes } from "@/src/types/views";
import { newRouterPush } from "@/src/utils/newRouterPush";
import { views } from "@/src/utils/views";

type ViewsSwitchModalType = {
  lang: string
  modalOpen: ModalOpenType
  setModalOpen: (prevState: any) => void;
  setHoverOnModal: (hoverOnModal: boolean) => void;
  view: viewTypes
}

const ViewsSwitchModal = ({ lang, setModalOpen, setHoverOnModal, view, modalOpen }: ViewsSwitchModalType) => {

  const { theme } = useTheme();

  const { t } = useTranslation(lang, "main");
  const router = useRouter();

  const searchParams = useSearchParams();
  const handleClick = (paramValue: string) => {
    setHoverOnModal(false)
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      viewsSwitch: false,
    }));
    newRouterPush(
      lang,
      [
        { key: "view", value: paramValue },
        { key: "focusedMode", value: "off" }
      ],
      searchParams,
      router
    );
  }

  const handleClickClose = () => {
    setHoverOnModal(false)
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      viewsSwitch: false,
    }));
  }

  const handleMouseEnter = () => {
    setHoverOnModal(true)
  }

  const handleMouseLeave = () => {
    setHoverOnModal(false)
  }

  const handleClickInside = (event: any) => {
    event.stopPropagation();
  }

  const handleClickOutside = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      viewsSwitch: false,
    }));
  }

  return (
    <>
      {modalOpen.viewsSwitch &&
        <div className="fixed inset-0 bg-black bg-opacity-0 z-[60] flex justify-end h-screen" onClick={handleClickOutside}></div>
      }
      <div
        className={`transition-transform duration-150 rounded-lg z-[100] fixed bottom-[0px] sm:top-[0px] right-0 bg-neutral-100 dark:bg-neutral-950 p-6 w-full sm:w-[384px] h-[700px] sm:h-screen flex flex-col gap-4 ${modalOpen.viewsSwitch ? "visible translate-y-0 sm:translate-y-0 translate-x-0 sm:translate-x-0 ease-in" : "invisible translate-y-full sm:translate-y-[0px] -translate-x-[0px] sm:translate-x-full"}`}
        onClick={handleClickInside}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={() => setHoverOnModal(true)}
        onTouchEnd={() => setHoverOnModal(false)}
      >
        <div className="flex justify-end mb-4">
          <div onClick={handleClickClose} className={"flex justify-center items-center w-12 h-12 sm:w-14 sm:h-14 bg-transparent border-[2.2px] sm:border-[3px] border-black dark:border-white rounded-full"}>
            <button className="text-base sm:text-xl font-bold"><ImCross /></button>
          </div>
        </div>
        <div className="w-[180px] flex flex-col gap-8">
          <h2 className='text-2xl font-bold'>{t("viewsSwitch.switchView")}</h2>
          {views
            .map(({ slug, name }: { slug: string, name: { en: string, ja: string } }) => {

              const borderColor = slug === view
                ? (theme === "light" ? "border-white" : "border-black")
                : (theme === "light" ? "border-black group-hover:border-blue-700" : "border-white group-hover:border-blue-300");

              return (
                <div
                  key={slug}
                  className={`group select-none p-2 rounded-md ${slug === view ? "bg-emerald-500 text-white dark:text-black fill-white dark:fill-black" : "fill-black dark:fill-white hover:text-blue-700 dark:hover:text-blue-300 hover:fill-blue-700 dark:hover:fill-blue-300"} ${slug === "horizontal" ? "hidden sm:block" : "block md:block"}`}
                  onClick={() => handleClick(slug)}
                >
                  <div className="flex flex-col">
                    <div className="text-xl font-semibold mb-[6px]">
                      {name[lang as LanguageType]}
                    </div>
                    <div className={`p-[4px] w-[100px] h-[100px] relative border-[4px] ${borderColor} rounded-lg`}>
                      {slug === "perspective" ? <PerspectiveViewIcon /> : slug === "vertical" ? <VerticalViewIcon /> : <HorizontalViewIcon />}
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      </div >
    </>
  )
}

export default ViewsSwitchModal
