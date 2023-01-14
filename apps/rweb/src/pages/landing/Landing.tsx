import AboutUs from "./components/aboutus";
import Capabilities from "./components/capabilities";
import Footer from "./components/footer";
import ForDevelopers from "./components/for-developers";
import GettingStarted from "./components/getting-started";
import Header from "./components/header";
import Welcome from "./components/welcome";

const Landing = () => {
  return (
    <div className="text-white w-full min-w-full bg-[#121212]">
      <Header />
      <main className="flex flex-col flew-grow main">
        <div className="flex flex-col flex-grow snap-y snap-mandatory">
          <Welcome />
          <AboutUs />
          <Capabilities />
          <ForDevelopers />
          <GettingStarted />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
