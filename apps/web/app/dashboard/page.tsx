import AddAdvertising from "./components/addadvertising";
import Advertisings from "./components/advertisings";
import { PublicFaculty } from "@shgpu-table/shared/src/models/parser";
import { SelectItem } from "@mantine/core";

async function getFaculties<T>() {
  const res = await fetch(`http://localhost:3002/v1/faculties`, {
    method: "GET",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json() as T;
}

const Page = async () => {
  const { faculties } = await getFaculties<{ faculties: PublicFaculty[] }>();

  const preparedFaculties: SelectItem[] = [];
  faculties.forEach((faculty: PublicFaculty) => {
    preparedFaculties.push({
      value: `${faculty.id}`,
      label: faculty.name,
    });
  });
  return (
    <main className="">
      <div>
        gsgs
        <AddAdvertising faculties={preparedFaculties} />
        <Advertisings />
      </div>
    </main>
  );
};

export default Page;
