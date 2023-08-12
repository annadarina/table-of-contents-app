import { TOCData } from "../interfaces/tableOfContents.ts";

/**
 * Fetch table of contents data
 */
export const fetchTableOfContentsData = async (): Promise<TOCData> => {
  const response = await fetch("/api/table-of-contents");
  if (!response.ok) {
    throw new Error("An error occurred while fetching data");
  }
  return await response.json();
};
