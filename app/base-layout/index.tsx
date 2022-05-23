import { Typography } from "@mui/material";
import { ReactElement, ReactNode } from "react";
import { ProtectedHeader } from "./protected-header";
import { Main, Content } from "./styles";

type BaseLayoutProps = {
  children: ReactNode;
  title: string;
};
export const BaseLayout = ({
  children,
  title,
}: BaseLayoutProps): ReactElement => {
  return (
    <>
      <ProtectedHeader />
      <Main>
        <Typography component="h1" variant="h3">
          {title}
        </Typography>
        <Content>{children}</Content>
      </Main>
    </>
  );
};
