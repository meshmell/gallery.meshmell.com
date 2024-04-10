import { get, ref, } from "firebase/database";

import { DataItem } from "@/src/types/downloadCountData";
import { ModelDetailsType } from "@/src/types/models";
import { database } from "@/src/utils/firebase/firebase.config";

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
          setGetFirebaseDataLoading(true);
          const downloadsRef = ref(database, `models/${focusedModelsObj.slug}/downloads`);
          let downloadsData: DataItem[] = [];
          get(downloadsRef).then((snapshot) => {
            if (snapshot.exists()) {
              downloadsData = snapshot.val();
            }
          }).catch((error) => {
            console.error(error);
          }).finally(() => {
            setFocusedModelsDownloadData(downloadsData);
            setGetFirebaseDataLoading(false);
          });
        }
      });
  } catch (error) {
    console.error("Failed to update downloads in database", error);
  }
}

export default handleIncrementDownloadToFirebase;
