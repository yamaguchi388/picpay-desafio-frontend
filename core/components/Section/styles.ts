import styled from "styled-components";

export const Container = styled.section<{
  area: string | undefined;
  $width: number;
}>`
  grid-area: ${({ area }) => area};
  width: ${({ $width }) => `${$width}%`};
`;
