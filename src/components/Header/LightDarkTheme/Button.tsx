"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useTheme } from "next-themes";
import { MdLightMode, MdDarkMode } from "react-icons/md";

import { LanguageType } from "@/src/types/language";
import { ModalOpenType } from "@/src/types/modals";
import { newRouterPush } from "@/src/utils/newRouterPush";

type LightDarkThemeSwitchButtonType = {
  lang: LanguageType;
  modalOpen: ModalOpenType;
};

const LightDarkThemeSwitchButton = ({
  lang,
  modalOpen,
}: LightDarkThemeSwitchButtonType) => {
  const { setTheme, resolvedTheme } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();

  const isLight = resolvedTheme === "light";

  const handleClick = () => {
    setTheme(isLight ? "dark" : "light");
    newRouterPush(
      lang,
      [
        {
          key: "lightAndDarkTheme",
          value: resolvedTheme === "light" ? "dark" : "light",
        },
      ],
      searchParams,
      router,
    );
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={
          "mt-[6px] sm:mt-[10px] relative rounded-full flex justify-center "
        }
      >
        <div
          className={`${modalOpen.lightAndDarkTheme ? "bg-blue-500 border-blue-500" : "bg-neutral-100 dark:bg-neutral-950"} border-black dark:border-white border-[1.5px] sm:border-[3px] flex justify-center items-center w-12 h-12 sm:w-14 sm:h-14 rounded-full`}
        >
          {isLight ? (
            <MdDarkMode
              className={"text-black dark:text-white text-3xl sm:text-4xl"}
            />
          ) : (
            <MdLightMode
              className={"text-black dark:text-white text-3xl sm:text-4xl"}
            />
          )}
        </div>
      </button>
    </>
  );
};

export default LightDarkThemeSwitchButton;
