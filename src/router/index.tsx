import { Route, Routes } from "react-router-dom";
import ContentPage from "../pages/ContentPage";
import ContentDetails from "../pages/ContentPage/components/ContentDetails";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<ContentPage />}>
        <Route path=":pageId" element={<ContentDetails />} />
      </Route>
    </Routes>
  );
};

export default Router;
