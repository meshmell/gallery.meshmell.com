import CancelButton from "@/src/components/Focus/CancelButton";
import CreatorButton from "@/src/components/Focus/CreatorInfo/Button";
import DownloadButton from "@/src/components/Focus/Download/Button";
import InfoButton from "@/src/components/Focus/ModelInfo/Button";
import ShareModalButton from "@/src/components/Focus/Share/Button";
import { CreatorDetailsType } from "@/src/types/creators";
import { DateItem } from "@/src/types/downloadCountData";
import { LanguageType } from "@/src/types/language";
import { ModalOpenType } from "@/src/types/modals";
import { ModelDetailsType } from "@/src/types/models";

type InfoButtonType = {
  lang: LanguageType;
  setModalOpen: (modal: any) => void;
  focusedModelsObj: ModelDetailsType
  modalOpen: ModalOpenType
  focusedModelsDownloadData: Record<string, DateItem>;
  getFirebaseDataLoading: boolean
  models: ModelDetailsType[]
  creators: CreatorDetailsType[]
  isFocusedMode: boolean
}

const Focus = ({ lang, setModalOpen, focusedModelsObj, modalOpen, focusedModelsDownloadData, getFirebaseDataLoading, models, creators, isFocusedMode }: InfoButtonType) => {

  return (

    <div className={`z-[70] fixed p-1 bottom-[10px] left-[10px] rounded-xl ${isFocusedMode ? "block" : "hidden"}`}>
      <ShareModalButton setModalOpen={setModalOpen} modalOpen={modalOpen} />
      <InfoButton setModalOpen={setModalOpen} modalOpen={modalOpen} />
      <CreatorButton lang={lang} setModalOpen={setModalOpen} modalOpen={modalOpen} focusedModelsSlug={focusedModelsObj.slug} models={models} creators={creators} />
      <DownloadButton setModalOpen={setModalOpen} modalOpen={modalOpen} getFirebaseDataLoading={getFirebaseDataLoading} focusedModelsDownloadData={focusedModelsDownloadData} />
      <CancelButton lang={lang} />
    </div >
  )
}

export default Focus
