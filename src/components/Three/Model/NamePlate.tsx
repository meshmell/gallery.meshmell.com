import { Text, Image as ImageThree } from "@react-three/drei";
import { useTheme } from "next-themes";
import React from "react"

import { RoundedRectangleGeometry } from "@/src/components/Three/RoundedRectangleGeometry";
import { CreatorDetailsType } from "@/src/types/creators";
import { LanguageType } from "@/src/types/language";
import { ModelDetailsType } from "@/src/types/models";

type NamePlateType = {
  lang: LanguageType
  thisModelsObj: ModelDetailsType
  thisModelsCreatorObj: CreatorDetailsType
}

const NamePlate = ({ thisModelsObj, thisModelsCreatorObj, lang }: NamePlateType) => {

  const { resolvedTheme } = useTheme();

  const calculateNameWidth = (name: string) => {
    let totalWidth = 0;

    for (let i = 0; i < name.length; i++) {
      const char = name[i];

      if (isJapaneseCharacter(char)) {
        totalWidth += 0.4; // Japanese characters are wider
      }
      else if (isNumberCharacter(char)) {
        totalWidth += 0.2; // English characters are narrower
      }
      else {
        totalWidth += 0.3; // English characters are narrower
      }
    }

    return totalWidth;
  }

  const isNumberCharacter = (char: string) => {
    // Regular expression to check if the character is a number
    const numberCharRegex = /[0-9]/;

    return numberCharRegex.test(char);
  }

  const isJapaneseCharacter = (char: string) => {
    // Regular expression to check if the character is Japanese
    // This includes Hiragana, Katakana, and Kanji
    const japaneseCharRegex = /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uffef\u4e00-\u9faf\u3400-\u4dbf]/;

    return japaneseCharRegex.test(char);
  }

  const thisModelsCreatorsName = thisModelsCreatorObj.name[lang]
  const nameLength = thisModelsObj.name[lang].length;
  const modelNameWidth = nameLength * (lang === "en" ? 0.3 : 0.6);
  const imageScale = 0.5
  const imageWidth = 1 * imageScale
  const creatorNameWidth = calculateNameWidth(thisModelsCreatorsName);
  const creatorAndImageWidth = creatorNameWidth
  const perspectiveModelPositionPlusZ = 10
  const ModelNamePositionPlusY = thisModelsObj.source ? 0.5 : 0.2
  const perspectiveModelPositionPlusY = thisModelsObj.source ? -0.1 : -0.3
  const creatorsPath = thisModelsObj.creator ? thisModelsObj.creator : "PlaceHolder"
  const sourceCreatorPath = thisModelsObj.source ? thisModelsObj.source.creator : "PlaceHolder"
  const plateWidth = (modelNameWidth > creatorAndImageWidth) ? modelNameWidth : creatorAndImageWidth

  return (
    <>
      {/* Model Name */}
      <Text
        position={[0, ModelNamePositionPlusY, perspectiveModelPositionPlusZ]}
        color={resolvedTheme === "dark" ? "#ffffff" : "#000000"}
        fontSize={0.5}
        font="/fonts/Noto_Sans_JP/static/NotoSansJP-Bold.ttf"
      >
        {thisModelsObj.name[lang]}
      </Text >

      <group position={[0, perspectiveModelPositionPlusY, perspectiveModelPositionPlusZ]}>
        {/* Creator Name */}
        <Text
          position={[imageWidth, 0, 0]}
          color={resolvedTheme === "dark" ? "#575757" : "#575757"}
          fontSize={0.3}
          font="/fonts/Noto_Sans_JP/static/NotoSansJP-Bold.ttf"
        >
          {thisModelsCreatorObj.name[lang]}
        </Text>

        {/* Creator Image */}
        <ImageThree
          url={`${process.env.NEXT_PUBLIC_GCS_BUCKET_PUBLIC_URL}/images/creators/${creatorsPath}/img.webp`}
          position={[-creatorNameWidth / 2 + imageWidth * 1.5, 0, 0]}
          scale={imageScale}
        />
      </group>

      {thisModelsObj.source ?
        <group position={[0, perspectiveModelPositionPlusY, perspectiveModelPositionPlusZ + 1]}>
          {/* Source Creator Name */}
          <>
            <Text
              position={[imageWidth, 0, 0]}
              color={resolvedTheme === "dark" ? "#575757" : "#575757"}
              fontSize={0.3}
              font="/fonts/Noto_Sans_JP/static/NotoSansJP-Bold.ttf"
            >
              {lang === "en" ? `Source: ${thisModelsObj.source.creator}` : `原作: ${thisModelsObj.source.creator}`}
            </Text>
            {/* Source creator Image */}
            <ImageThree
              url={`${process.env.NEXT_PUBLIC_GCS_BUCKET_PUBLIC_URL}/images/creators/${sourceCreatorPath}/img.webp`}
              position={[-creatorNameWidth / 2 + imageWidth * 1.5, 0, 0]}
              scale={imageScale}
            />
          </>
        </group>
        :
        null
      }
      {/* White Plate with custom rounded corners */}
      <mesh position={[0, 0, perspectiveModelPositionPlusZ - 0.01]}>
        <RoundedRectangleGeometry width={plateWidth} height={thisModelsObj.source ? 1.8 : 1.2} radiusCorner={0.2} smoothness={5} color={resolvedTheme === "light" ? "#aaaaaa" : "#101010"} />
      </mesh>
    </>
  )
}

export default NamePlate
