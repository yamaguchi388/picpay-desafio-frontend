import styled from "styled-components";

export const Container = styled.section<{ area: string }>`
  grid-area: ${({ area }) => area};
`;
