import React, { useCallback } from "react";
import { NavLink } from "react-router-dom";
import "./TOCItem.css";
import { PageData } from "shared/interfaces/tableOfContents.ts";
import { ArrowDown } from "shared/icons/ArrowDown.tsx";

interface Props {
  item: PageData;
  activePage: PageData | null;
  setActivePage: React.Dispatch<React.SetStateAction<PageData | null>>;
  expandedItems: Record<PageData["id"], boolean>;
  setExpandedItems: React.Dispatch<
    React.SetStateAction<Record<PageData["id"], boolean>>
  >;
  isDescendants: boolean;
  isHighlighted: boolean;
}

const TOCItem = ({
  item,
  activePage,
  setActivePage,
  expandedItems,
  setExpandedItems,
  isDescendants,
  isHighlighted,
}: Props) => {
  const hasChildren = item.pages && item.pages.length > 0;

  const arrowClasses = `toc-item__arrow ${
    expandedItems[item.id] ? "toc-item__arrow--expand" : ""
  }`;

  const isActive = activePage?.id === item.id ? "toc-item__name--active" : "";
  const isDescendantsClass = isDescendants
    ? "toc-item__name--backlight-pale"
    : "";
  const isHighlightedClass = isHighlighted ? "toc-item__name--backlight" : "";
  const tocNameClasses = `toc-item__name ${isActive} ${isDescendantsClass} ${isHighlightedClass}`;

  const onClick = useCallback(
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
        onClick={onClick}
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
