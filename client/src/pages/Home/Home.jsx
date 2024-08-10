import Header from "./Header";
import Overview from "./Overview";
import Transactions from "./Transactions";

const Home = () => {
  return (
    <div className="min-w-screen">
      <Header />
      <Overview />

      <Transactions />
    </div>
  );
};

export default Home;
