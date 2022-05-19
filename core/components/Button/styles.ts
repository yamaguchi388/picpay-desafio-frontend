import styled, { keyframes } from "styled-components";

const show = keyframes`
from{
  opacity: 0;
}
to {
  opacity:1;
}
`;

export const Container = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: var(--theme-primary);
  border-radius: 3px;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: 0.2s ease all;
  animation: ${show} 1s forwards;
  &:hover {
    background-color: var(--theme-secondary);
  }
  &:active {
    opacity: 0.6;
  }
  &:focus {
    box-shadow: 0 0 0 4px rgba(0, 158, 227, 0.2);
  }

  &:focus,
  &:active {
    outline: none;
  }
`;
