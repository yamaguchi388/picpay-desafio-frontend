import styled from "styled-components";

export const Container = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 2rem;
`;

export const ViewMoreButton = styled.button`
  cursor: pointer;
  padding: 1rem 2rem;
  font-weight: bold;
  color: var(--theme-primary);
  border-radius: 3px;
  transition: 0.3s ease all;
  &:hover {
    background-color: rgba(3, 138, 255, 0.1);
  }
`;
