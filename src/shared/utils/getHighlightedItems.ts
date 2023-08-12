import { PageData } from "shared/interfaces/tableOfContents.ts";

const findDescendantsAndSiblings = (itemArray: PageData[], itemId: string) => {
  const descendants: PageData[] = [];

  const searchDescendants = (items: PageData[]) => {
    for (const item of items) {
      if (item.parentId === itemId) {
        descendants.push(item);
        searchDescendants(
          itemArray.filter((child) => child.parentId === item.id),
        );
      }
    }
  };

  searchDescendants(itemArray.filter((item) => item.parentId === itemId));

  if (descendants.length === 0) {
    const selectedItem = itemArray.find((item) => item.id === itemId);
    if (selectedItem) {
      const parentItem = itemArray.find(
        (item) => item.id === selectedItem.parentId,
      );
      if (parentItem) {
        return itemArray.filter(
          (item) => item.level !== 1 && item.parentId === parentItem.id,
        );
      }
    }
  }

  return descendants;
};

export const getHighlightedItems = (
  data: PageData[],
  selectedItem: PageData,
) => {
  const descendants = findDescendantsAndSiblings(data, selectedItem.id);
  return descendants.map((item) => item?.id);
};
