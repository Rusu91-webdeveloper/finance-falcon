const Transactions = () => {
  return (
    <div className="flex flex-col gap-8 md:flex-row  justify-center items-center bg-white py-8 px-8">
      <div className="text-black">
        <h2 className="text-2xl mb-6 text-center">Transactions</h2>
        <p className="text-lg tracking-tight mb-6">
          Manage your daily expenses as you wish. You can create unlimited
          categories and subcategories to track them better. Scheduled
          transactions and transaction templates will help you to speed up the
          insertion of new transactions
        </p>
        <img src="../../../public/transactions2.png" alt="transactions" />
      </div>
    </div>
  );
};

export default Transactions;
