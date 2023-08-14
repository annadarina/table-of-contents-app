import { PageData } from "../../../interfaces/tableOfContents.ts";

export const getParentsMap = (
  items: PageData[],
  value: string,
  entities: {
    pages: Record<string, PageData>;
  },
) => {
  const map: Record<string, boolean> = {};

  for (let i = 0; i < items.length; i++) {
    const current = items[i];

    // 1. Check if current item includes search input
    if (current.title.toLowerCase().includes(value.toLowerCase())) {
      // 2. Add ID to the map
      map[current.id] = true;

      // 3. Find its parent
      let parentId = current.parentId;

      // 4. Keep adding parent ids all the way up until we reach top level
      while (parentId) {
        map[parentId] = true;
        // @ts-ignore
        parentId = entities.pages[parentId]
          ? entities.pages[parentId].parentId
          : undefined;
      }
    }
  }

  return map;
};
