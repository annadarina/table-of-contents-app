import { PageData } from "../interfaces/tableOfContents.ts";

/**
 * Find descendants of a selected item in the list.
 * @param {PageData[]} data - The array of items.
 * @param {string} selectedItemId - The ID of the selected item.
 * @returns {PageData[]} - An array of descendant items.
 */
export const findDescendants = (data: PageData[], selectedItemId: string) => {
  const result = [];

  const findChildren = (parentId: string) => {
    const children = data.filter((item) => item.parentId === parentId);
    for (const child of children) {
      const { id, title, url, parentId, level, tabIndex, pages } = child;
      const descendant = {
        id,
        title,
        url,
        parentId,
        level,
        tabIndex,
        pages: pages ? [...pages] : [],
        ancestorIds: [...(child.ancestorIds as string[]), parentId],
      };
      result.push(descendant);
      findChildren(id);
    }
  };

  const selectedItem = data.find((item) => item.id === selectedItemId);
  if (selectedItem) {
    const { id, title, url, parentId, level, tabIndex, pages } = selectedItem;
    const selectedDescendant = {
      id,
      title,
      url,
      parentId,
      level,
      tabIndex,
      pages: pages ? [...pages] : [],
      ancestorIds: [...(selectedItem.ancestorIds as string[])],
    };
    result.push(selectedDescendant);
    findChildren(selectedItemId);
  }

  return result;
};

/**
 * Find the top-level ancestor of a selected item in the list.
 * @param {PageData[]} data - The array of items.
 * @param {PageData} selectedItem - The selected item.
 * @returns {PageData | null} - The top-level ancestor item.
 */
const findTopLevelAncestor = (data: PageData[], selectedItem: PageData) => {
  // @ts-ignore
  const findAncestor = (item: PageData) => {
    if (item.ancestorIds?.length === 0 && item.level === 0) {
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
  const descendants = findDescendants(data, topLevelItem?.id as string);
  return [topLevelItem, ...descendants].map((item) => item?.id);
};
