import { Link, Outlet } from "react-router-dom";
import NewNavBar from "../../components/NewNavBar";
import { UserButton } from "@clerk/clerk-react";

const Layout = () => {
  return (
    <div className="md:grid grid-cols-12 min-h-screen min-w-full">
      <NewNavBar />
      <div className="col-span-3  border-r-2 hidden  bg-slate-100 md:flex justify-between flex-col">
        <ul className="text-slate-900 ml-4">
          <li className="text-2xl flex gap-4 mb-8 mt-8">
            <h2 className="text-md mt-8 tracking-tight leading-tight">
              FinanceFalcon
            </h2>
          </li>
          <li className="mb-8">
            <Link to="/dashboard">Overview</Link>
          </li>
          <li className="mb-8">
            <Link to="/dashboard/transactions">Transactions</Link>
          </li>
          <li className="mb-8">
            <Link to="/dashboard/calendar">Calendar</Link>
          </li>
        </ul>
        <div className="mb-10 pl-4">
          <UserButton />
        </div>
      </div>

      <div className="col-span-9 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
