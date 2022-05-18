import styled from "styled-components";
import { Section as BaseSection } from "../../../../core/components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.125rem;
  justify-content: center;
  align-items: flex-start;
  width: 20.37rem;
`;

export const H1 = styled.h1`
  font-weight: bold;
`;

export const InputContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Section = styled(BaseSection)`
  margin: auto;
`;
