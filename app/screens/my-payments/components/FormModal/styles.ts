import styled from "styled-components";
import { BREAKPOINTS } from "../../../../core/constants";

export const InputsContainer = styled.div<{ width?: number }>`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  gap: 2.5rem;
  flex-wrap: wrap;
  width: inherit;

  @media ${BREAKPOINTS.DESKTOP} {
    flex-wrap: nowrap;
    width: ${({ width }) => (width ? `${width}%` : "inherit")};
  }
`;

export const ButtonsContainer = styled.div`
  display: inline-flex;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
  gap: 2.5rem;
`;

export const Form = styled.form`
  display: flex;
  flex-flow: column wrap;
  gap: 2.5rem;
  width: 100%;
`;

export const InputContent = styled.div`
  width: 50%;
`;
