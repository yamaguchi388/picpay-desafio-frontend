import { ReactElement } from "react";
import { Button, Table } from "../../../core/components";
import { BaseLayout } from "../../../base-layout";
import { useMyPayments } from "../hooks";
import { ButtonContainer } from "./styles";
import { FormModal } from "../components";

export const MyPaymentsLayout = (): ReactElement => {
  const { handlers, state } = useMyPayments();
  return (
    <BaseLayout>
      <ButtonContainer>
        <Button onClick={handlers.handleOpenModal} width={13} mb={2}>
          ADICIONAR PAGAMENTO
        </Button>
      </ButtonContainer>
      <Table
        rows={state.tasks?.data || []}
        onDelete={handlers.handleDeleteTask}
        onEdit={handlers.handleEditTask}
        page={state.pagination._page}
      />
      <FormModal
        modalState={state.modalState}
        onClose={handlers.handleCloseModal}
      />
    </BaseLayout>
  );
};
