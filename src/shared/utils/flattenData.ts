import { TOCData, PageData } from "../interfaces/tableOfContents.ts";

/**
 * Get flat list from the initial TOC data.
 * @param {TOCData} data - The initial data.
 * @returns {PageData[]} - An array of all possible pages.
 */
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
