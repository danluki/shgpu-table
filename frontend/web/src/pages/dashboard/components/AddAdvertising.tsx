import {
  Box,
  Button,
  Flex,
  MultiSelect,
  NumberInput,
  SelectItem,
  Textarea,
} from "@mantine/core";
import {addHours, addMinutes} from "date-fns";
import { useForm } from "@mantine/form";
import { DatePicker, TimeInput } from "@mantine/dates";
import { IconCheck, IconX } from '@tabler/icons';
import { showNotification } from "@mantine/notifications";
import {
  useAdvertisingsStore
} from "../../../stores/advertisingsStore";
import {useAdminStore} from "../../../stores/adminStore";
import {IconClock, IconCalendarEvent} from "@tabler/icons";

type Props = {
  faculties: SelectItem[];
};

const AddAdvertising = ({ faculties }: Props) => {
  const selectedAdvertising = useAdvertisingsStore((state) => state.selectedAdvertising)
  const advertisingStore = useAdvertisingsStore((state) => state)
  const form = useForm({
    initialValues: {
      text: "",
      faculties: [],
      totalCount: 1,
      sendDate: new Date(),
      sendTime: addHours(new Date(), 1),
    },
  });

  const onSubmit = (values: any) => {
    if (values.text.length < 10) {
      showNotification({
        title: "Ошибка заполнения формы",
        message: (
            <div>
              Текст должен быть больше 10 символов
            </div>
        ),
        icon: <IconX/>,
        color: "red"
      });
    }
    const hours = values.sendTime.getHours()
    const minutes = values.sendTime.getMinutes()
    const date = addMinutes(addHours(values.sendDate, hours), minutes)

    const dataToSend = {
      text: values.text,
      faculties: values.faculties.map((fac: string) => parseInt(fac)),
      totalCount: parseInt(values.totalCount),
      sendDate: date,
    };
    console.log(dataToSend)
    advertisingStore.postAdvertising(dataToSend)
  };
  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Flex direction="column" gap="20px" sx={{ maxWidth: 320 }} mx="auto">
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
            withAsterisk
            icon={<IconCalendarEvent size={16}/>}
            placeholder="Event date"
            minDate={new Date()}
            locale="ru"
          {...form.getInputProps("sendDate")}
          label="Выберите дату показа, не указывайте, чтобы использовать только количетсво раз"
        />
        <TimeInput
            withAsterisk
          label="Укажите время показа сообщения по UTC+5"
          icon={<IconClock size={16} />}
          {...form.getInputProps("sendTime")}
          clearable
        />
        <NumberInput
            withAsterisk
          {...form.getInputProps("totalCount")}
          defaultValue={1}
          min={1}
          label="Введите количество повторений"
        />
        <Button type="submit">Отправить</Button>
      </Flex>
    </form>
  );
};
export default AddAdvertising;
