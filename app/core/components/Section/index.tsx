import { ReactElement } from "react";
import { Container } from "./styles";
import { ISectionProps } from "./types";

export const Section = (props: ISectionProps): ReactElement => {
  const { children, area, width = 100, hasBackground = false } = props;
  return (
    <Container area={area} $width={width} hasBackground={hasBackground}>
      {children}
    </Container>
  );
};
