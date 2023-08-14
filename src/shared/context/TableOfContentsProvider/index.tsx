import React, { useContext, useState, useMemo, createContext } from "react";
import { PageData, TOCData } from "../../interfaces/tableOfContents.ts";
import {
  flattenData,
  getAllDescendantsOfTopLevel,
  getHighlightedItems,
} from "../../utils";

export interface TableOfContentsContext {
  data: TOCData | null;
  flattenedData: PageData[];
  activePage: PageData | null;
  setActivePage: React.Dispatch<React.SetStateAction<PageData | null>>;
  expandedItems: Record<PageData["id"], boolean>;
  setExpandedItems: React.Dispatch<
    React.SetStateAction<Record<PageData["id"], boolean>>
  >;
  descendantsIds: string[];
  backlightIds: string[];
}

export const TableOfContentsContext = createContext<TableOfContentsContext>(
  {} as TableOfContentsContext,
);

export const useTableOfContentsContext = (): TableOfContentsContext => {
  return useContext(TableOfContentsContext) || {};
};

export const TableOfContentsProvider = ({
  data,
  children,
}: {
  data: TOCData | null;
  children: React.ReactElement | null;
}) => {
  const [activePage, setActivePage] = useState<PageData | null>(null);
  const [expandedItems, setExpandedItems] = useState<
    Record<PageData["id"], boolean>
  >({});

  // Get flat list of the initial data
  const flattenedData = useMemo(() => {
    if (data) {
      return flattenData(data);
    }
    return [];
  }, [data]);

  // Get all item ids of the top level element
  // to highlight all first-level topic's descendants
  const descendantsIds = useMemo(() => {
    if (activePage) {
      return getAllDescendantsOfTopLevel(flattenedData, activePage);
    }

    return [];
  }, [activePage, flattenedData]);

  // Get all item ids of the top level element
  // to highlight second-level topic's items
  const backlightIds = useMemo(() => {
    if (data && activePage && activePage.level !== 0) {
      return getHighlightedItems(flattenedData, activePage, data.topLevelIds);
    }

    return [];
  }, [data, activePage, flattenedData]);

  return (
    <TableOfContentsContext.Provider
      value={{
        data,
        flattenedData,
        activePage,
        setActivePage,
        expandedItems,
        setExpandedItems,
        descendantsIds,
        backlightIds,
      }}
    >
      {children}
    </TableOfContentsContext.Provider>
  );
};
