import { useFetchTOCData } from "../../../../shared/hooks";
import LoadingPlaceholder from "../LoadingPlaceholder";
import TableOfContents from "../TableOfContents";
import { TableOfContentsProvider } from "../../../../shared/context/TableOfContentsProvider";
import Placeholder from "../../../../shared/components/Placeholder";

const Sidebar = () => {
  const { isLoading, error, tocData } = useFetchTOCData();

  // Show loading placeholder when data is loading
  if (isLoading) {
    return <LoadingPlaceholder />;
  }

  // Show error placeholder for the error state
  if (error) {
    return (
      <Placeholder
        status="error"
        message="Error occured. Please try again later"
      />
    );
  }

  return (
    <>
      {tocData && tocData.topLevelIds.length ? (
        <TableOfContentsProvider data={tocData}>
          <TableOfContents />
        </TableOfContentsProvider>
      ) : (
        <Placeholder message="No Data Found" />
      )}
    </>
  );
};

export default Sidebar;
