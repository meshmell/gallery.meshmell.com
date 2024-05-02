"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { useTheme } from "next-themes";
import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

import { CategoryDetailsType } from "@/src/types/categories";
import { CreatorDetailsType } from "@/src/types/creators";
import { LanguageType } from "@/src/types/language";
import { ModelDetailsType } from "@/src/types/models";
import { getFilteredModels } from "@/src/utils/getFilteredModels";
import { newRouterPush } from "@/src/utils/newRouterPush";

type getPageRangeType = {
  lang: LanguageType
  currentPage: number
  filteredCategorysObj: CategoryDetailsType
  filteredCreatorsObj: CreatorDetailsType
  searchWord: string
  models: ModelDetailsType[]
}
const Pagination = ({ lang, currentPage, filteredCategorysObj, filteredCreatorsObj, searchWord, models }: getPageRangeType) => {
  const filteredModels = getFilteredModels(models, filteredCategorysObj, filteredCreatorsObj, searchWord);

  const numOfModel = Number(process.env.NEXT_PUBLIC_NUM_OF_MODEL_BY_PAGE || "5");
  const totalPages = Math.ceil(filteredModels.length / numOfModel);
  const searchParams = useSearchParams()
  const router = useRouter();
  const { theme } = useTheme();

  const getPageRange = () => {
    if (totalPages <= 8) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    } else {
      let range = [1, 2, 3, 4, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];

      if (currentPage > 4 && currentPage < totalPages - 3) {
        range = [
          1, 2, "...", currentPage, "...", totalPages - 1, totalPages
        ];
      }

      return range;
    }
  };

  const goToPage = (page: any) => {
    newRouterPush(
      lang,
      [
        { key: "page", value: page.toString() },
      ],
      searchParams,
      router
    );
  }

  const goToPreviousPage = () => {
    newRouterPush(
      lang,
      [
        { key: "page", value: (currentPage - 1).toString() },
      ],
      searchParams,
      router
    );
  }

  const goToNextPage = () => {
    newRouterPush(
      lang,
      [
        { key: "page", value: (currentPage + 1).toString() },
      ],
      searchParams,
      router
    );
  }

  return (
    <>
      <div className="fixed bottom-10 left-0 w-full bg-transparent z-50 text-3xl">
        <div className="absolute bottom-1 -translate-x-2/4 left-2/4">
          <div className="flex gap-1 justify-center select-none">
            {currentPage > 1 ? (
              <div className="cursor-pointer flex items-center font-bold rounded-full bg-white dark:bg-black border-black dark:border-white border-[3px] hover:text-blue-700 hover:border-blue-700 hover:dark:border-blue-700 px-[5px] mt-[2px]" onClick={goToPreviousPage}>
                <MdOutlineKeyboardDoubleArrowLeft />
              </div>
            ) :
              <div className="w-[40px]"></div>
            }
            <div className="flex gap-1">
              {getPageRange().map((page, index) => {

                const buttonClass = page === currentPage
                  ? (theme === "light" ? "bg-blue-500 text-white" : "bg-blue-500 border-white")
                  : (theme === "light" ? "bg-white" : "bg-black");

                if (page === "...") {
                  return <span key={index} className="px-[10px] py-0.5 xs:py-1">...</span>;
                }

                return (
                  <div key={index} className={`cursor-pointer font-bold rounded-full py-1 px-4 border-black dark:border-white border-[3px] ${buttonClass} hover:text-blue-700 hover:dark:text-blue-700 hover:border-blue-700 dark:hover:border-blue-700`} onClick={() => goToPage(page)}>
                    {page}
                  </div>
                );
              })}
            </div>
            {currentPage < totalPages ? (
              <div className="cursor-pointer flex items-center font-bold rounded-full bg-white dark:bg-black border-black dark:border-white border-[3px] hover:text-blue-700 hover:border-blue-700 hover:dark:border-blue-700 px-[5px] mt-[2px]" onClick={goToNextPage}>
                <MdOutlineKeyboardDoubleArrowRight />
              </div>
            ) :
              <div className="w-[40px]"></div>
            }
          </div>
        </div>
      </div>
    </ >
  )
}

export default Pagination
