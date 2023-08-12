import { createContext, useContext } from "react";
import { PageData } from "shared/interfaces/tableOfContents.ts";

type Entities = {
  pages: Record<string, PageData>;
};

export const EntitiesContext = createContext<Entities | undefined>(undefined);

export const useEntities = () => {
  const entities = useContext(EntitiesContext);

  if (!entities) {
    throw new Error("useEntities must be used within an EntitiesProvider");
  }

  return entities;
};
