export type ModelDetailsType = {
  name: {
    en: string;
    ja: string;
  };
  description: {
    en: string;
    ja: string;
  };
  creator: string;
  published: string;
  updated: string;
  categoryTags: string[];
  slug: string;
  price: number;
  resolutions: string[]
  credit: string;
  license: string;
  scale: number;
  rotationDegree: {
    x: number;
    y: number;
    z: number;
  }
  formats: string[];
  usedFormat: string;
  actions?: string[];
  isDownloadable: boolean;
  source?: {
    creator: string;
    sourceSite: string;
    downloadSite: string;
    sourceVideo: string;
  }
}
