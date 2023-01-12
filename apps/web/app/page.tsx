import Image from "next/image";
import { Roboto } from "@next/font/google";
import Welcome from "./components/landing/Welcome";
const roboto = Roboto({
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  return (
    <main className="flex flex-col flew-grow main">
      <div className="flex flex-col flex-grow snap-y snap-mandatory">
        <Welcome />
      </div>
    </main>
  );
}
