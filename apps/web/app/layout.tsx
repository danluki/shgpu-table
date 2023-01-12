import "../global.css";
import RootStyleRegistry from "./components/mantine/emotion";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="bg-gray-100 dark:bg-zinc-900 transition-all duration-700">
        <Header />
        <RootStyleRegistry>{children}</RootStyleRegistry>
      </body>
    </html>
  );
}
