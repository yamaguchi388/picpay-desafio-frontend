import { ReactElement, ReactNode } from "react";
import { Container } from "./styles";

type SectionProps = {
  children: ReactNode;
  area?: string;
  width?: number;
};

export const Section = ({
  children,
  area,
  width = 100,
}: SectionProps): ReactElement => {
  return (
    <Container area={area} $width={width}>
      {children}
    </Container>
  );
};
