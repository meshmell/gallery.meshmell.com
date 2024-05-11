"use client";
import { Canvas } from "@react-three/fiber"
import { get, ref } from "firebase/database";
import { useSearchParams } from "next/navigation"
import { useState, useEffect, Suspense } from "react";

import Focus from "@/src/components/Focus/Buttons";
import CreatorModal from "@/src/components/Focus/CreatorInfo/Modal";
import DownloadCreditModal from "@/src/components/Focus/Download/CreditModal";
import DownloadErrorModal from "@/src/components/Focus/Download/ErrorModal";
import DownloadModal from "@/src/components/Focus/Download/Modal";
import InfoModal from "@/src/components/Focus/ModelInfo/Modal";
import ShareModal from "@/src/components/Focus/Share/Modal";
import CategoryFilterModal from "@/src/components/Header/CategoryFilter/Modal";
import CreatorFilterModal from "@/src/components/Header/CreatorFilter/Modal";
import CreatorModalInNotFocused from "@/src/components/Header/CreatorInfoInNotFocused/Modal";
import Header from "@/src/components/Header/Header";
import SearchModal from "@/src/components/Header/Search/Modal";
import SwitchViewModal from "@/src/components/Header/ViewsSwitch/Switch";
import ShareModalButtonWhenList from "@/src/components/LeftBottomWhenList/Share/Button";
import ShareModalWhenList from "@/src/components/LeftBottomWhenList/Share/Modal";
import LoadingForCanvas from "@/src/components/LoadingForCanvas";
import Pagination from "@/src/components/Pagination";
import RightBottomButtons from "@/src/components/RightBottom/Buttons";
import About from "@/src/components/RightBottom/Footer/About";
import Contact from "@/src/components/RightBottom/Footer/Contact";
import CopyRight from "@/src/components/RightBottom/Footer/CopyRight";
import ForDevelopers from "@/src/components/RightBottom/Footer/ForDevelopers";
import Footer from "@/src/components/RightBottom/Footer/Modal";
import PrivacyPolicy from "@/src/components/RightBottom/Footer/PrivacyPolicy";
import Terms from "@/src/components/RightBottom/Footer/Terms";
import Who from "@/src/components/RightBottom/Footer/Who";
import LanguageSwitchModal from "@/src/components/RightBottom/Language/Modal";
import Scene from "@/src/components/Three/Scene";
import { CategoryTypes, CategoryDetailsType } from "@/src/types/categories";
import { CreatorDetailsType } from "@/src/types/creators";
import { DateItem } from "@/src/types/downloadCountData";
import { LanguageType } from "@/src/types/language";
import { LightAndDarkThemeType } from "@/src/types/lightAndDarkTheme";
import { ModalOpenType } from "@/src/types/modals";
import { ModelDetailsType } from "@/src/types/models";
import { viewTypes, WindowType } from "@/src/types/views";
import { defaultCategoryDetails } from "@/src/utils/defaultData/categories";
import { defaultCreatorDetails } from "@/src/utils/defaultData/creators";
import { defaultModelDetails } from "@/src/utils/defaultData/models";
import { database } from "@/src/utils/firebase/firebase.config";

import { ActionDetailsType } from "../types/actions";
import { fetchAndSetDownloads } from "../utils/fetchAndSetDownloads";

import ActionsSwitchModal from "./Header/ActionsSwitch/Modal";
import ForSponsors from "./RightBottom/Footer/ForSponsors";
import Sponsors from "./RightBottom/Sponsors/Modal";

