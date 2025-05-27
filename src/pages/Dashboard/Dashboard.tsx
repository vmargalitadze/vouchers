
import DashboardTop from "./components/DashboardTop";
import Favorites from "./components/Favorites";
import MiddleTopCards from "./components/MiddleTopCards";

export default function Dashboard() {
  return (
    <div >
      <div className="mt-14">

      <DashboardTop />
      <MiddleTopCards />
      <Favorites />
      </div>
    </div>
  );
}
