import { useUser } from "@clerk/clerk-react";
import { useFinancialRecords } from "../context/financial-record-context";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const FinancialRecordForm = ({ isExpense, initialValues, onClose }) => {
  const { addRecord, updateRecord } = useFinancialRecords();

  const [description, setDescription] = useState(
    initialValues?.description || ""
  );
  const [amount, setAmount] = useState(initialValues?.amount || "");
  const [category, setCategory] = useState(initialValues?.category || "");
  const [paymentMethod, setPaymentMethod] = useState(
    initialValues?.paymentMethod || ""
  );

  const { user } = useUser();

  useEffect(() => {
    setAmount(initialValues?.amount || "");
  }, [isExpense, initialValues]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const finalAmount = isExpense
      ? -Math.abs(parseFloat(amount))
      : Math.abs(parseFloat(amount));
    const newRecord = {
      userId: user?.id ?? "",
      date: new Date(),
      description: description,
      amount: finalAmount,
      category: category,
      paymentMethod: paymentMethod,
    };

    if (initialValues) {
      updateRecord(initialValues._id, newRecord);
    } else {
      addRecord(newRecord);
    }

    onClose();
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="mb-2">Description:</label>
          <input
            type="text"
            required
            className="border border-2 mb-4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2">Amount:</label>
          <input
            type="number"
            required
            className="border border-2 mb-4"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-4">Category:</label>
          <select
            required
            className="px-4 py-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a Category</option>
            <option value="Food">Food</option>
            <option value="Rent">Rent</option>
            <option value="Salary">Salary</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mt-4 mb-6">
          <label className="mb-2">Payment Method:</label>
          <select
            required
            className="px-6 py-2"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="">Select a Payment Method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Cash">Cash</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>
        <div className="flex justify-end">
          <Button type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Save changes</Button>
        </div>
      </form>
    </div>
  );
};

export default FinancialRecordForm;
