import { CategoryDetailsType } from "@/src/types/categories";
import { CreatorDetailsType } from "@/src/types/creators";
import { ModelDetailsType } from "@/src/types/models";
import { languagesList } from "@/src/utils/language";

export function getFilteredModels(models: ModelDetailsType[], filteredCategorysObj: CategoryDetailsType, filteredCreatorsObj: CreatorDetailsType, searchWord: string) {

  const filteredModels = models.filter(model => {

    const modelType = {
      name: model.name,
      description: model.name,
      creator: model.creator,
      published: model.published,
      updated: model.updated,
      categoryTags: model.categoryTags,
      slug: model.slug
    };

    try {
      const matchesCategory = filteredCategorysObj.slug === "all" || modelType.categoryTags.includes(filteredCategorysObj.slug);
      const matchesCreator = filteredCreatorsObj.slug === "" || modelType.creator === filteredCreatorsObj.slug;
      const lowerCaseSearchWord = searchWord.toLowerCase();
      const matchesSearch1 = lowerCaseSearchWord === ""
        || modelType.categoryTags.some(tag => tag.toLowerCase().includes(lowerCaseSearchWord))
        || modelType.slug.toLowerCase().includes(lowerCaseSearchWord);

      const matchesSearch2 = languagesList.some(lang => {
        const name = modelType.name[lang] || "";
        const description = modelType.description[lang] || "";

        return name.toLowerCase().includes(lowerCaseSearchWord) || description.toLowerCase().includes(lowerCaseSearchWord);
      });

      return matchesCategory && matchesCreator && matchesSearch1 && matchesSearch2;
    } catch (error) {
      console.error("Error filtering models:", error);

      return false;
    }
  });

  return filteredModels;
}
