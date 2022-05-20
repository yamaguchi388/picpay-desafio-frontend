/* eslint-disable react-hooks/exhaustive-deps */
import router from "next/router";
import { ComponentType, useEffect } from "react";
import { getLoggedUser } from "../../utils";

export const withAuth = () => (Component: ComponentType) => {
  const WithAuth = (props: JSX.IntrinsicAttributes) => {
    const loggedUser = getLoggedUser();

    const hasSession = Boolean(loggedUser!.token);

    useEffect(() => {
      if (!hasSession) {
        router.push("/");
      }
    }, []);

    return hasSession && <Component {...props} />;
  };

  WithAuth.displayName = Component.displayName;

  return WithAuth;
};
