import { ReactElement } from "react";
import { Table } from "../../../core/components";
import { BaseLayout } from "../../../base-layout";
import { useMyPayments } from "../hooks";

export const MyPaymentsLayout = (): ReactElement => {
  const { handlers, state } = useMyPayments();
  return (
    <BaseLayout>
      <Table rows={state.tasks?.data || []} />
    </BaseLayout>
  );
};
