import { ReactElement } from "react";
import { Container } from "./styles";

export const Button = ({ type, children, onClick }): ReactElement => {
  return (
    <Container type={type} onClick={onClick}>
      {children}
    </Container>
  );
};
