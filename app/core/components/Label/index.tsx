import { ReactElement } from "react";
import { Container } from "./styles";
import { IlabelProps } from "./types";

export const Label = ({
  htmlFor,
  className,
  labelText,
  isRequired,
}: IlabelProps): ReactElement => {
  return (
    <Container htmlFor={htmlFor} className={className}>
      {labelText}
      {isRequired && (
        <>
          <span aria-hidden="true">*</span>
        </>
      )}
    </Container>
  );
};
