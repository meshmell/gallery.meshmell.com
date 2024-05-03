import GbFlagSvg from "@/src/components/Svg/Language/GbFlagSvg"
import JpFlagSvg from "@/src/components/Svg/Language/JpFlagSvg"
import { LanguageType } from "@/src/types/language";

interface FlagComponentProps {
  lang: LanguageType;
}

const FlagComponent = ({ lang }: FlagComponentProps) => {
  switch (lang) {
    case "en":
      return <GbFlagSvg style={{ width: "100%", height: "100%" }} />;
    case "ja":
      return <JpFlagSvg style={{ width: "100%", height: "100%" }} />;
    default:
      return <div>No flag available</div>;
  }
};

export default FlagComponent;
