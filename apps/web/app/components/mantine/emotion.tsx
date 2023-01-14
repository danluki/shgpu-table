"use client";

import { CacheProvider } from "@emotion/react";
import {
  useEmotionCache,
  MantineProvider,
  ColorScheme,
  useMantineTheme,
  ColorSchemeProvider,
  AppShell,
} from "@mantine/core";
import { useColorScheme, useHotkeys, useLocalStorage } from "@mantine/hooks";
import { QueryClientProvider } from "@tanstack/react-query";
import { useServerInsertedHTML } from "next/navigation";
import { useState } from "react";
import { queryClient } from "../../services/api/queryClient";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import NavBar from "../../dashboard/components/layout/navbar";

export default function RootStyleRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const cache = useEmotionCache();
  cache.compat = true;

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

  useServerInsertedHTML(() => (
    <style
      data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(" ")}`}
      dangerouslySetInnerHTML={{
        __html: Object.values(cache.inserted).join(" "),
      }}
    />
  ));

  return (
    <CacheProvider value={cache}>
      <QueryClientProvider client={queryClient}>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{ colorScheme }}
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
                header={<NavBar setOpened={setOpened} opened={opened} />}
              >
                {children}
              </AppShell>
            </ModalsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </QueryClientProvider>
    </CacheProvider>
  );
}
