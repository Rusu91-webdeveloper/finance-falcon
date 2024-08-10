const Overview = () => {
  return (
    <div className="w-full h-full py-8 bg-white px-12 mx-auto">
      <div className="flex flex-col md:flex-row justify-center items-center gap-20">
        <div>
          <h2 className="text-2xl md:text-3xl text-slate-900 text-center mb-6 font-semibold">
            Overview
          </h2>
          <p className="text-slate-900 text-xl tracking-tight mb-6">
            Visualize the flow of your money at a glance with a fully
            customizable Overview page. Here you can find the balance of your
            last days together with the accounts, cards and budgets you use most
            frequently.
          </p>
          <img src="../../../public/overview2.png" alt="overview image" />
        </div>
      </div>
    </div>
  );
};

export default Overview;
