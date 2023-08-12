import { useState, useEffect } from "react";
import { fetchTableOfContentsData } from "../api";
import { TOCData } from "../interfaces/tableOfContents.ts";

interface FetchFetchTocDataResult {
  tocData: TOCData | null;
  isLoading: boolean;
  error: string | null;
}

export const useFetchTocData = (): FetchFetchTocDataResult => {
  const [tocData, setTocData] = useState<TOCData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /** Fetching product groups */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTableOfContentsData();
        setIsLoading(false);
        setTocData(data);
      } catch (error: any) {
        // Handle the error
        console.error(
          "Error occurred while fetching table of contents data:",
          error,
        );
        setError(error?.message as string);
      }
    };

    fetchData();
  }, []);

  return { tocData, isLoading, error };
};
