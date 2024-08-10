import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";

const FinancialRecordContext = createContext(null);

export const RecordContextProvider = ({ children }) => {
  const [records, setRecords] = useState([]);
  const { user } = useUser();

  // ! FETCH (GET request) the Data from the endpoint filter By ClerkId and save it in records Array
  const fetchRecords = async () => {
    if (!user) return;
    const response = await fetch(
      `http://localhost:6004/financial-records/getAllByUserID/${user.id}`
    );
    if (response.ok) {
      const records = await response.json();

      setRecords(records);
    }
  };
  //
  useEffect(() => {
    fetchRecords();
  }, [user]);

  // ! addRecords is  adding (POST request) the Records to the MongoDb Database by updating the records
  const addRecord = async (record) => {
    const response = await fetch("http://localhost:6004/financial-records", {
      method: "POST",
      body: JSON.stringify(record),
      headers: {
        "Content-Type": "application/json",
      },
    });

    try {
      if (response.ok) {
        const newRecord = await response.json();
        setRecords((prev) => [...prev, newRecord]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ! It updates the record taking 2 parameters (The unique identifier of the record and newRecord - the new data for the record that will replace existing data)
  const updateRecord = async (id, newRecord) => {
    const response = await fetch(
      `http://localhost:6004/financial-records/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(newRecord),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    try {
      if (response.ok) {
        const newRecord = await response.json();
        setRecords((prev) =>
          prev.map((record) => {
            if (record._id === id) {
              return newRecord;
            } else {
              return record;
            }
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ! It delete the record with the specific id
  const deleteRecord = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:6004/financial-records/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const deletedRecord = await response.json();
        setRecords((prev) =>
          prev.filter((record) => record._id !== deletedRecord._id)
        );
      } else {
        const errorText = await response.text();
        console.error(`Error deleting record: ${errorText}`);
      }
    } catch (err) {
      console.error(`Fetch error: ${err}`);
    }
  };

  return (
    <FinancialRecordContext.Provider
      value={{ records, addRecord, updateRecord, deleteRecord }}
    >
      {children}
    </FinancialRecordContext.Provider>
  );
};

// ! CUSTOM HOOK
export const useFinancialRecords = () => {
  const context = useContext(FinancialRecordContext);

  if (!context) {
    throw new Error(
      "useFinancialRecords must be used within a FinancialRecordsProvider"
    );
  }
  return context;
};

export default FinancialRecordContext;
