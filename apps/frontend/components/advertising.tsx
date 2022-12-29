import "dayjs/locale/ru";
import {
  Box,
  Flex,
  MultiSelect,
  NumberInput,
  SelectItem,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { DatePicker, TimeInput } from "@mantine/dates";
import React from "react";
import { IconClock } from "@tabler/icons";

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
      sendTime: Date.now(),
    },
  });
  const onSubmit = (values: AddAdvertisingDto) => {};
  return (
    <form>
      <Flex direction="column" gap="20px" sx={{ maxWidth: 300 }} mx="auto">
        <Textarea
          placeholder="Введите ваше сообщение"
          label="Сообщение для пользователей"
          {...form.getInputProps("text")}
        />
        <MultiSelect
          data={faculties}
          label="Выберите факультеты"
          {...form.getInputProps("faculties")}
        />
        <DatePicker
          {...form.getInputProps("sendDate")}
          label="Выберите дату показа, не указывайте, чтобы использовать только количетсво раз"
        />
        <TimeInput
          label="Укажите время показа сообщения по UTC+5"
          {...form.getInputProps("sendTime")}
          clearable
        />
        <NumberInput
          {...form.getInputProps("totalCount")}
          defaultValue={1}
          label="Введите количество повторений"
        />
      </Flex>
    </form>
  );
};

export default Advertising;
