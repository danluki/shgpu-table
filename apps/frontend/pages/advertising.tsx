import { useFaculties } from "@/services/api/faculties";
import { fetcher } from "@/services/api/fetchWrappers";
import { Flex, MultiSelect, SelectItem, SelectItem, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { Faculty } from "../../../libs/shared/src";

type AddAdvertisingDto = {
  text: string;
  faculties: number[];
  adminId: number;
  totalCount: number;
  sendDate: Date;
};

type Props = {
  faculties: SelectItem[];
}

const Advertising = ({faculties}: Props) => {
  const form = useForm({
    initialValues: {
      text: "",
      faculties: [],
      adminId: 0,
      totalCount: 0,
      sendDate: Date.now(),
    }
  })
  const onSubmit = (values: AddAdvertisingDto) => {

  }
  return <Flex justify="flex-start" align="center" direction="column" wrap="wrap">
    <form>
      <Textarea placeholder="Введите ваше сообщение" label="Сообщение для пользователей" withAsterisk />
      <MultiSelect data={faculties} label="Выберите факультеты"/>
    </form>
  </Flex>;
};

export async function getServerSideProps() {
  const faculties = await fetcher<Faculty[]>("/v1/faculties")
  const preparedFaculties: SelectItem[] = [];

  faculties.forEach((faculty: Faculty) => {
      preparedFaculties.push({
        value: `${faculty.id}`,
        lable: faculty.name
      })
  })

  return {props: {faculties: preparedFaculties}}
}

export default Advertising;
