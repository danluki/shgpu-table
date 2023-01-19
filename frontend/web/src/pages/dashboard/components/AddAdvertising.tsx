import {
  Box,
  Button,
  Flex,
  MultiSelect,
  NumberInput,
  SelectItem,
  Textarea,
} from "@mantine/core";
import { addHours } from "date-fns";
import { useForm } from "@mantine/form";
import { DatePicker, TimeInput } from "@mantine/dates";

type Props = {
  faculties: SelectItem[];
};

const AddAdvertising = ({ faculties }: Props) => {
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
  const onSubmit = (values: any) => {
    const dataToSend = {
      text: values.text,
      faculties: [],
      adminId: values.adminId,
      totalCount: values.totalCount,
      sendDate: new Date().toISOString(),
    };
    console.log(values.sendTime.toISOString());
    console.log(values);
  };
  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
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
          defaultValue={addHours(new Date(), 1)}
          label="Укажите время показа сообщения по UTC+5"
          {...form.getInputProps("sendTime")}
          clearable
        />
        <NumberInput
          {...form.getInputProps("totalCount")}
          defaultValue={1}
          label="Введите количество повторений"
        />
        <Button type="submit">Отправить</Button>
      </Flex>
    </form>
  );
};
export default AddAdvertising;
