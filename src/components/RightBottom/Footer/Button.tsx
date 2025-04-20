import { GiHamburgerMenu } from "react-icons/gi";

import { ModalOpenType } from "@/src/types/modals";

type FooterButtonType = {
  setModalOpen: (prevState: any) => void;
};

const FooterButton = ({ setModalOpen }: FooterButtonType) => {
  const handleClick = () => {
    setModalOpen((prevState: ModalOpenType) => ({
      ...prevState,
      footer: !prevState.footer,
    }));
  };

  return (
    <div
      onClick={handleClick}
      className='p-3 bg-neutral-100 dark:bg-neutral-950 border-black dark:border-white border-[1.5px] sm:border-[3px] rounded-full focus:outline-none focus:ring w-12 h-12 sm:w-14 sm:h-14 flex justify-center items-center text-3xl sm:text-4xl z-[70]'
    >
      <GiHamburgerMenu />
    </div>
  );
};

export default FooterButton;
