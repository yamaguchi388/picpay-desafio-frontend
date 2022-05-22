import { ReactElement } from "react";
import { Button, Table } from "../../../core/components";
import { BaseLayout } from "../../../base-layout";
import { useMyPayments } from "../hooks";
import { ButtonContainer } from "./styles";
import { DeleteModal, FormModal } from "../components";

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
        rows={state.memoizedTasks?.data || []}
        onEdit={handlers.handleEditTask}
        page={state.pagination._page}
        onNextPage={handlers.handleNextPage}
        loading={state.tasks.loading}
        onDeleteModal={handlers.handleDeleteModal}
      />
      <FormModal
        modalState={state.modalState}
        onClose={handlers.handleCloseModal}
      />
      <DeleteModal
        isOpen={state.deleteModalState.isOpen}
        onClose={handlers.handleCloseDeleteModal}
        onSubmit={handlers.handleDeleteTask}
        payment={state.deleteModalState.payment}
      />
    </BaseLayout>
  );
};
