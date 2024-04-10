"use client";
import { useRouter, useSearchParams } from "next/navigation"
import { GiWireframeGlobe, GiStoneSphere } from "react-icons/gi";

import { LanguageType } from "@/src/types/language";
import { newRouterPush } from "@/src/utils/newRouterPush";

type WireFrameSwitchButtonType = {
  lang: LanguageType;
  setIsWireFrame: (prevState: boolean) => void;
  isWireFrame: boolean
}

const WireFrameSwitchButton = ({ lang, setIsWireFrame, isWireFrame }: WireFrameSwitchButtonType) => {

  const searchParams = useSearchParams()
  const router = useRouter();

  const handleClick = () => {
    setIsWireFrame(!isWireFrame);

    if (isWireFrame) {
      newRouterPush(lang, [
        { key: "wireFrame", value: "off" }
      ], searchParams, router);
    } else {
      newRouterPush(lang, [
        { key: "wireFrame", value: "on" }
      ], searchParams, router);
    }
  }

  return (
    <>
      <button
        onClick={handleClick}
        className={"mt-[6px] sm:mt-[10px] relative rounded-full flex justify-center }"}
      >
        <div className={"flex justify-center items-center w-12 h-12 sm:w-14 sm:h-14 bg-neutral-100 dark:bg-neutral-950 border-[1.5px] sm:border-[3px] border-black dark:border-white  rounded-full"}>
          {isWireFrame ?
            <GiStoneSphere className={"text-black dark:text-white text-3xl sm:text-4xl"} />
            :
            <GiWireframeGlobe className={"text-black dark:text-white text-3xl sm:text-4xl"} />
          }
        </div>
      </button>
    </>
  );
};

export default WireFrameSwitchButton;
