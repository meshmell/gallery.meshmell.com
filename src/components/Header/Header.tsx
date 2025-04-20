"use client";
import ActionsSwitchButton from "@/src/components/Header/ActionsSwitch/Button";
import CategoryFilterButton from "@/src/components/Header/CategoryFilter/Button";
import CreatorFilterButton from "@/src/components/Header/CreatorFilter/Button";
import CreatorButtonInNotFocused from "@/src/components/Header/CreatorInfoInNotFocused/Button";
import LightDarkThemeSwitchButton from "@/src/components/Header/LightDarkTheme/Button";
import SearchButton from "@/src/components/Header/Search/Button";
import SwitchViewButton from "@/src/components/Header/ViewsSwitch/Button";
import WireFrameSwitchButton from "@/src/components/Header/WireFrameSwitch/Button";
import { CategoryDetailsType } from "@/src/types/categories";
import { CreatorDetailsType } from "@/src/types/creators";
import { LanguageType } from "@/src/types/language";
import { ModalOpenType } from "@/src/types/modals";
import { ModelDetailsType } from "@/src/types/models";
import { viewTypes } from "@/src/types/views";

type HeaderType = {
  lang: LanguageType;
  setModalOpen: (prevState: any) => void;
  filteredCreatorsObj: CreatorDetailsType;
  filteredCategorysObj: CategoryDetailsType;
  searchWord: string;
  modalOpen: ModalOpenType;
  setSearchWord: (searchWord: string) => void;
  focusedModelsObj: ModelDetailsType;
  isWireFrame: boolean;
  setIsWireFrame: (isWireFrame: boolean) => void;
  isFocusedMode: boolean;
  view: viewTypes;
};

const Header = ({
  focusedModelsObj,
  lang,
  setModalOpen,
  filteredCreatorsObj,
  filteredCategorysObj,
  searchWord,
  modalOpen,
  setSearchWord,
  isWireFrame,
  setIsWireFrame,
  isFocusedMode,
  view,
}: HeaderType) => {
  return (
    <>
      <div className='fixed top-0 left-0 w-full bg-transparent z-50'>
        <div className='flex justify-center sm:justify-end gap-1 sm:gap-4 2xs:gap-4 mx-[0.5vw] '>
          {isFocusedMode && focusedModelsObj.actions && (
            <ActionsSwitchButton
              setModalOpen={setModalOpen}
              modalOpen={modalOpen}
            />
          )}
          {isFocusedMode && (
            <WireFrameSwitchButton
              lang={lang}
              setIsWireFrame={setIsWireFrame}
              isWireFrame={isWireFrame}
            />
          )}
          <CategoryFilterButton
            setModalOpen={setModalOpen}
            filteredCategorysObj={filteredCategorysObj}
            modalOpen={modalOpen}
          />
          <CreatorFilterButton
            lang={lang}
            setModalOpen={setModalOpen}
            filteredCreatorsObj={filteredCreatorsObj}
            modalOpen={modalOpen}
          />
          {!isFocusedMode && filteredCreatorsObj.slug !== "" && (
            <CreatorButtonInNotFocused
              lang={lang}
              setModalOpen={setModalOpen}
              modalOpen={modalOpen}
              filteredCreatorsObj={filteredCreatorsObj}
            />
          )}
          <SwitchViewButton
            view={view}
            setModalOpen={setModalOpen}
            modalOpen={modalOpen}
          />
          <LightDarkThemeSwitchButton lang={lang} modalOpen={modalOpen} />
        </div>
      </div>
      <SearchButton
        lang={lang}
        setModalOpen={setModalOpen}
        searchWord={searchWord}
        modalOpen={modalOpen}
        setSearchWord={setSearchWord}
      />
    </>
  );
};

export default Header;
