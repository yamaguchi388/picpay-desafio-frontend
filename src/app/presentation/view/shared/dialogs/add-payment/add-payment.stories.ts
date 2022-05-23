import { Component, Input } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { moduleMetadata, Story } from "@storybook/angular";
import { AppModule } from "src/app/app.module";
import { PaymentEntity } from "src/app/domain/interfaces/entity/payment-entity";
import { SharedModule } from "../../shared.module";
import { AddPaymentComponent } from "./add-payment.component";


@Component({
    selector: 'app-launcher',
    template: `
        <button mat-raised-button color="primary" (click)="openDialog()"> Launch </button>
    `,
})
class LaunchDialogComponent {

    @Input() payment!: PaymentEntity;
    
    constructor(
        private matDialog: MatDialog
    ) {}

    openDialog() {
        this.matDialog.open(AddPaymentComponent, {
            width: '772px',
            data: {
                payment: this.payment
            }
        })
        .afterClosed().subscribe(value => {
            console.log(`Dialog sent: ${JSON.stringify(value)}`);
        }); 
    }
}

export default {
    title: 'Dialogs/Payment',
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

export const AddDialog = Template.bind({});
export const EditDialog = Template.bind({});
EditDialog.args = {
    payment: {
        user: { 
            name: 'John Doe',
            nick: 'John',
            title: 'titulozinho'
        },
        date: new Date(),
        value: 100
    }
};