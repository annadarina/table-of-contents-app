import { PageData } from "../interfaces/tableOfContents.ts";

/**
 * Find the top-level ancestor of a selected item in the list.
 * @param {PageData[]} data - The array of items.
 * @param {PageData} selectedItem - The selected item.
 * @returns {PageData | null} - The top-level ancestor item.
 */
const findTopLevelAncestor = (data: PageData[], selectedItem: PageData) => {
  const findAncestor = (item: PageData) => {
    if (item.level === 0) {
      return item;
    }

    const parent = data.find((parentItem) => parentItem.id === item.parentId);

    if (parent) {
      return findAncestor(parent);
    }

    return null;
  };

  return findAncestor(selectedItem);
};

/**
 * Find descendants of a given node.
 * @param {PageData[]} data - The array of items.
 * @param {string} id - The ID of the item for which to find descendants.
 * @param {PageData[]} descendants - An optional array to store descendants.
 */
export const findDescendants = (
  data: PageData[],
  id: string,
  descendants: PageData[] = [],
) => {
  data
    .filter((item) => item.parentId === id)
    .forEach((child) => {
      descendants.push(child);
      findDescendants(data, child.id, descendants);
    });
};

/**
 * Get all descendants of the top-level ancestor of a selected item in the list.
 * @param {PageData[]} data - The array of items.
 * @param {PageData} selectedItem - The selected item.
 * @returns {string[]} - An array of IDs for all descendants.
 */
export const getAllDescendantsOfTopLevel = (
  data: PageData[],
  selectedItem: PageData,
) => {
  // find the top level ancestor of the selected item
  const topLevelItem = findTopLevelAncestor(data, selectedItem);
  // return all the descendants of this top level item
  let descendants = [];
  findDescendants(data, topLevelItem.id, descendants);
  descendants = [selectedItem, ...descendants];

  return [topLevelItem, ...descendants].map((item) => item?.id);
};
