import AboutUs from "./components/AboutUs";
import Capabilities from "./components/Capabilities";
import ForDevelopers from "./components/ForDevelopers";
import GettingStarted from "./components/GettingStarted";
import Welcome from "./components/Welcome";

export default function Page() {
  return (
    <div>
      <Welcome />
      <AboutUs />
      <Capabilities />
      <ForDevelopers />
      <GettingStarted />
    </div>
  );
}
