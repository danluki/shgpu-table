import { useGetAdminData } from "@/services/api/auth";
import { NextComponentType } from "next";
import { BaseContext } from "next/dist/shared/lib/utils";
import Login from "../../pages/login";

function withAuth(Component: any) {
  const Auth = () => {
    const data = useGetAdminData();
    if (data.isError) {
      return <Login />;
    }

    return <Component />;
  };

  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
}

export default withAuth;
