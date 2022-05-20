import { Typography } from "@mui/material";
import { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Modal } from "../../../../core/components";
import { ButtonsContainer, Form, InputsContainer } from "./styles";

export const FormModal = ({ isOpen, handleClose }): ReactElement => {
  const { control, handleSubmit } = useForm({ mode: "onSubmit" });
  return (
    <Modal open={isOpen} handleClose={handleClose}>
      <Typography component="h2" variant="h4" mb="2.5rem">
        Adicionar pagamento
      </Typography>
      <Form onSubmit={handleSubmit((data) => console.log(data))}>
        <InputsContainer>
          <Input
            name="username"
            control={control}
            placeholder="Usuãrio*"
            label="Usuário*"
            required
          />
          <Input
            name="value"
            control={control}
            placeholder="Valor*"
            label="Valor*"
            required
          />
        </InputsContainer>
        <InputsContainer>
          <Input
            name="date"
            control={control}
            placeholder="Data*"
            label="Data*"
            required
          />
          <Input
            name="title"
            control={control}
            placeholder="Titúlo"
            label="Título"
            required
          />
        </InputsContainer>
        <ButtonsContainer>
          <Button width={10} onClick={handleClose} color="secondary">
            CANCELAR
          </Button>
          <Button width={10} type="submit">
            SALVAR
          </Button>
        </ButtonsContainer>
      </Form>
    </Modal>
  );
};
