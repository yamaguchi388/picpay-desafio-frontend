import styled from "styled-components";
import { Section as BaseSection } from "../../../../core/components";
import { BREAKPOINTS } from "../../../../core/constants";

export const Section = styled(BaseSection)`
  display: none;
  width: 50%;
  height: 50%;
  margin: auto;
  @media ${BREAKPOINTS.DESKTOP} {
    display: block;
  }
`;
