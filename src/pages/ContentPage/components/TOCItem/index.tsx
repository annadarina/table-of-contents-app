import React, { useCallback } from "react";
import "./TOCItem.css";
import { PageData } from "../../../../shared/interfaces/tableOfContents.ts";
import { ArrowDown } from "../../../../shared/icons/ArrowDown.tsx";
import { useTableOfContentsContext } from "../../../../shared/context/TableOfContentsProvider";

interface Props {
  item: PageData;
  onToggleExpand: (item: PageData) => void;
}

const TOCItem = ({ item, onToggleExpand }: Props) => {
  const {
    activePage,
    setActivePage,
    currentExpandedItems,
    setCurrentExpandedItems,
    descendantsIds,
    backlightIds,
  } = useTableOfContentsContext();

  const hasChildren = item.pages && item.pages.length > 0;

  const arrowClasses = `toc-item__arrow ${
    currentExpandedItems[item.id] ? "toc-item__arrow--expand" : ""
  }`;

  const isActiveClass =
    activePage?.id === item.id ? "toc-item__name--active" : "";
  const isDescendantsClass = descendantsIds.includes(item.id)
    ? "toc-item__name--backlight-pale"
    : "";
  const isHighlightedClass = backlightIds.includes(item.id)
    ? "toc-item__name--backlight"
    : "";
  const tocNameClasses = `toc-item__name ${isActiveClass} ${isDescendantsClass} ${isHighlightedClass}`;

  // 1. Setting active item
  // 2. Toggle expandable parent
  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      setActivePage(item);

      if (!hasChildren) {
        return;
      }

      if (!item.url) {
        event.preventDefault();
      }

      setCurrentExpandedItems((prev) => ({
        ...prev,
        [item.id]: !currentExpandedItems[item.id],
      }));

      onToggleExpand(item);
    },
    [
      currentExpandedItems,
      hasChildren,
      item,
      setActivePage,
      setCurrentExpandedItems,
      onToggleExpand,
    ],
  );

  return (
    <li>
      <span
        // to={`${item.url}`}
        style={{ paddingLeft: `${(item.level + 1) * 16}px` }}
        className={tocNameClasses}
        onClick={handleClick}
      >
        <span className="toc-item__arrow-wrapper">
          {hasChildren && <ArrowDown className={arrowClasses} />}
        </span>
        {item.title}
      </span>
    </li>
  );
};

export default TOCItem;
