import {PageData} from "../interfaces/tableOfContents.ts";
import {findDescendants} from "./getAllDescendantsOfTopLevel.ts";

/**
 * Filters descendants of a selected item.
 * @param {PageData[]} data - The array of items.
 * @param {string} selectedItemId - The selected item.
 * @returns {PageData[]} An array of filtered data that has only descendants of selected parent item.
 */
const filterDescendants = (data: PageData[], selectedItemId: string): PageData[] => {
  const selectedNode = data.find((item) => item.id === selectedItemId);

  if (!selectedNode || selectedNode.level === 0) {
    return [];
  }

  const descendants: PageData[] = [];
  findDescendants(data, selectedItemId, descendants);

  return [selectedNode, ...descendants];
};

/**
 * Gets highlighted items based on the selected item.
 * @param {PageData[]} data - The array of items.
 * @param {PageData} selectedItem - The selected item.
 * @param {string[]} topLevelIds - An array of top-level IDs to exclude from highlighting.
 * @returns {string[]} An array of items' IDs that need to be highlighted.
 */
export const getHighlightedItems = (
  data: PageData[],
  selectedItem: PageData,
  topLevelIds: string[],
): string[] => {
  // do not highlight if selected item is on the top level
  if (topLevelIds?.includes(selectedItem.id)) {
    return [];
  }

  const filteredData = filterDescendants(data, selectedItem.parentId);
  return filteredData.map((item) => item.id);
};
