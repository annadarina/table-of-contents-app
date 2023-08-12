import { useMemo, useState, useCallback } from "react";
import { TOCData, PageData } from "shared/interfaces/tableOfContents.ts";
import {
  flattenData,
  getAllDescendantsOfTopLevel,
  getHighlightedItems,
} from "shared/utils";
import TOCItem from "../TOCItem";

interface Props {
  data: TOCData | null;
}

const TableOfContents = ({ data }: Props) => {
  const [activePage, setActivePage] = useState<PageData | null>(null);
  const [expandedItems, setExpandedItems] = useState<
    Record<PageData["id"], boolean>
  >({});

  const flattenedData = useMemo(() => {
    if (data) {
      return flattenData(data);
    }
    return [];
  }, [data]);

  const descendantsIds = useMemo(() => {
    if (activePage) {
      return getAllDescendantsOfTopLevel(flattenedData, activePage);
    }

    return [];
  }, [activePage, flattenedData]);

  const backlightIds = useMemo(() => {
    if (activePage && activePage.level !== 0) {
      return getHighlightedItems(flattenedData, activePage);
    }

    return [];
  }, [activePage, flattenedData]);

  const areParentsExpanded = useCallback(
    (item: PageData) => {
      if (!item.parentId) {
        return true;
      }

      const parentItem = flattenedData.find(
        (parent) => parent.id === item.parentId,
      );
      if (!parentItem) {
        return true;
      }

      if (!areParentsExpanded(parentItem)) {
        return false;
      }

      return expandedItems[parentItem.id];
    },
    [flattenedData, expandedItems],
  );

  return (
    <nav className="nav__toc">
      <ul>
        {flattenedData
          .filter((item) => areParentsExpanded(item))
          .map((item) => (
            <TOCItem
              key={item.id}
              item={item}
              activePage={activePage}
              setActivePage={setActivePage}
              expandedItems={expandedItems}
              setExpandedItems={setExpandedItems}
              isDescendants={descendantsIds.includes(item.id)}
              isHighlighted={backlightIds.includes(item.id)}
            />
          ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
