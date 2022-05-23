import { Component, Input } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { moduleMetadata, Story } from "@storybook/angular";
import { AppModule } from "src/app/app.module";
import { PaymentEntity } from "src/app/domain/interfaces/entity/payment-entity";
import { SharedModule } from "../../shared.module";
import { DeletePaymentComponent } from "./delete-payment.component";


@Component({
    selector: 'app-launcher',
    template: `
        <button mat-raised-button color="primary" (click)="openDialog()"> Launch </button>
    `,
})
class LaunchDialogComponent {

    @Input() payment!: PaymentEntity;

    constructor(private matDialog: MatDialog) {
    }

    openDialog() {
        this.matDialog.open(DeletePaymentComponent, {
            width: '405px',
            data: {
                payment: this.payment
            }
        });
    }
}

export default {
    title: 'Dialogs/DeletePayment',
    component: LaunchDialogComponent,
    decorators: [
        moduleMetadata({
            imports: [SharedModule],
        })
    ]
}

const Template: Story = args => ({
    props: {
        ...args
    }
})

export const Default = Template.bind({});
Default.args = {
    payment: {
        user: {
            name: 'John Doe',
            nick: 'John',
            email: 'email@email.com',
            title: 'titulozinho'
        },
        date: new Date(),
        value: 100
    }
};