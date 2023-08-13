// @ts-ignore
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen, act } from "@testing-library/react";
import { TOCData } from "../shared/interfaces/tableOfContents.ts";
import { TableOfContentsProvider } from "../shared/context/TableOfContentsProvider";
import TableOfContents from "../pages/ContentPage/components/TableOfContents";

const mockData: TOCData = {
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

describe("TableOfContents", () => {
  it("renders without errors", () => {
    render(
      <TableOfContentsProvider data={mockData}>
        <TableOfContents />
      </TableOfContentsProvider>,
      { wrapper: BrowserRouter },
    );
  });

  it("displays top-level items correctly", () => {
    render(
      <TableOfContentsProvider data={mockData}>
        <TableOfContents />
      </TableOfContentsProvider>,
      { wrapper: BrowserRouter },
    );

    expect(screen.getByText("Getting started")).toBeInTheDocument();
    expect(screen.getByText("Groovy")).toBeInTheDocument();
  });

  it("displays second level items correctly", () => {
    render(
      <TableOfContentsProvider data={mockData}>
        <TableOfContents />
      </TableOfContentsProvider>,
      { wrapper: BrowserRouter },
    );

    act(() => {
      screen.getByText("Getting started").click();
    });

    expect(screen.getByText("Accessibility")).toBeInTheDocument();
  });

  it("has active class after click", () => {
    render(
      <TableOfContentsProvider data={mockData}>
        <TableOfContents />
      </TableOfContentsProvider>,
      { wrapper: BrowserRouter },
    );

    act(() => {
      screen.getByText("Getting started").click();
    });

    const link = screen.getByText("Getting started");

    expect(link).toHaveClass("active");
    expect(screen.getByText("Accessibility")).toBeInTheDocument();
  });
});
