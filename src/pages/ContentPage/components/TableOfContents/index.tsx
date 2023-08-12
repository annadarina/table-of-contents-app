import { useMemo, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import "./TableOfContents.css";
import { TOCData, PageData } from "shared/interfaces/tableOfContents.ts";
import TextField from "shared/components/TextField";
import { flattenData } from "shared/utils";
import TOCItem from "../TOCItem";

interface Props {
  data: TOCData | null;
}

const TableOfContents = ({ data }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const { pageId } = useParams();

  const flattenedData = useMemo(() => {
    if (data) {
      return flattenData(data);
    }
    return [];
  }, [data]);

  const [activePage, setActivePage] = useState<PageData | null>(() => {
    return (
      flattenedData.find((element: PageData) => element.url === pageId) || null
    );
  });

  const [expandedItems, setExpandedItems] = useState<
    Record<PageData["id"], boolean>
  >({});

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

  // console.log("flattenedData", flattenedData);

  console.log(expandedItems);

  return (
    <>
      <div className="nav__search">
        <TextField
          placeholder="Search..."
          value={searchTerm}
          onChange={(e: any) => setSearchTerm(e.target.value)}
        />
      </div>

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
              />
            ))}
        </ul>
      </nav>
    </>
  );
};

export default TableOfContents;
