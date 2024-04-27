
import { ModelDetailsType } from "@/src/types/models";
import { database } from "@/src/utils/firebase/firebase.config";

import { fetchAndSetDownloads } from "./fetchAndSetDownloads";

const handleIncrementDownloadToFirebase = (
  setFocusedModelsDownloadData: (focusedModelsDownloadData: any) => void,
  focusedModelsObj: ModelDetailsType,
  setGetFirebaseDataLoading: (getFirebaseDataLoading: boolean) => void
) => {

  try {
    fetch(`/api/incrementDownload/?modelSlug=${focusedModelsObj.slug}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          fetchAndSetDownloads(database, focusedModelsObj.slug, setFocusedModelsDownloadData, setGetFirebaseDataLoading);
        }
      });
  } catch (error) {
    console.error("Failed to update downloads in database", error);
  }
}

export default handleIncrementDownloadToFirebase;
