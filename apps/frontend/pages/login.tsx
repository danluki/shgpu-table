import { useHotkeys, useLocalStorage, useMediaQuery } from "@mantine/hooks";
import React from "react";
import {
  ColorScheme,
  useMantineTheme,
  Flex,
  Box,
  TextInput,
  Container,
  Center,
  PasswordInput,
  Group,
  Button,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
const Login = () => {
  const theme = useMantineTheme();
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "theme",
    getInitialValueInEffect: true,
  });
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  const largeScreen = useMediaQuery("(min-width: 250px)");

  const form = useForm({
    initialValues: {
      login: "",
      pass: "",
    },
  });
  return (
    <Center style={{ width: "full", height: "100%" }}>
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <Text fz="xl" align="center">
            Вход в систему
          </Text>
          <TextInput
            withAsterisk
            label="Login"
            {...form.getInputProps("login")}
          />
          <PasswordInput
            withAsterisk
            label="Password"
            {...form.getInputProps("pass")}
          />
          <Group position="right" mt="md">
            <Button type="submit" bg="blue">
              Submit
            </Button>
          </Group>
        </form>
      </Box>
    </Center>
  );
};

export default Login;
