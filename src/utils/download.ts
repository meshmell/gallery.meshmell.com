export const handleDownload = async (focusedModelsSlug: string, filename: string) => {
  const response = await fetch(`/api/download?focusedModelsSlug=${focusedModelsSlug}&filename=${filename}`);

  if (!response.ok) {
    throw new Error("Error downloading the file");
  }

  const blob = await response.blob();
  const downloadUrl = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.download = `${filename}`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(downloadUrl);
};
