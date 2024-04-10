import { useRouter, useSearchParams } from "next/navigation"
import { ImCross } from "react-icons/im";

import { useTranslation } from "@/src/i18n/client";
import { ActionDetailsType } from "@/src/types/actions";
import { LanguageType } from "@/src/types/language";
import { ModalOpenType } from "@/src/types/modals";
import { ModelDetailsType } from "@/src/types/models";
import { defaultActionsDetails } from "@/src/utils/defaultData/actions";
import { newRouterPush } from "@/src/utils/newRouterPush";

type ActionsSwitchModalType = {
  setModalOpen: (prevState: any) => void;
  lang: LanguageType;
  modalOpen: ModalOpenType;
  focusedModelsObj: ModelDetailsType
  setHoverOnModal: (hoverOnModal: boolean) => void;
  currentAction: string
  actions: ActionDetailsType[]
}

const ActionsSwitchModal = ({ setModalOpen, lang, modalOpen, focusedModelsObj, setHoverOnModal, currentAction, actions }: ActionsSwitchModalType) => {

  const { t } = useTranslation(lang, "main");

  const searchParams = useSearchParams()

  const router = useRouter();

  const focusedModelsActionsList = focusedModelsObj.actions?.map((action: string) => actions.find((actionData: ActionDetailsType) => actionData.slug === action) || defaultActionsDetails);

  const handleClick = (paramValue: string) => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      actionsSwitch: false,
    }));
    newRouterPush(lang, [
      { key: "action", value: paramValue }
    ], searchParams, router);

  }

  const handleClickClose = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      actionsSwitch: false,
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
      actionsSwitch: false,
    }));
  }

  return (
    <>
      {
        modalOpen.actionsSwitch &&
        <div className="fixed inset-0 bg-black bg-opacity-0 z-[60] flex justify-end h-screen" onClick={handleClickOutside}></div>
      }
      < div
        className={`transition-transform duration-150 rounded-lg z-[100] fixed bottom-[0px] sm:top-[0px] right-0 bg-neutral-100 dark:bg-neutral-950 p-6 w-full sm:w-[384px] h-[700px] sm:h-screen flex flex-col gap-4 ${modalOpen.actionsSwitch ? "translate-y-0 sm:translate-y-0 translate-x-0 sm:translate-x-0 ease-in" : "translate-y-full sm:translate-y-[0px] -translate-x-[0px] sm:translate-x-[384px] ease-out"}`
        }
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
        <div className="flex flex-col gap-8">
          <h2 className='text-2xl font-bold'>{t("actionsSwitch.title")}</h2>
          <div className="max-h-[80%] overflow-y-auto flex flex-col gap-2">
            <div className="" onClick={() => handleClick("none")}>
              <div className={`${currentAction === "none" ? "bg-emerald-500 text-white dark:text-black" : "hover:text-blue-700 dark:hover:text-blue-300 border-2"} cursor-pointer rounded-md px-2 py-1 flex justify-between items-center`}>
                <div className="">{t("actionsSwitch.stopAction")}</div>
              </div>
            </div>
            {focusedModelsActionsList?.map(({ name, icon, slug }: ActionDetailsType) => (
              <div
                onClick={() => handleClick(slug)}
                key={slug}
                className={`${currentAction === slug ? "bg-emerald-500 text-white dark:text-black" : "hover:text-blue-700 dark:hover:text-blue-300 border-2"} cursor-pointer rounded-md px-2 py-1 flex justify-between items-center`}
              >
                <div className="">{name[lang as LanguageType]}</div>
                <div className="mr-2 mb-2 w-20 rounded-md ">
                  {icon}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div >
    </>
  );
};

export default ActionsSwitchModal;
