import styled, { css } from "styled-components";
import { BREAKPOINTS } from "../../constants";
import { ISectionPropsStyle } from "./types";

export const Container = styled.section<ISectionPropsStyle>`
  grid-area: ${({ area }) => area};
  width: ${({ $width }) => `${$width}%`};
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;

  @media ${BREAKPOINTS.DESKTOP} {
    ${({ hasBackground }) =>
      hasBackground &&
      css`
        background-color: var(--bg-grey);
      `};
    padding: 4rem;
    height: 100vh;
  }
`;
