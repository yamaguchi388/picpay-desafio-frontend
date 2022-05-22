import { Checkbox } from "@mui/material";
import {
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
  Td,
  Th,
  Button,
  UsernameContent,
} from "./styles";

import { Edit, HighlightOff } from "@mui/icons-material";
import { currency, formatDateBR } from "../../utils";
import { Pagination } from "./Pagination";
import { InputSearch } from "./InputSearch";
import { useForm } from "react-hook-form";
import { ITableProps } from "./types";

const columns: string[] = ["Usuário", "Título", "Data", "Valor", "Pago", ""];

export const Table = (props: ITableProps) => {
  const { rows, onEdit, onNextPage, onDeleteModal, loading } = props;

  const { control, watch } = useForm();

  const inputSearch = watch("table-search");

  return (
    <TableContainer aria-label="tabela de tarefas">
      <TableHead>
        <TableRow>
          <Td colSpan={6}>
            <InputSearch
              control={control}
              inputSearch={inputSearch}
              name="table-search"
            />
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
            <Td>{currency((row.value as number) || 0)}</Td>
            <Td>
              <Checkbox checked={row.isPayed} readOnly />
            </Td>
            <Td isAlignRight>
              <Button onClick={() => onEdit(row.id)} type="button">
                <Edit />
              </Button>
              <Button onClick={() => onDeleteModal(row)} type="button">
                <HighlightOff />
              </Button>
            </Td>
          </TableRow>
        ))}
      </TableBody>
      <TableRow>
        <Td colSpan={6}>
          <Pagination onNextPage={onNextPage} loading={loading} />
        </Td>
      </TableRow>
    </TableContainer>
  );
};
