import { Flex, MultiSelect, SelectItem, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";

type AddAdvertisingDto = {
  text: string;
  faculties: number[];
  adminId: number;
  totalCount: number;
  sendDate: Date;
};

type Props = {
  faculties: SelectItem[];
};

const Advertising = ({ faculties }: Props) => {
  const form = useForm({
    initialValues: {
      text: "",
      faculties: [],
      adminId: 0,
      totalCount: 0,
      sendDate: Date.now(),
    },
  });
  const onSubmit = (values: AddAdvertisingDto) => {};
  return (
    <Flex justify="flex-start" align="center" direction="column" wrap="wrap">
      <form>
        <Textarea
          placeholder="Введите ваше сообщение"
          label="Сообщение для пользователей"
          {...form.getInputProps("text")}
          withAsterisk
        />
        <MultiSelect
          data={faculties}
          label="Выберите факультеты"
          {...form.getInputProps("faculties")}
        />
      </form>
    </Flex>
  );
};

export default Advertising;
