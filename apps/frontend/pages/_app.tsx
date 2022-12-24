import {
  AppShell,
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  useMantineTheme,
} from "@mantine/core";
import { useColorScheme, useHotkeys, useLocalStorage } from "@mantine/hooks";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useState } from "react";
import { SWRConfig } from "swr";
import NavBar from "../components/layout/navbar";
import SideBar from "../components/layout/sidebar";

export default function App(props: AppProps) {
  const { Component } = props;

  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "theme",
    defaultValue: "dark",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Head>
        <title>Расписание ШГПУ</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{ colorScheme }}
          withGlobalStyles
          withNormalizeCSS
        >
          <NotificationsProvider>
            <SWRConfig
              value={{
                onError: (error, key) => {
                  console.log("here");
                  console.log(error, key);
                },
                // fetcher: swrAuthFetcher,
              }}
            >
              <ModalsProvider>
                <AppShell
                  styles={{
                    main: {
                      background:
                        colorScheme === "dark"
                          ? theme.colors.dark[8]
                          : theme.colors.gray[0],
                    },
                  }}
                  navbarOffsetBreakpoint="sm"
                  asideOffsetBreakpoint="sm"
                  navbar={<SideBar opened={opened} setOpened={ setOpened}/>}
                  header={<NavBar setOpened={setOpened} opened={opened} />}
                >
                  <Component
                    styles={{
                      main: {
                        background:
                          colorScheme === "dark"
                            ? theme.colors.dark[8]
                            : theme.colors.gray[0],
                      },
                    }}
                  />
                </AppShell>
              </ModalsProvider>
            </SWRConfig>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}
