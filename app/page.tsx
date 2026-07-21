import Sidebar from "@/components/layout/Sidebar";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Header from "@/components/layout/Header";
import MainContent from "@/components/layout/MainContent";
import MenuManager from "@/components/menu/MenuManager";

export default function HomePage() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC]">
      <Sidebar />

      <MainContent
        header={
          <>
            <Breadcrumb current="Menus" />

            <Header title="Menus" />
          </>
        }
      >
        <MenuManager />
      </MainContent>
    </div>
  );
}
