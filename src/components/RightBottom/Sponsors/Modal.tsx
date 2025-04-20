"use client";
import { get, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";

import { useTranslation } from "@/src/i18n/client";
import { LanguageType } from "@/src/types/language";
import { ModalOpenType } from "@/src/types/modals";
import { SponsorInfoType } from "@/src/types/sponsors";
import { defaultSponsorInfo } from "@/src/utils/defaultData/sponsors";
import { database } from "@/src/utils/firebase/firebase.config";

import EachSponsor from "./EachSponsor";

type SponsorsType = {
  lang: LanguageType;
  modalOpen: ModalOpenType;
  setModalOpen: (prevState: any) => void;
  setHoverOnModal: (hoverOnModal: boolean) => void;
};

const Sponsors = ({
  lang,
  setModalOpen,
  setHoverOnModal,
  modalOpen,
}: SponsorsType) => {
  const { t } = useTranslation(lang, "main");
  const [sponsors, setSponsors] = useState([defaultSponsorInfo]);

  useEffect(() => {
    let sponsorsData: SponsorInfoType[] = [defaultSponsorInfo];
    const sponsorsRef = ref(database, "sponsors");
    get(sponsorsRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          sponsorsData = snapshot.val();
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setSponsors(sponsorsData);
      });
  }, []);

  const handleClickClose = () => {
    setHoverOnModal(false);
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      sponsors: false,
    }));
  };

  const handleClickInside = (event: any) => {
    event.stopPropagation();
  };

  const handleClickOutside = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      sponsors: false,
    }));
  };

  const handleMouseEnter = () => {
    setHoverOnModal(true);
  };

  const handleMouseLeave = () => {
    setHoverOnModal(false);
  };

  return (
    <>
      {modalOpen.sponsors && (
        <div
          className='fixed inset-0 bg-black bg-opacity-0 z-[60] flex justify-end h-screen'
          onClick={handleClickOutside}
        ></div>
      )}
      <div
        className={`transition-transform duration-150 rounded-lg z-[100] fixed bottom-[0px] sm:top-[0px] right-0 bg-neutral-100 dark:bg-neutral-950 p-6 w-full sm:w-[600px] h-[700px] sm:h-screen flex flex-col gap-4 ${modalOpen.sponsors ? "visible translate-y-0 sm:translate-y-0 translate-x-0 sm:translate-x-0 ease-in" : "invisible translate-y-full sm:translate-y-[0px] -translate-x-[0px] sm:translate-x-full"}`}
        onClick={handleClickInside}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={() => setHoverOnModal(true)}
        onTouchEnd={() => setHoverOnModal(false)}
      >
        <div className='flex justify-end mb-4'>
          <div
            onClick={handleClickClose}
            className={
              "flex justify-center items-center w-12 h-12 sm:w-14 sm:h-14 bg-transparent border-[2.2px] sm:border-[3px] border-black dark:border-white  rounded-full"
            }
          >
            <button className='text-base sm:text-xl font-bold text-black dark:text-white'>
              <ImCross />
            </button>
          </div>
        </div>
        <div className='text-white'>
          <h2
            className={`font-bold ${lang === "en" ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"} mb-8 text-center text-black dark:text-white`}
          >
            {t("sponsors.thankTo_1")}
            <br />
            {t("sponsors.thankTo_2")}
          </h2>
          <div className='flex gap-x-[12px] gap-y-0 flex-wrap justify-center'>
            {sponsors.map((sponsor: SponsorInfoType) => (
              <EachSponsor key={sponsor.id} sponsor={sponsor} lang={lang} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sponsors;
