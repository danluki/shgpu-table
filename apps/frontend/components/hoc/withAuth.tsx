import { NextComponentType } from "next";
import { BaseContext } from "next/dist/shared/lib/utils";
import Login from "../../pages/login";

function withAuth<T extends BaseContext>(Component: NextComponentType<T>) {
  const Auth = (props: T) => {
    const { isLoggedIn } = props;

    if (!isLoggedIn) {
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
