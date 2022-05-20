import styled from "styled-components";

export const Container = styled.header`
  display: flex;
  width: 100%;
  height: 5.62rem;
  position: fixed;
  top: 0;
  background-color: var(--theme-terciary);
  justify-content: space-between;
  align-items: center;
  padding: 0 1.8rem;
`;

export const ToggleButton = styled.button`
  all: unset;
  cursor: pointer;
`;

export const Button = styled.button`
  all: unset;
  cursor: pointer;
  transition: 0.2s ease all;
  &:hover {
    background-color: var(--bg-grey);
  }
`;
