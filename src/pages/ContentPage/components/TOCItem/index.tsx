import React, { useCallback } from "react";
import { NavLink } from "react-router-dom";
import "./TOCItem.css";
import { PageData } from "../../../../shared/interfaces/tableOfContents.ts";
import { ArrowDown } from "../../../../shared/icons/ArrowDown.tsx";
import { useTableOfContentsContext } from "../../../../shared/context/TableOfContentsProvider";

interface Props {
  item: PageData;
}

const TOCItem = ({ item }: Props) => {
  const {
    activePage,
    setActivePage,
    expandedItems,
    setExpandedItems,
    descendantsIds,
    backlightIds,
  } = useTableOfContentsContext();

  const hasChildren = item.pages && item.pages.length > 0;

  const arrowClasses = `toc-item__arrow ${
    expandedItems[item.id] ? "toc-item__arrow--expand" : ""
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

      setExpandedItems((prevMap) => ({
        ...prevMap,
        [item.id]: !expandedItems[item.id],
      }));
    },
    [expandedItems, hasChildren, item, setActivePage, setExpandedItems],
  );

  return (
    <li>
      <NavLink
        to={`${item.url}`}
        style={{ paddingLeft: `${(item.level + 1) * 16}px` }}
        className={tocNameClasses}
        onClick={handleClick}
      >
        <span className="toc-item__arrow-wrapper">
          {hasChildren && <ArrowDown className={arrowClasses} />}
        </span>
        {item.title}
      </NavLink>
    </li>
  );
};

export default TOCItem;
