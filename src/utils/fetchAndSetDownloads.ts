import { ref, get, Database } from "firebase/database";

import { DataItem } from "@/src/types/downloadCountData";

export const fetchAndSetDownloads = (database: Database, focusedModelsSlug: string, setFocusedModelsDownloadData: (focusedModelsDownloadData: any) => void, setGetFirebaseDataLoading: (getFirebaseDataLoading: boolean) => void) => {
  setGetFirebaseDataLoading(true);
  const downloadsRef = ref(database, `modelsDownload/${focusedModelsSlug}/downloads`);
  let downloadsCountData: DataItem[] = [];

  get(downloadsRef).then((snapshot) => {
    if (snapshot.exists()) {
      downloadsCountData = snapshot.val();
    }
  }).catch((error) => {
    console.error(error);
  }).finally(() => {
    setFocusedModelsDownloadData(downloadsCountData);
    setGetFirebaseDataLoading(false);
  });
}
