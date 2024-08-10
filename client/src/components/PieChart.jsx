import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell } from "recharts";
import { useFinancialRecords } from "../context/financial-record-context";

export default function PieChartComponent({ monthOffset = 0 }) {
  // The live date
  const dateNow = new Date();
  let month = dateNow.getMonth() + 1; // getMonth() returns month from 0-11, so we add 1
  let year = dateNow.getFullYear();

  // Adjust the month and year based on the offset
  month -= monthOffset;
  if (month <= 0) {
    month += 12;
    year -= 1;
  }

  // Ensure single-digit month is padded with a leading zero
  const paddedMonth = month < 10 ? "0" + month : month;
  const paddedYear = year.toString();

  const { records } = useFinancialRecords();
  const income = records
    .filter(
      (record) =>
        record.amount > 0 &&
        record.date.slice(5, 7) === paddedMonth &&
        record.date.slice(0, 4) === paddedYear
    )
    .reduce((acc, val) => acc + val.amount, 0);

  const expenses = records
    .filter(
      (record) =>
        record.amount < 0 &&
        record.date.slice(5, 7) === paddedMonth &&
        record.date.slice(0, 4) === paddedYear
    )
    .reduce((acc, val) => acc + val.amount, 0);

  const chartConfig = {
    total: {
      label: "Total",
    },
    income: {
      label: "Income",
      color: "green",
    },
    expenses: {
      label: "Expenses",
      color: "red",
    },
  };

  const chartData = [
    {
      browser: "income",
      total: Math.abs(income),
      fill: "var(--color-income)",
    },
    {
      browser: "expenses",
      total: Math.abs(expenses),
      fill: "var(--color-expenses)",
    },
  ];

  return (
    <Card className="flex col-span-12 md:col-span-6 xl:col-span-3  max-h-56 rounded-xl mb-8">
      <CardHeader className="items-center pb-0">
        <CardTitle>{monthOffset === 0 ? "This Month" : "Last Month"}</CardTitle>
        <CardDescription className={"flex flex-col"}>
          <h2>
            <span className="text-green-500 font-bold">{income}</span>{" "}
          </h2>
          <h2>
            <span className="text-red-500 font-bold">{expenses}</span>
          </h2>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[180px] size-28 xl:size-28 2xl:size-44 "
        >
          <PieChart>
            <Pie data={chartData} dataKey="total">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="browser" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
