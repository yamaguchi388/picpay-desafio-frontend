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

import { Edit, Close } from "@mui/icons-material";
import { currency } from "../../utils";
import { TasksData } from "../../models";

const columns: string[] = ["Usuário", "Título", "Data", "Valor", "Pago", ""];

type TableProps = {
  rows: TasksData[];
};

export const Table = ({ rows }: TableProps) => {
  return (
    <TableContainer aria-label="tabela de tarefas">
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <Th key={column}>{column}</Th>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <Td>{row.username}</Td>
            <Td>{row.title}</Td>
            <Td>{row.date}</Td>
            <Td>{currency(row.value)}</Td>
            <Td>
              <Checkbox checked={row.isPayed} readOnly />
            </Td>
            <Td isAlignRight>
              <Button onClick={() => null}>
                <Edit />
              </Button>
              <Button onClick={() => null}>
                <Close />
              </Button>
            </Td>
          </TableRow>
        ))}
      </TableBody>
    </TableContainer>
  );
};
