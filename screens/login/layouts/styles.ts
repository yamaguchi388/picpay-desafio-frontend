import styled from "styled-components";
import { BREAKPOINTS } from "../../../core/constants";

export const FeaturedBannerLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  width: 100%;
  height: 100vh;

  @media ${BREAKPOINTS.DESKTOP} {
    padding: 0 6.68rem;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  @media ${BREAKPOINTS.DESKTOP} {
    display: grid;
    width: inherit;
    height: inherit;
    grid-template-areas: "login-form banner";
    justify-content: space-between;
    align-items: center;
  }
`;
