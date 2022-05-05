import { Component, OnInit } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

import { StringUtil } from '../../utils/StringUtil';
import { DateUtil } from '../../utils/DateUtil';
import { AppService } from '../../app.service';
import { Task } from 'src/app/classes/Task';
import { ModalUtil } from 'src/app/utils/ModalUtil';

@Component({
  selector: 'app-modal-delete-task',
  templateUrl: './modal-delete-task.component.html',
  styleUrls: ['./modal-delete-task.component.scss', '../modals.scss']
})
export class ModalDeleteTaskComponent implements OnInit {

  task: Task;

  constructor(private bsModalRef: BsModalRef, private modalService: BsModalService, private appService: AppService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  cancel() {
    this.bsModalRef.hide();
  } 

  async delete() {
    const confirm = await ModalUtil.openConfirmModal(this.modalService, 'Deseja realmente excluir esse pagamento?');
    if (!confirm) {
      return
    }

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
