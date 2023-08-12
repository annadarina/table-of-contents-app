import { useFetchTocData } from "shared/hooks";
import LoadingPlaceholder from "../LoadingPlaceholder";
import TableOfContents from "../TableOfContents";
import { TableOfContentsProvider } from "shared/context/TableOfContentsProvider";

const Sidebar = () => {
  const { isLoading, error, tocData } = useFetchTocData();

  return (
    <>
      {isLoading ? (
        <LoadingPlaceholder />
      ) : (
        <TableOfContentsProvider data={tocData}>
          <TableOfContents />
        </TableOfContentsProvider>
      )}
    </>
  );
};

export default Sidebar;
