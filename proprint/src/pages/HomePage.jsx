import Navbar from "../components/Home/Navbar";
import MainPage from "../components/Home/MainPage";
import Footer from "../components/Home/Footer";

const HomePage = () => {
  return (
    <div className="bg-[#F3F4F6]">
      <div>
        <Navbar />
      </div>
      <div>
        <MainPage />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
