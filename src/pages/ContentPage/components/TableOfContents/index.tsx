// @ts-ignore
import React, { useCallback } from "react";
import { PageData } from "../../../../shared/interfaces/tableOfContents.ts";
import TOCItem from "../TOCItem";
import { useTableOfContentsContext } from "../../../../shared/context/TableOfContentsProvider";

const TableOfContents = () => {
  const { flattenedData, expandedItems, setExpandedItems } =
    useTableOfContentsContext();

  const handleOnToggleExpand = useCallback(
    (item: PageData) => {
      setExpandedItems((prev) => {
        const updMap = { ...prev };
        const index = flattenedData.findIndex(({ id }) => item.id === id);

        for (let i = index + 1; i < flattenedData.length; i++) {
          const current = flattenedData[i];
          // break if current item is a sibling of selected item
          if (current.level <= item.level) {
            break;
          } else if (current.level - 1 !== item.level && !updMap[current.id]) {
            // skip if current item is descendant of selected item (more then 1 level deep)
            continue;
          }
          updMap[current.id] = !updMap[current.id];
        }

        return updMap;
      });
    },
    [flattenedData, setExpandedItems],
  );

  return (
    <nav className="nav__toc">
      <ul>
        {flattenedData
          .filter((item) => expandedItems[item.id])
          .map((item) => (
            <TOCItem
              key={item.id}
              item={item}
              onToggleExpand={handleOnToggleExpand}
            />
          ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
