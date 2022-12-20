import React from "react";
import { Dispatch, SetStateAction } from "react";
import {
  Header,
  Grid,
  MediaQuery,
  Burger,
  ActionIcon,
  Text,
  ColorScheme,
  useMantineTheme,
  Flex,
  Group,
  Loader,
} from "@mantine/core";
import { useLocalStorage, useHotkeys, useMediaQuery } from "@mantine/hooks";
import { IconSun, IconMoonStars } from "react";

const NavBar = ({
  opened,
  setOpened,
}: {
  setOpened: Dispatch<SetStateAction<boolean>>;
  opened: boolean;
}) => {
  const theme = useMantineTheme();
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "theme",
    getInitialValueInEffect: true,
  });
  const largeScreen = useMediaQuery("(min-width: 250px)");
  return <div>NavBar</div>;
};

export default NavBar;
