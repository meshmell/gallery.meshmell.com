import { useRouter, useSearchParams } from "next/navigation";
import { ImCross } from "react-icons/im";

import { LanguageType } from "@/src/types/language";
import { newRouterPush } from "@/src/utils/newRouterPush";

type CancelButtonType = {
  lang: LanguageType;
};

const CancelButton = ({ lang }: CancelButtonType) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const handleUnFocus = () => {
    newRouterPush(
      lang,
      [
        { key: "focusedMode", value: "off" },
        { key: "action", value: "none" },
        { key: "wireFrame", value: "off" },
      ],
      searchParams,
      router,
    );
  };

  return (
    <button
      className='mt-4 text-3xl bg-neutral-100 dark:bg-neutral-950 rounded-full p-6 shadow-lg cursor-pointer border-black dark:border-white border-[1.5px] sm:border-[3px]'
      onClick={handleUnFocus}
    >
      <ImCross />
    </button>
  );
};

export default CancelButton;
