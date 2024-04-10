import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export function newRouterPush(
  lang: string,
  params: Array<{ key: string, value: string }>,
  searchParams: URLSearchParams,
  router: AppRouterInstance
) {
  const newSearchParams = new URLSearchParams(searchParams);

  // Delete the searchWord parameter if its value is an empty string
  params.forEach(({ key, value }) => {
    if (key === "searchWord" && value === "") {
      newSearchParams.delete("searchWord");
    }
  });

  // Delete existing keys from newSearchParams that will be updated
  params.forEach(({ key }) => {
    if (newSearchParams.has(key)) {
      newSearchParams.delete(key);
    }
  });

  // Add or update parameters in newSearchParams
  params.forEach(({ key, value }) => {
    if (key && value) {
      newSearchParams.set(key, value);
    }
  });

  const newPath = `/${lang}?${newSearchParams.toString()}`;
  router.push(newPath);
}
