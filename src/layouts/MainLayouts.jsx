import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">{children}</main>
      </div>
    </>
  );
};

export default MainLayout;
