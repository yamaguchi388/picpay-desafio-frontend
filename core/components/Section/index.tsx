import { ReactElement } from "react";
import { Container } from "./styles";

export const Section = ({ children, area }): ReactElement => {
  return <Container area={area}>{children}</Container>;
};
