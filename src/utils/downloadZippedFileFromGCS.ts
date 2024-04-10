import JSZip from "jszip";

import { ModelDetailsType } from "@/src/types/models";
import { fileFormats } from "@/src/utils/fileFormats";

export const handleDownloadZippedFileFromGCS = async (focusedModelsObj: ModelDetailsType, resolution: string) => {
  const zip = new JSZip();
  const filesToDownload = fileFormats.filter(format => focusedModelsObj.formats.includes(format.extension))

  for (const format of filesToDownload) {
    const filename = `${focusedModelsObj.slug}_${resolution}.${format.extension}`
    const response = await fetch(`/api/downloadFromGCS?focusedModelsSlug=${focusedModelsObj.slug}&filename=${filename}&resolution=${resolution}`)

    if (!response.ok) {
      throw new Error("Error downloading the file from GCS: " + filename);
    }

    const blob = await response.blob();

    zip.file(filename, blob, { compression: "DEFLATE" });
  }

  const zipBlob = await zip.generateAsync({ type: "blob", compression: "DEFLATE" });
  const downloadUrl = window.URL.createObjectURL(zipBlob);

  const link = document.createElement("a");
  link.href = downloadUrl;
  link.download = `${focusedModelsObj.slug}.zip`;
  document.body.appendChild(link);
  link.click();

  link.remove();
  window.URL.revokeObjectURL(downloadUrl);
};
