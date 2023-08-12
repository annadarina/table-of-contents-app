import ContentDetails from "./components/ContentDetails";
import Layout from "shared/components/Layout";
import Sidebar from "./components/Sidebar";

const ContentPage = () => {
  return (
    <Layout mainComponent={<ContentDetails />} sidebarComponent={<Sidebar />} />
  );
};

export default ContentPage;
