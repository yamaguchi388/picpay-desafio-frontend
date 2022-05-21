import { FormControlLabel } from "@material-ui/core";
import { Typography, Checkbox } from "@mui/material";
import { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Modal } from "../../../../core/components";
import { ITasksData } from "../../../../core/models";
import { masks } from "../../../../core/utils";
import { useTasksEffects } from "../../../../providers/tasks";
import { AddPaymentFormEnum } from "../../enums";
import {
  ButtonsContainer,
  Form,
  InputContent,
  InputsContainer,
} from "./styles";

interface IFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FormModal = ({
  isOpen,
  onClose,
}: IFormModalProps): ReactElement => {
  const { control, handleSubmit, reset, formState } = useForm<ITasksData>({
    mode: "onSubmit",
  });

  const { postTask } = useTasksEffects();

  const handleClose = () => {
    onClose();
    reset();
  };

  const onSubmit = (data: ITasksData) => {
    console.log({ data });
    postTask({ ...data, image: "" });
    handleClose();
  };

  return (
    <Modal open={isOpen} handleClose={handleClose}>
      <Typography component="h2" variant="h4" mb="2.5rem">
        Adicionar pagamento
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputsContainer>
          <Input
            name={AddPaymentFormEnum.Name}
            control={control}
            rules={{
              required: {
                value: true,
                message: "O nome deve ser informado",
              },
            }}
            label="Nome*"
            error={!!formState.errors![AddPaymentFormEnum.Name]}
            helperText={formState.errors[AddPaymentFormEnum.Name]?.message}
            required
          />
          <Input
            name={AddPaymentFormEnum.Username}
            control={control}
            rules={{
              required: {
                value: true,
                message: "O usuário deve ser informado",
              },
            }}
            label="Usuário*"
            error={!!formState.errors![AddPaymentFormEnum.Username]}
            helperText={formState.errors[AddPaymentFormEnum.Username]?.message}
            required
          />
        </InputsContainer>
        <InputsContainer>
          <Input
            name={AddPaymentFormEnum.Date}
            control={control}
            rules={{
              required: { value: true, message: "A data deve ser informada" },
            }}
            label="Data*"
            type="date"
            error={!!formState.errors![AddPaymentFormEnum.Date]}
            helperText={formState.errors[AddPaymentFormEnum.Date]?.message}
            required
          />
          <Input
            name={AddPaymentFormEnum.Value}
            control={control}
            rules={{
              required: {
                value: true,
                message: "O valor deve ser informado",
              },
            }}
            label="Valor*"
            withMask={masks.currency}
            error={!!formState.errors![AddPaymentFormEnum.Value]}
            helperText={formState.errors[AddPaymentFormEnum.Value]?.message}
            required
          />
        </InputsContainer>
        <InputsContainer>
          <InputContent>
            <Input
              name="title"
              control={control}
              placeholder="Titúlo"
              label="Título"
              required
            />
          </InputContent>
          <InputContent>
            <FormControlLabel
              label="Este pagamento já foi efetuado"
              control={
                <Checkbox
                  inputProps={{
                    "aria-label":
                      "checkbox para marcar se pagamento já foi efetuado",
                  }}
                  defaultChecked
                />
              }
            />
          </InputContent>
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
