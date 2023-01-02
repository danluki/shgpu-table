import React from "react";
import { Flex, Text } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons";
import { AdvertisingDto } from "@/services/api/dtos/dtos";

type Props = {
  advertising: AdvertisingDto;
};

const Advertising = ({ advertising }: Props) => {
  return (
    <Flex justify="space-between">
      <Text>{advertising.text.slice(0, 30) + "..."}</Text>
      <Flex>
        <IconEdit size={18} />
        <IconTrash size={18} />
      </Flex>
    </Flex>
  );
};

export default Advertising;
