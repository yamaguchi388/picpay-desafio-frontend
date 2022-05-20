import { Typography } from "@mui/material";
import { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Modal } from "../../../../core/components";
import { masks } from "../../../../core/utils";
import { ButtonsContainer, Form, InputsContainer } from "./styles";

export const FormModal = ({ isOpen, onClose }): ReactElement => {
  const { control, handleSubmit, reset, formState } = useForm({
    mode: "onSubmit",
  });

  const handleClose = () => {
    onClose();
    reset();
  };

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
            rules={{
              required: {
                value: true,
                message: "O usuário deve ser informado",
              },
            }}
            label="Usuário*"
            error={formState.errors!.username}
            helperText={formState.errors?.username?.message}
            required
          />
          <Input
            name="value"
            control={control}
            rules={{
              required: { value: true, message: "O valor deve ser informado" },
            }}
            label="Valor*"
            withMask={masks.currency}
            error={formState.errors!.value}
            helperText={formState.errors?.value?.message}
            required
          />
        </InputsContainer>
        <InputsContainer>
          <Input
            name="date"
            control={control}
            rules={{
              required: { value: true, message: "A data deve ser informada" },
            }}
            label="Data*"
            type="date"
            error={formState.errors!.date}
            helperText={formState.errors?.date?.message}
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
