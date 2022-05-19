import styled from "styled-components";
import { BREAKPOINTS } from "../../../../core/constants";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.125rem;
  justify-content: center;
  align-items: flex-start;
  background-color: transparent;
  width: 100%;

  @media ${BREAKPOINTS.DESKTOP} {
    width: 20.37rem;
  }
`;
