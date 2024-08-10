import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, CartesianGrid, XAxis, Bar } from "recharts";
import { useFinancialRecords } from "../context/financial-record-context";
import { useMemo } from "react";

// Utility function to get the last 7 days
const getLast7Days = () => {
  const days = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    days.push(date);
  }
  return days.reverse(); // So that the most recent date is last
};

// Utility function to format a date as YYYY-MM-DD
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export default function BarChartComponent() {
  const { records } = useFinancialRecords();
  const last7Days = useMemo(() => getLast7Days(), []);

  // Create the chart data
  const chartData = useMemo(() => {
    // Initialize an object with dates as keys
    const data = last7Days.map((date) => ({
      day: date.toLocaleDateString("en-US", { weekday: "long" }),
      date: formatDate(date),
      income: 0,
      expenses: 0,
    }));

    // Aggregate the income and expenses for each day
    records.forEach((record) => {
      const recordDate = formatDate(new Date(record.date));
      const dayData = data.find((d) => d.date === recordDate);
      if (dayData) {
        if (record.amount > 0) {
          dayData.income += record.amount;
        } else {
          dayData.expenses += Math.abs(record.amount);
        }
      }
    });

    return data;
  }, [records, last7Days]);

  const chartConfig = {
    income: {
      label: "Income",
      color: "green",
    },
    expenses: {
      label: "Expenses",
      color: "red",
    },
  };

  return (
    <Card className="2xl:col-span-6 xl:mt-12 md:mt-0 md:col-span-6">
      <CardHeader>
        <CardTitle>Last 7 Days</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="income" fill="var(--color-income)" radius={4} />
            <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Showing financial data for the last 7 days
        </div>
      </CardFooter>
    </Card>
  );
}

function TrendingUpIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
