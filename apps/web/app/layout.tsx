import "../global.css";
import Footer from "./components/layout/footer";
import Header from "./components/layout/header";
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
      <body className="text-white w-full min-w-full bg-[#121212]">
        <Header />
        <div className="flex flex-col flew-grow main">
          <div className="flex flex-col flex-grow snap-y snap-mandatory">
            {children}
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
