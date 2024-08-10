import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Layout from "./pages/dashboard/Layout";

import Overview from "./pages/dashboard/Overview";
import Transactions from "./pages/dashboard/transactions/Transactions";

import CalendarComponent from "./pages/dashboard/calendar/Calendar";

function App() {
  return (
    <div className=" mx-auto flex flex-col justify-center items-center ">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Overview />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="calendar" element={<CalendarComponent />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
