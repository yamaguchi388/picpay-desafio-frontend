import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Container, PageNumber } from "./styles";

export const Pagination = () => {
  return (
    <Container>
      <ArrowBackIos />
      <PageNumber type="button">1</PageNumber>
      <PageNumber type="button">1</PageNumber>
      <PageNumber type="button">1</PageNumber>
      <ArrowForwardIos />
    </Container>
  );
};
