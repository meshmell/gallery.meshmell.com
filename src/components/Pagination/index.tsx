"use client"
import { useRouter, useSearchParams } from "next/navigation"
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
      <div className="fixed bottom-10 left-0 w-full bg-transparent z-50">
        <div className="absolute bottom-1 -translate-x-2/4 left-2/4">
          <div className="flex gap-1 justify-center select-none">
            {currentPage > 1 ? (
              <div className="cursor-pointer sm:text-2xl text-lg flex items-center font-bold rounded-full border hover:text-blue-700 hover:border-blue-700" onClick={goToPreviousPage}>
                <MdOutlineKeyboardDoubleArrowLeft />
              </div>
            ) :
              <div className="w-[24px] sm:w-[24px]"></div>
            }
            <div className="flex gap-1">
              {getPageRange().map((page, index) => {
                if (page === "...") {
                  return <span key={index} className="px-2 xs:px-3 py-0.5 xs:py-1">...</span>;
                }

                return (
                  <div key={index} className={`cursor-pointer font-bold rounded-full px-2 xs:px-3 py-0.5 xs:py-1 border ${page === currentPage ? "bg-blue-500 text-white" : ""}
                  hover:text-blue-700 hover:border-blue-700`} onClick={() => goToPage(page)}>
                    {page}
                  </div>
                );
              })}
            </div>
            {currentPage < totalPages ? (
              <div className="cursor-pointer sm:text-2xl text-lg flex items-center font-bold rounded-full border hover:text-blue-700 hover:border-blue-700" onClick={goToNextPage}>
                <MdOutlineKeyboardDoubleArrowRight />
              </div>
            ) :
              <div className="w-[24px] sm:w-[24px]"></div>
            }
          </div>
        </div>
      </div>
    </ >
  )
}

export default Pagination
