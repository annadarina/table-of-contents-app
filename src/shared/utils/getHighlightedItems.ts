import { PageData } from "../interfaces/tableOfContents.ts";

/**
 * Filters descendants of a selected item.
 * @param {PageData[]} data - The array of items.
 * @param {string} selectedItemId - The selected item.
 * @returns {PageData[]} An array of filtered data that has only descendants of selected parent item.
 */
const filterDescendants = (data: PageData[], selectedItemId: string) => {
  const selectedNode = data.find((item) => item.id === selectedItemId);

  if (!selectedNode || selectedNode.level === 0) {
    return [];
  }

  const descendants = [];

  const findDescendants = (nodeId: string) => {
    data
      .filter((item) => item.parentId === nodeId)
      .forEach((child) => {
        descendants.push(child);
        findDescendants(child.id);
      });
  };

  findDescendants(selectedItemId);
  return [selectedNode, ...descendants];
};

/**
 * Gets highlighted items based on the selected item.
 * @param {PageData[]} data - The array of items.
 * @param {PageData} selectedItem - The selected item.
 * @param {string[]} topLevelIds - An array of top-level IDs to exclude from highlighting.
 * @returns {PageData[]} An array of items' IDs that need to be highlighted.
 */
export const getHighlightedItems = (
  data: PageData[],
  selectedItem: PageData,
  topLevelIds: string[],
) => {
  // do not highlight if selected item is on the top level
  if (topLevelIds?.includes(selectedItem.id)) {
    return [];
  }

  const filteredData = filterDescendants(data, selectedItem.parentId);
  return filteredData.map((item) => item.id);
};
