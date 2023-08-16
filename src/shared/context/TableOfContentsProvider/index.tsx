import React, {
  useContext,
  useState,
  useMemo,
  createContext,
  useEffect,
} from "react";
import { PageData, TOCData } from "../../interfaces/tableOfContents.ts";
import {
  flattenData,
  getAllDescendantsOfTopLevel,
  getHighlightedItems,
} from "../../utils";
import { getParentsMap } from "./utils/getParentsMap.ts";

type IDsMap = Record<PageData["id"], boolean>;

export interface TableOfContentsContext {
  data: TOCData | null;
  flattenedData: PageData[];
  activePage: PageData | null;
  setActivePage: React.Dispatch<React.SetStateAction<PageData | null>>;
  expandedItems: IDsMap;
  setExpandedItems: React.Dispatch<React.SetStateAction<IDsMap>>;
  currentExpandedItems: IDsMap;
  setCurrentExpandedItems: React.Dispatch<React.SetStateAction<IDsMap>>;
  descendantsIds: string[];
  backlightIds: string[];
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  filteredIds: IDsMap;
  setFilteredIds: React.Dispatch<React.SetStateAction<IDsMap>>;
}

export const TableOfContentsContext = createContext<TableOfContentsContext>(
  {} as TableOfContentsContext,
);

export const useTableOfContentsContext = (): TableOfContentsContext => {
  return useContext(TableOfContentsContext) || {};
};

interface Props {
  data: TOCData;
  children: React.ReactElement;
}

export const TableOfContentsProvider = ({ data, children }: Props) => {
  const [activePage, setActivePage] = useState<PageData | null>(null);
  const [expandedItems, setExpandedItems] = useState<IDsMap>(() => {
    return data.topLevelIds.reduce((acc: IDsMap, val: string) => {
      acc[val] = true;
      return acc;
    }, {});
  });
  const [currentExpandedItems, setCurrentExpandedItems] = useState<IDsMap>({});
  const [inputValue, setInputValue] = useState("");
  const [filteredIds, setFilteredIds] = useState<IDsMap>({});

  // Set the initial map of all top level ids
  const topLevelIdsMap = useMemo(() => {
    return data.topLevelIds.reduce((acc: IDsMap, val: string) => {
      acc[val] = true;
      return acc;
    }, {});
  }, [data]);

  // Get flat list of the initial data
  const flattenedData = useMemo(() => flattenData(data), [data]);

  useEffect(() => {
    // Set the initial filtered ids map
    const map: IDsMap = getParentsMap(flattenedData, inputValue, data.entities);

    setFilteredIds(map);

    // Update expanded items ids when search is on
    if (inputValue === "") {
      const updMap: IDsMap = { ...expandedItems };

      for (let i = 0; i < flattenedData.length; i++) {
        const curr = flattenedData[i];
        if (currentExpandedItems[curr.id]) {
          for (let j = i + 1; j < flattenedData.length; j++) {
            const next = flattenedData[j];
            // break if current item is a sibling of selected item
            if (next.level <= curr.level) {
              break;
            } else if (next.level - 1 > curr.level && !updMap[next.id]) {
              // skip if current item is descendant of selected item (more then 1 level deep)
              continue;
            }

            updMap[next.id] = true;
          }
        }
      }
      setExpandedItems(updMap);
    } else {
      setExpandedItems((prevState) => ({ ...prevState, ...filteredIds }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flattenedData, inputValue, data]);

  // Expand parents when search is changed
  useEffect(() => {
    if (inputValue) {
      setCurrentExpandedItems({
        ...expandedItems,
        ...filteredIds,
      });
    } else {
      setCurrentExpandedItems({});
      setExpandedItems(topLevelIdsMap);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

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
        currentExpandedItems,
        setCurrentExpandedItems,
        descendantsIds,
        backlightIds,
        inputValue,
        setInputValue,
        filteredIds,
        setFilteredIds,
      }}
    >
      {children}
    </TableOfContentsContext.Provider>
  );
};
