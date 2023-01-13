// import { Roboto } from "@next/font/google";
import AboutUs from "./components/landing/aboutus";
import Capabilities from "./components/landing/capabilities";
import ForDevelopers from "./components/landing/for-developers";
import GettingStarted from "./components/landing/getting-started";
import Welcome from "./components/landing/welcome";

// const roboto = Roboto({
// subsets: ["latin"],
// weight: "400",
// });

export default function Home() {
  return (
    <>
      <Welcome />
      <AboutUs />
      <Capabilities />
      <ForDevelopers />
      <GettingStarted />
    </>
  );
}
