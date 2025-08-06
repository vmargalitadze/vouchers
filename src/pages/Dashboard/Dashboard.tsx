
import DashboardTop from "./components/DashboardTop";
import Favorites from "./components/Favorites";
import MiddleTopCards from "./components/MiddleTopCards";

export default function Dashboard() {
  return (
    <div className="theme-bg min-h-screen">
      <div className="mt-14 theme-bg">

      <DashboardTop />
      <MiddleTopCards />
      <Favorites />
      </div>
    </div>
  );
}
