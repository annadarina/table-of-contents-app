import { TOCData, PageData } from "shared/interfaces/tableOfContents.ts";

// Get flat list from the initial TOC data
export const flattenData = (data: TOCData) => {
  const flattenedData: PageData[] = [];

  const flattenItem = (item: PageData, ancestors: string[] = []) => {
    const itemWithAncestors = {
      ...item,
      ancestorIds: ancestors,
    };

    flattenedData.push(itemWithAncestors);

    if ("pages" in item) {
      item.pages.forEach((childId: string) => {
        flattenItem(data.entities.pages[childId], [...ancestors, item.id]);
      });
    }
  };

  data.topLevelIds.forEach((id) => {
    flattenItem(data.entities.pages[id]);
  });

  return flattenedData;
};
