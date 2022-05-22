import { Checkbox } from "@mui/material";
import {
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
  Td,
  Th,
  Button,
  ActionsContainer,
  UsernameContent,
} from "./styles";

import { Edit, HighlightOff } from "@mui/icons-material";
import { currency, formatDateBR } from "../../utils";
import { ITasksData } from "../../models";
import { Pagination } from "./Pagination";
import { InputSearch } from "./InputSearch";
import { useForm } from "react-hook-form";
import { useTasksEffects } from "../../../providers/tasks";

const columns: string[] = ["Usuário", "Título", "Data", "Valor", "Pago", ""];

interface ITableProps {
  rows: ITasksData[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  page: number;
}

export const Table = ({ rows, onEdit, onDelete }: ITableProps) => {
  const { control, watch } = useForm();

  const inputSearch = watch("table-search");

  return (
    <TableContainer aria-label="tabela de tarefas">
      <TableHead>
        <TableRow>
          <Td colSpan={6}>
            <ActionsContainer>
              <InputSearch
                control={control}
                inputSearch={inputSearch}
                name="table-search"
              />
              <Pagination />
            </ActionsContainer>
          </Td>
        </TableRow>
        <TableRow>
          {columns.map((column, index) => (
            <Th key={index}>{column}</Th>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <Td>
              <UsernameContent>
                <span>{row.name}</span>
                <span>{row.username}</span>
              </UsernameContent>
            </Td>
            <Td>{row.title}</Td>
            <Td>{formatDateBR(row.date)}</Td>
            <Td>{currency(row.value as number)}</Td>
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
