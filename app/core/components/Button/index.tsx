import { ReactElement } from "react";
import { Container } from "./styles";
import { IButtonProps } from "./types";

export const Button = (props: IButtonProps): ReactElement => {
  const { type, children, onClick, width, mt, mb, ml, mr, color } = props;

  return (
    <Container
      type={type}
      onClick={onClick}
      width={width}
      mt={mt}
      mb={mb}
      ml={ml}
      mr={mr}
      color={color}
    >
      {children}
    </Container>
  );
};
