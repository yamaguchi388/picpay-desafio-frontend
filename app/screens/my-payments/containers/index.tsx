import { ReactElement } from "react";
import { compose, withProvider } from "../../../core/hocs";
import { TasksProvider } from "../../../providers/tasks";
import { MyPaymentsLayout } from "../layouts";

const MyPaymentsContainer = (): ReactElement => <MyPaymentsLayout />;

export default compose(withProvider(TasksProvider))(MyPaymentsContainer);
