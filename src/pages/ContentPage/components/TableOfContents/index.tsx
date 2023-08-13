import { useCallback } from "react";
import { PageData } from "../../../../shared/interfaces/tableOfContents.ts";
import TOCItem from "../TOCItem";
import { useTableOfContentsContext } from "../../../../shared/context/TableOfContentsProvider";

const TableOfContents = () => {
  const { flattenedData, expandedItems } = useTableOfContentsContext();

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
            <TOCItem key={item.id} item={item} />
          ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
