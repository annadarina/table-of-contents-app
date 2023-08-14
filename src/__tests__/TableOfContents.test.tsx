// @ts-ignore
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen, act } from "@testing-library/react";
import { TableOfContentsProvider } from "../shared/context/TableOfContentsProvider";
import TableOfContents from "../pages/ContentPage/components/TableOfContents";
import { mockData } from "./mockData.ts";

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
