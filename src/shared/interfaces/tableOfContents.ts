export interface TOCData {
  entities: {
    pages: Record<string, PageData>;
  };
  topLevelIds: string[];
}

export interface PageData {
  id: string;
  title: string;
  level: number;
  parentId: string;
  pages: string[];
  anchors: string[];
  url: string;
  tabIndex: number;
  anchor?: string;
  ancestorIds?: string[];
}
