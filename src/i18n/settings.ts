export const fallbackLng = "en";
export const languages = [fallbackLng, "ja"];
export const defaultNS = "main";
export const labels = {
  ja: "日本語",
  en: "English",
};

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    // debug: process.env.NEXT_PUBLIC_ENV_STATUS === "development_with_emulators"),
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
