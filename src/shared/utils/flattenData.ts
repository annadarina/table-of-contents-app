import { TOCData, PageData } from "shared/interfaces/tableOfContents.ts";

export const flattenData = (data: TOCData) => {
  const flattenedData: PageData[] = [];

  const flattenItem = (item: PageData) => {
    flattenedData.push(item);

    if ("pages" in item) {
      item.pages.forEach((childId: string) => {
        flattenItem(data.entities.pages[childId]);
      });
    }
  };

  data.topLevelIds.forEach((id) => {
    flattenItem(data.entities.pages[id]);
  });

  return flattenedData;
};
