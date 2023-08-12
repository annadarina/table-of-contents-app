import { PageData } from "shared/interfaces/tableOfContents.ts";

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

export const getAllDescendantsOfTopLevel = (
  data: PageData[],
  selectedItem: PageData,
) => {
  const topLevelItem = findTopLevelAncestor(data, selectedItem);
  const descendants = findDescendants(data, topLevelItem?.id as string);
  return [topLevelItem, ...descendants].map((item) => item?.id);
};
