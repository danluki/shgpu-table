import AddAdvertising from "./components/addadvertising";
import Advertisings from "./components/advertisings";

const Page = () => {
  return (
    <main className="">
      {" "}
      <div>
        <AddAdvertising faculties={[]} />
        <Advertisings />
      </div>
    </main>
  );
};

export default Page;
