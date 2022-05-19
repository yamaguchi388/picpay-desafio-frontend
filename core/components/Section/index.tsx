import { ReactElement, ReactNode } from "react";
import { Container } from "./styles";

type SectionProps = {
  children: ReactNode;
  area?: string;
  width?: number;
  hasBackground?: boolean;
};

export const Section = ({
  children,
  area,
  width = 100,
  hasBackground = false,
}: SectionProps): ReactElement => {
  return (
    <Container area={area} $width={width} hasBackground={hasBackground}>
      {children}
    </Container>
  );
};
