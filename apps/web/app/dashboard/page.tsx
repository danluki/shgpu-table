import AddAdvertising from "./components/addadvertising";
import Advertisings from "./components/advertisings";
import { PublicFaculty } from "@shgpu-table/shared/src/models/parser";
import { SelectItem } from "@mantine/core";
import { $axios, $serverAxios } from "../services/api/axios";
import { FetcherError } from "../services/api/fetchWrappers";

async function getFaculties<T>() {
  const res = await $serverAxios<{ faculties: PublicFaculty[] }>({
    method: "GET",
    url: "/v1/faculties",
  });

  return res.data;
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
