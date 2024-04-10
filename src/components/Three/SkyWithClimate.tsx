import { Sky } from "@react-three/drei";

import { LightAndDarkThemeType } from "@/src/types/lightAndDarkTheme";

const SkyWithClimate = ({ lightAndDarkTheme }: { lightAndDarkTheme: LightAndDarkThemeType }) => {

  let sunPosition: [number, number, number];
  let inclination: number;
  const azimuth = 0.25; // Default azimuth, can be adjusted

  switch (lightAndDarkTheme) {
    case "light":
      sunPosition = [0, 1, 0];
      inclination = 0.5;
      break;
    case "dark":
      sunPosition = [-1, -1, -1];
      inclination = 0.5;
      break;
    default:
      sunPosition = [0, -1, 0];
      inclination = 0;
      break;
  }

  return (
    <Sky
      distance={450000}
      sunPosition={sunPosition}
      inclination={inclination}
      azimuth={azimuth}
    />
  )
};

export default SkyWithClimate;
