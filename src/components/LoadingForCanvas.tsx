import { useProgress } from "@react-three/drei"
import { useEffect, useState } from "react";
import { Puff } from "react-loader-spinner";

import { useTranslation } from "@/src/i18n/client";
import { LanguageType } from "@/src/types/language";

type LoadingForCanvasType = {
  lang: LanguageType;
  started: boolean;
  setStarted: (started: boolean) => void;
}

const LoadingForCanvas = ({ lang, started, setStarted }: LoadingForCanvasType) => {

  const { t } = useTranslation(lang, "main");

  const { progress } = useProgress();
  const [showStartButton, setShowStartButton] = useState(false);
  const [maxProgress, setMaxProgress] = useState(0);

  useEffect(() => {
    if (progress > maxProgress) {
      setMaxProgress(progress);
    }

    if (maxProgress === 100) {
      setShowStartButton(true);
    }
  }, [progress, maxProgress]);

  const handleStartClick = () => {
    setStarted(true);
  };

  return (
    <>
      <div className={`fixed top-0 right-0 w-screen h-screen border flex flex-col justify-center items-center bg-gradient-to-r from-purple-600 to-orange-500 z-[1000] ${started ? "hidden" : "flex"}`}>
        <h1 className="text-white text-5xl mb-4 font-bold">{t("loadingForCanvas.name")}</h1>
        <div className="mt-4 py-2">
          {showStartButton ?
            <button
              className="px-6 bg-[#ffffff] text-violet-800 font-extrabold text-3xl rounded transition duration-300 h-[100px] my-[50px]"
              onClick={handleStartClick}
            >
              {t("loadingForCanvas.start")}
            </button>
            :
            <Puff
              height="200"
              width="200"
              radius={1}
              color="white"
              ariaLabel="puff-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          }
        </div>
        <div className="text-white">
          {maxProgress === 100 ?
            <div className="text-2xl mt-2">{t("loadingForCanvas.loaded")}</div>
            :
            <div className="text-2xl mt-2">{t("loadingForCanvas.loading")}</div>
          }
          <div className="text-center text-2xl">
            {Math.floor(maxProgress)} %
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadingForCanvas;
