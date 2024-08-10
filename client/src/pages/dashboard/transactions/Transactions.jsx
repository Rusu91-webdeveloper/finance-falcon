import { useState } from "react";
import { useFinancialRecords } from "../../../context/financial-record-context";
import { LiaEditSolid } from "react-icons/lia";
import { TiDeleteOutline } from "react-icons/ti";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import FinancialRecordForm from "../../../components/FinancialRecordForm";

import car from "../../../assets/car.svg";
import house from "../../../assets/house.svg";
import rent from "../../../assets/rent.svg";
import food from "../../../assets/food.svg";
import utilities from "../../../assets/utilities.svg";
import salary from "../../../assets/salary.svg";
import entertainment from "../../../assets/entertainment.svg";
import coffe from "../../../assets/coffe.svg";
import clothing from "../../../assets/clothing.svg";
import restaurant from "../../../assets/restaurant.svg";

const Transactions = () => {
  const { deleteRecord, records } = useFinancialRecords();
  const [editingRecord, setEditingRecord] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleEditClick = (record) => {
    setEditingRecord(record);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (id) => {
    deleteRecord(id);
  };

  const handleCloseForm = () => {
    setEditingRecord(null);
    setIsFormOpen(false);
  };

  const total = records.reduce((acc, val) => acc + Number(val.amount), 0);

  return (
    <div
      className={`flex justify-between p-6 border border-2  col-span-12 min-w-full  text-sm md:text-lg 2xl:col-span-6`}
    >
      <div>
        <h2 className="mb-8">Transactions: {records.length}</h2>
        {records.map((record) => (
          <div key={record._id}>
            <div className="mb-8 flex gap-4">
              <div className="">
                <img
                  className="size-12 rounded-full"
                  src={`/src/assets/${
                    record.category === "Other"
                      ? record.description
                      : record.category.toLowerCase()
                  }.svg`}
                  alt={`${record.category} svg image`}
                />
              </div>
              <div>
                <h3>{record.description} </h3>
                <h3 className="text-sm md:text-md">{record.paymentMethod}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <h2 className="mb-10">
          Total:
          <span
            className={`${
              total.toFixed(2) > 0 ? "text-green-500" : "text-red-600"
            }`}
          >
            {total.toFixed(2)} €
          </span>
        </h2>

        {records.map((record) => {
          const recordDate = new Date(record.date);
          const day = recordDate.getDate();
          const month = recordDate.getMonth() + 1;
          const year = recordDate.getFullYear();
          const formattedDate = `${day.toString().padStart(2, "0")}/${month
            .toString()
            .padStart(2, "0")}/${year}`;
          return (
            <div className="flex" key={record._id}>
              <div className="mb-2">
                <h3>{record.amount}€</h3>
                <h3 className="text-sm ">{formattedDate}</h3>
              </div>
              <div className="h-full p-4">
                <LiaEditSolid
                  className="size-6 cursor-pointer mb-2"
                  onClick={() => handleEditClick(record)}
                />
                <TiDeleteOutline
                  className="size-6 cursor-pointer"
                  onClick={() => handleDeleteClick(record._id)}
                />
              </div>
              <div
                className={`border-r-8 h-10 mt-6 ${
                  record.amount > 0 ? "border-green-600" : "border-red-600"
                }`}
              ></div>
            </div>
          );
        })}
      </div>

      <Transition appear show={isFormOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleCloseForm}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <FinancialRecordForm
                    isExpense={editingRecord?.amount < 0}
                    initialValues={editingRecord}
                    onClose={handleCloseForm}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Transactions;
