import { ReactElement } from "react";
import { Container } from "./styles";

type LabelProps = {
  htmlFor: string;
  className?: string;
  labelText: string;
  isRequired?: boolean;
};

export const Label = ({
  htmlFor,
  className,
  labelText,
  isRequired,
}: LabelProps): ReactElement => {
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
