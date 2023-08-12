import { EntitiesContext } from "shared/context/entities";
import { useFetchTocData } from "shared/hooks";
import LoadingPlaceholder from "../LoadingPlaceholder";
import TableOfContents from "../TableOfContents";

const Sidebar = () => {
  const { isLoading, error, tocData } = useFetchTocData();

  return (
    <>
      {isLoading ? (
        <LoadingPlaceholder />
      ) : (
        <EntitiesContext.Provider value={tocData?.entities}>
          <TableOfContents data={tocData} />
        </EntitiesContext.Provider>
      )}
    </>
  );
};

export default Sidebar;
