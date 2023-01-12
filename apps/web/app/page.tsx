import { Roboto } from "@next/font/google";
import Welcome from "./components/landing/welcome";

const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  return (
    <>
      <Welcome />
    </>
  );
}
