import { Component, OnInit } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

import { StringUtil } from '../../utils/StringUtil';
import { DateUtil } from '../../utils/DateUtil';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-modal-delete-task',
  templateUrl: './modal-delete-task.component.html',
  styleUrls: ['./modal-delete-task.component.scss', '../modals.scss']
})
export class ModalDeleteTaskComponent implements OnInit {

  task: any;

  constructor(private bsModalRef: BsModalRef, private appService: AppService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  cancel() {
    this.bsModalRef.hide();
  } 

  delete() {
    this.appService.deleteTask(this.task).then(
      success => {
        this.toastr.success('Pagamento excluído com sucesso!');
        this.bsModalRef.hide();
      },
      error => {
        this.toastr.error('Atualize a página e tente novamente.', 'Algo de errado aconteceu.');
        console.log(error);
      }
    )

  }

  formatDate(date: string) {
    const options: any = {
      dateStyle: "short"
    }

    return DateUtil.stringDateToLocaleString(date, options);
  } 

  formatValue(value: number) {
    return StringUtil.formatValue(value);
  }

}
