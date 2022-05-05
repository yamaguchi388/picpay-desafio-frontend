import { Component, OnInit } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

import { AppService } from '../../app.service';
import { Task } from 'src/app/classes/Task';
import { DateUtil } from 'src/app/utils/DateUtil';
import { ModalUtil } from 'src/app/utils/ModalUtil';


@Component({
  selector: 'app-modal-add-update-task',
  templateUrl: './modal-add-update-task.component.html',
  styleUrls: ['./modal-add-update-task.component.scss', '../modals.scss']
})
export class ModalAddUpdateTaskComponent implements OnInit {

  type: 'add' | 'update';
  task?: Task;

  pageTitle: string;
  name: string;
  value: number;
  date: string;
  title: string;
  isPayed: boolean;

  constructor(private bsModalRef: BsModalRef, private modalService: BsModalService, private appService: AppService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.setDefaultVariables();
  }

  cancel() {
    this.bsModalRef.hide();
  } 

  async save() {
    if (!this.name || this.name.trim().length === 0) {
      this.toastr.error('O usuário deve ser informado.');
      return
    }
    if (!this.value || this.value === 0) {
      this.toastr.error('O valor deve ser informado.');
      return
    }
    if (!this.date) {
      this.toastr.error('A data deve ser informada.');
      return
    }

    const confirmModalMessage = this.type == 'update' ? 'Confirma alteração do pagamento?' : 'Confirma novo pagamento?';

    const confirm = await ModalUtil.openConfirmModal(this.modalService, confirmModalMessage);
    if (!confirm) {
      return
    }

    this.date += ":00Z"; // acrescenta os segundos

    if (this.type == 'update') {
      this.updateTask();
    } else {
      this.addTask();
    }    
  }

  private addTask() {
    const username = this.nameToUsername(this.name);
    const task     = new Task(this.name, username, this.title, this.value, this.date, '', this.isPayed);

    this.appService.addTask(task).then(
      success => {
        this.toastr.success('Pagamento editado com sucesso!');
        this.bsModalRef.hide();
      },
      error => {
        this.toastr.error('Atualize a página e tente novamente.', 'Algo de errado aconteceu.');
        console.log(error);
      }
    )
  }

  private updateTask() {
    const task = new Task(this.name, this.task.username, this.title, this.value, this.date, '', this.isPayed);
    task.id = this.task.id;

    this.appService.updateTask(task).then(
      success => {
        this.toastr.success('Pagamento editado com sucesso!');
        this.bsModalRef.hide();
      },
      error => {
        this.toastr.error('Atualize a página e tente novamente.', 'Algo de errado aconteceu.');
        console.log(error);
      }
    )
  }

  private nameToUsername(name: string) { // criado somente para não deixar vazio
    const username = name.replace(' ', '').toLowerCase();
    return username;
  }

  private setDefaultVariables() {
    this.pageTitle = 'Adicionar pagamento';
    this.isPayed   = false;

    if (this.type === 'update') {
      this.pageTitle = 'Editar pagamento ' + this.task.title;
      this.name      = this.task.name;
      this.date      = DateUtil.stringDateToDatetimeLocal(this.task.date);
      this.value     = this.task.value;
      this.title     = this.task.title;
      this.isPayed   = this.task.isPayed;
    }
    
  }

}
