import { useFinancialRecords } from "../context/financial-record-context";

const Summary = () => {
  const { records } = useFinancialRecords();

  const balance = records
    .filter((record) => record.amount > 0)
    .reduce((acc, val) => acc + val.amount, 0);

  const expenses = records
    .filter((record) => record.amount < 0)
    .reduce((acc, val) => acc + val.amount, 0);

  const total = records
    .map((record) => record.amount)
    .reduce((acc, val) => acc + val, 0);

  console.log(total);

  return (
    <div className="border border-gray-400 rounded-2xl p-4 max-h-56 col-span-12 md:col-span-6 xl:col-span-3 mb-8 w-full ">
      <div className="flex flex-col space-y-2">
        <h2 className="font-semibold">Summary</h2>
        <h3 className="flex justify-between">
          <span>Balance:</span>
          <span className="text-green-500">{balance}</span>
        </h3>
        <h3 className="flex justify-between border-b-2 mb-2 pb-2">
          <span>Credit Cards:</span>
          <span className="text-red-500">{expenses}</span>
        </h3>
        <h3 className="flex justify-center">
          <span className={`${total > 0 ? "text-green-500" : "text-red-500"}`}>
            {total}
          </span>
        </h3>
      </div>
    </div>
  );
};

export default Summary;
