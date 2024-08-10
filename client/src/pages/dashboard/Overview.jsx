import Transactions from "./transactions/Transactions";
import NewIncome from "../../components/NewIncome";
import Summary from "../../components/Summary";

import PieChartComponent from "../../components/PieChart";

import BarChartComponent from "../../components/BarChart";
import CalendarWithTodos from "./calendar/Calendar";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 mt-12 gap-6 min-w-full ">
      <div className=" flex justify-around col-span-12 mb-10 xl:col-span-3 xl:flex xl:flex-col xl:items-center">
        <NewIncome
          label="+"
          text="Income"
          color="bg-green-600"
          isExpense={false}
        />

        <NewIncome
          label="-"
          text="Expenses"
          color="bg-red-600"
          isExpense={true}
        />
      </div>
      <Summary />
      <PieChartComponent monthOffset={0} /> {/* Current Month */}
      <PieChartComponent monthOffset={1} /> {/* Last Month */}
      <BarChartComponent dateOffset={0} />
      <div className="hidden md:block md:col-span-12 lg:col-span-6 ">
        <CalendarWithTodos />
      </div>
    </div>
  );
};

export default Dashboard;
