/* eslint-disable react-hooks/exhaustive-deps */
import { FormControlLabel } from "@material-ui/core";
import { Typography, Checkbox } from "@mui/material";
import { ReactElement, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Input, Modal } from "../../../../core/components";
import { ITasksData } from "../../../../core/models";
import {
  currency,
  formatDate,
  masks,
  replaceCurrency,
} from "../../../../core/utils";
import { useTasksEffects, useTasksState } from "../../../../providers/tasks";
import { AddPaymentFormEnum } from "../../enums";
import {
  ButtonsContainer,
  Form,
  InputContent,
  InputsContainer,
} from "./styles";

interface IFormModalProps {
  modalState: { id: number | null; isOpen: boolean };
  onClose: () => void;
}

export const FormModal = ({
  modalState,
  onClose,
}: IFormModalProps): ReactElement => {
  const { control, handleSubmit, reset, formState, setValue } =
    useForm<ITasksData>({
      mode: "onSubmit",
    });
  const { createTask, fetchTaskById } = useTasksEffects();
  const { task } = useTasksState();

  useEffect(() => {
    modalState.id ? fetchTaskById(modalState.id) : reset();
  }, [modalState]);

  useEffect(() => {
    if (!!task.data) {
      //@ts-ignore
      setValue(AddPaymentFormEnum.Name, task.data.name);
      //@ts-ignore
      setValue(AddPaymentFormEnum.Username, task.data.username);
      //@ts-ignore
      setValue(AddPaymentFormEnum.Date, formatDate(task.data.date));
      //@ts-ignore
      setValue(AddPaymentFormEnum.Value, currency(task.data.value as number));
      //@ts-ignore
      setValue(AddPaymentFormEnum.Title, task.data.title);
      //@ts-ignore
      setValue(AddPaymentFormEnum.IsPayed, task.data.isPayed);
    }
  }, [task]);

  const handleClose = () => {
    onClose();
    reset();
  };

  const onSubmit = (data: ITasksData) => {
    createTask({
      ...data,
      date: new Date(data.date).toISOString(),
      image: "",
      value: +replaceCurrency(data.value as string),
    });
    handleClose();
  };

  console.log(task);

  return (
    <Modal open={modalState.isOpen} onClose={handleClose}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Typography component="h2" variant="h4" mb={2}>
          Adicionar pagamento
        </Typography>
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
              name={AddPaymentFormEnum.Title}
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
                <Controller
                  control={control}
                  name={AddPaymentFormEnum.IsPayed}
                  render={(props) => (
                    <Checkbox
                      checked={props.field.value}
                      onChange={(event) =>
                        props.field.onChange(event.target.checked)
                      }
                      {...props}
                      inputProps={{
                        "aria-label":
                          "checkbox para marcar se pagamento já foi efetuado",
                      }}
                      defaultChecked
                    />
                  )}
                />
              }
            />
          </InputContent>
        </InputsContainer>
        <ButtonsContainer>
          <Button
            width={10}
            onClick={handleClose}
            type="reset"
            color="secondary"
          >
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
