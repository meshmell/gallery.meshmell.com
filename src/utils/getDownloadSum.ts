export const getDownloadSum = (downloadsData: any) => {
  let downloadCount = 0;

  if (downloadsData) {
    downloadCount = Object.keys(downloadsData).length;
  } else {
    downloadCount = 0;
  }

  return downloadCount;
}
