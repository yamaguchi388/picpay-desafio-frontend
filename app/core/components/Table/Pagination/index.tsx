/* eslint-disable react/display-name */
import { Container, ViewMoreButton } from "./styles";
import { CircularProgress } from "@mui/material";
import { IPaginationProps } from "./types";
import { ReactElement } from "react";

export const Pagination = ({
  onNextPage,
  loading,
}: IPaginationProps): ReactElement => (
  <Container>
    {loading ? (
      <CircularProgress />
    ) : (
      <ViewMoreButton onClick={onNextPage} type="button">
        Ver mais
      </ViewMoreButton>
    )}
  </Container>
);
