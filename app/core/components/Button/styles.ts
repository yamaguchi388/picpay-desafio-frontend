import styled, { css, keyframes } from "styled-components";
import { BREAKPOINTS } from "../../constants";

const show = keyframes`
from{
  opacity: 0;
}
to {
  opacity:1;
}
`;

export const Container = styled.button<{
  width?: number;
  mt?: number;
  mb?: number;
  ml?: number;
  mr?: number;
  color?: "primary" | "secondary";
}>`
  width: 100%;

  padding: 1rem;
  ${({ mt }) =>
    mt &&
    css`
      margin-top: ${mt}rem;
    `}

  ${({ mb }) =>
    mb &&
    css`
      margin-bottom: ${mb}rem;
    `}
    ${({ ml }) =>
    ml &&
    css`
      margin-left: ${ml}rem;
    `}
    ${({ mr }) =>
    mr &&
    css`
      margin-right: ${mr}rem;
    `}
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
  @media ${BREAKPOINTS.DESKTOP} {
    width: ${({ width }) => `${width}rem`};
  }
  ${({ color }) =>
    color === "secondary" &&
    css`
      background-color: var(--bg-grey);
      color: #000;
      &:hover {
        background-color: rgba(0, 0, 0, 0.2);
      }
    `}
`;
