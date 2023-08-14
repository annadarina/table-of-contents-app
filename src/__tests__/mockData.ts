import { TOCData } from "../shared/interfaces/tableOfContents.ts";

export const mockData: TOCData = {
  entities: {
    pages: {
      Getting_started: {
        id: "Getting_started",
        title: "Getting started",
        url: "getting-started.html",
        parentId: "ij",
        level: 0,
        anchors: [],
        tabIndex: 0,
        pages: ["Accessibility"],
      },
      Groovy: {
        id: "Groovy",
        title: "Groovy",
        url: "groovy.html",
        parentId: "ij",
        level: 0,
        anchors: [],
        tabIndex: 15,
        pages: [],
      },
      Accessibility: {
        id: "Accessibility",
        title: "Accessibility",
        url: "accessibility.html",
        parentId: "Getting_started",
        level: 1,
        pages: [],
        tabIndex: 0,
        anchors: [],
      },
    },
  },
  topLevelIds: ["Getting_started", "Groovy"],
};