const ThreeApp = ({ lang }: { lang: LanguageType }) => {
  const [modalOpen, setModalOpen] = useState<ModalOpenType>({
    terms: false,
    privacy: false,
    contact: false,
    about: false,
    who: false,
    forDevelopers: false,
    forSponsors: false,
    lightAndDarkTheme: false,
    search: false,
    language: false,
    modelInfo: false,
    categoryFilter: false,
    download: false,
    creatorInfo: false,
    downloadCredit: false,
    creatorFilter: false,
    copyRight: false,
    actionsSwitch: false,
    footer: false,
    downloadError: false,
    sponsors: false,
    viewsSwitch: false,
    creatorInfoInNotFocused: false,
    shareThisPage: false,
    shareThisPageInList: false,
  });

  const searchParams = useSearchParams();
  const [categoryFiltersSlug, setCategoryFiltersSlug] = useState<CategoryTypes>("all")
  const [filteredCategorysObj, setFilteredCategorysObj] = useState<CategoryDetailsType>(defaultCategoryDetails)
  const [creatorFiltersSlug, setCreatorFiltersSlug] = useState<string>("")
  const [filteredCreatorsObj, setFilteredCreatorsObj] = useState<CreatorDetailsType>(defaultCreatorDetails)
  const [focusedModelsSlug, setFocusedModelsSlug] = useState<string>("animated-cube");
  const [lightAndDarkTheme, setLightAndDarkTheme] = useState<LightAndDarkThemeType>("light");
  const [searchWord, setSearchWord] = useState<string>("");
  const [hoverOnModal, setHoverOnModal] = useState<boolean>(false);
  const [focusedModelsDownloadData, setFocusedModelsDownloadData] = useState<Record<string, DateItem>>({});
  const [view, setView] = useState<viewTypes>("perspective");
  const [windowType, setWindowType] = useState<WindowType>("windowWidth_pc");
  const [started, setStarted] = useState(false)
  const [focusedModelsObj, setFocusedModelsObj] = useState<ModelDetailsType>(defaultModelDetails);
  const [focusedModelsCreatorsObj, setFocusedModelsCreatorsObj] = useState<CreatorDetailsType>(defaultCreatorDetails);
  const [getFirebaseDataLoading, setGetFirebaseDataLoading] = useState<boolean>(false);
  const [isWireFrame, setIsWireFrame] = useState<boolean>(false);
  const [action, setAction] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [creators, setCreators] = useState<CreatorDetailsType[]>([]);
  const [models, setModels] = useState<ModelDetailsType[]>([]);
  const [actions, setActions] = useState<ActionDetailsType[]>([]);
  const [categories, setCategories] = useState<CategoryDetailsType[]>([]);
  const [isFocusedMode, setIsFocusedMode] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const modelsRef = ref(database, "models");
      const creatorsRef = ref(database, "creators");
      const actionsRef = ref(database, "actions");
      const categoriesRef = ref(database, "categories");

      try {
        const modelsSnapshot = await get(modelsRef);
        const creatorsSnapshot = await get(creatorsRef);
        const actionsSnapshot = await get(actionsRef);
        const categoriesSnapshot = await get(categoriesRef);

        const modelsData = modelsSnapshot.exists() ? modelsSnapshot.val() : [];
        const creatorsData = creatorsSnapshot.exists() ? creatorsSnapshot.val() : [];
        const actionsData = actionsSnapshot.exists() ? actionsSnapshot.val() : [];
        const categoriesData = categoriesSnapshot.exists() ? categoriesSnapshot.val() : [];

        setModels(modelsData);
        setCreators(creatorsData);
        setActions(actionsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const focusedModel = models.find((model: ModelDetailsType) => model.slug === focusedModelsSlug) || defaultModelDetails;

    const focusedCreator = creators.find((creator: CreatorDetailsType) => creator.slug === focusedModel.creator) || defaultCreatorDetails;

    setFocusedModelsObj(focusedModel);
    setFocusedModelsCreatorsObj(focusedCreator);

    setModels(models);

  }, [models, creators, focusedModelsSlug, focusedModelsObj.creator]);

  const smartphoneWidth = 600;
  const tabletWidth = 1024;

  useEffect(() => {
    fetchAndSetDownloads(database, focusedModelsSlug, setFocusedModelsDownloadData, setGetFirebaseDataLoading);
  }, [focusedModelsSlug]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width <= smartphoneWidth) {
        setWindowType("windowWidth_smartPhone");
      } else if (width <= tabletWidth) {
        setWindowType("windowWidth_tablet");
      } else {
        setWindowType("windowWidth_pc");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setCategoryFiltersSlug(searchParams.get("category") as CategoryTypes ?? "all");
  }, [searchParams.get("category")]);

  useEffect(() => {
    setFilteredCategorysObj(categories.find((category: CategoryDetailsType) => category.slug === categoryFiltersSlug) || defaultCategoryDetails)
  }, [categoryFiltersSlug]);

  useEffect(() => {
    setCreatorFiltersSlug(searchParams.get("creator") ?? "");
  }, [searchParams.get("creator")]);

  useEffect(() => {
    setFilteredCreatorsObj(creators.find((creator: CreatorDetailsType) => creator.slug === creatorFiltersSlug) || defaultCreatorDetails)
  }, [creatorFiltersSlug]);

  useEffect(() => {
    setLightAndDarkTheme(searchParams.get("lightAndDarkTheme") as LightAndDarkThemeType ?? "light");
  }, [searchParams.get("lightAndDarkTheme")]);

  useEffect(() => {
    setFocusedModelsSlug(searchParams.get("focusedModelsSlug") ?? "animated-cube");
  }, [searchParams.get("focusedModelsSlug")]);

  useEffect(() => {
    setSearchWord(searchParams.get("searchWord") ?? "");
  }, [searchParams.get("searchWord")]);

  useEffect(() => {
    setView(searchParams.get("view") as viewTypes ?? "perspective");
  }, [searchParams.get("view")]);

  useEffect(() => {
    setIsWireFrame(searchParams.get("wireFrame") === "on" ? true : false);
  }, [searchParams.get("wireFrame")]);

  useEffect(() => {
    setAction(searchParams.get("action") ?? "");
  }, [searchParams.get("action")]);

  useEffect(() => {
    setCurrentPage(Number(searchParams.get("page") ?? 1));
  }, [searchParams.get("page")]);

  useEffect(() => {
    setIsFocusedMode(searchParams.get("focusedMode") === "on" ? true : false);
  }, [searchParams.get("focusedMode")]);

  return (
    <>
      <div className='flex mx-auto'>
        <div className={"w-[100vw] h-[100vh]"}>
          <Header
            lang={lang}
            setModalOpen={setModalOpen}
            modalOpen={modalOpen}
            filteredCategorysObj={filteredCategorysObj}
            filteredCreatorsObj={filteredCreatorsObj}
            searchWord={searchWord}
            setSearchWord={setSearchWord}
            focusedModelsObj={focusedModelsObj}
            isWireFrame={isWireFrame}
            setIsWireFrame={setIsWireFrame}
            isFocusedMode={isFocusedMode}
            view={view}
          />

          <ShareModal
            lang={lang}
            setModalOpen={setModalOpen}
            modalOpen={modalOpen}
            isFocusedMode={isFocusedMode}
          />

          <ShareModalWhenList
            lang={lang}
            setModalOpen={setModalOpen}
            modalOpen={modalOpen}
            isFocusedMode={isFocusedMode}
          />

          {
            !isFocusedMode &&
            <ShareModalButtonWhenList
              setModalOpen={setModalOpen}
              modalOpen={modalOpen} />
          }

          <RightBottomButtons
            lang={lang}
            setModalOpen={setModalOpen}
          />

          <InfoModal
            lang={lang}
            setModalOpen={setModalOpen}
            modalOpen={modalOpen}
            focusedModelsObj={focusedModelsObj}
            focusedModelsCreatorsObj={focusedModelsCreatorsObj}
            isFocusedMode={isFocusedMode}
          />

          <ActionsSwitchModal
            lang={lang}
            setModalOpen={setModalOpen}
            modalOpen={modalOpen}
            focusedModelsObj={focusedModelsObj}
            setHoverOnModal={setHoverOnModal}
            currentAction={action}
            actions={actions}
          />

          <DownloadModal
            lang={lang}
            setModalOpen={setModalOpen}
            modalOpen={modalOpen}
            focusedModelsObj={focusedModelsObj}
            focusedModelsDownloadData={focusedModelsDownloadData}
            setFocusedModelsDownloadData={setFocusedModelsDownloadData}
            windowType={windowType}
            setGetFirebaseDataLoading={setGetFirebaseDataLoading}
            isFocusedMode={isFocusedMode}
          />

          {
            modalOpen.downloadCredit &&
            <DownloadCreditModal
              lang={lang}
              setModalOpen={setModalOpen}
              focusedModelsCreatorsObj={focusedModelsCreatorsObj}
              isFocusedMode={isFocusedMode}
            />
          }

          {
            modalOpen.downloadError &&
            <DownloadErrorModal
              lang={lang}
              setModalOpen={setModalOpen}
              isFocusedMode={isFocusedMode}
            />
          }

          <CreatorModal
            lang={lang}
            setModalOpen={setModalOpen}
            modalOpen={modalOpen}
            focusedModelsObj={focusedModelsObj}
            focusedModelsCreatorsObj={focusedModelsCreatorsObj}
            isFocusedMode={isFocusedMode}
          />

          <SwitchViewModal
            lang={lang}
            setModalOpen={setModalOpen}
            modalOpen={modalOpen}
            setHoverOnModal={setHoverOnModal}
            view={view}
          />

          <Footer
            lang={lang}
            setModalOpen={setModalOpen}
            modalOpen={modalOpen}
            setHoverOnModal={setHoverOnModal}
          />

          <LanguageSwitchModal
            setModalOpen={setModalOpen}
            lang={lang}
            modalOpen={modalOpen}
            setHoverOnModal={setHoverOnModal}
          />

          <SearchModal
            lang={lang}
            setModalOpen={setModalOpen}
            modalOpen={modalOpen}
            searchWord={searchWord}
            setSearchWord={setSearchWord}
          />

          <CreatorModalInNotFocused
            lang={lang}
            setModalOpen={setModalOpen}
            setHoverOnModal={setHoverOnModal}
            modalOpen={modalOpen}
            filteredCreatorsObj={filteredCreatorsObj}
            isFocusedMode={isFocusedMode}
          />

          <CategoryFilterModal
            lang={lang}
            setModalOpen={setModalOpen}
            modalOpen={modalOpen}
            categoryFiltersSlug={categoryFiltersSlug}
            setHoverOnModal={setHoverOnModal}
            categories={categories}
          />

          <CreatorFilterModal
            lang={lang}
            setModalOpen={setModalOpen}
            modalOpen={modalOpen}
            creatorFiltersSlug={creatorFiltersSlug}
            setHoverOnModal={setHoverOnModal}
            creators={creators}
          />

          <Terms
            lang={lang}
            setModalOpen={setModalOpen}
            modalOpen={modalOpen}
            setHoverOnModal={setHoverOnModal}
          />

          <PrivacyPolicy
            lang={lang}
            setModalOpen={setModalOpen}
            modalOpen={modalOpen}
            setHoverOnModal={setHoverOnModal}
          />

          <Contact
            lang={lang}
            setModalOpen={setModalOpen}
            modalOpen={modalOpen}
            setHoverOnModal={setHoverOnModal}
          />

          <About
            lang={lang}
            setModalOpen={setModalOpen}
            modalOpen={modalOpen}
            setHoverOnModal={setHoverOnModal}
          />

          <Who
            lang={lang}
            setModalOpen={setModalOpen}
            modalOpen={modalOpen}
            setHoverOnModal={setHoverOnModal}
            creators={creators}
          />

          <CopyRight
            lang={lang}
            setModalOpen={setModalOpen}
            modalOpen={modalOpen}
            setHoverOnModal={setHoverOnModal}
          />

          <ForDevelopers
            lang={lang}
            setModalOpen={setModalOpen}
            modalOpen={modalOpen}
            setHoverOnModal={setHoverOnModal}
          />
          <ForSponsors
            lang={lang}
            setModalOpen={setModalOpen}
            modalOpen={modalOpen}
            setHoverOnModal={setHoverOnModal}
          />

          <Sponsors
            lang={lang}
            setModalOpen={setModalOpen}
            modalOpen={modalOpen}
            setHoverOnModal={setHoverOnModal}
          />

          <Focus
            lang={lang}
            setModalOpen={setModalOpen}
            modalOpen={modalOpen}
            focusedModelsObj={focusedModelsObj}
            focusedModelsDownloadData={focusedModelsDownloadData}
            getFirebaseDataLoading={getFirebaseDataLoading}
            creators={creators}
            models={models}
            isFocusedMode={isFocusedMode}
          />

          <LoadingForCanvas lang={lang} started={started} setStarted={setStarted} />

          {!isFocusedMode &&
            <Pagination
              lang={lang}
              currentPage={currentPage}
              filteredCategorysObj={filteredCategorysObj}
              filteredCreatorsObj={filteredCreatorsObj}
              searchWord={searchWord}
              models={models}
            />
          }

          <Canvas shadows>
            <Suspense fallback={null}>
              <Scene
                footerOpen={modalOpen.footer}
                modalOpen={modalOpen}
                lang={lang}
                lightAndDarkTheme={lightAndDarkTheme}
                filteredCategorysObj={filteredCategorysObj}
                filteredCreatorsObj={filteredCreatorsObj}
                focusedModelsObj={focusedModelsObj}
                searchWord={searchWord}
                hoverOnModal={hoverOnModal}
                currentView={view}
                windowType={windowType}
                action={action}
                setAction={setAction}
                isWireFrame={isWireFrame}
                currentPage={currentPage}
                models={models}
                creators={creators}
                isFocusedMode={isFocusedMode}
              />
            </Suspense >
          </Canvas>
        </div>
      </div>
    </>
  );
};

export default ThreeApp;
