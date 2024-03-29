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
  Avatar,
  Button,
} from "@mantine/core";
import { useLocalStorage, useHotkeys, useMediaQuery } from "@mantine/hooks";
import { IconSun, IconMoonStars } from "@tabler/icons";
import { useAdminStore } from "../../stores/adminStore";
import { useLocation, useNavigate } from "react-router-dom";
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
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  const largeScreen = useMediaQuery("(min-width: 250px)");

  const adminStore = useAdminStore();

  const onLogoutClick = () => {
    adminStore.logout();
  };

  const navigate = useNavigate();
  const onLoginClick = () => {
    navigate("/dashboard/login");
  };

  const location = useLocation();

  return (
    <Header height={{ base: 50, md: 50 }} p="md">
      <Grid justify="space-between" align="center">
        <Flex gap="sm" justify="flex-start" align="center" direction="row">
          <MediaQuery
            largerThan="sm"
            styles={{ display: "none" }}
            aria-label="Open navigatio"
          >
            <Burger
              opened={opened}
              onClick={() => setOpened(!opened)}
              size="sm"
              color={theme.colors.gray[6]}
              mr="xl"
            />
          </MediaQuery>
          <Text hidden={!largeScreen}>Расписание ШГПУ</Text>
        </Flex>
        <Group position="center">
          <ActionIcon
            variant="subtle"
            color={theme.colorScheme === "dark" ? "yellow" : "blue"}
            onClick={() => toggleColorScheme()}
            title="Toggle color schema"
          >
            {theme.colorScheme === "dark" ? (
              <IconSun size={18} />
            ) : (
              <IconMoonStars size={18} />
            )}
          </ActionIcon>

          {adminStore.isAuth && adminStore.admin && (
            <>
              <Avatar src={null} alt={adminStore.admin.name} />
              <Button onClick={onLogoutClick}>Выйти</Button>
            </>
          )}
          {!adminStore.isAuth &&
            !adminStore.admin &&
            location.pathname !== "/dashboard/login" && (
              <Button onClick={onLoginClick}>Войти</Button>
            )}
        </Group>
      </Grid>
    </Header>
  );
};

export default NavBar;
