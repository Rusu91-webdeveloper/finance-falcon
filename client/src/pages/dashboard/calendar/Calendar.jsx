import { Calendar } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { useFinancialRecords } from "../../../context/financial-record-context";

const CalendarWithTodos = () => {
  const { records } = useFinancialRecords();

  // Log records to ensure they are being fetched correctly
  console.log("Records:", records);

  // Extract day, month, and amount from each record
  const recordDayMonth = records.map((record) => {
    const date = new Date(record.date);
    return {
      day: date.getDate(),
      month: date.getMonth() + 1, // getMonth() is zero-based
      amount: record.amount,
    };
  });

  // Log the extracted day-month data
  console.log("Record Day Month:", recordDayMonth);

  // Create a dynamic schedule object to accumulate amounts
  const dynamicSchedule = {};
  recordDayMonth.forEach(({ day, month, amount }) => {
    const key = `${month}-${day}`;
    if (!dynamicSchedule[key]) {
      dynamicSchedule[key] = 0;
    }
    dynamicSchedule[key] += amount;
  });

  function getTodoList(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1; // getMonth() is zero-based
    const key = `${month}-${day}`;
    return dynamicSchedule[key] || 0;
  }

  function renderCell(date) {
    const totalAmount = getTodoList(date);

    if (totalAmount !== 0) {
      const color = totalAmount > 0 ? "green" : "red";
      return (
        <div className="calendar-todo-amount" style={{ color }}>
          {totalAmount}€
        </div>
      );
    }

    return null;
  }

  return (
    <Calendar
      className={"xl:col-span-6 md:col-span-12"}
      bordered
      renderCell={renderCell}
    />
  );
};

export default CalendarWithTodos;
