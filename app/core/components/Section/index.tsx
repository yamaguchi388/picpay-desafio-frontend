import { ReactElement } from "react";
import { Container } from "./styles";
import { ISectionProps } from "./types";

export const Section = ({
  children,
  area,
  width = 100,
  hasBackground = false,
}: ISectionProps): ReactElement => (
  <Container
    role="alert"
    area={area}
    $width={width}
    hasBackground={hasBackground}
  >
    {children}
  </Container>
);
