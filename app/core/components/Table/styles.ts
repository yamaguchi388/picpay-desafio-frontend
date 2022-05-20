import styled from "styled-components";

export const TableContainer = styled.table`
  text-align: left;
  border-collapse: collapse;
  & > thead > tr {
    border-bottom: 1px solid rgba(0, 8, 38, 0.16);
    border-top: none;
  }
  background-color: #fff;
  width: 100%;
  border-radius: 0.5rem;
  box-shadow: 0px 2px 4px rgba(4, 38, 82, 0.06);
`;

export const TableHead = styled.thead``;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f5f8fa;
  }
  height: 5rem;
`;

export const Th = styled.th`
  vertical-align: middle;
  padding: 1.5rem;
`;

export const Td = styled.td<{ isAlignRight?: boolean }>`
  vertical-align: middle;
  text-align: ${({ isAlignRight }) => isAlignRight && "right"};
  padding: 1.5rem;
`;

export const TableBody = styled.tbody``;

export const Button = styled.button`
  all: unset;
  padding: 1rem;
  cursor: pointer;
`;
