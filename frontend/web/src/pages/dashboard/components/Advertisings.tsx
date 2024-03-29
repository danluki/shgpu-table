import { Flex } from "@mantine/core";
import {
  useAdvertisingsStore
} from "../../../stores/advertisingsStore";
const Advertisings = () => {
  const advertisings = useAdvertisingsStore((state) => state.advertisings)
  return (
    <Flex direction="column" gap="20px" sx={{ maxWidth: 300 }} mx="auto">
      {/* <h1>123</h1>
      {isLoading && <Loader />}
      {!isLoading &&
        data?.advertisings?.map((advertising) => (
          <Advertising advertising={advertising} key={advertising.id} />
        ))}
      {isError && !data && <h1>Ошибка получения!</h1>} */}
    </Flex>
  );
};

export default Advertisings;
