import Auth from "../../auth/Auth";

const Header = () => {
  return (
    <div className="w-screen   mx-auto py-8 bg-cyan-500">
      <div className="flex  w-full pt-20 px-4 text-slate-900 gap-6 justify-center">
        <div className="md:block  hidden ">
          <img
            className="rounded-full md:w-32 md:h-32 lg:w-60 lg:h-60"
            src="../../public/logo2.jpg"
            alt=""
          />
        </div>
        <div className="flex flex-col justify-center items-center ">
          <h1 className="text-2xl lg:text-5xl mb-6">FinanceFalcon</h1>
          <h2 className="text-xl lg:text-3xl mb-4">Expense Manager</h2>
          <h3 className="text-xl lg:text-xl ">
            Effortlessly Take Control of Your Finances: Track Money, Expenses,
            and Budgets with Ease
          </h3>
        </div>
      </div>
      <div className=" w-full  text-center mt-10 mx-auto">
        <button className="btn btn-md   lg:btn-lg text-slate-100">
          <Auth />
        </button>
      </div>
    </div>
  );
};

export default Header;
