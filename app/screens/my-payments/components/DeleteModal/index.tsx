import { Typography } from "@mui/material";
import { ReactElement } from "react";
import { Button, Modal } from "../../../../core/components";
import { currency, formatDateBR } from "../../../../core/utils";
import { Container, ButtonContainer } from "./styles";
import { IDeleteModalProps } from "./types";

export const DeleteModal = (props: IDeleteModalProps): ReactElement => {
  const { isOpen, onClose, onSubmit, payment } = props;
  return (
    <Modal open={isOpen} onClose={onClose} width={20}>
      <Container>
        <Typography component="h2" variant="h4">
          Excluir pagamento
        </Typography>
        <div>
          <Typography component="p">{payment.name}</Typography>
          <Typography component="p">{formatDateBR(payment.date)}</Typography>
          <Typography component="p">
            {currency(payment.value as number)}
          </Typography>
        </div>
        <ButtonContainer>
          <Button type="button" onClick={onClose} color="secondary">
            Cancelar
          </Button>
          <Button type="button" onClick={() => onSubmit(payment.id as number)}>
            Excluir
          </Button>
        </ButtonContainer>
      </Container>
    </Modal>
  );
};
