import { Checkbox } from "@mui/material";
import {
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
  Td,
  Th,
  Button,
} from "./styles";

import { Edit, HighlightOff } from "@mui/icons-material";
import { currency, formatDateBR } from "../../utils";
import { ITasksData } from "../../models";

const columns: string[] = ["Usuário", "Título", "Data", "Valor", "Pago", ""];

interface ITableProps {
  rows: ITasksData[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export const Table = ({ rows, onEdit, onDelete }: ITableProps) => {
  return (
    <TableContainer aria-label="tabela de tarefas">
      <TableHead>
        <TableRow>
          {columns.map((column, index) => (
            <Th key={index}>{column}</Th>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <Td>{row.username}</Td>
            <Td>{row.title}</Td>
            <Td>{formatDateBR(row.date)}</Td>
            <Td>{currency(row.value)}</Td>
            <Td>
              <Checkbox checked={row.isPayed} readOnly />
            </Td>
            <Td isAlignRight>
              <Button onClick={() => onEdit(row.id)} type="button">
                <Edit />
              </Button>
              <Button onClick={() => onDelete(row.id)} type="button">
                <HighlightOff />
              </Button>
            </Td>
          </TableRow>
        ))}
      </TableBody>
    </TableContainer>
  );
};
