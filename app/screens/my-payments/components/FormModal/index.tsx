/* eslint-disable react-hooks/exhaustive-deps */
import { FormControlLabel } from "@material-ui/core";
import { Typography, Checkbox } from "@mui/material";
import { ReactElement } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Input, Modal } from "../../../../core/components";
import { ITasksData } from "../../../../core/models";
import { masks } from "../../../../core/utils";
import { AddPaymentFormEnum } from "../../enums";
import { useFormModal } from "../../hooks/useFormModal";
import {
  ButtonsContainer,
  Form,
  InputContent,
  InputsContainer,
} from "./styles";
import { IFormModalProps } from "./types";

export const FormModal = ({
  modalState,
  onClose,
}: IFormModalProps): ReactElement => {
  const { control, handleSubmit, reset, formState, setValue } =
    useForm<ITasksData>({
      mode: "onSubmit",
    });

  const { rules, handlers } = useFormModal({
    modalState,
    reset,
    setValue,
    onClose,
  });

  return (
    <Modal open={modalState.isOpen} onClose={handlers.handleClose}>
      <Form onSubmit={handleSubmit(handlers.onSubmit)}>
        <Typography component="h2" variant="h4" mb={2}>
          {modalState.id ? "Editar pagamento" : "Adicionar pagamento"}
        </Typography>
        <InputsContainer>
          <Input
            name={AddPaymentFormEnum.Name}
            control={control}
            rules={rules.rulesName}
            label="Nome*"
            error={!!formState.errors![AddPaymentFormEnum.Name]}
            helperText={formState.errors[AddPaymentFormEnum.Name]?.message}
            required
          />
          <Input
            name={AddPaymentFormEnum.Username}
            control={control}
            rules={rules.rulesUsername}
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
            rules={rules.rulesDate}
            label="Data*"
            type="date"
            error={!!formState.errors![AddPaymentFormEnum.Date]}
            helperText={formState.errors[AddPaymentFormEnum.Date]?.message}
            required
          />
          <Input
            name={AddPaymentFormEnum.Value}
            control={control}
            rules={rules.rulesValue}
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
            onClick={handlers.handleClose}
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
