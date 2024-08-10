import { UserButton } from "@clerk/clerk-react";

import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navbar bg-base-100 md:hidden">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li className="mb-8">
              <Link to="/dashboard">Overview</Link>
            </li>
            <li className="mb-8">
              <Link to="/dashboard/transactions">Transactions</Link>
            </li>
            <li className="mb-8">
              <Link to="/dashboard/credit-card">Credit Cards</Link>
            </li>
            <li className="mb-8">
              <Link to="/dashboard/budgets">Budgets</Link>
            </li>
            <li className="mb-8">
              <Link to="/dashboard/calendar">Calendar</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="navbar-end">
        <UserButton />
      </div>
    </div>
  );
};

export default NavBar;
