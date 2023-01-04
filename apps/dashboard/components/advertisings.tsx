import {
  advertisingManager,
  useGetAdvertisings,
} from "@/services/api/advertising";
import { Flex, Loader } from "@mantine/core";
import React from "react";
import Advertising from "./advertising";

const Advertisings = () => {
  const { data, isLoading, isError } = useGetAdvertisings();
  console.log(data);
  return (
    <Flex direction="column" gap="20px" sx={{ maxWidth: 300 }} mx="auto">
      <h1>123</h1>
      {isLoading && <Loader />}
      {!isLoading &&
        data?.advertisings?.map((advertising) => (
          <Advertising advertising={advertising} key={advertising.id} />
        ))}
      {isError && !data && <h1>Ошибка получения!</h1>}
    </Flex>
  );
};

export default Advertisings;
